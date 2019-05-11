<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use Illuminate\Support\Facades\Auth;
class BoardController extends Controller
{
    public function index() {
        $stipulations = App\Stipulation::all();
        return view("board.index", 
            compact('stipulations')
        );
    }
    public function add(Request $request) {
        $this->validate($request, [
            'author' => 'required|max:100',
            'code' => 'required|max:70',
            'stipulation_id' => 'required|numeric',
            'problem_information' => 'required|max:10'
        ]);
        $board = new App\Border();
        $board->author = request('author');
        $board->code =request('code');
        $board->problem_information = request('problem_information');
        $board->stipulation_id = request('stipulation_id');
        $board->solution =  request('solution');
        $board->another_information = request('another_information');
        if(Auth::user()) {
            $board->user_id = Auth::user()->id;
        }
        $board->save();
        // $border = $board;
        // $stipulation = App\Stipulation::find($border->stipulation_id);
        // $b = App\Border::where("code", $board->code)->get();
        return redirect("board/show/".$board->id);

    }
    public function show($id) {
        $border = App\Border::find($id);
        
        if($border) {
            $likes = App\Like::where('border_id', $border->id);
            $count = $likes->count();
            // if(!$count) $count = 0;
            $stipulation = App\Stipulation::find($border->stipulation_id);
            $isLiked = false;
            if(Auth::user()) {
                if($likes->where('user_id', Auth::user()->id)->first()) {
                    $isLiked = true;
                }
            }
            return view("board.show", compact('border', 'stipulation', 'count', 'isLiked'));
        }
        else {
            return abort(404);
        }
    }
    public function dashboard() {
        if(Auth::user()) {
            $borders = App\Border::where('user_id', Auth::user()->id)->get();
            return view('board.dashboard', compact('borders'));
        }
        else {
            return redirect('login');
        }
    }
    public function delete($id) {
        $border = App\Border::find($id);
        $border->delete();
        return redirect("board/dashboard");
    }

    public function getEdit($id) {
        $border = App\Border::find($id);
        $stipulations = App\Stipulation::all();
        if($border && $border->user_id === Auth::user()->id) {
            return view("board.edit", compact('border'), compact('stipulations'));
        }
        else {
            return redirect('login');
        }
    }

    public function postEdit(Request $request) {
        $board = App\Border::find($request->id);
        $this->validate($request, [
            'author' => 'required|max:100',
            'code' => 'required|max:70',
            'stipulation_id' => 'required|numeric',
            'problem_information' => 'required|max:10'
        ]);
        if(Auth::user()->id === $board->user_id) {
            $board->author = request('author');
            $board->code =request('code');
            $board->problem_information = request('problem_information');
            $board->stipulation_id = request('stipulation_id');
            $board->solution =  request('solution');
            $board->another_information = request('another_information');
            $board->save();
            return redirect('/board/dashboard');
        }
        else {
            return abort(404);
        }
    }
    public function toogleLike(Request $request) {
        $like = App\Like::where("user_id", $request->user_id)->where('border_id', $request->border_id)->first();
        $isLike = true;
        if($like) {
            $like->delete();
            $isLike = false;
        }
        else {
            $like = new App\Like();
            $like->user_id = $request->user_id;
            $like->border_id = $request->border_id;
            $like->save();
        }
        $count = App\Like::where('border_id', $request->border_id)->count();
        return response()->json(array('count' => $count, 'isLike' => $isLike), 200);
    }
}

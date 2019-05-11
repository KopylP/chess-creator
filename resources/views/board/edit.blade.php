@extends('layout')
@section('content')
    <object type="image/svg+xml"  data="{{ asset('svg/Chess_Pieces_Sprite.svg') }}" id="obj" height="0"></object>
<section class="container">
    <section class="row" id="main">
        <h1>Edit your board</h1>
        <section id="editor" class="col l6 m12">
            {{--Author field--}}
            <form action="/board/edit" method="POST" id="add">
                @csrf
                <input type="hidden" name="id" value="{{$border->id}}">
                <div class="row">
                        <div class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                            <input id="author" name="author" type="text" class="validate" value="{{$border->author}}">
                            <label for="author">Author</label>
                            @if ($errors->has('author'))
                                <span class="alert" role="alert">
                                    <strong>{{ $errors->first('author') }}</strong>
                                </span>
                            @endif
                            {{-- <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> --}}
                            </div>
                        </div>
                        </div>
                </div>
                <div class="row">
                    <div class="col s12">
                            <div class="row">
                            <div class="input-field col s12">
                                <input id="code" name="code" type="text" class="validate" value="{{$border->code}}" readonly="readonly">
                                <label for="code">Code</label>
                                @if ($errors->has('code'))
                                    <span class="alert" role="alert">
                                        <strong>{{ $errors->first('code') }}</strong>
                                    </span>
                                @endif
                            </div>
                            </div>
                    </div>
                </div>
            {{--//-----------------------------------//--}}
                    {{--Author field--}}
            <div class="row">
                <div class="col s12">
                    <div class="row">
                            <div class="input-field col s4">
                                <select name="stipulation_id">
                                    {{-- <option disabled selected>Select your option</option> --}}
                                    @foreach ($stipulations as $stipulation)
                                        <option value="{{$stipulation->id}}" {{ $border->stipulation_id === $stipulation->id ? 'selected' : '' }}>{{$stipulation->stip}}</option>
                                    @endforeach
                                </select>
                                <label>Stipulstion</label>
                                @if ($errors->has('stipulation_id'))
                                    <span class="alert" role="alert">
                                        <strong>{{ $errors->first('stipulation_id') }}</strong>
                                    </span>
                                @endif
                            </div>
                        <div class="input-field col s8">
                            <input id="problem_information" value="{{$border->problem_information}}" name="problem_information" type="text" class="validate">
                            <label for="problem_information">Problem Information</label>
                                {{-- <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> --}}
                            @if ($errors->has('problem_information'))
                                <span class="alert" role="alert">
                                    <strong>{{ $errors->first('problem_information') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                        <textarea id="solution" name="solution" class="materialize-textarea">{{$border->solution}}</textarea>
                        <label for="solution">Solution (Press enter to next line)</label>
                        </div>
                    </div>
                    <div class="row">
                            <div class="input-field col s12">
                            <textarea name="another_information"  id="another_information" class="materialize-textarea">{{$border->another_information}}</textarea>
                            <label for="another_information">Another information (Press enter to next line)</label>
                            </div>
                    </div>
                </div>
            </div>
        </form>
                {{--//-----------------------------------//--}}        
        </section>
        <section id="sf" class="col l6 m12">
                <svg id="chess-field" width="440" height="320" preserveAspectRatio="xMaxYMax meet">
                        <defs id="defs"></defs>   
                </svg><br/><br/>
                <button class="btn waves-effect waves-light" onclick="
                    event.preventDefault();
                    document.querySelector('#add').submit();
                ">Save
                    <i class="material-icons right">send</i>
                </button>
        </section>
    </section>
</section>
@endsection
@section('scripts')
    <script src="{{ asset('js/dist/App.js') }}"> </script>
    <script>
        window.onload = function() {

            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);

            const obj = document.getElementById("obj").contentDocument.getElementsByTagName("svg")[0].getElementById("main");
            document.getElementById("defs").appendChild(obj);

            const styles = document.getElementById("obj").contentDocument.getElementsByTagName("style")[0];
            document.getElementById("chess-field").appendChild(styles);

            const chessField = new ChessField("chess-field", 40);
            chessField.draw();
            chessField.drawFromCode('{{$border->code}}');
            let dragDrop = new DragDrop(chessField);
            dragDrop.size = chessField.size;
            onClick = () => alert(chessField.getFECode());
            chessField.callback = () => {
                document.getElementById("code").value = chessField.getFECode();
            }
            document.getElementById("editor").onclick = () => document.getElementById("back").style.webkitFilter = "grayscale(70%) blur(2px)";
        };


    </script>
@endsection
@section('styles')
    <link rel="stylesheet" href="{{ asset('css/board.css') }}"/>
@endsection
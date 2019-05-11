@extends('layout')
@section('content')
            <div class="card-two">
                {{-- <div> --}}
                  <div class="card card-large ">
                    <div>
                    <h4>{{$border->author}}</h4>
                    </div>
                    <div class="card-image">
                        <svg id="chess-field" width="320" height="320" preserveAspectRatio="xMaxYMax meet">
                            <defs id="defs"></defs>   
                        </svg>
                      {{-- <span class="card-title">Card Title</span> --}}
                    </div>
                    <div class="sol-inf"><h5 class="left">{{$stipulation->stip}}</h5> <h5 class="right">{{$border->problem_information}}</h5></div>
                    <div class="card-content">
                    <h6 id="likes" class="{{$isLiked ? 'liked' : ''}}"><span>{{ $count }}</span> like(s)</h6>
                    </div>
                    <div class="card-action">
                        <a href="#" id="saveSvg">Save SVG</a>
                        <a href="#" id="savePng">Save PNG</a>
                        <a href='{{url("/board/show/{$border->id}")}}' id="copyLink">Copy</a>
                    </div>
                    @auth
                        @if (Auth::user()->id === $border->user_id)
                        <div class="card-action">
                                <a href="#" onclick="
                                    event.preventDefault();
                                    if(confirm('Do you wanna delete this dask?')){
                                        document.getElementById('delete').submit();
                                    }
                                    ">Delete</a>
                                <a href="/board/edit/{{$border->id}}">Edit</a>
                        </div>
                        <form method="POST" id="delete" action="/board/delete/{{$border->id}}">@csrf</form>
                        @endif                        
                    @endauth
                  </div>
                  <div class="card-right">
                        <p><h6><b>Solution:</b></h6>{{$border->solution}}</p>
                        <p><h6><b>Another information:</b></h6>{{$border->another_information}}</p>
                    </div>
                {{-- </div> --}}
              </div>



@endsection
@section('scripts')
    {{-- <Script src="saveSvgAsPng.js"></Script> --}}
    <script src="{{ asset('js/dist/App.js') }}"> </script>
    <script src="{{ asset('js/dist/saveSvgAsPng.js') }}"></script>
    <script>
         window.onload = function() {
        const obj = document.getElementById("obj").contentDocument.getElementsByTagName("svg")[0].getElementById("main");
        document.getElementById("defs").appendChild(obj);

        const styles = document.getElementById("obj").contentDocument.getElementsByTagName("style")[0];
        document.getElementById("chess-field").appendChild(styles);
        
        const chessField = new ChessField("chess-field", 40);
        // chessField.draw();
        chessField.drawFromCode('{{$border->code}}');
        document.getElementById("saveSvg").onclick = SaveSvg;
        document.getElementById("savePng").onclick = SavePng;
        document.getElementById("copyLink").onclick = copyLink;
        @if(Auth::check())
            document.getElementById('likes').onclick = toogleLike;
        @endif
    };

    function SaveSvg() {
        var svg = document.getElementById("chess-field");
        var svgData = document.getElementById("chess-field").outerHTML;
        var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "newesttree.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    function SavePng() {
        saveSvgAsPng(document.getElementById("chess-field"), "diagram.png");
    }
    function copyLink(e) {
        e.preventDefault();
        const link = document.getElementById("copyLink");
        const area = document.createElement("input");
        area.setAttribute("type", "text");
        area.setAttribute("width", "0");
        area.setAttribute("height", "0");
        document.body.appendChild(area);
        area.value = link.getAttribute("href");
        area.select();
        document.execCommand("copy");
        area.remove();
        M.toast({html: 'Link has kopied!'})
    }
    @if(Auth::check())
    function toogleLike() {
        $.ajax ({
            type:'POST',
            url:'/board/like',
            data: {
                    '_token': '@csrf',
                    'user_id':  '{{Auth::user()->id}}',
                    'border_id': '{{ $border->id }}' 
                },
            success: function (data) {
                console.log(data);
                const like = document.querySelector("#likes span");
                like.textContent = data.count;
                like.parentNode.classList.toggle("liked");
            }
        });
    }
    @endif

</script>
@endsection
@section('styles')
    <link rel="stylesheet" href="{{ asset('css/board.css') }}"/>
@endsection
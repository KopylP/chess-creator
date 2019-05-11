@extends('layout')
@section('content')
{{-- <h1>Hello dashboards</h1> --}}
<section id="dashboards">
    <h1>Your boards</h1>
    @foreach ($borders as $key => $border)
            <div class="chess-card">
              <div class="card">
                <div class="card-image">
                    <svg id="chess-field{{$key}}" width="320" height="320" preserveAspectRatio="xMaxYMax meet">
                        <defs id="defs{{$key}}"></defs>   
                    </svg>
                  <span class="card-title">{{$border->author}}</span>
                  <a href="/board/show/{{$border->id}}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>
                </div>
                <div class="card-content">
                    <p>{{$border->solution}}</p>
                </div>
              </div>
            </div>

    @endforeach
</section>
@endsection
@section('scripts')
    <script src="{{ asset('js/dist/App.js') }}"> </script>
    <script>
        window.onload = function() {
        const obj = document.getElementById("obj").contentDocument.getElementsByTagName("svg")[0].getElementById("main");
        const styles = document.getElementById("obj").contentDocument.getElementsByTagName("style")[0];
        let chessField = null;
        @foreach($borders as $key => $border) 
            document.getElementById("defs" + {{$key}}).appendChild(obj.cloneNode(true));
            document.getElementById("chess-field" + {{$key}}).appendChild(styles.cloneNode(true));
            chessField = new ChessField("chess-field" + {{$key}}, 40, {{$key}});
            chessField.drawFromCode('{{$border->code}}');
        @endforeach
        
        const contents = Array.from(document.querySelectorAll(".card-content"));
        contents.map(p => {
            if(p.textContent.trim().length > 30) {
                const str = p.textContent.trim();
                console.log(str);
                p.textContent = str.substring(0, 30) + '...';
            }
        });

        
    };

</script>
@endsection
@section('styles')
    <style>
        .blur {
            /* background-image: none!important;
            background-color: #fff!important; */
            filter:opacity(0.5) grayscale(50%) blur(7px)!important;
        }
    </style>
@endsection
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> --}}
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}"/>
    <title>Document</title>
    @yield('styles')
</head>
<body>
        <div id="back" class="blur"></div>


    <nav>
        <div class="navbar-fixed">
          <a href="/" class="brand-logo"><i class="material-icons">border_color</i></a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            @if (Auth::check())
                <li>Hello {{Auth::user()->name}}</li>
                <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">Log out</a></li>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;" >
                        @csrf
                </form>
                <li><a href="/board/dashboard">My boards</a></li>                
            @else
                <li><a href="{{ route('register') }}">Register</a></li>
                <li><a href="{{ route('login') }}">Login</a></li>
            @endif
          </ul>
        </div>
      </nav>
      
      <object type="image/svg+xml"  data="{{ asset('svg/Chess_Pieces_Sprite.svg') }}" id="obj" height="0"></object>    
      <ul class="sidenav" id="mobile-demo">
        @if (Auth::check())
        <li>Hello {{Auth::user()->name}}</li>
        <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
            document.getElementById('logout-form').submit();">Log out</a></li>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;" >
                @csrf
        </form>
        <li><a href="/board/dashboard">My boards</a></li>                
    @else
        <li><a href="{{ route('register') }}">Register</a></li>
        <li><a href="{{ route('login') }}">Login</a></li>
    @endif
      </ul>
      <div class="preloader-wrapper big active preload">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <div class="prerect"></div>
    @yield('content')
    @yield('scripts')
    <script>
        const pre_load = window.onload;
        window.onload = function() {
            if(pre_load)
            {
                pre_load();
            }
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
            document.querySelector('.prerect').remove();
            document.querySelector('.preload').remove();
        }
    </script>
</body>
</html>
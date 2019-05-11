@extends('layout')

@section('content')
<div class="container" >
            <div class="row">
                <form class="col s12 m4 offset-m4" method="POST" action="{{ route('login') }}" id="main">
                @csrf
                <div class="row s12">
                        <div class="input-field col s12">
                          <input id="email" type="email" class="validate form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"  name="email" value="{{ old('email') }}">
                          <label for="email">Email</label>
                          @if ($errors->has('email'))
                                    <span class="invalid-feedback .alert" role="alert" >
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                        @endif
                        </div>
                    </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="password" type="password" class="validate form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"  name="password" required>
                      <label for="password">Password</label>
                      @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                     @endif
                    </div>

                  </div>

                  <div class="row">
                        <div class="input-field col s12">
                            <label>
                                    <input type="checkbox" class="filled-in" checked="checked" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}/>
                                    <span>Remember me</span>
                            </label>
                        </div>
                    </div>
                    <button class="btn btn-link" type="submit">Submit</button>
                    {{-- @if (Route::has('password.request'))
                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                        </a>
                    @endif --}}
                </form>
            </div>
    {{-- <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> --}}
</div>
@endsection
@section('scripts')
    <script>
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    </script>
@endsection

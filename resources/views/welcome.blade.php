<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>TipsMyWeb</title>


    <link rel="stylesheet" type="text/css" href="css/semantic/semantic.min.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
    <script src="css/semantic/semantic.min.js"></script>
    <!-- Bootstrap Core CSS -->
    {{-- <link href="https://bootswatch.com/cosmo/bootstrap.css" rel="stylesheet"> --}}

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>


    {{-- <div id="app"></div>
    <h1>Coucou</h1>
    <script src="{{mix('js/index.js')}}"></script> --}}
    {{-- React Root & Scripts --}}
	<div id="root"></div>
	<script src="{{ asset('js/index.js') }}"></script>
</body>
</html>

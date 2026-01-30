<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="{{ asset('icon.png') }}">    
    <meta name="description" content="Quiz application to play and share quizzes">
    <meta name="keywords" content="quiz, web development, learning">
    <meta name="author" content="PexDev">
    <title>Quiz App</title>
    @routes
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @vite('resources/css/app.css')
    @inertiaHead
</head>
<body class="bg-neutral-800 min-h-dvh">
    @inertia
</body>
</html>
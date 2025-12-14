<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
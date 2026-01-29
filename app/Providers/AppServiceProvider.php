<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject('Verifica tu correo electrónico')
                ->greeting('¡Hola!')
                ->line('Gracias por registrarte en nuestra plataforma.')
                ->action('Confirmar correo', $url)
                ->line('Si no creaste esta cuenta, puedes ignorar este mensaje.')
                ->salutation('Saludos, '.config('app.name'));
        });

        ResetPassword::toMailUsing(function ($notifiable, $url) {
        return (new MailMessage)
            ->subject('Restablecer contraseña')
            ->greeting('¡Hola!')
            ->line('Recibimos una solicitud para restablecer tu contraseña.')
            ->action('Restablecer contraseña', $url)
            ->line('Si no solicitaste este cambio, puedes ignorar este correo.')
            ->salutation('Saludos,')
            ->line('Quizium');
        });
    }
}

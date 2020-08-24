<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class MailSender
{
    public static function send_contact_request($message_content, $email_sender)
    {
        $subject = "Tips My Web - Demande de contact";
        $receiver = env("MAIL_ADMIN_RECEIVER");

        Mail::send('mail_contact_request',['message_content' => $message_content, 'email_sender' => $email_sender], function($message) use ($subject, $receiver) {
            $message->to($receiver);
            $message->from(env('MAIL_USERNAME'));
            $message->subject($subject);
        });
    }
}
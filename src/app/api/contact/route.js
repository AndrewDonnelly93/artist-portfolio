import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { fetch } from 'node-fetch';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { name, email, message,
            // token
         } = await req.json();

        if (!name || !email || !message 
            //|| !token
        ) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        // Verify the reCAPTCHA token
        // const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     boody: new URLSearchParams({
        //         secret: process.env.RECAPTCHA_SECRET_KEY,
        //         response: token,
        //     }),
        // });

        // const recaptchaJson = await recaptchaResponse.json();

        // if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
        //     return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 403 });
        // }

        // Send the email using Resend
        const response = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['andrew.donnelly.1403@gmail.com'],
            replyTo: email,
            subject: `Contact Form Submission from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        });
        
        return NextResponse.json({ success: true, messageId: response.id });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }
}
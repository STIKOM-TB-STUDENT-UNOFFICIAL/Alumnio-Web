import nodemailer, { type TransportOptions } from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
    },
} as TransportOptions);

export async function sendOTP(target: string, otp: string) {
    const html = await ejs.renderFile(
        'src/views/otp.ejs',
        { otp }
    );
    await transport.sendMail({
        from: process.env.NODEMAILER_USERNAME,
        to: target,
        subject: 'OTP',
        html,
    });
}
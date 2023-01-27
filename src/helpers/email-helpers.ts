import { Email } from '@/types';
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY_SENDGRID;

export async function sendEmail(data: Email) {
    const { 
        date, 
        hour, 
        waveCondition, 
        temperatureCondition, 
        windSpeedCondition 
    } = data.report;

    sgMail.setApiKey(API_KEY);

    const message = {
        to: data.emailsList[0],
        from: "oceanreportnews@gmail.com",
        subject: `Ocean Report ${date} - ${hour}`,
        text: "Hello",
        html: 
        `<h1>Olá!</h1>
        <br>
        <p>${waveCondition}</p>
        <p>${temperatureCondition}</p>
        <p>${windSpeedCondition}</p>
        <br>
        <p>Atenciosamente, equipe Ocean Report</p>`
    };

    await sgMail.send(message);
}
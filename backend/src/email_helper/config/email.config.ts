import nodemailer from 'nodemailer';
import { MailConfigurations, MessageOptions } from "../../interfaces/fashion.interfaces";
import dotenv from 'dotenv';

dotenv.config();

export function createTransporter(mailConfigurations: MailConfigurations) {
  return nodemailer.createTransport(mailConfigurations);
}

export const mailConfigurations: MailConfigurations = ({
  service: 'gmali',
  host: 'smtp.gmail.com',
  port: 587,
  secureTLS: true,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.PASSWORD as string
  }
})

export const sendMail = async (messageOptions: MessageOptions) => {
  const transporter = createTransporter(mailConfigurations);

  await transporter.verify();

  transporter.sendMail(messageOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  })
}
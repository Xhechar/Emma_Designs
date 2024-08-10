import dotenv from 'dotenv';
import express, { json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { welcomeUsers } from './email_helper/welcome';

dotenv.config();

const app = express();
app.use(json());
app.use(cors)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: err.message
  })
});

app.listen(3000, () => {
  console.log("Server is running on port ", process.env.PORT);
});

const mail = express();

mail.listen(3001, async() => {
  const checkDatabase = async () => {
    cron.schedule("*/5 * * * * *", async () => {
      console.log("Checking Database");
      
      await welcomeUsers();
    })
  }

  checkDatabase();
})
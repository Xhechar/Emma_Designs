import { Helpers } from "../db_helper/db_helper";
import lodash from 'lodash';
import { MessageOptions, User } from "../interfaces/fashion.interfaces";
import ejs from "ejs";
import dotenv from 'dotenv';
import { sendMail } from "./config/email.config";

dotenv.config();

export async function welcomeUsers() {
  try {
    let users = (await Helpers.query('select all from users where isDeleted = 0 and isWelcomed = 0')).recordset as User[];

  if (lodash.isEmpty(users)) {
    console.log("No users to be welcomed yet!");
  } else {
    for (let user of users) {
      ejs.renderFile("../../emailTemplates/welcomeUser.ejs", { fullname: user.fullname }, async(err, data) => {
        if (err) {
          console.log("An error has occured in sending the emails ...{welcome.ts __ ln 15}");
        }

        else {
          const messageOptions: MessageOptions = {
            from: process.env.EMAIL as string,
            to: user.email,
            subject: "Welcome To EmmaFashions",
            html: data
          };

          await sendMail(messageOptions);
        }
      })
    }
  }
  } catch (error) {
    console.log("Error sending mails ... {welcomeUser.ts} trycatch __ln 37", error);
  }
}
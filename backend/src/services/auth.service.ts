import lodash from 'lodash';
import { Logins, User } from '../interfaces/fashion.interfaces';
import { Helpers } from '../db_helper/db_helper';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  async loginUser(logins: Logins) {
    let emailExists = (await Helpers.query(`select * from users where email = '${logins.email}' and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(emailExists)) {
      return {
        error: 'Email provided does not exist, Register then try again'
      }
    }

    let passwordMatches = bcrypt.compareSync(logins.password, emailExists[0].password);

    if (!passwordMatches) {
      return {
        error: 'Incorrect password provided'
      }
    } else {
      let token = jwt.sign(emailExists, process.env.SECRET_KEY as string, {
        expiresIn: '30m'
      });

      return {
        message: 'Welcome, logged in successfully.',
        role: emailExists[0].role,
        token: token
      }
    }
  }
}
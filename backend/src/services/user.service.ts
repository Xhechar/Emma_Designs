import lodash, { rest } from 'lodash';
import { User } from '../interfaces/fashion.interfaces';
import { Helpers } from '../db_helper/db_helper';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

export class UserService {
  
  async createUser(user: User) {
    let emailExists = (await Helpers.query(`select * from users where email = '${user.email}' and isDeleted = 0`)).recordset as User[];

    if(!lodash.isEmpty(emailExists)) {
      return {
        error: 'Email provided already exists'
      }
    }

    let phoneExists = (await Helpers.query(`select * from users where phone_number = '${user.phone_number}'`)).recordset as User[];

    if (!lodash.isEmpty(phoneExists)) {
      return {
        error: 'The phone already number exists'
      }
    }

    let result = (await Helpers.execute('registerUser', {
      user_id: v4(),
      fullname: user.fullname,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      country: user.country,
      county: user.county,
      address: user.address,
      profile_image: user.profile_image,
      password: bcrypt.hashSync(user.password, 8)
    })).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'An error occured, you are not registered'
      }
    } else {
      return {
        message: 'You have successfully registered. Welcome On Board ...'
      }
    }
  }

  async updateUser(user_id: string, user: User) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'The specified user does not eexist'
      }
    }

    let result = (await Helpers.execute('updateUser', {
      user_id: userExists[0].user_id,
      fullname: user.fullname,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      country: user.country,
      county: user.county,
      address: user.address,
      profile_image: user.profile_image
    })).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'An error occured during details update.'
      }
    } else {
      return {
        message: "Details updated successfully."
      }
    }
  }

  async getAllUsers() {
    let result = (await Helpers.query('select * from users where isDeleted = 0')).recordset as User[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'No users currently available.'
      }
    } else {
      return {
        message: 'Users successfully retrieved.',
        users: result
      }
    }
  }

  async deleteUser(user_id: string) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'The specified user does not exist'
      }
    } else {
      let result = (await Helpers.query(`Delete from users where user_id = '${user_id}'`)).rowsAffected;

      if (result[0] < 1) {
        return {
          error: 'An error occured during user deletion.'
        }
      } else {
        return {
          message: 'User deleted successfully.'
        }
      }
    }
  }

  async softDeleteUser(user_id: string) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'The specified user does not exist'
      }
    }

    let result = (await Helpers.query(`update users set isDeleted = 1 where user_id = '${user_id}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'An error occured during user deletion.'
      }
    } else {
      return {
        message: 'User moved to recycle bin successfully.'
      }
    }
  }

  async getAllSoftDeletedUsers() {
    let result = (await Helpers.query('Select * from users where isDeleted = 1')).recordset as User[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'No deleted user currently available'
      }
    } else {
      return {
        message: 'Deleted users successfully retrieved',
        users: result
      }
    }
  }

  async getUserById(user_id: string) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'The specified user does not exist'
      }
    } else {
      return {
        message: 'User retrieved successfully',
        user: userExists[0]
      }
    }
  }

  async getUserByName(fullname: string) {
    let result = (await Helpers.query(`select * from users where fullname = '${fullname}'`)).recordset as User[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'No user found with the specified name'
      }
    } else {
      return {
        message: 'User(s) successfully retrieved',
        users: result
      }
    }
  }

  async getUserByEmail(email: string) {
    let result = (await Helpers.query(`select * from users where email = '${email}'`)).recordset as User[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'No user found with the specified name'
      }
    } else {
      return {
        message: 'User(s) successfully retrieved',
        users: result
      }
    }
  }

  async retrieveDeletedUser(user_id: string) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'The specified user does not exist'
      }
    } else {
      let result = (await Helpers.query(`update users set isDeleted = 0 where user_id = '${user_id}'`)).rowsAffected;

      if (result[0] < 1) {
        return {
          error: 'Unable to restore user'
        }
      } else {
        return {
          message: `${userExists[0].fullname} is successfully restored`
        }
      }
    }
  }

  async retrieveDeletedUsers() {
    let result = (await Helpers.query(`update users set isDeleted = 0 where isDeleted = 1`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to restore all users'
      }
    } else {
      return {
        message: `All users is successfully restored`
      }
    }
  }

}
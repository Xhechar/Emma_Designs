import lodash from 'lodash';
import { Cartegory} from '../interfaces/fashion.interfaces';
import { Helpers } from '../db_helper/db_helper';
import {v4} from 'uuid';

export class CartegoriesService {
  async createCartegory(cartegory: Cartegory) {
    let result = (await Helpers.execute('createCartegory', {
      cartegory_id: v4(),
      name: cartegory.name
    })).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Error creating cartegory'
      }
    } else {
      return {
        message: 'Cartegory created successfully'
      }
    }
  }

  async updateCartegory(cartegory_id: string, cartegory: Cartegory) {
    let cartegoryExists = (await Helpers.query(`select * from cartegories where cartegory_id = '${cartegory_id}'`)).recordset as Cartegory[];

    if (lodash.isEmpty(cartegoryExists)) {
      return {
        error: 'The cartegory specified does not exist.'
      }
    } else {
      let result = (await Helpers.execute('updateCartegory', {
        cartegory_id: cartegoryExists[0].cartegory_id,
        name: cartegory.name
      })).rowsAffected;

      if (result[0] < 1) {
        return {
          error: 'Unable to update cartegory'
        }
      } else {
        return {
          message: 'Cartegory updated successfully'
        }
      }
    }
  }

  async getAllCartegories() {
    let result = (await Helpers.query('select * from cartegories')).recordset as Cartegory[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'There are no available cartegories at the moment'
      }
    } else {
      return {
        message: 'Cartegories fetched successfully',
        cartegiries: result
      }
    }
  }

  async deleteCartegory(cartegory_id: string) {
    let cartegoryExists = (await Helpers.query(`select * from cartegories where cartegory_id  = '${cartegory_id}'`)).recordset as Cartegory[];

    if (lodash.isEmpty(cartegoryExists)) {
      return {
        error: 'The cartegory selected does not exist'
      }
    } else {

      let deleteCartegory = (await Helpers.query(`delete from cartegories where cartegory_id  = '${cartegory_id}'`)).rowsAffected;

      if (deleteCartegory[0] < 1) {
        return {
          error: `Unable to delete '${cartegoryExists[0].name}' cartegory`
        }
      }
      return {
        message: `Cartegory '${cartegoryExists[0].name}' deleted successfully`
      }
    }
  }

}
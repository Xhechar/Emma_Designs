import lodash from 'lodash';
import { Cart, PurchasedProduct, User } from '../interfaces/fashion.interfaces';
import { v4 } from 'uuid';
import { Helpers } from '../db_helper/db_helper';

export class CartService {

  async createCart(user_id: string, purchased_product: PurchasedProduct) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'Cannot add product to cart, consider loging in'
      }
    }

    let result = (await Helpers.execute('createCart', {
      cart_id: v4(),
      product_id: purchased_product.product_id,
      user_id: user_id,
      itemsCount: purchased_product.item_count
    })).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Cannot create cart due to an error. Try again'
      }
    } else {
      return {
        message: 'Product successfully added to cart'
      }
    }
  }

  async updateCartItem(user_id: string, cart_id: string, purchased_product: PurchasedProduct) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'Updating this product is not authorised'
      }
    }

    let itemExists = (await Helpers.query(`select * from cart where user_id = ${user_id} and cartid = '${cart_id}'`)).recordset as Cart[];

    if (lodash.isEmpty(itemExists)) {
      return {
        error: 'The selected item does not exist'
      }
    }

    let result = (await Helpers.query(`update cart set cart_id = '${itemExists[0].cart_id}', user_id = '${itemExists[0].user_id}', product_id = '${itemExists[0].product_id}', itemsCount = '${purchased_product.item_count}' where cart_id = '${cart_id}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Cannot update cart item'
      }
    } else {
      return {
        message: 'Cart item updated successfully'
      }
    }
  }

  async removeItemFromCart(cart_id: string) {
    let cartItemExists = (await Helpers.query(`select * from cart where cart_id = '${cart_id}' and isPaid = 0`)).recordset as Cart[];

    if (lodash.isEmpty(cartItemExists)) {
      return {
        error: 'Cart item specified does not exist'
      }
    } else {
      let result = (await Helpers.query(`delete from cart where cart_id = '${cart_id}'`)).rowsAffected;

      if (result[0] < 1) {
        return {
          error: 'Unable to delete cart item specified'
        }
      } else {
        return {
          message: 'Product removed from cart successfully'
        }
      }
    }
  }

  async clearCart(user_id: string) {
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'You are not authorised to access this service'
      }
    }

    let result = (await Helpers.query(`delete from cart where user_id = '${user_id}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to remove all items from cart'
      }
    } else {
      return {
        message: 'Cart cleared successfully'
      }
    }
  }

  async getCartItemsByUser(user_id: string) {
    let cart: Cart[] = [];
    let userExists = (await Helpers.query(`select * from users where user_id = ${user_id} and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'Cannot add product to cart, consider loging in'
      }
    }

    let result = (await Helpers.query(`select * from cart c where user_id = '${user_id}' join products p on c.product_id = p.product_id`)).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: 'No items added to cart at the moment'
      }
    } else {
      result.map((item) => {
        const cartItem: Cart = {
          cart_id: item.cart_id,
          product_id: item.product_id,
          user_id: item.user_id,
          isPaid: item.isPaid,
          itemsCount: item.itemsCount,
          product: {
            product_id: item.product_id,
            name: item.name,
            images : item.images,
            short_desc: item.short_desc,
            long_desc: item.long_desc,
            price: item.price,
            stock_quantity: item.stock_quantity,
            cartegory: item.cartegory,
            createdAt: item.createAt,
            type: item.type
          }  
        }
        cart.push(cartItem);
      })

      return {
        message: 'Cart items successfully generated',
        cart: cart
      }
    }
  }
}
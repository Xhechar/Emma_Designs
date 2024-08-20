import { Helpers } from "../db_helper/db_helper";
import { Cart, Order, OrderIds, Product, User } from "../interfaces/fashion.interfaces";
import lodash from 'lodash';
import { v4 } from 'uuid';

export class OrderService {
  async createOrder(user_id: string) {
    let rowsAffected = 0;
    let userExists = (await Helpers.query(`select * from users where user_id = '${user_id}' and isDeleted = 0`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'This action is not authorised at the moment, try again later'
      }
    }

    let cartProducts = (await Helpers.query(`select c.cart_id, c.product_id as cart_product_id, c.user_id, c.isPaid, c.itemsCount, p.product_id, p.name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush from cart c join products p on c.product_id = p.product_id where c.user_id = '${user_id}' and c.isPaid = 0`)).recordset;

    if (lodash.isEmpty(cartProducts)) {
      return {
        error: 'No items available in cart to check-out.'
      }
    }
    
    for (let cartProduct of cartProducts) {
      let createOrder = (await Helpers.execute('createOrder', {
        order_id: v4(),
        user_id: cartProduct.user_id,
        product_id: cartProduct.cart_product_id,
        itemsCount: cartProduct.itemsCount,
        pricePaid: (cartProduct.itemsCount * (cartProduct.price - cartProduct.discount))
      })).rowsAffected;

      if (createOrder[0] < 1) {
        return {
          error: 'Unable to create order'
        };
      } else {
        let updateProduct = (await Helpers.query(`update products set stock_quantity = stock_quantity - ${cartProduct.itemsCount} where product_id = '${cartProduct.product_id}'`)).rowsAffected;

        if (updateProduct[0] < 1) {
          return {
            error: 'Unable to update order on products'
          };
        }

        rowsAffected += 1;
      }
    }

    if (rowsAffected !== cartProducts.length) {
      return {
        error: 'Unable to complete order for the product(s) specified.'
      }
    } else {
      return {
        message: 'Order submitted successfully, await communication on arival. Thank you'
      }
    }
  }

  async updateDeliveryStatus(order_id: string) {
    let status = (await Helpers.query(`select * from oders where order_id = '${order_id}' and isDeleted = 0`)).recordset as Order[];

    if (lodash.isEmpty(status)) {
      return {
        error: 'The order specified does not exist'
      }
    } else {
      if (status[0].delivery == 'pending') {
        let result = (await Helpers.query(`update oders set delivery = 'delivered' where order_id = '${order_id}'`)).rowsAffected;

        if (result[0] < 1) {
          return {
            error: 'Unable to update order delivery status'
          }
        } else {
          return {
            message: 'Order successfully updated to delivered'
          }
        }
      } else {
        let result = (await Helpers.query(`update oders set delivery = 'pending' where order_id = '${order_id}'`)).rowsAffected;

        if (result[0] < 1) {
          return {
            error: 'Unable to update order delivery status'
          }
        } else {
          return {
            message: 'Order successfully updated to pending'
          }
        }
      }
    }
  }

  async updateMultipleDeliveryStatus(order_ids: OrderIds) {
    for (let order_id of order_ids.order_ids) {
      let status = (await Helpers.query(`select * from oders o where order_id = '${order_id}' and isDeleted = 0 join products p on o.product_id = p.product_id`)).recordset;

      if (lodash.isEmpty(status)) {
        return {
          error: `The order specified " ${status[0].name} " does not exist`
        }
      } else {
        if (status[0].delivery == 'pending') {
          let result = (await Helpers.query(`update oders set delivery = 'delivered' where order_id = '${order_id}'`)).rowsAffected;

          if (result[0] < 1) {
            return {
              error: `Unable to update order delivery status for order with name " ${status[0].name} "`
            }
          } else {
            return {
              message: 'Orders successfully updated to delivered'
            }
          }
        } else {
          let result = (await Helpers.query(`update oders set delivery = 'pending' where order_id = '${order_id}'`)).rowsAffected;

          if (result[0] < 1) {
            return {
              error: `Unable to update order delivery status for order with name " ${status[0].name} "`
            }
          } else {
            return {
              message: 'Order successfully updated to pending'
            }
          }
        }
      }
    }
  }

  async updateAllDeliveryStatus() {
    let result = (await Helpers.query(`update oders set delivery = 'delivered' where delivery = 'pending' and isDeleted = 0`)).rowsAffected;
  
    if (result[0] < 1) {
      return {
        error: 'Unable to update order delivery status'
      }
    } else {
      return {
        message: 'Order(s) successfully updated to delivered'
      }
    }
  }

  async softDeleteOrder(order_id: string) {
    let orderExist = (await Helpers.query(`select * from oders where order_id = '${order_id}' and isDeleted = 0`)).recordset as Order[];

    if (lodash.isEmpty(orderExist)) {
      return {
        error: 'The order specified does not exist or is deleted.'
      }
    }

    let result = (await Helpers.query(`update oders set isDeleted = 1 where order_id = '${order_id}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to delete order'
      }
    } else {
      return {
        message: 'Order successfully moved to bin'
      }
    }
  }

  async softDeleteAllOrders() {
    let result = (await Helpers.query(`update oders set isDeleted = 1 where isDeleted = 0`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to delete all the orders'
      }
    } else {
      return {
        message: 'Order(s) successfully moved to bin'
      }
    }
  }

  async restoreSingleOrder(order_id: string) {
    let orderExist = (await Helpers.query(`select * from oders where order_id = '${order_id}' and isDeleted = 0`)).recordset as Order[];

    if (lodash.isEmpty(orderExist)) {
      return {
        error: 'The order specified does not exist.'
      }
    }

    let result = (await Helpers.query(`update oders set isDeleted = 0 where order_id = '${order_id}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to restore order'
      }
    } else {
      return {
        message: 'Order successfully restored'
      }
    }
  }

  async restoreAllOrders() {
    let result = (await Helpers.query(`update oders set isDeleted = 0 where isDeleted = 1`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to delete all the orders'
      }
    } else {
      return {
        message: 'Order(s) successfully moved to bin'
      }
    }
  }

  async getAllSoftDeletedOrders() {
    let retrievedOrders: Order[] = [];
    let result = (await Helpers.query('SELECT o.user_id as order_user_id, o.product_id as order_product_id,  o.order_id, o.createdAt AS order_createdAt, o.delivery, o.isCanceled, o.isDeleted, o.itemsCount, o.pricePaid, u.user_id, u.fullname, u.email, u.phone_number, u.gender, u.country, u.county, u.address, u.profile_image, u.role, u.password, u.createdAt, p.product_id, p.name AS product_name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt as product_createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush FROM oders o JOIN users u ON o.user_id = u.user_id JOIN products p ON o.product_id = p.product_id WHERE u.isDeleted = 1')).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: 'No deleted orders currently available'
      }
    }

    result.map(record => {
      const order: Order = {
        user_id: record.order_user_id,
        product_id: record.order_product_id,
        order_id: record.order_id,
        createdAt: record.order_createdAt,
        delivery: record.delivery,
        itemsCount: record.product_itemsCount,
        pricePaid: record.pricePaid,
        user: {
          user_id: record.user_id,
          fullname: record.fullname,
          email: record.email,
          phone_number: record.phone_number,
          gender: record.gender,
          country: record.country,
          county: record.county,
          address: record.address,
          profile_image: record.profile_image,
          role: record.role,
          password: record.password,
          createdAt: record.createdAt
        },
        product: {
          product_id: record.product_id,
          name: record.product_name,
          price: record.price,
          stock_quantity: record.stock_quantity,
          cartegory: record.cartegory,
          images: record.images,
          short_desc: record.short_desc,
          long_desc: record.long_desc,
          createdAt: record.product_createdAt,
          type: record.type,
          onOffer: record.onOffer,
          discount: record.discount,
          max_quantity: record.max_quantity,
          onFlush: record.onFlush
        },
      }
      retrievedOrders.push(order);
    });

    return {
      message: 'Orders successfully retrieved',
      orders: retrievedOrders
    }

  }

  async getAllOrders() {
    let retrievedOrders: Order[] = [];
    let result = (await Helpers.query('SELECT o.user_id as order_user_id, o.product_id as order_product_id,  o.order_id, o.createdAt AS order_createdAt, o.delivery, u.user_id, u.fullname, u.email, u.phone_number, u.gender, u.country, u.county, u.address, u.profile_image, u.role, u.password, u.createdAt, p.product_id, p.name AS product_name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt as product_createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush FROM oders o JOIN users u ON o.user_id = u.user_id JOIN products p ON o.product_id = p.product_id WHERE u.isDeleted = 0')).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: 'No orders currently available'
      }
    }

    result.map(record => {
      const order: Order = {
        user_id: record.order_user_id,
        product_id: record.order_product_id,
        order_id: record.order_id,
        createdAt: record.order_createdAt,
        delivery: record.delivery,
        itemsCount: record.product_itemsCount,
        pricePaid: record.pricePaid,
        user: {
          user_id: record.user_id,
          fullname: record.fullname,
          email: record.email,
          phone_number: record.phone_number,
          gender: record.gender,
          country: record.country,
          county: record.county,
          address: record.address,
          profile_image: record.profile_image,
          role: record.role,
          password: record.password,
          createdAt: record.createdAt
        },
        product: {
          product_id: record.product_id,
          name: record.product_name,
          price: record.price,
          stock_quantity: record.stock_quantity,
          cartegory: record.cartegory,
          images: record.images,
          short_desc: record.short_desc,
          long_desc: record.long_desc,
          createdAt: record.product_createdAt,
          type: record.type,
          onOffer: record.onOffer,
          discount: record.discount,
          max_quantity: record.max_quantity,
          onFlush: record.onFlush
        },
      }
      retrievedOrders.push(order);
    });

    return {
      message: 'Orders successfully retrieved',
      orders: retrievedOrders
    }

  }

  async getAllOrdersByUserId(user_id: string) {
    let retrievedOrders: Order[] = [];
    let userExists = (await Helpers.query(`select * from oders where user_id = '${user_id}'`)).recordset as User[];

    if (lodash.isEmpty(userExists)) {
      return {
        error: 'You have not made any orders at the moment.'
      }
    }

    let result = (await Helpers.query(`SELECT o.user_id as order_user_id, o.product_id as order_product_id,  o.order_id, o.createdAt AS order_createdAt, o.delivery, o.isCanceled, o.isDeleted, o.itemsCount, o.pricePaid, u.user_id, u.fullname, u.email, u.phone_number, u.gender, u.country, u.county, u.address, u.profile_image, u.role, u.password, u.createdAt, p.product_id, p.name AS product_name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt as product_createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush FROM oders o JOIN users u ON o.user_id = u.user_id JOIN products p ON o.product_id = p.product_id WHERE u.isDeleted = 0 and o.user_id = '${user_id}'`)).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: 'Unable to fetch your orders'
      }
    }

    result.map(record => {
      const order: Order = {
        user_id: record.order_user_id,
        product_id: record.order_product_id,
        order_id: record.order_id,
        createdAt: record.order_createdAt,
        delivery: record.delivery,
        itemsCount: record.itemsCount,
        pricePaid: record.pricePaid,
        user: {
          user_id: record.user_id,
          fullname: record.fullname,
          email: record.email,
          phone_number: record.phone_number,
          gender: record.gender,
          country: record.country,
          county: record.county,
          address: record.address,
          profile_image: record.profile_image,
          role: record.role,
          password: record.password,
          createdAt: record.createdAt
        },
        product: {
          product_id: record.product_id,
          name: record.product_name,
          price: record.price,
          stock_quantity: record.stock_quantity,
          cartegory: record.cartegory,
          images: record.images,
          short_desc: record.short_desc,
          long_desc: record.long_desc,
          createdAt: record.product_createdAt,
          type: record.type,
          onOffer: record.onOffer,
          discount: record.discount,
          max_quantity: record.max_quantity,
          onFlush: record.onFlush
        },
      }
      retrievedOrders.push(order);
    });

    return {
      message: 'Orders successfully retrieved',
      orders: retrievedOrders
    }

  }

  async deleteOrder(order_id: string) {
    let orderExist = (await Helpers.query(`select * from oders where order_id = '${order_id}' and isDeleted = 0`)).recordset as Order[];

    if (lodash.isEmpty(orderExist)) {
      return {
        error: 'The specified order does not exist'
      }
    }

    let deleteOrder = (await Helpers.query(`delete from oders where order_id = '${order_id}'`)).rowsAffected;

    if (deleteOrder[0] < 1) {
      return {
        error: 'Unable to delete order'
      }
    } else {
      return {
        message: 'Order successfully deleted'
      }
    }
  }
}
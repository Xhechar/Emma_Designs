import { Helpers } from "../db_helper/db_helper";
import { Cartegorie, Cartegory, Name, Product } from "../interfaces/fashion.interfaces"; 
import { v4 } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from "../config/config";
import lodash from 'lodash'

export class ProductService {
  async createProduct(product: Product) {
    let pool = await mssql.connect(sqlConfig);

    let product_id = v4();

    let result = (await (pool.request()
      .input('product_id', product_id)
      .input('name', product.name)
      .input('images', product.images)
      .input('short_desc', product.short_desc)
      .input('long_desc', product.long_desc)
      .input('price', product.price)
      .input('stock_quantity', product.stock_quantity)
      .input('cartegory', product.cartegory)
      .input('type', product.type)
      .execute('createProduct')
    )).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to create the product, try again later'
      }
    } else {
      return {
        message: 'Product is successfully created'
      }
    }
  }

  async updateProduct(product_id: string, product: Product) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    }

    let pool = await mssql.connect(sqlConfig);

    let result = (await (pool.request()
      .input('product_id', productExists[0].product_id)
      .input('name', product.name)
      .input('images', product.images)
      .input('short_desc', product.short_desc)
      .input('long_desc', product.long_desc)
      .input('price', product.price)
      .input('stock_quantity', product.stock_quantity)
      .input('cartegory', product.cartegory)
      .input('type', product.type)
      .execute('updateProduct')
    )).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to update the specified product, try again later.'
      }
    } else {
      return {
        message: 'Product is successfully created'
      }
    }
  }

  async getProductByProductId(product_id: string) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];
    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    } else {
      return {
        message: 'Product successfully retrieved',
        product: productExists
      }
    }
  }

  async getProductByName(name: Name) {
    let productExists = (await Helpers.query(`select * from products where name = '${name.name}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    } else {
      return {
        message: 'Product successfully retrieved',
        product: productExists
      }
    }
  }

  async getProductByCartegory(cartegory: Cartegorie) {
    let productExists = (await Helpers.query(`select * from products where cartegory = '${cartegory.cartegory}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    } else {
      return {
        message: 'Product successfully retrieved',
        product: productExists
      }
    }
  }

  async getAllProduct() {
    let result = (await Helpers.query(`select * from products`)).recordset as Product[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'There are no products currently available'
      }
    } else {
      return {
        message: 'Product(s) successfully retrieved',
        product: result
      }
    }
  }

  async getFlushProducts() {
    let result = (await Helpers.query(`select * from products where onFlush = 1`)).recordset as Product[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'There are no products currently available'
      }
    } else {
      return {
        message: 'Product(s) successfully retrieved',
        product: result
      }
    }
  }

  async deleteProduct(product_id: string) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    } else {
      let result = (await Helpers.query(`delete from products where product_id = '${product_id}'`)).rowsAffected;

      if (result[0] < 1) {
        return {
          error: 'Unable to delete the specified iproduct'
        }
      } else {
        return {
          message: 'Product successfully deleted'
        }
      }
    }
  }
}
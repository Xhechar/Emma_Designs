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

    console.log(product_id);

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
      .input('discount', product.discount)
      .input('max_quantity', product.max_quantity)
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
      .input('discount', product.discount)
      .input('max_quantity', product.max_quantity)
      .execute('updateProduct')
    )).rowsAffected;

    if (result[0] < 1) {
      return {
        error: 'Unable to update the specified product, try again later.'
      }
    } else {
      return {
        message: 'Product is successfully updated'
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
        products: productExists
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
        products: result
      }
    }
  }

  async getFlushProducts() {
    let result = (await Helpers.query(`SELECT * FROM products WHERE createdAt <= DATEADD(MONTH,-6, GETDATE()) AND stock_quantity >= (80/100 * 100) or onFlush = 1`)).recordset as Product[];
    
    if (lodash.isEmpty(result)) {
      return {
        error: 'There are no flush products currently available'
      }
    } else {
      return {
        message: 'Product(s) successfully retrieved',
        products: result
      }
    }
  }

  async getOfferredProducts() {
    let result = (await Helpers.query(`select * from products where onOffer = 1`)).recordset as Product[];

    if (lodash.isEmpty(result)) {
      return {
        error: 'There are no products on offer currently available'
      }
    } else {
      return {
        message: 'Product(s) successfully retrieved',
        product: result
      }
    }
  }

  async setOffer(product_id: string) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    }

    let updateProduct = (await Helpers.query(`update products set onOffer = 1 where product_id = '${product_id}'`)).rowsAffected;

    if (updateProduct[0] < 1) {
      return {
        error: 'Unable to move product to offers'
      }
    } else {
      return {
        message: 'Product successfully added to offers.'
      }
    }
  }

  async removeFromOffers(product_id: string) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    }

    let updateProduct = (await Helpers.query(`update products set onOffer = 0 where product_id = '${product_id}'`)).rowsAffected;

    if (updateProduct[0] < 1) {
      return {
        error: 'Unable to remove product from offers'
      }
    } else {
      return {
        message: 'Product successfully removed from offers.'
      }
    }
  }

  async setFlushProducts(product_id: string) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    }

    let updateProduct = (await Helpers.query(`update products set onFlush = 1 where product_id = '${product_id}'`)).rowsAffected;

    if (updateProduct[0] < 1) {
      return {
        error: 'Unable to set product to flush sale'
      }
    } else {
      return {
        message: 'Product successfully set to flush sale'
      }
    }
  }

  async resetFlushProducts(product_id: string) {
    let productExists = (await Helpers.query(`select * from products where product_id = '${product_id}'`)).recordset as Product[];

    if (lodash.isEmpty(productExists)) {
      return {
        error: 'The specified product does not exist'
      }
    }

    let updateProduct = (await Helpers.query(`update products set onFlush = 0 where product_id = '${product_id}'`)).rowsAffected;

    if (updateProduct[0] < 1) {
      return {
        error: 'Unable to remove product from flush sales'
      }
    } else {
      return {
        message: 'Product successfully reset from flush sales'
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
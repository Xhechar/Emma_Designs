import { Request, Response } from "express";
import { ProductService } from "../services/products.service";
import { productSchema } from "../validators/request.validators";

const productService = new ProductService();
export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      let { error } = productSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message
        })
      }

      let response = await productService.createProduct(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      let { error } = productSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message
        })
      }

      let response = await productService.updateProduct(req.params.product_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getProductByProductId(req: Request, res: Response) {
    try {

      let response = await productService.getProductByProductId(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getProductByName(req: Request, res: Response) {
    try {

      let response = await productService.getProductByName(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getProductByCartegory(req: Request, res: Response) {
    try {

      let response = await productService.getProductByCartegory(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllProduct(req: Request, res: Response) {
    try {

      let response = await productService.getAllProduct();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getFlushProducts(req: Request, res: Response) {
    try {
      let response = await productService.getFlushProducts();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getOfferredProducts(req: Request, res: Response) {
    try {
      let response = await productService.getOfferredProducts();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async setOffer(req: Request, res: Response) {
    try {
      let response = await productService.setOffer(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async removeFromOffers(req: Request, res: Response) {
    try {
      let response = await productService.removeFromOffers(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async setFlushProducts(req: Request, res: Response) {
    try {
      let response = await productService.setFlushProducts(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async resetFlushProducts(req: Request, res: Response) {
    try {
      let response = await productService.resetFlushProducts(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {

      let response = await productService.deleteProduct(req.params.product_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }
}
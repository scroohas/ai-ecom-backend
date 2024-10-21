import { RequestHandler } from "express";
import ProductService from "../services/products.service";
import { errorHandler } from "../common/errors";

class ProductController {
  private _productService = new ProductService();

  getAllProducts: RequestHandler = async (_req, res) => {
    try {
      const products = await this._productService.getAllProducts();

      return res.status(200).send(products);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  getProductById: RequestHandler = async (req, res) => {
    try {
      const products = await this._productService.getProductById(
        req.params["id"]
      );
      return res.status(200).send(products);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  generateProductAIAnalytics: RequestHandler = async (req, res) => {
    try {
      const products = await this._productService.generateProductAIAnalytics(
        req.params["id"]
      );
      return res.status(200).send(products);
    } catch (error) {
      errorHandler(res, error);
    }
  };
}

export default ProductController;

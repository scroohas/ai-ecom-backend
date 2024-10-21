import { Router } from "express";

import ProductController from "../controllers/products.controller";

const productRouter = Router({ mergeParams: true });
const productController = new ProductController();

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.get(
  "/:id/generateAIAnalytics",
  productController.generateProductAIAnalytics
);

export default productRouter;

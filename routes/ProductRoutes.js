import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  checkProductExistenceById,
  checkProductExistenceByName,
  getProductsThroughSearchBar,
} from "../controllers/ProductController.js";

import {
  handleURLGetQueries,
  handleURLUpdateQueries,
} from "../middleware/QueryHandler.js";

const productRouter = express.Router();

productRouter.get("/", handleURLGetQueries, getProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/search/:searchInput", getProductsThroughSearchBar);
productRouter.post("/create", checkProductExistenceByName, createProduct);
productRouter.put(
  "/update/:id",
  checkProductExistenceById,
  handleURLUpdateQueries,
  updateProduct
);
productRouter.delete("/delete/:id", checkProductExistenceById, deleteProduct);

export default productRouter;

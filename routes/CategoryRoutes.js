import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
  checkCategoryExistenceById,
  checkCategoryExistenceByName,
} from "../controllers/CatergoryController.js";

import {
  handleURLGetQueries,
  handleURLUpdateQueries,
} from "../middleware/QueryHandler.js";

const categoryRouter = express.Router();

categoryRouter.get("/", handleURLGetQueries, getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/create", checkCategoryExistenceByName, createCategory);
categoryRouter.put(
  "/update/:id",
  checkCategoryExistenceById,
  handleURLUpdateQueries,
  updateCategory
);
categoryRouter.delete(
  "/delete/:id",
  checkCategoryExistenceById,
  deleteCategory
);

export default categoryRouter;

import { Router } from "express";
import { CategoryController } from "../controllers/categories.controller.js";

const routesCategories = Router();

routesCategories.get("/:id", CategoryController.getById);
routesCategories.delete("/:id", CategoryController.delete);
routesCategories.get("/", CategoryController.getAll);
routesCategories.post("/", CategoryController.create);
routesCategories.put("/:id", CategoryController.update);

export default routesCategories;
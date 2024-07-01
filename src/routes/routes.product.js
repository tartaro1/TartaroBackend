import { Router } from "express";
import {ProductController} from "../controllers/products.controller.js"

const routesProducts = Router();

routesProducts.get("/:id", ProductController.getById);
routesProducts.get("/", ProductController.getAll);
routesProducts.get("/:name", ProductController.getByName);
routesProducts.post("/", ProductController.createProduct);
routesProducts.delete("/:id", ProductController.deleteProduct);
routesProducts.patch("/:id", ProductController.updateProduct);


export default routesProducts;
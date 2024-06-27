import { Router } from "express";
import {ProductController} from "../controllers/products.controller.js"
import { isAdmin, verifyToken } from "../middleware/token.js";

const routesProducts = Router();

routesProducts.get("/:id", ProductController.getById);
routesProducts.get("/", ProductController.getAll);
routesProducts.get("/:name", ProductController.getByName);
routesProducts.post("/", verifyToken, isAdmin, ProductController.createProduct);
routesProducts.delete("/:id", verifyToken, isAdmin, ProductController.deleteProduct);
routesProducts.patch("/:id", verifyToken, isAdmin, ProductController.updateProduct);


export default routesProducts;
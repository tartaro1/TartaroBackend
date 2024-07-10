import { Router } from "express";
import {ProductController} from "../controllers/products.controller.js"
/**
 * Estas son las rutas de products
 * @type {Object}
 */
const routesProducts = Router();

routesProducts.get("/most", ProductController.mostSales)
routesProducts.get("/top", ProductController.top);
routesProducts.get("/stock", ProductController.stock)
routesProducts.get("/:id", ProductController.getById);
routesProducts.get("/", ProductController.getAll);
routesProducts.get("/:name", ProductController.getByName);
routesProducts.post("/", ProductController.createProduct);
routesProducts.delete("/:id", ProductController.deleteProduct);
routesProducts.patch("/:id", ProductController.updateProduct);


export default routesProducts;
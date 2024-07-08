import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller.js";
/**
 * Estas son las rutas de Orders
 * @type {Object}
 */
const routesOrders = Router();

routesOrders.get("/daily", OrdersController.dailySales)
routesOrders.get("/suma", OrdersController.sumSales)
routesOrders.get("/sales", OrdersController.countSales);
routesOrders.get("/", OrdersController.getAll);
routesOrders.get("/:id", OrdersController.getById);
routesOrders.post("/", OrdersController.create)
routesOrders.patch("/:id", OrdersController.update);
routesOrders.patch("/state/:id", OrdersController.updateState);
routesOrders.delete("/:id", OrdersController.delete);

export default routesOrders;
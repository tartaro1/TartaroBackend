import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller.js";

const routesOrders = Router();
routesOrders.get("/", OrdersController.getAll);
routesOrders.get("/:id", OrdersController.getById);
routesOrders.post("/", OrdersController.create)
routesOrders.patch("/:id", OrdersController.update);
routesOrders.patch("/state/:id", OrdersController.updateState)
routesOrders.delete("/:id", OrdersController.delete);
export default routesOrders;
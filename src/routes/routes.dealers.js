import { Router } from "express";
import { DealersController } from "../controllers/dealers.controller.js";
import { isAdmin, verifyToken } from "../middleware/token.js";

const routesDelivers = Router();

routesDelivers.get("/", DealersController.getAll);
routesDelivers.get("/:id", DealersController.getById);
routesDelivers.post("/", DealersController.create);
routesDelivers.delete("/:id", DealersController.delete);
routesDelivers.patch("/:id", DealersController.update);

export default routesDelivers;
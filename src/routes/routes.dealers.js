import { Router } from "express";
import { DealersController } from "../controllers/dealers.controller.js";
import { isAdmin, verifyToken } from "../middleware/token.js";

const routesDelivers = Router();

routesDelivers.get("/", DealersController.getAll);
routesDelivers.get("/:id", DealersController.getById);
routesDelivers.post("/", verifyToken, isAdmin, DealersController.create);
routesDelivers.delete("/:id", verifyToken, isAdmin, DealersController.delete);
routesDelivers.patch("/:id", verifyToken, isAdmin, DealersController.update);

export default routesDelivers;
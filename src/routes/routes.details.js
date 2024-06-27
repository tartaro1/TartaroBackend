import { Router } from "express";
import { DetailsController } from "../controllers/details.controller.js";
import { isAdmin, verifyToken } from "../middleware/token.js";
const routesDetails = Router();

routesDetails.get("/", DetailsController.getAll);
routesDetails.get("/:id", DetailsController.getOrderProducts)
routesDetails.delete("/:id", verifyToken, isAdmin, DetailsController.delete);
routesDetails.patch("/:id", verifyToken, isAdmin, DetailsController.update);
export default routesDetails;

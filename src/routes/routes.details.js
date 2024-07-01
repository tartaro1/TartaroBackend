import { Router } from "express";
import { DetailsController } from "../controllers/details.controller.js";
import { isAdmin, verifyToken } from "../middleware/token.js";
const routesDetails = Router();

routesDetails.get("/", DetailsController.getAll);
routesDetails.get("/:id", DetailsController.getOrderProducts);
routesDetails.post("/", DetailsController.create);
routesDetails.delete("/:id", DetailsController.delete);
routesDetails.patch("/:id", DetailsController.update);
export default routesDetails;

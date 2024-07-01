import { Router } from "express";
import { GestionController } from "../controllers/gestion.controller.js";
const routesGestion = Router();

routesGestion.get("/", GestionController.getLatest);
routesGestion.post("/", GestionController.create)

export default routesGestion;
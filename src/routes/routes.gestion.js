import { Router } from "express";
import { GestionController } from "../controllers/gestion.controller.js";
/**
 * Estas son las rutas de Gestion
 * @type {Object}
 */
const routesGestion = Router();

routesGestion.get("/", GestionController.getLatest);
routesGestion.post("/", GestionController.create)

export default routesGestion;
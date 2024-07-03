import { Router } from "express";
import { BackupsController } from "../controllers/backup.controller.js";
/**
 * Estas son las rutas del backup
 * @type {Object}
 */
const routesBackup = Router();

routesBackup.get("/", BackupsController.getLatest);
routesBackup.post("/", BackupsController.create)

export default routesBackup;
import { Router } from "express";
import { BackupsController } from "../controllers/backup.controller.js";
/**
 * Estas son las rutas del backup
 * @type {Object}
 */
const routesBackup = Router();

routesBackup.get("/create", BackupsController.create)
routesBackup.get("/", BackupsController.getLatest);

export default routesBackup;
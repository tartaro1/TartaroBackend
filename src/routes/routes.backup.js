import { Router } from "express";
import { BackupsController } from "../controllers/backup.controller.js";
const routesBackup = Router();

routesBackup.get("/", BackupsController.getLatest);
routesBackup.post("/", BackupsController.create)

export default routesBackup;
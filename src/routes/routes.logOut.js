import { Router } from "express";
import { LogOutController } from "../controllers/logout.controller.js";

const routesLogOut = Router();

routesLogOut.get("/", LogOutController.logout)

export default routesLogOut;
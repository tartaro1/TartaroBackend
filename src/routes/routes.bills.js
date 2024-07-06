import { Router } from "express";
import { BillController } from "../controllers/bills.controller.js";

const routesBills = Router();

routesBills.get("/:id", BillController.getById)

export default routesBills;
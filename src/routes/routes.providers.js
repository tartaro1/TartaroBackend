import { Router } from "express";
import { ProviderController } from "../controllers/providers.controller.js";

const routesProviders = Router();
routesProviders.get("/:id", ProviderController.getById)
routesProviders.get("/", ProviderController.getAll);
routesProviders.post("/", ProviderController.create)
routesProviders.put("/:id", ProviderController.update);
routesProviders.delete("/:id", ProviderController.delete);
export default routesProviders;
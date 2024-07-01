import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { isAdmin, verifyToken } from "../middleware/token.js";
const routesUsers = Router();

routesUsers.get("/", UsersController.getAll);
routesUsers.get("/:id", UsersController.getById);
routesUsers.post("/", UsersController.createUser);
routesUsers.delete("/:id", UsersController.deleteUser);
routesUsers.patch("/:id", UsersController.updateUser);
routesUsers.post("/login", UsersController.loginUser);
routesUsers.post("/oauth", verifyToken, UsersController.authenticate)
export default routesUsers;
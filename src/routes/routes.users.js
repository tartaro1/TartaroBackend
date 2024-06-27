import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { isAdmin, verifyToken } from "../middleware/token.js";
const routesUsers = Router();

routesUsers.get("/", UsersController.getAll);
routesUsers.get("/:id", UsersController.getById);
routesUsers.post("/", UsersController.createUser);
routesUsers.delete("/:id", verifyToken, isAdmin, UsersController.deleteUser);
routesUsers.patch("/:id", verifyToken, isAdmin, UsersController.updateUser);
routesUsers.post("/login", UsersController.loginUser);
export default routesUsers;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usersController = _interopRequireDefault(require("../controllers/users.controller.js"));
var _token = require("../middleware/token.js");
/**
 * Estas son las rutas de los users
 * @type {Object}
 */
var routesUsers = (0, _express.Router)();
routesUsers.get("/", _usersController["default"].getAll);
routesUsers.get("/:id", _usersController["default"].getById);
routesUsers.post("/", _usersController["default"].createUser);
routesUsers["delete"]("/:id", _usersController["default"].deleteUser);
routesUsers.patch("/:id", _usersController["default"].updateUser);
routesUsers.post("/login", _usersController["default"].loginUser);
routesUsers.post("/oauth", _token.verifyToken, _usersController["default"].authenticate);
var _default = exports["default"] = routesUsers;
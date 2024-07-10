"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _dealersController = require("../controllers/dealers.controller.js");
var _token = require("../middleware/token.js");
/**
 * Estas son las rutas de delivers
 * @type {Object}
 */
var routesDelivers = (0, _express.Router)();
routesDelivers.get("/", _dealersController.DealersController.getAll);
routesDelivers.get("/:id", _dealersController.DealersController.getById);
routesDelivers.post("/", _dealersController.DealersController.create);
routesDelivers["delete"]("/:id", _dealersController.DealersController["delete"]);
routesDelivers.patch("/:id", _dealersController.DealersController.update);
var _default = exports["default"] = routesDelivers;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _providersController = require("../controllers/providers.controller.js");
var routesProviders = (0, _express.Router)();
routesProviders.get("/:id", _providersController.ProviderController.getById);
routesProviders.get("/", _providersController.ProviderController.getAll);
routesProviders.post("/", _providersController.ProviderController.create);
routesProviders.put("/:id", _providersController.ProviderController.update);
routesProviders["delete"]("/:id", _providersController.ProviderController["delete"]);
var _default = exports["default"] = routesProviders;
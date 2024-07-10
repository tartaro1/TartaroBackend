"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _detailsController = require("../controllers/details.controller.js");
var _token = require("../middleware/token.js");
/**
 * Estas son las rutas de detailsOrders
 * @type {Object}
 */
var routesDetails = (0, _express.Router)();
routesDetails.get("/", _detailsController.DetailsController.getAll);
routesDetails.get("/:id", _detailsController.DetailsController.getOrderProducts);
routesDetails.post("/", _detailsController.DetailsController.create);
routesDetails["delete"]("/:id", _detailsController.DetailsController["delete"]);
routesDetails.patch("/:id", _detailsController.DetailsController.update);
var _default = exports["default"] = routesDetails;
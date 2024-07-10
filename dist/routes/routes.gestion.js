"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _gestionController = require("../controllers/gestion.controller.js");
/**
 * Estas son las rutas de Gestion
 * @type {Object}
 */
var routesGestion = (0, _express.Router)();
routesGestion.get("/", _gestionController.GestionController.getLatest);
routesGestion.post("/", _gestionController.GestionController.create);
var _default = exports["default"] = routesGestion;
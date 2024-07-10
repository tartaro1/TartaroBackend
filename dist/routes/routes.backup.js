"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _backupController = require("../controllers/backup.controller.js");
/**
 * Estas son las rutas del backup
 * @type {Object}
 */
var routesBackup = (0, _express.Router)();
routesBackup.get("/create", _backupController.BackupsController.create);
routesBackup.get("/", _backupController.BackupsController.getLatest);
var _default = exports["default"] = routesBackup;
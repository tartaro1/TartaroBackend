"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _billsController = require("../controllers/bills.controller.js");
var routesBills = (0, _express.Router)();
routesBills.get("/:id", _billsController.BillController.getById);
var _default = exports["default"] = routesBills;
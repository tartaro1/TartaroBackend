"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ordersController = require("../controllers/orders.controller.js");
/**
 * Estas son las rutas de Orders
 * @type {Object}
 */
var routesOrders = (0, _express.Router)();
routesOrders.get("/daily", _ordersController.OrdersController.dailySales);
routesOrders.get("/suma", _ordersController.OrdersController.sumSales);
routesOrders.get("/sales", _ordersController.OrdersController.countSales);
routesOrders.get("/", _ordersController.OrdersController.getAll);
routesOrders.get("/:id", _ordersController.OrdersController.getById);
routesOrders.post("/", _ordersController.OrdersController.create);
routesOrders.patch("/:id", _ordersController.OrdersController.update);
routesOrders.patch("/state/:id", _ordersController.OrdersController.updateState);
routesOrders["delete"]("/:id", _ordersController.OrdersController["delete"]);
var _default = exports["default"] = routesOrders;
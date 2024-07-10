"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productsController = require("../controllers/products.controller.js");
/**
 * Estas son las rutas de products
 * @type {Object}
 */
var routesProducts = (0, _express.Router)();
routesProducts.get("/most", _productsController.ProductController.mostSales);
routesProducts.get("/top", _productsController.ProductController.top);
routesProducts.get("/stock", _productsController.ProductController.stock);
routesProducts.get("/:id", _productsController.ProductController.getById);
routesProducts.get("/", _productsController.ProductController.getAll);
routesProducts.get("/:name", _productsController.ProductController.getByName);
routesProducts.post("/", _productsController.ProductController.createProduct);
routesProducts["delete"]("/:id", _productsController.ProductController.deleteProduct);
routesProducts.patch("/:id", _productsController.ProductController.updateProduct);
var _default = exports["default"] = routesProducts;
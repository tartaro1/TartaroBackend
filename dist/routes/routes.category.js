"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _categoriesController = require("../controllers/categories.controller.js");
var routesCategories = (0, _express.Router)();
routesCategories.get("/:id", _categoriesController.CategoryController.getById);
routesCategories["delete"]("/:id", _categoriesController.CategoryController["delete"]);
routesCategories.get("/", _categoriesController.CategoryController.getAll);
routesCategories.post("/", _categoriesController.CategoryController.create);
routesCategories.put("/:id", _categoriesController.CategoryController.update);
var _default = exports["default"] = routesCategories;
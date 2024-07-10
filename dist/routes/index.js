"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _routesProduct = _interopRequireDefault(require("./routes.product.js"));
var _routesUsers = _interopRequireDefault(require("./routes.users.js"));
var _routesOrders = _interopRequireDefault(require("./routes.orders.js"));
var _routesDealers = _interopRequireDefault(require("./routes.dealers.js"));
var _express = require("express");
var _routesDetails = _interopRequireDefault(require("./routes.details.js"));
var _routesBackup = _interopRequireDefault(require("./routes.backup.js"));
var _routesGestion = _interopRequireDefault(require("./routes.gestion.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../tools/swagger-output.json"));
var _routesBills = _interopRequireDefault(require("./routes.bills.js"));
var _routesProviders = _interopRequireDefault(require("./routes.providers.js"));
var _routesCategory = _interopRequireDefault(require("./routes.category.js"));
/**
 * Estas son las rutas de mi proyecto
 * @type {Object}
 */
var indexRouter = (0, _express.Router)();
indexRouter.use("/bills", _routesBills["default"]);
indexRouter.use("/products", _routesProduct["default"]);
indexRouter.use("/users", _routesUsers["default"]);
indexRouter.use("/dealers", _routesDealers["default"]);
indexRouter.use("/orders", _routesOrders["default"]);
indexRouter.use("/detailsOrders", _routesDetails["default"]);
indexRouter.use("/backup", _routesBackup["default"]);
indexRouter.use("/gestion", _routesGestion["default"]);
indexRouter.use("/providers", _routesProviders["default"]);
indexRouter.use("/categories", _routesCategory["default"]);
indexRouter.use("/doc", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
var _default = exports["default"] = indexRouter;
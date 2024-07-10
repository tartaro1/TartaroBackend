"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDealer = validateDealer;
exports.validatePartialUser = validatePartialUser;
var _zod = _interopRequireDefault(require("zod"));
var orderSchema = _zod["default"].object({
  EstadoPedido: _zod["default"].string()["default"]("Activo"),
  Direccion: _zod["default"].string(),
  Cliente: _zod["default"].number()["int"](),
  PrecioVenta: _zod["default"].number(),
  ID_Rol: _zod["default"].number()["int"]()
});
function validateDealer(input) {
  return orderSchema.safeParse(input);
}
function validatePartialUser(input) {
  return orderSchema.partial().safeParse(input);
}
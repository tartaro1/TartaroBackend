"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePartialUser = validatePartialUser;
exports.validateUser = validateUser;
var _zod = _interopRequireDefault(require("zod"));
var userSchema = _zod["default"].object({
  Nombre: _zod["default"].string(),
  Celular: _zod["default"].string(),
  Cedula: _zod["default"].number()["int"](),
  Direccion: _zod["default"].string(),
  Correo: _zod["default"].string(),
  Contrasena: _zod["default"].string(),
  ID_Rol: _zod["default"].number()["int"]()["default"](1),
  Estado: _zod["default"].string()["default"]("Activo")
});
function validateUser(input) {
  return userSchema.safeParse(input);
}
function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
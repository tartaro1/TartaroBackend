"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = void 0;
exports.success = success;
function success(req, res, statusCode, message) {
  var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  res.status(statusCode).json({
    status: "success",
    message: message,
    data: data
  });
}
var error = exports.error = function error(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var mensaje = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  res.status(status).json({
    error: true,
    status: status,
    body: mensaje
  });
};
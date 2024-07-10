"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isAdmin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var verifyToken = exports.verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.headers["x-access-token"];
          if (token) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: "Access denied"
          }));
        case 3:
          _context.prev = 3;
          _context.next = 6;
          return _jsonwebtoken["default"].verify(token, process.env.TOKEN_PRIVATEKEY);
        case 6:
          decoded = _context.sent;
          req.user = decoded;
          next();
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", res.status(401).json({
            message: "Invalid token"
          }));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 11]]);
  }));
  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var isAdmin = exports.isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.Rol === 2) {
    next();
  } else {
    return res.status(403).json({
      message: "Forbidden: Admins only"
    });
  }
};
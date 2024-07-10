"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BillController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _message = require("../message/message.js");
var _bill = require("../models/bill.js");
/**
 * Controlador para las operaciones relacionadas con las facturas
 * @class BillController
 */
var BillController = exports.BillController = /*#__PURE__*/(0, _createClass2["default"])(function BillController() {
  (0, _classCallCheck2["default"])(this, BillController);
});
/**
 * Obtiene una factura por su ID
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
(0, _defineProperty2["default"])(BillController, "getById", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, bill;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.prev = 1;
          _context.next = 4;
          return _bill.BillModel.getById({
            id: id
          });
        case 4:
          bill = _context.sent;
          res.json(bill);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          (0, _message.error)(req, res, 404, "Bill not found");
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
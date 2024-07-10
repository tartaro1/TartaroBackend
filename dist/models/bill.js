"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BillModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con las facturas en la base de datos.
 * @class BillModel
 */
var BillModel = exports.BillModel = /*#__PURE__*/(0, _createClass2["default"])(function BillModel() {
  (0, _classCallCheck2["default"])(this, BillModel);
});
/**
 * Obtiene los detalles de una factura por su ID.
 * @param {object} params - Parámetros para obtener la factura.
 * @param {number} params.id - ID de la factura.
 * @returns {Promise<object>} Objeto con la información de la factura y sus productos.
 * @throws {Error} Si hay un error durante la consulta.
 */
(0, _defineProperty2["default"])(BillModel, "getById", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var id, connection, _yield$connection$que, _yield$connection$que2, results, fields, facturaInfo, productosInfo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = _ref.id;
          _context.next = 3;
          return _dbConfig["default"].getConnection();
        case 3:
          connection = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return connection.query("CALL ObtenerDetalleFactura(?)", [id]);
        case 7:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 2);
          results = _yield$connection$que2[0];
          fields = _yield$connection$que2[1];
          facturaInfo = results[0][0];
          productosInfo = results[1];
          return _context.abrupt("return", {
            facturaInfo: facturaInfo,
            productosInfo: productosInfo
          });
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          throw new Error(_context.t0);
        case 19:
          _context.prev = 19;
          connection.release();
          return _context.finish(19);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 16, 19, 22]]);
  }));
  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
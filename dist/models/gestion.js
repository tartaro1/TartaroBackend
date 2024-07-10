"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestionModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con la gestión de contenidos informativos en la base de datos.
 * @class GestionModel
 */
var GestionModel = exports.GestionModel = /*#__PURE__*/function () {
  function GestionModel() {
    (0, _classCallCheck2["default"])(this, GestionModel);
  }
  return (0, _createClass2["default"])(GestionModel, null, [{
    key: "getLatest",
    value: (
    /**
     * Obtiene el último contenido informativo gestionado.
     * @returns {Promise<object>} El último contenido informativo gestionado.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getLatest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, gestion;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_GESTION()");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              gestion = _yield$connection$que2[0];
              return _context.abrupt("return", gestion[0]);
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              throw new Error(_context.t0);
            case 15:
              _context.prev = 15;
              connection.release();
              return _context.finish(15);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 12, 15, 18]]);
      }));
      function getLatest() {
        return _getLatest.apply(this, arguments);
      }
      return getLatest;
    }()
    /**
     * Crea un nuevo contenido informativo en la base de datos.
     * @param {object} params - Parámetros del nuevo contenido informativo.
     * @param {string} params.input.titulo - Título del contenido informativo.
     * @param {string} params.input.contenido - Contenido del contenido informativo.
     * @param {string} params.input.pdf_path - Ruta del archivo PDF asociado al contenido informativo.
     * @returns {Promise<object>} El contenido informativo creado.
     * @throws {Error} Si hay un error durante la creación del contenido informativo.
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var input, connection, titulo, contenido, pdf_path, _yield$connection$que3, _yield$connection$que4, gestion;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              input = _ref.input;
              _context2.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context2.sent;
              _context2.prev = 4;
              titulo = input.titulo, contenido = input.contenido, pdf_path = input.pdf_path;
              _context2.next = 8;
              return connection.query("CALL SP_INSERTAR_CONTENIDO_INFORMATIVO(?, ?, ?)", [titulo, contenido, pdf_path]);
            case 8:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              gestion = _yield$connection$que4[0];
              return _context2.abrupt("return", gestion);
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              throw new Error(_context2.t0);
            case 17:
              _context2.prev = 17;
              connection.release();
              return _context2.finish(17);
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 14, 17, 20]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }())
  }]);
}();
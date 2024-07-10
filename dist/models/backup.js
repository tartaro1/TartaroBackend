"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackupsModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con los backups en la base de datos.
 * @class BackupsModel
 */
var BackupsModel = exports.BackupsModel = /*#__PURE__*/function () {
  function BackupsModel() {
    (0, _classCallCheck2["default"])(this, BackupsModel);
  }
  return (0, _createClass2["default"])(BackupsModel, null, [{
    key: "getLatest",
    value: (
    /**
     * Obtiene la información del último backup realizado.
     * @returns {Promise<object>} Información del último backup.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getLatest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, backup;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_FECHACOPIA()");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              backup = _yield$connection$que2[0];
              return _context.abrupt("return", backup[0]);
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
     * Crea un nuevo backup en la base de datos.
     * @param {object} params - Parámetros para crear un nuevo backup.
     * @param {object} params.input - Datos del nuevo backup a crear.
     * @param {string} params.input.NombreBd - Nombre de la base de datos.
     * @param {string} params.input.VersionBd - Versión de la base de datos.
     * @param {string} params.input.Tipo - Tipo de backup.
     * @param {string} params.input.Ubicacion - Ubicación del backup.
     * @param {string} params.input.Informacion - Información adicional del backup.
     * @returns {Promise<object>} Nuevo backup creado.
     * @throws {Error} Si hay un error durante la creación del backup.
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var input, connection, NombreBd, VersionBd, Tipo, Ubicacion, Informacion, _yield$connection$que3, _yield$connection$que4, backup;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              input = _ref.input;
              _context2.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context2.sent;
              _context2.prev = 4;
              NombreBd = input.NombreBd, VersionBd = input.VersionBd, Tipo = input.Tipo, Ubicacion = input.Ubicacion, Informacion = input.Informacion;
              _context2.next = 8;
              return connection.query("CALL SP_CREARCOPIA(?, ?, ?, ?, ?)", [NombreBd, VersionBd, Tipo, Ubicacion, Informacion]);
            case 8:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              backup = _yield$connection$que4[0];
              return _context2.abrupt("return", backup);
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
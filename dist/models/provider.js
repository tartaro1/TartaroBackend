"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con los proveedores en la base de datos.
 * @class ProviderModel
 */
var ProviderModel = exports.ProviderModel = /*#__PURE__*/function () {
  function ProviderModel() {
    (0, _classCallCheck2["default"])(this, ProviderModel);
  }
  return (0, _createClass2["default"])(ProviderModel, null, [{
    key: "getById",
    value: (
    /**
     * Obtiene un proveedor por su ID.
     * @param {object} params - Parámetros para obtener el proveedor.
     * @param {number} params.id - ID del proveedor.
     * @returns {Promise<object>} Objeto con la información del proveedor.
     * @throws {Error} Si el proveedor no se encuentra o hay un error durante la consulta.
     */
    function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var id, connection, _yield$connection$que, _yield$connection$que2, provider;
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
              return connection.query("CALL SP_SELECCIONAR_PROVEEDOR(?)", [id]);
            case 7:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              provider = _yield$connection$que2[0];
              if (!(provider.length === 0)) {
                _context.next = 12;
                break;
              }
              throw new Error("provider not found");
            case 12:
              return _context.abrupt("return", provider[0]);
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](4);
              throw new Error(_context.t0);
            case 18:
              _context.prev = 18;
              connection.release();
              return _context.finish(18);
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 15, 18, 21]]);
      }));
      function getById(_x) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo proveedor.
     * @param {object} params - Parámetros para crear el proveedor.
     * @param {object} params.input - Datos del nuevo proveedor.
     * @param {string} params.input.Nombre - Nombre del proveedor.
     * @param {string} params.input.Direccion - Dirección del proveedor.
     * @param {string} params.input.Telefono - Teléfono del proveedor.
     * @param {string} params.input.Correo - Correo electrónico del proveedor.
     * @returns {Promise<object>} Objeto con la información del proveedor creado.
     * @throws {Error} Si hay un error durante la creación.
     */
    )
  }, {
    key: "delete",
    value: (
    /**
     * Elimina un proveedor por su ID.
     * @param {object} params - Parámetros para eliminar el proveedor.
     * @param {number} params.id - ID del proveedor a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación.
     */
    function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var id, connection, _yield$connection$que3, _yield$connection$que4, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref2.id;
              _context2.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context2.sent;
              _context2.prev = 4;
              _context2.next = 7;
              return connection.query("CALL SP_ELIMINAR_PROVEEDOR(?)", [id]);
            case 7:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              result = _yield$connection$que4[0];
              return _context2.abrupt("return", result);
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](4);
              throw new Error(_context2.t0);
            case 16:
              _context2.prev = 16;
              connection.release();
              return _context2.finish(16);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 13, 16, 19]]);
      }));
      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }())
  }]);
}();
/**
 * Obtiene todos los proveedores.
 * @returns {Promise<Array>} Array con todos los proveedores.
 * @throws {Error} Si hay un error durante la consulta.
 */
(0, _defineProperty2["default"])(ProviderModel, "getAll", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  var connection, _yield$connection$que5, _yield$connection$que6, providers;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return _dbConfig["default"].getConnection();
      case 2:
        connection = _context3.sent;
        _context3.prev = 3;
        _context3.next = 6;
        return connection.query("CALL SP_LISTAR_PROVEEDORES();");
      case 6:
        _yield$connection$que5 = _context3.sent;
        _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
        providers = _yield$connection$que6[0];
        return _context3.abrupt("return", providers[0]);
      case 12:
        _context3.prev = 12;
        _context3.t0 = _context3["catch"](3);
        throw new Error(_context3.t0);
      case 15:
        _context3.prev = 15;
        connection.release();
        return _context3.finish(15);
      case 18:
      case "end":
        return _context3.stop();
    }
  }, _callee3, null, [[3, 12, 15, 18]]);
})));
(0, _defineProperty2["default"])(ProviderModel, "create", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
    var input, connection, Nombre, Direccion, Telefono, Correo, _yield$connection$que7, _yield$connection$que8, provider;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          input = _ref4.input;
          _context4.next = 3;
          return _dbConfig["default"].getConnection();
        case 3:
          connection = _context4.sent;
          _context4.prev = 4;
          Nombre = input.Nombre, Direccion = input.Direccion, Telefono = input.Telefono, Correo = input.Correo;
          console.log(input);
          _context4.next = 9;
          return connection.query("CALL SP_INSERTAR_PROVEEDOR(?, ?, ?, ?)", [Nombre, Direccion, Telefono, Correo]);
        case 9:
          _yield$connection$que7 = _context4.sent;
          _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
          provider = _yield$connection$que8[0];
          return _context4.abrupt("return", provider);
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          throw new Error(_context4.t0);
        case 18:
          _context4.prev = 18;
          connection.release();
          return _context4.finish(18);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 15, 18, 21]]);
  }));
  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 * Actualiza un proveedor existente.
 * @param {object} params - Parámetros para actualizar el proveedor.
 * @param {number} params.id - ID del proveedor a actualizar.
 * @param {object} params.input - Nuevos datos del proveedor.
 * @param {string} params.input.Nombre - Nuevo nombre del proveedor.
 * @param {string} params.input.Direccion - Nueva dirección del proveedor.
 * @param {string} params.input.Telefono - Nuevo teléfono del proveedor.
 * @param {string} params.input.Correo - Nuevo correo electrónico del proveedor.
 * @returns {Promise<object>} Resultado de la actualización.
 * @throws {Error} Si hay un error durante la actualización.
 */
(0, _defineProperty2["default"])(ProviderModel, "update", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref6) {
    var id, input, Nombre, Direccion, Telefono, Correo, connection, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = _ref6.id, input = _ref6.input;
          Nombre = input.Nombre, Direccion = input.Direccion, Telefono = input.Telefono, Correo = input.Correo;
          _context5.next = 4;
          return _dbConfig["default"].getConnection();
        case 4:
          connection = _context5.sent;
          _context5.prev = 5;
          _context5.next = 8;
          return connection.query("CALL SP_ACTUALIZAR_PROVEEDOR(?, ?, ?, ?, ?)", [id, Nombre, Direccion, Telefono, Correo]);
        case 8:
          result = _context5.sent;
          return _context5.abrupt("return", result);
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](5);
          throw new Error(_context5.t0);
        case 15:
          _context5.prev = 15;
          connection.release();
          return _context5.finish(15);
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[5, 12, 15, 18]]);
  }));
  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
}());
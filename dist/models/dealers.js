"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DealersModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
/**
 * Modelo para operaciones relacionadas con los repartidores en la base de datos.
 * @class DealersModel
 */
var DealersModel = exports.DealersModel = /*#__PURE__*/function () {
  function DealersModel() {
    (0, _classCallCheck2["default"])(this, DealersModel);
  }
  return (0, _createClass2["default"])(DealersModel, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los repartidores.
     * @returns {Promise<object[]>} Todos los repartidores.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, dealers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_LISTARREPARTIDORES();");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              dealers = _yield$connection$que2[0];
              return _context.abrupt("return", dealers[0]);
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
      function getAll() {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
    /**
     * Obtiene un repartidor por su correo electrónico.
     * @param {object} params - Parámetros para buscar un repartidor por correo electrónico.
     * @param {string} params.email - Correo electrónico del repartidor.
     * @returns {Promise<object>} Repartidor encontrado por su correo electrónico.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getByEmail",
    value: (function () {
      var _getByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var email, connection, _yield$connection$que3, _yield$connection$que4, dealer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              email = _ref.email;
              _context2.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context2.sent;
              _context2.prev = 4;
              _context2.next = 7;
              return connection.query("CALL SP_LISTAR_EMAIL_REPARTIDOR(?)", [email]);
            case 7:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              dealer = _yield$connection$que4[0];
              return _context2.abrupt("return", dealer[0]);
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
      function getByEmail(_x) {
        return _getByEmail.apply(this, arguments);
      }
      return getByEmail;
    }()
    /**
     * Obtiene un repartidor por su ID.
     * @param {object} params - Parámetros para buscar un repartidor por su ID.
     * @param {number} params.id - ID del repartidor.
     * @returns {Promise<object>} Repartidor encontrado por su ID.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
        var id, connection, _yield$connection$que5, _yield$connection$que6, dealer;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref2.id;
              _context3.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context3.sent;
              _context3.prev = 4;
              _context3.next = 7;
              return connection.query("CALL SP_LISTAR_REPARTIDOR(?)", [id]);
            case 7:
              _yield$connection$que5 = _context3.sent;
              _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
              dealer = _yield$connection$que6[0];
              if (!(dealer.length === 0)) {
                _context3.next = 12;
                break;
              }
              return _context3.abrupt("return", {
                message: "Dealer not found"
              });
            case 12:
              return _context3.abrupt("return", dealer[0]);
            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](4);
              throw new Error(_context3.t0);
            case 18:
              _context3.prev = 18;
              connection.release();
              return _context3.finish(18);
            case 21:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[4, 15, 18, 21]]);
      }));
      function getById(_x2) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo repartidor.
     * @param {object} params - Parámetros para crear un nuevo repartidor.
     * @param {object} params.input - Datos del nuevo repartidor a crear.
     * @param {string} params.input.Nombre - Nombre del repartidor.
     * @param {string} params.input.Celular - Número de celular del repartidor.
     * @param {string} params.input.Cedula - Número de cédula del repartidor.
     * @param {string} params.input.Direccion - Dirección del repartidor.
     * @param {string} params.input.Correo - Correo electrónico del repartidor.
     * @param {string} params.input.Contrasena - Contraseña del repartidor.
     * @param {number} params.input.ID_Rol - ID del rol del repartidor.
     * @param {boolean} params.input.Estado - Estado del repartidor (activo/inactivo).
     * @returns {Promise<object>} Nuevo repartidor creado.
     * @throws {Error} Si hay un error durante la creación del repartidor.
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref3) {
        var input, Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, Estado, passwordUnencrypted, connection, hash, passwordEncrypted, dealer, newDealer;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              input = _ref3.input;
              Nombre = input.Nombre, Celular = input.Celular, Cedula = input.Cedula, Direccion = input.Direccion, Correo = input.Correo, Contrasena = input.Contrasena, ID_Rol = input.ID_Rol, Estado = input.Estado;
              passwordUnencrypted = Contrasena;
              _context4.next = 5;
              return _dbConfig["default"].getConnection();
            case 5:
              connection = _context4.sent;
              _context4.prev = 6;
              _context4.next = 9;
              return _bcrypt["default"].hash(passwordUnencrypted, 2);
            case 9:
              hash = _context4.sent;
              passwordEncrypted = hash;
              _context4.next = 13;
              return connection.query("CALL SP_CREAR_REPARTIDOR(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            case 13:
              dealer = _context4.sent;
              _context4.next = 16;
              return connection.query("CALL SP_USUARIO_ID(?)", [dealer[0].insertId]);
            case 16:
              newDealer = _context4.sent;
              return _context4.abrupt("return", newDealer[0]);
            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](6);
              throw new Error(_context4.t0);
            case 23:
              _context4.prev = 23;
              connection.release();
              return _context4.finish(23);
            case 26:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[6, 20, 23, 26]]);
      }));
      function create(_x3) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Elimina un repartidor por su ID.
     * @param {object} params - Parámetros para eliminar un repartidor.
     * @param {number} params.id - ID del repartidor a eliminar.
     * @returns {Promise<object>} Resultado de la operación de eliminación.
     * @throws {Error} Si hay un error durante la eliminación del repartidor.
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref4) {
        var id, connection, _yield$connection$que7, _yield$connection$que8, deletedDealer;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = _ref4.id;
              _context5.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context5.sent;
              _context5.prev = 4;
              _context5.next = 7;
              return connection.query("CALL SP_EliminarUsuario(?)", [id]);
            case 7:
              _yield$connection$que7 = _context5.sent;
              _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
              deletedDealer = _yield$connection$que8[0];
              return _context5.abrupt("return", deletedDealer);
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](4);
              throw new Error(_context5.t0);
            case 16:
              _context5.prev = 16;
              connection.release();
              return _context5.finish(16);
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[4, 13, 16, 19]]);
      }));
      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Actualiza un repartidor por su ID.
     * @param {object} params - Parámetros para actualizar un repartidor.
     * @param {number} params.id - ID del repartidor a actualizar.
     * @param {object} params.input - Datos actualizados del repartidor.
     * @param {string} params.input.Nombre - Nuevo nombre del repartidor.
     * @param {string} params.input.Celular - Nuevo número de celular del repartidor.
     * @param {string} params.input.Cedula - Nuevo número de cédula del repartidor.
     * @param {string} params.input.Direccion - Nueva dirección del repartidor.
     * @param {string} params.input.Correo - Nuevo correo electrónico del repartidor.
     * @param {string} params.input.Contrasena - Nueva contraseña del repartidor.
     * @param {number} params.input.ID_Rol - Nuevo ID del rol del repartidor.
     * @param {boolean} params.input.Estado - Nuevo estado del repartidor (activo/inactivo).
     * @returns {Promise<object>} Resultado de la operación de actualización.
     * @throws {Error} Si hay un error durante la actualización del repartidor.
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref5) {
        var id, input, Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, Estado, connection, _yield$connection$que9, _yield$connection$que10, currentPasswordRow, currentPasswordEncrypted, passwordEncrypted, hash, request;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref5.id, input = _ref5.input;
              Nombre = input.Nombre, Celular = input.Celular, Cedula = input.Cedula, Direccion = input.Direccion, Correo = input.Correo, Contrasena = input.Contrasena, ID_Rol = input.ID_Rol, Estado = input.Estado;
              _context6.next = 4;
              return _dbConfig["default"].getConnection();
            case 4:
              connection = _context6.sent;
              _context6.prev = 5;
              _context6.next = 8;
              return connection.query('SELECT Contrasena FROM usuarios WHERE ID_Usuario = ?', [id]);
            case 8:
              _yield$connection$que9 = _context6.sent;
              _yield$connection$que10 = (0, _slicedToArray2["default"])(_yield$connection$que9, 1);
              currentPasswordRow = _yield$connection$que10[0];
              currentPasswordEncrypted = currentPasswordRow[0].Contrasena; // Verificar si la contraseña ha cambiado
              passwordEncrypted = currentPasswordEncrypted;
              if (!(Contrasena !== '')) {
                _context6.next = 18;
                break;
              }
              _context6.next = 16;
              return _bcrypt["default"].hash(Contrasena, 2);
            case 16:
              hash = _context6.sent;
              passwordEncrypted = hash;
            case 18:
              _context6.next = 20;
              return connection.query('CALL SP_MODIFICAR_USUARIO(?,?,?,?,?,?,?,?,?)', [id, Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            case 20:
              request = _context6.sent;
              return _context6.abrupt("return", request);
            case 24:
              _context6.prev = 24;
              _context6.t0 = _context6["catch"](5);
              throw new Error(_context6.t0);
            case 27:
              _context6.prev = 27;
              connection.release();
              return _context6.finish(27);
            case 30:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[5, 24, 27, 30]]);
      }));
      function update(_x5) {
        return _update.apply(this, arguments);
      }
      return update;
    }())
  }]);
}();
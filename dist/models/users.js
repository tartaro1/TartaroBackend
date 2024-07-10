"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
/**
 * Modelo para operaciones relacionadas con los usuarios en la base de datos.
 * @class UserModel
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Nombre
 *         - Celular
 *         - Cedula
 *         - Direccion
 *         - Correo
 *         - Contrasena
 *         - ID_Rol
 *         - Estado
 *       properties:
 *         ID_Usuario:
 *           type: integer
 *           description: ID único del usuario
 *         Nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *         Celular:
 *           type: string
 *           description: Número de celular del usuario
 *         Cedula:
 *           type: string
 *           description: Número de cédula del usuario
 *         Direccion:
 *           type: string
 *           description: Dirección del usuario
 *         Correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         Contrasena:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         ID_Rol:
 *           type: integer
 *           description: ID del rol del usuario
 *         Estado:
 *           type: integer
 *           description: Estado del usuario
 */
var UserModel = exports.UserModel = /*#__PURE__*/function () {
  function UserModel() {
    (0, _classCallCheck2["default"])(this, UserModel);
  }
  return (0, _createClass2["default"])(UserModel, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los usuarios almacenados en la base de datos.
     * @returns {Promise<Array>} Un arreglo con todos los usuarios.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, users;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_LISTAR_USUARIOS();");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              users = _yield$connection$que2[0];
              return _context.abrupt("return", users[0]);
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
     * Obtiene un usuario por su dirección de correo electrónico.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.email - El correo electrónico del usuario a buscar.
     * @returns {Promise<object|null>} El usuario encontrado o null si no se encuentra.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getByEmail",
    value: (function () {
      var _getByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var email, connection, _yield$connection$que3, _yield$connection$que4, user;
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
              return connection.query("CALL SP_USUARIOS_EMAIL(?)", [email]);
            case 7:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              user = _yield$connection$que4[0];
              return _context2.abrupt("return", user[0]);
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
     * Obtiene un usuario por su ID.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.id - El ID del usuario a buscar.
     * @returns {Promise<object>} El usuario encontrado.
     * @throws {Error} Si el usuario no se encuentra.
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
        var id, connection, _yield$connection$que5, _yield$connection$que6, user;
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
              return connection.query("CALL SP_USUARIO_ID(?)", [id]);
            case 7:
              _yield$connection$que5 = _context3.sent;
              _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
              user = _yield$connection$que6[0];
              if (!(user.length === 0)) {
                _context3.next = 12;
                break;
              }
              throw new Error("User not found");
            case 12:
              return _context3.abrupt("return", user[0]);
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
     * Crea un nuevo usuario en la base de datos.
     * @param {object} params - Parámetros del nuevo usuario.
     * @param {string} params.Nombre - Nombre del nuevo usuario.
     * @param {string} params.Celular - Número de celular del nuevo usuario.
     * @param {string} params.Cedula - Cédula del nuevo usuario.
     * @param {string} params.Direccion - Dirección del nuevo usuario.
     * @param {string} params.Correo - Correo electrónico del nuevo usuario.
     * @param {string} params.Contrasena - Contraseña del nuevo usuario.
     * @param {number} params.ID_Rol - ID del rol del nuevo usuario.
     * @param {number} params.Estado - Estado del nuevo usuario.
     * @returns {Promise<object>} El usuario creado.
     * @throws {Error} Si hay un error durante la creación del usuario.
     */
    /**
    * @swagger
    * /users:
    *   post:
    *     summary: Crea un nuevo usuario
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       201:
    *         description: Usuario creado exitosamente
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       400:
    *         description: Datos inválidos
    *       500:
    *         description: Error del servidor
    */
    )
  }, {
    key: "createUser",
    value: (function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref3) {
        var input, Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, Estado, passwordUnencrypted, connection, hash, passwordEncrypted, result, _yield$connection$que7, _yield$connection$que8, user;
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
              return connection.query("CALL RegistrarUsuario(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            case 13:
              result = _context4.sent;
              _context4.next = 16;
              return connection.query("CALL SP_USUARIO_ID(?)", [result[0].insertId]);
            case 16:
              _yield$connection$que7 = _context4.sent;
              _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
              user = _yield$connection$que8[0];
              return _context4.abrupt("return", user[0]);
            case 22:
              _context4.prev = 22;
              _context4.t0 = _context4["catch"](6);
              throw new Error(_context4.t0);
            case 25:
              _context4.prev = 25;
              connection.release();
              return _context4.finish(25);
            case 28:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[6, 22, 25, 28]]);
      }));
      function createUser(_x3) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
    /**
     * Elimina un usuario de la base de datos por su ID.
     * @param {object} params - Parámetros de eliminación.
     * @param {number} params.id - El ID del usuario a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación del usuario.
     */
    )
  }, {
    key: "deleteUser",
    value: (function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref4) {
        var id, connection, _yield$connection$que9, _yield$connection$que10, result;
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
              _yield$connection$que9 = _context5.sent;
              _yield$connection$que10 = (0, _slicedToArray2["default"])(_yield$connection$que9, 1);
              result = _yield$connection$que10[0];
              return _context5.abrupt("return", result);
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
      function deleteUser(_x4) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
    /**
     * Actualiza un usuario en la base de datos por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del usuario a actualizar.
     * @param {object} params.input - Datos actualizados del usuario.
     * @param {string} params.input.Nombre - Nuevo nombre del usuario.
     * @param {string} params.input.Celular - Nuevo número de celular del usuario.
     * @param {string} params.input.Cedula - Nueva cédula del usuario.
     * @param {string} params.input.Direccion - Nueva dirección del usuario.
     * @param {string} params.input.Correo - Nuevo correo electrónico del usuario.
     * @param {string} params.input.Contrasena - Nueva contraseña del usuario (opcional).
     * @param {number} params.input.ID_Rol - Nuevo ID del rol del usuario.
     * @param {number} params.input.Estado - Nuevo estado del usuario.
     * @returns {Promise<object>} Resultado de la actualización.
     * @throws {Error} Si hay un error durante la actualización del usuario.
     */
    )
  }, {
    key: "updateUser",
    value: (function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref5) {
        var id, input, Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, Estado, connection, _yield$connection$que11, _yield$connection$que12, currentPasswordRow, currentPasswordEncrypted, passwordEncrypted, hash, request;
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
              _yield$connection$que11 = _context6.sent;
              _yield$connection$que12 = (0, _slicedToArray2["default"])(_yield$connection$que11, 1);
              currentPasswordRow = _yield$connection$que12[0];
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
              return _context6.abrupt("return", request[0]);
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
      function updateUser(_x5) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
    /**
     * Realiza la autenticación de un usuario por su correo electrónico y contraseña.
     * @param {object} params - Parámetros de autenticación.
     * @param {string} params.input.Correo - Correo electrónico del usuario.
     * @param {string} params.input.Contrasena - Contraseña del usuario.
     * @returns {Promise<object>} Objeto con el token de autenticación y el rol del usuario.
     * @throws {Error} Si el usuario no existe o la contraseña es incorrecta.
     */
    )
  }, {
    key: "login",
    value: (function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref6) {
        var input, connection, Correo, Contrasena, _yield$connection$que13, _yield$connection$que14, request, match, payload, token;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              input = _ref6.input;
              _context7.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context7.sent;
              Correo = input.Correo, Contrasena = input.Contrasena;
              _context7.prev = 5;
              _context7.next = 8;
              return connection.query("CALL SP_VERIFICAR_ROLES(?)", [Correo]);
            case 8:
              _yield$connection$que13 = _context7.sent;
              _yield$connection$que14 = (0, _slicedToArray2["default"])(_yield$connection$que13, 1);
              request = _yield$connection$que14[0];
              if (!(request[0].length === 0)) {
                _context7.next = 13;
                break;
              }
              throw new Error("User not found");
            case 13:
              _context7.next = 15;
              return _bcrypt["default"].compare(Contrasena, request[0][0].Contrasena);
            case 15:
              match = _context7.sent;
              if (match) {
                _context7.next = 18;
                break;
              }
              throw new Error("Password incorrect");
            case 18:
              payload = {
                Correo: request[0][0].Correo,
                Rol: request[0][0].ID_Rol
              };
              token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
                expiresIn: process.env.TOKEN_EXPIRES_IN
              });
              return _context7.abrupt("return", {
                token: token,
                role: request[0][0].ID_Rol
              });
            case 23:
              _context7.prev = 23;
              _context7.t0 = _context7["catch"](5);
              throw new Error(_context7.t0.message);
            case 26:
              _context7.prev = 26;
              connection.release();
              return _context7.finish(26);
            case 29:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[5, 23, 26, 29]]);
      }));
      function login(_x6) {
        return _login.apply(this, arguments);
      }
      return login;
    }())
  }]);
}();
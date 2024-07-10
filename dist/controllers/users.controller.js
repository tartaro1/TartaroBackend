"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _message = require("../message/message.js");
var _users = require("../models/users.js");
var _user = require("../schemas/user.js");
/**
 * Controlador para las operaciones relacionadas con los usuarios
 * @class UsersController
 */
var UsersController = /*#__PURE__*/function () {
  function UsersController() {
    (0, _classCallCheck2["default"])(this, UsersController);
  }
  return (0, _createClass2["default"])(UsersController, null, [{
    key: "getAll",
    value: (
    /**
     * Sirve para listar usuarios según su email o para mostrarlos todos
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} [req.query.email] - El email para filtrar los usuarios
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var email, user, users;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              email = req.query.email;
              if (!email) {
                _context.next = 9;
                break;
              }
              _context.next = 5;
              return _users.UserModel.getByEmail({
                email: email
              });
            case 5:
              user = _context.sent;
              res.status(200).json(user);
              // res.render("views.resultUser.ejs", { user });
              _context.next = 13;
              break;
            case 9:
              _context.next = 11;
              return _users.UserModel.getAll();
            case 11:
              users = _context.sent;
              res.status(200).json(users);
              // res.render("views.users.ejs", { users });
            case 13:
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              _context.t0(req, res, 500, "Error getting users");
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 15]]);
      }));
      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
    /**
     * Obtiene un usuario por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _users.UserModel.getById({
                id: id
              });
            case 4:
              user = _context2.sent;
              res.status(200).json(user);
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              (0, _message.error)(req, res, 404, "User not found");
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo usuario
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    )
  }, {
    key: "createUser",
    value: (function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var result, newUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              result = (0, _user.validateUser)(req.body);
              if (!result.error) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return", res.status(400).json({
                error: result.error.errors
              }));
            case 3:
              _context3.prev = 3;
              _context3.next = 6;
              return _users.UserModel.createUser({
                input: result.data
              });
            case 6:
              newUser = _context3.sent;
              (0, _message.success)(req, res, 201, "User created successfully");
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              (0, _message.error)(req, res, 500, "Couldn't create");
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 10]]);
      }));
      function createUser(_x5, _x6) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
    /**
     * Elimina un usuario por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    )
  }, {
    key: "deleteUser",
    value: (function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _context4.next = 3;
              return _users.UserModel.deleteUser({
                id: id
              });
            case 3:
              result = _context4.sent;
              try {
                if (result.affectedRows === 0) {
                  (0, _message.error)(req, res, 404, "User deleted not found");
                } else {
                  (0, _message.success)(req, res, 200, "User deleted successfully");
                }
              } catch (error) {
                error(req, res, 500, "An error occurred while deleting user");
              }
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function deleteUser(_x7, _x8) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
    /**
     * Actualiza un usuario por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del usuario
     * @param {object} req.body - El cuerpo de la petición con los datos del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    )
  }, {
    key: "updateUser",
    value: (function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, input, updatedUser;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              input = req.body;
              _context5.prev = 2;
              _context5.next = 5;
              return _users.UserModel.updateUser({
                id: id,
                input: input
              });
            case 5:
              updatedUser = _context5.sent;
              (0, _message.success)(req, res, 201, "User modified successfully");
              _context5.next = 12;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              (0, _message.error)(req, res, 400, "An error occurred while updating");
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 9]]);
      }));
      function updateUser(_x9, _x10) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
    /**
     * Autentica un usuario
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos de login
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    )
  }, {
    key: "loginUser",
    value: (function () {
      var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var input, response;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              input = req.body;
              _context6.prev = 1;
              _context6.next = 4;
              return _users.UserModel.login({
                input: input
              });
            case 4:
              response = _context6.sent;
              res.json(response);
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);
              (0, _message.error)(req, res, 400, "email or password incorrect");
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 8]]);
      }));
      function loginUser(_x11, _x12) {
        return _loginUser.apply(this, arguments);
      }
      return loginUser;
    }()
    /**
     * Autentica la sesión del usuario
     * @param {object} req - Captura peticiones HTML
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    )
  }, {
    key: "authenticate",
    value: (function () {
      var _authenticate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              (0, _message.success)(req, res, 200, "authenticated");
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function authenticate(_x13, _x14) {
        return _authenticate.apply(this, arguments);
      }
      return authenticate;
    }())
  }]);
}();
var _default = exports["default"] = UsersController;
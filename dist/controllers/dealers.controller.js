"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DealersController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _message = require("../message/message.js");
var _dealers2 = require("../models/dealers.js");
var _dealer = require("../schemas/dealer.js");
/**
 * Controlador para las operaciones relacionadas con los distribuidores
 * @class DealersController
 */
var DealersController = exports.DealersController = /*#__PURE__*/function () {
  function DealersController() {
    (0, _classCallCheck2["default"])(this, DealersController);
  }
  return (0, _createClass2["default"])(DealersController, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los distribuidores, opcionalmente filtrados por email
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} req.query.email - El email del distribuidor para filtrar
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var email, dealers, _dealers;
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
              return _dealers2.DealersModel.getByEmail({
                email: email
              });
            case 5:
              dealers = _context.sent;
              res.status(200).json(dealers);
              // res.render("views.resultDealer.ejs", { dealers });
              _context.next = 13;
              break;
            case 9:
              _context.next = 11;
              return _dealers2.DealersModel.getAll();
            case 11:
              _dealers = _context.sent;
              res.status(200).json(_dealers);
              // res.render("views.dealers.ejs", { dealers });
            case 13:
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              (0, _message.error)(req, res, 500, "Error processing dealers");
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
     * Obtiene un distribuidor por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, dealer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _dealers2.DealersModel.getById({
                id: id
              });
            case 4:
              dealer = _context2.sent;
              res.json(dealer);
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              (0, _message.error)(req, res, 404, "Dealer not found");
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
     * Crea un nuevo distribuidor
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var input, newDealer;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              input = (0, _dealer.validateDealer)(req.body);
              if (!input.error) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return", res.status(400).json({
                error: input.error.message
              }));
            case 3:
              _context3.prev = 3;
              _context3.next = 6;
              return _dealers2.DealersModel.create({
                input: input.data
              });
            case 6:
              newDealer = _context3.sent;
              (0, _message.success)(req, res, 201, "Dealer created successfully");
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              (0, _message.error)(req, res, 400, "Error while creating dealer");
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 10]]);
      }));
      function create(_x5, _x6) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Elimina un distribuidor por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, deletedDealer;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _context4.next = 3;
              return _dealers2.DealersModel["delete"]({
                id: id
              });
            case 3:
              deletedDealer = _context4.sent;
              try {
                if (deletedDealer.affectedRows === 0) {
                  (0, _message.error)(req, res, 404, "Dealer not found");
                } else {
                  (0, _message.success)(req, res, 200, "Dealer deleted successfully");
                }
              } catch (err) {
                (0, _message.error)(req, res, 500, "Error deleting dealer");
              }
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Actualiza un distribuidor por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del distribuidor
     * @param {object} req.body - El cuerpo de la petición con los datos actualizados del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, input, updatedDealer;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              input = req.body;
              _context5.prev = 2;
              _context5.next = 5;
              return _dealers2.DealersModel.update({
                id: id,
                input: input
              });
            case 5:
              updatedDealer = _context5.sent;
              (0, _message.success)(req, res, 201, "Dealer updated successfully");
              _context5.next = 12;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              (0, _message.error)(req, res, 500, "Error updating dealer");
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 9]]);
      }));
      function update(_x9, _x10) {
        return _update.apply(this, arguments);
      }
      return update;
    }())
  }]);
}();
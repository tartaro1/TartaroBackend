"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrdersController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _message = require("../message/message.js");
var _orders4 = require("../models/orders.js");
/**
 * Controlador para las operaciones relacionadas con los pedidos
 * @class OrdersController
 */
var OrdersController = exports.OrdersController = /*#__PURE__*/function () {
  function OrdersController() {
    (0, _classCallCheck2["default"])(this, OrdersController);
  }
  return (0, _createClass2["default"])(OrdersController, null, [{
    key: "getAll",
    value: (
    /**
     * Sirve para listar pedidos según el nombre del distribuidor, el usuario o el ID del distribuidor, o para mostrarlos todos
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} [req.query.dealer] - El nombre del distribuidor para filtrar los pedidos
     * @param {string} [req.query.dealerID] - El ID del distribuidor para filtrar los pedidos
     * @param {string} [req.query.user] - El usuario para filtrar los pedidos
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$query, dealer, dealerID, user, orders, _orders, _orders2, _orders3;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _req$query = req.query, dealer = _req$query.dealer, dealerID = _req$query.dealerID, user = _req$query.user;
              _context.prev = 1;
              if (!dealer) {
                _context.next = 9;
                break;
              }
              _context.next = 5;
              return _orders4.OrderModel.findByDealerName({
                dealer: dealer
              });
            case 5:
              orders = _context.sent;
              res.status(200).json(orders);
              _context.next = 27;
              break;
            case 9:
              if (!user) {
                _context.next = 16;
                break;
              }
              _context.next = 12;
              return _orders4.OrderModel.findByUser({
                user: user
              });
            case 12:
              _orders = _context.sent;
              res.status(200).json(_orders);
              _context.next = 27;
              break;
            case 16:
              if (!dealerID) {
                _context.next = 23;
                break;
              }
              _context.next = 19;
              return _orders4.OrderModel.findByDealer({
                dealerID: dealerID
              });
            case 19:
              _orders2 = _context.sent;
              res.status(200).json(_orders2);
              _context.next = 27;
              break;
            case 23:
              _context.next = 25;
              return _orders4.OrderModel.getAll();
            case 25:
              _orders3 = _context.sent;
              res.status(200).json(_orders3);
            case 27:
              _context.next = 32;
              break;
            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](1);
              res.status(500).json({
                error: _context.t0
              });
            case 32:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 29]]);
      }));
      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
    /**
     * Obtiene un pedido por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, order;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return _orders4.OrderModel.getById({
                id: id
              });
            case 4:
              order = _context2.sent;
              res.json(order);
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              (0, _message.error)(req, res, 404, "Order not found");
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 8]]);
      }));
      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo pedido
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var input, PedidoID;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              input = req.body;
              _context3.next = 4;
              return _orders4.OrderModel.create({
                input: input
              });
            case 4:
              PedidoID = _context3.sent;
              (0, _message.success)(req, res, 201, "Order created successfully", {
                PedidoID: PedidoID
              });
              _context3.next = 11;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              (0, _message.error)(req, res, 500, "Error creating order");
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function create(_x5, _x6) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Actualiza un pedido por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del pedido
     * @param {object} req.body - El cuerpo de la petición con los datos del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, input, updatedOrder;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              input = req.body;
              _context4.prev = 2;
              _context4.next = 5;
              return _orders4.OrderModel.update({
                id: id,
                input: input
              });
            case 5:
              updatedOrder = _context4.sent;
              (0, _message.success)(req, res, 201, "Order updated successfully");
              _context4.next = 12;
              break;
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              (0, _message.error)(req, res, 500, "Error updating order");
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[2, 9]]);
      }));
      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Actualiza el estado de un pedido por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del pedido
     * @param {object} req.body - El cuerpo de la petición con los datos del estado del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "updateState",
    value: (function () {
      var _updateState = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, input, updatedOrder;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              input = req.body;
              _context5.prev = 2;
              _context5.next = 5;
              return _orders4.OrderModel.updateState({
                id: id,
                input: input
              });
            case 5:
              updatedOrder = _context5.sent;
              (0, _message.success)(req, res, 201, "Order State updated successfully");
              _context5.next = 12;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              (0, _message.error)(req, res, 500, "Error updating order state");
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 9]]);
      }));
      function updateState(_x9, _x10) {
        return _updateState.apply(this, arguments);
      }
      return updateState;
    }()
    /**
     * Elimina un pedido por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, deletedOrder;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              _context6.prev = 1;
              _context6.next = 4;
              return _orders4.OrderModel["delete"]({
                id: id
              });
            case 4:
              deletedOrder = _context6.sent;
              (0, _message.success)(req, res, 201, "Order deleted successfully");
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);
              _context6.t0(req, res, 404, "An error occurred while deleting");
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 8]]);
      }));
      function _delete(_x11, _x12) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Encuentra pedidos por nombre del distribuidor
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.dealer - El nombre del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "findByDealer",
    value: (function () {
      var _findByDealer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var dealer, orderDealer;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              dealer = req.params.dealer;
              _context7.next = 4;
              return _orders4.OrderModel.findByDealer({
                dealer: dealer
              });
            case 4:
              orderDealer = _context7.sent;
              res.json(orderDealer);
              _context7.next = 11;
              break;
            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              (0, _message.error)(req, res, 404, "Couldn't find order by dealer");
            case 11:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 8]]);
      }));
      function findByDealer(_x13, _x14) {
        return _findByDealer.apply(this, arguments);
      }
      return findByDealer;
    }()
    /**
     * Cuenta las ventas totales
     * @param {object} req - Captura peticiones HTML
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "countSales",
    value: (function () {
      var _countSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var sales;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _orders4.OrderModel.countSales();
            case 3:
              sales = _context8.sent;
              res.json(sales);
              _context8.next = 10;
              break;
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              (0, _message.error)(req, res, 500, "An error occurred while processing");
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 7]]);
      }));
      function countSales(_x15, _x16) {
        return _countSales.apply(this, arguments);
      }
      return countSales;
    }()
    /**
     * Suma las ventas totales
     * @param {object} req - Captura peticiones HTML
     * @param {object} res - Devuelve peticiones HTML
     * @memberof OrdersController
     */
    )
  }, {
    key: "sumSales",
    value: (function () {
      var _sumSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var sum;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _orders4.OrderModel.sumSales();
            case 3:
              sum = _context9.sent;
              res.json(sum);
              _context9.next = 10;
              break;
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              (0, _message.error)(req, res, 500, "An error occurred while sum collecting");
            case 10:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 7]]);
      }));
      function sumSales(_x17, _x18) {
        return _sumSales.apply(this, arguments);
      }
      return sumSales;
    }())
  }, {
    key: "dailySales",
    value: function () {
      var _dailySales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var daily;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _orders4.OrderModel.dailySales();
            case 3:
              daily = _context10.sent;
              res.json(daily);
              _context10.next = 10;
              break;
            case 7:
              _context10.prev = 7;
              _context10.t0 = _context10["catch"](0);
              (0, _message.error)(req, res, 500, "An error occurred while daily collecting");
            case 10:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 7]]);
      }));
      function dailySales(_x19, _x20) {
        return _dailySales.apply(this, arguments);
      }
      return dailySales;
    }()
  }]);
}();
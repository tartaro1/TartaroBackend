"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con los pedidos en la base de datos.
 * @class OrderModel
 */
var OrderModel = exports.OrderModel = /*#__PURE__*/function () {
  function OrderModel() {
    (0, _classCallCheck2["default"])(this, OrderModel);
  }
  return (0, _createClass2["default"])(OrderModel, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los pedidos almacenados en la base de datos.
     * @returns {Promise<Array>} Un arreglo con todos los pedidos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, orders;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_LISTAR_PEDIDOS();");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              orders = _yield$connection$que2[0];
              return _context.abrupt("return", orders[0]);
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
    }())
  }, {
    key: "dailySales",
    value: function () {
      var _dailySales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var connection, _yield$connection$que3, _yield$connection$que4, orders;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context2.sent;
              _context2.prev = 3;
              _context2.next = 6;
              return connection.query("CALL SP_REPORTE_VENTAS_DIARIAS();");
            case 6:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              orders = _yield$connection$que4[0];
              return _context2.abrupt("return", orders[0]);
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](3);
              throw new Error(_context2.t0);
            case 15:
              _context2.prev = 15;
              connection.release();
              return _context2.finish(15);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 12, 15, 18]]);
      }));
      function dailySales() {
        return _dailySales.apply(this, arguments);
      }
      return dailySales;
    }()
    /**
     * Obtiene un pedido por su ID.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.id - El ID del pedido a buscar.
     * @returns {Promise<object|string>} El pedido encontrado o un mensaje indicando que no se encontró el pedido.
     * @throws {Error} Si hay un error durante la consulta.
     */
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
        var id, connection, _yield$connection$que5, _yield$connection$que6, order;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref.id;
              _context3.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context3.sent;
              _context3.prev = 4;
              _context3.next = 7;
              return connection.query("CALL SP_LISTAR_PEDIDO_ID(?)", [id]);
            case 7:
              _yield$connection$que5 = _context3.sent;
              _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
              order = _yield$connection$que6[0];
              if (!(order.length === 0)) {
                _context3.next = 12;
                break;
              }
              return _context3.abrupt("return", {
                error: "Pedido not found"
              });
            case 12:
              return _context3.abrupt("return", order[0]);
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
      function getById(_x) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo pedido en la base de datos.
     * @param {object} params - Parámetros del nuevo pedido.
     * @param {string} params.input.EstadoPedido - Estado del nuevo pedido.
     * @param {string} params.input.Direccion - Dirección de entrega del nuevo pedido.
     * @param {string} params.input.cliente - Cliente asociado al nuevo pedido.
     * @param {number} params.input.PrecioVenta - Precio de venta del nuevo pedido.
     * @param {number} params.input.ID_Repartidor - ID del repartidor asignado al nuevo pedido.
     * @returns {Promise<object>} El pedido creado.
     * @throws {Error} Si hay un error durante la creación del pedido.
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
        var input, EstadoPedido, Direccion, cliente, PrecioVenta, ID_Repartidor, connection, _yield$connection$que7, _yield$connection$que8, _yield$connection$que9, PedidoID;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              input = _ref2.input;
              EstadoPedido = input.EstadoPedido, Direccion = input.Direccion, cliente = input.cliente, PrecioVenta = input.PrecioVenta, ID_Repartidor = input.ID_Repartidor;
              _context4.next = 4;
              return _dbConfig["default"].getConnection();
            case 4:
              connection = _context4.sent;
              _context4.prev = 5;
              _context4.next = 8;
              return connection.query("CALL SP_INSERTAR_PEDIDO(?,?,?,?,?, @p_PedidoID);", [EstadoPedido, Direccion, cliente, PrecioVenta, ID_Repartidor]);
            case 8:
              _context4.next = 10;
              return connection.query("SELECT @p_PedidoID as PedidoID;");
            case 10:
              _yield$connection$que7 = _context4.sent;
              _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
              _yield$connection$que9 = (0, _slicedToArray2["default"])(_yield$connection$que8[0], 1);
              PedidoID = _yield$connection$que9[0].PedidoID;
              return _context4.abrupt("return", PedidoID);
            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](5);
              throw new Error(_context4.t0);
            case 20:
              _context4.prev = 20;
              connection.release();
              return _context4.finish(20);
            case 23:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[5, 17, 20, 23]]);
      }));
      function create(_x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Actualiza el repartidor asignado a un pedido por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del pedido a actualizar.
     * @param {object} params.input - Datos de actualización del pedido.
     * @param {number} params.input.ID_Repartidor - Nuevo ID del repartidor asignado.
     * @returns {Promise<object>} Resultado de la actualización del repartidor del pedido.
     * @throws {Error} Si hay un error durante la actualización.
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref3) {
        var id, input, ID_Repartidor, connection, orderDealer;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = _ref3.id, input = _ref3.input;
              ID_Repartidor = input.ID_Repartidor;
              _context5.next = 4;
              return _dbConfig["default"].getConnection();
            case 4:
              connection = _context5.sent;
              _context5.prev = 5;
              _context5.next = 8;
              return connection.query("CALL SP_ACTUALIZAR_PEDIDO_REPARTIDOR(?,?)", [id, ID_Repartidor]);
            case 8:
              orderDealer = _context5.sent;
              return _context5.abrupt("return", orderDealer);
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
      function update(_x3) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Actualiza el estado de un pedido por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del pedido a actualizar.
     * @param {object} params.input - Datos de actualización del pedido.
     * @param {string} params.input.EstadoPedido - Nuevo estado del pedido.
     * @returns {Promise<object>} Resultado de la actualización del estado del pedido.
     * @throws {Error} Si hay un error durante la actualización.
     */
    )
  }, {
    key: "updateState",
    value: (function () {
      var _updateState = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref4) {
        var id, input, EstadoPedido, connection, orderState;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref4.id, input = _ref4.input;
              EstadoPedido = input.EstadoPedido;
              _context6.next = 4;
              return _dbConfig["default"].getConnection();
            case 4:
              connection = _context6.sent;
              _context6.prev = 5;
              _context6.next = 8;
              return connection.query("CALL SP_ACTUALIZAR_PEDIDO_ESTADO(?,?)", [id, EstadoPedido]);
            case 8:
              orderState = _context6.sent;
              return _context6.abrupt("return", orderState);
            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](5);
              throw new Error(_context6.t0);
            case 15:
              _context6.prev = 15;
              connection.release();
              return _context6.finish(15);
            case 18:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[5, 12, 15, 18]]);
      }));
      function updateState(_x4) {
        return _updateState.apply(this, arguments);
      }
      return updateState;
    }()
    /**
     * Elimina un pedido de la base de datos por su ID.
     * @param {object} params - Parámetros de eliminación.
     * @param {number} params.id - El ID del pedido a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación del pedido.
     * @throws {Error} Si hay un error durante la eliminación del pedido.
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref5) {
        var id, connection, _yield$connection$que10, _yield$connection$que11, deletedOrder;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = _ref5.id;
              _context7.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context7.sent;
              _context7.prev = 4;
              _context7.next = 7;
              return connection.query("CALL SP_ELIMINAR_PEDIDO(?)", [id]);
            case 7:
              _yield$connection$que10 = _context7.sent;
              _yield$connection$que11 = (0, _slicedToArray2["default"])(_yield$connection$que10, 1);
              deletedOrder = _yield$connection$que11[0];
              return _context7.abrupt("return", deletedOrder);
            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](4);
              throw new Error(_context7.t0);
            case 16:
              _context7.prev = 16;
              connection.release();
              return _context7.finish(16);
            case 19:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[4, 13, 16, 19]]);
      }));
      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Busca pedidos por nombre del repartidor.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.dealer - Nombre del repartidor a buscar.
     * @returns {Promise<object>} El pedido encontrado asociado al repartidor.
     * @throws {Error} Si hay un error durante la búsqueda.
     */
    )
  }, {
    key: "findByDealerName",
    value: (function () {
      var _findByDealerName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_ref6) {
        var dealer, connection, _yield$connection$que12, _yield$connection$que13, dealerOrder;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              dealer = _ref6.dealer;
              _context8.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context8.sent;
              _context8.prev = 4;
              _context8.next = 7;
              return connection.query("CALL SP_ORDENREPARTIDOR(?)", [dealer]);
            case 7:
              _yield$connection$que12 = _context8.sent;
              _yield$connection$que13 = (0, _slicedToArray2["default"])(_yield$connection$que12, 1);
              dealerOrder = _yield$connection$que13[0];
              return _context8.abrupt("return", dealerOrder[0]);
            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](4);
              throw new Error(_context8.t0);
            case 16:
              _context8.prev = 16;
              connection.release();
              return _context8.finish(16);
            case 19:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[4, 13, 16, 19]]);
      }));
      function findByDealerName(_x6) {
        return _findByDealerName.apply(this, arguments);
      }
      return findByDealerName;
    }()
    /**
     * Busca pedidos por nombre de usuario.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.user - Nombre del usuario asociado a los pedidos.
     * @returns {Promise<Array>} Arreglo con los pedidos encontrados para el usuario especificado.
     * @throws {Error} Si hay un error durante la búsqueda.
     */
    )
  }, {
    key: "findByUser",
    value: (function () {
      var _findByUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(_ref7) {
        var user, connection, _yield$connection$que14, _yield$connection$que15, userOrder;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              user = _ref7.user;
              _context9.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context9.sent;
              _context9.prev = 4;
              _context9.next = 7;
              return connection.query("CALL SP_LISTAR_PEDIDOS_USUARIO(?)", [user]);
            case 7:
              _yield$connection$que14 = _context9.sent;
              _yield$connection$que15 = (0, _slicedToArray2["default"])(_yield$connection$que14, 1);
              userOrder = _yield$connection$que15[0];
              return _context9.abrupt("return", userOrder[0]);
            case 13:
              _context9.prev = 13;
              _context9.t0 = _context9["catch"](4);
              throw new Error(_context9.t0);
            case 16:
              _context9.prev = 16;
              connection.release();
              return _context9.finish(16);
            case 19:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[4, 13, 16, 19]]);
      }));
      function findByUser(_x7) {
        return _findByUser.apply(this, arguments);
      }
      return findByUser;
    }()
    /**
     * Busca pedidos por ID del repartidor.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.dealerID - ID del repartidor asociado a los pedidos.
     * @returns {Promise<object>} El pedido encontrado asociado al repartidor.
     * @throws {Error} Si hay un error durante la búsqueda.
     */
    )
  }, {
    key: "findByDealer",
    value: (function () {
      var _findByDealer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(_ref8) {
        var dealerID, connection, _yield$connection$que16, _yield$connection$que17, userOrder;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              dealerID = _ref8.dealerID;
              _context10.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context10.sent;
              _context10.prev = 4;
              _context10.next = 7;
              return connection.query("CALL SP_ORDEN_REPARTIDOR(?)", [dealerID]);
            case 7:
              _yield$connection$que16 = _context10.sent;
              _yield$connection$que17 = (0, _slicedToArray2["default"])(_yield$connection$que16, 1);
              userOrder = _yield$connection$que17[0];
              return _context10.abrupt("return", userOrder[0]);
            case 13:
              _context10.prev = 13;
              _context10.t0 = _context10["catch"](4);
              throw new Error(_context10.t0);
            case 16:
              _context10.prev = 16;
              connection.release();
              return _context10.finish(16);
            case 19:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[4, 13, 16, 19]]);
      }));
      function findByDealer(_x8) {
        return _findByDealer.apply(this, arguments);
      }
      return findByDealer;
    }()
    /**
     * Cuenta el número total de ventas realizadas.
     * @returns {Promise<object>} Detalle de productos y su conteo total de ventas.
     * @throws {Error} Si hay un error durante el conteo.
     */
    )
  }, {
    key: "countSales",
    value: (function () {
      var _countSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var connection, _yield$connection$que18, _yield$connection$que19, detailProducts;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context11.sent;
              _context11.prev = 3;
              _context11.next = 6;
              return connection.query("CALL SP_CONTAR_VENTAS()");
            case 6:
              _yield$connection$que18 = _context11.sent;
              _yield$connection$que19 = (0, _slicedToArray2["default"])(_yield$connection$que18, 1);
              detailProducts = _yield$connection$que19[0];
              return _context11.abrupt("return", detailProducts[0]);
            case 12:
              _context11.prev = 12;
              _context11.t0 = _context11["catch"](3);
              throw new Error(_context11.t0);
            case 15:
              _context11.prev = 15;
              connection.release();
              return _context11.finish(15);
            case 18:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[3, 12, 15, 18]]);
      }));
      function countSales() {
        return _countSales.apply(this, arguments);
      }
      return countSales;
    }()
    /**
     * Calcula la suma total de ganancias obtenidas.
     * @returns {Promise<Array>} Arreglo con la suma total de ganancias.
     * @throws {Error} Si hay un error durante el cálculo de ganancias.
     */
    )
  }, {
    key: "sumSales",
    value: (function () {
      var _sumSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var connection, _yield$connection$que20, _yield$connection$que21, rows1, _yield$connection$que22, _yield$connection$que23, rows2;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context12.sent;
              _context12.prev = 3;
              _context12.next = 6;
              return connection.query('CALL `SP_GANANCIAS`(@total)');
            case 6:
              _yield$connection$que20 = _context12.sent;
              _yield$connection$que21 = (0, _slicedToArray2["default"])(_yield$connection$que20, 1);
              rows1 = _yield$connection$que21[0];
              _context12.next = 11;
              return connection.query('SELECT @total AS total');
            case 11:
              _yield$connection$que22 = _context12.sent;
              _yield$connection$que23 = (0, _slicedToArray2["default"])(_yield$connection$que22, 1);
              rows2 = _yield$connection$que23[0];
              return _context12.abrupt("return", rows2);
            case 17:
              _context12.prev = 17;
              _context12.t0 = _context12["catch"](3);
              throw new Error(_context12.t0.message);
            case 20:
              _context12.prev = 20;
              connection.release();
              return _context12.finish(20);
            case 23:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[3, 17, 20, 23]]);
      }));
      function sumSales() {
        return _sumSales.apply(this, arguments);
      }
      return sumSales;
    }())
  }]);
}();
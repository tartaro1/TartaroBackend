"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con los detalles de pedidos en la base de datos.
 * @class DetailsModel
 */
var DetailsModel = exports.DetailsModel = /*#__PURE__*/function () {
  function DetailsModel() {
    (0, _classCallCheck2["default"])(this, DetailsModel);
  }
  return (0, _createClass2["default"])(DetailsModel, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los detalles de pedidos.
     * @returns {Promise<object[]>} Todos los detalles de pedidos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_DATOSPEDIDOS();");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              result = _yield$connection$que2[0];
              return _context.abrupt("return", result[0]);
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
     * Obtiene los detalles de pedidos filtrados por proveedor.
     * @param {object} params - Parámetros para filtrar por proveedor.
     * @param {string} params.provider - Nombre o identificador del proveedor.
     * @returns {Promise<object[]>} Detalles de pedidos filtrados por proveedor.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getByProvider",
    value: (function () {
      var _getByProvider = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var provider, connection, _yield$connection$que3, _yield$connection$que4, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              provider = _ref.provider;
              _context2.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context2.sent;
              _context2.prev = 4;
              _context2.next = 7;
              return connection.query("CALL SP_FILTRARPROVEEDOR(?);", [provider]);
            case 7:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              result = _yield$connection$que4[0];
              return _context2.abrupt("return", result[0]);
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
      function getByProvider(_x) {
        return _getByProvider.apply(this, arguments);
      }
      return getByProvider;
    }()
    /**
     * Obtiene los productos de un pedido específico.
     * @param {object} params - Parámetros para obtener los productos de un pedido.
     * @param {number} params.id - Identificador del pedido.
     * @returns {Promise<object[]>} Productos del pedido especificado.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getOrderProducts",
    value: (function () {
      var _getOrderProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
        var id, connection, _yield$connection$que5, _yield$connection$que6, result;
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
              return connection.query("CALL SP_ORDENPRODUCTOS(?)", [id]);
            case 7:
              _yield$connection$que5 = _context3.sent;
              _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
              result = _yield$connection$que6[0];
              return _context3.abrupt("return", result[0]);
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](4);
              throw new Error(_context3.t0);
            case 16:
              _context3.prev = 16;
              connection.release();
              return _context3.finish(16);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[4, 13, 16, 19]]);
      }));
      function getOrderProducts(_x2) {
        return _getOrderProducts.apply(this, arguments);
      }
      return getOrderProducts;
    }()
    /**
     * Elimina un detalle de pedido específico.
     * @param {object} params - Parámetros para eliminar un detalle de pedido.
     * @param {number} params.id - Identificador del detalle de pedido a eliminar.
     * @returns {Promise<object>} Resultado de la operación de eliminación.
     * @throws {Error} Si hay un error durante la operación.
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref3) {
        var id, connection, _yield$connection$que7, _yield$connection$que8, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              id = _ref3.id;
              _context4.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context4.sent;
              _context4.prev = 4;
              _context4.next = 7;
              return connection.query("CALL SP_ELIMINARPRODUCTOORDEN(?)", [id]);
            case 7:
              _yield$connection$que7 = _context4.sent;
              _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
              result = _yield$connection$que8[0];
              return _context4.abrupt("return", result[0]);
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](4);
              throw new Error(_context4.t0);
            case 16:
              _context4.prev = 16;
              connection.release();
              return _context4.finish(16);
            case 19:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[4, 13, 16, 19]]);
      }));
      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Crea un nuevo detalle de pedido.
     * @param {object} params - Parámetros para crear un nuevo detalle de pedido.
     * @param {number} params.input.ID_Pedido - Identificador del pedido asociado.
     * @param {number} params.input.ID_Producto - Identificador del producto asociado.
     * @param {number} params.input.cantidad - Cantidad del producto en el pedido.
     * @param {number} params.input.PrecioVenta - Precio de venta unitario del producto.
     * @param {number} params.input.Descuento - Descuento aplicado al producto.
     * @returns {Promise<object>} Detalle de pedido creado.
     * @throws {Error} Si hay un error durante la creación del detalle de pedido.
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref4) {
        var input, MAX_RETRIES, ID_Pedido, ID_Producto, cantidad, PrecioVenta, Descuento, connection, attempt;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              input = _ref4.input;
              MAX_RETRIES = 3; // Máximo de intentos de reintento
              ID_Pedido = input.ID_Pedido, ID_Producto = input.ID_Producto, cantidad = input.cantidad, PrecioVenta = input.PrecioVenta, Descuento = input.Descuento;
              _context5.next = 5;
              return _dbConfig["default"].getConnection();
            case 5:
              connection = _context5.sent;
              attempt = 0;
            case 7:
              if (!(attempt < MAX_RETRIES)) {
                _context5.next = 34;
                break;
              }
              _context5.prev = 8;
              _context5.next = 11;
              return connection.beginTransaction();
            case 11:
              _context5.next = 13;
              return connection.query("CALL SP_INSERTAR_DETALLE_PEDIDO(?,?,?,?,?)", [ID_Pedido, ID_Producto, cantidad, PrecioVenta, Descuento]);
            case 13:
              _context5.next = 15;
              return connection.commit();
            case 15:
              return _context5.abrupt("return");
            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](8);
              _context5.next = 22;
              return connection.rollback();
            case 22:
              if (!_context5.t0.message.includes('Deadlock found when trying to get lock')) {
                _context5.next = 28;
                break;
              }
              attempt++;
              if (!(attempt >= MAX_RETRIES)) {
                _context5.next = 26;
                break;
              }
              throw new Error('Deadlock found after maximum retries');
            case 26:
              _context5.next = 29;
              break;
            case 28:
              throw new Error(_context5.t0);
            case 29:
              _context5.prev = 29;
              connection.release();
              return _context5.finish(29);
            case 32:
              _context5.next = 7;
              break;
            case 34:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[8, 18, 29, 32]]);
      }));
      function create(_x4) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Actualiza un detalle de pedido existente.
     * @param {object} params - Parámetros para actualizar un detalle de pedido.
     * @param {number} params.id - Identificador del detalle de pedido a actualizar.
     * @param {object} params.input - Datos actualizados del detalle de pedido.
     * @param {number} params.input.Cantidad - Nueva cantidad del producto en el pedido.
     * @returns {Promise<object>} Resultado de la operación de actualización.
     * @throws {Error} Si hay un error durante la actualización del detalle de pedido.
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref5) {
        var id, input, Cantidad, connection, detailsProducts;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref5.id, input = _ref5.input;
              Cantidad = input.Cantidad;
              _context6.next = 4;
              return _dbConfig["default"].getConnection();
            case 4:
              connection = _context6.sent;
              _context6.prev = 5;
              _context6.next = 8;
              return connection.query("CALL SP_MODIFICAR_DETALLEPEDIDO(?,?)", [id, Cantidad]);
            case 8:
              detailsProducts = _context6.sent;
              return _context6.abrupt("return", detailsProducts);
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
      function update(_x5) {
        return _update.apply(this, arguments);
      }
      return update;
    }())
  }, {
    key: "findByProvider",
    value: function () {
      var _findByProvider = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(idProvider) {
        var connection, products;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context7.sent;
              _context7.prev = 3;
              _context7.next = 6;
              return connection.query("CALL SP_SELECCIONAR_PRODUCTOS_POR_PROVEEDOR(?)", [idProvider]);
            case 6:
              products = _context7.sent;
              return _context7.abrupt("return", products[0][0]);
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](3);
              throw new Error(_context7.t0);
            case 13:
              _context7.prev = 13;
              connection.release();
              return _context7.finish(13);
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[3, 10, 13, 16]]);
      }));
      function findByProvider(_x6) {
        return _findByProvider.apply(this, arguments);
      }
      return findByProvider;
    }()
  }]);
}();
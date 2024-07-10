"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Modelo para operaciones relacionadas con los productos en la base de datos.
 * @class ProductModel
 */
var ProductModel = exports.ProductModel = /*#__PURE__*/function () {
  function ProductModel() {
    (0, _classCallCheck2["default"])(this, ProductModel);
  }
  return (0, _createClass2["default"])(ProductModel, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los productos almacenados en la base de datos.
     * @returns {Promise<Array>} Un arreglo con todos los productos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, _yield$connection$que, _yield$connection$que2, products;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return connection.query("CALL SP_MOSTRARPRODUCTOS();");
            case 6:
              _yield$connection$que = _context.sent;
              _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
              products = _yield$connection$que2[0];
              return _context.abrupt("return", products[0]);
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
     * Obtiene productos por categoría.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.category - La categoría de los productos a buscar.
     * @returns {Promise<Array>} Arreglo con los productos encontrados para la categoría especificada.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getByCategory",
    value: (function () {
      var _getByCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var category, connection, _yield$connection$que3, _yield$connection$que4, products;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              category = _ref.category;
              _context2.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context2.sent;
              _context2.prev = 4;
              _context2.next = 7;
              return connection.query("CALL SP_BuscarCategoria(?);", [category]);
            case 7:
              _yield$connection$que3 = _context2.sent;
              _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
              products = _yield$connection$que4[0];
              if (!(products.length === 0)) {
                _context2.next = 12;
                break;
              }
              return _context2.abrupt("return", []);
            case 12:
              return _context2.abrupt("return", products[0]);
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](4);
              throw new Error(_context2.t0);
            case 18:
              _context2.prev = 18;
              connection.release();
              return _context2.finish(18);
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 15, 18, 21]]);
      }));
      function getByCategory(_x) {
        return _getByCategory.apply(this, arguments);
      }
      return getByCategory;
    }()
    /**
     * Obtiene productos por nombre.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.nombre - El nombre del producto a buscar.
     * @returns {Promise<Array>} Arreglo con los productos encontrados para el nombre especificado.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getByName",
    value: (function () {
      var _getByName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
        var nombre, connection, _yield$connection$que5, _yield$connection$que6, products;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              nombre = _ref2.nombre;
              _context3.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context3.sent;
              _context3.prev = 4;
              _context3.next = 7;
              return connection.query("CALL SP_BuscarProductos(?);", [nombre]);
            case 7:
              _yield$connection$que5 = _context3.sent;
              _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
              products = _yield$connection$que6[0];
              if (!(products.length === 0)) {
                _context3.next = 12;
                break;
              }
              return _context3.abrupt("return", []);
            case 12:
              return _context3.abrupt("return", products);
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
      function getByName(_x2) {
        return _getByName.apply(this, arguments);
      }
      return getByName;
    }()
    /**
     * Obtiene un producto por su ID.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.id - El ID del producto a buscar.
     * @returns {Promise<object|string>} El producto encontrado o un mensaje indicando que no se encontró el producto.
     * @throws {Error} Si hay un error durante la consulta.
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref3) {
        var id, connection, _yield$connection$que7, _yield$connection$que8, products;
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
              return connection.query("CALL SP_LISTAR_PRODUCTO(?)", [id]);
            case 7:
              _yield$connection$que7 = _context4.sent;
              _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
              products = _yield$connection$que8[0];
              if (!(products.length === 0)) {
                _context4.next = 12;
                break;
              }
              return _context4.abrupt("return", "Product not found");
            case 12:
              return _context4.abrupt("return", products[0]);
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
      function getById(_x3) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo producto en la base de datos.
     * @param {object} params - Parámetros del nuevo producto.
     * @param {string} params.input.nombre - Nombre del nuevo producto.
     * @param {number} params.input.id_categoria - ID de la categoría del nuevo producto.
     * @param {string} params.input.marca - Marca del nuevo producto.
     * @param {number} params.input.id_proveedor - ID del proveedor del nuevo producto.
     * @param {string} params.input.descripcion - Descripción del nuevo producto.
     * @param {number} params.input.precio - Precio del nuevo producto.
     * @param {number} params.input.calificacion - Calificación del nuevo producto.
     * @param {string} params.input.imagen - URL de la imagen del nuevo producto.
     * @param {number} params.input.stock - Stock inicial del nuevo producto.
     * @returns {Promise<object>} El producto creado.
     * @throws {Error} Si hay un error durante la creación del producto.
     */
    )
  }, {
    key: "createProduct",
    value: (function () {
      var _createProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(input) {
        var nombre, id_categoria, marca, id_proveedor, descripcion, precio, calificacion, imagen, stock, connection, result, _yield$connection$que9, _yield$connection$que10, product;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              nombre = input.nombre, id_categoria = input.id_categoria, marca = input.marca, id_proveedor = input.id_proveedor, descripcion = input.descripcion, precio = input.precio, calificacion = input.calificacion, imagen = input.imagen, stock = input.stock;
              _context5.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context5.sent;
              _context5.prev = 4;
              _context5.next = 7;
              return connection.query("CALL SP_AÑADIR_PRODUCTO(?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, id_categoria, marca, id_proveedor, descripcion, precio, calificacion, imagen, stock]);
            case 7:
              result = _context5.sent;
              _context5.next = 10;
              return connection.query("CALL SP_LISTAR_PRODUCTO(?)", [result[0].insertId]);
            case 10:
              _yield$connection$que9 = _context5.sent;
              _yield$connection$que10 = (0, _slicedToArray2["default"])(_yield$connection$que9, 1);
              product = _yield$connection$que10[0];
              return _context5.abrupt("return", product[0]);
            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](4);
              throw new Error(_context5.t0);
            case 19:
              _context5.prev = 19;
              connection.release();
              return _context5.finish(19);
            case 22:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[4, 16, 19, 22]]);
      }));
      function createProduct(_x4) {
        return _createProduct.apply(this, arguments);
      }
      return createProduct;
    }()
    /**
     * Elimina un producto de la base de datos por su ID.
     * @param {object} params - Parámetros de eliminación.
     * @param {number} params.id - El ID del producto a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación del producto.
     */
    )
  }, {
    key: "deleteProduct",
    value: (function () {
      var _deleteProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref4) {
        var id, connection, _yield$connection$que11, _yield$connection$que12, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = _ref4.id;
              _context6.next = 3;
              return _dbConfig["default"].getConnection();
            case 3:
              connection = _context6.sent;
              _context6.prev = 4;
              _context6.next = 7;
              return connection.query("CALL SP_EliminarProdu(?)", [id]);
            case 7:
              _yield$connection$que11 = _context6.sent;
              _yield$connection$que12 = (0, _slicedToArray2["default"])(_yield$connection$que11, 1);
              result = _yield$connection$que12[0];
              return _context6.abrupt("return", result);
            case 13:
              _context6.prev = 13;
              _context6.t0 = _context6["catch"](4);
              throw new Error(_context6.t0);
            case 16:
              _context6.prev = 16;
              connection.release();
              return _context6.finish(16);
            case 19:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[4, 13, 16, 19]]);
      }));
      function deleteProduct(_x5) {
        return _deleteProduct.apply(this, arguments);
      }
      return deleteProduct;
    }()
    /**
     * Actualiza un producto en la base de datos por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del producto a actualizar.
     * @param {object} params.input - Datos actualizados del producto.
     * @param {string} params.input.NombreProducto - Nuevo nombre del producto.
     * @param {number} params.input.ID_Categoria - Nuevo ID de la categoría del producto.
     * @param {string} params.input.Marca - Nueva marca del producto.
     * @param {number} params.input.ID_Proveedor - Nuevo ID del proveedor del producto.
     * @param {string} params.input.Descripcion - Nueva descripción del producto.
     * @param {number} params.input.PrecioVenta - Nuevo precio del producto.
     * @param {number} params.input.Calificacion - Nueva calificación del producto.
     * @param {number} params.input.Disponibilidad - Nueva disponibilidad del producto.
     * @param {string} params.input.imagen - Nueva URL de la imagen del producto.
     * @param {number} params.input.stock - Nuevo stock del producto.
     * @returns {Promise<object>} Resultado de la actualización.
     * @throws {Error} Si hay un error durante la actualización del producto.
     */
    )
  }, {
    key: "updateProduct",
    value: (function () {
      var _updateProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref5) {
        var id, input, NombreProducto, ID_Categoria, Marca, ID_Proveedor, Descripcion, PrecioVenta, Calificacion, imagen, stock, connection, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = _ref5.id, input = _ref5.input;
              NombreProducto = input.NombreProducto, ID_Categoria = input.ID_Categoria, Marca = input.Marca, ID_Proveedor = input.ID_Proveedor, Descripcion = input.Descripcion, PrecioVenta = input.PrecioVenta, Calificacion = input.Calificacion, imagen = input.imagen, stock = input.stock;
              _context7.next = 4;
              return _dbConfig["default"].getConnection();
            case 4:
              connection = _context7.sent;
              _context7.prev = 5;
              _context7.next = 8;
              return connection.query("CALL SP_MODIFICAR_PRODUCTO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, NombreProducto, ID_Categoria, Marca, ID_Proveedor, Descripcion, PrecioVenta, Calificacion, imagen, stock]);
            case 8:
              result = _context7.sent;
              return _context7.abrupt("return", result);
            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](5);
              throw new Error(_context7.t0);
            case 15:
              _context7.prev = 15;
              connection.release();
              return _context7.finish(15);
            case 18:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[5, 12, 15, 18]]);
      }));
      function updateProduct(_x6) {
        return _updateProduct.apply(this, arguments);
      }
      return updateProduct;
    }())
  }, {
    key: "stock",
    value: function () {
      var _stock = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var connection, _yield$connection$que13, _yield$connection$que14, result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context8.sent;
              _context8.prev = 3;
              _context8.next = 6;
              return connection.query("CALL SP_REPORTE_STOCK_POR_PRODUCTO()");
            case 6:
              _yield$connection$que13 = _context8.sent;
              _yield$connection$que14 = (0, _slicedToArray2["default"])(_yield$connection$que13, 1);
              result = _yield$connection$que14[0];
              return _context8.abrupt("return", result[0]);
            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](3);
              throw new Error(_context8.t0);
            case 15:
              _context8.prev = 15;
              connection.release();
              return _context8.finish(15);
            case 18:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[3, 12, 15, 18]]);
      }));
      function stock() {
        return _stock.apply(this, arguments);
      }
      return stock;
    }()
  }, {
    key: "top",
    value: function () {
      var _top = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var connection, _yield$connection$que15, _yield$connection$que16, result;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context9.sent;
              _context9.prev = 3;
              _context9.next = 6;
              return connection.query("CALL SP_TOP_PRODUCTOS()");
            case 6:
              _yield$connection$que15 = _context9.sent;
              _yield$connection$que16 = (0, _slicedToArray2["default"])(_yield$connection$que15, 1);
              result = _yield$connection$que16[0];
              return _context9.abrupt("return", result[0]);
            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](3);
              throw new Error(_context9.t0);
            case 15:
              _context9.prev = 15;
              connection.release();
              return _context9.finish(15);
            case 18:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[3, 12, 15, 18]]);
      }));
      function top() {
        return _top.apply(this, arguments);
      }
      return top;
    }()
  }, {
    key: "mostSales",
    value: function () {
      var _mostSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var connection, _yield$connection$que17, _yield$connection$que18, result;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _dbConfig["default"].getConnection();
            case 2:
              connection = _context10.sent;
              _context10.prev = 3;
              _context10.next = 6;
              return connection.query("CALL SP_OBTENER_PRODUCTOS_MAS_REPETIDOS();");
            case 6:
              _yield$connection$que17 = _context10.sent;
              _yield$connection$que18 = (0, _slicedToArray2["default"])(_yield$connection$que17, 1);
              result = _yield$connection$que18[0];
              return _context10.abrupt("return", result[0]);
            case 12:
              _context10.prev = 12;
              _context10.t0 = _context10["catch"](3);
              throw new Error(_context10.t0);
            case 15:
              _context10.prev = 15;
              connection.release();
              return _context10.finish(15);
            case 18:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[3, 12, 15, 18]]);
      }));
      function mostSales() {
        return _mostSales.apply(this, arguments);
      }
      return mostSales;
    }()
  }]);
}();
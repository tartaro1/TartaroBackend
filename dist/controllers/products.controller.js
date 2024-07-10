"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _message = require("../message/message.js");
var _products2 = require("../models/products.js");
var _product = require("../schemas/product.js");
/**
 * Controlador para las operaciones relacionadas con los productos
 * @class ProductController
 */
var ProductController = exports.ProductController = /*#__PURE__*/function () {
  function ProductController() {
    (0, _classCallCheck2["default"])(this, ProductController);
  }
  return (0, _createClass2["default"])(ProductController, null, [{
    key: "getAll",
    value: (
    /**
     * Sirve para listar productos según su categoría o para mostrarlos todos
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} [req.query.category] - La categoría para filtrar los productos
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var category, products, _products;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              category = req.query.category;
              if (!category) {
                _context.next = 9;
                break;
              }
              _context.next = 5;
              return _products2.ProductModel.getByCategory({
                category: category
              });
            case 5:
              products = _context.sent;
              res.status(200).json(products);
              // res.render("views.resultsProduct.ejs", { products });
              _context.next = 13;
              break;
            case 9:
              _context.next = 11;
              return _products2.ProductModel.getAll();
            case 11:
              _products = _context.sent;
              res.status(200).json(_products);
              // res.render("views.products.ejs", { products });
            case 13:
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              (0, _message.error)(req, res, 500, "Error getting products");
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
     * Obtiene un producto por nombre
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.name - El nombre del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    )
  }, {
    key: "getByName",
    value: (function () {
      var _getByName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var name, product;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              name = req.params.name;
              _context2.next = 3;
              return _products2.ProductModel.getByName({
                name: name
              });
            case 3:
              product = _context2.sent;
              if (!product) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", res.json(product));
            case 6:
              (0, _message.error)(req, res, 404, "Product not found");
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getByName(_x3, _x4) {
        return _getByName.apply(this, arguments);
      }
      return getByName;
    }()
    /**
     * Obtiene un producto por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, product;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.next = 3;
              return _products2.ProductModel.getById({
                id: id
              });
            case 3:
              product = _context3.sent;
              if (!product) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", res.json(product));
            case 6:
              (0, _message.error)(req, res, 404, "Product not found");
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo producto
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    )
  }, {
    key: "createProduct",
    value: (function () {
      var _createProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var input, newProduct;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              input = req.body;
              if (!result.error) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", res.status(400).json({
                error: result.error.message
              }));
            case 3:
              _context4.next = 5;
              return _products2.ProductModel.createProduct(input);
            case 5:
              newProduct = _context4.sent;
              (0, _message.success)(req, res, 201, "Product created successfully");
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function createProduct(_x7, _x8) {
        return _createProduct.apply(this, arguments);
      }
      return createProduct;
    }()
    /**
     * Elimina un producto por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    )
  }, {
    key: "deleteProduct",
    value: (function () {
      var _deleteProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, _result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.prev = 1;
              _context5.next = 4;
              return _products2.ProductModel.deleteProduct({
                id: id
              });
            case 4:
              _result = _context5.sent;
              if (_result.affectedRows === 0) {
                (0, _message.error)(req, res, 404, "Product not deleted successfully");
              } else {
                (0, _message.success)(req, res, 201, "Product deleted successfully");
              }
              _context5.next = 11;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](1);
              (0, _message.error)(req, res, 500, "An error occurred while deleting");
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[1, 8]]);
      }));
      function deleteProduct(_x9, _x10) {
        return _deleteProduct.apply(this, arguments);
      }
      return deleteProduct;
    }()
    /**
     * Actualiza un producto por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del producto
     * @param {object} req.body - El cuerpo de la petición con los datos del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    )
  }, {
    key: "updateProduct",
    value: (function () {
      var _updateProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, input, updatedProduct;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              input = req.body;
              _context6.prev = 2;
              _context6.next = 5;
              return _products2.ProductModel.updateProduct({
                id: id,
                input: input
              });
            case 5:
              updatedProduct = _context6.sent;
              (0, _message.success)(req, res, 200, "Product updated successfully");
              _context6.next = 12;
              break;
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](2);
              (0, _message.error)(req, res, 404, "Product update failed");
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[2, 9]]);
      }));
      function updateProduct(_x11, _x12) {
        return _updateProduct.apply(this, arguments);
      }
      return updateProduct;
    }())
  }, {
    key: "stock",
    value: function () {
      var _stock = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var product;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _products2.ProductModel.stock();
            case 3:
              product = _context7.sent;
              res.json(product);
              _context7.next = 10;
              break;
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              (0, _message.error)(req, res, 500, "Product stock failed");
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 7]]);
      }));
      function stock(_x13, _x14) {
        return _stock.apply(this, arguments);
      }
      return stock;
    }()
  }, {
    key: "top",
    value: function () {
      var _top = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var product;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _products2.ProductModel.top();
            case 3:
              product = _context8.sent;
              res.json(product);
              _context8.next = 10;
              break;
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              (0, _message.error)(req, res, 500, _context8.t0.message);
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 7]]);
      }));
      function top(_x15, _x16) {
        return _top.apply(this, arguments);
      }
      return top;
    }()
  }, {
    key: "mostSales",
    value: function () {
      var _mostSales = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var product;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _products2.ProductModel.mostSales();
            case 3:
              product = _context9.sent;
              res.json(product);
              _context9.next = 10;
              break;
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              (0, _message.error)(req, res, 500, _context9.t0.message);
            case 10:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 7]]);
      }));
      function mostSales(_x17, _x18) {
        return _mostSales.apply(this, arguments);
      }
      return mostSales;
    }()
  }]);
}();
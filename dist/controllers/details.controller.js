"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _message = require("../message/message.js");
var _detailsOrder = require("../models/detailsOrder.js");
/**
 * Controlador para las operaciones relacionadas con los detalles de los pedidos
 * @class DetailsController
 */
var DetailsController = exports.DetailsController = /*#__PURE__*/function () {
  function DetailsController() {
    (0, _classCallCheck2["default"])(this, DetailsController);
  }
  return (0, _createClass2["default"])(DetailsController, null, [{
    key: "getAll",
    value: (
    /**
     * Obtiene todos los detalles de los pedidos, filtrados opcionalmente por proveedor
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} req.query.provider - El nombre del proveedor para filtrar los detalles de los pedidos
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DetailsController
     */
    function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var provider, idProvider, detailsOrdersFiltered, productsProvider, detailsOrders;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              provider = req.query.provider;
              idProvider = req.query.idProvider;
              if (!provider) {
                _context.next = 10;
                break;
              }
              _context.next = 6;
              return _detailsOrder.DetailsModel.getByProvider({
                provider: provider
              });
            case 6:
              detailsOrdersFiltered = _context.sent;
              res.status(200).json(detailsOrdersFiltered);
              // res.render("views.filtered.ejs", { detailsOrdersFiltered });
              _context.next = 21;
              break;
            case 10:
              if (!idProvider) {
                _context.next = 17;
                break;
              }
              _context.next = 13;
              return _detailsOrder.DetailsModel.findByProvider(idProvider);
            case 13:
              productsProvider = _context.sent;
              res.json(productsProvider);
              _context.next = 21;
              break;
            case 17:
              _context.next = 19;
              return _detailsOrder.DetailsModel.getAll();
            case 19:
              detailsOrders = _context.sent;
              res.status(200).json(detailsOrders);
              // res.render("views.detailsOrder.ejs", { detailsOrders });
            case 21:
              _context.next = 26;
              break;
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](0);
              (0, _message.error)(req, res, 500, "Error processing details order");
            case 26:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 23]]);
      }));
      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
    /**
     * Obtiene los productos de un pedido por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DetailsController
     */
    )
  }, {
    key: "getOrderProducts",
    value: (function () {
      var _getOrderProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, detailsOrder;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _detailsOrder.DetailsModel.getOrderProducts({
                id: id
              });
            case 4:
              detailsOrder = _context2.sent;
              res.json(detailsOrder);
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              (0, _message.error)(req, res, 404, "Couldn't get details");
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function getOrderProducts(_x3, _x4) {
        return _getOrderProducts.apply(this, arguments);
      }
      return getOrderProducts;
    }()
    /**
     * Crea un nuevo detalle de pedido
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del detalle del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DetailsController
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var input;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              input = req.body;
              _context3.next = 4;
              return _detailsOrder.DetailsModel.create({
                input: input
              });
            case 4:
              (0, _message.success)(req, res, 201, "Product inserted successfully");
              _context3.next = 10;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              (0, _message.error)(req, res, 500, "Error creating product");
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function create(_x5, _x6) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Elimina un detalle de pedido por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del detalle del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DetailsController
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, productsDetails;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              _context4.next = 4;
              return _detailsOrder.DetailsModel["delete"]({
                id: id
              });
            case 4:
              productsDetails = _context4.sent;
              (0, _message.success)(req, res, 200, "Details deleted successfully");
              _context4.next = 11;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              (0, _message.error)(req, res, 404, "Could not delete details");
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 8]]);
      }));
      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Actualiza un detalle de pedido por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del detalle del pedido
     * @param {object} req.body - El cuerpo de la petición con los datos actualizados del detalle del pedido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DetailsController
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, input, productsDetails;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              input = req.body;
              _context5.next = 5;
              return _detailsOrder.DetailsModel.update({
                id: id,
                input: input
              });
            case 5:
              productsDetails = _context5.sent;
              (0, _message.success)(req, res, 201, "Successfully updated");
              _context5.next = 12;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              (0, _message.error)(req, res, 404, "Error updating details");
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function update(_x9, _x10) {
        return _update.apply(this, arguments);
      }
      return update;
    }())
  }]);
}();
(0, _defineProperty2["default"])(DetailsController, "findByProvider", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var provider, productsProvider;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          provider = req.params.provider;
          _context6.next = 4;
          return _detailsOrder.DetailsModel.findByProvider({
            provider: provider
          });
        case 4:
          productsProvider = _context6.sent;
          res.json(productsProvider);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          (0, _message.error)(req, res, 401, "Provider not found");
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function (_x11, _x12) {
    return _ref.apply(this, arguments);
  };
}());
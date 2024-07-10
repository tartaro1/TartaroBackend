"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _message = require("../message/message.js");
var _provider = require("../models/provider.js");
/**
 * Controlador para las operaciones relacionadas con los proveedores
 * @class ProviderController
 */
var ProviderController = exports.ProviderController = /*#__PURE__*/function () {
  function ProviderController() {
    (0, _classCallCheck2["default"])(this, ProviderController);
  }
  return (0, _createClass2["default"])(ProviderController, null, [{
    key: "getById",
    value: (
    /**
     * Obtiene un proveedor por su ID
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, provider;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = req.params.id;
              _context.next = 4;
              return _provider.ProviderModel.getById({
                id: id
              });
            case 4:
              provider = _context.sent;
              res.status(200).json(provider);
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              (0, _message.error)(req, res, 404, "provider not found");
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 8]]);
      }));
      function getById(_x, _x2) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Crea un nuevo proveedor
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "delete",
    value: (
    /**
     * Elimina un proveedor
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.next = 3;
              return _provider.ProviderModel["delete"]({
                id: id
              });
            case 3:
              result = _context2.sent;
              try {
                if (result.affectedRows === 0) {
                  (0, _message.error)(req, res, 404, "Provider deleted not found");
                } else {
                  (0, _message.success)(req, res, 200, "Provider deleted successfully");
                }
              } catch (error) {
                error(req, res, 500, "An error occurred while deleting provider");
              }
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function _delete(_x3, _x4) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }())
  }]);
}();
/**
 * Obtiene todos los proveedores
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
(0, _defineProperty2["default"])(ProviderController, "getAll", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var providers;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _provider.ProviderModel.getAll();
        case 3:
          providers = _context3.sent;
          res.json(providers);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x5, _x6) {
    return _ref.apply(this, arguments);
  };
}());
(0, _defineProperty2["default"])(ProviderController, "create", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var input, provider;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          input = req.body;
          _context4.next = 4;
          return _provider.ProviderModel.create({
            input: input
          });
        case 4:
          provider = _context4.sent;
          (0, _message.success)(req, res, 200, "OK");
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function (_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}());
/**
 * Actualiza un proveedor existente
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
(0, _defineProperty2["default"])(ProviderController, "update", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, input, provider;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          input = req.body;
          _context5.next = 5;
          return _provider.ProviderModel.update({
            id: id,
            input: input
          });
        case 5:
          provider = _context5.sent;
          (0, _message.success)(req, res, 200, "OK");
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function (_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}());
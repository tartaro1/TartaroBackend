"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackupsController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _message = require("../message/message.js");
var _backup = require("../models/backup.js");
/**
 * Controlador para las operaciones relacionadas con los backups
 * @class BackupsController
 */
var BackupsController = exports.BackupsController = /*#__PURE__*/function () {
  function BackupsController() {
    (0, _classCallCheck2["default"])(this, BackupsController);
  }
  return (0, _createClass2["default"])(BackupsController, null, [{
    key: "getLatest",
    value: (
    /**
     * Obtiene el backup más reciente
     * @param {object} req - Captura peticiones HTTP
     * @param {object} res - Devuelve respuestas HTTP
     * @memberof BackupsController
     */
    function () {
      var _getLatest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _yield$BackupsModel$g, _yield$BackupsModel$g2, backup;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _backup.BackupsModel.getLatest();
            case 3:
              _yield$BackupsModel$g = _context.sent;
              _yield$BackupsModel$g2 = (0, _slicedToArray2["default"])(_yield$BackupsModel$g, 1);
              backup = _yield$BackupsModel$g2[0];
              res.json(backup);
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              (0, _message.error)(req, res, 500, "Error getting latest backup");
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getLatest(_x, _x2) {
        return _getLatest.apply(this, arguments);
      }
      return getLatest;
    }()
    /**
     * Crea un nuevo backup
     * @param {object} req - Captura peticiones HTTP
     * @param {object} req.body - Los datos para crear el backup
     * @param {object} res - Devuelve respuestas HTTP
     * @memberof BackupsController
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var input, backup;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              input = req.body;
              _context2.next = 4;
              return _backup.BackupsModel.create({
                input: input
              });
            case 4:
              backup = _context2.sent;
              (0, _message.success)(req, res, 201, "Created backup");
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              (0, _message.error)(req, res, 500, "Error creating backup");
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }
      return create;
    }())
  }]);
}();
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestionController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _message = require("../message/message.js");
var _gestion = require("../models/gestion.js");
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireWildcard(require("path"));
var _url = require("url");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = (0, _path.dirname)(_filename);
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(_dirname, '../uploads'));
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});

/**
 * Controlador para las operaciones relacionadas con la gestión
 * @class GestionController
 */
var GestionController = exports.GestionController = /*#__PURE__*/function () {
  function GestionController() {
    (0, _classCallCheck2["default"])(this, GestionController);
  }
  return (0, _createClass2["default"])(GestionController, null, [{
    key: "getLatest",
    value: (
    /**
     * Obtiene el último registro de gestión
     * @param {object} req - Captura peticiones HTML
     * @param {object} res - Devuelve peticiones HTML
     * @memberof GestionController
     */
    function () {
      var _getLatest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _yield$GestionModel$g, _yield$GestionModel$g2, gestion;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _gestion.GestionModel.getLatest();
            case 3:
              _yield$GestionModel$g = _context.sent;
              _yield$GestionModel$g2 = (0, _slicedToArray2["default"])(_yield$GestionModel$g, 1);
              gestion = _yield$GestionModel$g2[0];
              res.json(gestion);
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
     * Crea un nuevo registro de gestión con un archivo PDF opcional
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del registro de gestión
     * @param {object} req.file - El archivo PDF subido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof GestionController
     */
    )
  }]);
}();
(0, _defineProperty2["default"])(GestionController, "create", [upload.single('pdf'), ( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var input, gestion;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          input = {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            pdf_path: req.file ? "/uploads/".concat(req.file.filename) : null
          };
          _context2.next = 4;
          return _gestion.GestionModel.create({
            input: input
          });
        case 4:
          gestion = _context2.sent;
          (0, _message.success)(req, res, 201, "Created", {
            pdf_path: input.pdf_path
          });
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          (0, _message.error)(req, res, 500, "Error creating backup");
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}())]);
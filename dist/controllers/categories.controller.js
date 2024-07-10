"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _message = require("../message/message.js");
var _category = require("../models/category.js");
var CategoryController = exports.CategoryController = /*#__PURE__*/function () {
  function CategoryController() {
    (0, _classCallCheck2["default"])(this, CategoryController);
  }
  return (0, _createClass2["default"])(CategoryController, null, [{
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, category;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = req.params.id;
              _context.next = 4;
              return _category.CategoryModel.getById({
                id: id
              });
            case 4:
              category = _context.sent;
              res.status(200).json(category);
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              (0, _message.error)(req, res, 404, "category not found");
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
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.next = 3;
              return _category.CategoryModel["delete"]({
                id: id
              });
            case 3:
              result = _context2.sent;
              try {
                if (result.affectedRows === 0) {
                  (0, _message.error)(req, res, 404, "category deleted not found");
                } else {
                  (0, _message.success)(req, res, 200, "category deleted successfully");
                }
              } catch (error) {
                error(req, res, 500, "An error occurred while deleting category");
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
    }()
  }]);
}();
(0, _defineProperty2["default"])(CategoryController, "getAll", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _category.CategoryModel.getAll();
        case 3:
          category = _context3.sent;
          res.json(category);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          (0, _message.error)(req, res, 500, "Couldn't get category");
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
(0, _defineProperty2["default"])(CategoryController, "create", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var input, category;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          input = req.body;
          _context4.next = 4;
          return _category.CategoryModel.create({
            input: input
          });
        case 4:
          category = _context4.sent;
          (0, _message.success)(req, res, 200, "Create category");
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          (0, _message.error)(req, res, 500, "Error creating category");
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
(0, _defineProperty2["default"])(CategoryController, "update", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, input, category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          input = req.body;
          _context5.next = 5;
          return _category.CategoryModel.update({
            id: id,
            input: input
          });
        case 5:
          category = _context5.sent;
          (0, _message.success)(req, res, 201, "Update category successfully");
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          (0, _message.error)(req, res, 500, "Error updating category");
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
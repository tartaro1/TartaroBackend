"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _server = _interopRequireDefault(require("./server.js"));
_server["default"].listen(_server["default"].get('port'), function () {
  console.log("http://localhost:".concat(_server["default"].get("port")));
});
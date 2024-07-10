"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
(0, _dotenv.config)();
/**
 * conexion base de datos
 * @type {Object}
 */
var pool = _promise["default"].createPool({
  host: "db4free.net",
  port: process.env.MYSQLPORT,
  user: "tartaro",
  password: "tartaroroot",
  database: "tartaro"
});
// const pool =  mysql.createPool({
//     host:process.env.MYSQLHOST,
//     port:process.env.MYSQLPORT,
//     user:process.env.MYSQLUSER || 'ur2g5uxifdmetppw',
//     password:process.env.MYSQLPASSWORD || 'UAlddoPRkfLlc6IxUIXA',
//     database:process.env.MYSQLDATABASE ||'b0u1bfs2gghv9cwqhexp',
//     waitForConnections: true,
//     connectionLimit: 5,
//     queueLimit: 0
// })
var _default = exports["default"] = pool;
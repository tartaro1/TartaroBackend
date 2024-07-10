"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'ms-backend-tartaro.onrender.com',
  schemes: ['https'] // Asegúrate de que los esquemas sean correctos
};
var outputFile = './swagger-output.json';
var routes = ['../routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

(0, _swaggerAutogen["default"])()(outputFile, routes, doc);
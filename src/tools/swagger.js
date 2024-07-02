import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'ms-backend-tartaro.onrender.com',
  schemes: ['https'], // Asegúrate de que los esquemas sean correctos
};

const outputFile = './swagger-output.json';
const routes = [
    '../routes/index.js'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
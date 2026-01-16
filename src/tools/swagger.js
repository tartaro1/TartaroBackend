import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API Tartaro',
    description: 'Description',
    version: '1.0.0',
  },
  host: 'localhost:9200',
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "User",
      "description": "Endpoints"
    }
  ]
};

const outputFile = './swagger-output.json';
const routes = [
  '../routes/index.js'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);

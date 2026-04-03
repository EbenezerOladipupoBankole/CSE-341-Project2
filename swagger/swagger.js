const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Art Gallery API',
    description: 'Art Gallery Management API',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  securityDefinitions: {
    github_auth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit',
      scopes: {
        user: 'read profile'
      }
    }
  }
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

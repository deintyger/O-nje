const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Oúnje Recipe API',
      version: '1.0.0',
      description: 'Recipe API for the Oúnje platform',
      contact: {
        name: 'Oúnje API Support',
        email: 'adewoleolumide05@gmail.com'
      },
      servers: [{ url: 'http://localhost:5000' }]
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;

const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'getir-app API documentation',
    version,
  },
  servers: [
    // {
    //   url: 'https://stopcharla-getir-app.herokuapp.com/v1',
    // },
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;

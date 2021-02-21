import express from 'express';
import swaggerUI from 'swagger-ui-express';

import apiDocs from '../docs/api-docs.json';
import Ping from './Ping';

export default (app: express.Application) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocs));
  app.use('/api', Ping);
};

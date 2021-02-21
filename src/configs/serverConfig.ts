import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

dotenv.config();

import requestMiddleware from '../middlewares/RequestMiddleware';
import { rootDirectory } from '../server';

export default (app: express.Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/public', express.static(`${rootDirectory}/public`));
  app.use(requestMiddleware);
};

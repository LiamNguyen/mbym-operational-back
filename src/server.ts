import express from 'express';
import connectDatabase from './database'
import setupServerConfig from './configs/serverConfig';
import routes from './routes';

const port = process.env.NODE_ENV === 'test' ? 5051 : process.env.PORT || 7001;
const app = express();

export const rootDirectory = __dirname;

let server;

const startServer = async () => {
  setupServerConfig(app);
  routes(app);
  await connectDatabase();
  server = app.listen(port);
  console.log(`Project is running at http://localhost:${port}`);
};

startServer();

export default server;

import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';

import './database';

import routes from './routes';

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;

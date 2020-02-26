import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import { resolve } from 'path';

import './database';

import routes from './routes';
import customYupMethods from './utils/yupMethods';

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    customYupMethods();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/static/images',
      express.static(resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;

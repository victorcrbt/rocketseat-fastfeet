import * as express from 'express';

declare module 'express' {
  export interface Request {
    user_id: number;
  }

  export interface ControllerMethod {
    (req: Request, res: express.Response): Promise<express.Response>;
  }
}

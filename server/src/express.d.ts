import 'express';

declare module 'express' {
  export interface Request {
    user_id: number;
  }
}

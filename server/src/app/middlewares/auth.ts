import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedInterface {
  id: number;
  name: string;
  email: string;
}

export default (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não encontrado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: DecodedInterface = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedInterface;

    req.user_id = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

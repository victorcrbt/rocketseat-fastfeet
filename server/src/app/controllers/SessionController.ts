import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const userExists = await User.findOne({ where: { email } });

      if (!userExists) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      if (!(await userExists.checkPassword(password))) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const { id, name } = userExists;

      const token = jwt.sign({ id, name, email }, process.env.JWT_SECRET);

      return res.status(201).json({ user: { id, name, email }, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new SessionController();

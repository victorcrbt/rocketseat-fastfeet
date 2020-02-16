import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({ name, email, password });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();

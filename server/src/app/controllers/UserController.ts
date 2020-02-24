import { ControllerMethod } from 'express';

import User from '../models/User';

class UserController {
  public store: ControllerMethod = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({ name, email, password });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new UserController();

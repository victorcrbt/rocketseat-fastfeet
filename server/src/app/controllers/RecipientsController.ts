import { Request, Response } from 'express';

import Recipient from '../models/Recipient';

class RecipientsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      name,
      address,
      address_number,
      complement,
      state,
      city,
      zip_code,
    } = req.body;

    try {
      const recipient = await Recipient.create({
        name,
        address,
        address_number,
        complement,
        state,
        city,
        zip_code,
      });

      return res.status(201).json(recipient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new RecipientsController();

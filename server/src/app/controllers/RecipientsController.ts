import { Request, Response } from 'express';

import Recipient from '../models/Recipient';

class RecipientsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const recipients: Recipient[] = await Recipient.findAll();

      return res.status(200).json(recipients);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { recipient_id } = req.params;

    try {
      const recipient: Recipient = await Recipient.findByPk(recipient_id);

      return res.status(200).json(recipient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { recipient_id } = req.params;
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
      const recipient = await Recipient.findByPk(recipient_id);

      await recipient.update({
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

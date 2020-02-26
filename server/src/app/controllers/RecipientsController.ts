import { ControllerMethod } from 'express';
import { Op, WhereOptions } from 'sequelize';

import Recipient from '../models/Recipient';

type Where = WhereOptions & {
  name?: any;
};

class RecipientsController {
  public index: ControllerMethod = async (req, res) => {
    const { name, page = 1, limit = 10 } = req.query;

    const where: Where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    try {
      const recipients = await Recipient.findAndCountAll({
        where,
        order: [['id', 'ASC']],
        offset: page > 0 ? (page - 1) * limit : 0,
        limit,
      });

      return res.status(200).json({
        page: Number(page),
        total_pages: Math.ceil(recipients.count / limit),
        data: recipients.rows,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public show: ControllerMethod = async (req, res) => {
    const { recipient_id } = req.params;

    try {
      const recipient: Recipient = await Recipient.findByPk(recipient_id);

      return res.status(200).json(recipient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public store: ControllerMethod = async (req, res) => {
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
  };

  public update: ControllerMethod = async (req, res) => {
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
  };

  public destroy: ControllerMethod = async (req, res) => {
    const { recipient_id } = req.params;

    try {
      await Recipient.destroy({ where: { id: recipient_id } });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new RecipientsController();

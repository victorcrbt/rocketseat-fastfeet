import { ControllerMethod } from 'express';
import { Op, WhereOptions } from 'sequelize';

import Deliveryman from '../models/Deliveryman';

type Where = WhereOptions & {
  name?: any;
};

class DeliverymenController {
  public index: ControllerMethod = async (req, res) => {
    const { page = 1, limit = 10, name } = req.query;

    const where: Where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    try {
      const deliverymen = await Deliveryman.findAndCountAll({
        where,
        include: [
          {
            attributes: ['id', 'name', 'avatar_url', 'mime_type'],
            as: 'avatar',
            association: 'avatar',
          },
        ],
        offset: page > 0 ? (page - 1) * limit : 0,
        limit,
      });
      const totalPages = Math.ceil(deliverymen.count / limit);

      return res.status(200).json({
        page: Number(page),
        total_pages: totalPages,
        data: deliverymen.rows,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public show: ControllerMethod = async (req, res) => {
    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      include: [
        {
          attributes: ['id', 'name', 'avatar_url', 'mime_type'],
          association: 'avatar',
        },
      ],
    });

    return res.status(200).json(deliveryman);
  };

  public store: ControllerMethod = async (req, res) => {
    const { name, avatar_id, email } = req.body;

    try {
      const deliveryman = await Deliveryman.create(
        { name, avatar_id, email },
        { include: [{ association: 'avatar' }] }
      );

      await deliveryman.reload();

      return res.status(201).json(deliveryman);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public update: ControllerMethod = async (req, res) => {
    const { name, avatar_id, email } = req.body;
    const { deliveryman_id } = req.params;

    try {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);

      await deliveryman.update({ name, avatar_id, email });

      await deliveryman.reload({
        include: [
          {
            association: 'avatar',
            as: 'avatar',
            attributes: ['id', 'name', 'avatar_url', 'mime_type'],
          },
        ],
      });

      return res.status(200).json(deliveryman);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public destroy: ControllerMethod = async (req, res) => {
    const { deliveryman_id } = req.params;

    try {
      await Deliveryman.destroy({ where: { id: deliveryman_id } });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new DeliverymenController();

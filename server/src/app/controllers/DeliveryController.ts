import { ControllerMethod } from 'express';
import { Op } from 'sequelize';

import Package from '../models/Package';

class DeliveryController {
  public index: ControllerMethod = async (req, res) => {
    const { deliveryman_id } = req.params;
    const { delivered, page = 1, limit = 10 } = req.query;

    try {
      const packages = await Package.findAndCountAll({
        where: {
          deliveryman_id,
          end_date: delivered === 'true' ? { [Op.ne]: null } : null,
          canceled_at: null,
        },
        include: [
          {
            association: 'deliveryman',
            as: 'deliveryman',
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
              {
                association: 'avatar',
                as: 'avatar',
                attributes: ['id', 'name', 'avatar_url', 'mime_type'],
              },
            ],
          },
          {
            association: 'recipient',
            as: 'recipient',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        order: [['id', 'ASC']],
        offset: page > 0 ? (page - 1) * limit : 0,
        limit,
      });

      const totalPages = Math.ceil(packages.count / limit);

      return res.status(200).json({
        page: Number(page),
        total_pages: totalPages,
        data: packages.rows,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new DeliveryController();

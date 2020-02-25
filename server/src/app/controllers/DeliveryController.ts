import { ControllerMethod } from 'express';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';

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

  public update: ControllerMethod = async (req, res) => {
    const { package_id, deliveryman_id } = req.params;
    const { start_date, end_date, signature_id } = req.body;

    try {
      const pack = await Package.findOne({
        where: { id: package_id, deliveryman_id },
      });

      if (!pack) {
        return res.status(403).json({
          error:
            'Você não pode fazer alterações em entregas que não pertencem à você.',
        });
      }

      const withdrawCount = await Package.count({
        where: {
          deliveryman_id,
          start_date: {
            [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
          },
        },
      });

      if (withdrawCount >= 5) {
        return res
          .status(403)
          .json({ error: 'Você só pode fazer 5 retiradas por dia.' });
      }

      await pack.update({ start_date, end_date, signature_id });

      await pack.reload({
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
      });

      return res.status(200).json(pack);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new DeliveryController();

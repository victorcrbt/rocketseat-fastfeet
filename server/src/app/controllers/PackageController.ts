import { ControllerMethod } from 'express';
import { Op, WhereOptions } from 'sequelize';

import Queue from '../../lib/Queue';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';
import WithdrawOrderMail from '../jobs/WithdrawOrderMail';
import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';

type Where = WhereOptions & {
  product?: any;
};

class PackageController {
  public index: ControllerMethod = async (req, res) => {
    const { product, page = 1, limit = 10 } = req.query;

    const where: Where = {};

    if (product) {
      where.product = { [Op.iLike]: `%${product}%` };
    }

    try {
      const packages = await Package.findAndCountAll({
        where,
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

      return res.status(200).json({
        page: Number(page),
        total_pages: Math.ceil(packages.count / limit),
        data: packages.rows,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public store: ControllerMethod = async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { recipient_id, deliveryman_id, product, start_date } = req.body;

    try {
      const pack = await Package.create({
        recipient_id,
        deliveryman_id,
        product,
        start_date,
      });

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

      await Queue.add(WithdrawOrderMail.key, { pack });

      return res.status(201).json(pack);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public update: ControllerMethod = async (req, res) => {
    const {
      recipient_id,
      deliveryman_id,
      product,
      start_date,
      end_date,
    } = req.body;
    const { package_id } = req.params;

    try {
      const pack = await Package.findByPk(package_id);

      await pack.update({
        recipient_id,
        deliveryman_id,
        product,
        start_date,
        end_date,
      });

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

  public destroy: ControllerMethod = async (req, res) => {
    const { problem_id } = req.params;

    try {
      const problem = await DeliveryProblem.findByPk(problem_id);

      const pack = await Package.findByPk(problem.package_id, {
        include: [
          {
            association: 'deliveryman',
            as: 'deliveryman',
          },
          {
            association: 'recipient',
            as: 'recipient',
          },
        ],
      });

      if (pack.canceled_at) {
        return res.status(400).json({ error: 'Entrega já cancelada.' });
      }

      await pack.update({
        canceled_at: new Date(),
      });

      await Queue.add(CancelDeliveryMail.key, { pack, problem });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new PackageController();

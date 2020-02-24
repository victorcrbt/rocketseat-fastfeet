import { ControllerMethod } from 'express';

import Package from '../models/Package';

class PackageController {
  public index: ControllerMethod = async (req, res) => {
    try {
      const packages = await Package.findAll({
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

      return res.status(200).json(packages);
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
      canceled_at,
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
        canceled_at,
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
    const { package_id } = req.params;

    try {
      await Package.destroy({ where: { id: package_id } });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new PackageController();

import { ControllerMethod } from 'express';

import Mail from '../../lib/Mail';
import DeliveryProblem from '../models/DeliveryProblem';
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

      await pack.update({
        canceled_at: new Date(),
      });

      await Mail.sendMail({
        to: `${pack.deliveryman.name} <${pack.deliveryman.email}>`,
        subject: 'Cancelamento de entrega',
        template: 'deliveryCanceled',
        context: {
          deliveryman: pack.deliveryman.name,
          package_id: pack.id,
          product: pack.product,
          recipient_name: pack.recipient.name,
          recipient_address: `${pack.recipient.address}, ${pack.recipient.address_number} - ${pack.recipient.city}, ${pack.recipient.state}`,
          problem: problem.description,
        },
      });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new PackageController();

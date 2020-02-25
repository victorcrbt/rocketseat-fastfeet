import { ControllerMethod } from 'express';

import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  public index: ControllerMethod = async (req, res) => {
    const { package_id } = req.params;

    try {
      const problems = await DeliveryProblem.findAll({
        where: { package_id },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            association: 'package',
            as: 'package',
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
          },
        ],
      });

      return res.status(200).json(problems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new DeliveryProblemController();

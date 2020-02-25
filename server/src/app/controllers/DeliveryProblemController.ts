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

  public show: ControllerMethod = async (req, res) => {
    const { problem_id } = req.params;

    try {
      const problem = await DeliveryProblem.findByPk(problem_id, {
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

      return res.status(200).json(problem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  public store: ControllerMethod = async (req, res) => {
    const { package_id } = req.params;
    const { description } = req.body;

    try {
      const problem = await DeliveryProblem.create({ package_id, description });

      await problem.reload({
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

      return res.status(201).json(problem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new DeliveryProblemController();

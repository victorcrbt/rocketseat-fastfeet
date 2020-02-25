import Bee, { Job } from 'bee-queue';

import redisConfig from '../config/redis';

import CancelDeliveryMail from '../app/jobs/CancelDeliveryMail';

const jobs = [CancelDeliveryMail];

interface QueueInterface {
  [key: string]: {
    bee: Bee;
    handle: (job: Job) => Promise<void>;
  };
}

class Queue {
  public queues: QueueInterface;

  constructor() {
    this.queues = {};

    this.init();
  }

  private init(): void {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  public add(queue: string, job): Promise<Job> {
    return this.queues[queue].bee
      .createJob(job)
      .retries(3)
      .save();
  }

  public processQueue(): void {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();

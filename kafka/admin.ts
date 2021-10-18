import * as Kafka from 'kafkajs';
import * as express from 'express';
import memcache from 'memory-cache';
type createAdmin = {
  createTopic: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
  getAllTopics: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
};

const createAdmin: createAdmin = {
  createTopic: async (req, res, next) => {
    try {
      memcache.del('__express__/getAllTopics');
      const topic = req.query.topic as string;
      const numPartitions = parseInt(req.query.numPartitions as string);

      const kafka = new Kafka.Kafka({
        clientId: 'admin',
        brokers: ['kafka:9092'],
      });

      const admin = kafka.admin();
      await admin.connect();
      const result = await admin.createTopics({
        waitForLeaders: true,
        topics: [
          {
            topic: topic,
            numPartitions: numPartitions,
            replicationFactor: 1, //maybe we can make this dynamic as well!
          },
        ],
      });
      console.log(
        `Topic ${topic} has been created with ${numPartitions} partitions!`
      );
      await admin.disconnect();
      if (result) return next();
      else
        throw new Error(
          'failed to create new topic, that topic may already exist or it may have too many partitions'
        );
    } catch (error) {
      return next(error);
    }
  },

  getAllTopics: async (req, res, next) => {
    try {
      const kafka = new Kafka.Kafka({
        clientId: 'admin',
        brokers: ['kafka:9092'],
      });

      const admin = kafka.admin();
      await admin.connect();
      const allTopics = await admin.listTopics();
      console.log(
        `These are all the topics on the specified brokers: ${allTopics}`
      );
      await admin.disconnect();
      res.locals.allTopics = allTopics;
      return next();
    } catch (error) {
      return next(error);
    }
  },
};

export default createAdmin;

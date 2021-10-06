import * as kafka from 'kafkajs';

const instance = new kafka.Kafka({
  clientId: 'testing :)',
  brokers: ['adams-mbp:9092'],
});

const producer = instance.producer();
producer.connect().then(() =>
  setInterval(() => {
    producer.send({
      topic: 'testing-topic',
      messages: [
        { value: Math.random().toString() + '@' + Date.now().toString() },
      ],
    });
  }, 6000)
);

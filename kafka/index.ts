import * as kafka from 'kafkajs';
async function innerFunc() {
  const instance = new kafka.Kafka({
    clientId: 'testing :)',
    brokers: ['adams-mbp:9092'],
  });
  for (let i = 0; i < 10; i++) {
    const producer = instance.producer();
    producer.connect().then(() =>
      setInterval(() => {
        producer.send({
          topic: `testing-topic${i % 2 === 0 ? '' : '2'}`,
          messages: [
            { value: Math.random().toString() + '@' + Date.now().toString() },
          ],
        });
      }, 100)
    );
    producer.on(producer.events.REQUEST, (e) =>
      console.log('this is producer')
    );
  }
  for (let i = 0; i < 7; i++) {
    //consumers must belong to different groups to be able to attach to the same partition, group can only be attached to each partition at most once
    //so now we have each in its own independent group reading from kafka
    //what about the opposite, what about if the consumers are spread too thin -> 100 partitions vs 10 consumers
    //looks like one consumer can be attached to multiple partitions... so 3 consumers in a group can read 10 partitions fine
    //partition 0 and 1 are pretty full, but the rest are almost empty....
    //looks like if we set linger.ms to 0 we can then achieve the result of more evenly spread out partitions... maybe this could be a configurable thing in the options panel
    //show which partitions on which topic are being written too -> want to srpead this out potentially
    const consumer = instance.consumer({ groupId: `consumerTest${i % 3}` });
    consumer
      .connect()
      .then(() => {
        consumer.subscribe({ topic: 'testing-topic', fromBeginning: true });
        consumer.subscribe({ topic: 'testing-topic2', fromBeginning: true });
      })
      .then(() => {
        consumer.on(consumer.events.REQUEST, (e) => console.log(e));
      })
      .then(() =>
        consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log('this is consumer');
          },
        })
      );
  }
}

innerFunc();

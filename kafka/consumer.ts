import * as Kafka from 'kafkajs';

/**
 * Creates a producer object for export later
 * @param groupId - required for consumer creation in Kafka
 * @param topic - topic that matches producer
 *
 */
const createConsumer = async (groupId: string, topic: string) => {
  // Creating a new Kafka instance
  // Configure AWS IAM client with kafka broker
  const kafka = new Kafka.Kafka({
    clientId: groupId,
    brokers: ['kafka:9092'],
    // authenticationTimeout: 1000,
    // reauthenticationThreshold: 10000,
    //  ssl: true,
    //  sasl: {
    //    mechanism: 'aws',
    //    authorizationIdentity: process.env.authorizationIdentity, // UserId or RoleId
    //    accessKeyId: process.env.accessKeyId,
    //    secretAccessKey: process.env.secretAccessKey
    // },
  });
  // Creating kafka consumer with required group ID
  const consumer = kafka.consumer({ groupId: 'test-group2' });
  //  kafka.consumer.groupId = {groupId};

  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  console.log('something');
  await consumer.run({
    // autoCommitInterval: 5000,
    // eachMessage: awsConnector.sendEachMessage, -> to send to the DB
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message);
      try {
        // listen for each message being sent, and then send the messages to the DB
        console.log('anything');
        console.log({
          key: message.key.toString(),
          value: JSON.parse(message.value!.toString()),
          headers: message.headers,
        });
      } catch (err) {
        console.log(
          `There was an error consuming messages in consumer.run: ${err}`
        );
      }
    },
  });

  // Error Handler for DynamoDB data insertion
  // function insertHandler(err) {
  //   if (err) {
  //     console.log(`Error caught in DynamoDB database insertion" ${err}`);
  //     }
  //   }
};

export { createConsumer };

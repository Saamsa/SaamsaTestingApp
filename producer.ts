const { Kafka } = require("kafkajs");

/**
 * Creates a producer object for export later
 * @param producerId - the client ID for a new kafka instance
 * @param message - the message string sent to Kafka
 * @param topic - the topic that will be sent to Kafka
 */
const producer = async (producerId: string, message: object, topic: string) => {
  // Instantiate new kafka object, creating two brokers on the same port
  const kafka = new Kafka({
    clientId: producerId,
    brokers: ["kafka1:9092", "kafka2:9092"],
  });

  // Initialize a producer on kafka object
  const producer = kafka.producer();

  // Connect to the producer
  try {
    await producer.connect();
  } catch (err) {
    console.log("Unable to connect to producer: ", err);
  }

  // Send topic and messages to the producer
  try {
    await producer.send({
      topic: topic,
      messages: message,
    });
  } catch (err) {
    console.log("Error sending to the producer: ", err);
  }

  await producer.disconnect();
};

export { producer };

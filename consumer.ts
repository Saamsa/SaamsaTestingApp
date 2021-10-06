const { producer } = require('./producer'); 

/**
 * Creates a producer object for export later
 * @param producerId - the client ID for a new kafka instance
 * @param message - the message string sent to Kafka
 * @param topic - the topic that will be sent to Kafka
 */
 const consumer = async (groupId: string, message: object, topic: string) => {
    // Instantiate new kafka object, creating two brokers on the same port
const consumer = kafka.consumer({ groupId: 'test-group' });

await consumer.connect()
await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})
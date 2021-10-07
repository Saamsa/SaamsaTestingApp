const { producer } = require('./producer'); 
const { Kafka } = require ('kafkajs');
/**
 * Creates a producer object for export later
 * @param groupId - the client ID for a new kafka instance
 */
 const consumer = async (groupId: string) => {
    // Instantiate new kafka object, creating two brokers on the same port
    const kafka = new Kafka({
      clientId: 'COVIDtransfer',
      brokers: ['kafka:9092'],
      // authenticationTimeout: 1000,
      // reauthenticationThreshold: 10000,
      ssl: true,
      sasl: {
      mechanism: 'aws',
      authorizationIdentity: 'arn:aws:iam::852274558021:user/DynamoDBTemp', // UserId or RoleId
      accessKeyId: 'AKIA4M34FWRC62OLOEN4',
      secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      sessionToken: 'WHArYt8i5vfQUrIU5ZbMLCbjcAiv/Eww6eL9tgQMJp6QFNEXAMPLETOKEN' // Optional
  },
    });

    const consumer = kafka.consumer({ groupId: groupId });

await consumer.connect()
await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })


await consumer.run({
  autoCommitInterval: 5000,
  // eachMessage: sendEachMessage, -> to send to the DB 
  eachMessage: async ({ topic, partition, message }) => {
    try{
      // listen for each message being sent, and then send the messages to the DB

    console.log({
      key: message.key.toString(),
      value: message.value.toString(),
      headers: message.headers,
    
    })

  } catch (err){
    console.log(`There was an error consuming messages in consumer.run: ${err}`);

  }
  },
});

// add code to insert data into dynamoDB
const sendEachMessage = async ({message}) => {
// Declare a new variable set to the parsed JSON of message value
const messageObj = await JSON.parse(message.value);
console.log("The message recieved inside sendEachMessage is : ", messageObj);

//connect with DynamoDB and send data to dynamoDB

// add an error handler that consoles any error that occurs when you're inserting data to dynamoDB

//console.log a success message if data is inserted

//return
}


// Error Handler for DynamoDB data insertion
function insertHandler(err) {
  if (err) {
    console.log(`Error caught in DynamoDB database insertion" ${err}`);
    }
  }
}

 };

 export { consumer };
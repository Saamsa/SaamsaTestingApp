import * as Kafka from "kafkajs";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import { messageInterface } from "../messageInterface";
dotenv.config({ path: __dirname+'./.env' });

// config details required to connect to AWS on server 

const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: 'us-east-1',
    endpoint: 'dynamodb.us-east-1.amazonaws.com'
};
// New instantiation of DynamoDB with config details passed in directly
const ddb = new AWS.DynamoDB.DocumentClient(config); 

/**
 * Creates a consumer object
 * @param groupId - required for consumer creation in Kafka
 * @param topic - topic that matches producer
 *
 */
const createConsumer = async (groupId: string, topic: string): Promise<void> => {
  // Creating a new Kafka instance
  const kafka = new Kafka.Kafka({
    clientId: groupId,
    // ssl: true,
    brokers: ["kafka:9092"]
  });
  // Creating kafka consumer with required group ID
  const consumer = kafka.consumer({ groupId});
  //  kafka.consumer.groupId = {groupId};

  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  console.log("consumer subscribed to topic");
  await consumer.run({
    // autoCommitInterval: 5000,
    // eachMessage: sendEachMessage, -> to send to the DB
    eachMessage: async ({ message }) => {
      try {
        // producer message comes in as Buffer, so we need to convert producer message to readable object of Strings
        const messageObj = JSON.parse(message.value!.toString());
        
        // listen for each message being sent, and then send the messages to the DB
        console.log("consumer message value in createConsumer at create.ts:", messageObj);
        // send the message to the defined table in DynamoDb. Currently hardcoded to our patientData table.
        sendToDb("patientData", messageObj);
      } catch (err) {
        console.log(
          `There was an error consuming messages in consumer.run: ${err}`
        );
      }
    },
  });
};


// add code to insert data into dynamoDB

const sendToDb = async (tableName: string, messageObj: messageInterface) => {
// create param types
  type params = {
    TableName: string;
    Item: messageInterface;
  }
  // create param object
  const params: params = {
    TableName: tableName,
    Item: messageObj
  };

  console.log("adding a new item from consumer to AWS DB..");

  // Use the DynamoDB putItem functionality to add message to database (put is from DocumentClient)
  ddb.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item, ", err);
    } else {
      console.log("Added Item : ", JSON.stringify(data));
    }
  });
};

export { createConsumer };

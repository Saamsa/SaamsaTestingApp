import * as Kafka from "kafkajs";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import { messageInterface, DBmessageInterface } from "../messageInterface";
dotenv.config({ path: __dirname+'../.env' });

// config details required to connect to AWS on server 

const config = {
    accessKeyId: 'AKIA4M34FWRC5KKYFA6Z',
    secretAccessKey: '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', 
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
const createConsumer = async (groupId: string, topic: string) => {
  // Creating a new Kafka instance
  const kafka = new Kafka.Kafka({
    clientId: groupId,
    brokers: ["kafka:9092"]
  });
  // Creating kafka consumer with required group ID
  const consumer = kafka.consumer({ groupId: "test-group2" });
  //  kafka.consumer.groupId = {groupId};

  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  console.log("consumer subscribed to topic");
  await consumer.run({
    // autoCommitInterval: 5000,
    // eachMessage: sendEachMessage, -> to send to the DB
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // convert producer message to object
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
// type sendEachMessage = () => void;

const sendToDb = async (tableName: string, messageObj: messageInterface) => {

  type params = {
    TableName: string;
    Item: DBmessageInterface;
  }
  
  const params: params = {
    TableName: tableName,
    Item: 
    // messageObj
    {
      // eventId: { S: "1234" },
      'eventId': {S: messageObj.eventId },
      // 'eventTimestamp': {S: messageObj.eventTimestamp},
      'eventName': {S: messageObj.eventName} ,
      'firstName': {S: messageObj.firstName},
      'lastName': {S: messageObj.lastName},
      'middleName': {S: messageObj.middleName},
      'gender': {S: messageObj.gender},
      'street': {S: messageObj.street},
      'street2': {S: messageObj.street2},
      'city': {S: messageObj.city},
      'county': {S: messageObj.county},
      'state': {S: messageObj.state},
      'zip': {S: messageObj.zip},
      'latitude': {S: messageObj.latitude},
      'longitude': {S: messageObj.longitude},
      'phone': {S: messageObj.phone},
      'email': {S: messageObj.email},
      'jobArea': {S: messageObj.jobArea},
      'jobTitle': {S: messageObj.jobTitle},
      'nameLastContact': {S: messageObj.nameLastContact},
      // 'dateLastContact': {S: messageObj.dateLastContact},
      'countryLastTravel': {S: messageObj.countryLastTravel},
      // 'dateLastTravel': {S: messageObj.dateLastTravel}
    },
  };

  console.log("adding a new item from consumer to AWS DB..");

  // Use the DynamoDB putItem functionality to add message to database
  ddb.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item, ", err);
    } else {
      console.log("Added Item : ", JSON.stringify(data));
    }
  });
};

export { createConsumer };

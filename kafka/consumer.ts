import * as Kafka from 'kafkajs';
import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-east-2",
  // endpoint: "http://localhost:8000"
});
/**
 * Creates a producer object for export later
 * @param groupId - required for consumer creation in Kafka
 * @param topic - topic that matches producer
 *
 */

const ddb = new AWS.DynamoDB();

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
    // eachMessage: sendEachMessage, -> to send to the DB
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message);
      try {
        // listen for each message being sent, and then send the messages to the DB
        console.log('anything');
        console.log({
          key: message.key.toString(),
          value: JSON.parse(message.value!.toString()), // converts producer message to object
          headers: message.headers,
        });
      } catch (err) {
        console.log(
          `There was an error consuming messages in consumer.run: ${err}`
        );
      }
    },
  });
}

// add code to insert data into dynamoDB
// type sendEachMessage = () => void;

const sendEachMessage = async () => {
  // Declare a new variable set to the parsed JSON of message value
  // const messageObj = await JSON.parse(message.value);
  // console.log("The message recieved inside sendEachMessage is : ", messageObj);

  //name of the dynamoDB table to which data is being inserted
  const tableName = "patientData";

  // destructure the object to send the data to dynamo DB
  const params = {
    TableName: tableName,
    Item: { 
      'eventId' : {S: '1234'}
      // JSON(messageObj)
    // 'eventId': {S: message.value.eventId },
    // 'eventDateTime': {S: message.value.eventDateTime}, 
    // 'eventName': {S: message.value.eventName} ,
    // 'firstName': {S: message.value.firstName}, 
    // 'lastName': {S: message.value.lastName},
    // 'middleName': {S: message.value.middleName},
    // 'gender': {S: message.value.gender},
    // 'street': {S: message.value.street},
    // 'street2': {S: message.value.street2},
    // 'city': {S: message.value.city},
    // 'county': {S: message.value.county},
    // 'state': {S: message.value.state},
    // 'zip': {N: message.value.zip},
    // 'latitude': {N: message.value.latitude},
    // 'longitude': {N: message.value.longitude}, 
    // 'phone': {N: message.value.phone},
    // 'email': {S: message.value.email}, 
    // 'jobArea': {S: message.value.jobArea}, 
    // 'jobTitle': {S: message.value.jobTitle},
    // 'nameLastContact': {S: message.value.nameLastContact},
    // 'dateLastContact': {S: message.value.dateLastContact},
    // 'countryLastTravel': {S: message.value.countryLastTravel},
    // 'dateLastTravel': {S: message.value.dateLastTravel}
  }
}

  console.log("adding a new item from consumer to AWS DB..")

// Send/put data to dynamoDB from the consumer
ddb.putItem(params, function(err,data) {
  if(err) {
      console.error("Unable to add item, Error: ", err);
  }
  else {
      console.log("Added Item : ", JSON.stringify(data) )
  }
});
}
  export { createConsumer };

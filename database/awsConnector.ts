import AWS from 'aws-sdk';
//

//
AWS.config.update({
    region: "us-east-2",
    // endpoint: "http://localhost:8000"
  });

const awsConnector = {};

// add code to insert data into dynamoDB
awsConnector.sendEachMessage = async ({message}) => {
// Declare a new variable set to the parsed JSON of message value
const messageObj = await JSON.parse(message.value);

console.log("The message recieved inside sendEachMessage is : ", messageObj);

//connect with DynamoDB and send data to dynamoDB
    //declare a new instance of DynamoDB
    //Document client simplifies working with items in Amazon DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();

//name of the dynamoDB table to which data is being inserted
const table = "patientData"

//store message data and table name in a variable {}
const outputStream = {
    TableName: table,
    Item: {
    topic: 'topic-name', // to be changed
     message: "message" //to be changed to match Fakerjs data
    }
};

console.log("adding a new item from consumer to AWS DB..")

// Send/put data to dynamoDB from the consumer
docClient.put(outputStream, function(err,data) {
    if(err) {
        console.error("Unable to add item, Error: ", err);
    }
    else {
        console.log("Added Item : ", JSON.stringify(data) )
    }
});
//return
    }

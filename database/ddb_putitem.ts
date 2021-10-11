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
const ddb = new AWS.DynamoDB();

//name of the dynamoDB table to which data is being inserted
const tableName = "patientData";

//store message data and table name in a variable {}
const params = {
    TableName: tableName,
    Item: {
    'eventId': {S: message.value.eventId },
    'eventDateTime': {S: message.value.eventDateTime}, 
    'eventName': {S: message.value.eventName} ,
    'firstName': {S: message.value.firstName}, 
    'lastName': {S: message.value.lastName},
    'middleName': {S: message.value.middleName},
    'gender': {S: message.value.gender},
    'street': {S: message.value.street},
    'street2': {S: message.value.street2},
    'city': {S: message.value.city},
    'county': {S: message.value.county},
    'state': {S: message.value.state},
    'zip': {N: message.value.zip},
    'latitude': {N: message.value.latitude},
    'longitude': {N: message.value.longitude}, 
    'phone': {N: message.value.phone},
    'email': {S: message.value.email}, 
    'jobArea': {S: message.value.jobArea}, 
    'jobTitle': {S: message.value.jobTitle},
    'nameLastContact': {S: message.value.nameLastContact},
    'dateLastContact': {S: message.value.dateLastContact},
    'countryLastTravel': {S: message.value.countryLastTravel},
    'dateLastTravel': {S: message.value.dateLastTravel}
    }

};

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
//return
    }

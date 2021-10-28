import { createProducer } from './kafka/producer';
import { createCaseReport } from './client/contactTracing';
import { createConsumer } from './kafka/consumer';
import createAdmin from './kafka/admin';
import cache from './kafka/cache';
import express from 'express';
import path from 'path';

/**
 * Creates a fake covid positive report
 * Initializes a producer with this data
 */

const app = express();
app.use(express.static(path.join(__dirname, '/')));

//CACHE THE TOPICS SO WE DONT HAVE TO QUERY KAFKA?
app.get('/getAllTopics', cache(100), createAdmin.getAllTopics, (req, res) => {
  const { sendResponse } = res.locals;
  res.status(200);
  sendResponse([...res.locals.allTopics]);
});
//EVERY TIME TOPIC IS WRITTEN, SAVE IT IN A CACHE SOMEWHERE??
// app.get('/getAllTopicsWritten', createAdmin.getAllTopics, (req, res) => {
//   res.status(200).json([...res.locals.allTopics]);
// });

app.post('/createTopic', createAdmin.createTopic, (req, res) => {
  console.log('in create topic now');
  res.sendStatus(200);
});

app.get('/writeTopic', (req, res) => {
  console.log('here');
  const covidPositiveCase = createCaseReport();
  //THIS COULD BE MORE MODULARIZED --> separating case report and producer creations
  // let producerName: string;
  // if (covidPositiveCase) producerName = 'covid_positive_case_report';
  const topic = req.query.topic as string;
  createProducer(
    'covid_positive_case_report', //maps to producer name
    // producerName,
    covidPositiveCase, //maps to message
    topic //maps to topic
  );
  res.sendStatus(200);
});

app.get('/readTopic', (req, res) => {
  const topic = req.query.topic as string;
  createConsumer('CovidGroup2', topic);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => {
  console.log('running on 3000 :) ');
});

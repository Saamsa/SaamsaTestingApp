import { createProducer } from './kafka/producer';
import { createCaseReport } from './client/contactTracing';
import { createConsumer } from './kafka/consumer';
import express from 'express';
import path from 'path';
/**
 * Creates a fake covid positive report
 * Initializes a producer with this data
 */

const app = express();
app.use(express.static(path.join(__dirname, '/')));

// create data using faker.js API and create a producer with that information
app.get('/createData', (req, res) => {
  const covidPositiveCase = createCaseReport();
  console.log('**new data created in createCaseReport: ', covidPositiveCase);
  createProducer(
    'covid_positive_case_report',
    covidPositiveCase,
    covidPositiveCase.eventName!
    );
  res.sendStatus(200);
});
app.get('/addConsumer', (req, res) => {
  createConsumer('CovidGroup2', 'initial_report2');
  res.sendStatus(200);
});
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});
app.listen(3000, () => {
  console.log('running on 3000 :) ');
});

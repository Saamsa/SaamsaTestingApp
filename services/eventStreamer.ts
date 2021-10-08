import { createProducer } from '../producer';
import { createCaseReport } from './contactTracing';
import { createConsumer } from '../consumer';

/**
 * Creates a fake covid positive report 
 * Initializes a producer with this data
 */

const covidPositiveCase = createCaseReport();

createProducer(
  'covid_positive_case_report', 
  covidPositiveCase, 
  covidPositiveCase.eventName
);

createConsumer(
  'CovidGroup1',
  'initial_report'
);

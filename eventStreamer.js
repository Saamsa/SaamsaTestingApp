"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producer_1 = require("./kafka/producer");
const contactTracing_1 = require("./client/contactTracing");
const consumer_1 = require("./kafka/consumer");
/**
 * Creates a fake covid positive report
 * Initializes a producer with this data
 */
const covidPositiveCase = (0, contactTracing_1.createCaseReport)();
(0, producer_1.createProducer)('covid_positive_case_report', covidPositiveCase, covidPositiveCase.eventName);
(0, consumer_1.createConsumer)('CovidGroup1', 'initial_report');

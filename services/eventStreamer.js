"use strict";
exports.__esModule = true;
var producer_1 = require("../producer");
var contactTracing_1 = require("./contactTracing");
var consumer_1 = require("../consumer");
/**
 * Creates a fake covid positive report
 * Initializes a producer with this data
 */
var covidPositiveCase = (0, contactTracing_1.createCaseReport)();
(0, producer_1.createProducer)('covid_positive_case_report', covidPositiveCase, covidPositiveCase.eventName);
(0, consumer_1.createConsumer)('CovidGroup1', 'initial_report');

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCaseReport = void 0;
const faker = __importStar(require("faker"));
/**
 * @function createCaseReport creates a fake covid positive case report
 * @returns an object with case information
 */
const createCaseReport = () => {
    // Declare an object with case information
    const covidPositive = {
        eventId: faker.datatype.uuid(),
        eventTimstamp: faker.datatype.datetime(),
        eventName: 'initial_report',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.middleName(),
        gender: faker.name.gender(),
        street: faker.address.streetAddress(),
        street2: faker.address.secondaryAddress(),
        city: faker.address.cityName(),
        county: faker.address.county(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        jobArea: faker.name.jobArea(),
        jobTitle: faker.name.jobTitle(),
        nameLastContact: faker.name.firstName(),
        dateLastContact: faker.date.past(),
        countryLastTravel: faker.address.country(),
        dateLastTravel: faker.date.past(),
    };
    return covidPositive;
};
exports.createCaseReport = createCaseReport;

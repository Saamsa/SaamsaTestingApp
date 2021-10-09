import * as faker from 'faker';

/**
 * @function createCaseReport creates a fake covid positive case report
 * @returns an object with case information
 */

const createCaseReport = () => {
  // Assign proper datatypes
  interface covidPositive {
    eventId: string,
    eventDateTime: Date, 
    eventName: string, 
    firstName: string, 
    lastName: string,
    middleName: string,
    gender: string,
    street: string,
    street2:string,
    city: string,
    county: string,
    state: string,
    zip: number,
    latitude: number,
    longitude: number, 
    phone: number,
    email: string,  
    jobArea: string, 
    jobTitle: string,
    nameLastContact: string,
    dateLastContact: Date,
    countryLastTravel: string,
    dateLastTravel: Date,
  }
  
  // Declare an object with case information
  const covidPositive = {
    eventId: faker.datatype.uuid(),
    eventTimstamp: faker.datatype.datetime(),
    eventName: 'initial_report2',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
    gender: faker.name.gender(),
    street: faker.address.streetAddress(),
    street2:faker.address.secondaryAddress(),
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

export { createCaseReport };
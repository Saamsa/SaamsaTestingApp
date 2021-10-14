import * as faker from 'faker';

/**
 * @function createCaseReport creates a fake covid positive case report
 * @returns an object with case information
 */

const newEvent = 'initial_report2';

// Create object datatype interface and assign proper datatypes
interface CovidPositive {
  eventName: string, 
  eventId: string,
  eventDateTime: Date, 
  firstName: string, 
  lastName: string,
  middleName: string,
  gender: string,
  street: string,
  street2:string,
  city: string,
  county: string,
  state: string,
  zip: string,
  latitude: string,
  longitude: string,
  phone: string,
  email: string,  
  jobArea: string, 
  jobTitle: string,
  nameLastContact: string,
  dateLastContact: Date,
  countryLastTravel: string,
  dateLastTravel: Date,
}

const createCaseReport = (): CovidPositive => {
  // Declare an object with case information
  const covidPositive: CovidPositive = {
    eventName: newEvent,
    eventId: faker.datatype.uuid(),
    eventDateTime: faker.datatype.datetime(),
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

export { CovidPositive, createCaseReport };
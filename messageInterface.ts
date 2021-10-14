// Assign proper data types
export interface messageInterface {
    eventId?: string,
    eventTimestamp?: Date, 
    eventName?: string, 
    firstName?: string, 
    lastName?: string,
    middleName?: string,
    gender?: string,
    street?: string,
    street2?:string,
    city?: string,
    county?: string,
    state?: string,
    zip?: string,
    latitude?: string,
    longitude?: string, 
    phone?: string,
    email?: string,  
    jobArea?: string, 
    jobTitle?: string,
    nameLastContact?: string,
    dateLastContact?: Date,
    countryLastTravel?: string,
    dateLastTravel?: Date
  }

type dbItemObject = {
    S?: string | Date;
    N?: number;
}

export type DBmessageInterface = {
    eventId?: dbItemObject,
    eventTimestamp?: dbItemObject, 
    eventName?: dbItemObject, 
    firstName?: dbItemObject, 
    lastName?: dbItemObject,
    middleName?: dbItemObject,
    gender?: dbItemObject,
    street?: dbItemObject,
    street2?:dbItemObject,
    city?: dbItemObject,
    county?: dbItemObject,
    state?: dbItemObject,
    zip?: dbItemObject,
    latitude?: dbItemObject,
    longitude?: dbItemObject, 
    phone?: dbItemObject,
    email?: dbItemObject,  
    jobArea?: dbItemObject, 
    jobTitle?: dbItemObject,
    nameLastContact?: dbItemObject,
    dateLastContact?: dbItemObject,
    countryLastTravel?: dbItemObject,
    dateLastTravel?: dbItemObject
  }
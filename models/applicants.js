// Design Model for applicants

// Applicants Model
// first name - string
// middle Intitial - string
// last name - string
// address - string
// city - string 
// state - string
// zip code - number
// phone number - number
// text - boolean

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number,
    phoneNumber: Number,
    doYouRecieveText: String,
    entitledToWorkInUs: String,
    sixteenOrOver: String,
    felonyConviction: String,
    convictionExplained: String,
    dateYouCanBeginWorking: String,
    employer: String,
    addressWork: String,
    cityWork: String,
    stateWork: String,
    zipCodeWork: String,
    phoneNumberWork: String,
    supervisorName: String,
    startDate: String,
    endDate: String,
    jobTitle: String,
    payRate: String,
    leaveReason: String,
    contactThem: String,
    employer2: String,
    address2: String,
    cityWork2: String,
    stateWork2: String,
    zipCodeWork2: String,
    phoneNumberWork2: String,
    supervisorName2: String,
    startDate2: String,
    endDate2: String,
    jobTitle2: String,
    leaveReason2: String,
    contactThem2: String,
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
    daysNotAvailableToWork: String,
    locationAppliedFor: String,
    dateApplied: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Applicant', ApplicantSchema);

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
    dateApplied: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Applicant', ApplicantSchema);

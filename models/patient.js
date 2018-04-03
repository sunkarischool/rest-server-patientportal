// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var addressSchema = new Schema({
    label:  {
        type: String,
        required: false
    },
    street1:  {
        type: String,
        required: true
    },
    street2:  {
        type: String
    },
    city:  {
        type: String,
        required: true
    },
    state:  {
        type: String,
        required: true
    },
    zip:  {
        type: String,
        required: true
    },
    homePhone:  {
        type: String
    },
    mobile:  {
        type: String
    },
    displayOrder:  {
        type: Number
    }
}, {
    timestamps: true
});

var patientSchema = new Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    MI: {
        type: String,
    },
    image: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    ssn: {
        type: String
    },
    addresses:[addressSchema]
},
 {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Patients = mongoose.model('Patient', patientSchema);

// make this available to our Node applications
module.exports = Patients;
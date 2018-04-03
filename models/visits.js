// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitsSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    complaint:{
        type: String,
        required: true
    },
    provider:{
        type: String,
        required: true
    },
    diagnosis: {
        type: String
    },
    Notes: {
        type: String
    },
    testsOrdered: {
        type: String
    },
    medicationsOrdered: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Visits = mongoose.model('Visits', visitsSchema);

// make this available to our Node applications
module.exports = Visits;
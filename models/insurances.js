// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insurancesSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    healthPlan:{
        type: String,
        required: true
    },
    healthProduct:{
        type: String,
        required: true
    },
    groupNumber:{
        type: String
    },
    contact:{
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Insurances = mongoose.model('Insurance', insurancesSchema);

// make this available to our Node applications
module.exports = Insurances;
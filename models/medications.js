// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicationsSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    orderedDate: {
        type: Date,
        required: true
    },
    medication:{
        type: String,
        required: true
    },
    refillsLeft:{
        type: Number,
        required: false
    },
    currentlyUsing: {
        type: Boolean
    }
    
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Medications = mongoose.model('Medications', medicationsSchema);

// make this available to our Node applications
module.exports = Medications;
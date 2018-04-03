// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
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


// the schema is useless so far
// we need to create a model using it
var Address = mongoose.model('address', addressSchema);

// make this available to our Node applications
module.exports = Address;
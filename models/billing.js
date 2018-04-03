// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var billingSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    dateOfService:{
        type: Date,
        required: true
    },
    provider:{
        type: String
    },
    serviceDetails:{
        type: String
    },
    amountBilled:{
        type: Currency,
        required: true
    },
    copayPaid:{
        type: Currency,
        required: true
    },
    copayDue:{
        type: Currency,
        required: true
    }
    
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var billing = mongoose.model('billing', billingSchema);

// make this available to our Node applications
module.exports = billing;
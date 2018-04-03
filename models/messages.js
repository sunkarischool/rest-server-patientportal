// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    isNew: {
        isNew: Boolean
    }
    
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Messages = mongoose.model('messages', messagesSchema);

// make this available to our Node applications
module.exports = Messages;
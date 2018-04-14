// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    imageName:  {
        type: String,
        required: true
    },
    imagType:  {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

var testsSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    orderedDate: {
        type: Date,
        required: true
    },
    orderedBy:{
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    testResult: {
        type: String,
        required: true
    },
    images: [imageSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Visits = mongoose.model('Visits', visitsSchema);

// make this available to our Node applications
module.exports = Visits;
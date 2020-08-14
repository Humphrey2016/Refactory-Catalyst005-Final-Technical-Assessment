const mongoose = require('mongoose');
 
const CovidRegschema = new mongoose.Schema({
    surname: String,
    DateofBirth: String,
    Givenname: {
        type: String,
        required: true,
        unique: true
    },
    PlaceOfresidance: String,
    Occupation: String,
    gender: String,
    category: String
    
   
});


module.exports = mongoose.model('CovidReg', CovidRegschema);
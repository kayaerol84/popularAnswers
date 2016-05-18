var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({  
  username: "String",
  password: "String",
  name: "String",
  surname: "String",
  birthDate: { type: Date, default: Date.now },
  insertDate: { type: Date, default: Date.now },
  editDate: { type: Date, default: Date.now },
  interestedTopics: [],
  address: {
    line1 : "String",
    line2 : "String",
    postCode : "String",
    city: "String",
    state: "String",
    country: "String"
  }
});

module.exports = mongoose.model('User', userSchema);

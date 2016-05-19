var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({  
  username: "String",
  password: "String",
  name: "String",
  surname: "String",
  birthDate: { type: Date, default: Date.now },
  insertDate: { type: Date, default: Date.now },
  editDate: { type: Date, default: Date.now },
  tags: {}
});

module.exports = mongoose.model('User', userSchema);

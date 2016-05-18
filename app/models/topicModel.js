var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({  
  topicName: "String",
  taggedAsInterested: Number,
  taggedAsAsked: Number,
  //taggedAsFollowed: Number,
  insertDate: { type: Date, default: Date.now },
  editDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', questionSchema);

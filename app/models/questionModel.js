var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({  
  username: "String",
  question: "String",
  possibleAnswers: [],
  givenAnswers: {givenAnswer:"String", upvote:Number, downvote:Number},
  answered: Boolean,
  insertDate: { type: Date, default: Date.now },
  editDate: { type: Date, default: Date.now },
  tags: []
});

module.exports = mongoose.model('Question', questionSchema);

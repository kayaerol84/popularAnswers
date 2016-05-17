var mongoose = require('mongoose');  
var questionSchema = new mongoose.Schema({  
  username: String,
  question: String,
  possibleAnswers: {},
  givenAnswers: {},
  answered: Boolean,
  insertDate: { type: Date, default: Date.now },
  editDate: { type: Date, default: Date.now },
  tags: {}
});
mongoose.model('Question', questionSchema);

module.exports = mongoose.model('Question', questionSchema);
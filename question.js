var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var questionSchema = new Schema({
    name: String,
    insertDate: { type: Date, default: Date.now },
    username: String,
    answered: Boolean,
    answers: {type: Answer}
});

module.exports = mongoose.model('Question', questionSchema);
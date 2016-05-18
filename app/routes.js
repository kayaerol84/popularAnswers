var express = require('express');
var Question = require('./models/questionModel');

module.exports = function(app) {
    var router = express.Router();
    var indexRouter = express.Router();
    
    router.route('/questions')
    .get(function(req, res) {
        Question.find({}, function(err, questions) {
            if (err) res.send({
                    error: err
                });
            res.json(questions);

        });       
    })
    .post(function(req, res) {
        var username = req.body.username;
        var insertDate = req.body.insertDate;
        var questionText = req.body.questionText;
        var tags = req.body.tags;

        var question = new Question({
            username: username,
            question: questionText,
            insertDate: insertDate,
            tags: tags
        });

        question.save(function(err, question) {
            if (err) {
                handleError(res, err.message, "Failed to create a new question.");
            } else {
                res.json({
                    message: 'Question added',
                    question: question
                });
                res.status(201).json(doc.ops[0]);
            }
        }); 
    });

    router.route('questions/:id')
    .get(function(req, res) {
        var id = req.params.id;
        Question.findById(id, function(err, question) {
            if (err) res.send({error: err});
            res.json(question);

        }); 
    })
    .put(function(req, res) {

        var id = req.params.id;
        Question.findById(id, function(err, question) {
            if (err) res.send({error: err});
           
            var username = req.body.username;
            var insertDate = req.body.insertDate;
            var questionText = req.body.questionText;
            var tags = req.body.tags;
            
            question.save(function(err, question){
                if (err) res.send({error: err});
                res.json({message: "Question is updated", question: question});
            });
            
        });
    })
    .delete(function(req, res) {
        var id = req.params.id;
        Question.findById(id, function(err, question) {
            if (err) res.send({error: err});
           
             
            Question.remove(function(err, question){
                if (err) res.send({error: err});
                res.json({message: "Question is removed", question: question});
            });
            
        });
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    indexRouter.get('/*', function(req, res) {
        res.json({
            message: 'Welcome to PopularAnswers!'
        });
    });

    app.use('/api', router);
    app.use('/', indexRouter);
}
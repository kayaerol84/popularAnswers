var express    = require('express');        // call express
var logger     = require('morgan');
var path = require("path");
var fs = require('fs');
var bodyParser = require('body-parser');

var app        = express();                 // define our app using express
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var indexRouter = express.Router();

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
                
var mongoose = require('mongoose');

var mongodbUri = 'mongodb://erol:1234@ds017582.mlab.com:17582/popularanswers';
                  

mongoose.connect(mongodbUri, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:' ));
db.once('open',function(){console.log('Connected to DB')});

var questionSchema = new mongoose.Schema({  
  username: "String",
  question: "String",
  possibleAnswers: {},
  givenAnswers: {},
  answered: Boolean,
  insertDate: { type: Date, default: Date.now },
  editDate: { type: Date, default: Date.now },
  tags: {}
});
var Question = mongoose.model('question', questionSchema);


router.route('/questions')
.get( function(req, res) {
    Question.find({}, function(err,questions){
        if (err) res.send({error:err});
        res.json(questions);
            
    });
  /*db.collection(QUESTIONS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get questions.");
    } else {
      res.status(200).json(docs);  
    }
  });*/
})
.post( function(req, res) {
  var username = req.body.username;
  var insertDate = req.body.insertDate;
  var questionText = req.body.questionText;
  var tags = req.body.tags;
  
  var question = new Question({
    username:username,
    question:questionText,
    insertDate:insertDate,
    tags:tags    
  });

  question.save(function(err, question){
    if (err) {
      handleError(res, err.message, "Failed to create a new question.");
    } else {
        res.json({message:'Question added', question:question});
      res.status(201).json(doc.ops[0]);
    }
  });
  /* if (!(req.body.questionText && req.body.userName)) {
    handleError(res, "Invalid question input", "Must provide a question text and userName.", 400);
  }

  db.collection(QUESTIONS_COLLECTION).insertOne(newQuestion, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new question.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });*/
});

router.route('questions/:id')
.get(function(req, res) {
  
})
.put(function(req, res) {
  
})
.delete( function(req, res) {
  
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
indexRouter.get('/*', function(req, res) {
    res.json({ message: 'Welcome to PopularAnswers!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', indexRouter);


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = 3456; //process.env.PORT || 8080;        // set our port
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


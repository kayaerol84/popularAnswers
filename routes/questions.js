var express = require('express');
var router = express.Router();

/* GET questions listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a question');
});

/*  "/questions"
 *    GET: finds all questions
 *    POST: creates a new question
 */

router.get("/questions", function(req, res) {
  db.collection(QUESTIONS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get questions.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

router.post("/questions", function(req, res) {
  var newQuestion = req.body;
  newQuestion.createDate = new Date();

  if (!(req.body.questionText && req.body.userName)) {
    handleError(res, "Invalid question input", "Must provide a question text and userName.", 400);
  }

  db.collection(QUESTIONS_COLLECTION).insertOne(newQuestion, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new question.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/questions/:id"
 *    GET: find question by id
 *    PUT: update question by id
 *    DELETE: deletes question by id
 */

router.get("/questions/:id", function(req, res) {
  db.collection(QUESTIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get question");
    } else {
      res.status(200).json(doc);  
    }
  });
});

router.put("/questions/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(QUESTIONS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update question");
    } else {
      res.status(204).end();
    }
  });
});

router.delete("/questions/:id", function(req, res) {
  db.collection(QUESTIONS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete question");
    } else {
      res.status(204).end();
    }
  });
});


module.exports = router;
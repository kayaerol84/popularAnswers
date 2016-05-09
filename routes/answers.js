var express = require('express');
var router = express.Router();

/* GET answers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a answer');
});


/*  "/answers"
 *    GET: finds all answers
 *    POST: creates a new answer
 */

router.get("/answers", function(req, res) {
  db.collection(ANSWERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get answers.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

router.post("/answers", function(req, res) {
  var newAnswer = req.body;
  newAnswer.createDate = new Date();

  if (!(req.body.answerText && req.body.userName)) {
    handleError(res, "Invalid answer input", "Must provide a answer text and userName.", 400);
  }

  db.collection(ANSWERS_COLLECTION).insertOne(newAnswer, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new answer.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/answers/:id"
 *    GET: find answer by id
 *    PUT: update answer by id
 *    DELETE: deletes answer by id
 */

router.get("/answers/:id", function(req, res) {
  db.collection(ANSWERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get answer");
    } else {
      res.status(200).json(doc);  
    }
  });
});

router.put("/answers/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(ANSWERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update answer");
    } else {
      res.status(204).end();
    }
  });
});

router.delete("/answers/:id", function(req, res) {
  db.collection(ANSWERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete answer");
    } else {
      res.status(204).end();
    }
  });
});


module.exports = router;
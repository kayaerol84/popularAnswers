var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
//var db = require("./database.js");
var db = require("./database").db();


// Connect to the database before starting the application server.
/*mongodb.MongoClient.connect('mongodb://erol:1234@ds017582.mlab.com:17582/popularanswers', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

});
*/
var QUESTIONS_COLLECTION = "questions";

/*  "/questions"
 *    GET: finds all questions
 *    POST: creates a new question
 */

router.get("/", function(req, res) {
  db.collection(QUESTIONS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get questions.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

router.post("/", function(req, res) {
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

/*  "/:id"
 *    GET: find question by id
 *    PUT: update question by id
 *    DELETE: deletes question by id
 */

router.get("/:id", function(req, res) {
  db.collection(QUESTIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get question");
    } else {
      res.status(200).json(doc);  
    }
  });
});

router.put("/:id", function(req, res) {
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

router.delete("/:id", function(req, res) {
  db.collection(QUESTIONS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete question");
    } else {
      res.status(204).end();
    }
  });
});


module.exports = router;
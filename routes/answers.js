var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var mongoose = require('mongoose'); //mongo connection
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db = require("./database").db();
var ANSWERS_COLLECTION = "answers";
/*
// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://erol:1234@ds017582.mlab.com:17582/popularanswers', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

});

var ANSWERS_COLLECTION = "answers";

/*  "/answers"
 *    GET: finds all answers
 *    POST: creates a new answer
 */

router.get("/", function(req, res) {
  db.collection(ANSWERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get answers.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

router.post("/", function(req, res) {
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

router.get("/:id", function(req, res) {
  db.collection(ANSWERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get answer");
    } else {
      res.status(200).json(doc);  
    }
  });
});

router.put("/:id", function(req, res) {
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

router.delete("/:id", function(req, res) {
  db.collection(ANSWERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete answer");
    } else {
      res.status(204).end();
    }
  });
});


module.exports = router;
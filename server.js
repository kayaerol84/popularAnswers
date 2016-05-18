var express    = require('express');        // call express
var logger     = require('morgan');
var path = require("path");
var fs = require('fs');
var bodyParser = require('body-parser');

var config = require('./config/config');

var app    = express(); // define our app using express

require('./config/mongoose')(config);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

var port = 3456; //process.env.PORT || 8080;        // set our port
// START THE SERVER
// =============================================================================
app.listen(port, function(){
  console.log('Magic happens on port ' + port);  
});
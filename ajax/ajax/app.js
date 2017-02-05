/////////////////////////
// REQUIRE THE PACKAGE //
/////////////////////////

var express 	= require('express');
var path 		= require('path');
var favicon 	= require('serve-favicon');
var logger 		= require('morgan');
var bodyParser  = require('body-parser');

var index = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
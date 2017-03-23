/////////////////////////
// REQUIRE THE PACKAGE //
/////////////////////////

var express 		= require('express');
var bodyParser 		= require('body-parser');
var cookieParser	= require('cookie-parser')
var path 			= require('path');
var session 		= require('express-session');
var http 			= require('http');
var https     		= require('https');
var fs 				= require('fs');
var logger 			= require('morgan');

///////////////
// CONSTANTS //
///////////////

var HTTP_HOST 	= process.env.HOST || '127.0.0.1';
var HTTP_PORT 	= process.env.PORT || 3000;

var app 		= express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
	secret: 'example',
		cookie:{
			maxAge:60000
		},
		resave: false,
		saveUninitialized: true
}));

app.set("view engine","jade")
app.set('views', __dirname + '/views')
app.set('views', path.join(__dirname, 'views'));

require('./routes/routes.js')(app);


app.listen(HTTP_PORT, HTTP_HOST);
console.log('Server running at ' + HTTP_HOST + ':' + HTTP_PORT);

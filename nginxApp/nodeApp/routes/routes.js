/////////////////////////
// REQUIRE THE PACKAGE //
/////////////////////////

var util 			= 	require('util');
var express 		= 	require('express');
var cassandra 		= 	require("cassandra-driver");
var bodyParser 		= 	require("body-parser");
var crypto 			= 	require('crypto');
var path 			= 	require("path");
var session 		= 	require("express-session");

////////////////////////////////
// DATABASE SETTINGS & CONFIG //
////////////////////////////////

var connection;
var db_config = {
 	contactPoints : ['127.0.0.1'],
 	keyspace:'userdetails'
};

function handleDisconnect() {
  	connection = new cassandra.Client(db_config);
  	connection.connect(function(err,result){
  		console.log('cassandra connected');
  	});
}
handleDisconnect();


module.exports = function (app) {

//////////////////////////
// CHECK AUTHENTICATION //
//////////////////////////

	function checkSignIn(req, res, next ){
	    if(req.session.sessId){
	        next();     //If session exists, proceed to page
	    } else {
	        var err = new Error("Not logged in!");
	    	console.log(req.session.sessId);
	        // next(err);  //Error, trying to access unauthorized page!
	    	res.render('illegalaccess', {title: "unauthorized page", message: "U r unauthorized to open this page"});
	    }
	};

/////////////////////////////
// GET/POST PAGE RENDERING //
/////////////////////////////

	app.get('/', function (request, response, next) {
		response.redirect('/index.html')
	});

	app.get('/home',checkSignIn, function (request, response, next) {
		response.render('home');
	});

	app.get('/profile',checkSignIn, function (request, response, next) {
		response.render('profile');
	});

	app.get('/unauthorized', function (request, response, next) {
		response.render('unauthorized');
	});

	app.get('/welcome', function (request, response, next) {
		response.render('welcome');
	});

	app.get('/logout', function (request, response, next) {
		request.session.destroy(function(err){
			if(err){
				console.log(err);
			}else{
				response.redirect('/');
			}
		});
	});

	app.post("/login", function (request, response) {
		var body = request.body;
		var usersessId = body.Username;
		var hash = crypto.createHash('md5').update(body.password).digest("hex");
		var postVars = {username: body.Username, password: hash};
		// fetching from CASSANDRA
		var queryString = "SELECT password FROM users where username = ?;";
		connection.execute(queryString,[body.Username], function(err, rows) {
			console.log("rows",rows);
		    if(err){ 
		    	handleDisconnect();                                  
		        throw err;
		    } 
		 	if(rows["rows"].length == 0){
		 		response.render('unauthorized', { title: "unauthorized", username: body.Username +"U r unauthorized man ..!!"});
		 	}
		 	else{
		 		var passwordSuccess = 0;
		 		
	 			for (var i in rows["rows"]) {

			    	if(rows["rows"][i]["password"] == hash){
			    		console.log("USER SUCCESS");
			    		passwordSuccess = 1;
			    		break;
			        }
			        else{
			        	passwordSuccess = 0;
			        }
			    }
			    if(passwordSuccess == 1){
			    	request.session.sessId = usersessId;
	        		response.render('home', { appTitle: "HOME", username: body.Username +" home page .. welcome !!"});
			    }
			    else{
	        		response.render('unauthorized', {title: "unauthorized", username: body.Username +" wrong password"});
			    }
		 	}
		});
	});
	
	app.post("/register", function (request, response) {
		var body = request.body;
		var usersessId = body.regUsername;
		
		var hash = crypto.createHash('md5').update(body.regPassword).digest("hex");
		var query = 'INSERT INTO users ( username, email, password) VALUES (?, ?, ?)';
		var params = [body.regUsername, body.regEmail, hash];

		connection.execute(query, params, { prepare: true }, function (err) {
		  	if(err) {  
		        throw err;
		    } 
		});
		console.log("user registered");
		request.session.sessId = usersessId;
	    response.render('home', {title: "HOME", username: body.regUsername +" is registered  & authorized"});
	});
};

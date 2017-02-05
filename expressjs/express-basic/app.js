// Using express module
var express = require('express');

// Creating an app object of express module
var app = express();

// Creating a callback to send hello world response
app.get('/',function(req,res){
	res.send("hello world");
});

// Creating server instance to listen to port 3000

var server = app.listen(3000,function(){
	console.log("server listening to port http://localhost:3000/");
});
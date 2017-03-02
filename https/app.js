var fs        = require("fs");
var express   = require("express");
var https     = require('https');

var HTTPS_PORT = 8433;
var app = express();

app.all('*', function(req, res, next){
  if (req.secure) {
    return next();
  };
  res.redirect('https://localhost:'+HTTPS_PORT+req.url);
});

app.get('/', function (req, res) {
  res.send('Secure page!!!');
});

//////////////////
// Setup server //
//////////////////

var secureServer = https.createServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    ca: fs.readFileSync('./keys/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(HTTPS_PORT, function() {
    console.log("Secure Express server listening on port "+ HTTPS_PORT);
});

var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      // console.log(pathname.substr(1))
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {	
         // HTTP Status: 200 : OK
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      // Send the response body 
      response.end();
   });   
}).listen(3000);

// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');
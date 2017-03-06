/////////////////////////////////
// Require the modules
/////////////////////////////////
var cassandra 		= require("cassandra-driver");
var express 		= require('express');
var router 			= express.Router();
////////////////////////////////////
// Cassandra database config
////////////////////////////////////
var dbConfig = {
	 	contactPoints : ['127.0.0.1'],
	 	keyspace:'booklist'
	};

var connection = new cassandra.Client(dbConfig);

connection.connect(function(err,result){
	console.log('cassandra connected');
});

router.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to Book Store Demo...";
	res.json(data);
});

router.get('/books',function(req,res){
	var data = {
		"error":1,
		"Books":""
	};
	var select = "SELECT * from books";
	connection.execute(select,function(err, rows){
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'No books Found..';
			res.json(data);
		}
	});
});

router.get('/book/view/:id',function(req,res){
	var Id = req.params.id;
	var data = {
		"error":1,
		"Books":""
	};
	var params = [Id]
	var select = "SELECT * from books WHERE id= ?;"
	connection.execute(select,params,function(err, rows){
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'No books Found..';
			res.json(data);
		}
	});
});

router.post('/book/add',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	console.log(Id,Bookname,Authorname,Price);
	console.log(!!Id && !!Bookname && !!Authorname && !!Price)
	if(!!Id && !!Bookname && !!Authorname && !!Price){
		
		var insert = "INSERT INTO books(id,authorname,bookname,price) VALUES (?,?,?,?);";
		var params = [Id,Authorname,Bookname,Price];
		console.log(params)
		connection.execute(insert,params,function(err){
			console.log(err);
			if(!!err){
				data["Books"] = "Error Adding data";
			}else{
				data["error"] = 0;
				data["Books"] = "Book Added Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : id,Bookname, Authorname, Price)";
		res.json(data);
	}
});

router.put('/book/modify/:id',function(req,res){
	var Id = req.params.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id && !!Bookname && !!Authorname && !!Price){
		var update = "UPDATE books SET bookname=?, authorname=?, price=? WHERE id=?"
		var params = [Bookname,Authorname,Price,Id]
		connection.execute(update,params,function(err){
			if(!!err){
				data["Books"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Books"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : id, Bookname, Authorname, Price)";
		res.json(data);
	}
});

router.delete('/book/delete/:id',function(req,res){
	var Id = req.params.id;
	console.log(Id)
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id){
		var delet = "DELETE FROM books WHERE id=?";
		var params = [Id]
		connection.execute(delet,params,function(err){
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}
});

module.exports = router;

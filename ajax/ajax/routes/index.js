var express 	= require('express');
var router 		= express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	res.send('index.html');
});

router.post('/login',function(req,res){
	var user_name 	= 	req.body.username;
	var password	=	req.body.pwd;

	console.log("User name is : "+user_name+", password is :"+password);

	if(user_name === 'user' && password === 'password'){
		res.send("authorized");
	}else{
		res.send("Unauthorized");
	}
});

module.exports = router;

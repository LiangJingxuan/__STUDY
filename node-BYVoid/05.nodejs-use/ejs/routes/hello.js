var express = require('express');
var router = express.Router();

/* GET hello listing. */
router.get('/', function(req, res, next) {
  res.send('The time is ' + new Date().toString());
});

/* 子路由 */
router.get('/:username',function(req,res,next){
	console.log(req.params.username);
	next();
});

router.get('/:username',function(req,res,next){
	res.send('user:'+req.params.username);
});

module.exports = router;

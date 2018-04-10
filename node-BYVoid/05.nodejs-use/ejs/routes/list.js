var express = require('express');
var router = express.Router();

/* GET users list. */
router.get('/', function(req, res, next) {
  res.render('list',{
  	title:'lee',
  	items:[1994,'lee','express','node']
  });
});

module.exports = router;

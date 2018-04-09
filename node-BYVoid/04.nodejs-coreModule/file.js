const FILESYSTEM=require('fs');

FILESYSTEM.readFile('t.txt','utf8',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
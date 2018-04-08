// 覆盖exports
function Hello(){
	var name;
	this.setName = function(thyname){
		name=thyname;
	};
	this.sayName = function(){
		console.log('Hello '+name);
	};
};

module.exports = Hello;
/* 原型属性 */

// 利用原型添加方法与属性
function Gadget(name,color){
	this.name=name;
	this.color=color;
	this.whatAreYou=function(){
		return 'I a, a'+this.color+' '+this.name;
	}
}

Gadget.prototype.price=100;
Gadget.prototype.rating=3;
Gadget.prototype.getInfo=function(){
	return 'Rating: '+this.rating+',price: '+this.price;
}

Gadget.prototype={
	oop:100,
	foo:function(){
		return this.oop;
	}
}

// 使用原型的方法与属性
var newtoy=new Gadget('webcam','black');
newtoy.name;
newtoy.color;
newtoy.whatAreYou();
newtoy.price;
newtoy.rating;
newtoy.getInfo();

// 自身属性与原型属性

// 同一个属性名同时出现对象的自身属性和原型属性，对象自身属性优先级高于原型属性。

// 枚举属性


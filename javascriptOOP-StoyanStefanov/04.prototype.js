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
var o={p1:1,p2:2}
for(var i in o){
	console.log(i+'='+o[i]);
}

// isPrototypeOf()方法
// 每个对象都会有一个 isPrototypeOf() 方法，告诉我们当前对象是否是另一个对象的原型。

var monkey={
	hair:true,
	feeds: 'bananas',
	breathes: 'air'
}
function Human(name){
	this.name=name;
}
Human.prototype=monkey;
var george=new Human('George');
monkey.isPrototypeOf(george); // true

// __proto__链接

// 扩展内建对象
// 1: 为内置对象数组对象添加一个用于查询数组中是否存在某个特定的值:
Array.prototype.inArray=function(needle){
	for(var i=0,len=this.length;i<len;i++){
		if(this[i]===needle){
			return true;
		}
	}
	return false;
}
// 使用
var a=['red','green','blue'];
a.inArray('red'); // true
a.inArray('yellow'); // false

// 2: String对象中添加一个reverse()方法
String.prototype.reverse=function(){
	return Array.prototype.reverse.apply(this.split('').join(''));
}
// 使用
'Stoyan'.reverse(); // 'nayotS'
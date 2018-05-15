/* 原型链继承 */
function Shape(){
	this.name='shape';
	this.toString=function(){
		return this.name;
	}
}
function TwoDShape(){
	this.name='2D shape';
}
function Triangle(side,height){
	this.name='Triangle';
	this.side=side;
	this.height=height;
	this.getArea=function(){
		return this.side*this.height/2;
	}
}

TwoDShape.prototype=new Shape();
Triangle.prototype=new TwoDShape();

TwoDShape.prototype.constructor=TwoDShape;
Triangle.prototype.constructor=Triangle;

// 使用
var my=new Triangle(5,10);
my.getArea(); // 25

my.toString(); // Triangle

// 通过instanceof操作符，可以验证my对相同时是上述三个构造器的实例：
my instanceof Shape; // true
my instanceof TwoDShape; // true
my instanceof Triangle; // true

// 以my参数调用这些构造器原型的 isPrototypeOf() 方法：
Shape.prototype.isPrototypeOf(my); // true
TwoDShape.prototype.isPrototypeOf(my); // true
Triangle.prototype.isPrototypeOf(my); // true

// 也可以用其他两个构造器开创建对象，用 new TwoDShape() 所创建的对象也可以获得继承自 Shape() 的 toString() 方法：
var td=new TwoDShape();
td.constructor; // TwoDShape()
td.toString(); // '2D shape'

var s=new Shape();
s.constructor; // Shape()



/* 将共享属性迁移到原型中去 */
function Shape(){}
Shape.prototype.name='shape';



/* 只继承于原型 */

// 出于效率的考虑，应该尽可能的将一些可重用属性和方法添加到原型中。 仅仅依靠原型就能完成继承关系的构建，
// 由于原型中的所有代码都是可重用的，这意味着继承自 Shape.prototype 比继承自 new Shape() 所创建的实体要好得多。
// new Shape() 方式会将 Shape 的属性设定为对象自身属性，这样的代码是不可重用的，因而要将其设置为原型中。

// 对第一个例子做修改
	
	// 不要单独为继承关系创建新对象。
	// 尽量减少运行时的方法搜索，如 toString()。
	// 弊端：子对象对原型进行修改，父对象也会随即被改变，所有的继承关系也是如此。

function Shape(){}
Shape.prototype.name='shape';
Shape.prototype.toString=function(){return this.name};

function TwoDShape(){}
TwoDShape.prototype=Shape.prototype;
TwoDShape.prototype.constructor=TwoDShape;
TwoDShape.prototype.name='2D shape';

function Traingle(side,height){
	this.side=side;
	this.height=height;
}
Traingle.prototype=TwoDShape.prototype;
Traingle.prototype.constructor=Traingle;
Traingle.prototype.name='Triangle';
Traingle.prototype.getArea=function(){return this.side * this.height / 2}

// 测试结果与之前相同
var my=new Traingle(5,10);
my.getArea(); // 25
my.toString(); // Triangle



/* 临时构造器 new F() */

// 如果所有属性都指向一个相同的对象，父对象就会受到子对象属性的影响。利用某种中介来打破这种连锁关系，可以用一个临时构造器函数来充当中介。
// 创建一个空函数 f() ，并将其原型设置为父级构造器。 然后用new F() 来创建一些不包含父对象属性的对象，同时又可以从父对象prototype属性中继承一切。

// 对第一个例子做修改
function Shape(){}
Shape.prototype.name='shape';
Shape.prototype.toString=function(){
	return this.name;
}
function TwoDShape(){}
var F=function(){};
F.prototype=Shape.prototype;
TwoDShape.prototype=new F();
TwoDShape.prototype.constructor=TwoDShape;
TwoDShape.prototype.name='2D shape';

function Triangle(side,height){
	this.side=side;
	this.height=height;
}
var F=function(){};
F.prototype=TwoDShape.prototype;
Triangle.prototype=new F();
Triangle.prototype.constructor=Triangle;
Triangle.prototype.name='Triangle';
Triangle.prototype.getArea=function(){
	return this.side * this.height / 2;
}
// 测试
var my=new Triangle(5,10);
my.getArea(); // 25
my.toString(); // Triangle



/* uber 子对象访问父对象的方式 */

/* 将继承部封装成函数 */
function extend(Child,Parent){
	var F=function(){};
	F.prototype=Parent.prototype;
	Child.prototype=new F();
	Child.prototype.constructor=Child;
	Child.uber=Parent.prototype;
}
extend(TwoDShape.Shape);



/* 对象之间的继承 */
var o={};
function extendCopy(p){
	var c={};
	for(var i in p){
		c[i]=p[i];
	}
	c.uber=p;
	return c;
}
// 应用
var shape={
	name: 'shape',
	toString: function(){
		return this.name;
	}
}

var towDee=extendCopy(shape);
towDee.name='2D shape';
towDee.toString=function(){
	return this.uber.toString() + ', '+ this.name;
}

var triangle=extendCopy(towDee);
triangle.name='Triangle';
triangle.getArea=function(){
	return this.side * this.height /2;
}

triangle.side=5;
triangle.height=10;
triangle.getArea(); // 25
triangle.toString(); // shape 2D shape,Triangle



/* 深拷贝 */
function deepCopy(p,c){
	var c=c||{};
	for(var i in p){
		if(typeof p[i]==='object'){
			c[i]=(p[i].constructor===Array)?[]:{};
			deepCopy(p[i],c[i])
		}else{
			c[i]=p[i]
		}
	}
	return c;
}
var parent={
	numbers: [1,2,3],
	letters: ['a','b','c'],
	obj: {
		prop: 1
	},
	bool: true
}

// 使用
var mydeep=deepCopy(parent);
var myshallow=extendCopy(parent);

mydeep.numbers.push(4,5,6); // 6
mydeep.numbers; // [1,2,3,4,5,6]

parent.numbers; // [1,2,3]

myshallow.numbers.push(10); // 4
myshallow.numbers; // [1,2,3,10]

parent.numbers; // [1,2,3,10]
mydeep.numbers; // [1,2,3,4,5,6]



/* object() */
// 基于对象之间直接构建继承关系，可以用objcet()函数来接收父对象，并返回一个以该对象为原型的新对象。
function object(o){
	function F(){}
	F.prototype=o;
	return new F();
}

// 访问uber属性
function object(o){
	var n;
	function F(){}
	F.prototype=o;
	n=new F();
	n.uber=o;
	return n;
}

// 使用
var triangle=object(towDee);
triangle.name='Triangle';
triangle.getArea=function(){
	return this.side * this.height / 2;
}
triangle.toString(); // 'shape 2D shape, Triangle'



/* 原型继承与属性拷贝的混合应用 */
function objectPlus(o,stuff){
	var n;
	function F(){}
	F.prototype=o;
	n=new F();
	n.uber=o;

	for(var i in stuff){
		n[i]=stuff[i];
	}
	return n;
}
var shape={
	naem: 'shape',
	toString: function(){
		return this.name;
	}
}
var towDee=objectPlus(shape,{
	name: '2D shape',
	toString: function(){
		return this.uber.toString()+', '+this.name;
	}
});
var triangle=object(towDee,{
	name: 'Triangle',
	getArea: function(){
		return this.side * this.heigth / 2;
	},
	side: 0,
	heigth: 0
});
var my=objectPlus(triangle,{
	side: 4,
	height: 4
});
my.toString(); // shape,2D shape, Triangle, Triangle



/* 多重继承 */

/* 寄生式继承 */

/* 构造器借用 */

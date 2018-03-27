"use strict";

/**
 * Class 的基本语法
 * 
 */

/*简介*/
// 定义类
// ES6 的类，完全可以看作构造函数的另一种写法
class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return '('+this.x+','+this.y+')';
	}
};
typeof Point; // "function"
Point === Point.prototype.constructor; // true

// 使用: 直接对类使用new命令，跟构造函数的用法完全一致
class Bar{
	doStuff(){
		console.log('stuff');
	}
};
var b=new Bar();
b.doStuff(); // stuff

// 在类的实例上面调用方法，其实就是调用原型上的方法
class B {}
let b2 = new B();
b2.constructor === B.prototype.constructor // true

// Object.assign方法可以很方便地一次向类添加多个方法
Object.assign(Point.prototype,{
	toString(){},
	toValue(){}
});

// prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的
Point.prototype.constructor === Point; // true

// 类的内部所有定义的方法，都是不可枚举的

// 类的属性名，可以采用表达式
let methodName = 'getArea';
class Square {
  constructor(length) {
    // ...
  }
  [methodName]() {
    // ...
  }
}

/*严格模式*/
// 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式

/*constructor 方法*/
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行

/*类的实例对象*/
// 生成类的实例对象的写法，与 ES5 完全一样，也是使用new命令
// 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

/*Class 表达式*/
// 与函数一样，类也可以使用表达式的形式定义
// 类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类
const MyClass=class Me{
	getClassName(){
		return Me.name;
	}
};
let inst=new MyClass();
inst.getClassName(); // Me

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式
const MyClass2=class{};

// 采用 Class 表达式，可以写出立即执行的 Class
let Person=new class {
	constructor(name){
		this.name=name;
	}
	sayName(){
		console.log(this.name);
	}
}('张三');
Person.sayName();

/*不存在变量提升*/
/*
	new Foo();
	class Foo{}
	ReferenceError......	
	必须保证子类在父类之后定义
*/

/*私有方法和私有属性*/

// 现有的方法
// 一种做法是在命名上加以区别
class Widget{

	// 公有方法
	foo(baz){
		this._bar(baz);
	}

	// 私有方法
	_bar(baz){
		return this.snaf=baz;
	}
};
// 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的
// foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法
class Widget2 {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
};
// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};

// 私有属性的提案
// 与私有方法一样，ES6 不支持私有属性。目前，有一个提案，为class加了私有属性。
// 方法是在属性名之前，使用#表示

/*this 的指向*/
// 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错
// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了
// 另一种解决方法是使用箭头函数
// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this

/*name 属性*/
// name属性总是返回紧跟在class关键字后面的类名
class Point3 {};
Point3.name; // "Point"

/*Class 的取值函数（getter）和存值函数（setter）*/
// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，
// 拦截该属性的存取行为
class MyClass4 {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
};
let inst2 = new MyClass4();
inst2.prop = 123; // setter: 123
inst2.prop; // 'getter'

/*Class 的 Generator 方法*/
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
};

for (let x of new Foo('hello', 'world')) {
  console.log(x);
};
// hello
// world

/*Class 的静态方法*/
// 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
class Foo3 {
  static classMethod() {
    return 'hello';
  }
};
Foo3.classMethod() // 'hello'
var foo = new Foo3();
// foo.classMethod()
// TypeError: foo.classMethod is not a function

// 如果静态方法包含this关键字，这个this指的是类，而不是实例
class Foo4 {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
};
Foo4.bar() // hello

/*Class 的静态属性和实例属性*/
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性
class Foos {
}
Foos.prop = 1;
Foos.prop // 1

// 静态属性的提案
// 1.类的实例属性可以用等式，写入类的定义之中
// 2.类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了

/*new.target 属性*/
// 该属性一般用在构造函数之中，返回new命令作用于的那个构造函数
// 如果构造函数不是通过new命令调用的，new.target会返回undefined
// 这个属性可以用来确定构造函数是怎么调用的
// 在函数外部，使用new.target会报错
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
var objs = new Rectangle(3, 4); // 输出 true
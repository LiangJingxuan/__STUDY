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

// 现有的方法  +++++++++++++++++++++++++++++++++++++++++++
// 一种做法是在命名上加以区别
class Widget{
	foo(baz){
		this._bar(baz);
	}
};


/*this 的指向*/
/*name 属性*/
/*Class 的取值函数（getter）和存值函数（setter）*/
/*Class 的 Generator 方法*/
/*Class 的静态方法*/
/*Class 的静态属性和实例属性*/
/*new.target 属性*/
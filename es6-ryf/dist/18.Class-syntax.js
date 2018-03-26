"use strict";

/**
 * Class 的基本语法
 * 
 */

/*简介*/
// 定义类
// ES6 的类，完全可以看作构造函数的另一种写法

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
	function Point(x, y) {
		_classCallCheck(this, Point);

		this.x = x;
		this.y = y;
	}

	_createClass(Point, [{
		key: 'toString',
		value: function toString() {
			return '(' + this.x + ',' + this.y + ')';
		}
	}]);

	return Point;
}();

;
typeof Point === 'undefined' ? 'undefined' : _typeof(Point); // "function"
Point === Point.prototype.constructor; // true

// 使用: 直接对类使用new命令，跟构造函数的用法完全一致

var Bar = function () {
	function Bar() {
		_classCallCheck(this, Bar);
	}

	_createClass(Bar, [{
		key: 'doStuff',
		value: function doStuff() {
			console.log('stuff');
		}
	}]);

	return Bar;
}();

;
var b = new Bar();
b.doStuff(); // stuff

// 在类的实例上面调用方法，其实就是调用原型上的方法

var B = function B() {
	_classCallCheck(this, B);
};

var b2 = new B();
b2.constructor === B.prototype.constructor; // true

// Object.assign方法可以很方便地一次向类添加多个方法
Object.assign(Point.prototype, {
	toString: function toString() {},
	toValue: function toValue() {}
});

// prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的
Point.prototype.constructor === Point; // true

// 类的内部所有定义的方法，都是不可枚举的

// 类的属性名，可以采用表达式
var methodName = 'getArea';

var Square = function () {
	function Square(length) {
		// ...

		_classCallCheck(this, Square);
	}

	_createClass(Square, [{
		key: methodName,
		value: function value() {
			// ...
		}
	}]);

	return Square;
}();

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


var MyClass = function () {
	function Me() {
		_classCallCheck(this, Me);
	}

	_createClass(Me, [{
		key: 'getClassName',
		value: function getClassName() {
			return Me.name;
		}
	}]);

	return Me;
}();
var inst = new MyClass();
inst.getClassName(); // Me

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式
var MyClass2 = function MyClass2() {
	_classCallCheck(this, MyClass2);
};

// 采用 Class 表达式，可以写出立即执行的 Class
var Person = new (function () {
	function _class(name) {
		_classCallCheck(this, _class);

		this.name = name;
	}

	_createClass(_class, [{
		key: 'sayName',
		value: function sayName() {
			console.log(this.name);
		}
	}]);

	return _class;
}())('张三');
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

var Widget = function () {
	function Widget() {
		_classCallCheck(this, Widget);
	}

	_createClass(Widget, [{
		key: 'foo',
		value: function foo(baz) {
			this._bar(baz);
		}
	}]);

	return Widget;
}();

;

/*this 的指向*/
/*name 属性*/
/*Class 的取值函数（getter）和存值函数（setter）*/
/*Class 的 Generator 方法*/
/*Class 的静态方法*/
/*Class 的静态属性和实例属性*/
/*new.target 属性*/
"use strict";

/**
 * Class 的基本语法
 * 
 */

/*简介*/
// 定义类
// ES6 的类，完全可以看作构造函数的另一种写法

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

// 现有的方法
// 一种做法是在命名上加以区别

var Widget = function () {
  function Widget() {
    _classCallCheck(this, Widget);
  }

  _createClass(Widget, [{
    key: 'foo',


    // 公有方法
    value: function foo(baz) {
      this._bar(baz);
    }

    // 私有方法

  }, {
    key: '_bar',
    value: function _bar(baz) {
      return this.snaf = baz;
    }
  }]);

  return Widget;
}();

;
// 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的
// foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法

var Widget2 = function () {
  function Widget2() {
    _classCallCheck(this, Widget2);
  }

  _createClass(Widget2, [{
    key: 'foo',
    value: function foo(baz) {
      bar.call(this, baz);
    }

    // ...

  }]);

  return Widget2;
}();

;
// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
var bar = Symbol('bar');
var snaf = Symbol('snaf');

var myClass = function () {
  function myClass() {
    _classCallCheck(this, myClass);
  }

  _createClass(myClass, [{
    key: 'foo',


    // 公有方法
    value: function foo(baz) {
      this[bar](baz);
    }

    // 私有方法

  }, {
    key: bar,
    value: function value(baz) {
      return this[snaf] = baz;
    }

    // ...

  }]);

  return myClass;
}();

exports.default = myClass;
;

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

var Point3 = function Point3() {
  _classCallCheck(this, Point3);
};

;
Point3.name; // "Point"

/*Class 的取值函数（getter）和存值函数（setter）*/
// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，
// 拦截该属性的存取行为

var MyClass4 = function () {
  function MyClass4() {
    // ...

    _classCallCheck(this, MyClass4);
  }

  _createClass(MyClass4, [{
    key: 'prop',
    get: function get() {
      return 'getter';
    },
    set: function set(value) {
      console.log('setter: ' + value);
    }
  }]);

  return MyClass4;
}();

;
var inst2 = new MyClass4();
inst2.prop = 123; // setter: 123
inst2.prop; // 'getter'

/*Class 的 Generator 方法*/

var Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.args = args;
  }

  _createClass(Foo, [{
    key: Symbol.iterator,
    value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this.args[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 12;
                break;
              }

              arg = _step.value;
              _context.next = 9;
              return arg;

            case 9:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError) {
                _context.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
  }]);

  return Foo;
}();

;

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = new Foo('hello', 'world')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var x = _step2.value;

    console.log(x);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

;
// hello
// world

/*Class 的静态方法*/
// 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”

var Foo3 = function () {
  function Foo3() {
    _classCallCheck(this, Foo3);
  }

  _createClass(Foo3, null, [{
    key: 'classMethod',
    value: function classMethod() {
      return 'hello';
    }
  }]);

  return Foo3;
}();

;
Foo3.classMethod(); // 'hello'
var foo = new Foo3();
// foo.classMethod()
// TypeError: foo.classMethod is not a function

// 如果静态方法包含this关键字，这个this指的是类，而不是实例

var Foo4 = function () {
  function Foo4() {
    _classCallCheck(this, Foo4);
  }

  _createClass(Foo4, [{
    key: 'baz',
    value: function baz() {
      console.log('world');
    }
  }], [{
    key: 'bar',
    value: function bar() {
      this.baz();
    }
  }, {
    key: 'baz',
    value: function baz() {
      console.log('hello');
    }
  }]);

  return Foo4;
}();

;
Foo4.bar(); // hello

/*Class 的静态属性和实例属性*/
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性

var Foos = function Foos() {
  _classCallCheck(this, Foos);
};

Foos.prop = 1;
Foos.prop; // 1

// 静态属性的提案
// 1.类的实例属性可以用等式，写入类的定义之中
// 2.类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了

/*new.target 属性*/
// 该属性一般用在构造函数之中，返回new命令作用于的那个构造函数
// 如果构造函数不是通过new命令调用的，new.target会返回undefined
// 这个属性可以用来确定构造函数是怎么调用的
// 在函数外部，使用new.target会报错

var Rectangle = function Rectangle(length, width) {
  _classCallCheck(this, Rectangle);

  console.log(new.target === Rectangle);
  this.length = length;
  this.width = width;
};

var objs = new Rectangle(3, 4); // 输出 true
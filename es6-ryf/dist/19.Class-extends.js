"use strict";

/**
 * Class 的继承
 * 
 */

/*简介*/
// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};
// super关键字，它在这里表示父类的构造函数，用来新建父类的this对象
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错
// 因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工
// 如果不调用super方法，子类就得不到this对象
// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错


var ColorPoint = function (_Point) {
  _inherits(ColorPoint, _Point);

  function ColorPoint(x, y, clolr) {
    _classCallCheck(this, ColorPoint);

    // 调用父类的constructor(x, y)
    var _this = _possibleConstructorReturn(this, (ColorPoint.__proto__ || Object.getPrototypeOf(ColorPoint)).call(this, x, y));

    _this.color = color;
    return _this;
  }

  _createClass(ColorPoint, [{
    key: 'toString',
    value: function toString() {
      return this.color + ' ' + _get(ColorPoint.prototype.__proto__ || Object.getPrototypeOf(ColorPoint.prototype), 'toString', this).call(this); // 调用父类的toString()
    }
  }]);

  return ColorPoint;
}(Point);
// 生成子类实例的代码


var cp = new ColorPoint(25, 8, 'red');
cp instanceof ColorPoint; // true
cp instanceof Point; // true

// 父类的静态方法，也会被子类继承
// hello()是A类的静态方法，B继承A，也继承了A的静态方法

var A = function () {
  function A() {
    _classCallCheck(this, A);
  }

  _createClass(A, null, [{
    key: 'hello',
    value: function hello() {
      console.log('hello world');
    }
  }]);

  return A;
}();

var B = function (_A) {
  _inherits(B, _A);

  function B() {
    _classCallCheck(this, B);

    return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments));
  }

  return B;
}(A);

B.hello(); // hello world

/*Object.getPrototypeOf()*/
// 可以用来从子类上获取父类
// 因此，可以使用这个方法判断，一个类是否继承了另一个类
Object.getPrototypeOf(ColorPoint) === Point; // true

/*super 关键字*/
// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

// 第一种情况，super作为函数调用时，代表父类的构造函数
// ES6 要求，子类的构造函数必须执行一次super函数

var AA = function AA() {
  _classCallCheck(this, AA);
};

var BB = function (_AA) {
  _inherits(BB, _AA);

  function BB() {
    _classCallCheck(this, BB);

    return _possibleConstructorReturn(this, (BB.__proto__ || Object.getPrototypeOf(BB)).call(this));
  }

  return BB;
}(AA);
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例
// 即super内部的this指的是B
// 因此super()在这里相当于A.prototype.constructor.call(this)
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错

// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
// 如果属性定义在父类的原型对象上，super就可以取到


var A2 = function () {
  function A2() {
    _classCallCheck(this, A2);
  }

  _createClass(A2, [{
    key: 'p',
    value: function p() {
      return 2;
    }
  }]);

  return A2;
}();

var B2 = function (_A2) {
  _inherits(B2, _A2);

  function B2() {
    _classCallCheck(this, B2);

    var _this4 = _possibleConstructorReturn(this, (B2.__proto__ || Object.getPrototypeOf(B2)).call(this));

    console.log(_get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'p', _this4).call(_this4));
    return _this4;
  }

  return B2;
}(A2);

var b = new B2();
// 通过super调用父类的方法时，方法内部的this指向当前的子类实例

var A3 = function () {
  function A3() {
    _classCallCheck(this, A3);

    this.x = 1;
  }

  _createClass(A3, [{
    key: 'print',
    value: function print() {
      console.log(this.x);
    }
  }]);

  return A3;
}();

var B3 = function (_A3) {
  _inherits(B3, _A3);

  function B3() {
    _classCallCheck(this, B3);

    var _this5 = _possibleConstructorReturn(this, (B3.__proto__ || Object.getPrototypeOf(B3)).call(this));

    _this5.x = 2;
    return _this5;
  }

  _createClass(B3, [{
    key: 'm',
    value: function m() {
      _get(B3.prototype.__proto__ || Object.getPrototypeOf(B3.prototype), 'print', this).call(this);
    }
  }]);

  return B3;
}(A3);

var b3 = new B3();
b3.m(); // 2
// 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字

/*类的 prototype 属性和__proto__属性*/
// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
// 1）子类的__proto__属性，表示构造函数的继承，总是指向父类
// 2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性

var A4 = function A4() {
  _classCallCheck(this, A4);
};

var B4 = function (_A4) {
  _inherits(B4, _A4);

  function B4() {
    _classCallCheck(this, B4);

    return _possibleConstructorReturn(this, (B4.__proto__ || Object.getPrototypeOf(B4)).apply(this, arguments));
  }

  return B4;
}(A);

B4.__proto__ === A4; // true
B4.prototype.__proto__ === A4.prototype; // true

Object.create(A4.prototype);
// 等同于
B4.prototype.__proto__ = A4.prototype;

// extends 的继承目标
// extends关键字后面可以跟多种类型的值

// A，只要是一个有prototype属性的函数，就能被B继承
// 由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数

var K2 = function (_A5) {
  _inherits(K2, _A5);

  function K2() {
    _classCallCheck(this, K2);

    return _possibleConstructorReturn(this, (K2.__proto__ || Object.getPrototypeOf(K2)).apply(this, arguments));
  }

  return K2;
}(A);

// 子类继承Object类
// 这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例


var K1 = function (_Object) {
  _inherits(K1, _Object);

  function K1() {
    _classCallCheck(this, K1);

    return _possibleConstructorReturn(this, (K1.__proto__ || Object.getPrototypeOf(K1)).apply(this, arguments));
  }

  return K1;
}(Object);

K1.__proto__ === Object; // true
K1.prototype.__proto__ === Object.prototype; // true

// 不存在任何继承
// A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype
// A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性

var A7 = function A7() {
  _classCallCheck(this, A7);
};

A7.__proto__ === Function.prototype; // true
A7.prototype.__proto__ === Object.prototype; // true

// 子类继承null
// A也是一个普通函数，所以直接继承Function.prototype
// A调用后返回的对象不继承任何方法，所以它的__proto__指向Function.prototype

var A8 = function (_ref) {
  _inherits(A8, _ref);

  function A8() {
    _classCallCheck(this, A8);

    return _possibleConstructorReturn(this, (A8.__proto__ || Object.getPrototypeOf(A8)).apply(this, arguments));
  }

  return A8;
}(null);

A8.__proto__ === Function.prototype; // true
A8.prototype.__proto__ === undefined; // true

// 实例的 __proto__ 属性
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性
// 也就是说，子类的原型的原型，是父类的原型
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__ === p1.__proto__; // false
p2.__proto__.__proto__ === p1.__proto__; // true
// 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
// ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};
p1.printName(); // "Ha"

/*原生构造函数的继承*/
// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构
// 原生构造函数大致有下面这些
Boolean();
Number();
String();
Array();
Date();
Function();
RegExp();
Error();
Object();

// ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，
// 然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承

// 继承Array的例子:

var MyArray = function (_Array) {
  _inherits(MyArray, _Array);

  function MyArray() {
    var _ref2;

    _classCallCheck(this, MyArray);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref2 = MyArray.__proto__ || Object.getPrototypeOf(MyArray)).call.apply(_ref2, [this].concat(args)));
  }

  return MyArray;
}(Array);

var arr = new MyArray();
arr[0] = 12;
arr.length; // 1

arr.length = 0;
arr[0]; // undefined

// extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构

// 定义一个带版本功能的数组:

var VersionedArray = function (_Array2) {
  _inherits(VersionedArray, _Array2);

  function VersionedArray() {
    _classCallCheck(this, VersionedArray);

    var _this11 = _possibleConstructorReturn(this, (VersionedArray.__proto__ || Object.getPrototypeOf(VersionedArray)).call(this));

    _this11.history = [[]];
    return _this11;
  }

  _createClass(VersionedArray, [{
    key: 'commit',
    value: function commit() {
      this.history.push(this.slice());
    }
  }, {
    key: 'revert',
    value: function revert() {
      this.splice.apply(this, [0, this.length].concat(_toConsumableArray(this.history[this.history.length - 1])));
    }
  }]);

  return VersionedArray;
}(Array);

var x = new VersionedArray();

x.push(1);
x.push(2);
x; // [1, 2]
x.history; // [[]]

x.commit();
x.history; // [[], [1, 2]]

x.push(3);
x; // [1, 2, 3]
x.history; // [[], [1, 2]]

x.revert();
x; // [1, 2]

// 自定义Error子类的例子，可以用来定制报错时的行为:

var ExtendableError = function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    _classCallCheck(this, ExtendableError);

    var _this12 = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this));

    _this12.message = message;
    _this12.stack = new Error().stack;
    _this12.name = _this12.constructor.name;
    return _this12;
  }

  return ExtendableError;
}(Error);

var MyError = function (_ExtendableError) {
  _inherits(MyError, _ExtendableError);

  function MyError(m) {
    _classCallCheck(this, MyError);

    return _possibleConstructorReturn(this, (MyError.__proto__ || Object.getPrototypeOf(MyError)).call(this, m));
  }

  return MyError;
}(ExtendableError);

var myerror = new MyError('ll');
myerror.message; // "ll"
myerror instanceof Error; // true
myerror.name; // "MyError"
myerror.stack;
// Error
//     at MyError.ExtendableError
//     ...

// 继承Object的子类，有一个行为差异
// NewObj继承了Object，但是无法通过super方法向父类Object传参
// 这是因为 ES6 改变了Object构造函数的行为，
// 一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数

var NewObj = function (_Object2) {
  _inherits(NewObj, _Object2);

  function NewObj() {
    _classCallCheck(this, NewObj);

    return _possibleConstructorReturn(this, (NewObj.__proto__ || Object.getPrototypeOf(NewObj)).apply(this, arguments));
  }

  return NewObj;
}(Object);

var o = new NewObj({ attr: true });
o.attr === true; // false

/*Mixin 模式的实现*/
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口
var a1 = {
  a: 'a'
};
var b1 = {
  b: 'b'
};
// const c1={...a1,...b1};   // {a: 'a', b: 'b'}

// 将多个对象合成为一个类。使用的时候，只要继承这个类即可
function mix() {
  var Mix = function Mix() {
    _classCallCheck(this, Mix);
  };

  for (var _len2 = arguments.length, mixins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    mixins[_key2] = arguments[_key2];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var mixin = _step.value;

      copyProperties(Mix, mixin); // 拷贝实例属性
      copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;

  return Mix;
}

function copyProperties(target, source) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Reflect.ownKeys(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      if (key !== "constructor" && key !== "prototype" && key !== "name") {
        var desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
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
}

var DistributedEdit = function (_mix) {
  _inherits(DistributedEdit, _mix);

  function DistributedEdit() {
    _classCallCheck(this, DistributedEdit);

    return _possibleConstructorReturn(this, (DistributedEdit.__proto__ || Object.getPrototypeOf(DistributedEdit)).apply(this, arguments));
  }

  return DistributedEdit;
}(mix(Loggable, Serializable));
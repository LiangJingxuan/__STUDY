"use strict";

/**
 * Symbol
 * 
 */

/* 1.概述 */

/*
 ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
 它是 JavaScript 语言的第七种数据类型，
 前六种是：undefined、null、布尔值（Boolean）、字符串（String）、
 数值（Number）、对象（Object）
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var s1 = Symbol(); // 定义
var s2 = Symbol('foo'); //添加参数做标识符
var s3 = Symbol('foo');
s2 === s3; // false  互不相等
//  不能与其他值进行运算
String(s3); // Symbol('foo') 可以转为字符串也可以转为布尔 不可以转数字  

/* 2.作为属性名的 Symbol */
var mySymbol = Symbol();
var a = _defineProperty({}, mySymbol, 'hello');
console.log(a[mySymbol]);

// 例 常量使用 Symbol 其他任何值都不可能有相同的值
var COLOR_RED = Symbol();
var COLOR_GREEN = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
  }
}

/* 3.实例：消除魔术字符串 */
// 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
// 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
var shapeType = {
  triangle: Symbol()
};
function getArea(shape, options) {
  var area = 0;
  switch (shape) {
    case [shapeType.triangle]:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
getArea([shapeType.triangle], { width: 100, height: 100 });

/* 4.属性名的遍历 */
// Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
var s4 = {};
var aa = Symbol('a'),
    bb = Symbol('b');
s4[aa] = 'hello';
s4[bb] = 'lee';
var objectSymbols = Object.getOwnPropertySymbols(s4);
console.log(objectSymbols);

// Reflect.ownKeys方法返回所有类型的键名
var obj = (_obj = {}, _defineProperty(_obj, Symbol('my_key'), 1), _defineProperty(_obj, 'enum', 2), _defineProperty(_obj, 'nonEnum', 3), _obj);
var res1 = Reflect.ownKeys(obj);
console.log(res1);

/* 5.Symbol.for()，Symbol.keyFor() */

// Symbol.for()使用同一个 Symbol 值
var s5 = Symbol.for('foo'),
    s6 = Symbol.for('foo');
s5 === s6; // true

// Symbol.keyFor()返回一个已登记的 Symbol 类型值的key
var s7 = Symbol.for("foo");
Symbol.keyFor(s7); // "foo"

var s8 = Symbol("foo");
Symbol.keyFor(s8); // undefined

/* 6.实例：模块的 Singleton 模式 */
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例

/* 7.内置的 Symbol 值 */

// Symbol.hasInstance 方法
// 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法

var MyClass = function () {
  function MyClass() {
    _classCallCheck(this, MyClass);
  }

  _createClass(MyClass, [{
    key: Symbol.hasInstance,
    value: function value(foo) {
      return foo instanceof Array;
    }
  }]);

  return MyClass;
}();

[1, 2, 3] instanceof new MyClass(); // true

var Even = function () {
  function Even() {
    _classCallCheck(this, Even);
  }

  _createClass(Even, null, [{
    key: Symbol.hasInstance,
    value: function value(obj) {
      return Number(obj) % 2 === 0;
    }
  }]);

  return Even;
}();

;
1 instanceof Even; // false
2 instanceof Even; // true
12345 instanceof Even; // false

// Symbol.isConcatSpreadable 属性
// 等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
var arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e'); // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable]; // undefined

var arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e'); // ['a', 'b', ['c','d'], 'e']

// Symbol.species 属性
// 指向一个构造函数。创建衍生对象时，会使用该属性

var MyArray = function (_Array) {
  _inherits(MyArray, _Array);

  function MyArray() {
    _classCallCheck(this, MyArray);

    return _possibleConstructorReturn(this, (MyArray.__proto__ || Object.getPrototypeOf(MyArray)).apply(this, arguments));
  }

  _createClass(MyArray, null, [{
    key: Symbol.species,
    get: function get() {
      return Array;
    }
  }]);

  return MyArray;
}(Array);

var aaa = new MyArray();
var bbb = aaa.map(function (x) {
  return x;
});
bbb instanceof MyArray; // false
bbb instanceof Array; // true

// Symbol.match 属性
// 指向一个函数。当执行str.match(myObject)时，
// 如果该属性存在，会调用它，返回该方法的返回值
/*
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
};
'e'.match(new MyMatcher()) // 1
*/

// Symbol.replace 属性
// 指向一个方法，当该对象被String.prototype.replace方法调用时，
// 会返回该方法的返回值
var x = {};
x[Symbol.replace] = function () {
  for (var _len = arguments.length, s = Array(_len), _key = 0; _key < _len; _key++) {
    s[_key] = arguments[_key];
  }

  return console.log(s);
};
'Hello'.replace(x, 'World'); // ["Hello", "World"]

// Symbol.search 属性
// 指向一个方法，当该对象被String.prototype.search方法调用时，
// 会返回该方法的返回值
/*
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
*/

// Symbol.split 属性
// 指向一个方法，当该对象被String.prototype.split方法调用时，
// 会返回该方法的返回值

var MySplitter = function () {
  function MySplitter(value) {
    _classCallCheck(this, MySplitter);

    this.value = value;
  }

  _createClass(MySplitter, [{
    key: Symbol.split,
    value: function value(string) {
      var index = string.indexOf(this.value);
      if (index === -1) {
        return string;
      }
      return [string.substr(0, index), string.substr(index + this.value.length)];
    }
  }]);

  return MySplitter;
}();

'foobar'.split(new MySplitter('foo')); // ['', 'bar']

'foobar'.split(new MySplitter('bar')); // ['foo', '']

'foobar'.split(new MySplitter('baz')); // 'foobar'

// Symbol.iterator 属性
// 指向该对象的默认遍历器方法。

var Collection = function () {
  function Collection() {
    _classCallCheck(this, Collection);
  }

  _createClass(Collection, [{
    key: Symbol.iterator,
    value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
      var i;
      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;

            case 1:
              if (!(this[i] !== undefined)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return this[i];

            case 4:
              ++i;
              _context.next = 1;
              break;

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Collection;
}();

var myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = myCollection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _value = _step.value;

    console.log(_value);
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

// Symbol.toPrimitive 属性
// 指向一个方法。该对象被转为原始类型的值时，
// 会调用这个方法，返回该对象对应的原始类型值。
var obj2 = _defineProperty({}, Symbol.toPrimitive, function (hint) {
  switch (hint) {
    case 'number':
      return 123;
    case 'string':
      return 'str';
    case 'default':
      return 'default';
    default:
      throw new Error();
  }
});

2 * obj2; // 246
3 + obj2; // '3default'
obj2 == 'default'; // true
String(obj2) // 'str'

// Symbol.toStringTag 属性
/*
对象的Symbol.toStringTag属性，指向一个方法。
在该对象上面调用Object.prototype.toString方法时，
如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，
表示对象的类型。也就是说，这个属性可以用来定制[object Object]
或[object Array]中object后面的那个字符串。
*/
// 例一
(_defineProperty({}, Symbol.toStringTag, 'Foo').toString());
// "[object Foo]"

// 例二

var Collection2 = function () {
  function Collection2() {
    _classCallCheck(this, Collection2);
  }

  _createClass(Collection2, [{
    key: Symbol.toStringTag,
    get: function get() {
      return 'xxx';
    }
  }]);

  return Collection2;
}();

var x2 = new Collection2();
Object.prototype.toString.call(x); // "[object xxx]"

// Symbol.unscopables 属性
// 指向一个对象。该对象指定了使用with关键字时，
// 哪些属性会被with环境排除。
Array.prototype[Symbol.unscopables];
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables]);
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
// 上面代码说明，数组有 7 个属性，会被with命令排除。
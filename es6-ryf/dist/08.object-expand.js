"use strict";

/**
 * 对象的扩展
 * 
 */

/* 1.属性的简洁表示法 */
// 对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值

// 属性简写

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _obj;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foo = 'bar',
    baz = { foo: foo };
var f = function f(x, y) {
  return { x: x, y: y };
};

// 方法简写
var oop = {
  method: function method() {
    return 'hello';
  }
};

// 例子：
var birth = '2000/01/01';
var Person = {
  name: '张三',
  birth: birth,
  hello: function hello() {
    console.log('我的名字：', this.name);
  }
};
function getPoint() {
  var x = 1,
      y = 10;
  return { x: x, y: y };
}

/* 2.属性名表达式 */
var obj = {};obj['a' + 'bc'] = 123;

/* 3.方法的 name 属性 */
// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

/* 4.Object.is() */
// 比较相等
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
Object.is({}, {}); // false
Object.is('foo', 'foo'); // true

/* 5.Object.assign() */
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}

// 常见用途
// 1）为对象添加属性

var Point = function () {
  function Point() {
    _classCallCheck(this, Point);
  }

  _createClass(Point, [{
    key: 'construtor',
    value: function construtor(x, y) {
      Onject.assign(this, { x: x, y: y });
    }
  }]);

  return Point;
}();
// 2）为对象添加方法


Object.assign(Point.prototype, {
  someMethod: function someMethod(arg1, arg2) {},
  anotherMethod: function anotherMethod() {}
});
// 3）克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}

function clone(origin) {
  var originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
// 4）合并多个对象
var merge = function merge(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return Object.assign.apply(Object, [target].concat(sources));
};

var merge2 = function merge2() {
  for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    sources[_key2] = arguments[_key2];
  }

  return Object.assign.apply(Object, [{}].concat(sources));
};
// 5）为属性指定默认值
var DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}

/* 6.属性的可枚举性和遍历 */
// 可枚举性
// 属性的遍历

/* 7.Object.getOwnPropertyDescriptors() */
// 返回指定对象所有自身属性（非继承属性）的描述对象
var obj2 = {
  foo: 123,
  get bar() {
    return 'abc';
  }
};

Object.getOwnPropertyDescriptors(obj);
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }

/* 8.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf() */
// JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

// __proto__属性
// 用来读取或设置当前对象的prototype对象

// Object.setPrototypeOf()
// 用来设置一个对象的prototype对象，返回参数对象本身
var o = Object.setPrototypeOf({}, null);
// 例子：
var proto = {},
    obj3 = { x: 10 };
Object.setPrototypeOf(obj3, proto);
proto.z = 20;
proto.y = 20;

// Object.getPrototypeOf()
// 用于读取一个对象的原型对象
Object.getPrototypeOf(obj3);

/* 9.super 关键字 */
// 指向当前对象的原型对象
var proto2 = {
  foo: 'hello'
};
var obj4 = _obj = {
  foo: 'world',
  find: function find() {
    return _get(_obj.__proto__ || Object.getPrototypeOf(_obj), 'foo', this);
  }
};
Object.setPrototypeOf(obj4, proto2);
obj4.find(); // hello

// super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

/* 10.Object.keys()，Object.values()，Object.entries() */

// Object.keys()
var obj5 = { foo: 'bar', baz: 42 };
Object.keys(obj5); // ["foo", "baz"]


var keys = Object.keys,
    values = Object.values,
    entries = Object.entries;

var obj6 = { a: 1, b: 2, c: 3 };

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = keys(obj6)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var key = _step.value;

    console.log(key); // 'a', 'b', 'c'
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

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = values(obj6)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var value = _step2.value;

    console.log(value); // 1, 2, 3
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

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = entries(obj6)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _step3$value = _slicedToArray(_step3.value, 2),
        _key3 = _step3$value[0],
        _value = _step3$value[1];

    console.log([_key3, _value]); // ['a', 1], ['b', 2], ['c', 3]
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var lee = 1;

// Object.values()
// 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
var obj7 = { foo: 'bar', baz: 42 };
Object.values(obj7); // ['bar',42]

// Object.entries()
// 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
var obj8 = { foo: 'bar', baz: 42 };
Object.entries(obj8); // [ ["foo", "bar"], ["baz", 42] ]

// 遍历对象的属性
var obj9 = { one: 1, two: 2 };
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = Object.entries(obj9)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _step4$value = _slicedToArray(_step4.value, 2),
        k = _step4$value[0],
        v = _step4$value[1];

    console.log(JSON.stringify(k) + ': ' + JSON.stringify(v));
  }
  // "one": 1
  // "two": 2
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4.return) {
      _iterator4.return();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

var obj10 = { foo: 'bar', baz: 42 };
// 将对象转为真正的Map结构
var map = new Map(Object.entries(obj10));
map; // Map { foo: "bar", baz: 42 }

/* 11.对象的扩展运算符 */
// 解构赋值
// let {xx,yy,...zz}={xx:1,yy:23,aa:12,cc:23};

// 扩展某个函数的参数，引入其他操作
/*
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}
*/

// 扩展运算符
/*let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }*/
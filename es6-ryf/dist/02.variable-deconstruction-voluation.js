"use strict";

/**
 * 变量的解构赋值
 * 从数组对象中取值 然后赋给变量称为解构赋值
 *
 */

/* 1.数组的解构赋值 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var a = 1,
    b = 2,
    c = 3;
var foo = 1,
    bar = 2,
    baz = 3;
var _ref = ['foo', 'bar', 'baz'],
    third = _ref[2];
var _ref2 = [1, 2, 3],
    x = _ref2[0],
    y = _ref2[2];
var head = 1,
    tail = [2, 3, 4];

// 如果解构不成功，变量的值就等于undefined

var _ref3 = ['a'],
    x1 = _ref3[0],
    y1 = _ref3[1],
    z1 = _ref3.slice(2);

var _ref4 = [],
    foo1 = _ref4[0];
var _ref5 = [1],
    bar1 = _ref5[0],
    foo2 = _ref5[1];

// 不完全解构

var _ref6 = [1, 2, 3],
    x2 = _ref6[0],
    y2 = _ref6[1];
var a2 = 1,
    _ref7 = [2, 3],
    b2 = _ref7[0],
    d2 = 4;

// 等号右边不是数组（或者严格地说，不是可遍历的结构）
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// 对于 Set 结构，也可以使用数组的解构赋值

var _ref8 = new Set(['a', 'b', 'c']),
    _ref9 = _slicedToArray(_ref8, 3),
    x4 = _ref9[0],
    y4 = _ref9[1],
    z4 = _ref9[2];

// 默认值
// 解构赋值允许指定默认值


var _ref10 = [],
    _ref10$ = _ref10[0],
    foo4 = _ref10$ === undefined ? true : _ref10$;
var _ref11 = ['a'],
    x5 = _ref11[0],
    _ref11$ = _ref11[1],
    y5 = _ref11$ === undefined ? 'b' : _ref11$;
var x6 = 'a',
    _undefined = undefined,
    y6 = _undefined === undefined ? 'b' : _undefined;
var _undefined2 = undefined,
    x7 = _undefined2 === undefined ? 1 : _undefined2;
var _ref12 = null,
    x8 = _ref12 === undefined ? 1 : _ref12;


function f() {
  console.log('aaa');
}
var _ = 1,
    x9 = _ === undefined ? f() : _;

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
// let [x = y, y = 1] = [];     // ReferenceError: y is not defined


/* 2.对象的解构赋值 */
// 变量名与属性名必须一致否则取值为undefined

var _q1$q = { q1: 'a', q2: 'b' },
    q1 = _q1$q.q1,
    q2 = _q1$q.q2;
var _foo0$bar = { foo0: 'aaa', bar0: 'bbb' },
    bar0 = _foo0$bar.bar0,
    foo0 = _foo0$bar.foo0,
    baz0 = _foo0$bar.baz0;
var _fooa = { fooa: 'aaa' },
    baza = _fooa.fooa; // 如果变量名与属性名不一致，必须写成下面这样。

var _foo9$bar = { foo9: 'a', bar9: 'b' },
    foo9 = _foo9$bar.foo9,
    bar9 = _foo9$bar.bar9;

// 例：(等号左边：对象名是匹配模式,对象值是变量名)

var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
var loc = node.loc,
    start = node.loc.start,
    line = node.loc.start.line;

// 嵌套复制的例子：

var obj = {},
    arr = [];


// 对象的解构默认值
var _foo$bar = { foo: 123, bar: true };
obj.prop = _foo$bar.foo;
arr[0] = _foo$bar.bar;
var _ref13 = {},
    _ref13$n = _ref13.n,
    n = _ref13$n === undefined ? 3 : _ref13$n;
var _num = { num1: 1 },
    num1 = _num.num1,
    _num$y = _num.y7,
    y7 = _num$y === undefined ? 5 : _num$y;
var _ref14 = {},
    _ref14$message = _ref14.message,
    msg = _ref14$message === undefined ? 'something wet wrong' : _ref14$message;

// 默认值生效的条件是，对象的属性值严格等于undefined

var _time = { time1: undefined },
    _time$time = _time.time1,
    time1 = _time$time === undefined ? 3 : _time$time;
var _time2 = { time2: null },
    _time2$time = _time2.time2,
    time2 = _time2$time === undefined ? 3 : _time2$time;
var log = Math.log,
    sin = Math.sin,
    cos = Math.cos;

/* 3.字符串的解构赋值 */

var _hello = 'hello',
    _hello2 = _slicedToArray(_hello, 2),
    u = _hello2[0],
    k = _hello2[1];

var _hello3 = 'hello',
    len = _hello3.length;

/* 4.数值和布尔值的解构赋值 */

var _2 = 123,
    s = _2.toString;
var _true = true,
    t = _true.toString;

/* 5.函数参数的解构赋值 */

function add(_ref15) {
  var _ref16 = _slicedToArray(_ref15, 2),
      x = _ref16[0],
      y = _ref16[1];

  return x + y;
}
add([1, 2]);

[[1, 2], [3, 4]].map(function (_ref17) {
  var _ref18 = _slicedToArray(_ref17, 2),
      a = _ref18[0],
      b = _ref18[1];

  return a + b;
});
// 默认值
function move() {
  var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref19$x = _ref19.x,
      x = _ref19$x === undefined ? 0 : _ref19$x,
      _ref19$y = _ref19.y,
      y = _ref19$y === undefined ? 0 : _ref19$y;

  return [x, y];
}
move({ x: 3, y: 8 });

[1, undefined, 3].map(function () {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yes';
  return x;
});

/* 6.圆括号问题 */

// 不能使用圆括号的情况

// 1.变量声明语句
/*
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };
*/

// 2.函数参数
/*
function f([(z)]) { return z; }
function f([z,(x)]) { return x; }
 */

// 3.赋值语句的模式
/*
({ p: a }) = { p: 42 };
([a]) = [5];
[({ p: a }), { x: c }] = [{}, {}];
 */

// 可以使用圆括号的情况
// 正确
b = 3;
// 正确
var _ref20 = {};
d = _ref20.p;
// 正确

/* 7.用途：变量解构赋值的用途 */

// 1:交换变量的值
var _ref21 = [3];
parseInt.prop = _ref21[0];
var va1 = 1,
    va2 = 2;


// 2:从函数返回多个值
// 返回数组
var _ref22 = [va2, va1];
va1 = _ref22[0];
va2 = _ref22[1];
function example() {
  return [1, 2, 3];
}

var _example = example(),
    _example2 = _slicedToArray(_example, 3),
    we1 = _example2[0],
    we2 = _example2[1],
    we3 = _example2[2];

// 返回对象


function example2() {
  return {
    ex1: 1,
    ex2: 2
  };
}

var _example3 = example2(),
    ex1 = _example3.ex1,
    ex2 = _example3.ex2;

// 3:函数参数的定义


function f1(_ref23) {
  var _ref24 = _slicedToArray(_ref23, 3),
      x = _ref24[0],
      y = _ref24[1],
      z = _ref24[2];
}
f1([1, 2, 3]);
function f2(_ref25) {
  var x = _ref25.x,
      y = _ref25.y,
      z = _ref25.z;
}
f2({ x: 3, y: 1, z: 0 });

// 4:提取json数据
var jsonData = {
  id: 42,
  status: 'OK',
  item: [871, 5468]
};
var id = jsonData.id,
    status = jsonData.status,
    number = jsonData.item;

// 5:函数参数的默认值

jQuery.ajax = function (url, _ref26) {
  // ... do stuff

  var _ref26$async = _ref26.async,
      async = _ref26$async === undefined ? true : _ref26$async,
      _ref26$beforeSend = _ref26.beforeSend,
      beforeSend = _ref26$beforeSend === undefined ? function () {} : _ref26$beforeSend,
      _ref26$cache = _ref26.cache,
      cache = _ref26$cache === undefined ? true : _ref26$cache,
      _ref26$complete = _ref26.complete,
      complete = _ref26$complete === undefined ? function () {} : _ref26$complete,
      _ref26$crossDomain = _ref26.crossDomain,
      crossDomain = _ref26$crossDomain === undefined ? false : _ref26$crossDomain,
      _ref26$global = _ref26.global,
      global = _ref26$global === undefined ? true : _ref26$global;
};
// 6:遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        value = _step$value[1];

    console.log(key + " is " + value);
  }
  // 获取键名
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
  for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 1),
        key = _step2$value[0];
  }
  // ...


  // 获取键值
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
  for (var _iterator3 = map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    // ...

    var _step3$value = _slicedToArray(_step3.value, 2),
        value = _step3$value[1];
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

var oop = 1;

// 7：输入模块的指定方法

var _require = require("source-map"),
    SourceMapConsumer = _require.SourceMapConsumer,
    SourceNode = _require.SourceNode;
"use strict";

/**
 * Iterator 和 for...of 循环
 * 
 */

/* 1.Iterator（遍历器）的概念 */
// 为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，
// 就可以完成遍历操作（即依次处理该数据结构的所有成员）
// Iterator 的作用:
// 1:为各种数据结构，提供一个统一的、简便的访问接口
// 2:使得数据结构的成员能够按某种次序排列
// 3:ES6 创造了一种新的遍历命令for...of循环

// Iterator 的遍历过程:
// 1）创建一个指针对象，指向当前数据结构的起始位置
// 2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
// 3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
// 4）不断调用指针对象的next方法，直到它指向数据结构的结束位置

// 模拟next方法返回值的例子:

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var it = makeIterator(['a', 'b']);
it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function next() {
      return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { value: undefined, done: true };
    }
  };
};

/* 2.默认 Iterator 接口 */
// Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环
// 使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口
var obj = _defineProperty({}, Symbol.iterator, function () {
  return {
    next: function next() {
      return {
        value: 1,
        done: true
      };
    }
  };
});
// 上面代码中，对象obj是可遍历的（iterable），因为具有Symbol.iterator属性

// 原声具备Iterator接口的数据结构：
/*
	Array
	Map
	Set
	String
	TypedArray
	函数的 arguments 对象
	NodeList 对象
*/
var arr = ['a', 'b', 'c'],
    iter = arr[Symbol.iterator]();
console.log(iter.next());

// 为对象添加 Iterator 接口的例子:
var obj2 = _defineProperty({
  data: ['hello', 'world']
}, Symbol.iterator, function () {
  var self = this;
  var index = 0;
  return {
    next: function next() {
      if (index < self.data.length) {
        return {
          value: self.data[index++],
          done: false
        };
      } else {
        return { value: undefined, done: true };
      }
    }
  };
});

// 类似数组的对象调用数组的Symbol.iterator方法的例子:
var iterable = _defineProperty({
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}, Symbol.iterator, Array.prototype[Symbol.iterator]);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var item = _step.value;

    console.log(item); // 'a', 'b', 'c'
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

/* 3.调用 Iterator 接口的场合 */
// 1）解构赋值
// 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
var set = new Set().add('a').add('b').add('c');

var _set = _slicedToArray(set, 2),
    x = _set[0],
    y = _set[1]; // x='a'; y='b'


var _set2 = _toArray(set),
    first = _set2[0],
    rest = _set2.slice(1); // first='a'; rest=['b','c'];

// 2）扩展运算符
// 扩展运算符（...）也会调用默认的 Iterator 接口
// 例一


var str = 'hello';
[].concat(_toConsumableArray(str)); //  ['h','e','l','l','o']
// 例二
var arr2 = ['b', 'c'];
['a'].concat(arr2, ['d']); // ['a', 'b', 'c', 'd']

// 3）yield*
// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
var generator = /*#__PURE__*/regeneratorRuntime.mark(function generator() {
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          return _context.delegateYield([2, 3, 4], 't0', 3);

        case 3:
          _context.next = 5;
          return 5;

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, generator, this);
});
var iterator = generator();
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: false }
iterator.next(); // { value: 5, done: false }
iterator.next(); // { value: undefined, done: true }

// 4）其他场合
/*
	for...of
	Array.from()
	Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
	Promise.all()
	Promise.race()
*/

/* 4.字符串的 Iterator 接口 */
// 字符串是一个类似数组的对象，也原生具有 Iterator 接口
var someString = "hi";
_typeof(someString[Symbol.iterator]);
// "function"
var iterator = someString[Symbol.iterator]();
iterator.next(); // { value: "h", done: false }
iterator.next(); // { value: "i", done: false }
iterator.next(); // { value: undefined, done: true }

/* 5.Iterator 接口与 Generator 函数 */
var obj3 = _defineProperty({}, Symbol.iterator, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return 'hello';

        case 2:
          _context2.next = 4;
          return 'world';

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee, this);
}));
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = obj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _x = _step2.value;

    console.log(_x);
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

/* 6.遍历器对象的 return()，throw() */
// return():
// 如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法
// return方法必须返回一个对象
// throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法

// 部署了return方法:
function readLinesSync(file) {
  return _defineProperty({}, Symbol.iterator, function () {
    return {
      next: function next() {
        return { done: false };
      },
      return: function _return() {
        file.close();
        return { done: true };
      }
    };
  });
}
// 三种情况，都会触发执行return方法:
// 情况一
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = readLinesSync(fileName)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var line = _step3.value;

    console.log(line);
    break;
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

;
// 情况二
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = readLinesSync(fileName)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _line = _step4.value;

    console.log(_line);
    continue;
  }
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

;
// 情况三
var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
  for (var _iterator5 = readLinesSync(fileName)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
    var _line2 = _step5.value;

    console.log(_line2);
    throw new Error();
  }
} catch (err) {
  _didIteratorError5 = true;
  _iteratorError5 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion5 && _iterator5.return) {
      _iterator5.return();
    }
  } finally {
    if (_didIteratorError5) {
      throw _iteratorError5;
    }
  }
}

;

/* 7.for...of 循环 */
// 遍历所有数据结构的统一的方法
// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，
// 就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法

// for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象
// （比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串

// 数组:
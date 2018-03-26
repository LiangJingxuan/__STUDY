"use strict";

/**
 * Generator 函数的语法
 * 
 */

/* 1.简介 */
// 异步编程解决方案,返回指向内部状态的指针对象(遍历器对象)

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(helloWorldGenerator),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(gen),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(f),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(demo),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(demo),
    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(gens),
    _marked7 = /*#__PURE__*/regeneratorRuntime.mark(foo),
    _marked8 = /*#__PURE__*/regeneratorRuntime.mark(footo),
    _marked9 = /*#__PURE__*/regeneratorRuntime.mark(numbers),
    _marked10 = /*#__PURE__*/regeneratorRuntime.mark(gen),
    _marked11 = /*#__PURE__*/regeneratorRuntime.mark(numbers),
    _marked12 = /*#__PURE__*/regeneratorRuntime.mark(foo),
    _marked13 = /*#__PURE__*/regeneratorRuntime.mark(bar),
    _marked14 = /*#__PURE__*/regeneratorRuntime.mark(foo),
    _marked15 = /*#__PURE__*/regeneratorRuntime.mark(bar),
    _marked16 = /*#__PURE__*/regeneratorRuntime.mark(genFuncWithReturn),
    _marked17 = /*#__PURE__*/regeneratorRuntime.mark(logReturned),
    _marked18 = /*#__PURE__*/regeneratorRuntime.mark(iterTree),
    _marked19 = /*#__PURE__*/regeneratorRuntime.mark(inorder),
    _marked20 = /*#__PURE__*/regeneratorRuntime.mark(g),
    _marked21 = /*#__PURE__*/regeneratorRuntime.mark(gen),
    _marked22 = /*#__PURE__*/regeneratorRuntime.mark(loadUI),
    _marked23 = /*#__PURE__*/regeneratorRuntime.mark(main),
    _marked24 = /*#__PURE__*/regeneratorRuntime.mark(iterateSteps);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(function helloWorldGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello';

        case 2:
          _context.next = 4;
          return 'world';

        case 4:
          return _context.abrupt('return', 'ending');

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
};
var hw = helloWorldGenerator();
hw.next(); // { value: 'hello', done: false }
hw.next(); // { value: 'world', done: false }
hw.next(); // { value: 'ending', done: true }
hw.next(); // { value: undefined, done: true }

// yield 表达式
function gen() {
  return regeneratorRuntime.wrap(function gen$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return 123 + 456;

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
};

// 不用yield表达式，这时就变成了一个单纯的暂缓执行函数
function f() {
  return regeneratorRuntime.wrap(function f$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('ok');

        case 1:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
};
var generator = f();
setTimeout(function () {
  generator.next();
}, 200);

// yield表达式只能用在 Generator 函数里面，用在其他地方都会报错
/*(function (){
  yield 1;
})()// SyntaxError: Unexpected number*/

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
function demo() {
  return regeneratorRuntime.wrap(function demo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = console;
          _context4.next = 3;
          return;

        case 3:
          _context4.t1 = _context4.sent;
          _context4.t2 = 'Hello' + _context4.t1;

          _context4.t0.log.call(_context4.t0, _context4.t2);

          _context4.t3 = console;
          _context4.next = 9;
          return 123;

        case 9:
          _context4.t4 = _context4.sent;
          _context4.t5 = 'Hello' + _context4.t4;

          _context4.t3.log.call(_context4.t3, _context4.t5);

        case 12:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
} // OK
;

// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
function demo() {
  var input;
  return regeneratorRuntime.wrap(function demo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.t0 = foo;
          _context5.next = 3;
          return 'a';

        case 3:
          _context5.t1 = _context5.sent;
          _context5.next = 6;
          return 'b';

        case 6:
          _context5.t2 = _context5.sent;
          (0, _context5.t0)(_context5.t1, _context5.t2);
          _context5.next = 10;
          return;

        case 10:
          input = _context5.sent;

        case 11:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
} // OK
;

// 与 Iterator 接口的关系
// Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，
// 可以被...扩展运算符遍历了
var myIterable = {};
myIterable[Symbol.iterator] = /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return 1;

        case 2:
          _context6.next = 4;
          return 2;

        case 4:
          _context6.next = 6;
          return 3;

        case 6:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee, this);
});
[].concat(_toConsumableArray(myIterable)); // [1, 2, 3]

// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
function gens() {
  return regeneratorRuntime.wrap(function gens$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked6, this);
};
var g = gens();
g[Symbol.iterator]() === g; // true

/* 2.next 方法的参数 */
function foo(x) {
  var y, z;
  return regeneratorRuntime.wrap(function foo$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return x + 1;

        case 2:
          _context8.t0 = _context8.sent;
          y = 2 * _context8.t0;
          _context8.next = 6;
          return y / 3;

        case 6:
          z = _context8.sent;
          return _context8.abrupt('return', x + y + z);

        case 8:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked7, this);
};
var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:true}

var b = foo(5);
b.next(); // { value:6, done:false }
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层
function wrapper(generatorFunction) {
  return function () {
    var generatorObject = generatorFunction.apply(undefined, arguments);
    generatorObject.next();
    return generatorObject;
  };
};
var wrapped = wrapper( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.t0 = console;
          _context9.next = 3;
          return;

        case 3:
          _context9.t1 = _context9.sent;
          _context9.t2 = 'First input: ' + _context9.t1;

          _context9.t0.log.call(_context9.t0, _context9.t2);

          return _context9.abrupt('return', 'DONE');

        case 7:
        case 'end':
          return _context9.stop();
      }
    }
  }, _callee2, this);
}));
wrapped().next('hello!'); // First input: hello!

/* 3.for...of 循环 */
// for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法
function footo() {
  return regeneratorRuntime.wrap(function footo$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return 1;

        case 2:
          _context10.next = 4;
          return 2;

        case 4:
          _context10.next = 6;
          return 3;

        case 6:
          _context10.next = 8;
          return 4;

        case 8:
          _context10.next = 10;
          return 5;

        case 10:
          return _context10.abrupt('return', 6);

        case 11:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked8, this);
};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = footo()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _i2 = _step.value;

    console.log(_i2); // 1 2 3 4 5
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

// 扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口
function numbers() {
  return regeneratorRuntime.wrap(function numbers$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return 1;

        case 2:
          _context11.next = 4;
          return 2;

        case 4:
          return _context11.abrupt('return', 3);

        case 7:
        case 'end':
          return _context11.stop();
      }
    }
  }, _marked9, this);
};
// 扩展运算符
[].concat(_toConsumableArray(numbers())); // [1, 2]
// Array.from 方法
Array.from(numbers()); // [1, 2]
// 解构赋值

var _numbers = numbers(),
    _numbers2 = _slicedToArray(_numbers, 2),
    x = _numbers2[0],
    y = _numbers2[1];

x; // 1
y; // 2
// for...of 循环
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = numbers()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var n = _step2.value;

    console.log(n);
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
// 1
// 2

/* 4.Generator.prototype.throw() */
var g = /*#__PURE__*/regeneratorRuntime.mark(function g() {
  return regeneratorRuntime.wrap(function g$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return;

        case 3:
          _context12.next = 8;
          break;

        case 5:
          _context12.prev = 5;
          _context12.t0 = _context12['catch'](0);

          console.log('内部捕获' + _context12.t0);

        case 8:
        case 'end':
          return _context12.stop();
      }
    }
  }, g, this, [[0, 5]]);
});
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a // 外部捕获 b

// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例
var g = /*#__PURE__*/regeneratorRuntime.mark(function g() {
  return regeneratorRuntime.wrap(function g$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!true) {
            _context13.next = 13;
            break;
          }

          _context13.prev = 1;
          _context13.next = 4;
          return;

        case 4:
          _context13.next = 11;
          break;

        case 6:
          _context13.prev = 6;
          _context13.t0 = _context13['catch'](1);

          if (!(_context13.t0 != 'a')) {
            _context13.next = 10;
            break;
          }

          throw _context13.t0;

        case 10:
          console.log('内部捕获', _context13.t0);

        case 11:
          _context13.next = 0;
          break;

        case 13:
        case 'end':
          return _context13.stop();
      }
    }
  }, g, this, [[1, 6]]);
});
var i = g();
i.next();
try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
};

// Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获
var g = /*#__PURE__*/regeneratorRuntime.mark(function g() {
  return regeneratorRuntime.wrap(function g$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          if (!true) {
            _context14.next = 6;
            break;
          }

          _context14.next = 3;
          return;

        case 3:
          console.log('内部捕获', e);
          _context14.next = 0;
          break;

        case 6:
        case 'end':
          return _context14.stop();
      }
    }
  }, g, this);
});
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a

// 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行

/* 5.Generator.prototype.return() */
// Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数
function gen() {
  return regeneratorRuntime.wrap(function gen$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return 1;

        case 2:
          _context15.next = 4;
          return 2;

        case 4:
          _context15.next = 6;
          return 3;

        case 6:
        case 'end':
          return _context15.stop();
      }
    }
  }, _marked10, this);
};
var g = gen();
g.next(); // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next(); // { value: undefined, done: true }

// 如果return方法调用时，不提供参数，则返回值的value属性为undefined
g.return(); // { value: undefined, done: true }

// 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行
function numbers() {
  return regeneratorRuntime.wrap(function numbers$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return 1;

        case 2:
          _context16.prev = 2;
          _context16.next = 5;
          return 2;

        case 5:
          _context16.next = 7;
          return 3;

        case 7:
          _context16.prev = 7;
          _context16.next = 10;
          return 4;

        case 10:
          _context16.next = 12;
          return 5;

        case 12:
          return _context16.finish(7);

        case 13:
          _context16.next = 15;
          return 6;

        case 15:
        case 'end':
          return _context16.stop();
      }
    }
  }, _marked11, this, [[2,, 7, 13]]);
}
var g = numbers();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.return(7); // { value: 4, done: false }
g.next(); // { value: 5, done: false }
g.next(); // { value: 7, done: true }

/* 6.next()、throw()、return() 的共同点 */
// 它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式

// next()是将yield表达式替换成一个值
// throw()是将yield表达式替换成一个throw语句
// return()是将yield表达式替换成一个return语句

/* 7.yield* 表达式 */
// 用来在一个 Generator 函数里面执行另一个 Generator 函数
function foo() {
  return regeneratorRuntime.wrap(function foo$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return 'b';

        case 2:
          _context17.next = 4;
          return 'x';

        case 4:
        case 'end':
          return _context17.stop();
      }
    }
  }, _marked12, this);
};
function bar() {
  return regeneratorRuntime.wrap(function bar$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return 'a';

        case 2:
          return _context18.delegateYield(foo(), 't0', 3);

        case 3:
          _context18.next = 5;
          return 'y';

        case 5:
        case 'end':
          return _context18.stop();
      }
    }
  }, _marked13, this);
};
var delegatedIterator = /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return 'hello';

        case 2:
          _context19.next = 4;
          return 'bay';

        case 4:
        case 'end':
          return _context19.stop();
      }
    }
  }, _callee3, this);
})();
var delegatingIterator = /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  return regeneratorRuntime.wrap(function _callee4$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return 'lee';

        case 2:
          return _context20.delegateYield(delegatedIterator, 't0', 3);

        case 3:
          _context20.next = 5;
          return 'ok';

        case 5:
        case 'end':
          return _context20.stop();
      }
    }
  }, _callee4, this);
})();
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = delegatingIterator[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _i3 = _step3.value;

    console.log(_i3); // lee hello bay ok
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

// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据
function foo() {
  return regeneratorRuntime.wrap(function foo$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return 2;

        case 2:
          _context21.next = 4;
          return 3;

        case 4:
          return _context21.abrupt('return', 'foo');

        case 5:
        case 'end':
          return _context21.stop();
      }
    }
  }, _marked14, this);
};
function bar() {
  var v;
  return regeneratorRuntime.wrap(function bar$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return 1;

        case 2:
          return _context22.delegateYield(foo(), 't0', 3);

        case 3:
          v = _context22.t0;

          console.log('v:' + v);
          _context22.next = 7;
          return 4;

        case 7:
        case 'end':
          return _context22.stop();
      }
    }
  }, _marked15, this);
};
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // "v: foo"  // {value: 4, done: false}
it.next(); // {value: undefined, done: true}

function genFuncWithReturn() {
  return regeneratorRuntime.wrap(function genFuncWithReturn$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return 'a';

        case 2:
          _context23.next = 4;
          return 'b';

        case 4:
          return _context23.abrupt('return', 'The result');

        case 5:
        case 'end':
          return _context23.stop();
      }
    }
  }, _marked16, this);
}
function logReturned(genObj) {
  var result;
  return regeneratorRuntime.wrap(function logReturned$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          return _context24.delegateYield(genObj, 't0', 1);

        case 1:
          result = _context24.t0;

          console.log(result);

        case 3:
        case 'end':
          return _context24.stop();
      }
    }
  }, _marked17, this);
}

[].concat(_toConsumableArray(logReturned(genFuncWithReturn())));
// The result
// 值为 [ 'a', 'b' ]

// yield*命令可以很方便地取出嵌套数组的所有成员
function iterTree(tree) {
  var _i;

  return regeneratorRuntime.wrap(function iterTree$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          if (!Array.isArray(tree)) {
            _context25.next = 9;
            break;
          }

          _i = 0;

        case 2:
          if (!(_i < tree.length)) {
            _context25.next = 7;
            break;
          }

          return _context25.delegateYield(iterTree(tree[_i]), 't0', 4);

        case 4:
          _i++;
          _context25.next = 2;
          break;

        case 7:
          _context25.next = 11;
          break;

        case 9:
          _context25.next = 11;
          return tree;

        case 11:
        case 'end':
          return _context25.stop();
      }
    }
  }, _marked18, this);
};
var tree = ['a', ['b', 'c'], ['d', 'e']];
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = iterTree(tree)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _x = _step4.value;

    console.log(_x);
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

// 使用yield*语句遍历完全二叉树
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
};
// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function inorder(t) {
  return regeneratorRuntime.wrap(function inorder$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          if (!t) {
            _context26.next = 5;
            break;
          }

          return _context26.delegateYield(inorder(t.left), 't0', 2);

        case 2:
          _context26.next = 4;
          return t.label;

        case 4:
          return _context26.delegateYield(inorder(t.right), 't1', 5);

        case 5:
        case 'end':
          return _context26.stop();
      }
    }
  }, _marked19, this);
};
// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
};
var tree2 = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// 遍历二叉树
var result = [];
var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
  for (var _iterator5 = inorder(tree2)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
    var node = _step5.value;

    result.push(node);
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
result;
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

/* 8.作为对象属性的 Generator 函数 */
var obj = {
  myGeneratorMethod: /*#__PURE__*/regeneratorRuntime.mark(function myGeneratorMethod() {
    return regeneratorRuntime.wrap(function myGeneratorMethod$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
          case 'end':
            return _context27.stop();
        }
      }
    }, myGeneratorMethod, this);
  })
};
/* 9.Generator 函数的this */
function g() {
  return regeneratorRuntime.wrap(function g$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
        case 'end':
          return _context28.stop();
      }
    }
  }, _marked20, this);
}
g.prototype.hello = function () {
  return 'hi!';
};
var obj2 = g();
obj2 instanceof g; // true
obj2.hello(); // 'hi!'
// Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的
// 构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象

// Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性
// Generator 函数也不能跟new命令一起用，会报错

// 让Generator函数 既可以用next方法，又可以获得正常的this:
// 生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，
// 这个空对象就是 Generator 函数的实例对象了
function gen() {
  return regeneratorRuntime.wrap(function gen$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          this.a = 1;
          _context29.next = 3;
          return this.b = 2;

        case 3:
          _context29.next = 5;
          return this.c = 3;

        case 5:
        case 'end':
          return _context29.stop();
      }
    }
  }, _marked21, this);
}
function F() {
  return gen.call(gen.prototype);
}
var f = new F();
f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}
f.a; // 1
f.b; // 2
f.c; // 3

/* 10.含义 */
// Generator 与状态机
var clock = /*#__PURE__*/regeneratorRuntime.mark(function clock() {
  return regeneratorRuntime.wrap(function clock$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          if (!true) {
            _context30.next = 9;
            break;
          }

          console.log('Tick!');
          _context30.next = 4;
          return;

        case 4:
          console.log('Tock!');
          _context30.next = 7;
          return;

        case 7:
          _context30.next = 0;
          break;

        case 9:
        case 'end':
          return _context30.stop();
      }
    }
  }, clock, this);
});

// Generator 与协程
// 1）协程与子例程的差异
// 2）协程与普通线程的差异

// Generator 与上下文

/* 11.应用 */
// 1）异步操作的同步化表达
function loadUI() {
  return regeneratorRuntime.wrap(function loadUI$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          showLoadingScreen();
          _context31.next = 3;
          return loadUIDataAsynchronously();

        case 3:
          hideLoadingScreen();

        case 4:
        case 'end':
          return _context31.stop();
      }
    }
  }, _marked22, this);
}
var loader = loadUI();
// 加载UI
loader.next();
// 卸载UI
loader.next();

// Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达
function main() {
  var result, resp;
  return regeneratorRuntime.wrap(function main$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return request("http://some.url");

        case 2:
          result = _context32.sent;
          resp = JSON.parse(result);

          console.log(resp.value);

        case 5:
        case 'end':
          return _context32.stop();
      }
    }
  }, _marked23, this);
}
function request(url) {
  makeAjaxCall(url, function (response) {
    it.next(response);
  });
}
var it = main();
it.next();

// 2）控制流管理
// 封装了一个任务的多个步骤
var steps = [step1Func, step2Func, step3Func];
function iterateSteps(steps) {
  var i, step;
  return regeneratorRuntime.wrap(function iterateSteps$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < steps.length)) {
            _context33.next = 8;
            break;
          }

          step = steps[i];
          _context33.next = 5;
          return step();

        case 5:
          i++;
          _context33.next = 1;
          break;

        case 8:
        case 'end':
          return _context33.stop();
      }
    }
  }, _marked24, this);
};

// 3）部署 Iterator 接口
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口

// 4）作为数据结构
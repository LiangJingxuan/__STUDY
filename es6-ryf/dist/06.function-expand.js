"use strict";

/**
 * 函数的扩展
 * 
 */

/* 1.函数参数的默认值 */

// ES5

function log(x, y) {
  // y=y || 'world';
  if (typeof y === 'undefined') {
    y = 'world';
  }
  // console.log(x,y);
}
log('hello');
log('hello', 'amy');
log('hello', '');

// ES6: 方法一
function logto(x) {
  // console.log(arguments);
  // console.log(x,y);

  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'world';
}
logto('hello');
logto('hello', 'amy');
logto('hello', '');

// ES6: 方法二
function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;
}
var p = new Point();
// console.log(p);  // { x: 0, y: 0 }

// 与解构赋值默认值结合使用
function foo() {
  // console.log(x,y);

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      x = _ref.x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 5 : _ref$y;
}
foo({ x: 1, y: 3 });
foo({});
foo();

// 例:
function fetch(url, _ref2) {
  /*console.log({
  	url:url,
  	method:method,
  	headers:headers
  });*/

  var _ref2$body = _ref2.body,
      body = _ref2$body === undefined ? '' : _ref2$body,
      _ref2$method = _ref2.method,
      method = _ref2$method === undefined ? 'GET' : _ref2$method,
      _ref2$headers = _ref2.headers,
      headers = _ref2$headers === undefined ? {} : _ref2$headers;
}
fetch('lee.com', {
  body: 'application/json, text/plain, */*',
  headers: 'application/json;charset=UTF-8'
});

// 参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。
// 因为这样比较容易看出来，到底省略了哪些参数。
// 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

// 函数的 length 属性
// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。
// 也就是说，指定了默认值后，length属性将失真。

// 作用域
var x = 1;
function f(x) {
  // console.log(y);

  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
}
f(2); // 2

// 应用 设置参数不能省略 如果省略则会抛出错误
function throwIfMissing() {
  throw new Error('Missing parameter');
}
/*function foo(mustBeProvided = throwIfMissing()) {
 	return mustBeProvided;
}*/
// foo(1)

/* 2.rest 参数 */
function add() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  console.log(values);
  var sum = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var val = _step.value;

      sum += val;
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

  return sum;
}
// console.log(add(1,8,10));

// rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 函数的length属性，不包括 rest 参数。

/* 3.严格模式 */
// ES5
function doSomething(a, b) {
  "use strice";
}
// ES6
// 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
// 那么函数内部就不能显式设定为严格模式，否则会报错。

/* 4.name 属性 */
// 函数的name属性，返回该函数的函数名。
function foo() {}
foo.name; // "foo"

/* 5.箭头函数 */
// ES6 允许使用“箭头”（=>）定义函数。
var f = function f(v) {
  return v;
};
var f = function f() {
  return 5;
};
var sum = function sum(n1, n2, n3) {
  return n1 + n2 + n3;
};
var sum = function sum(a, b) {
  return (a + b) * a;
};
var fn = function fn() {
  return void doesNotReturn();
};

// 箭头函数可以与变量解构结合使用
var full = function full(_ref3) {
  var first = _ref3.first,
      last = _ref3.last;
  return first + '&' + last;
};

// 使表达跟简洁
var isEven = function isEven(n) {
  return n % 2 == 0;
};
var square = function square(n) {
  return n * n;
};

// 用于简化回调函数
// 正常函数写法
[1, 2, 3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1, 2, 3].map(function (x) {
  return x * x;
});

// 简化排序函数
// 正常函数写法
var result = [1, 2, 4, 8].sort(function (a, b) {
  return a - b;
});
// 箭头函数写法
var result = [1, 2, 4, 8].sort(function (a, b) {
  return a - b;
});

// rest 参数与箭头函数结合的例子
var numbers = function numbers() {
  for (var _len2 = arguments.length, n = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    n[_key2] = arguments[_key2];
  }

  return n;
};
// console.log(numbers(1,2,3,4,5,6));

var headAndTail = function headAndTail(head) {
  for (var _len3 = arguments.length, tail = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    tail[_key3 - 1] = arguments[_key3];
  }

  return [head, tail];
};
// console.log(headAndTail(1, 2, 3, 4, 5));

// 箭头函数的使用注意点
/*
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
*/
// 箭头函数内部没有this
function foo() {
  setTimeout(function () {
    // console.log('id:', this.id);
  }, 100);
}
// 例:
var handler = {
  id: '123456',
  init: function init() {
    var _this = this;

    document.addEventListener('click', function (event) {
      return _this.doSomething(event.type);
    }, false);
  },
  doSomething: function doSomething(type) {
    console.log('Handling ' + type + ' for ' + this.id);
  }
};

// 除了this，以下三个变量在箭头函数之中也是不存在的，
// 指向外层函数的对应变量：arguments、super、new.target。

// 嵌套的箭头函数
// 箭头函数内容在嵌套使用箭头函数

// ES5中的嵌套函数
function insert(val) {
  return {
    into: function into(array) {
      return {
        after: function after(afterVal) {
          array.splice(array.indexOf(afterVal) + 1, 0, val);
          return array;
        }
      };
    }
  };
}

// ES6箭头嵌套函数
var insert = function insert(val) {
  return { into: function into(array) {
      return { after: function after(afterVal) {
          array.splice(array.indexOf(afterVal) + 1, 0, val);
          return array;
        } };
    } };
};

insert(2).into([1, 3]).after(1); // 调用： [1,2,3] 

/* 6.双冒号运算符 */
// 函数绑定运算符是并排的两个冒号（::），
// 双冒号左边是一个对象，右边是一个函数。
// 该运算符会自动将左边的对象，作为上下文环境（即this对象），
// 绑定到右边的函数上面。

/* 7.尾调用优化 */
// 某个函数的最后一步是调用另一个函数
var f = function f(x) {
  return g(x);
};
// 尾调用优化
// 注意，只有不再用到外层函数的内部变量，
// 内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
// 尾递归
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
// 普通递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
// 尾递归
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
// 递归函数的改写
function factorial(n) {
  var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
// console.log(factorial(5));
// 严格模式
// 尾递归优化的实现

/* 8.函数参数的尾逗号 */
function clownsEverywhere(a, b, c) {
  console.log(a, b, c);
}
// clownsEverywhere(1,214,56);
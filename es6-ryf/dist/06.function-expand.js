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
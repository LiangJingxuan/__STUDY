"use strict";

/**
 * 数组的扩展
 * 
 */

/* 1.扩展运算符 */
// 例如：

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function push(array) {
  for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    items[_key - 1] = arguments[_key];
  }

  array.push.apply(array, items);
}

function add(x, y) {
  return x + y;
}
var numbers = [4, 38];
add.apply(undefined, numbers);

function f(v, w, x, y, z) {}
var args = [0, 1];
f.apply(undefined, [-1].concat(args, [2], [3]));

// 扩展运算符后面还可以放置表达式
var arr = [].concat(_toConsumableArray(x > 0 ? ['a'] : []), ['b']);

// 如果扩展运算符后面是一个空数组，则不产生任何效果
[].concat([1]);

// 替代函数的 apply 方法

// 例：简化求出一个数组最大元素
// ES5写法
Math.max.apply(null, [14, 3, 77]);
// ES6写法
Math.max.apply(Math, [14, 3, 77]);

// 例：将一个数组添加到另一个数组的尾部
// ES5写法
var arr1 = [1, 3, 5],
    arr2 = [2, 4, 8];
Array.prototype.push.apply(arr1, arr2);
// ES6写法
arr1.push.apply(arr1, arr2);

// 扩展运算符应用
// 1）复制数组
var a1 = [1, 3];
// const a2=[...a1]; 方法一
// const [...a2]=a1;  方法二

// 2）合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
[].concat(arr1, arr2, arr3);

// 3）与解构赋值结合
var first = 0,
    rest = [1, 2, 3, 4];

// 4）字符串

[].concat(_toConsumableArray('hello')); // [ "h", "e", "l", "l", "o" ]

// 5）实现了 Iterator 接口的对象
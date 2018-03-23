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
var it=makeIterator(['a','b']);
it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }
function makeIterator(array){
	var nextIndex = 0;
	return {
		next:function(){
			return nextIndex<array.length?
				{value:array[nextIndex++],done:false}:
				{value:undefined,done:true}
		}
	}
};

/* 2.默认 Iterator 接口 */
// Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环
// 使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
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
let arr=['a','b','c'], iter=arr[Symbol.iterator]();
console.log(iter.next());

// 为对象添加 Iterator 接口的例子:
let obj2 = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
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
  }
};

// 类似数组的对象调用数组的Symbol.iterator方法的例子:
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
};

/* 3.调用 Iterator 接口的场合 */
// 1）解构赋值
// 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
let set = new Set().add('a').add('b').add('c');
let [x,y] = set; // x='a'; y='b'
let [first, ...rest] = set; // first='a'; rest=['b','c'];

// 2）扩展运算符
// 扩展运算符（...）也会调用默认的 Iterator 接口
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']
// 例二
let arr2 = ['b', 'c'];
['a', ...arr2, 'd']; // ['a', 'b', 'c', 'd']

// 3）yield*
// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
/*let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};
var iterator = generator();
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }*/

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
typeof someString[Symbol.iterator]
// "function"
var iterator = someString[Symbol.iterator]();
iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }

/* 5.Iterator 接口与 Generator 函数 */
/*let obj3 = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};
for (let x of obj3) {
  console.log(x);
};*/

/* 6.遍历器对象的 return()，throw() */
// return():
// 如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法
// return方法必须返回一个对象
// throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法

// 部署了return方法:
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}
// 三种情况，都会触发执行return方法:
// 情况一
/*for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
};
// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  continue;
};
// 情况三
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
};*/

/* 7.for...of 循环 */
// 遍历所有数据结构的统一的方法
// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，
// 就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法

// for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象
// （比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串

// 数组:
console.clear();
var array1=[3,2,4,6,'lee'];
for(let i of array1){
  console.log(i);
};

// Set 和 Map 结构:
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
};

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
};

let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
};
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
  console.log(key + ' : ' + value);
};
// a : 1
// b : 2

// 计算生成的数据结构
// entries()
// keys()
// values()
let arrs=['a','c','q'];
for(let i of arrs.keys()){
  console.log(i);
};

// 类似数组的对象
// 字符串、DOM NodeList 对象、arguments对象

// 字符串
let str1 = "hello";
for (let s of str1) {
  console.log(s); // h e l l o
};

// DOM NodeList对象
let paras = document.querySelectorAll("p");
for (let p of paras) {
  p.classList.add("test");
};

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
};
printArgs('a', 'b');
// 'a'
// 'b'

// 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，
// 就是使用Array.from方法将其转为数组。
let arrayLike = { length: 2, 0: 'a', 1: 'b' };
for (let x of Array.from(arrayLike)) {
  console.log(x);
};

// 对象
let es = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};
for(let i of Object.keys(arrayLike)){
  console.log(i+':'+arrayLike[i]);
};

// 与其他遍历语法的比较

// 跳出循环的例子:
for (var n of [1,2,3,4]) {
  if (n > 1000)
    break;
  console.log(n);
};

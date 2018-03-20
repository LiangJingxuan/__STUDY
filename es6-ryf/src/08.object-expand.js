"use strict";

/**
 * 对象的扩展
 * 
 */

 /* 1.属性的简洁表示法 */
 // 对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值

 // 属性简写
 let foo='bar',
 	 baz={foo};
 var f=(x,y)=>{ return {x,y} };

 // 方法简写
 const oop={
 	method(){
 		return 'hello';
 	}
 }

// 例子：
let birth='2000/01/01';
const Person={
	name:'张三',
	birth,
	hello(){
		console.log('我的名字：',this.name);
	}
}
function getPoint(){
	const x=1, y=10;
	return {x,y}
}

/* 2.属性名表达式 */
let obj={}; obj['a' + 'bc'] = 123;

/* 3.方法的 name 属性 */
// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

/* 4.Object.is() */
// 比较相等
Object.is(+0,-0); // false
Object.is(NaN,NaN); // true
Object.is({},{}); // false
Object.is('foo','foo'); // true

/* 5.Object.assign() */
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 常见用途
// 1）为对象添加属性
class Point{
	construtor(x,y){
		Onject.assign(this,{x,y});
	}
}
// 2）为对象添加方法
Object.assign(Point.prototype, {
  someMethod(arg1, arg2) {},
  anotherMethod() {}
});
// 3）克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}

function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
// 4）合并多个对象
const merge =
  (target, ...sources) => Object.assign(target, ...sources);

const merge2 =
  (...sources) => Object.assign({}, ...sources);
// 5）为属性指定默认值
const DEFAULTS = {
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
const obj2 = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
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
const o = Object.setPrototypeOf({}, null);
// 例子：
let proto={},obj3={x:10}
Object.setPrototypeOf(obj3,proto);
proto.z=20;
proto.y=20;

// Object.getPrototypeOf()
// 用于读取一个对象的原型对象
Object.getPrototypeOf(obj3);

/* 9.super 关键字 */
// 指向当前对象的原型对象
const proto2={
	foo:'hello'
};
const obj4={
	foo:'world',
	find(){
		return super.foo;
	}
};
Object.setPrototypeOf(obj4,proto2);
obj4.find(); // hello

// super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

/* 10.Object.keys()，Object.values()，Object.entries() */

// Object.keys()
var obj5={foo:'bar',baz:42}
Object.keys(obj5); // ["foo", "baz"]


let {keys, values, entries} = Object;
let obj6 = { a: 1, b: 2, c: 3 };

for (let key of keys(obj6)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj6)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj6)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

let lee=1;

// Object.values()
// 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj7={foo:'bar',baz:42}
Object.values(obj7); // ['bar',42]

// Object.entries()
// 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
const obj8 = { foo: 'bar', baz: 42 };
Object.entries(obj8) // [ ["foo", "bar"], ["baz", 42] ]

// 遍历对象的属性
let obj9 = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj9)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

const obj10 = { foo: 'bar', baz: 42 };
// 将对象转为真正的Map结构
const map = new Map(Object.entries(obj10));
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
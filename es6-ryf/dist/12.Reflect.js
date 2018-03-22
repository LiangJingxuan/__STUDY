"use strict";

/**
 * Reflect
 * 
 */

/* 1.概述 */
/*
	1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），
	放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，
	未来的新方法将只部署在Reflect对象上。也就是说，	从Reflect对象上可以拿到语
	言内部的方法。

	2） 修改某些Object方法的返回结果，让其变得更合理。比如，
	Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
	而Reflect.defineProperty(obj, name, desc)则会返回false。

	3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj
	和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj,
	 name)让它们变成了函数行为。

	 4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，
	 就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应
	 的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么
	 修改默认行为，你总可以在Reflect上获取默认行为。

*/

/* 2.静态方法 */
// Reflect.get(target, name, receiver) 
// 查找并返回target对象的name属性，如果没有该属性，则返回undefined

var _myObjectto;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var myObject = {
	foo: 1,
	bar: 2,
	get baz() {
		return this.foo + this.bar;
	},
	set bzr(value) {
		return this.foo = value;
	}
};
Reflect.get(myObject, 'foo');
Reflect.get(myObject, 'bar');
Reflect.get(myObject, 'baz');

// Reflect.set(target, name, value, receiver)
// 设置target对象的name属性等于value
// 如果第一个参数不是对象会报错
Reflect.set(myObject, 'foo', 10);

// Reflect.has(obj, name)
// 对应name in obj里面的in运算符
// 如果第一个参数不是对象会报错
// 旧写法
'foo' in myObject; // true
// 新写法
Reflect.has(myObject, 'foo'); // true

// Reflect.deleteProperty(obj, name)
// 等同于delete obj[name]，用于删除对象的属性
// 如果删除成功，或者被删除的属性不存在，返回true；
// 删除失败，被删除的属性依然存在，返回false
// 旧写法
delete myObject.foo;
// 新写法
Reflect.deleteProperty(myObject, 'foo');

// Reflect.construct(target, args)
// 等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法
function Greeting(name) {
	this.name = name;
}
// new 的写法
var instance = new Greeting('lee');
// 新写法
var instanceNew = Reflect.construct(Greeting, ['lee']);

// Reflect.getPrototypeOf(obj)
// 用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)
// 参数必须是对象否则报错
// 旧写法
Object.getPrototypeOf(instance) === Greeting.prototype;
// 新写法
Reflect.getPrototypeOf(instance) === Greeting.prototype;

// Reflect.setPrototypeOf(obj, newProto)
// 用于设置对象的__proto__属性，返回第一个参数对象，
// 对应Object.setPrototypeOf(obj, newProto)
// 如果第一个参数不是对象会报错
// 旧写法
Object.setPrototypeOf(instance, Greeting.prototype);
// 新写法
Reflect.setPrototypeOf(instance, Greeting.prototype);

// Reflect.apply(func, thisArg, args)
// 等同于Function.prototype.apply.call(func, thisArg, args)，
// 用于绑定this对象后执行给定函数
var ages = [11, 33, 12, 54, 18, 96];
// 旧写法
var youngest = Math.min.apply(Math, ages);
var oldest = Math.max.apply(Math, ages);
var type = Object.prototype.toString.call(youngest);
// 新写法
var youngestto = Reflect.apply(Math.min, Math, ages);
var oldestto = Reflect.apply(Math.max, Math, ages);
var typeto = Reflect.apply(Object.prototype.toString, youngestto, []);

// Reflect.defineProperty(target, propertyKey, attributes)
// 基本等同于Object.defineProperty，用来为对象定义属性
// 如果第一个参数不是对象会报错
function MyDate() {};
// 旧写法
Object.defineProperty(MyDate, 'now', {
	value: function value() {
		return Date.now();
	}
});
// 新写法
Reflect.defineProperty(MyDate, 'now', {
	value: function value() {
		return Date.now();
	}
});
// 与Proxy.defineProperty配合使用:Proxy.defineProperty对属性赋值设置了拦截，
// 然后使用Reflect.defineProperty完成了赋值
var p = new Proxy({}, {
	defineProperty: function defineProperty(target, prop, descriptor) {
		console.log(descriptor);
		return Reflect.defineProperty(target, prop, descriptor);
	}
});
p.foo = 'bar'; // {value: "bar", writable: true, enumerable: true, configurable: true}
p.foo; // "bar"

// Reflect.getOwnPropertyDescriptor(target, propertyKey) 
// 基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象
// 如果第一个参数不是对象会报错
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
	value: true,
	enumerable: false
});
// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');

// Reflect.isExtensible (target) 
// 对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展
// 如果第一个参数不是对象会报错
// 旧写法
Object.isExtensible(myObject); // true
// 新写法
Reflect.isExtensible(myObject); // true

// Reflect.preventExtensions(target)
// 对应Object.preventExtensions方法，用于让一个对象变为不可扩展。
// 它返回一个布尔值，表示是否操作成功
// 如果参数不是对象会报错
// 旧写法
Object.preventExtensions(myObject); // Object {}
// 新写法
Reflect.preventExtensions(myObject); // true

// Reflect.ownKeys (target)
// 用于返回对象的所有属性，
// 基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
var myObjectto = (_myObjectto = {
	foo: 1,
	bar: 2
}, _defineProperty(_myObjectto, Symbol.for('baz'), 3), _defineProperty(_myObjectto, Symbol.for('bing'), 4), _myObjectto);
// 旧写法
Object.getOwnPropertyNames(myObject); // ['foo', 'bar']
Object.getOwnPropertySymbols(myObject); //[Symbol(baz), Symbol(bing)]
// 新写法
Reflect.ownKeys(myObject); // ['foo', 'bar', Symbol(baz), Symbol(bing)]

/* 3.实例：使用 Proxy 实现观察者模式 */
// 观察者模式（Observer mode）指的是:
// 函数自动观察数据对象，一旦对象有变化，函数就会自动执行
var queuedObservers = new Set();

var observe = function observe(fn) {
	return queuedObservers.add(fn);
};
var observable = function observable(obj) {
	return new Proxy(obj, { set: set });
};

function set(target, key, value, receiver) {
	var result = Reflect.set(target, key, value, receiver);
	queuedObservers.forEach(function (observer) {
		return observer();
	});
	return result;
}

var person = observable({
	name: '张三',
	age: 20
});
function print() {
	console.log(person.name + ', ' + person.age);
}
observe(print);
person.name = '李四'; // 李四, 20
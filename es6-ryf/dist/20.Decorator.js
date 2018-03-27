"use strict";

/**
 * 修饰器 Decorator
 * 
 */

/*类的修饰*/
// 许多面向对象的语言都有修饰器（Decorator）函数，用来修改类的行为

/*
	@testable class MyTestableClass {
	  // ...
	}
	function testable(target) {
	  target.isTestable = true;
	}
	MyTestableClass.isTestable // true
*/

// 修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。

/*方法的修饰*/
// 修饰器不仅可以修饰类，还可以修饰类的属性

/*
	class Person {
	  @readonly
	  name() { return `${this.first} ${this.last}` }
	}
*/

// 修改属性描述对象的enumerable属性，使得该属性不可遍历

/*
	class Person {
	  @nonenumerable
	  get kidCount() { return this.children.length; }
	}

	function nonenumerable(target, name, descriptor) {
	  descriptor.enumerable = false;
	  return descriptor;
	}
*/

/*为什么修饰器不能用于函数？*/
// 修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升
// 另一方面，如果一定要修饰函数，可以采用高阶函数的形式直接执行

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = publish;
exports.mixins = mixins;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function doSomething(name) {
	console.log('Hello, ' + name);
}
function loggingDecorator(wrapped) {
	return function () {
		console.log('Starting');
		var result = wrapped.apply(this, arguments);
		console.log('Finished');
		return result;
	};
}
var wrapped = loggingDecorator(doSomething);

/*core-decorators.js*/
// core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器
// 1）@autobind  autobind修饰器使得方法中的this对象，绑定原始对象
// 2）@readonly  readonly修饰器使得属性或方法不可写
// 3）@override  override修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错
// 4）@deprecate (别名@deprecated)  deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除
// 5）@suppressWarnings  suppressWarnings修饰器抑制deprecated修饰器导致的console.warn()调用 异步代码发出的调用除外

/*使用修饰器实现自动发布事件*/
// 可以使用修饰器，使得对象的方法被调用时，自动发出一个事件
var postal = require("postal/lib/postal.lodash");
function publish(topic, channel) {
	var channelName = channel || '/';
	var msgChannel = postal.channel(channelName);
	msgChannel.subscribe(topic, function (v) {
		console.log('频道: ', channelName);
		console.log('事件: ', topic);
		console.log('数据: ', v);
	});
	return function (target, name, descriptor) {
		var fn = descriptor.value;
		descriptor.value = function () {
			var value = fn.apply(this, arguments);
			msgChannel.publish(topic, value);
		};
	};
}
// 使用方法:

/*
	import publish from './publish';
	class FooComponent {
	  @publish('foo.some.message', 'component')
	  someMethod() {
	    return { my: 'data' };
	  }
	  @publish('foo.some.other')
	  anotherMethod() {
	    // ...
	  }
	}
	let foo = new FooComponent();
	foo.someMethod();
	foo.anotherMethod();
*/

/*Mixin*/
// 在修饰器的基础上，可以实现Mixin模式
// 所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法

// mixin简单实现
var Foo = {
	foo: function foo() {
		console.log('foo');
	}
};

var MyClass = function MyClass() {
	_classCallCheck(this, MyClass);
};

Object.assign(MyClass.prototype, Foo);

var obj = new MyClass();
obj.foo(); // 'foo'

// 将 Mixin 写成一个修饰器
function mixins() {
	for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
		list[_key] = arguments[_key];
	}

	return function (target) {
		Object.assign.apply(Object, [target.prototype].concat(list));
	};
}
// 使用方法:
/*
	import { mixins } from './mixins';
	const Foo = {
	  foo() { console.log('foo') }
	};
	@mixins(Foo)
	class MyClass {}
	let obj = new MyClass();
	obj.foo() // "foo"
*/

/*Trait*/
// Trait 也是一种修饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等
/*
	import { traits } from 'traits-decorator';

	class TFoo {
	  foo() { console.log('foo') }
	}

	const TBar = {
	  bar() { console.log('bar') }
	};

	@traits(TFoo, TBar)
	class MyClass { }

	let obj = new MyClass();
	obj.foo() // foo
	obj.bar() // bar
*/

/*Babel 转码器的支持*/
// 目前，Babel 转码器已经支持 Decorator
// 首先，安装babel-core和babel-plugin-transform-decorators。
// 由于后者包括在babel-preset-stage-0之中，所以改为安装babel-preset-stage-0亦可

// $ npm install babel-core babel-plugin-transform-decorators

// 然后，设置配置文件.babelrc。
/*
	{
	  "plugins": ["transform-decorators"]
	}
*/

// 脚本中打开的命令如下。
// babel.transform("code", {plugins: ["transform-decorators"]})
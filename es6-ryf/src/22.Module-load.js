"use strict";

/**
 * Module 的加载实现
 * 
 */

/*浏览器加载*/

// 传统加载
// HTML 网页中，浏览器通过<script>标签加载 JavaScript 脚本

// 加载规则
// 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性
// <script type="module" src="./foo.js"></script>

// 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
// 模块脚本自动采用严格模式，不管有没有声明use strict。
// 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
// 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
// 同一个模块如果加载多次，将只执行一次。

/*ES6 模块与 CommonJS 模块的差异*/

// 差异:
// CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
// CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

/*Node 加载*/
// Node 要求 ES6 模块采用.mjs后缀文件名
// 只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名
// Node 的import命令是异步加载，这一点与浏览器的处理方法相同

// 内部变量
// ES6 模块之中，顶层的this指向undefined；
// CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异
// 以下这些顶层变量在 ES6 模块之中都是不存在的
/*
	arguments
	require
	module
	exports
	__filename
	__dirname
*/

// ES6 模块加载 CommonJS 模块
// CommonJS 模块的输出都定义在module.exports这个属性上面。
// Node 的import命令加载 CommonJS 模块，
// Node 会自动将module.exports属性，当作模块的默认输出，即等同于export default xxx

// 一共有三种写法，可以拿到 CommonJS 模块的module.exports
/*
	// 写法一
	import baz from './a';
	// baz = {foo: 'hello', bar: 'world'};

	// 写法二
	import {default as baz} from './a';
	// baz = {foo: 'hello', bar: 'world'};

	// 写法三
	import * as baz from './a';
	// baz = {
	//   get default() {return module.exports;},
	//   get foo() {return this.default.foo}.bind(baz),
	//   get bar() {return this.default.bar}.bind(baz)
	// }
*/

// CommonJS 模块加载 ES6 模块
// CommonJS 模块加载 ES6 模块，不能使用require命令，而要使用import()函数
/*
	// es.js
	export let foo = { bar:'my-default' };
	export { foo as bar };
	export function f() {};
	export class c {};

	// cjs.js
	const es_namespace = await import('./es');
	// es_namespace = {
	//   get foo() {return foo;}
	//   get bar() {return foo;}
	//   get f() {return f;}
	//   get c() {return c;}
	// }
*/

/*循环加载*/
// “循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本

// CommonJS 模块的加载原理
// CommonJS 模块的循环加载
// ES6 模块的循环加载

/*ES6 模块的转码*/

// ES6 module transpiler
// SystemJS
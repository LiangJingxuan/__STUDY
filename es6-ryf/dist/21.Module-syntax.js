"use strict";

/**
 * Module 的语法
 * 
 */

/*概述*/
// 将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来

// ES6模块
// 从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载
// 这也导致了没法引用 ES6 模块本身，因为它不是对象

// import { stat, exists, readFile } from 'fs';

/*严格模式*/
// ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
// 严格模式主要有一下特征:
/*
	变量必须声明后再使用
	函数的参数不能有同名属性，否则报错
	不能使用with语句
	不能对只读属性赋值，否则报错
	不能使用前缀 0 表示八进制数，否则报错
	不能删除不可删除的属性，否则报错
	不能删除变量delete prop，会报错，只能删除属性delete global[prop]
	eval不会在它的外层作用域引入变量
	eval和arguments不能被重新赋值
	arguments不会自动反映函数参数的变化
	不能使用arguments.callee
	不能使用arguments.caller
	禁止this指向全局对象
	不能使用fn.caller和fn.arguments获取函数调用的堆栈
	增加了保留字（比如protected、static和interface）
*/

/*export 命令*/
// 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
// 一个模块就是一个独立的文件,该文件内部的所有变量，外部无法获取
// 如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.multiply = multiply;
exports.area = area;
exports.circumference = circumference;
var firstName = exports.firstName = 'Michael';
var lastName = exports.lastName = 'Jackson';
var year = exports.year = 1958;

// 另一种写法 推荐用饭:
var firstName1 = 'Michael';
var lastName1 = 'Jackson';
var year1 = 1958;
exports.firstName1 = firstName1;
exports.lastName1 = lastName1;
exports.year1 = year1;

// export命令除了输出变量，还可以输出函数或类（class）

function multiply(x, y) {
	return x * y;
}

// 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名
function v1() {}
function v2() {}
exports.streamV1 = v1;
exports.streamV2 = v2;
exports.streamLatestVersion = v2;

// 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系

// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值

var foo = exports.foo = 'bar';
setTimeout(function () {
	return exports.foo = foo = 'baz';
}, 500);

// export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，
// 下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷

/*import 命令*/
// 使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块

/*
	import {firstName, lastName, year} from './profile.js';
	function setName(element) {
	  element.textContent = firstName + ' ' + lastName;
	}
*/

// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名
// import { lastName as surname } from './profile.js';

// 凡是输入的变量，都当作完全只读，轻易不要改变它的属性

// import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径
// .js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置
// import {myMethod} from 'util';

// import命令具有提升效果，会提升到整个模块的头部，首先执行

// 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

/*模块的整体加载*/
// 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面

// circle.js
function area(radius) {
	return Math.PI * radius * radius;
}
function circumference(radius) {
	return 2 * Math.PI * radius;
}

// 现在，加载这个模块。
// main.js

// import { area, circumference } from './circle';
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));

// 上面写法是逐一指定要加载的方法，整体加载的写法如下
// import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

/*export default 命令*/
// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出

// export-default.js
/*
	export default function () {
	  console.log('foo');
	}
*/

// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字
// import-default.js
// import customName from './export-default';
// 需要注意的是，这时import命令后面，不使用大括号
// customName(); // 'foo'

// export default命令用在非匿名函数前，也是可以的
// foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载
/*
	export default function foo() {
	  console.log('foo');
	}

	// 或者写成

	function foo() {
	  console.log('foo');
	}

	export default foo;
*/

// export default也可以用来输出类
/*
	// MyClass.js
	export default class { ... }

	// main.js
	import MyClass from 'MyClass';
	let o = new MyClass();
	export 与 import 的复合写法
*/

/*export 与 import 的复合写法*/
// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起

// export { foo, bar } from 'my_module';

// 可以简单理解为
// import { foo, bar } from 'my_module';
// export { foo, bar };

// 模块的接口改名和整体输出，也可以采用这种写法

/*模块的继承*/

// 假设有一个circleplus模块，继承了circle模块
// circleplus.js
/*
	export * from 'circle';
	export var e = 2.71828182846;
	export default function(x) {
	  return Math.exp(x);
	}
*/

/*跨模块常量*/

/*
	// constants.js 模块
	export const A = 1;
	export const B = 3;
	export const C = 4;

	// test1.js 模块
	import * as constants from './constants';
	console.log(constants.A); // 1
	console.log(constants.B); // 3

	// test2.js 模块
	import {A, B} from './constants';
	console.log(A); // 1
console.log(B); // 3
*/

// 如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下
// constants/db.js
var db = exports.db = {
	url: 'http://my.couchdbserver.local:5984',
	admin_username: 'admin',
	admin_password: 'admin password'
};

// constants/user.js
var users = exports.users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

// 然后，将这些文件输出的常量，合并在index.js里面
/*
	// constants/index.js
	export {db} from './db';
	export {users} from './users';
*/

// 使用的时候，直接加载index.js就可以了
/*
	// script.js
	import {db, users} from './index';
*/

/*import()*/
// 有一个提案，建议引入import()函数，完成动态加载

// import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载

// import()返回一个 Promise 对象。下面是一个例子

/*
	const main = document.querySelector('main');
	import(`./section-modules/${someVariable}.js`)
	  .then(module => {
	    module.loadPageInto(main);
	  })
	  .catch(err => {
	    main.textContent = err.message;
	  });
*/

// import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，
// 也就是说，什么时候运行到这一句，就会加载指定的模块
// import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。

// 适用场合

// 1）按需加载 import()可以在需要的时候，再加载某个模块
/*
	button.addEventListener('click', event => {
	  import('./dialogBox.js')
	  .then(dialogBox => {
	    dialogBox.open();
	  })
	  .catch(error => {
	   
	  })
	});
*/

// 2）条件加载 import()可以放在if代码块，根据不同的情况，加载不同的模块
/*
	if (condition) {
	  import('moduleA').then(...);
	} else {
	  import('moduleB').then(...);
	}
*/

// 3）动态的模块路径 import()允许模块路径动态生成
// 根据函数f的返回结果，加载不同的模块
/*
	import(f())
	.then(...);
*/

// 注意点
// import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。
// 因此，可以使用对象解构赋值的语法，获取输出接口
/*
	import('./myModule.js')
	.then(({export1, export2}) => {
	  // ...·
	});
*/

// 同时加载多个模块
/*
	Promise.all([
	  import('./module1.js'),
	  import('./module2.js'),
	  import('./module3.js'),
	])
	.then(([module1, module2, module3]) => {
	   ···
	});
*/

// import()也可以用在 async 函数之中
/*
	async function main() {
	  const myModule = await import('./myModule.js');
	  const {export1, export2} = await import('./myModule.js');
	  const [module1, module2, module3] =
	    await Promise.all([
	      import('./module1.js'),
	      import('./module2.js'),
	      import('./module3.js'),
	    ]);
	}
	main();
*/
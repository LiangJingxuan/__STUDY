"use strict";

/**
 * 编程风格
 * 
 */

/*块级作用域*/

// 1）let 取代 var
// let完全可以取代var，因为两者语义相同，而且let没有副作用
if(true){
	let x='lee';
};
for(let i=0;i<10;i++){
	console.log(i);
};

// 2）全局常量和线程安全
// 在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量
// 所以多使用const，有利于提高程序的运行效率
const a=1,
	  b=2,
	  c=3;

const [d,e,f]=[1,2,3];

// 所有的函数都应该设置为常量

/*字符串*/

// 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号
const g='foobar',
	  h=`foo${a}bar`;

/*解构赋值*/

// 使用数组成员对变量赋值时，优先使用解构赋值
const arr=[1,2,3,4];
const [first,second]=arr;

// 函数的参数如果是对象的成员，优先使用解构赋值
function getFullName({firstName,lastName}){};

// 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值
// 这样便于以后添加返回值，以及更改返回值的顺序
function processInput(input){
	return {left,right,top,bottom};
};
const {left,right}=processInput(input);

/*对象*/

// 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
const obj1={k1:'v1',k2:'v2'};
const obj2={
	k1:'v1',
	k2:'v2',
};

// 对象尽量静态化，一旦定义，就不得随意添加新的属性。
// 如果添加属性不可避免，要使用Object.assign方法

// if reshape unavoidable
const a2 = {};
Object.assign(a2, { x: 3 });

// good
const a3 = { x: null };
a3.x = 3;

// 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义
const obj3 = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

// 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写
const atom={
	ref,
	value:1,
	addValue(value){
		return this.value+value;
	},
};

/*数组*/

// 使用扩展运算符（...）拷贝数组
const itemsCopy = [...items];

// 使用 Array.from 方法，将类似数组的对象转为数组
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);

/*函数*/

// 立即执行函数可以写成箭头函数的形式
(()=>{
	console.log('Welcome to the Internet.');
})();

// 那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this
[1,2,3].map(x=>x*x);

// 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this
const boundMethod=(...params)=>method.apply(this,params);

// 简单的、单行的、不会复用的函数，建议采用箭头函数。
// 如果函数体较为复杂，行数较多，还是应该采用传统的函数写法

// 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数
function divide(a, b, { option = false } = {}) {};

// 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替
// 因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，
// 而 rest 运算符可以提供一个真正的数组
function concatenateAll(...args) {
  return args.join('');
};

// 使用默认值语法设置函数参数的默认值
function handleThings(opts = {}) {};

/*Map 结构*/

// 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
// 如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
};

for (let value of map.values()) {
  console.log(value);
};

for (let item of map.entries()) {
  console.log(item[0], item[1]);
};

/*Class*/

// 总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}

// 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}

/*模块*/

// Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require
// import { func1, func2 } from 'moduleA';

// 使用export取代module.exports
/*
	import React from 'react';
	class Breadcrumbs extends React.Component {
	  render() {
	    return <nav />;
	  }
	};
	export default Breadcrumbs;
*/

// 如果模块只有一个输出值，就使用export default，如果模块有多个输出值，
// 就不使用export default，export default与普通的export不要同时使用。

// 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）
// import myObject from './importModule';

// 如果模块默认输出一个函数，函数名的首字母应该小写
// function makeStyleGuide() {};
// export default makeStyleGuide;

// 如果模块默认输出一个对象，对象名的首字母应该大写
// const StyleGuide = {  es6: {} };
// export default StyleGuide;

/*ESLint 的使用*/

// ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码

// 安装 ESLint:
// $ npm i -g eslint

// 然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件:
// $ npm i -g eslint-config-airbnb
// $ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

// 最后，在项目的根目录下新建一个.eslintrc文件，配置 ESLint。
/*
	{
	  "extends": "eslint-config-airbnb"
	}
*/
"use strict";

/**
 * Generator 函数的语法
 * 
 */

/* 1.简介 */
// 异步编程解决方案,返回指向内部状态的指针对象(遍历器对象)
function* helloWorldGenerator(){
	yield 'hello';
	yield 'world';
	return 'ending';
}
var hw=helloWorldGenerator();

/* 2.next 方法的参数 */
/* 3.for...of 循环 */
/* 4.Generator.prototype.throw() */
/* 5.Generator.prototype.return() */
/* 6.next()、throw()、return() 的共同点 */
/* 7.yield* 表达式 */
/* 8.作为对象属性的 Generator 函数 */
/* 9.Generator 函数的this */
/* 10.含义 */
/* 11.应用 */
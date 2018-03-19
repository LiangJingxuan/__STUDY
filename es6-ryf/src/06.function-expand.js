"use strict";

/**
 * 函数的扩展
 * 
 */

 /* 1.函数参数的默认值 */

 // ES5
 function log(x,y){
 	// y=y || 'world';
 	if(typeof y==='undefined'){
 		y='world';
 	}
 	// console.log(x,y);
 }
 log('hello');
 log('hello','amy');
 log('hello','');

 // ES6: 方法一
 function logto(x,y='world'){
 	// console.log(arguments);
 	// console.log(x,y);
 }
 logto('hello');
 logto('hello','amy');
 logto('hello','');

 // ES6: 方法二
 function Point(x=0,y=0){
 	this.x=x;
 	this.y=y;
 }
 const p=new Point();
 // console.log(p);  // { x: 0, y: 0 }

 // 与解构赋值默认值结合使用
 function foo({x,y=5}={}){
 	// console.log(x,y);
 }
 foo({x:1,y:3});
 foo({});
 foo();

 // 例:
 function fetch(url,{body='',method='GET',headers={}}){
 	/*console.log({
 		url:url,
 		method:method,
 		headers:headers
 	});*/
 }
 fetch('lee.com',{
 	body:'application/json, text/plain, */*',
 	headers:'application/json;charset=UTF-8'
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
 function f(x, y = x) {
  // console.log(y);
 }
 f(2) // 2

 // 应用 设置参数不能省略 如果省略则会抛出错误
 function throwIfMissing() {
  	throw new Error('Missing parameter');
 }
 /*function foo(mustBeProvided = throwIfMissing()) {
  	return mustBeProvided;
 }*/
// foo(1)

/* 2.rest 参数 */
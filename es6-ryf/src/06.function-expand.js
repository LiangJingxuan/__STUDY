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
function add(...values){
	console.log(values);
	let sum=0;
	for(let val of values){
		sum+=val;
	}
	return sum;
}
// console.log(add(1,8,10));

// rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 函数的length属性，不包括 rest 参数。

/* 3.严格模式 */
// ES5
function doSomething(a,b){
	"use strice";
}
// ES6
// 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
// 那么函数内部就不能显式设定为严格模式，否则会报错。

/* 4.name 属性 */
// 函数的name属性，返回该函数的函数名。
function foo() {}
foo.name // "foo"

/* 5.箭头函数 */
// ES6 允许使用“箭头”（=>）定义函数。
var f=v=>v;
var f=()=>5;
var sum=(n1,n2,n3)=>n1+n2+n3;
var sum=(a,b)=>{return (a+b)*a}
let fn = () => void doesNotReturn();

// 箭头函数可以与变量解构结合使用
const full=({first,last})=>first+'&'+last;

// 使表达跟简洁
const isEven = n => n % 2 == 0;
const square = n => n * n;

// 用于简化回调函数
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1,2,3].map(x => x * x);

// 简化排序函数
// 正常函数写法
var result = [1,2,4,8].sort(function (a, b) {
  return a - b;
});
// 箭头函数写法
var result = [1,2,4,8].sort((a, b) => a - b);

// rest 参数与箭头函数结合的例子
const numbers=(...n)=>n;
// console.log(numbers(1,2,3,4,5,6));

const headAndTail=(head,...tail)=>[head,tail];
// console.log(headAndTail(1, 2, 3, 4, 5));

// 箭头函数的使用注意点
/*
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
*/
// 箭头函数内部没有this
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
// 例:
var handler = {
  id: '123456',
  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },
  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};

// 除了this，以下三个变量在箭头函数之中也是不存在的，
// 指向外层函数的对应变量：arguments、super、new.target。

// 嵌套的箭头函数
// 箭头函数内容在嵌套使用箭头函数

// ES5中的嵌套函数
function insert(val){
	return {
		into:function (array){
			return {
				after:function(afterVal){
					array.splic(array.indexOf(afterVal)+1,0,val);
					return array;
				}
			}
		}
	}
}

// ES6箭头嵌套函数
var insert=(val)=>({into:(array)=>({after:(afterVal)=>{
	array.splic(array.indexOf(afterVal)+1,0,val);
	return array;
}})})

insert(2).into([1,3]).after(1);	// 调用： [1,2,3] 

/* 6.双冒号运算符 */
// +++++++++++++++++++++++++++++++++++++++
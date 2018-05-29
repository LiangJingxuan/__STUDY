/*函数的扩展*/

// 1. 函数参数的默认值
function log(x,y='World'){
	console.log(x,y);
}
/*log('Hello');
log('Hello','China');
log('Hello','');*/

function Point(x=0,y=0){
	this.x=x;
	this.y=y;
}
const p=new Point();
// console.log(p);


// 与解构赋值默认值结合使用
function foo({x,y=5}){
	console.log(x,y);
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

function foo({x,y=5}={}){
	console.log(x,y);
}
foo() // undefined 5

function fetch(url,{body='',method='GET',headers={}}={}){
	console.log(method);
}
fetch('index.html'); // GET


// 参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。
// 因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，
// 实际上这个参数是没法省略的。


// 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function foo(x=5,y=6){
	console.log(x,y);
}
foo(undefined,null); // 5,null


// 函数的length属性
// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。
// 也就是说，指定了默认值后，length属性将失真。
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1


// 应用
// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter

// 另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。
function foo(optional = undefined) { ··· }




// 2. rest参数

function add(...values){
	let sum=0;
	for(var val of values){
		sum+=val;
	}
	return sum;
}
add(2,5,3); // 10

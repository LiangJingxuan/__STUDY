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
};
var hw=helloWorldGenerator();
hw.next()// { value: 'hello', done: false }
hw.next()// { value: 'world', done: false }
hw.next()// { value: 'ending', done: true }
hw.next()// { value: undefined, done: true }

// yield 表达式
function* gen(){
	yield 123+456;
};

// 不用yield表达式，这时就变成了一个单纯的暂缓执行函数
function* f(){
	console.log('ok');
};
var generator=f();
setTimeout(function(){
	generator.next();
},200);

// yield表达式只能用在 Generator 函数里面，用在其他地方都会报错
/*(function (){
  yield 1;
})()// SyntaxError: Unexpected number*/

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
function* demo() {
  // console.log('Hello' + yield); // SyntaxError
  // console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
};

// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
};

// 与 Iterator 接口的关系
// Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，
// 可以被...扩展运算符遍历了
var myIterable={};
myIterable[Symbol.iterator]=function* (){
	yield 1;
	yield 2;
	yield 3;
};
[...myIterable] // [1, 2, 3]

// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
function* gens(){};
var g=gens();
g[Symbol.iterator]()===g; // true

/* 2.next 方法的参数 */
function* foo(x){
	var y=2*(yield (x+1));
	var z=yield (y/3);
	return (x+y+z);
};
var a=foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b=foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
};
const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});
wrapped().next('hello!');// First input: hello!

/* 3.for...of 循环 */
// for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法
function* footo(){
	yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
};
for(let i of footo()){
	console.log(i);  // 1 2 3 4 5
};

// 扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
};
// 扩展运算符
[...numbers()] // [1, 2]
// Array.from 方法
Array.from(numbers()) // [1, 2]
// 解构赋值
let [x, y] = numbers();
x // 1
y // 2
// for...of 循环
for (let n of numbers()) {
  console.log(n)
};
// 1
// 2

/* 4.Generator.prototype.throw() */
var g=function* (){
	try{
		yield;
	}catch(e){
		console.log('内部捕获'+e);
	}
};
var i=g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a // 外部捕获 b

// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例
var g = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};
var i = g();
i.next();
try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
};

// Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获
var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a

// 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行

/* 5.Generator.prototype.return() */
// Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数
function* gen(){
	yield 1;
	yield 2;
	yield 3;
};
var g=gen();
g.next(); // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();  // { value: undefined, done: true }

// 如果return方法调用时，不提供参数，则返回值的value属性为undefined
g.return(); // { value: undefined, done: true }

// 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }

/* 6.next()、throw()、return() 的共同点 */
// 它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式

// next()是将yield表达式替换成一个值
// throw()是将yield表达式替换成一个throw语句
// return()是将yield表达式替换成一个return语句

/* 7.yield* 表达式 */
// 用来在一个 Generator 函数里面执行另一个 Generator 函数
function* foo(){
	yield 'b';
	yield 'x';
};
function* bar(){
	yield 'a';
	yield* foo();
	yield 'y'; 
};
let delegatedIterator=(function*(){
	yield 'hello';
	yield 'bay';
}());
let delegatingIterator=(function*(){
	yield 'lee';
	yield* delegatedIterator;
	yield 'ok';
}());
for(let i of delegatingIterator){
	console.log(i); // lee hello bay ok
};

// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据
function* foo(){
	yield 2;
	yield 3;
	return 'foo';
};
function* bar(){
	yield 1;
	var v=yield* foo();
	console.log('v:'+v);
	yield 4;
};
it.next()// {value: 1, done: false}
it.next()// {value: 2, done: false}
it.next()// {value: 3, done: false}
it.next()// "v: foo"  // {value: 4, done: false}
it.next()// {value: undefined, done: true}

function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())]
// The result
// 值为 [ 'a', 'b' ]

// yield*命令可以很方便地取出嵌套数组的所有成员
function* iterTree(tree){
	if(Array.isArray(tree)){
		for(let i=0;i<tree.length;i++){
			yield* iterTree(tree[i]);
		}
	}else{
		yield tree;
	}
};
const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
for(let x of iterTree(tree)) {
  console.log(x);
};

// 使用yield*语句遍历完全二叉树
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
};
// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
};
// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
};
let tree2 = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// 遍历二叉树
var result = [];
for (let node of inorder(tree2)) {
  result.push(node);
};
result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

/* 8.作为对象属性的 Generator 函数 */
let obj={
	*myGeneratorMethod(){

	}
};
/* 9.Generator 函数的this */
function* g() {}
g.prototype.hello = function () {
  return 'hi!';
};
let obj2 = g();
obj2 instanceof g // true
obj2.hello() // 'hi!'
// Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的
// 构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象

// Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性
// Generator 函数也不能跟new命令一起用，会报错

// 让Generator函数 既可以用next方法，又可以获得正常的this:
// 生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，
// 这个空对象就是 Generator 函数的实例对象了
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
function F() {
  return gen.call(gen.prototype);
}
var f = new F();
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
f.a // 1
f.b // 2
f.c // 3

/* 10.含义 */
// Generator 与状态机
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};

// Generator 与协程
// 1）协程与子例程的差异
// 2）协程与普通线程的差异

// Generator 与上下文

/* 11.应用 */
// 1）异步操作的同步化表达
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()
// 卸载UI
loader.next()

// Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}
var it = main();
it.next();

// 2）控制流管理
// 封装了一个任务的多个步骤
let steps = [step1Func, step2Func, step3Func];
function* iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
};

// 3）部署 Iterator 接口
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口

// 4）作为数据结构



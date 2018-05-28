/*3.字符串的解构赋值*/
let [a,b,c,d,e]='hello';
let {length:len}='hello'; // 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
// len: 5


/*4.数值和布尔值的解构赋值*/
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString:s}=123;
let {toString:s}=true;


/*5.函数参数的解构赋值*/
function add([x,y]){
	return x+y;
}
add([1,2]); // 3

[[1,2],[3,4]].map(([a,b])=>a+b);

// 默认值
function move({x=0,y=0}={}){
	return [x,y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]


/*6.圆括号问题*/
let a=10;
let b=10;
({a:foo,b:bar}={foo:100,bar:100});


/*7.用途*/


// 1. 交换变量的值
let x=1; let y=2;
[x,y]=[y,x];


// 2. 从函数返回多个值

// 返回一个数组
function example(){
	return [1,2,3];
}
let [a,b,c]=example();

// 返回一个对象
function example(){
	return {
		foo:1,
		bar:2
	}
}
let {foo,bar}=example();


// 3. 函数参数的定义
function f([x,y,z]){}
f(1,2,3);
function f({x,y,z}){}
f({z:3,y:2,x:1});


// 4. 提取 JSON 数据
let jsonData={
	id: 42,
	status: 'OK',
	data: [867,5309]
};
let {id,status,data:number}=jsonData;


// 5. 函数参数的默认值
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
jQuery.ajax=function(url,{
		async=true,
		beforeSend=function(){},
		cache=true,
		complete=function(){},
		crossDomain=false,
		global=true
	}={}) {

};


// 6. 遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}


// 7. 输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");
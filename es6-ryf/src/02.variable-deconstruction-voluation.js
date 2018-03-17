"use strict";

/**
 * 变量的解构赋值
 * 从数组对象中取值 然后赋给变量称为解构赋值
 *
 */

/* 1.数组的解构赋值 */
let [a,b,c]=[1,2,3];
let [foo,[[bar],baz]]=[1,[[2],3]];
let [,,third]=['foo','bar','baz'];
let [x,,y]=[1,2,3];
let [head,...tail]=[1,2,3,4];

// 如果解构不成功，变量的值就等于undefined
let [x1,y1,...z1]=['a'];
let [foo1]=[];
let [bar1,foo2]=[1];

// 不完全解构
let [x2,y2]=[1,2,3];
let [a2, [b2], d2] = [1, [2, 3], 4];

// 等号右边不是数组（或者严格地说，不是可遍历的结构）
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// 对于 Set 结构，也可以使用数组的解构赋值
let [x4,y4,z4]=new Set(['a','b','c']);

// 默认值
// 解构赋值允许指定默认值
let [foo4=true]=[];
let [x5,y5='b']=['a'];
let [x6,y6='b']=['a',undefined];

let [x7=1]=[undefined];
let [x8=1]=[null];

function f(){
  console.log('aaa');
}
let [x9=f()]=[1];

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
// let [x = y, y = 1] = [];     // ReferenceError: y is not defined



/* 2.对象的解构赋值 */
// 变量名与属性名必须一致否则取值为undefined
let {q1,q2}={q1:'a',q2:'b'};
let {bar0,foo0,baz0}={foo0:'aaa',bar0:'bbb'}


let {fooa:baza}={fooa:'aaa'}; // 如果变量名与属性名不一致，必须写成下面这样。

let {foo9:foo9,bar9: bar9}={foo9:'a',bar9:'b'};

// 例：(等号左边：对象名是匹配模式,对象值是变量名)
const node={
  loc:{
    start:{
      line:1,
      column:5
    }
  }
};
let {loc,loc:{start},loc:{start:{line}}}=node;

// 嵌套复制的例子：
let obj={}, arr=[];
({foo:obj.prop,bar:arr[0]}={foo:123,bar:true});

// 对象的解构默认值
var {n=3}={};
var {num1,y7=5}={num1:1}
var {message:msg='something wet wrong'}={};

// 默认值生效的条件是，对象的属性值严格等于undefined
var {time1=3}={time1:undefined};
var {time2=3}={time2:null}

let {log,sin,cos}=Math;

/* 3.字符串的解构赋值 */
const [u,k]='hello';
let {length:len}='hello';

/* 4.数值和布尔值的解构赋值 */
let {toString:s}=123;
let {toString:t}=true;

/* 5.函数参数的解构赋值 */
function add([x,y]){
  return x+y;
}
add([1,2]);

[[1,2],[3,4]].map(([a,b])=>a+b);
// 默认值
function move({x=0,y=0}={}){
  return [x,y];
}
move({x:3,y:8});

[1,undefined,3].map((x='yes')=>x);

/* 6.圆括号问题 */

// 不能使用圆括号的情况

// 1.变量声明语句
/*
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };
*/

// 2.函数参数
/*
function f([(z)]) { return z; }
function f([z,(x)]) { return x; }
 */

// 3.赋值语句的模式
/*
({ p: a }) = { p: 42 };
([a]) = [5];
[({ p: a }), { x: c }] = [{}, {}];
 */

 // 可以使用圆括号的情况
 [(b)] = [3]; // 正确
 ({ p: (d) } = {}); // 正确
 [(parseInt.prop)] = [3]; // 正确

 /* 7.用途：变量解构赋值的用途 */

 // 1:交换变量的值
 let va1=1, va2=2;
 [va1,va2]=[va2,va1];

 // 2:从函数返回多个值
 // 返回数组
 function example(){
   return [1,2,3];
 }
 let [we1,we2,we3]=example();

 // 返回对象
 function example2(){
   return {
     ex1:1,
     ex2:2
   }
 }
 let {ex1,ex2}=example2();

 // 3:函数参数的定义
 function f1([x,y,z]){}
 f1([1,2,3]);
 function f2({x,y,z}){}
 f2({x:3,y:1,z:0});

 // 4:提取json数据
 let jsonData={
   id:42,
   status:'OK',
   item:[871,5468]
 }
 let {id,status,item:number}=jsonData;

 // 5:函数参数的默认值
 jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  }) {
    // ... do stuff
  };
 // 6:遍历Map结构
 const map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');
  for (let [key, value] of map) {
    console.log(key + " is " + value);
  }
  // 获取键名
  for (let [key] of map) {
    // ...
  }

  // 获取键值
  for (let [,value] of map) {
    // ...
  }
  let oop=1;

 // 7：输入模块的指定方法
 const { SourceMapConsumer, SourceNode } = require("source-map");

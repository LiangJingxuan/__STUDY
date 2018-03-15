"use strict";

/**
 * let和const命令
 *
 */

/* 1.let命令 */
{
  let a = 'hello';
  var b = 12;
}
// console.log(a);
// console.log(b);

for(let i=0;i<10;i++){

}
// console.log(i);
var a1 = [];
for(var i=0;i<10;i++){
  a1[i] = function(){
    // console.log(i);
  }
};
a1[6]();

var a2 = [];
for(let i=0;i<10;i++){
  a2[i] = function(){
    // console.log(i);
  }
};
a2[6]();

function func(){
  // let a = 10;
  var a = 3;
  // let a = 20;
}
function func1(arg){
  // let arg = 10;
}
function func2(arg){
  {
    let arg;
  }
}

/* 2.块级作用域 */
// 不使用块级作用域
var time=new Date();
function f(){
  // console.log(time);
  if(false){
    var time='hello time';
  }
}
f();

var s = 'hello';
for(var i=0;i<s.length;i++){
  // console.log(s[i]);
}
// console.log(i);

// 使用块级作用域
function f1(){
  let n=5;
  if(true){
    let n=10;
  }
  // console.log(n);
}
f1();

/* 3.const命令 */
const PI = 3.14;
// console.log(PI);
// PI=3.14159267;  不能修改
const URL='http://www.baidu.com';
if(true){
  // console.log(A);
  const A='a';
}
// console.log(A);

const B={};
B.prop=3;
// console.log(B.prop);
// B={};

const Arr=[];
Arr.push(123);
// console.log(Arr);
// Arr=[];

// 冻结对象
const Obj=Object.freeze({});
// Obj.todo=123;   报错
// 将对象属性冻结
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

/* 4.顶层对象的属性 */
var g=1;
console.log(window.g);
let g2=233;
console.log(window.g2);

/* 5.global 对象 */

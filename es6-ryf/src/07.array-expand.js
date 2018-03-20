"use strict";

/**
 * 数组的扩展
 * 
 */

 /* 1.扩展运算符 */
 // 例如：
 function push(array,...items){
 	array.push(...items)
 }

 function add(x,y){
 	return x+y;
 }
 const numbers=[4,38];
 add(...numbers);

 function f(v,w,x,y,z){}
 const args=[0,1];
 f(-1,...args,2,...[3]);

// 扩展运算符后面还可以放置表达式
let x;
 const arr=[
 	...(x>0?['a']:[]),
 	'b',
 ];

 // 如果扩展运算符后面是一个空数组，则不产生任何效果
 [...[],1];

 // 替代函数的 apply 方法

 // 例：简化求出一个数组最大元素
 // ES5写法
 Math.max.apply(null, [14, 3, 77]);
 // ES6写法
 Math.max(...[14, 3, 77]);

 // 例：将一个数组添加到另一个数组的尾部
 // ES5写法
 var arr1=[1,3,5],arr2=[2,4,8];
 Array.prototype.push .apply(arr1,arr2);
 // ES6写法
 arr1.push(...arr2);

 // 扩展运算符应用
 // 1）复制数组
 const a1=[1,3];
 // const a2=[...a1]; 方法一
 // const [...a2]=a1;  方法二

// 2）合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
[...arr1, ...arr2, ...arr3];

// 3）与解构赋值结合
const [first,...rest]=[0,1,2,3,4];

// 4）字符串
[...'hello']; // [ "h", "e", "l", "l", "o" ]

// 5）实现了 Iterator 接口的对象
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];

// 6）Map 和 Set 结构，Generator 函数
let map=new Map([
	[1,'one'],
	[2,'two'],
	[3,'three'],
]);
let arr4=[...map.keys()]; // [1,2,3]

/*const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]*/

/* 2.Array.from() */
// 将数组对象转为真正的数组
let arrayLike={
	'0':'a',
	'1':'b',
	'2':'c',
	length:3
};

// ES5写法
var arr5=[].slice.call(arrayLike); // ['a','b','c']
// ES6写法
let arr6=Array.from(arrayLike); // ['a', 'b', 'c']
// 使用：
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});
// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

/* 3.Array.of() */
// 用于将一组值，转换为数组
Array.of(1,2,3,4); // [3,11,8]
Array.of(3).length // 1

/* 4.数组实例的 copyWithin() */
// 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
// [1, 2, 3, 4, 5].copyWithin(0, 3)// [4, 5, 3, 4, 5]

// 例子：
// 将3号位复制到0号位
// [1, 2, 3, 4, 5].copyWithin(0, 3, 4)// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
// [1, 2, 3, 4, 5].copyWithin(0, -2, -1)// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
// [].copyWithin.call({length: 5, 3: 1}, 0, 3)// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
// [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]

/* 5.数组实例的 find() 和 findIndex() */
/*
	数组实例的find方法，用于找出第一个符合条件的数组成员。
	它的参数是一个回调函数，所有数组成员依次执行该回调函数，
	直到找出第一个返回值为true的成员，然后返回该成员。
	如果没有符合条件的成员，则返回undefined。
*/

 // find() 方法
var aa=[1,4,-5,10,-2].find((n)=>n<0); // -5
// console.log(aa);
var bb=[1,4,-5,10,-2].find((value,index,arr)=>value>9);
// console.log(bb);

// findIndex() 方法
var cc=[1,4,-5,10,-2].findIndex((value,index,arr)=>value>5);
// console.log(cc);

// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
let person={name:'lee',age:20}
var dd=[1,21,2,4].find(function (value,index,array){
	return value>this.age;
},person);
// console.log(dd);

/* 6.数组实例的 fill() */
// ['a', 'b', 'c'].fill(7) // [7, 7, 7]
// new Array(3).fill(7) // [7, 7, 7]

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
// ['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']

let arr7 = new Array(3).fill({name: "Mike"});
arr7[0].name = "Ben";
arr7
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr8 = new Array(3).fill([]);
arr8[0].push(5);
arr8
// [[5], [5], [5]]

/* 7.数组实例的 entries()，keys() 和 values() */
/*for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1*/
/*for (let elem of ['w', 'q'].values()) {
  console.log(elem);
}
// 'a'
// 'b'*/
/*for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"*/

/* 8.数组实例的 includes() */
// Array.prototype.includes方法返回一个布尔值，
// 表示某个数组是否包含给定的值，与字符串的includes方法类似
/*[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true*/

/* 9.数组的空位 */
Array.from(['a',,'b']) // [ "a", undefined, "b" ]
// [...['a',,'b']] // [ "a", undefined, "b" ]
// 由于空位的处理规则非常不统一，所以建议避免出现空位。
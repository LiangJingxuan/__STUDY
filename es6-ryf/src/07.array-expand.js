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

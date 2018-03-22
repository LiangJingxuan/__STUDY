"use strict";

/**
 * Promise 对象
 * 
 */

/* 1.Promise 的含义 */
// Promise 是异步编程的一种解决方案
// 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
// 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息
// Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理
// 
// Promise对象有以下两个特点:
// 1）对象的状态不受外界影响。Promise对象代表一个异步操作，
// 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
// 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
// 这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
// 
// 2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
// Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
// 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，
// 这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，
// 也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，
// 再去监听，是得不到结果的。

/* 2.基本用法 */
// ES6 规定，Promise对象是一个构造函数，用来生成Promise实例

var promise = new Promise(function (resolve, reject) {
	// ... some cod
	/*
 	if(){
 		resolve(value);
 	}else{
 		reject(error);
 	}
 */
});
// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function (value) {
	// success
}, function (error) {
	// failure
});

/* 3.Promise.prototype.then() */
/* 4.Promise.prototype.catch() */
/* 5.Promise.prototype.finally() */
/* 6.Promise.all() */
/* 7.Promise.race() */
/* 8.Promise.resolve() */
/* 9.Promise.reject() */
/* 10.应用 */
/* 11.Promise.try() */
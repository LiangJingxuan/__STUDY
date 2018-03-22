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
	if (true) {
		/* 异步操作成功 */
		resolve(value);
	} else {
		reject(error);
	}
});
// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function (value) {
	// success
}, function (error) {
	// failure
});
// 例:
function timeout(ms) {
	return new Promise(function (resolve, reject) {
		setTimeout(resolve, ms, 'done');
	});
};
timeout(100).then(function (value) {
	// console.log(value);
});
// Promise 新建后就会立即执行
var promise2 = new Promise(function (resolve, reject) {
	// console.log('promise+++++++');
	resolve();
});
promise2.then(function () {
	// console.log('resolve+++++++');
});
// console.log('ok+++++++');
// 执行结果：
// promise+++++++ // ok+++++++ // resolve+++++++

// 异步加载图片的例子:
function loadImageAsync(url) {
	return new Promise(function (resolve, reject) {
		var image = new Image();
		image.onload = function () {
			resolve(image);
		};
		image.onerror = function () {
			reject(new Error('Could not load image at' + url));
		};
		image.src = url;
	});
};
loadImageAsync('https://www.baidu.com/img/bd_logo1.png');

// 实现的 Ajax 操作的例子:
var getJSON = function getJSON(url) {
	var promise = new Promise(function (resolve, reject) {
		var handler = function handler() {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		};
		var client = new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = handler;
		client.responseType = 'json';
		client.setRequestHeader('Accept', 'application/json');
		client.send();
	});
	return promise;
};
getJSON('/post.json').then(function (json) {
	console.log('Contents:' + json);
}, function (error) {
	console.error('出错了', error);
});

// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，
// 后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。
// 所以，最好在它们前面加上return语句，这样就不会有意外。
var promise3 = new Promise(function (resolve, reject) {
	return resolve(1);
});

/* 3.Promise.prototype.then() */
// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
// 因此可以采用链式写法，即then方法后面再调用另一个then方法
// 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数
getJSON('/post.json').then(function (json) {
	return json.post;
}).then(function (post) {
	return true;
});
getJSON("/post/1.json").then(function (post) {
	return getJSON(post.commentURL);
}).then(function (comments) {
	return console.log("resolved: ", comments);
}, function (err) {
	return console.log("rejected: ", err);
});

/* 4.Promise.prototype.catch() */
// rejection 回调函数的别名
// 用于指定发生错误时的回调函数
getJSON('/post.json').then(function (post) {
	// ...
	console.log('响应成功', post);
}).catch(function (error) {
	// 处理 getJSON 和 前一个回调函数运行时发生的错误
	console.log('发生错误', error);
});
// then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获
var promise4 = new Promise(function (resolve, reject) {
	throw new Error('test error');
});
promise4.catch(function (error) {
	console.log(error);
});
// 一般来说，不要在then方法里面定义 Reject 状态的回调函数
// （即then的第二个参数），总是使用catch方法
// catch写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）
// catch方法之中，还能再抛出错误
someAsyncThing().then(function () {
	return someOtherAsyncThing();
}).catch(function (error) {
	console.log('oh no', error);
	// 下面一行会报错，因为y没有声明
	y + 2;
}).catch(function (error) {
	console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
// 上面代码中，第二个catch方法用来捕获，前一个catch方法抛出的错误

/* 5.Promise.prototype.finally() */
// 用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
promise.then(function (result) {}).catch(function (error) {}).finally(function () {});
// 例: 服务器使用 Promise 处理请求，然后使用finally方法关掉服务器
server.listen(port).then(function () {}).finally(server.stop);

/* 6.Promise.all() */
// 用于将多个 Promise 实例，包装成一个新的 Promise 实例
var p = Promise.all([p1, p2, p3]);
// 1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，
// 此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
// 2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，
// 此时第一个被reject的实例的返回值，会传递给p的回调函数
// 例:
// 生成一个Promise对象的数组
// 只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，
// 才会调用Promise.all方法后面的回调函数
var promiseAll = [2, 3, 5, 7, 11, 13].map(function (id) {
	return getJSON('/post/' + id + ".json");
});
Promise.all(promiseAll).then(function (posts) {}).catch(function (reason) {});
// p1会resolved，p2首先会rejected，但是p2有自己的catch方法，
// 该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。
// 该实例执行完catch方法后，也会变成resolved，
// 导致Promise.all()方法参数里面的两个实例都会resolved，
// 因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数
// 如果p2没有自己的catch方法，就会调用Promise.all()的catch方法
var p1 = new Promise(function (resolve, reject) {
	resolve('hello');
}).then(function (result) {
	return result;
}).catch(function (e) {
	return e;
});

var p2 = new Promise(function (resolve, reject) {
	throw new Error('报错了');
}).then(function (result) {
	return result;
}).catch(function (e) {
	return e;
}); // 如果没有catch就会调用all中的catch方法

Promise.all([p1, p2]).then(function (result) {
	return console.log(result);
}).catch(function (e) {
	return console.log(e);
}); // ["hello", Error: 报错了]

/* 7.Promise.race() */
// Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例
var p3 = Promise.race([p1, p2, p3]);
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
// 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
// 例: 如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve
var p4 = Promise.race([fetch('/resource-that-may-take-a-while'), new Promise(function (resolve, reject) {
	setTimeout(function () {
		return reject(new Error('request timeout'));
	}, 5000);
})]);
p4.then(console.log).catch(console.error);

/* 8.Promise.resolve() */
// 将现有对象转为 Promise 对象
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
// 四中情况的参数:
// 1) 参数是一个 Promise 实例:
// 不做任何修改、原封不动地返回这个实例
// 2) 参数是一个thenable对象:
// thenable对象指的是具有then方法的对象
// Promise.resolve方法会将这个对象转为 Promise 对象，
// 然后就立即执行thenable对象的then方法
var thenable = {
	then: function then(resolve, reject) {
		resolve(42);
	}
};
var p5 = Promise.resolve(thenable);
p5.then(function (value) {
	console.log(value); // 42
});
// 3）参数不是具有then方法的对象，或根本就不是对象
// 如果参数是一个原始值，或者是一个不具有then方法的对象，
// 则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
var p6 = Promise.resolve('Hello');
p6.then(function (s) {
	console.log(s);
});
// Hello
// 4）不带有任何参数
// 直接返回一个resolved状态的 Promise 对象。
// 如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法
var p7 = Promise.resolve();
p7.then(function () {
	// ...
});
// 立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，
// 而不是在下一轮“事件循环”的开始时
setTimeout(function () {
	console.log('three');
}, 0);
Promise.resolve().then(function () {
	console.log('two');
});
console.log('one');
// 运行结果: // one // two // three

/* 9.Promise.reject() */
// 返回一个新的 Promise 实例，该实例的状态为rejected
var p8 = Promise.reject('出错了');
// 等同于
var p9 = new Promise(function (resolve, reject) {
	return reject('出错了');
});
p9.then(null, function (s) {
	console.log(s);
});
// 出错了

/* 10.应用 */
// 加载图片
var preloadImage = function preloadImage(path) {
	return new Promise(function (resolve, reject) {
		var image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = path;
	});
};
// Generator 函数与 Promise 的结合
function getFoo() {
	return new Promise(function (resolve, reject) {
		resolve('foo');
	});
}
var g = /*#__PURE__*/regeneratorRuntime.mark(function g() {
	var foo;
	return regeneratorRuntime.wrap(function g$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.prev = 0;
					_context.next = 3;
					return getFoo();

				case 3:
					foo = _context.sent;

					console.log(foo);
					_context.next = 10;
					break;

				case 7:
					_context.prev = 7;
					_context.t0 = _context['catch'](0);

					console.log(_context.t0);

				case 10:
				case 'end':
					return _context.stop();
			}
		}
	}, g, this, [[0, 7]]);
});
function run(generator) {
	var it = generator();

	function go(result) {
		if (result.done) return result.value;

		return result.value.then(function (value) {
			return go(it.next(value));
		}, function (error) {
			return go(it.throw(error));
		});
	}
	go(it.next());
}
run(g);

/* 11.Promise.try() */
Promise.try(database.users.get({ id: userId })).then().catch();
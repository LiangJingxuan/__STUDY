"use strict";

/**
 * async 函数
 * 
 */

/*含义*/
// 是 Generator 函数的语法糖
// sync函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await

var asyncReadFile = async function asyncReadFile() {
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// asyncReadFile();
// async函数对 Generator 函数的改进:
// 1）内置执行器
// 2）更好的语义
// 3）更广的适用性
// 4）返回值是 Promise

/*基本用法*/
// async函数返回一个 Promise 对象，可以使用then方法添加回调函数
/*
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}
getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
*/
function timeout(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
asyncPrint('hello world', 0);

/*语法*/
// 返回 Promise 对象
// async函数内部return语句返回的值，会成为then方法回调函数的参数	
async function f() {
  return 'hello async';
};
f().then(function (v) {
  console.log(v);
}); // hello async

// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到
async function f2() {
  throw new Error('error ok');
};
f2().then(function (v) {
  return console.log(v);
}, function (e) {
  return console.log(e);
}); // error ok

// Promise 对象的状态变化
// async函数内部的异步操作执行完，才会执行then方法指定的回调函数

// await 命令
// await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象
async function f3() {
  return await 1;
};
f3().then(function (v) {
  console.log(v);
});

// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到
// 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行
async function f4() {
  await Promise.reject('error ...');
};
f4().then(function (v) {
  console.log(v);
}).catch(function (e) {
  console.log(e);
}); // error ...

// 前一个异步操作失败，也不要中断后面的异步操作:
async function f5() {
  try {
    await Promise.reject('出错了');
  } catch (e) {};
  return await Promise.resolve('async test');
};
f5().then(function (v) {
  console.log(v);
}); // async test
// 第二种方法：
async function f6() {
  await Promise.reject('出错了').catch(function (e) {
    return console.log(e);
  });
  return await Promise.resolve('hello world');
}
f6().then(function (v) {
  return console.log(v);
}); // 出错了 // hello world

// 错误处理
// 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject
async function f7() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch (e) {}
  return await 'hello world';
};
// 如果有多个await命令，可以统一放在try...catch结构中
async function main() {
  try {
    var val1 = await firstStep();
    var val2 = await secondStep(val1);
    var val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  } catch (err) {
    console.error(err);
  }
};
// 使用try...catch结构，实现多次重复尝试
/*
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
*/

// 使用注意点
// 1:把await命令放在try...catch代码块中

// 2:多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
// 写法一
// let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// 写法二
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromise;
// let bar = await barPromise;

// 3:await命令只能用在async函数之中，如果用在普通函数，就会报错

/*async 函数的实现原理*/
// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

/*与其他异步处理方法的比较*/
// 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值
async function chainAnimationsAsync(elem, animations) {
  var ret = null;
  try {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = animations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var anim = _step.value;

        ret = await anim(elem);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    ;
  } catch (e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
};

/*实例：按顺序完成异步操作*/
// 依次远程读取一组 URL，然后按照读取的顺序输出结果
async function logInOrder(urls) {
  // 并发读取远程URL
  var textPromises = urls.map(async function (url) {
    var response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = textPromises[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var textPromise = _step2.value;

      console.log((await textPromise));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
};

/*异步遍历器*/
// 异步遍历的接口
// 异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象
/*
asyncIterator
  .next()
  .then(
    ({ value, done }) =>''
  );
 */
// 异步遍历器的例子:
var asyncIterable = createAsyncIterable(['a', 'b']);
var asyncIterator = asyncIterable[Symbol.asyncIterator]();

asyncIterator.next().then(function (iterResult1) {
  console.log(iterResult1); // { value: 'a', done: false }
  return asyncIterator.next();
}).then(function (iterResult2) {
  console.log(iterResult2); // { value: 'b', done: false }
  return asyncIterator.next();
}).then(function (iterResult3) {
  console.log(iterResult3); // { value: undefined, done: true }
});

// for await...of
// 用于遍历异步的 Iterator 接口
/*
let body = '';
async function f() {
  for await(const data of req) body += data;
  const parsed = JSON.parse(body);
  console.log('got', parsed);
}
*/

// 异步 Generator 函数
// 异步 Generator 函数的作用，是返回一个异步遍历器对象
/*
async function* gen() {
  yield 'hello';
}
const genObj = gen();
genObj.next().then(x => console.log(x));
// { value: 'hello', done: false }
*/

// yield* 语句
// yield*语句也可以跟一个异步遍历器
/*
async function* gen1() {
  yield 'a';
  yield 'b';
  return 2;
}
async function* gen2() {
  // result 最终会等于 2
  const result = yield* gen1();
}
*/
"use strict";

/**
 * Generator 函数的异步应用
 * 
 */

/*1.传统方法*/
// 回调函数
// 事件监听
// 发布/订阅
// Promise 对象

/*2.基本概念*/
// 异步
// 回调函数
// Promise

/*3.Generator 函数*/
// 协程：多个线程互相协作，完成异步任务
// 协程的 Generator 函数实现
// Generator 函数的数据交换和错误处理
// 异步任务的封装

var _marked = /*#__PURE__*/regeneratorRuntime.mark(gen),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(g);

var fetch = require('node-fetch');
function gen() {
  var url, result;
  return regeneratorRuntime.wrap(function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = 'https://api.github.com/users/github';
          _context.next = 3;
          return fetch(url);

        case 3:
          result = _context.sent;

          console.log(result.bio);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
};
var g = gen();
var result = g.next();
result.value.then(function (data) {
  return data.json();
}).then(function (data) {
  g.next(data);
});

/*4.Thunk 函数*/
// Thunk 函数是自动执行 Generator 函数的一种方法
// 参数的求值策略
// Thunk 函数的含义
var thunk = function thunk() {
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
};
// JavaScript 语言的 Thunk 函数
var Thunk = function Thunk(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (callback) {
      return fn.call.apply(fn, [this].concat(args, [callback]));
    };
  };
};
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);

function f(a, cb) {
  cb(a);
}
var ft = Thunk(f);
ft(1)(console.log); // 1

// Thunkify 模块 

// Generator 函数的流程管理 
// Generator 函数gen会自动执行完所有步骤
var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});

// Thunk 函数的自动流程管理
function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}
function g() {
  return regeneratorRuntime.wrap(function g$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
run(g);
// 使用
var g = /*#__PURE__*/regeneratorRuntime.mark(function g() {
  var f1, f2, fn;
  return regeneratorRuntime.wrap(function g$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return readFileThunk('fileA');

        case 2:
          f1 = _context3.sent;
          _context3.next = 5;
          return readFileThunk('fileB');

        case 5:
          f2 = _context3.sent;
          _context3.next = 8;
          return readFileThunk('fileN');

        case 8:
          fn = _context3.sent;

        case 9:
        case 'end':
          return _context3.stop();
      }
    }
  }, g, this);
});
run(g);

/*5.co 模块*/
// co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行
// 基本用法
// co 模块的原理
// 基于 Promise 对象的自动执行
function run(gen) {
  var g = gen();
  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }
  next();
}
run(gen);

// co 模块的源码

// 处理并发的异步操作

// 实例：处理 Stream
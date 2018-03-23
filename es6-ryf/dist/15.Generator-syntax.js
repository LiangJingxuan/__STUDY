"use strict";

/**
 * Generator 函数的语法
 * 
 */

/* 1.简介 */
// 异步编程解决方案,返回指向内部状态的指针对象(遍历器对象)

var _marked = /*#__PURE__*/regeneratorRuntime.mark(helloWorldGenerator);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(function helloWorldGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello';

        case 2:
          _context.next = 4;
          return 'world';

        case 4:
          return _context.abrupt('return', 'ending');

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}
var hw = helloWorldGenerator();

/* 2.next 方法的参数 */
/* 3.for...of 循环 */
/* 4.Generator.prototype.throw() */
/* 5.Generator.prototype.return() */
/* 6.next()、throw()、return() 的共同点 */
/* 7.yield* 表达式 */
/* 8.作为对象属性的 Generator 函数 */
/* 9.Generator 函数的this */
/* 10.含义 */
/* 11.应用 */
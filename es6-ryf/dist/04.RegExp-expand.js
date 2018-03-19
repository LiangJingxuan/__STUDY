"use strict";

/**
 * 正则的扩展
 * 
 */

/* 1.RegExp构造函数 */

// 原有正则对象的修饰符是ig，它会被第二个参数i覆盖

new RegExp(/abc/ig, 'i').flags; // "i"

/* 2.字符串的正则方法 */
// 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
// ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上

/* 3.u 修饰符 */
// 用来正确处理大于\uFFFF的 Unicode 字符
/^(?:\uD83D(?![\uDC00-\uDFFF]))/.test('\uD83D\uDC2A'); // false
// /^\uD83D/.test('\uD83D\uDC2A') // true

/* 4.y 修饰符 */
// 作用 全局匹配

/* 5.sticky 属性 */
// 表示是否设置了y修饰符
var r = new RegExp('hello\\d', 'y');
r.sticky // true

/* 6.flags 属性 */
// 返回正则表达式的修饰符
// ES5 的 source 属性
// 返回正则表达式的正文
/ abc / ig.source
// "abc"
// ES6 的 flags 属性
// 返回正则表达式的修饰符
/ abc / ig.flags
// 'gi'

/* 7.s 修饰符：dotAll 模式 */
/ foo.bar / s.test('foo\nbar'); // true
var re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar'); // true
re.dotAll; // true
re.flags; // 's'

/* 8.后行断言 */

/* 9.Unicode 属性类 */

/* 10.具名组匹配 */
// 正则表达式使用圆括号进行组匹配
var RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
var matchObj = RE_DATE.exec('1999-12-31');
var year = matchObj[1]; // 1999
var month = matchObj[2]; // 12
var day = matchObj[3]; // 31

var RE_DATE2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
var matchObj2 = RE_DATE.exec('1999-12-31');
var year2 = matchObj.groups.year; // 1999
var month2 = matchObj.groups.month; // 12
var day2 = matchObj.groups.day; // 31

/* 11.解构赋值和替换 */
/*let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar*/

/* 12.String.prototype.matchAll */
"use strict";

/**
 * 字符串的扩展
 * ES6 加强了对 Unicode 的支持，并且扩展了字符串对象
 */

/* 1.字符的Unicode表示法 */
"\u0061";
"\uD842\uDFB7";
"\u20BB7";
"\u{20BB7}";
"\u{41}\u{42}\u{43}";

let hello=123;
hell\u{6F}
'\u{1F680}' === '\uD83D\uDE80';
/*
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
*/

/* 2.codePointAt() */
let str='𠮷a';
s.codePointAt(0); // 134071
s.codePointAt(1); // 57271
s.codePointAt(2); // 97
s.codePointAt(2).toString(16); // 61

// 检测一个字符由两个字节还是由四个字节组成
function is32Bit(c){
	return c.codePointAt(0) > 0xFFFF;
}
is32Bit('𠮷'); // true
is32Bit('a'); // false

/* 3.String.fromCodePoint() */
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true

/* 4.字符串的遍历器接口 */


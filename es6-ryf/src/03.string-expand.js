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
str.codePointAt(0); // 134071
str.codePointAt(1); // 57271
str.codePointAt(2); // 97
str.codePointAt(2).toString(16); // 61

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
for(let str of 'foo'){
	// console.log(str);
}

let text = String.fromCodePoint(0x20BB7);
// 识别大于0xFFFF的码点
for(let i=0;i<text.length;i++){
	// console.log(text[i]);
}
for(let i of text){
	// console.log(i);
}

'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
/* 5.at() */
// 'abc'.at(0); // "a"
// '𠮷'.at(0) // "𠮷"

/* 6.normalize() */
'\u01D1'.normalize() === '\u004F\u030C'.normalize(); // true

/* 7.includes(), startsWith(), endsWith() */
var str2='liang';
var res=str2.indexOf('a');
// console.log(res);

let s='hello world';
var r2=s.startsWith('e'); // 参数字符串是否在原字符串头部
// console.log(r2);
var r3=s.endsWith('rl'); // 参数字符串是否在原字符的尾部
// console.log(r3);
var r4=s.includes('w'); // 是否找到了参数字符串
// console.log(r4);
// 三个方法都支持第二个参数 表示开始搜索的位置
var r5=s.startsWith('world',6); // 从索引是6的位置上
// console.log(r5); 

/* 8.repeat() */
// 返回新字符串 表示原字符串重复n次
var r6='l'.repeat(7);
// console.log(r6);

/* 9.padStart()，padEnd() */
// 字符串长度不全用来补全头部或尾部
var r7='x'.padStart(5,'ac');
var r8='x'.padEnd(5,'ac');
// console.log(r8);
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

/* 10.matchAll() */
// 返回一个正则表达式在当前字符串的所有匹配

/* 11.模板字符串 */
let va1='string world';
var r9=`hello ${va1} !`;
// console.log(r9);
let num1=1, num2=2;
`${num1}+${num2}=${num1+num2}`;

function fn1(){
	return 'hello world';
}
`foo ${fn1()} bar`;

/* 12.实例：模板编译 */
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';

/* 13.标签模板  */
// 函数调用的一种特殊形式
// console.log`hello tpl`;
// “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
let sender = '<script>alert("abc")</script>'; // 恶意代码
let messageRes = SaferHTML`<p>${sender} has sent you a message.</p>`;

// message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>

tag`First line\nSecond line`

function tag(strings) {
  console.log(strings.raw[0]);
  // strings.raw[0] 为 "First line\\nSecond line"
  // 打印输出 "First line\nSecond line"
}

/* 14.String.raw() */
String.raw`Hi\n${2+3}!`;
// 返回 "Hi\\n5!"

String.raw`Hi\u000A!`;
// 返回 "Hi\\u000A!"

String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);

/* 15.模板字符串的限制 */


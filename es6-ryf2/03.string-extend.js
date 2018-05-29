/*字符串的扩展*/

// 1. 字符的 Unicode 表示法
'\u0061'; // a
'\u{20BB7}'; // "𠮷"


// 2. codePointAt()
// 能够正确处理 4 个字节储存的字符，返回一个字符的码点。
let s = '𠮷a';
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97


// 3. String.fromCodePoint() 
// 可以识别大于0xFFFF的字符


// 4. 字符串的遍历器接口
for(let codePoint of 'foo'){
	console.log(codePoint);
}
// "f"
// "o"
// "o"


// 5. at()
// 可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符。
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"


// 6. normalize()


// 7. includes(), startsWith(), endsWith() 
// 这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true


// 8. repeat()
// repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3); // 'xxx'
'hello'.repeat(2); // 'hellohello'
'na'.repeat(0); // ''


// 9. padStart()，padEnd()
// 如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。


// 10. matchAll()


// 11.模板字符串
let str=`There are <b> ${basket.count} </b> items
   in your basket, <em> ${basket.onSale} </em>
  are on sale!`;

let html=`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`;

// 去除换行
let html2=`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim();

// 模板字符串之中还能调用函数。
function fn(){
	return 'hello world';
}
`foo ${fn()} bar`;


// 13. 标签模板



// 14. String.raw() 

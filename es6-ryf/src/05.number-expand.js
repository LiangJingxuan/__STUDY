"use strict";

/**
 * 数值的扩展
 * 
 */

 /* 1.二进制和八进制表示法 */
 // 二进制和八进制新的表示法
 0b111110111 === 503 // true
 0o767 === 503 // true
 Number('0b111')  // 7
 Number('0o10')  // 8

 /* 2.Number.isFinite(), Number.isNaN() */
 // Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// Number.isNaN()用来检查一个值是否为NaN
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true

// 3.Number.parseInt(), Number.parseFloat()
// ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
Number.paseInt === parsInt // true
Number.paseFloat === paseFloat // true

/* 4.Number.isInteger() */
// 判断一个值是否为整数, 不是数值全部返回false
Number.isInteger(25); // true
Number.isInteger(25.0); // true
Number.isInteger(25.1); // false

/* 5.Number.EPSILON  */
// 根据规格，它表示 1 与大于 1 的最小浮点数之间的差
Number.EPSILON === Math.pow(2, -52)// true
Number.EPSILON// 2.220446049250313e-16
Number.EPSILON.toFixed(20)// "0.00000000000000022204"
// 误差检查函数
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true
1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true

/* 6.安全整数和 Number.isSafeInteger() */
// ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1// true
Number.MAX_SAFE_INTEGER === 9007199254740991// true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER// true
Number.MIN_SAFE_INTEGER === -9007199254740991// true

// Number.isSafeInteger()用来判断一个整数是否落在这个范围之内。
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

/* 7.Math 对象的扩展 */
// ES6新增了17个数学方法
// 1.trunc() 去除一个数的小数 返回整数部分
Math.trunc(4.1); // 4
Math.trunc(-4.5); // -4
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

// 2.sign() 用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

// 3.cbrt() 计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

// 4.clz32() 返回一个数的 32 位无符号整数形式有多少个前导 0
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

// 5.imul() 返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4

// 6.fround() 返回一个数的32位单精度浮点数形式
Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215

// 7.hypot() 返回所有参数的平方和的平方根
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

// 8.expm1(x)返回 ex - 1
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045

// 9.log1p(x)方法返回1 + x的自然对数
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN

// 10.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5

// 11.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29

/*
ES6 新增了 6 个双曲函数方法。
Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
*/

/* 8.指数运算符 */
// ES2016 新增了一个指数运算符（**）。
2 ** 2 // 4
2 ** 3 // 8
// 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
let a = 1.5;
a **= 2;// 等同于 a = a * a;

let b = 4;
b **= 3;// 等同于 b = b * b * b;
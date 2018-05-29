/*数值的扩展*/

// Number.isFinite() 用来检查一个数值是否为有限的（finite），即不是Infinity
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// Number.isNaN() 用来检查一个值是否为NaN
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true


// Number.parseInt(), Number.parseFloat()
// ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true


// Number.isInteger() 用来判断一个数值是否为整数
// 如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false


// Number.EPSILON
// ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"


// 安全整数和 Number.isSafeInteger() 


// Math 对象的扩展

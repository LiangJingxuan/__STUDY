/* 构造器属性 */

//	当我们创建对象时，实际上同时也赋予了该对象一种特殊的属性：构造器属性。 该属性实际上是一个指向用于创建对象的构造器函数的引用。
function Hero(name){
	this.name=name;
}
var h2=new Hero('Michelangelo');
// console.log(h2.constructor);	// Hero(name)

// 由于构造器属性所引用的是一个函数，因此我们也可以利用它来创建一个其他新对象。
// 无论h2有没有被创建，我们都可以用它来创建另一个对象
var h3=new h2.constructor('Rafaello');
// console.log(h3.name);

// 如果对象是通过对象文本标识法创建的 实际上它就是由内建构造函数Object()函数所创建的。
var o={}
// console.log(o.constructor); // Object()



/* instanceof操作符 */

// 通过instanceof操作符，可以测试一个对象是不是由某个指定的构造器函数所创建的。
// 这里的函数名后面没有加括号：[ Hero() ]，因为这里不是函数调用，只需要向使用其他变量一样，引用其他变量名字。
h2 instanceof Hero; // true
o instanceof Hero; // true



/* 返回对象的函数 */

// 构造器返回对象
function C1(){
	this.a=1;
	return {
		b:2
	}
}
var c=new C1();
// console.log(c.a); // undefined
// console.log(c.b); // 2



/* 传递对象 */

// 当拷贝某个对象或者将它传递给某个函数时，往往传递的都是该对象的引用。因此在引用上做的任何改动，都会影响所引用的原对象。
var original={howany:1};
var copy=original;
// console.log(copy.howany); // 1
copy.howany=2;
// console.log(copy.howany); // 2
// console.log(original.howany); // 2

// 将对象传递给函数也会影响所引用的原对象。
var nullify=function(o){o.howany=0}
nullify(original);
// console.log(original.howany); // 0



/* 对象比较 */

var o1={};
var o2={};

o1===o2; // false
o1==o2; // false

var o3=o1;
o3===o1; // true
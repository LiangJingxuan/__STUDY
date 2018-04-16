// 作用域

/*
	作用域（scope）是结构化编程语言中的重要概念，它决定了变量的可见范围和生命周
	期，正确使用作用域可以使代码更清晰、易懂。作用域可以减少命名冲突，而且是垃圾回收
	的基本单元。
*/

// 函数作用域

// 例1
var v1='v';
var v2 = function(){
	console.log(v1);
};
v2();

var f2 = function(){
	var f1='scope';
	console.log(f1);
};
f2();

// 例2
// 变量提升
var scope='global';
var f = function(){
	console.log(scope);
	var scope='sc';
}
f();

// 函数作用域的嵌套

/*
	函数作用域的嵌套关系是定义时决定的，而不是调用时决定的，也就
	是说，JavaScript 的作用域是静态作用域，又叫词法作用域，这是因为作用域的嵌套关系可
	以在语法分析时确定，而不必等到运行时确定。
*/
var obj=function(){
	var scope = 'o';
	(function(){
		var scope='obj';
		(function(){
			console.log(scope);
		})();
	})()
};
obj();



/*
	通过 f2 调用的 f1 在查找 scope 定义时，找到的是父作用域中定义
	的 scope 变量，而不是 f2 中定义的 scope 变量。这说明了作用域的嵌套关系不是在调用
	时确定的，而是在定义时确定的。
 */

var rootScope='root';
var fn = function(){
	console.log(rootScope);
};
fn();

var fn2 = function(){
	var rootScope = 'scope';
	fn();
};
fn2();





// 全局作用域

/*
	在 JavaScript 中有一种特殊的对象称为 全局对象。这个对象在Node.js 对应的是 global
	对象，在浏览器中对应的是 window 对象。由于全局对象的所有属性在任何地方都是可见的，
	所以这个对象又称为 全局作用域。全局作用域中的变量不论在什么函数中都可以被直接引
	用，而不必通过全局对象。

	变量属于全局作用域的条件：
	在最外层定义的变量；
	全局对象的属性；
	任何地方隐式定义的变量（未定义直接赋值的变量）。

	需要格外注意的是第三点，在任何地方隐式定义的变量都会定义在全局作用域中，即不
	通过 var 声明直接赋值的变量。这一点经常被人遗忘，而模块化编程的一个重要原则就是
	避免使用全局变量，所以我们在任何地方都不应该隐式定义变量。
 */




 // 闭包

 // JavaScript 中每个的函数都是一个闭包，但通常意义上嵌套的函数更能够体现出闭包的特性
 var generateClosure = function(){
 	var count=0;
 	var get = function(){
 		count++;
 		return count;
 	};
 	return get;
 };

 var counter=generateClosure();
 console.log(counter(),counter(),counter());

// 当一个函数返回它内部定义的一个函数时，就产生了一个闭包，闭包不但包括被返回的函数，还包括这个函数的定义环境。
// 当函数generateClosure() 的内部函数 get 被一个外部变量 counter 引用时，counter 和generateClosure() 的局部变量就是一个闭包。如

var counter1 = generateClosure();
var counter2 = generateClosure();
console.log(counter1()); // 输出 1
console.log(counter2()); // 输出 1
console.log(counter1()); // 输出 2
console.log(counter1()); // 输出 3
console.log(counter2()); // 输出 2

/*
	这个例子解释了闭包是如何产生的：counter1 和 counter2 分别调用了 generate-
	Closure() 函数，生成了两个闭包的实例，它们内部引用的 count 变量分别属于各自的
	运行环境。我们可以理解为，在 generateClosure() 返回 get 函数时，私下将 get 可
	能引用到的 generateClosure() 函数的内部变量（也就是 count 变量）也返回了，并
	在内存中生成了一个副本，之后 generateClosure() 返回的函数的两个实例 counter1
	和 counter2 就是相互独立的了。
*/




// 闭包的用途

// 1.嵌套的回调函数
// 2. 实现私有成员




// 对象
// 基于原型的面向对象

// 创建和访问
var foo={};
foo.prop_1='bar';
foo.prop_2=false;
foo.prop_3=function(){
	return 'hello object';
};
console.log(foo.prop_3());

// 1. 使用关联数组访问对象成员
foo['prop_1']='bar';
foo['prop_2']=true;
foo['prop_3']=function(){
	return 'ok';
};
var some_prop = 'prop2';
foo[some_prop] = false;

// 2. 使用对象初始化器创建对象
var fobj={
	prop_1:'bar',
	prop_2:false,
	prop_3:function(){
		return 0;
	}
};


// 构造函数
function User(name,url){
	this.name=name;
	this.url=url;
	this.display=function(){
		console.log(this.name);
	}
}
var someuser=new User('byvoid','http://www.byvoid.com');

// 上下文对象

/*
	在 JavaScript 中，上下文对象就是 this 指针，即被调用函数所处的环境。上下文对象
	的作用是在一个函数内部引用调用它的对象本身，JavaScript 的任何函数都是被某个对象调
	用的，包括全局对象，所以 this 指针是一个非常重要的东西。
*/

var someuser={
	name:'byvoid',
	dispaly:function(){
		console.log(this.name);
	}
};
someuser.dispaly();	// 输出 byvoid

var foo={
	bar:someuser.dispaly,
	name:'foobar'
};
foo.bar(); // 输出 foobar

/*
	使用不同的引用来调用同一个函数时，this 指针永远是这个引
	用所属的对象。在前面的章节中我们提到了 JavaScript 的函数作用域是静态的，也就是说一
	个函数的可见范围是在预编译的语法分析中就可以确定的，而上下文对象则可以看作是静态
	作用域的补充。
*/



// 1. call 和 apply
// call 和 apply 的功能是以不同的对象作为上下文来调用某个函数，允许一个对象去调用另一个对象的成员函数

// 语法
// func.call(thisArg[, arg1[, arg2[, ...]]])
// func.apply(thisArg[, argsArray])
// func 是函数的引用，thisArg 是 func 被调用时的上下文对象，arg1、arg2 或argsArray 是传入 func 的参数。


// call 的工作机制：
var someuser = {
	name:'byvoid',
	dispaly:function(words){
		console.log(this.name+'says'+words);
	}
};

var foo = {
	name:'foobar'
};

someuser.dispaly.call(foo,'hello');  // 输出 foobar says hello




// 2. bind
// bind 方法来永久地绑定函数的上下文，使其无论被谁调用，上下文都是固定的

// 语法
// func.bind(thisArg[, arg1[, arg2[, ...]]])
// 其中 func 是待绑定函数，thisArg 是改变的上下文对象，arg1、arg2 是绑定的参数表。bind 方法返回值是上下文为 thisArg 的 func。

var someuser={
	name:'byvoid',
	func:function(){
		console.log(this.name);
	}
};
var foo={
	name:'foobar'
};

foo.func=someuser.func;
foo.func(); // 输出 foobar

foo.func1=someuser.func.bind(someuser);
foo.func1(); // 输出 byvoid

func=someuser.func.bind(foo);
func(); // 输出 foobar

func2=func;
func2(); // 输出 foobar



// 3. 使用 bind 绑定参数表

var person={
	name:'byvoid',
	says:function(act,obj){
		console.log(this.name+' '+act+' '+obj);
	}
};

person.says('hate','diivtb'); // 输出 byvoid hate diovyb

byvoidHate = person.says.bind(person,'hate');
byvoidHate('you'); 	// 输出 byvoid hate you

// byvoidLoves 将 this 指针绑定到了 person，并将第一个参数绑定到loves，之后在调用 byvoidLoves 的时候，只需传入第三个参数。
// 这个特性可以用于创建一个函数的“捷径”，之后我们可以通过这个“捷径”调用，以便在代码多处调用时省略重复输入相同的参数。



// 4. 理解 bind




// 原型

// 使用原型和构造函数共同生成对象
function Person(){};

Person.prototype.name='byvoid';
Person.prototype.showName=function(){
	console.log(this.name);
};

var p=new Person();
p.showName();

// 上面这段代码使用了原型而不是构造函数初始化对象。这样做与直接在构造函数内定义属性有什么不同呢：

	// 构造函数内定义的属性继承方式与原型不同，子对象需要显式调用父对象才能继承构造函数内定义的属性。
	// 构造函数内定义的任何属性，包括函数在内都会被重复创建，同一个构造函数产生的两个对象不共享实例。
	// 构造函数内定义的函数有运行时闭包的开销，因为构造函数内的局部变量对其中定义的函数来说也是可见的。

function Foo(){
	var innerVal='foo';
	this.prop1='byvoid';
	this.func1=function(){
		innerVal='';
	}
};

Foo.prototype.prop2='bar';
Foo.prototype.func2=function(){
	console.log(this.prop2);
};

var foo1=new Foo();
var foo2=new Foo();

console.log(foo1.func1===foo2.func1); // false
console.log(foo1.func2===foo2.func2); // true

// 除非必须用构造函数闭包，否则尽量用原型定义成员函数，因为这样可以减少开销。
// 尽量在构造函数内定义一般成员，尤其是对象或数组，因为用原型定义的成员是多个实例共享的。






// 原型链
function Foo() {
}
Object.prototype.name = 'My Object';
Foo.prototype.name = 'Bar';
var obj = new Object();
var foo = new Foo();
console.log(obj.name); // 输出 My Object
console.log(foo.name); // 输出 Bar
console.log(foo.__proto__.name); // 输出 Bar
console.log(foo.__proto__.__proto__.name); // 输出 My Object
console.log(foo.__proto__.constructor.prototype.name); // 输出 Bar







// 对象的复制
"use strict";

/**
 * Class 的继承
 * 
 */

/*简介*/
// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多
class Point{
	constructor(x, y) {
	   this.x = x;
	   this.y = y;
	}
}
// super关键字，它在这里表示父类的构造函数，用来新建父类的this对象
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错
// 因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工
// 如果不调用super方法，子类就得不到this对象
// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错
class ColorPoint extends Point{
	constructor(x,y,clolr){
		super(x,y); // 调用父类的constructor(x, y)
		this.color = color;
	}
	toString(){
		return this.color + ' ' + super.toString(); // 调用父类的toString()
	}
}
// 生成子类实例的代码
let cp=new ColorPoint(25,8,'red');
cp instanceof ColorPoint; // true
cp instanceof Point; // true

// 父类的静态方法，也会被子类继承
// hello()是A类的静态方法，B继承A，也继承了A的静态方法
class A {
  static hello() {
    console.log('hello world');
  }
}
class B extends A {
}
B.hello()  // hello world

/*Object.getPrototypeOf()*/
// 可以用来从子类上获取父类
// 因此，可以使用这个方法判断，一个类是否继承了另一个类
Object.getPrototypeOf(ColorPoint)===Point; // true

/*super 关键字*/
// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

// 第一种情况，super作为函数调用时，代表父类的构造函数
// ES6 要求，子类的构造函数必须执行一次super函数
class AA{}
class BB extends AA{
	constructor(){
		super();
	}
}
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例
// 即super内部的this指的是B
// 因此super()在这里相当于A.prototype.constructor.call(this)
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错

// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
// 如果属性定义在父类的原型对象上，super就可以取到
class A2{
	p(){
		return 2;
	}
}
class B2 extends A2{
	constructor(){
		super();
		console.log(super.p());
	}
}
let b=new B2();
// 通过super调用父类的方法时，方法内部的this指向当前的子类实例
class A3{
	constructor(){
		this.x=1;
	}
	print(){
		console.log(this.x);
	}
}
class B3 extends A3{
	constructor(){
		super();
		this.x=2;
	}
	m(){
		super.print();
	}
}
let b3=new B3();
b3.m(); // 2
// 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字

/*类的 prototype 属性和__proto__属性*/
// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
// 1）子类的__proto__属性，表示构造函数的继承，总是指向父类
// 2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
class A4 {
}
class B4 extends A {
}
B4.__proto__ === A4 // true
B4.prototype.__proto__ === A4.prototype // true

Object.create(A4.prototype);
// 等同于
B4.prototype.__proto__ = A4.prototype;

// extends 的继承目标
// extends关键字后面可以跟多种类型的值

// A，只要是一个有prototype属性的函数，就能被B继承
// 由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数
class K2 extends A{}

// 子类继承Object类
// 这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例
class K1 extends Object {
}
K1.__proto__ === Object // true
K1.prototype.__proto__ === Object.prototype // true

// 不存在任何继承
// A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype
// A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性
class A7 {
}
A7.__proto__ === Function.prototype // true
A7.prototype.__proto__ === Object.prototype // true

// 子类继承null
// A也是一个普通函数，所以直接继承Function.prototype
// A调用后返回的对象不继承任何方法，所以它的__proto__指向Function.prototype
class A8 extends null {
}
A8.__proto__ === Function.prototype // true
A8.prototype.__proto__ === undefined // true

// 实例的 __proto__ 属性
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性
// 也就是说，子类的原型的原型，是父类的原型
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
// 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
// ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};
p1.printName() // "Ha"

/*原生构造函数的继承*/
// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构
// 原生构造函数大致有下面这些
Boolean()
Number()
String()
Array()
Date()
Function()
RegExp()
Error()
Object()

// ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，
// 然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承

// 继承Array的例子:
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}
var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined

// extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构

// 定义一个带版本功能的数组:
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]

// 自定义Error子类的例子，可以用来定制报错时的行为:
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...

// 继承Object的子类，有一个行为差异
// NewObj继承了Object，但是无法通过super方法向父类Object传参
// 这是因为 ES6 改变了Object构造函数的行为，
// 一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false

/*Mixin 模式的实现*/
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口
const a1={
	a:'a'
};
const b1={
	b:'b'
};
// const c1={...a1,...b1};   // {a: 'a', b: 'b'}

// 将多个对象合成为一个类。使用的时候，只要继承这个类即可
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  };

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  };
}

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
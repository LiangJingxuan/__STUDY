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
// 如果属性定义在父类的原型对象上，super就可以取到+++++++++++++

/*类的 prototype 属性和__proto__属性*/
/*原生构造函数的继承*/
/*Mixin 模式的实现*/
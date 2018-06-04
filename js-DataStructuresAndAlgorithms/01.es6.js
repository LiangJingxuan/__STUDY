/*使用类进行面向对象编程*/

// es5写法：
function Book(title,pages,isbn){
	this.title=title;
	this.pages=pages;
	this.isbn=isbn;
}
Book.prototype.printTitle=function(){
	console.log(this.title);
}
var jsBook=new Book('javascript',100,true);
jsBook.printTitle();


// es6写法：
class Student{
	constructor(name,age,sex){
		this.name=name;
		this.age=age;
		this.sex=sex;
		this.printAge=function(){
			console.log(this.age);
		}
	};
	printName(){
		console.log(this.name);
	};
}
let amyStudent=new Student('amy',21,'female');
amyStudent.printAge();
amyStudent.printName();



// 继承

/**
 * super关键字： 
 * super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
 * 
 * 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
 * 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B
 * 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
 *
 * 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
 * 注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
 *  
 */
class oemStudent extends Student{
	constructor(name,age,sex,technology){
		super(name,age,sex);
		this.technology=technology;
	};
	printTechnology(){
		console.log(this.technology);
	};
}
let oem=new oemStudent('oem',18,'female','photoshop');
console.log(oem.name);
oem.printTechnology();
oem.printAge();

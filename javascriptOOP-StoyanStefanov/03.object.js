/* 内建对象 */

// Object****
var obj=new Object();
// console.log(obj.toString()); // toString()方法，返回该对象的描述字符串。
// console.log(obj.valueOf()); // 返回对象本身

// Array****
var array=new Array();
// console.log(typeof array); // Object
// 由于数组也是对象，那么就说明也继承了Object的所有方法和属性
/*console.log(
	array.toString(),
	array.valueOf(),
	array.constructor
)*/

// Function****
// 与其他对象不同的是，函数对象中含有一个构造器属性，其引用的就是Function()构造器函数

function fn(){

}
// console.log(fn.constructor);

// Function对象中也有一个length属性，用于记录该函数所拥有的参数数量。

// Function对象的方法

// call() apply() ：能让对象去借用其他对象中的方法，为己所用。这是一种重用代码的方式。

var some_obj={
	name:'Ninja',
	say:function(name){
		return 'Haya'+name+', I am a'+this.name;
	}
}

var my_obj={
	name: 'Scripting guru'
}

// 使用call()，将say()方法当做自身的方法来调用

var res=some_obj.say.call(my_obj,'Dude');
// console.log(res);

// 由于在调用say()函数的对象方法call()时传递了两个参数，对象my_obj和字符串'Dude'，
// 当say()被调用时，其中的this就被自动设置成my_obj对象的引用。

// apply()与call()的区别在于参数的传递形式为数组

var res2=some_obj.say.apply(my_obj,['Dude']);
// console.log(res2);

// arguments对象
// callee属性：该属性引用的是当前被调用的函数对象。

// 实现匿名函数的递归调用：
(function(count){
	if(count<5){
		// console.log(count);
		arguments.callee(++count);
	}
})(1);
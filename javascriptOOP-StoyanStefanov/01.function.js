/*
	函数-闭包
*/

// 利用闭包突破作用域链

// 闭包#1
function f(){
	var b='b';
	return function (){
		return b;
	}
}
// console.log(f()());

// 闭包#2
var n;
function f2(){
	var b='b2';
	n=function(){
		return b;
	}
}
f2();
// console.log(n());

// 相关定义与闭包3#
function f(arg){
	var n=function(){
		return arg;
	}
	arg++;
	return n;
}
// console.log(f(1)());

// 循环中的闭包
/*
	这里创建三个闭包，他们都指向一个共同的局部变量i，但是闭包并不会记录他们的值，
	所拥有的的只有一个i的连接(即引用)，因此只能返回i当前值，当循环结束时i为3，所有这三个函数都指向这一共同值
*/
function f3(){
	var a=[];
	for(var i=0;i<3;i++){
		a[i]=function(){
			return i;
		}
	}
	return a;
}

// console.log(f3());
var a=f3();
/*console.log(a[0]());
console.log(a[1]());
console.log(a[2]());*/

/*
	每次循环在一个自执行函数中返回，这里每次循环形参x会有一个i的拷贝，而引用时，是对形参x的引用，
	所以得到正确结果0,1,2

	// 来自网络解释
	这里for循环执行时，给点击事件绑定的匿名函数传递i后立即执行返回一个内部的匿名函数，
	因为参数是按值传递的，所以此时形参num保存的就是当前i的值,然后赋值给局部变量 a，
	然后这个内部的匿名函数一直保存着a的引用，也就是一直保存着当前i的值。 
	所以循环执行完毕后点击每个li，返回的匿名函数执行弹出各自保存的 a 的引用的值。
*/
function f4(){
	var a=[];
	for(var i=0;i<3;i++){
		a[i]=(function(x){
			return function(){
				return x;
			}
		})(i)
	}
	return a;
}
var fn=f4();
/*console.log(fn[0]());
console.log(fn[1]());
console.log(fn[2]());*/

// Getter与Setter
/*
	假设有一个特殊区间的变量，不想暴露给外部。在提供两个函数进行读取和设置	
*/
var getValue,setValue;
(function(){
	var secret=0;
	getValue=function(){
		return secret;
	};
	setValue=function(v){
		secret=v;
	}
})();

/*console.log(getValue());
setValue(12);
console.log(getValue());*/

// 迭代器
/*
	通常情况下，我们都知道如何利用循环来遍历一个简单数组，但是有时候我们需要面对更为复杂的数据结构，
	他们通常会有着与数组截然不同的序列规则，这时候需要将"下一个"的复杂逻辑封装成易于使用的next()函数
*/
// 接受数组输入的初始函数，我们在其中定义了一个私有指针，该指针会始终指向数组中的下一个元素：
function setup(array){
	var i=0;
	return function (){
		if(i<array.length){
			return array[i++]
		}else{
			i=0;
			return '循环结束，刷新页面从新开始...'
		}
	}
}
// 现在需要一组数据来调用setup()，就会创建出我们所需要的next()方法：
var arr=['1,2,3,4,5,6','1,2,3','1,2,3,4'];
var next=setup(arr);

setInterval(function(){
	console.log(next());
},10000);

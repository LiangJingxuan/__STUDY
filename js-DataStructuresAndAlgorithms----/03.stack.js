/*栈*/

// 栈是一种遵从后进先出（LIFO）原则的有序集合。


// 创建栈: 创建一个类来表示栈
function Stack(){
	
	// 要一种数据结构来保存栈里的元素
	let items = [];

	// 向栈添加元素
	this.push = function(element){
		items.push(element);
	}

	// 从栈移除元素
	this.pop = function(){
		return items.pop();
	}

	// 查看栈顶元素
	this.peek = function(){
		return items[items.length-1];
	}

	// 检查栈是否为空
	this.isEmpty = function(){
		return items.length === 0;
	}
	this.size = function(){
		return items.length;
	}

	// 清空和打印栈元素
	this.clear = function(){
		items=[];
	}

	// 把栈里的元素都输出到控制台
	this.print = function(){
		console.log(items.toString());
	}

}


// 使用Stack类
/*let stack=new Stack();
console.log(stack.isEmpty()); //输出为true

stack.push(5);
stack.push(8);

console.log(stack.peek()); //输出8 因为它是往栈里添加的最后一个元素

stack.push(11);
console.log(stack.size()); //输出3
console.log(stack.isEmpty()); // 输出false

stack.push(15);

stack.pop();
stack.pop();

console.log(stack.size()); //输出2
stack.print(); //输出[5, 8]*/




// 用ES6 语法声明Stack 类
/*class Stack{
	constructor(){
		this.item=[];
	}
	push(element){
		this.item.push(element);
	}
}*/





// 使用栈

// 从十进制转二进制
// 要把十进制转化成二进制，可以将该十进制数字和2整除（二进制是满二进一），直到结果是0为止
// (10/2=5)=0 (5/2=2)=1 (2/2=1)=0 (1/2=0)=1 : 1010(后进先出)

/*
当结果满足和2做整除的条件时，我们会获得当前结果和2的余数，
放到栈里。然后让结果和2做整除。另外请注意：JavaScript有数字类型，
但是它不会区分究竟是整数还是浮点数。因此，要使用Math.floor函数让除法的操作仅返回整
数部分。最后，用pop方法把栈中的元素都移除，把出栈的元素变成连接成字符串。
*/
function divideBy2(decNumber){

	let remStack = new Stack(),
		rem,
		binaryString='';

	while(decNumber>0){
		rem=Math.floor(decNumber%2);
		remStack.push(rem);
		decNumber=Math.floor(decNumber/2);
	}
	while(!remStack.isEmpty()){
		binaryString+=remStack.pop().toString();
	}

	return binaryString;
}

console.log(divideBy2(10)); // 1010




// 进制转换 通过传递具体进制进行转换
function baseConverter(decNumber,base){
	
	let remStack=new Stack(),
		rem,
		baseString='',
		digits='0123456789ABCDEF';

	while(decNumber>0){
		rem=Math.floor(decNumber%base);
		remStack.push(rem);
		decNumber=Math.floor(decNumber/base);
	}
	while(!remStack.isEmpty()){
		baseString+=digits[remStack.pop()]
	}

	return baseString;
}

console.log(baseConverter(10,2)); // 1010
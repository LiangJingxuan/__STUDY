/* loop */

// 减少迭代工作量

// 常见写法：
for(var i=0; i<items.length; i++){
	process(items[i]);
}

// 优化：减少对象成员及数组项的查找次数
for(var i=0,len=items.length; i<len; i++){
	process(items[i]);
}

// 优化：通过颠倒数组的顺序来提到循环性能
for(var i=items.length;i--){
	process(items[i]);
}



// 减少迭代次数

// 达夫设备：(Duff`s Device)
// 超过一千次以上的循环才会有明显的性能提升：
var i=items.length%8;
while(i){
	process(items[i--]);
}
i=Math.floor(items.length/8);

while(i){
	process(item[i--]);
	process(item[i--]);
	process(item[i--]);
	process(item[i--]);
	process(item[i--]);
	process(item[i--]);
	process(item[i--]);
	process(item[i--]);
}



// 基于函数的迭代 -> 基于循环的迭代比基于函数的迭代要快 *

// 遍历数组的方法：
items.forEach(function(value,index,array){
	process(value);
});



// 条件语句

// if-else 适用于判断两个离散值或几个不同的值域，当判断多于两个离散值时，switch语句是更加选择。


// 优化 if-else

// ：最可能出现的条件放在首位

if(value<5){

}else if(value>5 && value<10){

}else{

}

// ：使用查找表，将返回值存入结果

var results=[res0,res1,res2,res3];
return results[value];



// 递归

// 调用栈限制
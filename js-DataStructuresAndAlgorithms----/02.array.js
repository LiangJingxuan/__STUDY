/*数组*/

// 在任意位置添加或删除元素

let numbers=[0,1,2,3,4,5,6,7,8,9];

numbers.splice(5,3); // 删除了从数组索引5开始的3个元素：numbers[5]、numbers[6]、numbers[7]
console.log(numbers,`长度：${numbers.length}`);


// splice方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个参数是删除
// 元素的个数（这个例子里，目的不是删除元素，所以传入0）。第三个参数往后，就是要添加到数组里的值（元素2、3、4）
numbers.splice(5,0,2,3,4);
console.log(numbers,`长度：${numbers.length}`);

numbers.splice(5,3,6,6,6,6,6,6); // 从索引5开始删除3个元素，然后从索引5添加元素：6,6,6,6,6,6
console.log(numbers,`长度：${numbers.length}`);


// 合并数据 concat
let arr1=[1,2,3,4],
	arr2=[5,6,7,8],
	arr3=[9,10,11,12],
	arrays=arr1.concat(arr2,arr3);

console.log(arrays);


// 排序
// 在b大于a时，会返回负数，反之则返回正数。如果相等的话，就会返回0。也就是说返回的是负数，就说明a比b小，
// 这样sort就根据返回值的情况给数组做排序。
let arrsort=[1,4,2,77,11,10,2,3,54].sort((a,b)=>{
	return a-b;
});

console.log('array sort ->',arrsort);



// 搜索
arrays.indexOf(11); // 4 返回索引
arrays.includes(11); // true 返回布尔
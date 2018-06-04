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




2.6.1 迭代二维数组的元素
++++++++++++++++++++++++++++++++++++++++++++++++++
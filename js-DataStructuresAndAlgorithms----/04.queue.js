/*队列*/

// 队列是遵循FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。
// 队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。


// 创建队列：创建一个类来表示一个队列
function Queue(){

	// 要一种数据结构来保存队列里的元素	
	let items = [];

	// 向队列添加元素
	this.enqueue = function(element){
		items.push(element);
	}

	// 从队列移除元素
	this.dequeue= function(){
		return items.shift();
	}

	// 查看队列头元素
	this.front = function(){
		return items[0];
	}

	// 检查队列是否为空
	this.isEmpty = function(){
		return items.length === 0;
	}
	this.size = function(){
		return items.length;
	}

	// 打印队列元素
	this.print = function(){
		console.log(items.toString());
	}

}

// 使用Queue类
let queue = new Queue();
console.log(queue.isEmpty());

queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Camila');

queue.print();

console.log(queue.size());
console.log(queue.isEmpty());

queue.dequeue();
queue.dequeue();

queue.print();




// 用ECMAScript 6 语法实现的Queue 类

// 在这方法中，要用一个WeakMap来保存私有属性items，并用外层函数（闭包）来封装Queue类。

let Queue2 = (function(){

	const items=new WeakMap();

	class Queue2{

		constructor(){
			items.set(this,[]);
		}
		enqueue(element){
			let q=items.get(this);
			q.push(element);
		}
		dequeue(){
			return items.get(this).shift();
		}
		print(){
			console.log(items.get(this).toString());
		}
	}

	return Queue2;

})();

// 使用Queue类
let que=new Queue2();
que.enqueue('liang');
que.enqueue('amy');
que.dequeue();
que.print();




// 优先队列
// 元素的添加和移除是基于优先级的
/*
默认的Queue类和PriorityQueue类实现上的区别是，要向PriorityQueue添加元素，需
要创建一个特殊的元素。这个元素包含了要添加到队列的元素（它可以是任意类型）
及其在队列中的优先级。
如果队列为空，可以直接将元素入列。否则，就需要比较该元素与其他元素的优
先级。当找到一个比要添加的元素的priority值更大（优先级更低）的项时，就把新元素插入
到它之前（根据这个逻辑，对于其他优先级相同，但是先添加到队列的元素，我们同样遵循先进
先出的原则）。要做到这一点，我们可以用第2章学习过的JavaScript的array类的splice方法。
一旦找到priority值更大的元素，就插入新元素并终止队列循环。这样，
队列也就根据优先级排序了。
如果要添加元素的priority值大于任何已有的元素，把它添加到队列的末尾就行了
*/
function PriorityQueue(){
	let items=[];
	function QueueElement(element,priority){
		this.element=element;
		this.priority=priority;
	}
	this.enqueue=function(element,priority){
		let queueELement=new QueueElement(element,priority);
		let added=false;
		for(let i=0,len=items.length;i<len;i++){
			if(queueELement.priority<items[i].priority){
				items.splice(i,0,queueELement);
				added=true;
				break;
			}
		}
		if(!added){
			items.push(queueELement);
		}
	}
	this.print=function(){
		for(let i=0,len=items.length;i<len;i++){
			console.log(`${items[i].element}-${items[i].priority}`);
		}
	}
	// 其他方法和默认的queue实现相同
}
// 使用PriorityQueue类
let priorityQueue=new PriorityQueue();
priorityQueue.enqueue('John',2);
priorityQueue.enqueue('Jack',1);
priorityQueue.enqueue('Camila',1);

priorityQueue.print();




// 循环队列——击鼓传花
/*
实现一个模拟的击鼓传花游戏，要用到这一章开头实现的Queue类。我们会得到一
份名单，把里面的名字全都加入队列。给定一个数字，然后迭代队列。从队列开头移
除一项，再将其添加到队列末尾，模拟击鼓传花（如果你把花传给了旁边的人，你被
淘汰的威胁立刻就解除了）。一旦传递次数达到给定的数字，拿着花的那个人就被淘汰了（从队
列中移除——行。最后只剩下一个人的时候，这个人就是胜者。
*/
function hotPotato(nameList,num){
	let queue=new Queue();
	for(let i=0,len=nameList.length;i<len;i++){
		queue.enqueue(nameList[i]);
	}
	let eliminated='';
	while(queue.size()>1){
		for(let i=0;i<num;i++){
			queue.enqueue(queue.dequeue());
		}
		eliminated=queue.dequeue();
		console.log(eliminated+'在击鼓传花游戏中被淘汰。');
	}
	return queue.dequeue();
}
let names = ['John','Jack','Camila','Ingrid','Carl'];
let winner = hotPotato(names, 7);
console.log('胜利者: ' + winner);
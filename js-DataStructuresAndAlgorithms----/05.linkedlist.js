/*链表*/

// 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。
// 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。

// 创建链表
function linkedList(){

	let Node=function(element){
		this.element=element;
		this.next=null;
	}

	let length=0;
	let head=null;

	// 向链表尾部追加元素
	// 列表为空，添加的是第一个元素，或者列表不为空，向其追加元素。
	this.append=function(element){

		let node=new Node(element),
			current;

		if(head===null){
			// 列表中第一个节点
			head=node;

		}else{
			current=head;
			// 循环列表，直到找到最后一项
			while(current.next){
				current=current.next;
			}
			// 找到最后一项，将其next赋值为node，建立连接
			current.next=node;
		}

		length++; // 更新列表的长度
		
	};

	// 在任意位置插入元素
	this.insert=function(position,element){

		// 检查越界值
		if(position>=0 && position <= length){
			let node new Node(element),
				current=head,
				previous,
				index=0;
			if(position===0){
				node.next=current;
				head=node;
			}else{
				while(index++ < position){
					previous=current;
					current=current.next;
				}
				node.next=current;
				previous.next=node;
			}
			length++;
			return true;
		}else{
			return false;
		}
	};

	// 从链表中移除元素
	this.removeAt=function(position){

		// 检查越界值
		if(position>-1&&position<length){
			let current=head,
				previous,
				index=0;
			// 移除第一项
			if(position===0){
				head=current.next;
			}else{
				while(index++ < position){
					previous=current;
					current=current.next;
				}
				// 将previous与current的下一项链接起来，跳过current，从而移除它
				previous.next=current.next;
			}
			length--;
			return current.element;
		}else{
			return null;
		}		
	};

	this.remove=function(element){};
	this.indexOf=function(element){};
	this.isEmpty=function(){};
	this.size=function(){};
	this.getHead=function(){};
	this.toString=function(){};
	this.print=function(){};
}

let list=new linkedList();
list.append(15);
list.append(10);
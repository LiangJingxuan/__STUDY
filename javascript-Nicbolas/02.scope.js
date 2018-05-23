// 标识符解析的性能
// 在函数内减少使用全局变量，将全局变量先存为局部：
function initUI(){
	var doc=document,
		bd=doc.body,
		links=doc.getElementsByTagName('a'),
		i=0,
		len=links.length;

	while(i<len){
		update(links[i++]);
	}

	doc.getElementById('go-btn').onclick=function(){
		start();
	}
	bd.className='active';
}


// 闭包、作用域和内存
// 闭包导致的性能问题：将常用的跨作用域变量存储在局部变量中，然后直接访问局部变量。


// 对象成员

// 在函数中如果要多次读取同一个对象属性，最佳做法是将属性值保存到局部变量中。局部变量能用来替代属性以避免多次查找带来的性能开销。

// 例如：

function toggle(element){
	var Dom=YAHOO.util.Dom;
	if(Dom.hasClassO(element,'selected')){
		Dom.removeClass(element,'selected');
		return false;
	}else{
		
	}
}
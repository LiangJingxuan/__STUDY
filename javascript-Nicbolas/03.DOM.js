// DOM 操作 优化前后对比：

function innerHTMLLoop1(){
	for(var i=0;i<100;i++){
		document.getElementById('href').innerHTML += 'a';
	}
}

function innerHTMLLoop2(){
	var a='';
	for(var i=0;i<100;i++){
		a+='a';
	}
	document.getElementById('href').innerHTML+=a;
}


// 选择器：

var elements=document.querySelectorAll('#menu a');
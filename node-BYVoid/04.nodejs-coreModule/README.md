<h3>4.1、全局对象</h3>

node中全局对象：global，所有全局变量（除了 global 本身以外）都是 global对象的属性。

<b>4.1.1 全局对象与全局变量</b>

定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。 全局变量的条件：

 在最外层定义的变量；
 全局对象的属性；
 隐式定义的变量（未定义直接赋值的变量）。

<b>4.1.2 process</b>

process：用于描述当前 Node.js 进程状态的对象，提供了一个与操作系统的简单接口。 process 对象的一些最常用的成员方法：

process.argv是命令行参数数组，第一个元素是 node，第二个元素是脚本文件名，从第三个元素开始每个元素是一个运行参数。
process.stdout是标准输出流，通常我们使用的 console.log() 向标准输出打印字符，而 process.stdout.write() 函数提供了更底层的接口。
process.stdin是标准输入流，初始时它是被暂停的，要想从标准输入读取数据，你必须恢复流，并手动编写流的事件响应函数。
process.nextTick(callback)的功能是为事件循环设置一项任务，Node.js 会在下次事件循环调响应时调用 callback。

<b>4.1.3 console</b>

console 对象，用于向标准输出流（stdout）或标准错误流（stderr）输出字符。

console.log()：向标准输出流打印字符并以换行符结束。
console.error()：与 console.log() 用法相同，只是向标准错误流输出。
console.trace()：向标准错误流输出当前的调用栈。


<h3>4.2 常用工具 util</h3>

util模块提供常用函数的集合，用于弥补核心 JavaScript 的功能过于精简的不足。

<b>4.2.1 util.inherits</b>

util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数。

<b>4.2.2 util.inspect</b>

util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。


<h3>4.3 事件驱动 events</h3>

<b>4.3.1 事件发射器</b>

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件发射与事件监听器功能的封装。EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持若干个事件监听器。当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

EventEmitter常用的API:

EventEmitter.on(event, listener) 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数 listener。
EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件，传递若干可选参数到事件监听器的参数表。
EventEmitter.once(event, listener) 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。
EventEmitter.removeListener(event, listener) 移除指定事件的某个监听器，listener 必须是该事件已经注册过的监听器。
EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器，如果指定 event，则移除指定事件的所有监听器。

<b>4.3.2 error 事件</b>

error，包含了“错误”的语义，我们在遇到异常的时候通常会发射 error 事件。

<b>4.3.3 继承 EventEmitter</b>

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。


<h3>4.4 文件系统 fs</h3>

fs 模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等 POSIX 文件系统操作。

<b>4.4.1 fs.readFile</b>

读取文件的函数：fs.readFile(filename,[encoding],[callback(err,data)]);

<b>4.4.2 fs.readFileSync</b>

读取文件的函数(同步方法)：fs.readFileSync(filename, [encoding])；

<b>4.4.3 fs.open(不推荐使用)</b>

fs.open(path, flags, [mode], [callback(err, fd)])是 POSIX open 函数的封装，与 C 语言标准库中的 fopen 函数类似。

<b>4.4.4 fs.read(不推荐使用)</b>

fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,buffer)])是 POSIX read 函数的封装，相比 fs.readFile 提供了更底层的接口。


<h3>4.5 HTTP 服务器与客户端</h3>

Node.js 标准库提供了 http 模块，其中封装了一个高效的 HTTP 服务器和一个简易的HTTP 客户端。http.Server 是一个基于事件的 HTTP 服务器，它的核心由 Node.js 下层 C++部分实现，而接口由 JavaScript 封装，兼顾了高性能与简易性。http.request 则是一个HTTP 客户端工具，用于向 HTTP 服务器发起请求，例如实现 Pingback或者内容抓取。

<b>4.5.1 HTTP 服务器</b>

http.Server 是 http 模块中的 HTTP 服务器对象，用 Node.js 做的所有基于 HTTP 协议的系统，如网站、社交应用甚至代理服务器，都是基于 http.Server 实现的。

<b>1. http.Server 的事件</b>

http.Server 是一个基于事件的 HTTP 服务器，所有的请求都被封装为独立的事件，开发者只需要对它的事件编写响应函数即可实现 HTTP 服务器的所有功能。它继承自EventEmitter，提供了以下几个事件：

request：当客户端请求到来时，该事件被触发，提供两个参数 req 和res，分别是http.ServerRequest 和 http.ServerResponse 的实例，表示请求和响应信息。
connection：当 TCP 连接建立时，该事件被触发，提供一个参数 socket，为net.Socket 的实例。connection 事件的粒度要大于 request，因为客户端在Keep-Alive 模式下可能会在同一个连接内发送多次请求。
close ：当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

http 提供了一个捷径： http.createServer([requestListener]) ， 功能是创建一个 HTTP 服务器并将requestListener 作为 request 事件的监听函数。

<b>2. http.ServerRequest</b>

http.ServerRequest 是 HTTP 请求的信息，它一般由http.Server 的 request 事件发送，作为第一个参数传递，通常简称 request 或 req。

http.ServerRequest 提供了以下3个事件用于控制请求体传输：

>data ：当请求体数据到来时，该事件被触发。该事件提供一个参数 chunk，表示接收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会被调用多次。

>end ：当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。

>close： 用户当前请求结束时，该事件被触发。不同于 end，如果用户强制终止了传输，也还是调用close。

<b>ServerRequest 的属性</b>

<table>
	<thead>
		<tr>
			<td>名 称</td>
			<td>含 义</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>complete</td>
			<td>客户端请求是否已经发送完成</td>
		</tr>
		<tr>
			<td>httpVersion</td>
			<td>HTTP 协议版本，通常是 1.0 或 1.1</td>
		</tr>
		<tr>
			<td>method</td>
			<td>HTTP 请求方法，如 GET、POST、PUT、DELETE 等</td>
		</tr>
		<tr>
			<td>url</td>
			<td>原始的请求路径，例如 /static/image/x.jpg 或 /user?name=byvoid</td>
		</tr>
		<tr>
			<td>headers</td>
			<td>HTTP 请求头</td>
		</tr>
		<tr>
			<td>trailers</td>
			<td>HTTP 请求尾（不常见）</td>
		</tr>
		<tr>
			<td>connection</td>
			<td>当前 HTTP 连接套接字，为 net.Socket 的实例</td>
		</tr>
		<tr>
			<td>socket</td>
			<td>connection 属性的别名</td>
		</tr>
		<tr>
			<td>client</td>
			<td>client 属性的别名</td>
		</tr>
	</tbody>
</table>

<b>3. 获取 GET 请求内容</b>

<b>4. 获取 POST 请求内容</b>

<b>5. http.ServerResponse</b>

http.ServerResponse 是返回给客户端的信息，决定了用户最终能看到的结果。它也是由 http.Server 的 request 事件发送的，作为第二个参数传递，一般简称为response 或 res。
http.ServerResponse 有三个重要的成员函数，用于返回响应头、响应内容以及结束请求：

response.writeHead(statusCode, [headers])：向请求的客户端发送响应头。statusCode 是 HTTP 状态码，如 200 （请求成功）、404 （未找到）等。headers是一个类似关联数组的对象，表示响应头的每个属性。该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。

response.write(data, [encoding])：向请求的客户端发送响应内容。data 是一个 Buffer 或字符串，表示要发送的内容。如果 data 是字符串，那么需要指定encoding 来说明它的编码方式，默认是 utf-8。在 response.end 调用之前，response.write 可以被多次调用。

response.end([data], [encoding])：结束响应，告知客户端所有发送已经完成。当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可选参数，意义和 response.write 相同。如果不调用该函数，客户端将永远处于等待状态。

<b>4.5.2 HTTP 客户端</b>

http 模块提供了两个函数 http.request 和 http.get，功能是作为客户端向 HTTP服务器发起请求。

http.request(options, callback) 发起 HTTP 请求。接受两个参数，option 是一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数。
http.get。它是 http.request 的简化版，唯一的区别在于http.get自动将请求方法设为了 GET 请求，同时不需要手动调用 req.end()。
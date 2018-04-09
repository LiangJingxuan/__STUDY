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
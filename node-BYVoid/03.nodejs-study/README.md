<h3>3.1 开始用 Node.js 编程</h3>

hello world ...


<b>3.1.3 建立 HTTP 服务器</b>

<b>小技巧——使用 supervisor</b>

如果你有 PHP 开发经验，会习惯在修改 PHP 脚本后直接刷新浏览器以观察结果，而你在开发 Node.js 实现的 HTTP 应用时会发现，无论你修改了代码的哪一部份，都必须终止Node.js 再重新运行才会奏效。这是因为 Node.js 只有在第一次引用到某部份时才会去解析脚本文件，以后都会直接访问内存，避免重复载入，而 PHP 则总是重新读取并解析脚本（如果没有专门的优化配置）。Node.js的这种设计虽然有利于提高性能，却不利于开发调试，因为我们在开发过程中总是希望修改后立即看到效果，而不是每次都要终止进程并重启。

supervisor 可以帮助你实现这个功能，它会监视你对代码的改动，并自动重启 Node.js。使用方法很简单，首先使用 npm 安装 supervisor：

>$ npm install -g supervisor

如果你使用的是 Linux 或 Mac，直接键入上面的命令很可能会有权限错误。原因是 npm需要把 supervisor 安装到系统目录，需要管理员授权，可以使用 sudo npm install -g supervisor 命令来安装。

接下来，使用 supervisor 命令启动 app.js：

>$ supervisor app.js

当代码被改动时，运行的脚本会被终止，然后重新启动。在终端中显示的结果如下：

supervisor 这个小工具可以解决开发中的调试问题。


<h3>3.2 异步式 I/O 与事件式编程</h3>

Node.js 最大的特点就是异步式 I/O（或者非阻塞 I/O）与事件紧密结合的编程模式。这种模式与传统的同步式 I/O 线性的编程思路有很大的不同，因为控制流很大程度上要靠事件和回调函数来组织，一个逻辑要拆分为若干个单元。

<b>3.2.1 阻塞与线程</b>

<b>同步式 I/O 和异步式 I/O 的特点</b>

<table>
    <thead>
    <tr>
        <td>同步式 I/O（阻塞式）</td>
        <td>异步式 I/O（非阻塞式）</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>利用多线程提供吞吐量</td>
    	<td>单线程即可实现高吞吐量</td>
	</tr>
	<tr>
		<td>通过事件片分割和线程调度利用多核CPU</td>
		<td>通过功能划分利用多核CPU</td>
	</tr>
	<tr>
		<td>需要由操作系统调度多线程使用多核 CPU</td>
		<td>可以将单进程绑定到单核 CPU</td>
	</tr>
	<tr>
		<td>难以充分利用 CPU 资源</td>
		<td>可以充分利用 CPU 资源</td>
	</tr>
	<tr>
		<td>内存轨迹大，数据局部性弱</td>
		<td>内存轨迹小，数据局部性强</td>
	</tr>
	<tr>
		<td>符合线性的编程思维</td>
		<td>不符合传统编程思维</td>
	</tr>
	</tbody>
</table>

<b>3.2.2 回调函数</b>

Node.js 中，并不是所有的 API 都提供了同步和异步版本。Node.js 不鼓励使用同步 I/O。

<b>3.2.3 事件</b>

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。在开发者看来，事件由 EventEmitter 对象提供。

Node.js 的事件循环机制：Node.js 程序由事件循环开始，到事件循环结束，所有的逻辑都是事件的回调函数，所以 Node.js 始终在事件循环中，程序入口就是事件循环第一个事件的回调函数。

事件的回调函数在执行的过程中，可能会发出 I/O 请求或直接发射（emit）事件，执行完毕后再返回事件循环，事件循环会检查事件队列中有没有未处理的事件，直到程序结束。


<h3>3.3 模块和包</h3>

模块（Module）和包（Package）是 Node.js 最重要的支柱。开发一个具有一定规模的程序不可能只用一个文件，通常需要把各个功能拆分、封装，然后组合起来，模块正是为了实现这种方式而诞生的。

<b>3.3.1 什么是模块</b>

模块是 Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个Node.js 文件就是一个模块，这个文件可能是 JavaScript 代码、JSON 或者编译过的 C/C++ 扩展。var http = require('http')，其中 http 是 Node.js 的一个核心模块，其内部是用 C++ 实现的，外部用 JavaScript 封装。通过require 函数获取了这个模块，然后才能使用其中的对象。

<b>3.3.2 创建及加载模块</b>

1. 创建模块：Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
2. 单次加载：require 不会重复加载模块，也就是说无论调用多少次 require，获得的模块都是同一个。最终输出结果是由后者决定的，后者覆盖前者。
3. 覆盖exports：

<b>3.3.3 创建包</b>

包是在模块基础上更深一步的抽象，Node.js 的包类似于 C/C++ 的函数库或者 Java/.Net的类库。它将某个独立的功能封装起来，用于发布、更新、依赖管理和版本控制。

	 package.json 必须在包的顶层目录下；

	 二进制文件应该在 bin 目录下；

	 JavaScript 代码应该在 lib 目录下；

	 文档应该在 doc 目录下；

	 单元测试应该在 test 目录下。

1. 作为文件夹的模块 例子：建立一个 somepackage 包, 用 getoackage.js 来使用它。
2. package.json Node.js 在调用某个包时，会首先检查包中 package.json 文件的 main 字段，将其作为包的接口模块，如果 package.json 或 main 字段不存在，会尝试寻找index.js 或 index.node 作为包的接口。
package.json 是 CommonJS 规定的用来描述包的文件，完全符合规范的 package.json 文件应该含有以下字段：

	 name：包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格。

	 description：包的简要说明。

	 version：符合语义化版本识别规范的版本字符串。

	 keywords：关键字数组，通常用于搜索。

	 maintainers：维护者数组，每个元素要包含 name、email （可选）、web （可选）字段。

	 contributors：贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一个元素。

	 bugs：提交bug的地址，可以是网址或者电子邮件地址。

	 licenses：许可证数组，每个元素要包含 type （许可证的名称）和 url （链接到许可证文本的地址）字段。

	 repositories：仓库托管地址数组，每个元素要包含 type （仓库的类型，如 git ）、url （仓库的地址）和 path （相对于仓库的路径，可选）字段。

	 dependencies：包的依赖，一个关联数组，由包名称和版本号组成。 

<b>3.3.4 Node.js 包管理器</b>

npm是 Node.js 官方提供的包管理工具，它已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包。

1. 获取一个包： 例：npm [install/i] [package_name]。 下载好的包放置在当前目录的 node_modules 子目录下。
2. 本地模式和全局模式： 全局安装->npm [install/i] -g [package_name]，全局安装不能被require使用，全局安装会被PATH环境变量注册，从而使用命令行控制。

<b>本地模式与全局模式</b>

<table>
    <thead>
	    <tr>
	        <td>模 式</td>
	        <td>可通过 require 使用</td>
	        <td>注册PATH</td>
	    </tr>
    </thead>
    <tbody>
	    <tr>
	    	<td>本地模式</td>
	    	<td>是</td>
	    	<td>否</td>
		</tr>
		<tr>
	    	<td>全局模式</td>
	    	<td>否</td>
	    	<td>是</td>
		</tr>
	</tbody>
</table>

3. 创建全局链接：npm link 命令使本地require可以引用全局下载的模块（npm link 不支持Windows）。
4. 包的发布：在发布之前，首先需要让我们的包符合 npm 的规范，npm 有一套以 CommonJS 为基础包规范，但与 CommonJS并不完全一致，其主要差别在于必填字段的不同。通过使用 npm init 可以根据交互式问答产生一个符合标准的 package.json，例如创建一个名为 byvoidmodule 的目录，然后在这个目录中运行npm init，创建一个index.js 作为包的接口，一个简单的包就制作完成了。
在发布前，我们还需要获得一个账号用于今后维护自己的包，使用 npm adduser 根据提示输入用户名、密码、邮箱，等待账号创建完成。完成后可以使用 npm whoami 测验是	否已经取得了账号。
接下来，在 package.json 所在目录下运行 npm publish，稍等片刻就可以完成发布了。现在我们可以在世界的任意一台计算机上使用 npm install byvoidmodule 命令来安装它。
如果你的包将来有更新，只需要在 package.json 文件中修改 version 字段，然后重新使用 npm publish 命令就行了。如果你对已发布的包不满意（比如我们发布的这个毫无意义的包），可以使用 npm unpublish 命令来取消发布。


<h3>3.4 调试</h3>

<b>3.4.1 命令行调试</b>

Node.js 支持命令行下的单步调试。在命令行下执行 node debug debug.js，将会启动调试工具。

<b>3.4.2 远程调试</b>

远程调试：在命令行下使用以下两个语句之一可以打开调试服务器： node --debug[=port] script.js | node --debug-brk[=port] script.js。

<b>3.4.3 使用 Eclipse 调试 Node.js</b>

<b>3.4.4 使用 node-inspector 调试 Node.js</b>

使用 npm install -g node-inspector 命令安装 node-inspector，然后在终端中通过 node --debug-brk=5858 debug.js 命令连接你要除错的脚本的调试服务器，启动 node-inspector： $ node-inspector 。
node-inspector 使用了 WebKit Web Inspector，因此只能在 Chrome、Safari 等 WebKit 内核的浏览器中使用，而不支持 Firefox 或 Internet Explorer。


使用node完成一个博客项目。

<h3>5.1 准备工作</h3>

MVC （Model-View-Controller，模型视图控制器）是一种软件的设计模式，它最早是由 20 世纪 70 年代的 Smalltalk 语言提出的，即把一个复杂的软件工程分解为三个层面：模
型、视图和控制器。

 模型是对象及其数据结构的实现，通常包含数据库操作。

 视图表示用户界面，在网站中通常就是 HTML 的组织结构。

 控制器用于处理用户请求和数据流、复杂模型，将输出传递给视图。

<b>5.1.1 使用 http 模块</b>

<b>5.1.2 Express 框架</b>


<h3>5.2 快速开始</h3>

<b>5.2.1 安装 Express</b>

使用全局安装Express，从而使用Quick Start（快速开始）工具，这个工具的功能通常是建立一个网站最小的基础框架，在此基础上完成开发：

>npm install -g express

>npm install -g express-generator

<b>5.2.2 建立工程</b>

通过命令建立网站基本结构：

>express -e ejs(文件夹名)

根据提示依次进行相关操作：

>cd ejs(文件夹名)

>npm install

<b>5.2.3 启动服务器</b>

查看package.json文件配置信息：

```json
"scripts": {
    "start": "node ./bin/www"
  }
```

使用 npm start 命令运行node服务，然后在浏览器中打开输入127.0.0.1:3000来进入页面，显示欢迎页说明安装及设定正确无误。

<b>5.2.4 工程的结构</b>


<h3>5.3 路由控制</h3>

<b>5.3.1 工作原理</b>

<b>5.3.2 创建路由规则</b>

<b>5.3.4 REST 风格的路由规则</b>

Express 支持 REST 风格的请求方式，在介绍之前我们先说明一下什么是 REST。REST 的意思是 表征状态转移（Representational State Transfer），它是一种基于 HTTP 协议的网络应用的接口风格，充分利用 HTTP 的方法实现统一风格接口的服务。HTTP 协议定义了以下8种标准的方法：

 GET：请求获取指定资源。

 HEAD：请求指定资源的响应头。

 POST：向指定资源提交数据。

 PUT：请求服务器存储一个资源。

 DELETE：请求服务器删除指定资源。

 TRACE：回显服务器收到的请求，主要用于测试或诊断。

 CONNECT：HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。

 OPTIONS：返回服务器支持的HTTP请求方法。

<b>5.3.5 控制权转移</b>

Express 支持同一路径绑定多个路由响应函数，例如：

```javascript
app.all('/user/:username', function(req, res) {
	res.send('all methods captured');
 });

app.get('/user/:username', function(req, res) {
	res.send('user: ' + req.params.username);
 });
```

最前面的会覆盖下面的，使用第三个参数 next 通过调用next()，会将路由控制权转移给后面的规则(先执行第一个在执行后面的)：

```javascript
app.all('/user/:username', function(req, res, next) {
	console.log('all methods captured');
	next();
 });

app.get('/user/:username', function(req, res) {
	res.send('user: ' + req.params.username);
 });
```

例如：针对一个用户查询信息和修改信息的操作，分别对应了 GET 和 PUT 操作，而两者共有的一个步骤是检查用户名是否合法，因此可以通过 next() 方法实现：

```javascript
var users = {
	'byvoid': {
		name: 'Carbo',
		website: 'http://www.byvoid.com'
	}
};

app.all('/user/:username', function(req, res, next) {
	// 检查用户是否存在
	if (users[req.params.username]) {
		next();
	} else {
		next(new Error(req.params.username + ' does not exist.'));
	}
});

app.get('/user/:username', function(req, res) {
	// 用户一定存在，直接展示
	res.send(JSON.stringify(users[req.params.username]));
});

app.put('/user/:username', function(req, res) {
	// 修改用户信息
	res.send('Done');
});
```


<h3>5.4 模板引擎</h3>

<b>5.4.1 什么是模板引擎</b>

<b>5.4.2 使用模板引擎</b>

ejs 的标签系统非常简单，它只有以下3种标签：

 <% code %>：JavaScript 代码。

 <%= code %>：显示替换过 HTML 特殊字符的内容。

 <%- code %>：显示原始 HTML 内容。

<b>5.4.3 页面布局</b>

<b>5.4.4 片段视图</b>

<b>5.4.5 视图助手</b>

Express 提供了一种叫做视图助手的工具，它的功能是允许在视图中访问一个全局的函数或对象，不用每次调用视图解析的时候单独传入。 视图助手有两类，分别是静态视图助手和动态视图助手。这两者的差别在于，静态视图
助手可以是任何类型的对象，包括接受任意参数的函数，但访问到的对象必须是与用户请求无关的，而动态视图助手只能是一个函数，这个函数不能接受参数，但可以访问 req 和 res 对象。

静态视图助手可以通过 app.helpers() 函数注册，它接受一个对象，对象的每个属性名称为视图助手的名称，属性值对应视图助手的值。动态视图助手则通过 app.dynamicHelpers() 注册，方法与静态视图助手相同，但每个属性的值必须为一个函数，该函数提供 req 和 res。

实例：

```javascript
var util = require('util');

app.helpers({
	inspect: function(obj) {
		return util.inspect(obj, true);
	}
});

app.dynamicHelpers({
	headers: function(req, res) {
		return req.headers;
	}
});

app.get('/helper', function(req, res) {
	res.render('helper', {
		title: 'Helpers'
	});
});
```

对应的视图helper、ejs的内容如下：

```ejs
<%=inspect(headers)%>
```

视图助手的本质其实就是给所有视图注册了全局变量，因此无需每次在调用模板引擎时传递数据对象。


<h3>5.5 建立微博网站</h3>

<b>内容转移至 microblog 文件夹中 ...</b>
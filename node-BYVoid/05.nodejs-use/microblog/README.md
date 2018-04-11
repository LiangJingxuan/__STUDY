使用node完成一个博客项目。

<h3>5.5 建立微博网站</h3>

<b>5.5.1 功能分析</b>

开发中的一个大忌就是没有想清楚要做什么就开始动手，因此我们准备在动手实践之前先规划一下网站的功能，即使是出于学习目的也不例外。首先，微博应该以用户为中心，因此需要有用户的注册和登录功能。微博网站最核心的功能是信息的发表，这个功能涉及许多方面，包括数据库访问、前端显示等。一个完整的微博系统应该支持信息的评论、转发、圈点用户等功能，但出于演示目的，我们不能一一实现所有功能，只是实现一个微博社交网站的雏形。

<b>5.5.2 路由规划</b>

在完成功能设计以后，下一个要做的事情就是路由规划了。路由规划，或者说控制器规划是整个网站的骨架部分，因为它处于整个架构的枢纽位置，相当于各个接口之间的粘合剂，所以应该优先考虑。
根据功能设计，我们把路由按照以下方案规划。

> /：首页

> /u/[user]：用户的主页

> /post：发表信息

> /reg：用户注册

> /login：用户登录

> /logout：用户登出

以上页面还可以根据用户状态细分。发表信息以及用户登出页面必须是已登录用户才能操作的功能，而用户注册和用户登入所面向的对象必须是未登入的用户。首页和用户主页则针对已登入和未登入的用户显示不同的内容。

打开 app.js，把 Routes 部分修改为：

```javascript
	app.get('/', routes.index);
	app.get('/u/:user', routes.user);
	app.post('/post', routes.post);
	app.get('/reg', routes.reg);
	app.post('/reg', routes.doReg);
	app.get('/login', routes.login);
	app.post('/login', routes.doLogin);
	app.get('/logout', routes.logout);
```

其中 /post、/login 和 /reg 由于要接受表单信息，因此使用 app.post 注册路由。/login 和 /reg 还要显示用户注册时要填写的表单，所以要以 app.get 注册。同时在 routes/index.js 中添加相应的函数：

```javascript
	exports.index = function(req, res) {
		res.render('index', { title: 'Express' });
	};
	exports.user = function(req, res) {

	};
	exports.post = function(req, res) {

	};
	exports.reg = function(req, res) {

	};
	exports.doReg = function(req, res) {

	};
	exports.login = function(req, res) {

	};
	exports.doLogin = function(req, res) {

	};
	exports.logout = function(req, res) {

	};
```

<b>5.5.3 界面设计</b>

<b>5.5.4 使用 Bootstrap</b>
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

<h3>5.6 用户注册和登录</h3>

<b>5.6.1 访问数据库</b>

选用 MongoDB 作为网站的数据库系统，它是一个开源的 NoSQL 数据库，相比MySQL 那样的关系型数据库，它更为轻巧、灵活，非常适合在数据规模很大、事务性不强的场合下使用。

1. NoSQL
NoSQL 是 1998 年被提出的，它曾经是一个轻量、开源、不提供SQL功能的关系数据库。但现在 NoSQL 被认为是 Not Only SQL 的简称，主要指非关系型、分布式、不提供 ACID的数据库系统。正如它的名称所暗示的，NoSQL 设计初衷并不是为了取代 SQL 数据库的，而是作为一个补充，它和 SQL 数据库有着各自不同的适应领域。NoSQL 不像 SQL 数据库一样都有着统一的架构和接口，不同的 NoSQL 数据库系统从里到外可能完全不同。

2. MongoDB
MongoDB 是一个对象数据库，它没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储。所谓文档就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。下面是一个MongoDB 文档的示例：

```MongoDB
	{ "_id" : ObjectId( "4f7fe8432b4a1077a7c551e8" ),
		"uid" : 2004,
		"username" : "byvoid",
		"net9" : { "nickname" : "BYVoid",
		"surname" : "Kuo",
		"givenname" : "Carbo",
		"fullname" : "Carbo Kuo",
		"emails" : [ "byvoid@byvoid.com", "byvoid.kcp@gmail.com" ],
		"website" : "http://www.byvoid.com",
		"address" : "Zijing 2#, Tsinghua University" }
	}
```

上面文档中 uid 是一个整数属性，username 是字符串属性，_ id是文档对象的标识符，格式为特定的 ObjectId。net9 是一个嵌套的文档，其内部结构与一般文档无异。从格式来看文档好像 JSON，没错，MongoDB 的数据格式就是 JSON，因此与 JavaScript 的亲和性很强。在 Mongodb 中对数据的操作都是以文档为单位的，当然我们也可以修改文档的部分属性。对于查询操作，我们只需要指定文档的任何一个属性，就可在数据库中将满足条件的所有文档筛选出来。为了加快查询，MongoDB 也对文档实现了索引，这一点和 SQL 数据库一样。

3. 连接数据库

首先在本地项目安装模块：

>npm install mongodb

接下来在工程的目录中创建 settings.js 文件，这个文件用于保存数据库的连接信息。Settings.js文件的内容如下：
db 是数据库的名称，host 是数据库的地址。cookieSecret 用于 Cookie 加密与数据库无关。

```javascript
	module.exports = {
		cookieSecret: 'microblogbyvoid',
		db: 'microblog',
		host: 'localhost',
	};
```

接下来在根目录下创建 models 子目录，在models文件夹下创建 db.js(通过 module.exports 输出了创建的数据库连接)，内容是：

```javascript
	var settings = require('../settings');
	var Db = require('mongodb').Db;
	var Connection = require('mongodb').Connection;
	var Server = require('mongodb').Server;
	module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));
```

<b>5.6.2 会话支持</b>

会话是一种持久的网络协议，用于完成服务器和客户端之间的一些交互行为。会话是一个比连接粒度更大的概念，一次会话可能包含多次连接，每次连接都被认为是会话的一次操作。在网络应用开发中，有必要实现会话以帮助用户交互。HTTP 协议是无状态的，本身不支持会话，为了在无状态的 HTTP 协议之上实现会话，Cookie 诞生了。Cookie 是一些存储在客户端的信息，每次连接的时候由浏览器向服务器递交，服务器也向浏览器发起存储 Cookie 的请求，依靠这样的手段服务器可以识别客户端。HTTP 会话功能就是这样实现的。

浏览器首次向服务器发起请求时，服务器生成一个唯一标识符并发送给客户端浏览器，浏览器将这个唯一标识符存储在 Cookie 中，以后每次再发起请求，客户端浏览器都会向服务器传送这个唯一标识符，服务器通过这个唯一标识符来识别用户。

如何通过这个唯一标识符来识别用户，Express 也提供了会话中间件，默认情况下是把用户信息存储在内存中，但我们既然已经有了 MongoDB，不妨把会话信息存储在数据库中，便于持久维护。为了使用这一功能，我们首先要获得一个叫做 connect-mongo 的模块：

>npm install connect-mongo

然后在 app.js，添加以下内容：

```javascript
	var MongoStore = require('connect-mongo');
	var settings = require('../settings');

	app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({
			secret: settings.cookieSecret,
			store: new MongoStore({
				db: settings.db
			})
		}));
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});
```

<h3>5.6.3 注册和登入</h3>

1. 注册页面
创建 views/reg.ejs 文件写注册页面

到目前为止我们所有的路由规则还都写在了 app.js 中，随着规模扩大其维护难度不断提高，因此我们需要把所有的路由规则分离出去。修改 app.js 的 app.configure 部分，用app.use(express.router(routes)) 代替 app.use(app.router)：

```javascript
	// app.use(app.router);
	app.use(express.router(routes));
```

接下来添加 routes/reg.js。

2. 注册响应

在 routes/index.js 中添加 /reg 的 POST 响应函数：

```javascript
	app.post('/reg', function(req, res) {
		//检验用户两次输入的口令是否一致
		if (req.body['password-repeat'] != req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/reg');
		}
		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var newUser = new User({
			name: req.body.username,
			password: password,
		});
		//检查用户名是否已经存在
		User.get(newUser.name, function(err, user) {
			if (user)
				err = 'Username already exists.';
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			//如果不存在则新增用户
			newUser.save(function(err) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = newUser;
				req.flash('success', '注册成功');
				res.redirect('/');
			});
		});
	});
```

req.body 就是 POST 请求信息解析过后的对象，例如我们要访问用户传递的password 域的值，只需访问 req.body['password'] 即可。
req.flash 是 Express 提供的一个奇妙的工具，通过它保存的变量只会在用户当前和下一次的请求中被访问，之后会被清除，通过它我们可以很方便地实现页面的通知和错误信息显示功能。
res.redirect 是重定向功能，通过它会向用户返回一个 303 See Other 状态，通知浏览器转向相应页面。
crypto 是 Node.js 的一个核心模块，功能是加密并生成各种散列，使用它之前首先要声明 var crypto = require('crypto')。我们代码中使用它计算了密码的散列值。
User 是我们设计的用户对象，在后面我们会详细介绍，这里先假设它的接口都是可用的，使用前需要通过 var User = require('../models/user.js') 引用。
User.get 的功能是通过用户名获取已知用户，在这里我们判断用户名是否已经存在。User.save 可以将用户对象的修改写入数据库。
通过 req.session.user = newUser 向会话对象写入了当前用户的信息，在后面我们会通过它判断用户是否已经登录。

3. 用户模型

与视图和控制器不同，模型是真正与数据打交道的工具，没有模型，网站就只是一个外壳，不能发挥真实的作用，因此它是框架中最根本的部分。
在 models 目录中创建 user.js 的文件。

4. 视图交互

为了实现不同登录状态下页面呈现不同内容的功能，我们需要创建动态视图助手，通过它我们才能在视图中访问会话中的用户数据。同时为了显示错误和成功的信息，也要在动态视图助手中增加响应的函数。

5. 登录登出

<b>5.6.4 页面权限控制</b>

防跳墙

```javascript
	var crypto = require('crypto');
	var User = require('../models/user.js');
	module.exports = function(app) {
	app.get('/', function(req, res) {
	res.render('index', {
	title: '首页'
	});
	});
	app.get('/reg', checkNotLogin);
	app.get('/reg', function(req, res) {
	res.render('reg', {
	title: '用户注册',
	});
	});
	app.post('/reg', checkNotLogin);
	app.post('/reg', function(req, res) {
	//检验用户两次输入的口令是否一致
	if (req.body['password-repeat'] != req.body['password']) {
	req.flash('error', '两次输入的口令不一致');
	return res.redirect('/reg');
	}
	//生成口令的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	var newUser = new User({
	name: req.body.username,
	password: password,
	});
	//检查用户名是否已经存在
	User.get(newUser.name, function(err, user) {
	if (user)
	err = 'Username already exists.';
	if (err) {
	req.flash('error', err);
	return res.redirect('/reg');
	}
	//如果不存在则新增用户
	newUser.save(function(err) {
	if (err) {
	req.flash('error', err);
	return res.redirect('/reg');
	}
	req.session.user = newUser;
	req.flash('success', '注册成功');
	res.redirect('/');
	});
	});
	});
	app.get('/login', checkNotLogin);
	app.get('/login', function(req, res) {
	res.render('login', {
	title: '用户登入',
	});
	});
	app.post('/login', checkNotLogin);
	app.post('/login', function(req, res) {
	//生成口令的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	User.get(req.body.username, function(err, user) {
	if (!user) {
	req.flash('error', '用户不存在');
	return res.redirect('/login');
	}
	if (user.password != password) {
	req.flash('error', '用户口令错误');
	return res.redirect('/login');
	}
	req.session.user = user;
	req.flash('success', '登入成功');
	res.redirect('/');
	});
	});
	app.get('/logout', checkLogin);
	app.get('/logout', function(req, res) {
	req.session.user = null;
	req.flash('success', '登出成功');
	res.redirect('/');
	});
	};
	function checkLogin(req, res, next) {
	if (!req.session.user) {
	req.flash('error', '未登入');
	return res.redirect('/login');
	}
	next();
	}
	function checkNotLogin(req, res, next) {
	if (req.session.user) {
	req.flash('error', '已登入');
	return res.redirect('/');
	}
	next();
	}
```


<h3>5.7 发表微博</h3>

<b>5.7.1 微博模型</b>

创建 models/post.js

<b>5.7.2 发表微博</b>

<b>5.7.3 用户页面</b>

<b>5.7.4 首页</b>

<b>5.7.5 下一步</b>
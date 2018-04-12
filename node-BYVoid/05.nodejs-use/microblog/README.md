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


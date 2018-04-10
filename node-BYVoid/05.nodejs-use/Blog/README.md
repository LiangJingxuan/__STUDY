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

>express -t ejs 文件名

根据提示依次进行相关操作：

>cd 文件名

>npm install

<b>5.2.3 启动服务器</b>

查看package.json文件配置信息：

`"scripts": {
    "start": "node ./bin/www"
  }
`

使用 npm start 命令运行node服务，然后在浏览器中打开输入127.0.0.1:3000来进入页面，显示欢迎页说明安装及设定正确无误。

<b>5.2.4 工程的结构</b>
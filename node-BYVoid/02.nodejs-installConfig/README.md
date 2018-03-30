<h3>2.1、安装前的准备</h3>

笔者不建议在 Windows 上进行 Node.js 开发或部署，当然出于学习目的，这些影响也是无关紧要的。


<h3>2.2、快速安装</h3>

<b>2.2.1 Microsoft Windows系统上安装Node.js</b>

在 Windows 上安装 Node.js 十分方便，你只需要访问http://nodejs.org 点击Download链接，然后选择Windows Installer，下载安装包。点击Next即可自动完成安装。安装程序不会询问你安装路径，Node.js 会被自动安装到 C:\Program Files\nodejs 或C:\Program Files (x86)\nodejs（64位系统）目录下，并且会在系统的 PATH 环境变量中增加该目录，因此我们可以在 Windows 的命令提示符中直接运行 node。

为了测试是否已经安装成功，我们在运行中输入 cmd，打开命令提示符，然后输入 node，将会进入 Node.js 的交互模式。

通过这种方式安装的 Node.js 还自动附带了 npm，我们可以在命令提示符中直接输入 npm 来使用它。

<b>2.2.2 Linux 发行版上安装Node.js</b>

Node.js 目前还处在快速变化的时期，它的发行速度要远远大于 Linux 发行版维护的周期，因此各个 Linux 发行版官方的软件包管理器中提供的 Node.js 往往都比较过时。尽管如此，我们还是可以通过发行版的包管理器获得一个较为稳定的版本，根据不同的发行版，通过以下命令来获取Node.js，参见表2-1。

<b>表2-1 在 Linux 发行版中获取 Node.js</b>

<table>
    <thead>
    <tr>
        <td>Linux 发行版</td>
        <td>命 令</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>Debian/Ubuntu</td>
    	<td>apt-get install nodejs</td>
	</tr>
	<tr>
		<td>Fedora/RHEL/CentOS/Scientific Linux</td>
		<td>yum install nodejs</td>
	</tr>
	<tr>
		<td>openSUSE</td>
		<td>zypper install nodejs</td>
	</tr>
	<tr>
		<td>Arch Linux</td>
		<td>pacman -S nodejs</td>
	</tr>
	</tbody>
</table>

如果你需要用软件包管理器来获得较新版本的 Node.js，就要根据不同的发行版选择第三方的软件源，具体请参阅：https://github.com/joyent/node/wiki/Installing-Node.js-via-packagemanager 。

<b>2.2.3 Mac OS X上安装Node.js</b>

Node.js 官方专门提供了 Mac OS X 的安装包，你可以在 http://nodejs.org 找到Download链接，然后选择Macintosh Installer，下载安装包。下载完成后运行安装包，根据提示完成安装。

Node.js 和 npm 会被安装到 /usr/local/bin 目录下，安装过程中需要系统管理员权限。安装成功后你可以在终端机中运行 node 命令进入了 Node.js 的交互模式。如果出现 -bash:node: command not found，说明没有正确安装，需要重新运行安装包或者采取其他形式安装 Node.js。


<h3>2.3、编译源代码</h3>

Node.js 从 0.6 版本开始已经实现了源代码级别的跨平台，因此我们可以使用不同的编译命令将同一份源代码的基础上编译为不同平台下的原生可执行代码。

在编译之前，要先获取源码包。我们建议访问http://nodejs.org 点击Download链接，然后选择Source Code，下载正式发布的源码包。如果你需要开发中的版本，可以通过https://github.com/joyent/node/zipball/master 获得，或者在命令行下输入git clone git://github.com/joyent/node.git 从git获得最新的分支。

<b>2.3.1 在 POSIX 系统中编译</b>

在 POSIX 系统中编译 Node.js 需要三个工具：

	 C++编译器 gcc 或 clang/LLVM；

	 Python 版本 2.5 以上，不支持 Python 3；

	 libssl-dev 提供 SSL/TLS 加密支持。

如果你使用 Linux，那么你需要使用 g++ 来编译 Node.js。在 Debian/Ubuntu 中，你可以通过 apt-get install g++ 命令安装g++。在 Fedora/Redhat/CentOS 中，你可以使用 yuminstall gcc-c++ 安装。

如果使用的是 Mac OS X，那么需要安装 Xcode。默认情况下，系统安装盘中会有 Xcode，可以从光盘中安装，或者访问 https://developer.apple.com/xcode/ 下载最新的版本。

Mac OS X 和几乎所有的 Linux 发行版都内置了 Python，你可以在终端机输入命令python --version 检查 Python 的版本，可能会显示 Python 2.7.2 或其他版本。如果你发现版本号小于2.5或者直接出现了 command not found，那么你需要通过软件包管理器获得一个新版本的 Python，或者到 http://python.org/ 下载一个。

libssl-dev 是调用 OpenSSL 编译所需的头文件，用于提供 SSL/TLS 加密支持。Mac OSX 的 Xcode 内置了 libssl-dev。在 Debian/Ubuntu 中，你可以通过 apt-get install libssl-dev 命令安装。在 Fedora/Redhat/CentOS 中， 你可以通过 yum install openssl-devel 命令安装。同样，你也可以访问 http://openssl.org/ 下载一个。

接下来，进入 Node.js 源代码所在目录，运行：

>./configure

>make

>sudo make install

之后大约等待20分钟，Node.js 就安装完成了，而且附带安装了 npm。如果你使用 Mac OS X，还可以尝试使用 homebrew 编译安装 Node.js。首先在 http://mxcl.github.com/homebrew/ 获取 homebrew，然后通过以下命令即可自动解析编译依赖并安装Node.js：

>brew install node

<b>2.3.2 在 Windows系统中编译</b>

Node.js 在 Windows 下只能通过 Microsoft Visual Studio 编译，因此你需要首先安装 Visual Studio 或者免费的 Visual Studio Express。你还需要安装 Python 2（2.5以上的版本，但要小于3.0），可以在http://python.org/ 取得。安装完 Python 以后请确保在PATH环境变量中添加python.exe 所在的目录，如果没有则需要手动在“系统属性”中添加。

一切准备好以后，打开命令提示符，进入 Node.js 源代码所在的目录进行编译：

```
C:\Users\byvoid\node-v0.6.12>vcbuild.bat release
['-f', 'msvs', '-G', 'msvs_version=2010', '.\\node.gyp', '-I', '.\\common.gypi', '--depth=.',
'-Dtarget_Project files generated.
C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\Microsoft.CppBuild.targets(1151,5):
warning MSB8012: http_parser.vcxproj -> C:\Users\byvoid\node-v0.6.12\
Release\http_parser.lib
js2c, and also js2c_experimental
node_js2c
...
```

大约等待20分钟，编译完成。在 Release 子目录下面会有一个 node.exe 文件，这就是我们编译的唯一目标。也许有些令人惊讶，Node.js 编译后只有一个 node.exe文件，这说明 Node.js的核心非常小巧精悍。直接运行 node.exe 即可进入 Node.js 的交互模式，在系统 PATH 环境变量中添加node.exe文件所在的目录，这样就可以在命令行中运行 node 命令了，剩下的工作就是手动安装 npm 了。


<h3>2.4 安装Node 包管理器</h3>

Node 包管理器（npm）是一个由 Node.js 官方提供的第三方包管理工具，就像 PHP 的Pear、Python 的 PyPI 一样。npm 是一个完全由 JavaScript 实现的命令行工具，通过 Node.js 执行，因此严格来讲它不属于 Node.js 的一部分。在最初的版本中，我们需要在安装完 Node.js以后手动安装npm。但从 Node.js 0.6 开始，npm 已包含在发行包中了，我们在 Windows、Mac 上安装包和源代码包时会自动同时安装 npm。

如果你是在 Windows 下手动编译的，或是在 POSIX 系统中编译时指定了 --without-npm参数，那就需要手动安装 npm 了。http://npmjs.org/ 提供了 npm 几种不同的安装方法，通常你只需要执行以下命令：

>curl http://npmjs.org/install.sh | sh

如果安装过程中出现了权限问题，那么需要在 root 权限下执行上面的语句，或者使用sudo。

>curl http://npmjs.org/install.sh | sudo sh

其他安装方法，譬如从 git 中获取 npm 的最新分支，可以参考 http://npmjs.org/doc/ README.html上的说明。


<h3>2.5 安装多版本管理器</h3>

迄今为止Node.js 更新速度还很快，有时候新版本还会将旧版本的一些 API 废除，以至于写好的代码不能向下兼容。有时候你可能想要尝试一下新版本有趣的特性，但又想要保持一个相对稳定的环境。基于这种需求，Node.js 的社区开发了多版本管理器，用于在一台机器上维护多个版本的 Node.js 实例，方便按需切换。Node 多版本管理器（Node Version Manager，nvm）是一个通用的叫法，它目前有许多不同的实现。通常我们说的 nvm 是指https://github.com/creationix/nvm 或者 https://github.com/visionmedia/n 。笔者根据个人偏好推荐使用 visionmedia/n，此小节就以它为例子介绍 Node 多版本管理器的用法。

n 是一个十分简洁的 Node 多版本管理器，就连它的名字也不例外。它的名字就是 n，没错，就一个字母。

如果你已经安装好了 Node.js 和 npm 环境，就可以直接使用 npm install -g n 命令来安装 n。当然你可能会问：如果我想完全通过 n 来管理 Node.js，那么没安装之前哪来的 npm呢？事实上，n 并不需要 Node.js 驱动，它只是 bash 脚本，使用 npm 安装只是采取一种简便的方式而已。我们可以在 https://github.com/visionmedia/n 下载它的代码，然后使用 make install 命令安装。

关于 n 的更多细节，请访问它的项目主页 https://github.com/visionmedia/n 获取信息。


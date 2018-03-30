<h3>2.1、安装前的准备</h3>

笔者不建议在 Windows 上进行 Node.js 开发或部署，当然出于学习目的，这些影响也是无关紧要的。


<h3>2.2、快速安装</h3>

<b>2.2.1 Microsoft Windows系统上安装Node.js</b>

在 Windows 上安装 Node.js 十分方便，你只需要访问http://nodejs.org， 点击Download链接，然后选择Windows Installer，下载安装包。点击Next即可自动完成安装。安装程序不会询问你安装路径，Node.js 会被自动安装到 C:\Program Files\nodejs 或C:\Program Files (x86)\nodejs（64位系统）目录下，并且会在系统的 PATH 环境变量中增加该目录，因此我们可以在 Windows 的命令提示符中直接运行 node。

为了测试是否已经安装成功，我们在运行中输入 cmd，打开命令提示符，然后输入 node，将会进入 Node.js 的交互模式。

通过这种方式安装的 Node.js 还自动附带了 npm，我们可以在命令提示符中直接输入 npm 来使用它。

<b>2.2.2 Linux 发行版上安装Node.js</b>

Node.js 目前还处在快速变化的时期，它的发行速度要远远大于 Linux 发行版维护的周期，因此各个 Linux 发行版官方的软件包管理器中提供的 Node.js 往往都比较过时。尽管如此，我们还是可以通过发行版的包管理器获得一个较为稳定的版本，根据不同的发行版，通过以下命令来获取Node.js，参见表2-1。

<h4>表2-1 在 Linux 发行版中获取 Node.js</h4>

<table>
    <thead>
    <tr>
        <td>Linux 发行版</td>
    </tr>
    <tr>
    	<td>命 令</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>Debian/Ubuntu</td>
    	<td>Fedora/RHEL/CentOS/Scientific Linux</td>
    	<td>openSUSE</td>
    	<td>Arch Linux</td>
	</tr>
	<tr>
    	<td>apt-get install nodejs</td>
    	<td>yum install nodejs</td>
    	<td>zypper install nodejs</td>
    	<td>pacman -S nodejs</td>
	</tr>
	</tbody>
</table>

如果你需要用软件包管理器来获得较新版本的 Node.js，就要根据不同的发行版选择第三方的软件源，具体请参阅：https://github.com/joyent/node/wiki/Installing-Node.js-via-packagemanager 。

<b>2.2.3 Mac OS X上安装Node.js</b>

Node.js 官方专门提供了 Mac OS X 的安装包，你可以在 http://nodejs.org 找到Download链接，然后选择Macintosh Installer，下载安装包。下载完成后运行安装包，根据提示完成安装。

Node.js 和 npm 会被安装到 /usr/local/bin 目录下，安装过程中需要系统管理员权限。安装成功后你可以在终端机中运行 node 命令进入了 Node.js 的交互模式。如果出现 -bash:node: command not found，说明没有正确安装，需要重新运行安装包或者采取其他形式安装 Node.js。




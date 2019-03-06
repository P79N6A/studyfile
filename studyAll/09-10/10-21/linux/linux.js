1.Terminal(终端)
在使用Linux时，一般通过Shell中间程序来操作

终端模拟器(Terminal)
除此之外还有一些常见的终端处理器gnome-terminal，kconsole，xterm等等

linux的多用户登录就是通过/dev/tty设备来完成的
linux'默认提供6个纯命令行界面的''terminal'（准确的说是6个virtual consoles）供用户登录

shell(接收用户输入命令的程序)
shell是命令解析器，类似windows的cmd

正式学习命令行之前，需要先掌握几个有用的小技巧
【tab】使用tab键：自动补全命令，补全目录，补全参数。。				

【Ctrl+c】当你输入错误命令，导致终端出现问题时，可以用【Ctrl+c】终止当前命令
//不要乱用【Ctrl+c】有时候当你看到终端没有任何反应或提示，也不能接受你的输入，可能只是运行的程序需要你耐心的等一下

//其他一些快捷键
'按键'		'作用'
Ctrl+d		键盘输入结束，或者'退出终端'
Ctrl+s		'暂停'当前程序，按任意键恢复运行
Ctrl+z		将当前程序'放到后台运行'，恢复到前台用fg
Ctrl+a 		'home键'
Ctrl+e		'end键'
Alt+Backspace '向前删除一个单词 '
Shift+PgUp	'将终端显示向上滚动'
Shift+PgDn	'将终端显示向下滚动'

//历史输入命令
可以用键盘的'↑，↓两个按键来切换'

//通配符	*，?	对字符串进行模糊匹配
终端输入的通配符只会出现在命令的“参数值”里面，（不用再命令名称中）
参数中有*，shell会将其当作路径或文件名，在磁盘上搜寻可能的匹配
存在就就进行代换，不存在就将*作为字符传给命令
传入通配符shell先完成命令的重组。再执行命令

先看 'touch 新建文件'（可以包含后缀）//用touch建立四个文件
touch asafsaf.text asasdas.text qweqwrtq.text pasdkap.text 	#新建四个.text文件

批量创建文件//{2..19}
touch name{1..10}.txt	#创建名字是name1~name10的一批文件

ls '列出当前目录的内容'(可精确列出) //用* 
ls *.te*	#列出名称中含有“.te”的文件


//Shell常用通配符：
字符						含义
*							匹配 0 或多个字符
?							匹配任意一个字符
[list]						匹配 list 中的任意单一字符
[!list]					匹配 除list 中的任意单一字符以外的字符
[c1-c2]					匹配 c1-c2 中的任意单一字符 如：[0-9] [a-z]
{string1,string2,...}	匹配 sring1 或 string2 (或更多)其一字符串
{c2..c2}					匹配 c1-c2 中全部字符 如{1..10}


//学会在命令行中获取帮助
在Linux环境中，如果你遇到困难，
man <command_name> //获取命令的说明和使用方法的详细介绍

区段	说明
1		一般命令
2		系统调用
3		库函数，涵盖了C标准函数库
4		特殊文件（通常是/dev中的设备）和驱动程序
5		文件格式和约定
6		游戏和屏保
7		杂项
8		系统管理命令和守护进程

安装banner软件 sudo apt-get update;sudo apt-get install sysvbanner
安装后能够用banner输出图形字符

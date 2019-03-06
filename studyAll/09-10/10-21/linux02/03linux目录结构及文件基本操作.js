//一、Linux目录结构
Linux是'以树形结构来构建整个系统的'，可以理解为一个用户可操作系统的骨架
虽然本质上'无论是目录结构''还是操作系统内核''都是存储在磁盘上的'，linux的磁盘
'挂载在'目录上的，每一个目录不仅能使用本地磁盘分区的文件系统，也能使用网
络上的文件系统

1.FHS 标准
'FHS'定义了系统中每一个区域的用途，所需要的最小构成文件和目录，同时还出了
例外处理与矛盾处理

FHS 定义了两层规范，第一层是， / 下面的各个目录应该要放什么文件数据，
例如: 
'/etc'应该要放置设置文件，
'/bin 与 /sbin'则应该要放置可执行文件等等。

第二层则是针对 '/usr 及 /var 这两个目录的子目录来定义'。例如 /var/log 放置
系统登录文件、'/usr/share 放置共享数据等等'。

2.目录路径

路径:
cd 能够切换目录
'.'表示当前目录
'..'表示上级目录
'-'表示上次所在目录
'~'表示当前用户home目录
'pwd'表示当前目录绝对路径
'ls -a' 命令查看隐藏文件
以根"/"目录为起点的完整路径，表现形式如： /usr/local/bin

相对路径:
你相对当前目录的路径也当前目录'.'为起点，目标目录为终点。 表现：usr/local/bin（设当前在home）

提示：在进行目录切换的过程中请多使用 Tab 键自动补全，
可避免输入错误，连续按两次Tab可以显示全部候选结果

//二、Linux 文件的基本操作
1.新建
'touch' 新建空白文件   'touch test.text'

'mkdir（make directories）' 可以创建一个空目录，也可同时指定创建目录的权限属性"mkdir mydir" 
使用' -p '参数，同时创建父目录（如果不存在该父目录），同时创建一个多级目录
（这在有时候安装软件，配置安装路径时非常有用）：'mkdir -p father/son/grandson'

2.复制文件或者目录 'cp'
'cp copyFile dir'命令'复制一个文件指定目录'。 "cp test.text father/son/grandson"

'cp -r copydir dir''复制目录'。cp -r father family
'如果直接使用cp命令复制一个目录会出错，要成功需要加上-r'

3.删除
'删除文件使用rm（remove files or directories）命令'
'rm file'删除文件'rm test'
'rm -f file'删除只读文件'rm -f test'
 
'rm -r dir'删除文件夹'rm -r family'
删除目录 和复制目录一样，要删除一个目录，也需要加上-r或-R参

4.移动文件与文件重命名
'mv file dir' '移动'文件'到相应的目录' 'mv test father'

'mv oName nName'重命名文件 'mv test test1'

5查看文件
标准输入输出：
当我们执行一个 shell 命令行时通常会自动打开三个标准文件，即'标准输入文件'（stdin），
默认对应终端的键盘；
//标'准输出文件'（stdout）和'标准错误输出文件'（stderr），这两个文件都对应被重定向到终端的屏幕，
//以便我们能直接看到输出内容。进程将从标准输入文件中得到输入数据，将正常输出数据输出到标准
//输出文件，而将错误信息送到标准错误文件中。
cat 正序显示 'cat test.text'    显示行号的正序显示'cat -n test.text'
tac 倒序显示 'tac test.text' 

'tail /etc/test.log'  显示文件头几行和最后几行 
加入参数'-n num' 表示只看几行  'tail -n 1 /etc/test.log'只一行

加入参数'-f',动态播放文件内容'tail -f /etc/test.log'

6.查看文件类型
ls -a 查看文件类型

7.编辑文件
使用vimtutor，另外学习


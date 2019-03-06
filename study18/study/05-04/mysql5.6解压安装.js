'MySQL'是一个'小巧'玲珑但功能'强大的数据库'，目前十分流行。但是官网给出的安装包有两种格式，
一个是msi格式，一个是zip格式的。很多人下了zip格式的解压发现没有setup.exe，
面对一堆文件一头雾水，不知如何安装。下面笔者将介绍如何解决此情况下安装过程中的各种问题

方法/步骤
1
MySQL安装文件分为两种，一种是msi格式的，一种是zip格式的。如果是msi格式的可以直接点击安装，
按照它给出的安装提示进行安装（相信大家的英文可以看懂英文提示），一般MySQL将会安装在
C:\Program Files\MySQL\MySQL Server 5.6 该目录中；
'zip格式'是'自己解压'，
'解压'缩之'后'其实MySQL就可以使用了，但是'要进行配置'。

2
解压之后可以将该文件夹改名，放到合适的位置，个人建议把文件夹改名为MySQL Server 5.6，
放到C:\Program Files\MySQL路径中。当然你也可以放到自己想放的任意位置。

3
完成上述步骤之后，很多用户开始使用MySQL，但会出现图示的错误。这是因为没有'配置环境变量'所致。
配置环境变量很简单：

我的电脑->属性->高级->环境变量

选择'PATH',在其'后面添加': 你的mysql bin文件夹的路径 (如:
	'C:\Program Files\MySQL\MySQL Server 5.6\bin' )

PATH=.......;C:\Program Files\MySQL\MySQL Server 5.6\bin 
(注意是追加,不是覆盖)

4
'配置完'环境变量之后先别忙着启动mysql，我们还需要'修改'一下'配置文件'
（如果'没有配置'，之后启动的时候就会'出现'图中的错误哦！:'错误2 系统找不到文件'），
mysql-5.6.1X'默认'的配置'文件'是'在'
'C:\Program Files\MySQL\MySQL Server 5.6\my-default.ini，'
或者自己建立一个my.ini文件，

在其中修改或添加配置（如图）： 

[mysqld] 
basedir=C:\Program Files\MySQL\MySQL Server 5.6（mysql所在目录） 
datadir=C:\Program Files\MySQL\MySQL Server 5.6\data（mysql所在目录\data）

5
以'管理员身份'运行'cmd'（一定要用管理员身份运行，不然权限不够），

输入：'cd C:\Program Files\MySQL\MySQL Server 5.6\bin'
进入mysql的bin文件夹
(不管有没有配置过环境变量，也要进入bin文件夹，否则之后启动服务仍然会报错误2)

输入'mysqld -install'(如果不用管理员身份运行，
将会因为权限不够而出现错误：Install/Remove of the Service Denied!) 

安装成功

6
安装成功后就要'启动服务'了，继续在cmd中'输入:net start mysql'（如图）,服务启动成功！

此时很多人会'出现错误'，请看注意：

注意：这个时候经常会出现'错误2'和'错误1067'。

如果出现“错误2 系统找不到文件”，检查一下'是否修改'过'配置文件'或者'是否'进入'在bin'目录'下操作'，
如果配置'文件修改正确'并且'进入'了'bin'文件夹，需'要先删除mysql'（输入 mysqld -remove）
'再重新安装'（输入 mysqld -install）；

如果出现'错误1067'，那就'是配置文件''修改错误'，确认一下配置文件是否正确。

7
服务'启动成功'之后，就可以登录了，如图，'输入mysql -u root -p'
（第一次登录没有密码，直接按回车过）,'登录成功！'




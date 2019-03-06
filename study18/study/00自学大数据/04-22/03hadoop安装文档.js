问题导读：
1.'如何配置'各个'节点'之间'无密码互通'？
2.'启动hadoop'，'看不到进程'的'原因是什么'？
3.'配置hadoop的步骤'是什么？

4.有'哪些配置文件'需'要修改'？
5.如果'没有配置文件'，该'如何找到'该'配置文件'？
6.'环境变量配置了'，但是'不生效的原因是什么'？
7.'如何查看hadoop2''监控页面'

首先说一下这个安装过程需要注意的地方

一、使用'新建用户'可能会'遇到的问题'
（1）权限问题：对于新手经常使用root，刚开始可以使用，但是如果想真正的学习，
必须学会使用其他用户。也就是你需要学会新建用户，但是新建用户，并不是所有人都会的。
具体可以参考ubuntu创建新用户并增加管理员权限，这里面使用adduser是最方便的。
也就是说你需要通过这里，学会给Linux添加用户，并且赋权，上面那篇文章会对你有所帮助。

（2）使用新建用户，你遇到另外一个问题，就是文件所属权限，因为新建的文件，
有的属于root用户，有的属于新建用户，例如下面情况，我们看到mv.sh是属于root用户，
大部分属于aboutyun用户。所以当我们两个不同文件不能访问的时候，这个可能是原因之一。
也是在这里，当你新建用户的时候，可能会遇到的新问题。

（3）上面我们只是提出了问题，但是根本没有解决方案，这里在提出解决方案，
我们如何改变文件所属用户。
比如上图中，'mv.sh属于root用户'，那么我们怎么'让他所属about云用户'。可以是下面命令
sudo chown -R aboutyun:aboutyun mv.sh
1.sudo：如果不是root用户，不带上这个命令会经常遇到麻烦，所以需要养成习惯。
至于sudo详细解释可以看下面。
'sudo是'linux'系统管理指令'，是'允许系统管理员'让
'普通用户''执行'一些或者全部的'root命令的'一个'工具'，如halt，reboot，su等等。
这样不仅减少了root用户的登录 和管理时间，同样也提高了安全性。
'sudo不是'对'shell的一个代替'，它'是面向每个命令的'。

2.chown->'change own的意思'。即'改变所属文件'。对于他不了解的同学，
可以查看：让你真正了解chmod和chown命令的用法
3.aboutyun:aboutyun代表aboutyun用户及aboutyun用户组
4.即是被授权的文件


https://pan.baidu.com/s/1sl8WXBn

(下载包为'hadoop2.2')
'下载'完毕，我们就需要'解压'
tar zxvf hadoop-2.2.0_x64.tar.gz
这里是解压到当前路径。
这里就开始动手了，下面也介绍一下整体的情况：

1、这里我们搭建一个由三台机器组成的集群：

ubuntu01
hadoop@master:~$ cat /etc/hosts
127.0.0.1 	 localhost
#127.0.1.1        master
192.168.153.128  master
192.168.153.130  slave1
192.168.153.129  slave2

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
hadoop@master:~$ cat /etc/hostname 
master
hadoop@master:~$ 

ubuntu02
hadoop@slave1:~$ cat /etc/hosts
127.0.0.1	localhost
#127.0.1.1       slave1
192.168.153.130  slave1

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
hadoop@slave1:~$ cat /etc/hostname 
slave1
hadoop@slave1:~$ 

ubuntu03
hadoop@slave2:~$ cat /etc/hosts
127.0.0.1	localhost
#127.0.1.1       slave2
192.168.153.129  slave2

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
hadoop@slave2:~$ cat /etc/hostname 
slave2
hadoop@slave2:~$ 



2、'打通到slave节点'的'SSH无密码登陆'
这里面'打通无密码登录'，很多新手遇到了问题，这里安装的时候，具体的操作，

这是个人总结的哦命令，相信对你有所帮助
http://www.aboutyun.com/blog-61-127.html
05使用配置hadoop中常用的Linux(ubuntu)命令.js

原理，就是我'把工钥''放'到'里面'，然后'本台机器'就'可以ssh无密码登录'了。
如果'想彼此无密码'登录，那么就需要'把彼此'的'工钥'（*.pub）'放到authorized_keys里'面
然后我们进行下面步骤：
3.1 '安装ssh'
一般系统是'默认安装'了'ssh命令'的。如果'没有'，或者版本比较老，则'可以重新安装'：
sudo apt-get install ssh
3.2'设置local无密码登陆'

具体步骤如下：
第一步：'产生密钥'
$ ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa
第二部：'导入authorized_keys'
$ cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
第二部'导入'的'目的是'为了'无密码'等，这样输入如下命令：
ssh localhost
就'可'以'无密码登录了'。
下面展示一下hosts的配置，及无密码登录的效果








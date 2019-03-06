生成key：
$ 'ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa'
$ 'cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys'

   '-t'   '密钥类型'可以'用 -t' 选项'指定'。如果没有指定则默认生成用于SSH-2的RSA密钥。
   '-f filename'             '指定密钥文件名'。

来源：http://www.aboutyun.com/thread-6487-1-1.html

远程登录执行shell命令key
ssh'远程登录'，并在远程'创建文件'
"ssh user@host 'mkdir -p .ssh && cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub"
来源：http://www.aboutyun.com/thread-6977-1-1.html

远程复制
'scp authorized_keys tan@ubuntu:~/.ssh/authorized_keys_from_yang'
'sudo scp -r /usr/hadoop aboutyun@slave1:~/'


'文件追加内容'
'cat authorized_keys_from_yang  >>  authorized_keys'

'解压包'：
sudo tar zxvf ./jdk-7-linux-i586.tar.gz  -C /usr/lib/jvm

'文件复制'：（jdk复制到opt中）
sudo cp -r  jdk/ /opt

'文件移动'
sudo mv jdk opt
(有的时候没有权限，所以必须加上sudo)

文件'更改所有者'(下面为更改hadoop文件夹的权限)
sudo chown -R  aboutyun:aboutyun  hadoop

查看'端口是否被暂用'
'sudo netstat -ap | grep 8080'
'sudo netstat -ant| grep 3306'
Proto Recv-Q Send-Q Local Address               Foreign Address             State       PID/Program name
tcp        0      0 0.0.0.0:3306                0.0.0.0:*                   LISTEN      1651/mysqld
表示的含义
'mysql的'默认端口 '3306' 打'开着'
'0.0.0.0' '代表'你的'本地网络'地址 '后一个'代表外部'网络地址' '有连接的话''就有'真正的'IP地址'了

'hadoop开启调试'
开启'debug export HADOOP_ROOT_LOGGER=DEBUG,console'

Linux打包命令

'tar czvf my.tar.gz hadoop-2.4.0-src'

杀掉一个进程
kill 进程号
'kill -9 进程号'

rpm -qa|grep softname
表示的含义是：
就是'从安装的软件中''查询出softname'这个软件

详解如下：
'grep 内容 对象'
表示'从“对象”'中'查找“内容”'，'并打印'
'|'
管道符号，'前'一个'命令的输出'（即结果）'作为''下个命令'的'输入'
'rpm -qa'
rpm管理命令 '查询所有'安装的'软件'
所以rpm -qa|grep softname
就是从安装的软件中查询出softname这个软件


'hive安装mysql'常用命令

查看'软件是否安装'
'netstat -tap | grep mysql'


测试mysql远程连接成功：

mysql -h172.16.77.15 -uroot -p123

mysql -h主机地址 -u用户名 －p用户密码

查看字符集
 show variables like '%char%';

修改字符集：
vi /etc/my.cnf
在[client]下添加
default-character-set=utf8
 
创建sudo无密码登陆
给aboutyun用户设置无密码sudo权限：
chmode u+w /etc/sudoers
aboutyun ALL=(root)NOPASSWD:ALL
chmod u-w /etc/sudoers
测试：sudo ifconfig



'ubuntu''查看服务列表'代码  
'sudo service --status-all'
'sudo initctl list'

'查看文件大小：'
'du -sh hadoop-2.7.0-src'

'打包zip'
'zip -r myfile.zip ./*'
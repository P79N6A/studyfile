问题导读：
1.如何'卸载''mysql'？
2.'安装mysql'，如何'查看远程端口'是否'能否访问'？
3.如何'配置mysql'能够'远程访问'？

1、'卸载mysql'
查看'是否有装mysql'
sudo dpkg -l | grep mysql

卸载mysql
'sudo apt-get autoremove --purge mysql-server-5.0'
'sudo apt-get remove mysql-server'
'sudo apt-get autoremove mysql-server'
'sudo apt-get remove mysql-common' (非常重要)
上面的其实'有一些'是'多'余的，建议还是'按照顺序''执行一遍'

'清理残留'数据
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P

2、'安装 mysql' 
sudo apt-get install mysql-server
sudo apt-get install mysql-client
sudo apt-get install php5-mysql(安装php5-mysql 是将php和mysql连接起来，这个可以不要！) 

安装'完成'，'MySQL服务'器应该'自动启动'。您可以在终端提示符后'运行'以下命令来'检查 MySQL'
服务器'是否'正'在运行'： 
sudo netstat -tap | grep mysql
当您运行该命令时，您可以看到'类似下面的行'：
tcp 0 0 localhost.localdomain:mysql *:* LISTEN - 

查看'3306端口''有没开启'：
sudo netstat -ant

如果'没有看到'对应的记录就'重启Mysql'
sudo /etc/init.d/mysql restart

3、'进入mysql'
mysql -uroot -p 管理员密码

'配置 MySQL' 的'管理员初始密码'：
sudo mysqladmin -u root password '123456'


4、'配置外网连接'
第一步：'my.cnf'
vi /etc/mysql/my.cnf
'找到bind-address = 127.0.0.1'
'注释掉这行'，如：#bind-address = 127.0.0.1
或者改为： bind-address = 0.0.0.0
'重启MySQL'
sudo /etc/init.d/mysql restart

第二步：
'授权用户'能进行'远程连接'
mysql -u root -p
输入root密码
use mysql
grant all privileges on *.* to root@"%" identified by "1234.a" with grant option;
flush privileges;
'第一行'命令是'使用mysql数据库'。
'第二行'命令解释如下，'*.*'：'第一个*'代表'数据库名'；'第二个*'代表'表名'。
这里的意思是'所有数据库'里的'所有表'都'授权给用户'。'root'：'授予root账号'。
'“%”'：表示'授权'的'用户IP''可以指定'，'这里'代表'任意'的'IP'地址'都能访问'MySQL数据库。
'“password”'：'分配账号'对应的'密码'，这里'密码'自己'替换成'你的'mysql root帐号密码'。
第三行命令是'刷新权限'信息，也即是'让'我们所作的'设置马上生效'。
如果以上设置后，'还是'从外网'连接不到'mysql那么'就reboot'。

测试远程连接命令：
'mysql -h主机地址 -u用户名 －p用户密码'
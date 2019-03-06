--通过.sock文件连接mysql
mysql -uroot -p1234 -P9066 -h127.0.0.1 -S /tmp/3307_mysql.sock

--退出mysql命令窗口
quit;

启动mycat
./mycat start

启动mycat-web
启动顺序必须为：zookper->mycat->mycat_web,否则可能会出现问题
./zkServer.sh stop
./zkServer.sh start
netstat -ant | grep 2183

启动mycat
启动web
./start.sh &
netstat -ant | grep 8083



--'启动mysql'
1、启动3307（主数据库）
'/home/data/mysql-venue/3307/start.sh'

2、启动3308（从数据库）
'/home/data/mysql-venue/3308/start.sh'

3、连接主数据库
'mysql -h127.0.0.1 -uroot -P3307 -p1234'

4、连接从数据库
'mysql -h127.0.0.1 -uroot -P3308 -p1234'

5、进入主数据库查看master状态
'show master status;'

记录File的名称
'记录Position的值'

6、进入从数据库，查看同步状态
'show slave status\G;'

此时'Slave_IO_Running'和'Slave_SQL_Running'应'为No'

在'从数据库'中'执行'如下命令
change master to 
master_host='localhost',
master_port=3307,
master_user='master',
master_password='1234',
master_log_file='mysql-bin.000006', 
master_log_pos=358;
    其中'master_log_file'改为'master的file'，'master_log_pos'改为'master中的Position'
再'启动主从复制'，'执行start slave';
'查看主从状态''show slave status\G';
如果'Slave_IO_Running'和'Slave_SQL_Running'则Yes表示'主从同步配置成功'

--'启动zookeeper(mycat要用到)'
/home/data/mycat/zookeeper/bin/zkServer.sh start

--'启动mycat server'
/home/data/mycat/mycat/bin/mycat start

--'启动mycat-web'
/home/data/mycat/web/start.sh &

--启动api管理系统
/home/project/ligusports/project/tomcat/bin/startup.sh
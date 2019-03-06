首先在'两台''MySQL服务器'192.168.1.89(主)和192.168.1.90（备）
上'安装版本一样'的'mysql'，大家可以参照着点击打开链接去安装

安装好以后在192.168.1.89（主）上面的'my.cnf'文件上面'加入以下参数'
view plain copy
binlog_format = mixed  
expire_logs_days = 15  
//慢sql时间  
slow_query_log = 1  
long_query_time = 1  
//慢sql输出位置  
slow_query_log_file = /usr/local/mysql/logs/mysql-slow.log  
log_error = /usr/local/mysql/logs/mysql-error.log  
'主服务'器的'id'
server-id = 1  
log-bin = /usr/local/mysql/logs/mysql-bin.log  
'需'要'同步的db'名称  
binlog-do-db=test  
'不需'要'同步的db'名称  
binlog-ignore-db=mysql  
innodb_buffer_pool_size = 1000M  

192.168.1.90（从）上面的'my.cnf文件''加入一下参数'
[html] view plain copy
binlog_format = mixed  
expire_logs_days = 15  
#慢sql时间  
slow_query_log = 1  
long_query_time = 1  
#慢sql输出位置  
slow_query_log_file = /usr/local/mysql/logs/mysql-slow.log  
log_error = /usr/local/mysql/logs/mysql-error.log  
'从服务'器的'id'
server-id = 2  
log-bin = /usr/local/mysql/logs/mysql-bin.log  
'需'要'同步的db'名称  
replicate-do-db=test  
'不需'要'同步的db'名称  
replicate-ignore-db=mysql  
innodb_buffer_pool_size = 1000M  


配置MySQL'主服务器'（192.168.1.89）  
mysql  -uroot  -p    #进入MySQL控制台  
#'创建'用于'主从备份'的'帐号'
insert into mysql.user(Host,User,Password) values('localhost','slavetest',password('123456'));   
ERROR 1364 (HY000): Field 'ssl_cipher' doesn't have a default value  
报以上错误的话  
原因：在我的'配置文件my.cnf'中有这样'一条语句'  
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES  
'指定'了'严格模式'，为了安全，严格模式'禁止通过insert' 这种形式直接'修改mysql库'中的'user表'
进行添加新用户  
解决办法：  
将配置文件中的STRICT_TRANS_TABLES删掉，即改为：  
sql_mode=NO_ENGINE_SUBSTITUTION  
  
#建立MySQL主从数据库同步用户slavetest密码123456  
flush privileges;   #刷新系统授权表  
  
#'授权用户'slavetest'只'能'从（主）'192.168.1.89这个'IP访问主服务器'192.168.1.90上面的数据库，
并且'只具有'数据库'备份的权限'，设置密码为123456  
grant replication slave  on *.* to 'slavetest'@'192.168.1.89' 
identified by '123456' with grant option;   
  
备份db  '先锁表' 
FLUSH TABLES WITH READ LOCK;  
然后'重新起一个ssh'再'导出'
mysqldump -u root -p -h 127.0.0.1 -P 3306 --skip-lock-tables test >/home/sh/test.sql  
然后再查看,记录下bin和pos  
SHOW MASTER STATUS;  
+------------------+----------+--------------+------------------+-------------------+  
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |  
+------------------+----------+--------------+------------------+-------------------+  
| mysql-bin.000002 |      752 |              | mysql            |                   |  
+------------------+----------+--------------+------------------+-------------------+  
1 row in set (0.00 sec)  
'最后解锁'  
UNLOCK TABLES;  
  
然后'传输到''另外一台服务器'  
scp test.sql root@192.168.1.90:/home/sh/  


'配置从Mysql服务器'（192.168.1.90）  
mysql  -u root -p  #'进入从服务器'MySQL控制台  
create database test;   #'创建数据库'  
  
use test    #进入数据库  
  
source  /home/sh/test.sql  #导入备份文件到数据库  
或者通过以下的方式也可以导入到db  
mysql -u root -p -h 127.0.0.1 -P 3306 -B test < test.sql  
停止同步  
stop slave;  
#'执行同步'语句  
change master to master_host='192.168.1.89', master_port=3306,master_log_file='mysql-bin.000002',master_log_pos=752,master_user='slaveTest',master_password='123456';  
开始同步  
start slave;  
#'查看'slave'同步信息'，出现以下内容  
SHOW slave STATUS \G  
root@(none) 11:04>show slave status\G;  
*************************** 1. row ***************************  
               Slave_IO_State: Waiting for master to send event  
                  Master_Host: 192.168.1.89  
                  Master_User: slaveTest  
                  Master_Port: 3306  
                Connect_Retry: 60  
              Master_Log_File: mysql-bin.000002  
          Read_Master_Log_Pos: 752  
               Relay_Log_File: relay-log.000003  
                Relay_Log_Pos: 372  
        Relay_Master_Log_File: binlog.000007  
             Slave_IO_Running: Yes  
            Slave_SQL_Running: Yes  
              Replicate_Do_DB: test  
          Replicate_Ignore_DB: mysql,mysql  
           Replicate_Do_Table:   
       Replicate_Ignore_Table:   
      Replicate_Wild_Do_Table:   
  Replicate_Wild_Ignore_Table: mysql.%  
                   Last_Errno: 0  
                   Last_Error:   
                 Skip_Counter: 0  
          Exec_Master_Log_Pos: 229  
              Relay_Log_Space: 797  
              Until_Condition: None  
               Until_Log_File:   
                Until_Log_Pos: 0  
           Master_SSL_Allowed: No  
           Master_SSL_CA_File:   
           Master_SSL_CA_Path:   
              Master_SSL_Cert:   
            Master_SSL_Cipher:   
               Master_SSL_Key:   
        Seconds_Behind_Master: 0  
Master_SSL_Verify_Server_Cert: No  
                Last_IO_Errno: 0  
                Last_IO_Error:   
               Last_SQL_Errno: 0  
               Last_SQL_Error:   
  Replicate_Ignore_Server_Ids:   
             Master_Server_Id: 88888  
1 row in set (0.00 sec)  


最后注意查看：  
Slave_IO_Running: Yes      
Slave_SQL_Running: Yes  
以上这两个参数的值为'Yes'，即说明'配置成功'！  
   
  
'测试'MySQL主从服务器'双机热备'是否成功  
1、'进入MySQL主服务器'  
mysql -u root -p  #进入主服务器MySQL控制台  

use test   '#进入数据库'  
  
CREATE TABLE test2 ( id int not null ,name char(20) );   #创建test表  
2、'进入MySQL从服务器'  

mysql -u root -p  #进入MySQL控制台  

use test   '#进入数据库'  

show  tables;  #查看test表结构，会看到有一个新建的表test2，表示数据库同步成功  
  
至此，MySQL数据库配置主从服务器实现双机热备实例教程完成 
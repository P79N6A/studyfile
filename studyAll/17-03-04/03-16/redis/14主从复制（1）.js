主机数据更新之后根据配置和策略，自动同步到备机的/*master/slaver*/机制，
Master以写为主 
Slave以读为主

读写分离
容灾恢复   主机挂掉，立马切到从机

1.配从不配主	不管主机，配置从机，使用从机监视主机
2.从库配置：slaveof 主库IP 主库端口
	每次与master断开之后，都需要重新连接，除非配置redis.conf文件
3.修改配置文件细节操作
4.常用三招
	一主二仆:
	薪火相传:
	反客为主:


配置单机多实例
daemonize yes /*开始守护进程*/
pidfile redis_6379.pid  /*默认进程路径*/
port 6379
logfile "6379.log"
dbfilename dump6381.rdb

怎样开始从机复制？
方法1.编辑文件
vim /etc/redis6380.conf
slaveof 127.0.0.1 6379

方法2.使用命令
slaveof 127.0.0.1 6379

info replication
# Replication
role:master /*角色是master*/
connected_slaves:2
slave0:ip=127.0.0.1,port=6380,state=online,offset=309,lag=1 /*拥有的从机6380*/
slave1:ip=127.0.0.1,port=6381,state=online,offset=309,lag=1 /*拥有的从机6381*/
master_repl_offset:309
repl_backlog_active:1  /*激活状态*/
repl_backlog_size:1048576
repl_backlog_first_byte_offset:2
repl_backlog_histlen:308
127.0.0.1:6379> 


127.0.0.1:6380> info replication
# Replication
role:slave /*角色是从机*/
master_host:127.0.0.1
master_port:6379 /*对应主机是6379*/
master_link_status:up /*联通状态*/
master_last_io_seconds_ago:6
master_sync_in_progress:0
slave_repl_offset:659
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
127.0.0.1:6380> 


127.0.0.1:6381> info replication
# Replication
role:slave /*角色是从机*/
master_host:127.0.0.1
master_port:6379  /*对应主机是6379*/
master_link_status:up /*联通状态*/
master_last_io_seconds_ago:0
master_sync_in_progress:0
slave_repl_offset:673
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
127.0.0.1:6381> 


读写分离  只有主机能写，从机只能读
主机挂掉  从机依然是从机 但是联机状态是down离线
主机回归  从机重新联机上线


从机挂掉  其他无影响，从机上线后变master（写入配置文件就不需要这么做）
		  从新使用 slaveof 127.0.0.1 6379 回归从机





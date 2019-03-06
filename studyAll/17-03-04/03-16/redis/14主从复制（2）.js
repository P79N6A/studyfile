薪火相传 /*我们把79给80,80给到81  从而都有了*/
	上一个slave是下一个的master，slave同样可以接收其它slaves的连接和同步请求
	那么该slave作为了链条中下一个的master，可以有效减轻master的写压力
	中途变更转向会清除之前的数据，重新建立要拷贝最新的
	slaveof新主库ip新主库端口

/*79传给80*/
127.0.0.1:6380> SLAVEOF 192.0.0.1 6379
OK
127.0.0.1:6380> 

/*80传给81*/
127.0.0.1:6381> SLAVEOF 127.0.0.1 6380
OK
127.0.0.1:6381> 

/*设置了薪火相传模式后 79就一个slave*/
127.0.0.1:6379> info replication
# Replication
role:master
connected_slaves:0
master_repl_offset:393
repl_backlog_active:1   /*79剩下一个了*/
repl_backlog_size:1048576
repl_backlog_first_byte_offset:2
repl_backlog_histlen:392
127.0.0.1:6379> 

127.0.0.1:6380> info replication
# Replication
role:slave  /*是slave*/
master_host:192.0.0.1
master_port:6379
master_link_status:down
master_last_io_seconds_ago:-1
master_sync_in_progress:0
slave_repl_offset:1
master_link_down_since_seconds:1490380657
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:2
repl_backlog_histlen:56
127.0.0.1:6380> 



反客为主：/*主机挂了，让从机上位*/
slaveof no one//让该主机成为master
从机用slaveof 127.0.0.1 XXXX 换新主机

复制原理：slave启动成功连接到master后会发送一个sync命令
Master接收到命令启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，
在后台进程执行完毕之后，master将传送整个数据文件到slave，已完成一次完全同步
全量复制：slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。
增量复制：master继续将新的所有收集到的修改命令依次传给slave，完成同步
但是只要是重新连接master，一次完全同步（全量复制）将被自动执行

哨兵模式：/*sentinal*/
/*就是反客为主的自动版*/
从后台监控主机是否故障，如果出现故障根据投票数，自动选择从库转主库
初始是一主二从

1.在sentinel.conf中加入以下配置：/*sentinel monitor 库名称 127.0.0.1 6379 1  */
sentinel monitor houst6379 127.0.0.1 6379 1  /*这段配置是挂掉之后进行投票，多于1票做主机*/

2.启动哨兵
Redis-sentinel /myredis/sentinel.conf

当79挂掉，花一点时间投票，选出新的主机
79回来之后，变为slave
一组sentinel能同时监控多个slave

复制延迟
网络，机器太多等会导致复制延迟






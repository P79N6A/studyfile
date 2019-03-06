解析配置文件redis.config
1.它在哪
默认在 /usr/local/bin/
copy 一份到 /myredis/ 下面

2.Units单位
1>.支持bytes 不支持bit
2>.大小写不敏感
	1k！=1kb  1m！=1mb

3.INCLUDES包含
	包含其他的配置文件。/*相当于spring中的配置文件 placholander local*/ 

4.GENERAL通用 **
	Daemonize 守护进程
	Pidfile 默认进程路径
	Port 端口
	Tcp-backlog 设置连接队列  队列总和=未完成三次握手队列+已经完成三次握手队列
在高并发环境下需要高backlog值避免客户端连接问题。
Linux内核将值减小到/proc/sys/net/core/somaxconn的值，
所以需要确认增大somaxconn和tcp_max_syn_backlog两个值来达到想要效果
	Timeout 回话超时时间设置 0表示不超时
	Bind
	Tcp-keepalive 检测keepalive 0表示不检测
	Loglevel 日志级别  debug verbose notice warning  越来越高级 越来越不详细 
	Logfile 规定日志名字
	Syslog-enabled 是否输出日志到syslog中 默认否
	Syslog-ident 指定syslog里的日志标志 默认redis
	Syslog-facility 指定系统设备，值可以是USER或LOCAL0-LOCAL7
	Databases 默认16个库

5.SNAPSHOTTING快照
	是否把内存放磁盘

6.REPLICATION复制


7.SECURITY安全 **
	默认不用密码  config get requirepass ""  /*类似config get dir*/
	config set requirepass "123456" /*设置密码*/
	使用 auth 123456 验证身份

8.LIMITS限制 **
	Maxclients 最大连接人数默认1W
	Maxmemory 最大内存策略 /*缓存过期策略 达到最大缓存怎么办 ?*/

	Maxmemory-policy 
		volatile-lru 使用url算法/*最近最少使用*/移除key，只对设置了过期时间的key
		allkeys-lru 使用url算法移除key
		volatile-random 在过期集合中移除随机的key，只对设置了过期时间的key
		allkeys-random 移除随机的key
		volatile-ttl 移除那些ttl最小的key/*即将过的*/
		noeviction 永不过期，只返回错误信息/*默认*/
	Maxmemory-samples 设置样本的数量，lru 最小ttl是估算，可以通过设置Maxmemory-samples设置精确大小
		
9.APPEND ONLY MODE追加
	

10.常见配置redis.conf介绍 **
	redis.conf配置说明
	1.redis默认不是守护进程的方式，可以通过该配置项修改，用yes启用守护进程
 daemonize no
 	2.当Redis以守护进程的方式运行时，Redis默认会把pid写入/var/run/redis.pid文件。可以通过pidfile指定
 	pidfile /var/run/redis.pid
 	3.指定端口
 	port 6379
 	4.绑定主机地址
 	bind 127.0.0.1
 	5.客户端会话超时时间  0表示不超时
 	timeout 300
 	6.指定日志级别，四个级别 debug，verbose，notice，warning，默认verbose
 	loglevel verbose
 	7.日志记录方式，默认标准输出，如果配置Redis为守护进程方式运行，这里又配置日志记录方式为标准输出
 	则日志将会发送给/dev/null
 	logfile stdout
 	8.设置数据库数量
 	datebases 16
 	9.指定多长时间内有多少次更新，就将数据同步到数据文件，可以多个条件配合
 	save <seconds> <changes>
 	redis默认配置文件中提供了三个条件
 	saave 900 1
 	save 300 10
 	save 60 10000
 	分别表示900秒一个更改 300秒10个更改 60秒10000个更改
 	10.指定本地存储至数据库时是否压缩数据，默认yes，为了节约CPU时间可关闭该功能，但会导致数据库文件变的巨大
 	rdbcompression yes
 	11.指定本地数据库文件名，默认为dump.rdb
 	dbfilename dump.rdb
 	12.指定本地数据库存放目录
 	dir ./
 	13.设置本机为slav服务时，设置master服务的ip地址及端口，在redis启动时，他会自动从master进行数据同步
 	slaveof<masterip><masterport>
 	14.当master服务设置了密码保护时，slav服务连接master的密码
 	masterauth<master-password>
 	15.设置Redis连接密码，如果配置了连接密码，客户端在连接Redis时需要通过auth <password>提供密码，默认关闭
 	requirepass foobared
 	
 	




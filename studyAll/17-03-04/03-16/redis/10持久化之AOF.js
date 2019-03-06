AOF
Append Only File

'用日志'方式'记录每一个写的操作'，只能追加文件，不能改写文件，
redis'启动'会'读取文件重新构建数据'
redis重启就是'根据日志内容'将'写指令从前到后执行一次'，'完成数据恢复'

redis.conf文件的配置
'aof保存的是appendonly.aof'
appendonly 默认是关闭的  开启后会生成appendonly.aof ，该文件记录所有写入操作
appendfsync 
	'Always：同步持久化，每次发生数据变更'会被立即'记录到磁盘，性能差，稳定强'
	'Everysec：默认，异步操作，每秒记录一秒内宕机，有数据丢失'
	No：
'No-appendfsync-on-rewrite' '重写时是否运用appendfsync'，用默认no即可，'保证数据安全性'	

aof和dump.dbm可以同时存在，会优先加载aof备份文件

redis-check-aof --fix appendonly.aof 当文件破损后，使用该命令修复aof文件

恢复  正常恢复 启动：appendonly yes
			   将aof复制到启动的位置 在此重启redis
	  异常恢复 多一步修复受损aof文件 Redis-check-aof --fix XX.conf

Rewrite aof只能追加，所以aof文件特别大。当文件超过设定大小，
redis就会启动AOF文件的内容压缩，只保存可以恢复数据的最小指令集，可以使用bgrewriteaof

何时rewrite：默认配置是aof文件大小是rewrite后大小的一倍，且文件大于64兆时触发

优势：数据安全，不易丢失数据
劣势：备份文件大，恢复时，效率不高

最终用哪个？ /*根据情况*/同时开启 会先加载aof，因为aof完整
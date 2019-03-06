RDB Redis DaaBase
在指定时间间隔内，'将内存中的数据集'快照'写入磁盘'，/*快照后缀 dump.rdb*/
恢复就是将快照文件读进内存里

Redis会单独创建(fork)一个子进程来进行持久化，将数据写入到临时文件，
持久化结束，在用临时文件替换上次持久化的文件
整个过程中，主进程是不进行任何IO操作的，这就确保了极高的性能

如果需要大规模数据的恢复。对于'数据恢复的完整性不敏感'，'RDB比AOF高效'。
它的缺点最后一次持久化的数据可能丢失

fork复制一个与当前进程一样的进程，新进程数据和原进程一致，
他是一个新进程，作为原进程的一个子进程

设置 备份/*生成dump.rdb*/的频率
'save 120 10' 两分钟内触发10次改动
'save' 立即备份/*生成dump.rdb*/
/*多少秒改动多少次，就触发持久化操作，生成dump.rdb文件*/
重启时，会将'dump.rdb读会到内存'  记住FLSHALLDB清空情况下是清空了dump.rdb文件的

redis.conf文件的配置
'Stop-writes-on-bgsave-error'
//默认yes 出错就刹车
//no 表示忽略数据一致性，用其他手段发现和控制

rdbcompression yes 默认压缩，如果节约cpu改为no  /*一般设置为yes*/

rdbchecksum yes 让redis使用CRC64算法进行数据校验，这样会增大10%性能消耗，
需要提升性能，可以关闭 /*一般设置为yes*/

如何触发RDB快照
	配置文件中默认的快照 /*通过备份能重新使用*/
	命令save bgsave 
	执行flushall，会产生空dump.rdb 

优势：	'适合大规模数据恢复'，需要对'数据完整性要求不高'
劣势：	'会丢失最后一次的快照'
		fork时，内存数据被copy一份，需要考虑内存空间
	
停止备份dump.rdb文件
	redis-cli config set save "";


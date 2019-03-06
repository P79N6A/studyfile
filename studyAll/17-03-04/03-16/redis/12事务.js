事物
多个命令一起成功


1.'DISCARD' '放弃执行'事物块内的'所有命令'
2.'EXEC' '执行所有'事物块内的命令
3.'MUTIL' '标记一个事物的开始' /*回复一个ok，但并不表示成功了*/
4.'UNWATCH' '取消'watch命令对'所有'key的'监视'
5.'WATCH' key [key...] '监视'一个多个'key'，
	如果事物执行之前这个key被其他命令改动，那么事物被打断

	
case1:正常执行
/*exec执行事物块*/
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> get k2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> EXEC
1) OK
2) OK
3) "v2"
4) OK

case2:放弃事物
/*DISCARD取消事物块的执行*/
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> set k3 33
QUEUED
127.0.0.1:6379> DISCARD
OK
127.0.0.1:6379> get k3
"v3"

case3：全体连坐
/*有一个命令出错，全盘回滚*/
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> SET K1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> getset k3
(error) ERR wrong number of arguments for 'getset' command
127.0.0.1:6379> set k4 v4
QUEUED
127.0.0.1:6379> set k5 v5
QUEUED
127.0.0.1:6379> exec
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> get k5
(nil)

case4：冤头债主
/*在执行中有错误命令，源头债主规则*/
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> INCR k1
QUEUED
127.0.0.1:6379> set k2 22
QUEUED
127.0.0.1:6379> set k3 33
QUEUED
127.0.0.1:6379> set k4 v4
QUEUED
127.0.0.1:6379> get k4
QUEUED
127.0.0.1:6379> EXEC
1) (error) ERR value is not an integer or out of range
2) OK
3) OK
4) OK
5) "v4"
127.0.0.1:6379> 

case5：watch监控
	乐观锁/悲观锁/CAS(Check And Set)
		悲观锁：认为一定出错，全表都锁了
		乐观锁：每条记录后加一个版本号字段/*version*/，
			每个人改动都会对应一个版本号。取相应的版本号对应的数据
			提交的版本必须大于记录当前的版本才能执行
		CAS：

无加塞篡改，先监控再开启multi，保证两笔金额变动在一个事物内/*先监控，再开启*/
127.0.0.1:6379> keys *
1) "balance"
2) "debt"
127.0.0.1:6379> WATCH balance
OK
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> DECRBY balance 20
QUEUED
127.0.0.1:6379> INCRBY debt 20
QUEUED
127.0.0.1:6379> exec
1) (integer) 80
2) (integer) 20

有加塞篡改，
127.0.0.1:6379> WATCH balance
OK
			127.0.0.1:6379> set balance 800  
			OK /*此时在另一个进程中有人对balance做了修改*/
			
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> INCRBY debt 20
QUEUED
127.0.0.1:6379> DECRBY balance 20
QUEUED
127.0.0.1:6379> exec
(nil)  /*结果事物执行失败了*/
127.0.0.1:6379> get balance
"800"  /*这种情况我们先接触wathc ，再加入watch*/
127.0.0.1:6379> UNWATCH
OK
127.0.0.1:6379> WATCH balance
OK  /*加了锁之后再做相应的操作*/
127.0.0.1:6379> MULTI 
OK
127.0.0.1:6379> set debt 20
QUEUED
127.0.0.1:6379> set balance 80
QUEUED
127.0.0.1:6379> exec
1) OK
2) OK
	

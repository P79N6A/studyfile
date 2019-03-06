SELECT ... LOCK 'IN SHARE MODE'走的'是'IS锁(意向'共享锁')，即在'符合条件'的'rows'上都'加'了'共享锁'，
这样的话，'其他session'可以'读取这些记录'，也'可以继续添加IS锁'，但是'无法修改'这些记录直到你这个加锁的session执行完成(否则直接锁等待超时)。

SELECT ... 'FOR UPDATE' 走的'是'IX锁(意向'排它锁')，即在'符合条件的rows'上都'加'了'排它锁'，
'其他session'也就'无法'在这些记录上'添加任何'的S'锁'或X锁。
如果'不存在一致性'非'锁定读'的话，那么'其他session'是'无法读取和修改'这些记录的，
但是'innodb有非锁定读'(快照读并不需要加锁)，'for update之后'并'不会阻塞其他session'的'快照读取'操作，
除了select ...lock in share mode和select ... for update这种显示加锁的查询操作。
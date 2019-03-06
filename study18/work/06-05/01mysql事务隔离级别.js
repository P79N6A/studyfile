1）mvcc多版本控制提高读写qps
2) 'REPEATBLE READ' 级别并'不能完全避免''幻读'，需'要加next key locks'，
可以使显示锁(select * where * for update   or lock in share mode)

一些文章写到'InnoDB'的'可重复读''（不能）避免'了'“幻读”'（phantom read），这个说法并不准确。
做个试验：(以下所有试验要注意存储引擎和隔离级别)

mysql>show create table t_bitfly/G;
CREATE TABLE `t_bitfly` (
`id` bigint(20) NOT NULL default '0',
`value` varchar(32) default NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk

mysql>select @@global.tx_isolation, @@tx_isolation;
+-----------------------+-----------------+
| @@global.tx_isolation | @@tx_isolation  |
+-----------------------+-----------------+
| REPEATABLE-READ       | REPEATABLE-READ |
+-----------------------+-----------------+

试验4-1：

tSessionA                                                     Session B
|
| START TRANSACTION;                           START TRANSACTION;
|
| SELECT * FROM t_bitfly;
| empty set
|                                INSERT INTO t_bitfly VALUES (1, 'a');
|                             
|
| SELECT * FROM t_bitfly;
| empty set
|   											COMMIT;
|
| SELECT * FROM t_bitfly;
| empty set
|
| INSERT INTO t_bitfly VALUES (1, 'a');
| ERROR 1062 (23000):
| Duplicate entry '1' for key 1
v (shit,刚刚明明告诉我没有这条记录的)

如此就出现了幻读，'以为表'里'没有数据'，'其实''数据'已经'存在'了，傻乎乎的提交后，才发现数据冲突了。

试验4-2：

tSessionA               Session B
|
| START TRANSACTION;           START TRANSACTION;
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
|                               INSERT INTO t_bitfly VALUES (2, 'b');
|                            
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
|                               COMMIT;
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
|
| UPDATE t_bitfly SET value='z';
| Rows matched: 2  Changed:2  Warnings: 0
| (怎么多出来一行)
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |z     |
| |    2 |z     |
| +------+-------+
|
v

本事务中'第一次读'取'出一行'，做了一次'更新后'，'另一个事务'里提交的'数据'就'出现'了。'也'可以看做'是一种幻读'。

------

那么，InnoDB指出的可以'避免幻读'是怎么回事呢？

http://dev.mysql.com/doc/refman/5.0/en/innodb-record-level-locks.html

By default, InnoDB operatesin REPEATABLE READ transaction isolation level and with the innodb_locks_unsafe_for_binlogsystem variable disabled. In this case, InnoDB uses next-key locks for searchesand index scans, which prevents phantom rows (see Section 13.6.8.5, “Avoidingthe Phantom Problem Using Next-Key Locking”).

准备的理解是，当'隔离级别'是'可重复读'，'且禁用innodb_locks_unsafe_for_binlog'的情况下，
在搜索和扫描index的时候使用的next-keylocks'可以避免幻读'。

关键点在于，是InnoDB默认对一个普通的查询也会加next-key locks，还是说需要应用自己来加锁呢？
如果单看这一句，可能会以为InnoDB对普通的查询也加了锁，如果是，那和序列化（SERIALIZABLE）的区别又在哪里呢？

MySQL manual里还有一段：
13.2.8.5. Avoiding the PhantomProblem Using Next-Key Locking (http://dev.mysql.com/doc/refman/5.0/en/innodb-next-key-locking.html)
Toprevent phantoms, InnoDB usesan algorithm called next-key locking that combinesindex-row locking with gap locking.
Youcan use next-key locking to implement a uniqueness check in your application:
If you read your data in share mode and do not see a duplicate for a row youare going to insert, 
then you can safely insert your row and know that thenext-key lock set on the successor of your row 
during the read prevents anyonemeanwhile inserting a duplicate for your row. 
Thus, the next-key lockingenables you to “lock” the nonexistence of something in your table.

我的理解是说，'InnoDB提供'了'next-key locks'，但需'要应用程序''自己'去'加锁'。manual里提供一个例子：

SELECT * FROM child WHERE id> 100 FOR UPDATE;

'这样'，'InnoDB''会给id大于100的行'（假如child表里有一行id为102），以及100-102，102+的gap'都加上锁'。

可以'使用showinnodb status'来查'看是否给表加上了锁'。

'再看'一个'实验'，要'注意'，表't_bitfly'里的'id为主键字段'。

实验4-3：

t SessionA             Session B
|
| START TRANSACTION;                START TRANSACTION;
|
| SELECT * FROM t_bitfly
| WHERE id<=1
| FOR UPDATE;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
|                                      INSERT INTO t_bitfly   VALUES (2, 'b');
|                            Query OK, 1 row affected
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
|                              INSERT INTO t_bitfly
|                              VALUES (0, '0');
|                                  (waiting for lock ...
|                               then timeout)
|                                   ERROR 1205 (HY000):
|                                  Lock wait timeout exceeded;
|                                   try restarting transaction
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
|                           COMMIT;
|
| SELECT * FROM t_bitfly;
| +------+-------+
| | id   | value |
| +------+-------+
| |    1 |a     |
| +------+-------+
v

可以看到，'用id<=1加的锁'，只'锁住了id<=1的范围'，'可以成功添加id为2''的记录'，添加id为0的记录时就会等待锁的释放。

MySQL manual里对可重复读里的锁的详细解释：
http://dev.mysql.com/doc/refman/5.0/en/set-transaction.html#isolevel_repeatable-read

Forlocking reads (SELECT with FORUPDATE or LOCK IN SHARE MODE),UPDATE, and DELETE statements, 
lockingdepends on whether the statement uses a unique index with a unique searchcondition, 
or a range-type search condition. For a unique index with a uniquesearch condition, 
InnoDB locksonly the index record found, not the gap before it. For other searchconditions,
InnoDB locksthe index range scanned, using gap locks or next-key (gap plus index-record)locks to block insertions 
by other sessions into the gaps covered by the range.
------
'一致性读'和'提交读'，先看实验，
实验4-4：

tSessionA              Session B
|
| START TRANSACTION;             START TRANSACTION;
|
| SELECT * FROM t_bitfly;
| +----+-------+
| | id | value |
| +----+-------+
| |  1 |a     |
| +----+-------+
|                              INSERT INTO t_bitfly   VALUES (2, 'b');
|                              
|                              COMMIT;
|
| SELECT * FROM t_bitfly;
| +----+-------+
| | id | value |
| +----+-------+
| |  1 |a     |
| +----+-------+
|
| SELECT * FROM t_bitfly LOCK IN SHARE MODE;//LOCK IN SHARE MODE
| +----+-------+
| | id | value |
| +----+-------+
| |  1 |a     |
| |  2 |b     |
| +----+-------+
|
| SELECT * FROM t_bitfly FOR UPDATE;//FOR UPDATE
| +----+-------+
| | id | value |
| +----+-------+
| |  1 |a     |
| |  2 |b     |
| +----+-------+
|
| SELECT * FROM t_bitfly;
| +----+-------+
| | id | value |
| +----+-------+
| |  1 |a     |
| +----+-------+
v

如果使用'普通的读'，会'得到一致性'的'结果'，如果使用了'加锁的读'，就会'读到“最新的”“提交”读的结果'。

本身，'可重复读'和'提交读''是矛盾的'。在'同一个事务'里，如果'保证'了'可重复读'，就'会看不到''其他事务'的'提交'，
'违背'了'提交读'；如果'保证'了'提交读'，就'会导致'前后'两次读到的结果''不一致'，'违背'了'可重复读'。

可以这么讲，'InnoDB'提供了这样的机制，'在默认'的'可重复读'的'隔离级别'里，可以'使用加锁读'去'查询最新'的'数据'。

http://dev.mysql.com/doc/refman/5.0/en/innodb-consistent-read.html

Ifyou want to see the “freshest” state of the database, you should use either theREAD COMMITTED isolation level or a locking read:
SELECT * FROM t_bitfly LOCK IN SHARE MODE;

------

结论：'MySQLInnoDB'的'可重复读'并'不保证避免幻读'，需'要应用使用加锁读'来'保证'。而这个加锁度使用到的机制就是next-keylocks。



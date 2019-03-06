
我们'用一个示例'来'讲解'这种情况，及'在并发事务'进怎样'避免'这种情况。

CREATE TABLE `t1` (
  `a` int(11) NOT NULL,
  `b` int(11) DEFAULT NULL,
  PRIMARY KEY (`a`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


session1                                                   session2
begin                                                      
select * from t1 where a > 50;                             
+----+-------+                                             
| a  | b     |                                             
+----+-------+                                             
| 51 |  3000 |                                             
| 52 | 10000 |                                             
| 53 |  5000 |                                             
| 54 |  3000 |                                             
+----+-------+                                             
4 rows in set (0.00 sec)                                   
                                                           
                                                           set autocommit = on;
                                                           insert into t1 values (55, 3000);
                                                           Query OK, 1 row affected (0.00 sec)
                                                           
select * from t1 where a > 50;                             
+----+-------+                                             
| a  | b     |                                             
+----+-------+                                             
| 51 |  3000 |                                             
| 52 | 10000 |                                             
| 53 |  5000 |                                             
| 54 |  3000 |                                             
+----+-------+                                             
4 rows in set (0.00 sec) 

#这里'读不到55'这条记录，这就是'在"REPEATABLE-READ"级别下'可以'避免"不可重复读"的现象'，
#如果是'在"READ-COMMITTED"级别'下是'可以读到55这条记录'的                                  
                                                           
update t1 set b = 3000 where a = 55;                       
Query OK, 0 rows affected (0.00 sec)                       
Rows matched: 1  Changed: 0  Warnings: 0                   
                                                           
select * from t1 where a > 50;                             
+----+-------+                                             
| a  | b     |                                             
+----+-------+                                             
| 51 |  3000 |                                             
| 52 | 10000 |                                             
| 53 |  3000 |                                             
| 54 |  3000 |                                             
| 55 |  3000 |                                             
+----+-------+                                             
5 rows in set (0.00 sec)    

#'55'这条记录'被读到了'，这就'是"幻读现象"'，这只是'多读取了一条记录'，影响还不大，但是在'下面的情况'下'影响就大了'                                                                                        

commit;                                                    
                                                           
begin;                                                     
select * from t1 where a = 55;                             
+----+------+                                              
| a  | b    |                                              
+----+------+                                              
| 55 | 3000 |                                              
+----+------+                                              
1 row in set (0.00 sec)                                    
                                                           
                                                           update t1 set b = 8000 where a = 55;
                                                           Query OK, 1 row affected (0.00 sec)
                                                           Rows matched: 1  Changed: 1  Warnings: 0
                                                           
select * from t1 where a = 55;                             
+----+------+                                              
| a  | b    |                                              
+----+------+                                              
| 55 | 3000 |                                              
+----+------+                                              
1 row in set (0.00 sec)                                    
                                                           
update t1 set b = b + 3000 where a = 55;                   
Query OK, 1 row affected (0.00 sec)                        
Rows matched: 1  Changed: 1  Warnings: 0                  

                                                           
select * from t1 where a = 55;                             
+----+-------+                                             
| a  | b     |                                             
+----+-------+                                             
| 55 | 11000 |                                             
+----+-------+                                             
1 row in set (0.00 sec)                                    
#在这个事务中，理所当然认为'b的值应该是3000+3000=6000'，但是'实际上是11000'，'"灵异幻读"现象出现了 '                                                   

commit;                                                    

如果'b是一个账户钱袋'，在'session1的事务开始后'，'sessino2的事务'中'还可以给钱袋加钱'，'这种情况'必'须避免'，
不然如果'session1'事务去'更新钱袋'，如：update t1 set b = 5000 where a= 55，那么'session2事务中的8000就被冲掉了，"后果很严重"'

下面看看怎样避免这种情况。

begin;                                                     
select * from t1 where a = 55 LOCK IN SHARE MODE; #'加一把共享锁'，这样'另一事务''不能修改这条记录'
+----+-------+
| a  | b     |
+----+-------+
| 55 | 11000 |
+----+-------+
1 row in set (0.01 sec)


                                                           select * from t1 where a = 55;
                                                           +----+-------+
                                                           | a  | b     |
                                                           +----+-------+
                                                           | 55 | 11000 |
                                                           +----+-------+
                                                           1 row in set (0.00 sec)
                                                           
                                                           select * from t1 where a = 55 LOCK IN SHARE MODE;
                                                           +----+-------+
                                                           | a  | b     |
                                                           +----+-------+
                                                           | 55 | 11000 |
                                                           +----+-------+
                                                           1 row in set (0.00 sec)
                                                           #'可以读'
                                                           update t1 set b = b + 3000 where a = 55;
                                                           #wait ....但是'不能修改'
commit;                                                    
Query OK, 0 rows affected (0.00 sec)                       
                                                           
                                                           Query OK, 1 row affected (12.23 sec)
                                                           Rows matched: 1  Changed: 1  Warnings: 0
                                                           #直'到事务1提交后'，这个'修改''才被提交'
select * from t1 where a = 55;                             
+----+-------+                                             
| a  | b     |                                             
+----+-------+                                             
| 55 | 14000 |                                             
+----+-------+                                             
1 row in set (0.00 sec)                                    


'死锁由此产生'：                                                           
begin;                                                     
select * from t1 where a = 55 LOCK IN SHARE MODE; #'加一把共享锁'，这样另一事务'不能修改这条记录'
+----+-------+
| a  | b     |
+----+-------+
| 55 | 11000 |
+----+-------+
1 row in set (0.01 sec)
                                                           
                                                           begin;
                                                           select * from t1 where a = 55 LOCK IN SHARE MODE; #也加一所共享锁
                                                           +----+-------+
                                                           | a  | b     |
                                                           +----+-------+
                                                           | 55 | 11000 |
                                                           +----+-------+
                                                           1 row in set (0.00 sec)
                                                           #可以读
                                                           update t1 set b = b + 3000 where a = 55;
                                                           #wait ....但是不能修改,因为会话一中在加锁

update t1 set b = b + 3000 where a = 55;
#ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
                                                           
                                                           Query OK, 1 row affected (12.23 sec)
                                                           Rows matched: 1  Changed: 1  Warnings: 0
                                                           #直到事务死锁退出后，这个修改才被提交

所以在这种'两个事务'一开始'都加SHARE LOCK'的情况，由于不阻碍另一事件的读写，
会导致后续的更新语句产生，可以'加一互斥锁'来'避免'，如下：

'事务1开始后'，'事务2还能读到'，也不太好，'干脆让事务2读都读不出来' 

begin;                                                     
select * from t1 where a = 55 FOR UPDATE;                  
+----+-------+                                             
| a  | b     |                                             
+----+-------+                                             
| 55 | 14000 |                                             
+----+-------+                                             
1 row in set (0.00 sec)                                    
                                                           select * from t1 where a = 55;
                                                           +----+-------+
                                                           | a  | b     |
                                                           +----+-------+
                                                           | 55 | 14000 |
                                                           +----+-------+
                                                           1 row in set (29.70 sec)
                                                           #'普通select语句'还是'可以读'
                                                           select * from t1 where a = 55 LOCK IN SHARE MODE;
                                                           #wait ....但是加了'共享锁的select语句读不到'
                                                           
commit;                                                    
                                                           
                                                           +----+-------+
                                                           | a  | b     |
                                                           +----+-------+
                                                           | 55 | 14000 |
                                                           +----+-------+
                                                           1 row in set (29.70 sec)

                                                           #直到'事务1提交后'才能'查询到结果'

'SELECT语句'在'InnoDB引擎''默认'下是'不加锁'的，'一个事务'即使'FOR UPDATE锁定'了'一条记录'，
'另一个事务'中默认'select语句'还'是可以读的'，为了'避免这种情况'就'要在select语句'中'显示的加锁LOCK IN SHARE MODE or FOR UPDATE'，

这样很麻烦对吧，那就'将事务'的'隔离级别设置为"SERIALIZABLE"（效果一样）'，
'"SERIALIZABLE"与"REPEATABLE-READ"'的'区别'就是，
'前者'在事务中'所有的SELECT语句'上都会'默认的加上'一个'共享锁'。

"SERIALIZABLE"实际上两个事务就完全串行了，"会影响并发性能"，要结合具体业务来具体处理，大部分情况下不需要这么严格的。
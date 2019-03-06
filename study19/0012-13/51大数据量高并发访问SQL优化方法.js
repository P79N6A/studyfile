保证在实现功能的基础上，尽量减少对数据库的访问次数；
通过搜索参数，尽量减少对表的访问行数,最小化结果集，从而减轻网络负担；
能够分开的操作尽量分开处理，提高每次的响应速度；
在数据窗口使用SQL时，尽量把使用的索引放在选择的首列；
算法的结构尽量简单；
在'查询时'，不要过多地使用通配符如SELECT * FROM T1语句，
'要用到几列就选择几列','如'：'SELECT COL1,COL2 FROM T1'；
在'可能的情况下'尽量'限制尽量结果集行数'如：SELECT TOP 300 COL1,COL2,COL3 FROM T1,
因为某些情况下用户是不需要那么多的数据的。   
在没有建索引的情况下，数据库查找某一条数据，就必须进行全表扫描了，
对所有数据进行一次遍历，查找出符合条件的记录。
在数据量比较小的情况下，也许看不出明显的差别，但是当数据量大的情况下，
这种情况就是极为糟糕的了。
SQL语句在SQL SERVER中是如何执行的，他们担心自己所写的SQL语句会被SQL SERVER误解。
比如：
select * from table1 where name='zhangsan' and tID > 10000
和执行: 
select * from table1 where tID > 10000 and name='zhangsan'
一些人不知道以上两条语句的执行效率是否一样，因为如果简单的从语句先后上看，
这两个语句的确是不一样，如果tID是一个聚合索引，
那么后一句仅仅从表的10000条以后的记录中查找就行了；
而前一句则要先从全表中查找看有几个name='zhangsan'的，
而后再根据限制条件条件tID>10000来提出查询结果。 
事实上，这样的担心是不必要的。SQL SERVER中有一个'“查询分析优化器”'，
它可以'计算出where子句'中'的搜索条件'并确定哪个索引能缩小表扫描的搜索空间，
也就是说，它能实现'自动优化'。虽然查询优化器可以根据where子句自动的进行查询优化，
但'有时查询优化器'就'会不按照'您的'本意进行快速查询'。 
'在查询分析阶段'，查询'优化器查看查询的每个阶段'并'决定限制需要扫描的数据量''是否有用'。
如果'一个阶段可以被用作一个扫描参数'（SARG），那么就'称之为可优化'的，
并且'可以利用索引''快速获得所需数据'。 
'SARG的定义'：'用于限制搜索的''一个操作'，因为'它通常是指''一个特定的匹配'，
'一个值的范围内的匹配'或者'两个以上条件的AND连接'。形式如下： 

列名 操作符 <常数 或 变量> 或 <常数 或 变量> 操作符 列名 
列名可以出现在操作符的一边，而常数或变量出现在操作符的另一边。如： 
Name=’张三’ 
价格>5000 
5000<价格 
Name=’张三’ and 价格>5000 
如果'一个表达式''不能满足SARG的形式'，那它'就无法限制搜索的范围'了，
也就是SQL SERVER必须对每一行都判断它是否满足WHERE子句中的所有条件。
所以'一个索引'对于'不满足SARG形式'的表达式来说'是无用的'。 
	所以，优化查询最重要的就是，
尽量使语句符合查询优化器的规则避免全表扫描而使用索引查询。

具体要注意的：
1.应尽量'避免''在 where 子句'中'对字段进行 null 值判断'，
否则将导致引擎放弃使用索引而进行全表扫描，如：
select id from t where num is null
可以在num上设置默认值0，确保表中num列没有null值，然后这样查询：
select id from t where num = 0

2.应尽量'避免'在'where子句'中'使用!=或<>操作符'，
否则将引擎放弃使用索引而进行全表扫描。
优化器将无法通过索引来确定将要命中的行数,因此需要搜索该表的所有行。

3.应尽量'避免'在'where子句'中'使用or来连接条件'，
否则将导致引擎放弃使用索引而进行全表扫描，如：
select id from t where num=10 or num=20
可以这样查询：
select id from t where num=10
union all
select id from t where num=20

4.'in和not in' 也'要慎用'，因为'IN'会'使系统无法使用索引',
而只能直接搜索表中的数据。如：
select id from t where num in(1,2,3)
对于连续的数值，能用 between 就不要用 in 了：
select id from t where num between 1 and 3

5.尽量'避免'在索引过的字符数据中，'使用非打头字母搜索'。
这也使得引擎无法利用索引。 
见如下例子： 
SELECT * FROM T1 WHERE NAME LIKE ‘%L%’ 
SELECT * FROM T1 WHERE SUBSTING(NAME,2,1)=’L’ 
SELECT * FROM T1 WHERE NAME LIKE ‘L%’ 
即使NAME字段建有索引，前两个查询依然无法利用索引完成加快操作，
引擎不得不对全表所有数据逐条操作来完成任务。
而第三个查询能够使用索引来加快操作。

6.必要时'强制查询优化器''使用某个索引'，
如在where子句中使用参数，也会导致全表扫描。
因为SQL只有在运行时才会解析局部变量，但优化程序不能将访问计划的选择推迟到运行时；
它必须在编译时进行选择。然而，如果在编译时建立访问计划，变量的值还是未知的，
因而无法作为索引选择的输入项。如下面语句将进行全表扫描：
select id from t where num=@num
可以改为强制查询使用索引：
select id from t with(index(索引名)) where num=@num

7.应尽量'避免''在where子句'中'对字段进行表达式操作'，
这将导致引擎放弃使用索引而进行全表扫描。如：
SELECT * FROM T1 WHERE F1/2=100 
应改为: 
SELECT * FROM T1 WHERE F1=100*2

SELECT * FROM RECORD WHERE SUBSTRING(CARD_NO,1,4)=’5378’ 
应改为: 
SELECT * FROM RECORD WHERE CARD_NO LIKE ‘5378%’

SELECT member_number, first_name, last_name FROM members 
WHERE DATEDIFF(yy,datofbirth,GETDATE()) > 21 
应改为: 
SELECT member_number, first_name, last_name FROM members 
WHERE dateofbirth < DATEADD(yy,-21,GETDATE()) 
即：任何对列的操作都将导致表扫描，它包括数据库函数、
计算表达式等等，查询时要尽可能将操作移至等号右边。

8.应尽量'避免在where子句'中'对字段进行函数操作'，
这将导致引擎放弃使用索引而进行全表扫描。如：
select id from t where substring(name,1,3)='abc'--name以abc开头的id
select id from t where datediff(day,createdate,'2005-11-30')=0--‘2005-11-30’生成的id
应改为:
select id from t where name like 'abc%'
select id from t where createdate>='2005-11-30' and createdate<'2005-12-1'

9.'不要在 where 子句'中的'“=”左边进行函数、算术运算或其他表达式运算'，
否则系统将可能无法正确使用索引。

10.在'使用索引字段''作为条件时'，如果该'索引是复合索引'，
那么'必须使用'到'该索引中'的'第一个字段作为条件'时'才能保证系统使用该索引'，
否则该索引将不会被使用，并且应尽可能的让字段顺序与索引顺序相一致。

11.很多时候用'exists是一个好的选择'：
elect num from a where num in(select num from b)
用下面的语句替换：
select num from a where exists(select 1 from b where num=a.num)

SELECT SUM(T1.C1)FROM T1 WHERE( 
(SELECT COUNT(*)FROM T2 WHERE T2.C2=T1.C2>0) 
SELECT SUM(T1.C1) FROM T1WHERE EXISTS( 
SELECT * FROM T2 WHERE T2.C2=T1.C2) 
两者产生相同的结果，但是后者的效率显然要高于前者。
因为后者不会产生大量锁定的表扫描或是索引扫描。

如果你想校验表里是否存在某条纪录，不要用count(*)那样效率很低，
而且浪费服务器资源。可以用EXISTS代替。如： 
IF (SELECT COUNT(*) FROM table_name WHERE column_name = 'xxx') 
可以写成： 
IF EXISTS (SELECT * FROM table_name WHERE column_name = 'xxx')

经常需要写一个T_SQL语句比较一个父结果集和子结果集，
从而找到是否存在在父结果集中有而在子结果集中没有的记录，如： 
SELECT a.hdr_key FROM hdr_tbl a---- tbl a 表示tbl用别名a代替 
WHERE NOT EXISTS (SELECT * FROM dtl_tbl b WHERE a.hdr_key = b.hdr_key) 
SELECT a.hdr_key FROM hdr_tbl a 
LEFT JOIN dtl_tbl b ON a.hdr_key = b.hdr_key WHERE b.hdr_key IS NULL 
SELECT hdr_key FROM hdr_tbl 
WHERE hdr_key NOT IN (SELECT hdr_key FROM dtl_tbl) 
三种写法都可以得到同样正确的结果，但是效率依次降低。

12.尽量'使用表变量'来'代替临时表'。如果表变量包含大量数据，
请注意索引非常有限（只有主键索引）。

13.'避免频繁创建和删除''临时表'，以减少系统表资源的消耗。

14.'临时表''并不是不可使用'，适当地使用它们'可以使某些例程更有效'，
例如，当需要重复引用大型表或常用表中的某个数据集时。
但是，对于一次性事件，最好使用导出表。

15.'在新建临时表时'，如果'一次性插入数据量很大'，
那么可以'使用 select into 代替 create table'，避免造成大量 log ，以提高速度；
如果数据量不大，为了缓和系统表的资源，应先create table，然后insert。

16.'如果使用到了临时表'，在'存储过程的最后''务必将所有的临时表''显式删除'，
先 truncate table ，然后 drop table ，这样可以避免系统表的较长时间锁定。
 
17.在'所有的存储过程'和'触发器的开始处''设置 SET NOCOUNT ON'，
在'结束时设置 SET NOCOUNT OFF'。
无需在执行存储过程和触发器的每个语句后向客户端发送 DONE_IN_PROC 消息。

18.'尽量避免大事务操作'，'提高系统并发能力'。

19.尽量'避免向客户端''返回大数据量'，若数据量过大，应该'考虑相应需求是否合理'。 

20. '避免使用不兼容的''数据类型'。
例如float和int、char和varchar、binary和varbinary是不兼容的。
数据类型的不兼容可能使优化器无法执行一些本来可以进行的优化操作。
例如: 
SELECT name FROM employee WHERE salary > 60000 
在这条语句中,如salary字段是money型的,则优化器很难对其进行优化,因为60000是个整型数。
我们应当在编程时将整型转化成为钱币型,而不要等到运行时转化。

21.充分'利用连接条件'，'在某种情况下'，'两个表之间''可能不只一个的连接条件'，
这时在 WHERE 子句中将连接条件完整的写上，有可能大大提高查询速度。 
例： 
SELECT SUM(A.AMOUNT) FROM ACCOUNT A,CARD B WHERE A.CARD_NO = B.CARD_NO 
SELECT SUM(A.AMOUNT) FROM ACCOUNT A,CARD B WHERE A.CARD_NO = B.CARD_NO AND A.ACCOUNT_NO=B.ACCOUNT_NO 
第二句将比第一句执行快得多。

22、'使用视图加速查询'
把表的一个子集进行排序并创建视图，有时能加速查询。
它有助于避免多重排序 操作，而且在其他方面还能简化优化器的工作。例如：
SELECT cust.name，rcvbles.balance，……other columns 
FROM cust，rcvbles 
WHERE cust.customer_id = rcvlbes.customer_id 
AND rcvblls.balance>0 
AND cust.postcode>“98000” 
ORDER BY cust.name

如果这个查询要被执行多次而不止一次，
可以把所有未付款的客户找出来放在一个视图中，并按客户的名字进行排序： 
CREATE VIEW DBO.V_CUST_RCVLBES 
AS 
SELECT cust.name，rcvbles.balance，……other columns 
FROM cust，rcvbles 
WHERE cust.customer_id = rcvlbes.customer_id 
AND rcvblls.balance>0 
ORDER BY cust.name 
然后以下面的方式在视图中查询： 
SELECT ＊ FROM V_CUST_RCVLBES 
WHERE postcode>“98000” 
视图中的行要比主表中的行少，而且物理顺序就是所要求的顺序，
减少了磁盘I/O，所以查询工作量可以得到大幅减少。

23、'能用DISTINCT'的'就不用GROUP BY'
SELECT OrderID FROM Details WHERE UnitPrice > 10 GROUP BY OrderID 
可改为： 
SELECT DISTINCT OrderID FROM Details WHERE UnitPrice > 10

24.'能用UNION ALL''就不要用UNION' 
UNION ALL不执行SELECT DISTINCT函数，这样就会减少很多不必要的资源 

35.尽量'不要用SELECT INTO语句'。 
SELECT INTO 语句会导致表锁定，阻止其他用户访问该表。

上面我们提到的是一些基本的提高查询速度的注意事项,但是在更多的情况下,
往往需要反复试验比较不同的语句以得到最佳方案。
最好的方法当然是测试，看实现相同功能的SQL语句哪个执行时间最少，
但是数据库中如果数据量很少，是比较不出来的，这时可以用查看执行计划，
即：把实现相同功能的多条SQL语句考到查询分析器，
按CTRL+L看查所利用的索引，表扫描次数（这两个对性能影响最大），
总体上看询成本百分比即可


==================================================
'去掉不必要的查询和搜索'。其实'在项目的实际应用中'，
'很多查询条件'是可有可无的，'能从源头上避免的''多余功能尽量砍掉'，
这是最简单粗暴的解决方案。

'合理使用索引''和复合索引'。建索引是SQL优化中最有效的手段。
查找、删除、更新以及排序时常用的字段可以适当建立索引。
不过要注意，单条查询不能同时使用多个索引，只能使用一个索引。
'查询条件较多'时，'可以使用多个字段合并的''复合索引'。
切记，'使用复合索引'时，'查询条件的字段顺序'需'要与复合索引的字段顺序''保持一致'。

'谨慎使用not in'等可能无法使用索引的条件。
索引也不是什么时候都可以发挥作用的，
'当出现"not in"，"!="，"like %xx%"，"is null"'。。。'等条件时'，'索引是无效的'。
使'用这些条件的'时候，'请放到'能有效使用'索引的条件的右边'。
设计表结构时，个人建议'尽可能用int类型''代替varchar类型'，
int类型部分时候可以通过大于或小于代替"!="等条件，
同时也方便满足一些需要按类型排序的需求，至于可读性的问题，
完善好数据库设计文档才是明智的选择。
同时建议'把所有可能的字段设置为"not null"'，并'设置默认值'，
'避免在where字句中''出现"is null"的判断'。

'不要在where子句'中的'“=”左边''进行函数'、'算术'运算或其他'表达式运算'，
否则系统将无法正确使用索引。尽可能少用MySQL的函数，
类似Now()完全可以通过程序实现并赋值，
部分函数也可以通过适当的建立冗余字段来间接替代。

在'where条件'中'使用or'，可能'导致索引无效'。
'可用"union all"或者"union"'（会过滤重复数据，效率比前者低）'代替'，
'或程序上''直接分开两次获取数据''再合并'，确保索引的有效利用。

'不使用select * '，倒'不是能提高查询效率'，主要'是减少输出的数据量'，'提高传输速度'。

'避免类型转换'，这里所说的“类型转换”是'指where子句中'
'出现字段的类型'和'传入的参数类型不一致'的时候发生'的类型转换'。

'分页查询的优化'。'页数比较多的情况下'，如limit 10000,10 
影响的'结果集是10010行'，查询速度会比较慢。推荐的解决方案是：
'先只查询主键'select id from table where .. order by .. limit 10000,10
（'搜索条件和排序'请'建立索引'），'再通过主键去获取数据'。

'统计相关的查询'。'影响结果集''往往巨大'，且'部分SQL语句'本身'已经难以优化'。
因此，应'避免在业务高峰期''执行统计相关的查询'，'或者''仅在从库中''执行统计查询'。
'部分统计数据'，'可以通过冗余的数据结构''保存'，
同时'建议把数据''先保存在内存、缓存中'（如redis），'再按一定策略写入数据库'。







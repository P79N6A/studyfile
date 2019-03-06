1、注意使用DISTINCT，在没有必要时不要用，它同UNION一样会使查询变慢。重复的记录在查询里是没有问题的 

2、查询时尽量不要返回不需要的行、列
  
3、数据行的长度不要超过8020字节，如果超过这个长度的话在物理页中这条数据会占用两行从而造成存储碎片，降低查询效率。

4、能够用数字类型的字段尽量选择数字类型而不用字符串类型的（电话号码），这会降低查询和连接的性能，并会增加存储开销。

5、尽量使用表变量来代替临时表。

6、避免频繁创建和删除临时表，以减少系统表资源的消耗。

7、避免使用不兼容的数据类型。例如float和int、char和varchar、binary和varbinary是不兼容的。
数据类型的不兼容可能使优化器无法执行一些本来可以进行的优化操作。例如:
SELECT name FROM employee WHERE salary > 60000
请将参数转化成相同类型，在传到sql中

8、充分利用连接条件，在某种情况下，两个表之间可能不只一个的连接条件，这时在WHERE子句中将连接条件完整的写上，
有可能大大提高查询速度。
例：
SELECT SUM(A.AMOUNT) FROM ACCOUNT A,CARD B WHERE A.CARD_NO = B.CARD_NO 
SELECT SUM(A.AMOUNT) FROM ACCOUNT A,CARD B WHERE A.CARD_NO = B.CARD_NO AND A.ACCOUNT_NO=B.ACCOUNT_NO
第二句将比第一句执行快得多。

9、如果查询要被执行多次而不止一次，可以把所有未付款的客户找出来放在一个视图中，并按客户的名字进行排序： 
CREATE VIEW DBO.V_CUST_RCVLBES
AS
SELECT cust.name，rcvbles.balance，……other columns
FROM cust，rcvbles
WHERE cust.customer_id = rcvlbes.customer_id
AND rcvblls.balance>0
ORDER BY cust.name
然后以下面的方式在视图中查询：
SELECT columns FROM V_CUST_RCVLBES
WHERE postcode>'98000'
视图中的行要比主表中的行少，而且物理顺序就是所要求的顺序，能提高效率

10、能用DISTINCT的就不用GROUP BY
SELECT OrderID FROM Details WHERE UnitPrice > 10 GROUP BY OrderID 
可改为： 
SELECT DISTINCT OrderID FROM Details WHERE UnitPrice > 10

11.能用UNION ALL就不要用UNION 
UNION ALL不执行SELECT DISTINCT函数，这样就会减少很多不必要的资源

12.尽量不要用SELECT INTO语句。 
SELECT INOT 语句会导致表锁定，阻止其他用户访问该表。


1、字段的长度在最大限度的满足可能的需要的前提下，应该尽可能的设得短一些，这样可以提高查询的效率，而且在建立索引的时候也可以减少资源的消耗。
在实现功能的基础上，尽量减少对数据库的访问次数；通过搜索参数，尽量减少对表的访问行数,最小化结果集，
能够分开的操作尽量分开处理，提高每次的响应速度；在数据窗口使用SQL时，尽量把使用的索引放在选择的首列；

2、尽量避免在索引过的字符数据中，使用非打头字母搜索。
日期sql修改成这样：select * from table where endDate>to_date(?,’yyyymmddhh24miss’) and endDate<to_date(?,’yyyymmddhh24miss’);
然后将传入参数格式化成对应格式的字符串在传入，这样由数据库将字符串转成Date类型，就很顺利的走索引区间扫描，效率最高。

3、应尽量避免在where子句中对字段进行表达式操作，这将导致引擎放弃使用索引而进行全表扫描。

4、应尽量避免在where子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。如：
select id from t where substring(name,1,3)='abc'	--name以abc开头的id
select id from t where datediff(day,createdate,'2005-11-30')=0	--2005-11-30生成的id
应改为:
select id from t where name like 'abc%'
select id from t where createdate>='2005-11-30' and createdate<'2005-12-1'

5、不要在 where 子句中的=左边进行函数、算术运算或其他表达式运算，否则系统将可能无法正确使用索引。

6、在使用索引字段作为条件时，如果该索引是复合索引，那么必须使用到该索引中的第一个字段作为条件时
才能保证系统使用该索引，否则该索引将不会被使用，并且应尽可能的让字段顺序与索引顺序相一致。

7、很多时候用 exists是一个好的选择：因为后者不会产生大量锁定的表扫描或是索引扫描。
如果你想校验表里是否存在某条纪录，不要用count(*)那样效率很低，而且浪费服务器资源。可以用EXISTS代替。如：
IF (SELECT COUNT(*) FROM table_name WHERE column_name = xxx)
可以写成：
IF EXISTS (SELECT * FROM table_name WHERE column_name = xxx)




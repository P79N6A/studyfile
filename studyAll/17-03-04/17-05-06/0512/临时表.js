'数据表的创建方法
1、创建方法:
方法一：
'create table TempTableName'
或
select [字段1,字段2,...,] into TempTableName from table 
方法二：
'create table tempdb.MyTempTable(Tid int)'

'临时数据表的创建相关说明：'
（1）、'临时表其实是放在数据库tempdb里的一个用户表'；
（2）、'TempTableName必须带“#”'，“#可以是一个或者两个，以#(局部)或##(全局)开头的表,这种表'在会话期间存在',
'会话结束则自动删除';
（3）、如果创建时不以#或##开头,而'用tempdb.TempTable来命名它,则该表可在数据库重启前一直存在'。

2、手动删除
'drop table TempTableName'
说明：
 DROP  TABLE 语句显式除去临时表，否则临时表将在退出其作用域时由系统自动除去：     
（1）、当存储过程完成时，将自动除去在存储过程中创建的本地临时表。由创建表的存储过程执行的所有嵌套存储过程都可以引用此表。
但调用创建此表的存储过程的进程无法引用此表；
（2）、所有'其它本地临时表'在'当前会话结束时自动除去'；
（3）、'全局临时表'在'创建此表的会话结束'且'其它任务停止对其引用时自动除去'。任务与表之间的关联只在单个Transact-SQL语句的
生存周期内保持。换言之，当创建全局临时表的会话结束时，最后一条引用此表的Transact-SQL语句完成后，将自动除去此表。


3、示例代码
（1）创建

use testdb

--创建'局部临时表' 
'create table #tmpStudent(Tid int,Name varchar(50),Age int)'

'insert into #tmpStudent values('xiaowang',25)'

'select * from #tmpStudent'

--创建'局部临时表 另一种写法'
select *  into #tmpStudent from student

select * from #tmpStudent
第二种创建方法：
create table tempdb.MyTempTable(Tid int) --有对应权限才可以这么写
（2）删除
drop table #tmpStudent
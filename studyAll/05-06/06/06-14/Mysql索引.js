在数据量巨大的情况下，没有索引的查询会非常缓慢；
ALTER TABLE article ADD INDEX index_article_title ON title;
'索引是一个特殊的文件''InnoDB数据表上的索引''是表空间一个'组成'部分'
'它们包含'着'对数据表'里所有'记录的引用指针'
通俗来说，'索引好像'是一本书的'目录'，没有索引，'数据库'会'遍历全库查询'，
'按索引'（目录）来'查'，'速度会快很多'
//一般数据库会默认生成主键索引
'1.普通索引'
这是最基本的索引，他没有任何限制
--第二行title就属于普通索引  MyIASM中默认的BTREE类型的索引，也是我们大多数情况下用到的索引。

--'直接创建索引'
'create index index_name on table column'
--'修改表结构的方式添加索引'
alter table table_name add index index_name on column
--'创建表的时候同时创建索引'
CREATE TABLE `table` (
	`id` int(11) NOT NULL AUTO_INCREMENT , 
	`title` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
	`content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
	`time` int(10) NULL DEFAULT NULL ,
	PRIMARY KEY (`id`),
	INDEX index_name title
)
--删除索引
drop index index_name on table

'2。唯一索引'
和普通索引不同就是'唯一索引必须唯一'，但'允许空值'
–-'创建唯一索引'
CREATE UNIQUE INDEX indexName ON table(column(length))
–-'修改表结构'
ALTER TABLE table_name ADD UNIQUE indexName ON (column(length))
–-'创建表的时候直接指定'
CREATE TABLE `table` (
`id` int(11) NOT NULL AUTO_INCREMENT ,
`title` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`time` int(10) NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
UNIQUE indexName (title(length))
);

'3全文索引（FULLTEXT）'

'4. 单列索引、多列索引'
多个单列索引与单个多列索引的查询效果不同，因为执行查询时，
MySQL只能使用一个索引，会从多个索引中选择一个限制最为严格的索引。

'5. 组合索引（最左前缀）'
平时用的SQL查询语句一般都有比较多的限制条件，所以为了进一步榨取MySQL的效率，
就要考虑建立组合索引。例如上表中针对title和time建立一个组合索引：
ALTER TABLE article ADD INDEX index_titme_time (title(50),time(10))。
建立这样的组合索引，其实是相当于分别建立了下面两组组合索引：
–title,time
–title
为什么没有time这样的组合索引呢？这是因为MySQL组合索引“最左前缀”的结果。
简单的理解就是只从最左面的开始组合。
并不是只要包含这两列的查询都会用到该组合索引，如下面的几个SQL所示
//是否使用索引
–使用到上面的索引
SELECT * FROM article WHREE title='测试' AND time=1234567890;
SELECT * FROM article WHREE title='测试';

–不使用上面的索引
SELECT * FROM article WHREE time=1234567890


MySQL优化索引
缺点：索引降低了更新表的速度
//1. 何时使用聚集索引或非聚集索引？
动作描述			使用聚集索引		使用非聚集索引
列经常被分组排序 	使用			使用
返回某范围内的数据 	使用			不使用
一个或极少不同值		不使用		不使用
小数目的不同值		使用			不使用
大数目的不同值		不使用		使用
频繁更新的列			不使用		使用
外键列				使用			使用
主键列				使用			使用
频繁修改索引列		不使用		使用

//2.索引中不会包含有null值的列
只要列中包含有NULL值都将不会被包含在索引中，
复合索引中只要有一列含有NULL值，那么这一列对于此复合索引就是无效的。
所以我们在数据库设计时不要让字段的默认值为NULL。

//3.使用短索引
对串列进行索引，如果可能应该指定一个前缀长度。例如，如果有一个CHAR(255)的列，
如果在前10个或20个字符内，多数值是惟一的，那么就不要对整个列进行索引。
短索引不仅可以提高查询速度而且可以节省磁盘空间和I/O操作。

//4. 索引列排序
MySQL查询只使用一个索引，因此如果where子句中已经使用了索引的话，
那么order by中的列是不会使用索引的。因此数据库默认排序可以符合要求的情况下不要使用排序操作；
尽量不要包含多个列的排序，如果需要最好给这些列创建复合索引。

//5. like语句操作
一般情况下不鼓励使用like操作，如果非使用不可，如何使用也是一个问题。
like “%aaa%” 不会使用索引，而like “aaa%”可以使用索引。

最后总结一下，MySQL只对以下操作符才使用索引：<,<=,=,>,>=,between,in,
以及某些时候的like(不以通配符%或_开头的情形)。而理论上每张表里面最多可创建16个索引，
不过除非是数据量真的很多，否则过多的使用索引也不是那么好玩的，
比如我刚才针对text类型的字段创建索引的时候，系统差点就卡死了。

navicat 结合快捷键
1.ctrl+q           打开查询窗口
2.ctrl+/           注释sql语句
3.ctrl+shift +/    解除注释
4.ctrl+r           运行查询窗口的sql语句
5.ctrl+shift+r     只运行选中的sql语句
6.F6               打开一个mysql命令行窗口
7.ctrl+l           删除一行
8.ctrl+n           打开一个新的查询窗口
9.ctrl+w           关闭一个查询窗口
10.ctrl+d          在查询表数据界面打开一个该表结构的窗口
 
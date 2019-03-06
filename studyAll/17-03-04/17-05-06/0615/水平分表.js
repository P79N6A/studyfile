
根据经验，'Mysql表数据'一般'达到百万级别'，'查询效率'会'很低'，容易'造成表锁'，甚至'堆积很多连接'，'直接挂掉'；水平分表能够很大程度较少这些压力。

1.'按时间'分表
这种分表方式'有一定的局限性'，当'数据有较强的实效性'，如微博发送记录、微信'消息记录'等，这种数据'很少'有用户会'查询几个月前的数据'，如就'可以按月分表'。


2.'按区间范围'分表
一般在'有严格的自增id需求上'，如按照'user_id水平分表'：
table_1  user_id从'1~100w'
table_2  user_id从'101~200w'
table_3  user_id从'201~300w'
...

3.'hash'分表
通过'一个原始目标'的'ID或者名称''通过一定的hash算法计算出数据存储表的表名'，然后'访问相应的表'。

'按如下分10张表'：
function get_hash_table($table, $userid){
	$str = crc32($userid);
	if ($str < 0) {
		$hash = "0" . substr(abs($str), 0, 1);
	} else {
		$hash = substr($str, 0, 2);
	}
	return $table . "_" . $hash;
}

echo get_hash_table('message', 'user18991'); // 结果为message_10
echo get_hash_table('message', 'user34523'); // 结果为message_13

另外，介绍我现在就是采用简单的'取模分表'：

/**
 * @param string
 *            $table_name 表名
 * @param int
 *            $user_id 用户id
 * @param int
 *            $total 分表总数
 */
function hash_table($table_name, $user_id, $total){
	return $table_name . '_' . (($user_id % $total) + 1);
}

echo hash_table("artice", 1234, 5); // artice_5
echo hash_table("artice", 3243, 5); // artice_4

4.利用'merge存储引擎分表'

感觉'merge存储引擎类似sql中union的感觉，但是查询效率不高'。
如下举例，拥有1000w记录的old_user表分表：
（1）'创建new_user表使用merge存储引擎'


mysql> CREATE TABLE IF NOT EXISTS `user1` (
->   `id` int(11) NOT NULL AUTO_INCREMENT,
->   `name` varchar(50) DEFAULT NULL,
->   `sex` int(1) NOT NULL DEFAULT '0',
->   PRIMARY KEY (`id`)
-> ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
Query OK, 0 rows affected (0.05 sec)


mysql> CREATE TABLE IF NOT EXISTS `user2` (
->   `id` int(11) NOT NULL AUTO_INCREMENT,
->   `name` varchar(50) DEFAULT NULL,
->   `sex` int(1) NOT NULL DEFAULT '0',
->   PRIMARY KEY (`id`)
-> ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
Query OK, 0 rows affected (0.01 sec)


mysql> INSERT INTO `user1` (`name`, `sex`) VALUES('张映', 0);
Query OK, 1 row affected (0.00 sec)


mysql> INSERT INTO `user2` (`name`, `sex`) VALUES('tank', 1);
Query OK, 1 row affected (0.00 sec)


mysql> CREATE TABLE IF NOT EXISTS `new_user` (
->   `id` int(11) NOT NULL AUTO_INCREMENT,
->   `name` varchar(50) DEFAULT NULL,
->   `sex` int(1) NOT NULL DEFAULT '0',
->   INDEX(id)
-> ) TYPE=MERGE UNION=(user1,user2) INSERT_METHOD=LAST AUTO_INCREMENT=1
;
Query OK, 0 rows affected, 1 warning (0.00 sec)


mysql> select id,name,sex from new_user;
+----+--------+-----+
| id | name   | sex |
+----+--------+-----+
|  1 | 张映 |   0 |
|  1 | tank   |   1 |
+----+--------+-----+
2 rows in set (0.00 sec)


mysql> INSERT INTO `new_user` (`name`, `sex`) VALUES('tank2', 0);
Query OK, 1 row affected (0.00 sec)


mysql> select id,name,sex from user2
-> ;
+----+-------+-----+
| id | name  | sex |
+----+-------+-----+
|  1 | tank  |   1 |
|  2 | tank2 |   0 |
+----+-------+-----+
2 rows in set (0.00 sec)


（2）我old_user数据进行分表：

INSERT INTO user1(user1.id,user1.name,user1.sex) SELECT
(user.id,user.name,user.sex)FROM old_user where user.id <= 5000000
INSERT INTO user2(user2.id,user2.name,user2.sex) SELECT
(user.id,user.name,user.sex)FROM old_user where user.id > 10000000

这种方案最大的好处是，几乎不用动业务代码。

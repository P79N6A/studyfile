sharding 是增强版的jdbc
	'适用'于任何'java ORM框架'
	'可''基于''任何'第三方'数据库连接池'
	理论上支持任意实现jdbc规范的数据库，目前仅mysql
	
sharding-JDBC目前定义为'轻量java框架'
	以jar包形式提供服务，'未使用中间层'，'无需额外部署'，'无其他依赖'，DBA无需改变运维方式。
	SQL解析'使用Druid解析器'，是目前性能最高的sql解析器
	
sharding-JDBC功能灵活且全面：
	分片解析功能完善，'支持聚合'，'分组'，'排序'，'Limit'，'OR等查询'，并且支持Binding Table以及笛卡尔积表查询

好了，看了这么多的介绍，感觉还是很高大上的，'注意点'有：
	①对JDBC API进行了原生态的分装，这是与cobar-client不一样的地方，这就是他可以'支持''多个第三方ORM框架'的关键
	②可'支持=，BETWEEN，IN'等操作，说明，'JDBC返回结果后'，'sharding'进行了'合并操作'，这里面肯定'会有性能损耗'
	③'支持分表'，这也是cobar-client不支持的地方

好了，先简单的按照官方网址的demo实践一发

ShardingStrategy

	doSharding   '根据分片值从所有的数据源中，查询出可用的数据源'.
    param availableTargetNames '所有'的可用'数据源名称''集合'   ['',''] 
    param shardingValues 分库片值集合
    return 分库后指向的数据源名称集合

    
    doEqualSharding  '根据分片值'和'SQL的=运算符''计算分片结果''名称集合'.
    doInSharding   '根据分片值'和'SQL的IN运算符''计算分片结果''名称集合'.
    doBetweenSharding  '根据分片值'和'SQL的BETWEEN运算符''计算分片结果''名称集合'.
    
    
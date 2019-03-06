字符串String  
1.一个Key对应一个value
2.二进制安全，redis的string'可以包含任何数据'，包括'jpg和序列化对象'
3.最大512M

哈希Hash  类似map  
1.hash是'键值对集合'
2.string型的field和value映射表，适合存储对象

列表List
1.简单的字符串列表，按照插入顺序排序，可以添加一个数据到头部或者尾部
2.底层是个链表

集合Set
string型的无序集合，通过HashTable实现的

有序集合Zset
Zset和set一样是String型的集合，不允许重复
不同是每个元素会关联一个double型的分数
redis通过分数来从小到大排序 zset元素唯一，但是分数可以重复
redis常见数据类型操作命令 
Http://redisdoc.com
	
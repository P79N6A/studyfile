一，String
set //设置键值
setnx //判断设置键值
mset //批量设置键值
msetnx //批量判断设置键值

get //取值
mget //批量取值

//其他 昨晚学习的忘掉了

二，List   rpush/lrange
rpush key1 value1 value2 value3 ..//建立链表
lrange key start stop //按照顺序取链表值

llen key //显示列表长度
lindex key //按照索引取列表的值
lset key index value //按索引取值
ltrim key start stop //将列表变成子链表

rpushx/rpush/rpop
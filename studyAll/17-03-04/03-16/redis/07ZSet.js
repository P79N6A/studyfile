//在set基础上加上score值，  
//之前set是k1 v1 v2 v3 现在是k1 score v1 score v2

zadd zset01 60 v1 70 v2 80 v3 //新建zset01

zrange zset01 0 -1 //获取zset的值
zrange zset01 0 -1 withscores //获取zset的值，按照scores排序

zrangebyscore zset01 50 100//取 50 到 100 之间的值
zrangebyscore zset01 40 80 limit 1 2//40 到 100 之间 取下标 1开始的两个值

zrem zset01 v5 //按两个键删除

zcard 

zcount zset01 60 100 //去改区间的总数
zscore zset01 v5 //取 v5对应的scores
zrank zset01 v4 //取v4排第几

zrevrank zset01 v4//取z4倒数第几
zrevrange zset01 0 -1
zrevrangebyscores zset01 90 60 //倒排取值


先用缓存挡下一部分请求，用定时任务
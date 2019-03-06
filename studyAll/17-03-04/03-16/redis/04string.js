set k1 v1 //设置k1 值为v1
get k1 //获取k1的值
append k1 123 //往k1后面拼接值
strlen k1 //获取k1的长度

INCR k1 //令k1加1
DECRBY k1 //令k1减1

getrange k1 0 2 //取k1从1-3之间的字符
setrange k2 1 abd //从第二个开始用abc替换k2的值

setex k6 10 v6 //设置k6值v6 时长10秒
setnx k1 v11 // 如果k1不存在 设置k1为v11

mset k1 v1 k2 v2 k3 v3 //一次多项设值
mget k1 k2 k3//一次多项取值
msetnx k3 v3 k4 v4 //一个存在，全都不能成功

set ps:station:takeBackTimes: 10 


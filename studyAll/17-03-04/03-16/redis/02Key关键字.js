keys * 查看所有键

EXIST KEY k1 //判断是否存在k1

move k1 2 //把k1移动到2库中

ttl k2 //查看k2什么时候过期

EXPIRE K2 10 //k2设置缓存时间10秒   10秒后从内存移除

DEL k2 //删除k2 让k2立即失效

type k2 //查看k2的数据类型

EXPIRE ps:stations:f09c8c5a06f8c924 10

EXPIRE ps:stations:f09c8c5a06f8c924
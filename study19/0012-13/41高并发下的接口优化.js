'高并发下的''接口优化'
	'Redis预减库存''减少对数据库的访问'
	'内存标记''减少对Redis的访问'
	'请求入队缓存'，'异步下单'，'增强用户体验'（MQ）
	'Nginx水平扩展'
	'分库分表（MyCat）'

'Redis预减库存''减少对数据库的访问'
	'系统初始化'，'商品数量加载到Redis'
	'收到请求'，'Redis预减库存'，'库存不足，直接返回'
	'请求入队'，'立即返回排队中'
	'请求出队'，'生成订单，减少库存'
	'客户端轮询'，'是否秒杀成功'

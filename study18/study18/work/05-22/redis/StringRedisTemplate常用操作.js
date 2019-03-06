stringRedisTemplate.opsForValue().set("test", "100",60*10,TimeUnit.SECONDS);
向redis里'存入数据'和'设置缓存'时间  

stringRedisTemplate.opsForValue().get("test")
根据key'获取缓存'中的val  

stringRedisTemplate.boundValueOps("test").increment(1);
'val +1' 

stringRedisTemplate.expire("red_123",1000 , TimeUnit.MILLISECONDS);
'设置过期时间'

stringRedisTemplate.getExpire("test")
根据key'获取过期时间'

stringRedisTemplate.getExpire("test",TimeUnit.SECONDS)
根据key'获取过期时间'并'换算成''指定单位' 

stringRedisTemplate.delete("test");
'根据key删除'缓存  

stringRedisTemplate.hasKey("546545");
检查'key是否存在'，返回boolean值  

stringRedisTemplate.opsForSet().add("red_123", "1","2","3");
'向指定key'中'存放set集合'  

stringRedisTemplate.opsForSet().isMember("red_123", "1")
'根据key''查看'集合中'是否存在''指定数据'

stringRedisTemplate.opsForSet().members("red_123");
根据key'获取set集合'
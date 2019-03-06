最近在开始在学习Redis以及如何在Java当中去使用Redis，Redis是什么我这里就不说了。

我主要想说的是'Redis和'Java当中'Spring结合'起来的时候，
使'用到的RedisTemplate'和'StringRedisTemplate'

他们'两者'之间'的区别'，以及该怎么使用。

RedisTemplate看这个类的名字后缀是Template，如果了解过Spring如何连接关系型数据库的，
大概不会难猜出这个类
是做什么的 ，它跟JdbcTemplate一样'(两者都)封装'了'对Redis的'一些'常用'的'操作'，
当然StringRedisTemplate跟RedisTemplate功能类似
那么肯定就会有人问，为什么会需要两个Template呢，一个不就够了吗？
其实他们两者之间的区别主要在于他们使用的序列化类。
'RedisTemplate'使'用的是''JdkSerializationRedisSerializer'
'StringRedisTemplate'使'用的是''StringRedisSerializer'

'RedisTemplate'使'用的序列类'在在操作数据的时候，比如说'存入数据''会将数据'先'序列化成字节数组'
然'后'在'存入Redis数据库'，这个时候'打开Redis查看'的时候，你会看到你的'数据''不是'以'可读的'形式
展现的，而是'以字节数组显示'，类似下面

当然'从Redis获取数据'的时候'也会'默认'将数据当'做'字节数组转化'，这样就会'导致'一个'问题'，
当需'要获取'的'数据不是'以'字节数组'存'在redis当中'而'是'正常的'可读'的'字符串的时候（反而异常）'，
比如说下面这种形式的数据

注：使用的软件是RedisDesktopManager
'RedisTemplate'就'无法获取'导数据，这个时候
获取到的值就是NULL。'这'个'时'候'（要用）StringRedisTempate'就派上了用场

当'Redis'当中的'数据值'是以'可读'的形式显示出来的时候，
只能'使用StringRedisTemplate'才能获取到里面的数据。
所以当你使用RedisTemplate获取不到数据的时候请检查一下
是不是Redis里面的数据是可读形式而非字节数组

另外我在测试的时候即使把StringRedisTemplate的序列化类修改
成RedisTemplate的JdkSerializationRedisSerializer
最后还是无法获取被序列化的对象数据，即使是没有转化为对象的字节数组，
代码如下
@Test  
public void testRedisSerializer(){  
    User u = new User();  
    u.setName("java");  
    u.setSex("male");  
    redisTemplate.opsForHash().put("user:","1",u);  
    /*查看redisTemplate 的Serializer*/  
	System.out.println(redisTemplate.getKeySerializer());  
	System.out.println(redisTemplate.getValueSerializer());  
  
    /*查看StringRedisTemplate 的Serializer*/  
	System.out.println(stringRedisTemplate.getValueSerializer());  
	System.out.println(stringRedisTemplate.getValueSerializer());  
  
	/*将stringRedisTemplate序列化类设置成RedisTemplate的序列化类*/  
	stringRedisTemplate.setKeySerializer(new JdkSerializationRedisSerializer());  
	stringRedisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());  
  
    /**
	 * 即使在更换stringRedisTemplate的的Serializer和redisTemplate一致的 
	 * JdkSerializationRedisSerializer 
	 * 最后还是无法从redis中获取序列化的数据 
	 */  
	System.out.println(stringRedisTemplate.getValueSerializer());
	System.out.println(stringRedisTemplate.getValueSerializer());
  
	User user = (User)  redisTemplate.opsForHash().get("user:","1");
    User  user2 = (User) stringRedisTemplate.opsForHash().get("user:","1");
    System.out.println("dsd");
}

Debug结果

总结：
'当'你的'redis数据库'里面本来'存的是字符串'数据或者你要存取的数据就是字符串类型数据的时候，
那么你就'使用StringRedisTemplate'即可，
'但是'如果你的数据'是复杂的对象'类型，而'取出的时候'又不想做任何的数据转换，
直接从Redis里面取出一个对象，那么'使用RedisTemplate'是
更好的选择。
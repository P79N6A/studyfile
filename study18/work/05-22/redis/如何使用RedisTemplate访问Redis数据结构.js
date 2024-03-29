'RedisTemplate'介绍
'spring封装'了'RedisTemplate对象'来'进行'对'redis的'各种'操作'，它'支持'所有的'redis原生的 api'。

'RedisTemplate在spring代码'中的'结构如下'：

//org.springframework.data.redis.core
//Class RedisTemplate<K,V>
//java.lang.Object
//    org.springframework.data.redis.core.RedisAccessor
//        org.springframework.data.redis.core.RedisTemplate<K,V>

the Redis key type against which the template works (usually a String)
模板中的'Redis key'的'类型'（'通常为String'）如：RedisTemplate<String, Object>
注意：如果没特殊情况，切勿定义成RedisTemplate<Object, Object>，
否则根据里氏替换原则，使用的时候会造成类型错误 。

the Redis value type against which the template works
模板中的'Redis value的类型'

RedisTemplate中定义了对'5种数据结构'操作
redisTemplate.opsForValue();'操作字符串'
redisTemplate.opsForHash();'操作hash'
redisTemplate.opsForList();'操作list'
redisTemplate.opsForSet();'操作set'
redisTemplate.opsForZSet();'操作有序set'

'StringRedisTemplate与RedisTemplate'
两者的关系是StringRedisTemplate继承RedisTemplate。
两者的'数据是不共通的'；也就是说'StringRedisTemplate''只'能'管理StringRedisTemplate'里面'的数据'，
'RedisTemplate''只'能'管理RedisTemplate'中'的数据'。

'SDR默认''采用的序列化策略'有两种，'一种是String'的'序列化策略'，'一种是JDK'的'序列化策略'。

'StringRedisTemplate默认采用'的是'String'的'序列化策略'，
保'存的key'和'value'都'是采用此策略'序列化'保存'的。

'RedisTemplate'默认'采用的是JDK'的'序列化策略'，保存的'key和value'都是'采用此策略序列化保存'的。

RedisTemplate配置如下：
@Bean
public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory){
    Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
    ObjectMapper om = new ObjectMapper();
    om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
    om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
    jackson2JsonRedisSerializer.setObjectMapper(om);
    RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
    template.setConnectionFactory(redisConnectionFactory);
    template.setKeySerializer(jackson2JsonRedisSerializer);
    template.setValueSerializer(jackson2JsonRedisSerializer);
    template.setHashKeySerializer(jackson2JsonRedisSerializer);
    template.setHashValueSerializer(jackson2JsonRedisSerializer);
    template.afterPropertiesSet();
    return template;
}
'Redis的String数据结构' （推荐'使用StringRedisTemplate'）
注意：'如果'使'用RedisTemplate'需'要更改序列化方式'

	RedisSerializer<String> stringSerializer = new StringRedisSerializer();
    template.setKeySerializer(stringSerializer );
    template.setValueSerializer(stringSerializer );
    template.setHashKeySerializer(stringSerializer );
    template.setHashValueSerializer(stringSerializer );
        
public interface ValueOperations<K,V>
Redis operations for simple (or in Redis terminology 'string') values.
'ValueOperations''可'以'对String数据结构''进行操作'：

set 'void set(K key, V value);'
使用：redisTemplate.opsForValue().set("name","tom");
结果：redisTemplate.opsForValue().get("name")  输出结果为tom

set 'void set(K key, V value, long timeout, TimeUnit unit);'
使用：redisTemplate.opsForValue().set("name","tom",10, TimeUnit.SECONDS);
结果：redisTemplate.opsForValue().get("name")由于设置的是'10秒失效'，'十秒之内'查询'有结果'，十秒'之后返回为null'

set 'void set(K key, V value, long offset);'
该方法是'用value参数覆写'(overwrite)给定'key'所储存'的'字符串'值'，'从偏移量offset开始'
使用：
	template.opsForValue().set("key","hello world");
	template.opsForValue().set("key","redis", 6);
	System.out.println("***************"+template.opsForValue().get("key"));
结果：***************hello redis

setIfAbsent 'Boolean setIfAbsent(K key, V value);'
使用：
	System.out.println(template.opsForValue().setIfAbsent("multi1","multi1"));false  'multi1之前已经存在'
	System.out.println(template.opsForValue().setIfAbsent("multi111","multi111"));true  'multi111之前不存在'
结果：
	false
	true

multiSet 'void multiSet(Map<? extends K, ? extends V> m);'
为'多个键''分别设置'它们的'值'
使用：
	Map<String,String> maps = new HashMap<String, String>();
    maps.put("multi1","multi1");
    maps.put("multi2","multi2");
    maps.put("multi3","multi3");
    template.opsForValue().multiSet(maps);
    List<String> keys = new ArrayList<String>();
    keys.add("multi1");
    keys.add("multi2");
    keys.add("multi3");
    System.out.println(template.opsForValue().multiGet(keys));
结果：
	[multi1, multi2, multi3]

multiSetIfAbsent 'Boolean multiSetIfAbsent(Map<? extends K, ? extends V> m);'
为'多个键''分别设置'它们的'值'，如果'存在则返回false'，'不存在返回true'
使用：
	Map<String,String> maps = new HashMap<String, String>();
    maps.put("multi11","multi11");
    maps.put("multi22","multi22");
    maps.put("multi33","multi33");
    Map<String,String> maps2 = new HashMap<String, String>();
    maps2.put("multi1","multi1");
    maps2.put("multi2","multi2");
    maps2.put("multi3","multi3");
    System.out.println(template.opsForValue().multiSetIfAbsent(maps));
    System.out.println(template.opsForValue().multiSetIfAbsent(maps2));
结果：
	true
	false
	
get 'V get(Object key);'
使用：
	template.opsForValue().set("key","hello world");
	System.out.println("***************"+template.opsForValue().get("key"));
结果：***************hello world

getAndSet 'V getAndSet(K key, V value);'
'设置键''的'字符串'值'并'返回其旧值'
使用：
	template.opsForValue().set("getSetTest","test");
	System.out.println(template.opsForValue().getAndSet("getSetTest","test2"));
结果：test

multiGet 'List<V> multiGet(Collection<K> keys);'
为'多个键'分别'取出它们的值'
使用：
	Map<String,String> maps = new HashMap<String, String>();
    maps.put("multi1","multi1");
    maps.put("multi2","multi2");
    maps.put("multi3","multi3");
    template.opsForValue().multiSet(maps);
    List<String> keys = new ArrayList<String>();
    keys.add("multi1");
    keys.add("multi2");
    keys.add("multi3");
    System.out.println(template.opsForValue().multiGet(keys));
结果：
	[multi1, multi2, multi3]

increment 'Long increment(K key, long delta);'
'支持整数'
使用：
	template.opsForValue().increment("increlong",1);
	System.out.println("***************"+template.opsForValue().get("increlong"));
结果：***************1

increment 'Double increment(K key, double delta);'
也'支持浮点数'
使用：
	template.opsForValue().increment("increlong",1.2);
	System.out.println("***************"+template.opsForValue().get("increlong"));
结果：***************2.2

append 'Integer append(K key, String value);'
如果'key已经存'在并'且是一个字符串'，则该命令'将该值追加到字符串的末尾'。如果'键不存在'，
'则它'被创建并设置为空字符串，因此APPEND在这种特殊情况下将'类似于SET'。
使用：
	template.opsForValue().append("appendTest","Hello");
	System.out.println(template.opsForValue().get("appendTest"));
	template.opsForValue().append("appendTest","world");
	System.out.println(template.opsForValue().get("appendTest"));
结果：
	Hello
	Helloworld
	
get 'String get(K key, long start, long end);'
'截取key'所对应的value字符串
使用：appendTest对应的value为Helloworld
	System.out.println("*********"+template.opsForValue().get("appendTest",0,5));
结果：*********Hellow
使用：
	System.out.println("*********"+template.opsForValue().get("appendTest",0,-1));
结果：*********Helloworld
使用：
	System.out.println("*********"+template.opsForValue().get("appendTest",-3,-1));
结果：*********rld

size 'Long size(K key);'
返回'key'所'对应的value值'得长度
使用：
	template.opsForValue().set("key","hello world");
	System.out.println("***************"+template.opsForValue().size("key"));
结果：***************11

setBit 'Boolean setBit(K key, long offset, boolean value);'
对'key所储存的字符串值'，'设置或清除''指定偏移量'上'的位'(bit)
'key键'对应'的值value''对应的ascii码','在offset的位置'(从左向右数)'变为value'
使用：
	template.opsForValue().set("bitTest","a");
    // 'a' 的ASCII码是 97。转换为二进制是：01100001
    // 'b' 的ASCII码是 98  转换为二进制是：01100010
    // 'c' 的ASCII码是 99  转换为二进制是：01100011
    // 因为二进制只有0和1，在setbit中true为1，false为0，因此我要变为'b'的话第六位设置为1，第七位设置为0
    template.opsForValue().setBit("bitTest",6, true);
    template.opsForValue().setBit("bitTest",7, false);
    System.out.println(template.opsForValue().get("bitTest"));
结果：b

getBit Boolean getBit(K key, long offset);
获取键对应值的ascii码的在offset处位值
使用：System.out.println(template.opsForValue().getBit("bitTest",7));
结果：false

'Redis的List数据结构'
这边我们'把RedisTemplate序列化方式''改回之前的'

	Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
    ObjectMapper om = new ObjectMapper();
    om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
    om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
    jackson2JsonRedisSerializer.setObjectMapper(om);
    
    RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
    template.setKeySerializer(jackson2JsonRedisSerializer);
    template.setValueSerializer(jackson2JsonRedisSerializer);
    template.setHashKeySerializer(jackson2JsonRedisSerializer);
    template.setHashValueSerializer(jackson2JsonRedisSerializer);
    
    public interface ListOperations<K,V>
    
'Redis列表'是'简单'的'字符串列表'，按'照插入顺序排序'。你'可'以'添加'一个'元素到列表'的'头部'（左边）'或'者'尾部'（右边）

'ListOperations'专门'操作list'列表：
'List<V> range(K key, long start, long end);'
'返回'存储在键中的'列表的指定元素'。偏移'开始和停止'是'基于零的索引'，其中0是列表的第一个元素（列表的头部），1是下一个元素
使用：
	System.out.println(template.opsForList().range("list",0,-1));
结果:[c#, c++, python, java, c#, c#]

'void trim(K key, long start, long end);'
修剪现有列表，'使其只包含''指定'的指定'范围的元素'，'起始和停止'都是'基于0的索引'
使用：
	System.out.println(template.opsForList().range("list",0,-1));
	template.opsForList().trim("list",1,-1);//裁剪第一个元素
	System.out.println(template.opsForList().range("list",0,-1));
结果:
	[c#, c++, python, java, c#, c#]
	[c++, python, java, c#, c#]
	
	Long size(K key);
'返回'存储'在键中'的'列表的长度'。如果'键不存在'，则将其解释为空列表，并'返回0'。当key存储的值不是列表时返回错误。
使用：System.out.println(template.opsForList().size("list"));
结果:6

'Long leftPush(K key, V value);'
将'所有指定的值''插入存储在键'的'列表的头部'。
如果'键不存在'，则在'执行推送操作之前''将其创建为空列表'。（从左边插入）
使用：
	template.opsForList().leftPush("list","java");
	template.opsForList().leftPush("list","python");
	template.opsForList().leftPush("list","c++");
结果:返回的结果为推送操作后的列表的长度
	1
	2
	3
'Long leftPushAll(K key, V... values);'
'批量''把一个数组''插入到列表中'
使用：
	String[] stringarrays = new String[]{"1","2","3"};
	template.opsForList().leftPushAll("listarray",stringarrays);
	System.out.println(template.opsForList().range("listarray",0,-1));
结果:
	[3, 2, 1]
	
'Long leftPushAll(K key, Collection<V> values);'
'批量把'一个'集合插入到列表'中
使用：
	List<Object> strings = new ArrayList<Object>();
	strings.add("1");
	strings.add("2");
	strings.add("3");
	template.opsForList().leftPushAll("listcollection4", strings);
	System.out.println(template.opsForList().range("listcollection4",0,-1));
结果:[3, 2, 1]
	
'Long leftPushIfPresent(K key, V value);'
只有'存在key对应的列表''才'能'将这个value值''插入到key'所'对应的列表中'
使用：
	System.out.println(template.opsForList().leftPushIfPresent("leftPushIfPresent","aa"));
	System.out.println(template.opsForList().leftPushIfPresent("leftPushIfPresent","bb"));
==========分割线===========
	System.out.println(template.opsForList().leftPush("leftPushIfPresent","aa"));
	System.out.println(template.opsForList().leftPushIfPresent("leftPushIfPresent","bb"));
结果:
	0
	0
==========分割线===========
	1
	2
	
'Long leftPush(K key, V pivot, V value);'
'把value值''放到key对应列表'中'pivot值'的'左面'，如果'pivot值存在'的话
使用：
	template.opsForList().leftPush("list","java","oc");
	System.out.print(template.opsForList().range("list",0,-1));
结果：
	[c++, python, oc, java, c#, c#]

'Long rightPush(K key, V value);'
将'所有指定的值''插入'存储在键的'列表的头部'。如果'键不存在'，
则'在执行推送操作之前''将其创建为空列表'。（'从右边插入'）
使用：
	template.opsForList().rightPush("listRight","java");
	template.opsForList().rightPush("listRight","python");
	template.opsForList().rightPush("listRight","c++");
结果:
	1
	2
	3
	
Long rightPushAll(K key, V... values);
使用：
	String[] stringarrays = new String[]{"1","2","3"};
	template.opsForList().rightPushAll("listarrayright",stringarrays);
	System.out.println(template.opsForList().range("listarrayright",0,-1));
结果:
	[1, 2, 3]
	
Long rightPushAll(K key, Collection<V> values);
使用：
	List<Object> strings = new ArrayList<Object>();
    strings.add("1");
    strings.add("2");
    strings.add("3");
    template.opsForList().rightPushAll("listcollectionright", strings);
    System.out.println(template.opsForList().range("listcollectionright",0,-1));
结果:
	[1, 2, 3]
    
'Long rightPushIfPresent(K key, V value);'
只有'存在key对应的列表'才能'将'这个'value'值'插入到key'所对应的列表中
使用：
	System.out.println(template.opsForList().rightPushIfPresent("rightPushIfPresent","aa"));
    System.out.println(template.opsForList().rightPushIfPresent("rightPushIfPresent","bb"));
    System.out.println("==========分割线===========");
    System.out.println(template.opsForList().rightPush("rightPushIfPresent","aa"));
    System.out.println(template.opsForList().rightPushIfPresent("rightPushIfPresent","bb"));
结果:
	0
	0
==========分割线===========
	1
	2
	
Long rightPush(K key, V pivot, V value);
把value值放到key对应列表中pivot值的右面，如果pivot值存在的话
使用：
	System.out.println(template.opsForList().range("listRight",0,-1));
	template.opsForList().rightPush("listRight","python","oc");
	System.out.println(template.opsForList().range("listRight",0,-1));
结果:
	[java, python, c++]
	[java, python, oc, c++]
	
void set(K key, long index, V value);
在列表中index的位置设置value值
使用：
	System.out.println(template.opsForList().range("listRight",0,-1));
	template.opsForList().set("listRight",1,"setValue");
	System.out.println(template.opsForList().range("listRight",0,-1));
结果:
	[java, python, oc, c++]
	[java, setValue, oc, c++]
	
'Long remove(K key, long count, Object value);'
从存储'在键中的列表'中'删除等于值的元素''的第一个计数事件'。
'计数参数''以下列方式''影响操作'：
count > 0：删除等于从头到尾移动的值的元素。
count < 0：删除等于从尾到头移动的值的元素。
count = 0：删除等于value的所有元素。
使用：
	System.out.println(template.opsForList().range("listRight",0,-1));
	template.opsForList().remove("listRight",1,"setValue");//将删除列表中存储的列表中第一次次出现的“setValue”。
	System.out.println(template.opsForList().range("listRight",0,-1));
结果:
	[java, setValue, oc, c++]
	[java, oc, c++]
	
V index(K key, long index);
根据下表获取列表中的值，下标是从0开始的
使用：
	System.out.println(template.opsForList().range("listRight",0,-1));
	System.out.println(template.opsForList().index("listRight",2));
结果:
	[java, oc, c++]
	c++
	
'V leftPop(K key);'
弹出'最左边的元素'，弹出之后该值在列表中将不复存在
使用：
	System.out.println(template.opsForList().range("list",0,-1));
	System.out.println(template.opsForList().leftPop("list"));
	System.out.println(template.opsForList().range("list",0,-1));
结果:
	[c++, python, oc, java, c#, c#]
	c++
	[python, oc, java, c#, c#]
	
'V leftPop(K key, long timeout, TimeUnit unit);'
'移出并获取'列表的'第一个元素'， '如果'列表'没有元素''会阻塞列表'直'到等待超时''或发现可弹出元素为止'。
使用：'用法与 leftPop(K key);一样'

'V rightPop(K key);'
'弹出最右边'的'元素'，弹出'之后该值''在列表'中将'不复存在'
使用： 
	System.out.println(template.opsForList().range("list",0,-1));
	System.out.println(template.opsForList().rightPop("list"));
	System.out.println(template.opsForList().range("list",0,-1));
结果:
	[python, oc, java, c#, c#]
	c#
	[python, oc, java, c#]
	
V rightPop(K key, long timeout, TimeUnit unit);
'移出并获取'列表的'最后一个元素'， 如果'列表没有元素会阻塞列表''直到等待超时''或发现可弹出元素为止'。
使用：用法与rightPop(K key);一样

V rightPopAndLeftPush(K sourceKey, K destinationKey);
用于'移除'列表的'最后一个元素'，并'将该元素''添加到''另一个列表''并返回'。
使用：
	System.out.println(template.opsForList().range("list",0,-1));
	template.opsForList().rightPopAndLeftPush("list","rightPopAndLeftPush");
    System.out.println(template.opsForList().range("list",0,-1));
    System.out.println(template.opsForList().range("rightPopAndLeftPush",0,-1));
结果:
	[oc, java,c#]
    [oc, java]
    [c#]
    
V rightPopAndLeftPush(K sourceKey, K destinationKey, long timeout, TimeUnit unit);
用于'移除列表'的'最后一个元素'，并'将该元素'添'加到另一个列表''并返回'，
如果'列表没有元素''会阻塞列表''直到'等待'超时''或发现可弹出元素为止'。
使用：用法与rightPopAndLeftPush(K sourceKey, K destinationKey)一样

'Redis的Hash数据机构'
Redis的'Hash可以'让用户'将多个键值对''存储到一个Redis键'里面。

public interface HashOperations<H,HK,HV>
HashOperations提供一系列方法操作hash：

初始数据:
	//template.opsForHash().put("redisHash","name","tom");
	//template.opsForHash().put("redisHash","age",26);
	//template.opsForHash().put("redisHash","class","6");
	
	//Map<String,Object> testMap = new HashMap();
	//testMap.put("name","jack");
	//testMap.put("age",27);
	//testMap.put("class","1");
	//template.opsForHash().putAll("redisHash1",testMap);
	
'Long delete(H key, Object... hashKeys);'
删除给定的哈希hashKeys
使用：
	System.out.println(template.opsForHash().delete("redisHash","name"));
	System.out.println(template.opsForHash().entries("redisHash"));
结果：1
	{class=6, age=28.1}

'Boolean hasKey(H key, Object hashKey);'
'确定哈希hashKey'是否'存在'
使用：
	System.out.println(template.opsForHash().hasKey("redisHash","age"));
	System.out.println(template.opsForHash().hasKey("redisHash","ttt"));
结果：
	true
	false
	
'HV get(H key, Object hashKey);'
从键中的哈希获取给定hashKey的值
使用：System.out.println(template.opsForHash().get("redisHash","age"));
结果：26

List<HV> multiGet(H key, Collection<HK> hashKeys);
'从哈希'中'获取给定hashKey的值'
使用：
	List<Object> kes = new ArrayList<Object>();
    kes.add("name");
    kes.add("age");
    System.out.println(template.opsForHash().multiGet("redisHash",kes));
结果：
	[jack, 28.1]

Long 'increment'(H key, HK hashKey, long delta);
'通过给定的delta''增加散列hashKey的值'（整型）
使用：
	System.out.println(template.opsForHash().get("redisHash","age"));
    System.out.println(template.opsForHash().increment("redisHash","age",1));
结果：
	26
	27
	
Double increment(H key, HK hashKey, double delta);
'通过给定的delta''增加散列hashKey的值'（浮点数）
使用：
	System.out.println(template.opsForHash().get("redisHash","age"));
    System.out.println(template.opsForHash().increment("redisHash","age",1.1));
结果：
	27
	28.1
	
Set<HK> keys(H key);
'获取key'所'对应的散列表的key'
使用：
	System.out.println(template.opsForHash().keys("redisHash1"));
	//redisHash1所对应的散列表为{class=1, name=jack, age=27}
结果：
	[name, class, age]

Long size(H key);
'获取key'所'对应的散列表'的大小'个数'
使用：
	System.out.println(template.opsForHash().size("redisHash1"));
	//redisHash1所对应的散列表为{class=1, name=jack, age=27}
结果：
	3
	
void putAll(H key, Map<? extends HK, ? extends HV> m);
使'用m'中'提供的多个散列字段''设置到key'对应'的散列表中'
使用：
	Map<String,Object> testMap = new HashMap();
    testMap.put("name","jack");
    testMap.put("age",27);
    testMap.put("class","1");
    template.opsForHash().putAll("redisHash1",testMap);
    System.out.println(template.opsForHash().entries("redisHash1"));
结果：
	{class=1, name=jack, age=27}

void put(H key, HK hashKey, HV value);
设置'散列hashKey的值'
使用：
	template.opsForHash().put("redisHash","name","tom");
	template.opsForHash().put("redisHash","age",26);
	template.opsForHash().put("redisHash","class","6");
	System.out.println(template.opsForHash().entries("redisHash"));
结果：
	{age=26, class=6, name=tom}

Boolean putIfAbsent(H key, HK hashKey, HV value);
仅'当hashKey不存在'时才'设置散列hashKey'的值。
使用：
	System.out.println(template.opsForHash().putIfAbsent("redisHash","age",30));
	System.out.println(template.opsForHash().putIfAbsent("redisHash","kkk","kkk"));
结果：
	false
	true
	
List<HV> values(H key);
'获取''整个哈希''存储的值'根据密钥
使用：System.out.println(template.opsForHash().values("redisHash"));
结果：[tom, 26, 6]

Map<HK, HV> entries(H key);
'获取''整个哈希''存储'根据密钥
使用：System.out.println(template.opsForHash().entries("redisHash"));
结果：{age=26, class=6, name=tom}

Cursor<Map.Entry<HK, HV>> scan(H key, ScanOptions options);
使用Cursor在key的hash中迭代，相当于迭代器。
使用：
	Cursor<Map.Entry<Object, Object>> curosr = template.opsForHash().scan("redisHash", ScanOptions.ScanOptions.NONE);
	while(curosr.hasNext()){
		Map.Entry<Object, Object> entry = curosr.next();
        System.out.println(entry.getKey()+":"+entry.getValue());
	}
结果：
	age:28.1
	class:6
	kkk:kkk
	
Redis的Set数据结构
Redis的Set是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。
Redis 中 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。
public interface SetOperations<K,V>
SetOperations提供了对无序集合的一系列操作：

Long add(K key, V... values);
'无序集合'中'添加元素'，返回添加个数
也可以直接在add里面添加多个值 如：template.opsForSet().add("setTest","aaa","bbb")
使用：String[] strarrays = new String[]{"strarr1","sgtarr2"};
        System.out.println(template.opsForSet().add("setTest", strarrays));
结果：2
Long remove(K key, Object... values);
'移除'集合中一个或多个'成员'
使用：String[] strarrays = new String[]{"strarr1","sgtarr2"};
System.out.println(template.opsForSet().remove("setTest",strarrays));
结果：2
V pop(K key);
'移除并返回'集合中的一个'随机元素'
使用：System.out.println(template.opsForSet().pop("setTest"));
System.out.println(template.opsForSet().members("setTest"));
结果：bbb
[aaa, ccc]
Boolean move(K key, V value, K destKey);
'将 member' 元素'从 source' 集合'移动到 destination' 集合
使用：template.opsForSet().move("setTest","aaa","setTest2");
        System.out.println(template.opsForSet().members("setTest"));
        System.out.println(template.opsForSet().members("setTest2"));
结果：[ccc]
[aaa]
Long size(K key);
无序集合的大小长度
使用：System.out.println(template.opsForSet().size("setTest"));
结果：1
Boolean isMember(K key, Object o);
'判断' member 元素'是否是集合 key' '的成员'
使用：System.out.println(template.opsForSet().isMember("setTest","ccc"));
        System.out.println(template.opsForSet().isMember("setTest","asd"));
结果：true
false
Set<V> intersect(K key, K otherKey);
'key对应的无序集合''与otherKey对应的无序集合''求交集'
使用：System.out.println(template.opsForSet().members("setTest"));
        System.out.println(template.opsForSet().members("setTest2"));
        System.out.println(template.opsForSet().intersect("setTest","setTest2"));
结果：[aaa, ccc]
[aaa]
[aaa]
Set<V> intersect(K key, Collection<K> otherKeys);
key对应的'无序集合''与多个otherKey对应的无序集'合'求交集'
使用：System.out.println(template.opsForSet().members("setTest"));
        System.out.println(template.opsForSet().members("setTest2"));
        System.out.println(template.opsForSet().members("setTest3"));
        List<String> strlist = new ArrayList<String>();
        strlist.add("setTest2");
        strlist.add("setTest3");
        System.out.println(template.opsForSet().intersect("setTest",strlist));
结果：[aaa, ccc]
[aaa]
[ccc, aaa]
[aaa]
Long intersectAndStore(K key, K otherKey, K destKey);
key'无序集合''与otherkey无序集合的交集''存储到destKey无序集合'中
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
System.out.println(template.opsForSet().intersectAndStore("setTest","setTest2","destKey1"));
System.out.println(template.opsForSet().members("destKey1"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
2
[aaa, ccc]
Long intersectAndStore(K key, Collection<K> otherKeys, K destKey);
key对应的无序集合与多个otherKey对应的无序集合求交集存储到destKey无序集合中
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println("setTest3:" + template.opsForSet().members("setTest3"));
        List<String> strlist = new ArrayList<String>();
        strlist.add("setTest2");
        strlist.add("setTest3");
        System.out.println(template.opsForSet().intersectAndStore("setTest",strlist,"destKey2"));
        System.out.println(template.opsForSet().members("destKey2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[ccc, aaa]
2
[aaa, ccc]
Set<V> union(K key, K otherKey);
key无序集合与otherKey无序集合的并集
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println(template.opsForSet().union("setTest","setTest2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
[ccc, aaa, ddd, bbb]
Set<V> union(K key, Collection<K> otherKeys);
key无序集合与多个otherKey无序集合的并集
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println("setTest3:" + template.opsForSet().members("setTest3"));
        List<String> strlist = new ArrayList<String>();
        strlist.add("setTest2");
        strlist.add("setTest3");
        System.out.println(template.opsForSet().union("setTest",strlist));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
[ddd, xxx, bbb, aaa, ccc]
Long unionAndStore(K key, K otherKey, K destKey);
key无序集合与otherkey无序集合的并集存储到destKey无序集合中
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println(template.opsForSet().unionAndStore("setTest","setTest2","unionAndStoreTest1"));
        System.out.println("unionAndStoreTest1:" + template.opsForSet().members("unionAndStoreTest1"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
4
unionAndStoreTest1:[ccc, aaa, ddd, bbb]
Long unionAndStore(K key, Collection<K> otherKeys, K destKey);
key无序集合与多个otherkey无序集合的并集存储到destKey无序集合中
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println("setTest3:" + template.opsForSet().members("setTest3"));
        List<String> strlist = new ArrayList<String>();
        strlist.add("setTest2");
        strlist.add("setTest3");
        System.out.println(template.opsForSet().unionAndStore("setTest",strlist,"unionAndStoreTest2"));
        System.out.println("unionAndStoreTest2:" + template.opsForSet().members("unionAndStoreTest2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
5
unionAndStoreTest2:[ddd, xxx, bbb, aaa, ccc]
Set<V> difference(K key, K otherKey);
key无序集合与otherKey无序集合的差集
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println(template.opsForSet().difference("setTest","setTest2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
[bbb, ddd]
Set<V> difference(K key, Collection<K> otherKeys);
key无序集合与多个otherKey无序集合的差集
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println("setTest3:" + template.opsForSet().members("setTest3"));
        List<String> strlist = new ArrayList<String>();
        strlist.add("setTest2");
        strlist.add("setTest3");
        System.out.println(template.opsForSet().difference("setTest",strlist));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
[bbb, ddd]
Long differenceAndStore(K key, K otherKey, K destKey);
key无序集合与otherkey无序集合的差集存储到destKey无序集合中
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println(template.opsForSet().differenceAndStore("setTest","setTest2","differenceAndStore1"));
        System.out.println("differenceAndStore1:" + template.opsForSet().members("differenceAndStore1"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
2
differenceAndStore1:[bbb, ddd]
Long differenceAndStore(K key, Collection<K> otherKeys, K destKey);
key无序集合与多个otherkey无序集合的差集存储到destKey无序集合中
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTest2:" + template.opsForSet().members("setTest2"));
        System.out.println("setTest3:" + template.opsForSet().members("setTest3"));
        List<String> strlist = new ArrayList<String>();
        strlist.add("setTest2");
        strlist.add("setTest3");
        System.out.println(template.opsForSet().differenceAndStore("setTest",strlist,"differenceAndStore2"));
        System.out.println("differenceAndStore2:" + template.opsForSet().members("differenceAndStore2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
2
differenceAndStore2:[bbb, ddd]
Set<V> members(K key);
返回集合中的所有成员
使用：System.out.println(template.opsForSet().members("setTest"));
结果：[ddd, bbb, aaa, ccc]
V randomMember(K key);
随机获取key无序集合中的一个元素
使用：System.out.println("setTest:" + template.opsForSet().members("setTest"));
        System.out.println("setTestrandomMember:" + template.opsForSet().randomMember("setTest"));
        System.out.println("setTestrandomMember:" + template.opsForSet().randomMember("setTest"));
        System.out.println("setTestrandomMember:" + template.opsForSet().randomMember("setTest"));
        System.out.println("setTestrandomMember:" + template.opsForSet().randomMember("setTest"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTestrandomMember:aaa
setTestrandomMember:bbb
setTestrandomMember:aaa
setTestrandomMember:ddd
Set<V> distinctRandomMembers(K key, long count);
获取多个key无序集合中的元素（去重），count表示个数
使用：System.out.println("randomMembers:" + template.opsForSet().distinctRandomMembers("setTest",5));
结果：randomMembers:[aaa, bbb, ddd, ccc]
List<V> randomMembers(K key, long count);
获取多个key无序集合中的元素，count表示个数
使用：System.out.println("randomMembers:" + template.opsForSet().randomMembers("setTest",5));
结果：randomMembers:[ccc, ddd, ddd, ddd, aaa]
Cursor<V> scan(K key, ScanOptions options);
遍历set
使用： Cursor<Object> curosr = template.opsForSet().scan("setTest", ScanOptions.NONE);
        while(curosr.hasNext()){
            System.out.println(curosr.next());
        }
结果：ddd
bbb
aaa
ccc
Redis的ZSet数据结构
Redis 有序集合和无序集合一样也是string类型元素的集合,且不允许重复的成员。
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
有序集合的成员是唯一的,但分数(score)却可以重复。
public interface ZSetOperations<K,V>
ZSetOperations提供了一系列方法对有序集合进行操作：

Boolean add(K key, V value, double score);
'新增'一个'有序集合'，'存在'的话为'false'，'不存在'的话为'true'
使用：System.out.println(template.opsForZSet().add("zset1","zset-1",1.0));
结果：true
Long add(K key, Set<TypedTuple<V>> tuples);
'新增'一个'有序集合'
使用：ZSetOperations.TypedTuple<Object> objectTypedTuple1 = new DefaultTypedTuple<Object>("zset-5",9.6);
        ZSetOperations.TypedTuple<Object> objectTypedTuple2 = new DefaultTypedTuple<Object>("zset-6",9.9);
        Set<ZSetOperations.TypedTuple<Object>> tuples = new HashSet<ZSetOperations.TypedTuple<Object>>();
        tuples.add(objectTypedTuple1);
        tuples.add(objectTypedTuple2);
        System.out.println(template.opsForZSet().add("zset1",tuples));
        System.out.println(template.opsForZSet().range("zset1",0,-1));
结果：[zset-1, zset-2, zset-3, zset-4, zset-5, zset-6]
Long remove(K key, Object... values);
'从有序集合'中'移除'一个或者多个'元素'
使用：System.out.println(template.opsForZSet().range("zset1",0,-1));
        System.out.println(template.opsForZSet().remove("zset1","zset-6"));
        System.out.println(template.opsForZSet().range("zset1",0,-1));
结果：[zset-1, zset-2, zset-3, zset-4, zset-5, zset-6]
1
[zset-1, zset-2, zset-3, zset-4, zset-5]
Double incrementScore(K key, V value, double delta);
增加元素的score值，并返回增加后的值
使用：System.out.println(template.opsForZSet().incrementScore("zset1","zset-1",1.1));  //原为1.1
结果：2.2
Long rank(K key, Object o);
返回有序集中指定成员的排名，其中有序集成员按分数值递增(从小到大)顺序排列
使用：System.out.println(template.opsForZSet().range("zset1",0,-1));
        System.out.println(template.opsForZSet().rank("zset1","zset-2"));
结果：[zset-2, zset-1, zset-3, zset-4, zset-5]
0   //表明排名第一
Long reverseRank(K key, Object o);
返回有序集中指定成员的排名，其中有序集成员按分数值递减(从大到小)顺序排列
使用：System.out.println(template.opsForZSet().range("zset1",0,-1));
        System.out.println(template.opsForZSet().reverseRank("zset1","zset-2"));
结果：[zset-2, zset-1, zset-3, zset-4, zset-5]
4 //递减之后排到第五位去了
Set<V> range(K key, long start, long end);
通过索引区间返回有序集合成指定区间内的成员，其中有序集成员按分数值递增(从小到大)顺序排列
使用：System.out.println(template.opsForZSet().range("zset1",0,-1));
结果：[zset-2, zset-1, zset-3, zset-4, zset-5]
Set<TypedTuple<V>> rangeWithScores(K key, long start, long end);
通过索引区间返回有序集合成指定区间内的成员对象，其中有序集成员按分数值递增(从小到大)顺序排列
使用：Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeWithScores("zset1",0,-1);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-2score:1.2
value:zset-1score:2.2
value:zset-3score:2.3
value:zset-4score:6.6
value:zset-5score:9.6
Set<V> rangeByScore(K key, double min, double max);
通过分数返回有序集合指定区间内的成员，其中有序集成员按分数值递增(从小到大)顺序排列
使用：System.out.println(template.opsForZSet().rangeByScore("zset1",0,5));
结果：[zset-2, zset-1, zset-3]
Set<TypedTuple<V>> rangeByScoreWithScores(K key, double min, double max);
通过分数返回有序集合指定区间内的成员对象，其中有序集成员按分数值递增(从小到大)顺序排列
使用：Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeByScoreWithScores("zset1",0,5);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-2score:1.2
value:zset-1score:2.2
value:zset-3score:2.3
Set<V> rangeByScore(K key, double min, double max, long offset, long count);
通过分数返回有序集合指定区间内的成员，并在索引范围内，其中有序集成员按分数值递增(从小到大)顺序排列
使用： System.out.println(template.opsForZSet().rangeByScore("zset1",0,5));
    System.out.println(template.opsForZSet().rangeByScore("zset1",0,5,1,2));
结果：[zset-2, zset-1, zset-3]
[zset-1, zset-3]
Set<TypedTuple<V>> rangeByScoreWithScores(K key, double min, double max, long offset, long count);
通过分数返回有序集合指定区间内的成员对象，并在索引范围内，其中有序集成员按分数值递增(从小到大)顺序排列
使用：Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeByScoreWithScores("zset1",0,5,1,2);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-1score:2.2
value:zset-3score:2.3
Set<V> reverseRange(K key, long start, long end);
通过索引区间返回有序集合成指定区间内的成员，其中有序集成员按分数值递减(从大到小)顺序排列
使用：System.out.println(template.opsForZSet().reverseRange("zset1",0,-1));
结果：[zset-5, zset-4, zset-3, zset-1, zset-2]
Set<TypedTuple<V>> reverseRangeWithScores(K key, long start, long end);
通过索引区间返回有序集合成指定区间内的成员对象，其中有序集成员按分数值递减(从大到小)顺序排列
使用：Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().reverseRangeWithScores("zset1",0,-1);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-5score:9.6
value:zset-4score:6.6
value:zset-3score:2.3
value:zset-1score:2.2
value:zset-2score:1.2
Set<V> reverseRangeByScore(K key, double min, double max);
使用：与rangeByScore调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
Set<TypedTuple<V>> reverseRangeByScoreWithScores(K key, double min, double max);
使用：与rangeByScoreWithScores调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
Set<V> reverseRangeByScore(K key, double min, double max, long offset, long count);
使用：与rangeByScore调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
Set<TypedTuple<V>> reverseRangeByScoreWithScores(K key, double min, double max, long offset, long count);
使用：与rangeByScoreWithScores调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
Long count(K key, double min, double max);
通过分数返回有序集合指定区间内的成员个数
使用：System.out.println(template.opsForZSet().rangeByScore("zset1",0,5));
        System.out.println(template.opsForZSet().count("zset1",0,5));
结果：[zset-2, zset-1, zset-3]
3
Long size(K key);
获取有序集合的成员数，内部调用的就是zCard方法
使用：System.out.println(template.opsForZSet().size("zset1"));
结果：6
Long zCard(K key);
获取有序集合的成员数
使用：System.out.println(template.opsForZSet().zCard("zset1"));
结果：6
Double score(K key, Object o);
获取指定成员的score值
使用：System.out.println(template.opsForZSet().score("zset1","zset-1"));
结果：2.2
Long removeRange(K key, long start, long end);
移除指定索引位置的成员，其中有序集成员按分数值递增(从小到大)顺序排列
使用：System.out.println(template.opsForZSet().range("zset2",0,-1));
        System.out.println(template.opsForZSet().removeRange("zset2",1,2));
        System.out.println(template.opsForZSet().range("zset2",0,-1));
结果：[zset-1, zset-2, zset-3, zset-4]
2
[zset-1, zset-4]
Long removeRangeByScore(K key, double min, double max);
根据指定的score值得范围来移除成员
使用：//System.out.println(template.opsForZSet().add("zset2","zset-1",1.1));
        //System.out.println(template.opsForZSet().add("zset2","zset-2",1.2));
        //System.out.println(template.opsForZSet().add("zset2","zset-3",2.3));
        //System.out.println(template.opsForZSet().add("zset2","zset-4",6.6));
System.out.println(template.opsForZSet().range("zset2",0,-1));
System.out.println(template.opsForZSet().removeRangeByScore("zset2",2,3));
    System.out.println(template.opsForZSet().range("zset2",0,-1));
结果：[zset-1, zset-2, zset-3,zset-4]
1
[zset-1, zset-2, zset-4]
Long unionAndStore(K key, K otherKey, K destKey);
计算给定的一个有序集的并集，并存储在新的 destKey中，key相同的话会把score值相加
使用：System.out.println(template.opsForZSet().add("zzset1","zset-1",1.0));
        System.out.println(template.opsForZSet().add("zzset1","zset-2",2.0));
        System.out.println(template.opsForZSet().add("zzset1","zset-3",3.0));
        System.out.println(template.opsForZSet().add("zzset1","zset-4",6.0));

        System.out.println(template.opsForZSet().add("zzset2","zset-1",1.0));
        System.out.println(template.opsForZSet().add("zzset2","zset-2",2.0));
        System.out.println(template.opsForZSet().add("zzset2","zset-3",3.0));
        System.out.println(template.opsForZSet().add("zzset2","zset-4",6.0));
        System.out.println(template.opsForZSet().add("zzset2","zset-5",7.0));
        System.out.println(template.opsForZSet().unionAndStore("zzset1","zzset2","destZset11"));

        Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeWithScores("destZset11",0,-1);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-1score:2.0
value:zset-2score:4.0
value:zset-3score:6.0
value:zset-5score:7.0
value:zset-4score:12.0
Long unionAndStore(K key, Collection<K> otherKeys, K destKey);
计算给定的多个有序集的并集，并存储在新的 destKey中
使用：//System.out.println(template.opsForZSet().add("zzset1","zset-1",1.0));
        //System.out.println(template.opsForZSet().add("zzset1","zset-2",2.0));
        //System.out.println(template.opsForZSet().add("zzset1","zset-3",3.0));
        //System.out.println(template.opsForZSet().add("zzset1","zset-4",6.0));
        //
        //System.out.println(template.opsForZSet().add("zzset2","zset-1",1.0));
        //System.out.println(template.opsForZSet().add("zzset2","zset-2",2.0));
        //System.out.println(template.opsForZSet().add("zzset2","zset-3",3.0));
        //System.out.println(template.opsForZSet().add("zzset2","zset-4",6.0));
        //System.out.println(template.opsForZSet().add("zzset2","zset-5",7.0));

        System.out.println(template.opsForZSet().add("zzset3","zset-1",1.0));
        System.out.println(template.opsForZSet().add("zzset3","zset-2",2.0));
        System.out.println(template.opsForZSet().add("zzset3","zset-3",3.0));
        System.out.println(template.opsForZSet().add("zzset3","zset-4",6.0));
        System.out.println(template.opsForZSet().add("zzset3","zset-5",7.0));

        List<String> stringList = new ArrayList<String>();
        stringList.add("zzset2");
        stringList.add("zzset3");
        System.out.println(template.opsForZSet().unionAndStore("zzset1",stringList,"destZset22"));

        Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeWithScores("destZset22",0,-1);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-1score:3.0
value:zset-2score:6.0
value:zset-3score:9.0
value:zset-5score:14.0
value:zset-4score:18.0
Long intersectAndStore(K key, K otherKey, K destKey);
计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
使用：System.out.println(template.opsForZSet().intersectAndStore("zzset1","zzset2","destZset33"));

        Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeWithScores("destZset33",0,-1);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-1score:2.0
value:zset-2score:4.0
value:zset-3score:6.0
value:zset-4score:12.0
Long intersectAndStore(K key, Collection<K> otherKeys, K destKey);
计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
使用：List<String> stringList = new ArrayList<String>();
        stringList.add("zzset2");
        stringList.add("zzset3");
        System.out.println(template.opsForZSet().intersectAndStore("zzset1",stringList,"destZset44"));

        Set<ZSetOperations.TypedTuple<Object>> tuples = template.opsForZSet().rangeWithScores("destZset44",0,-1);
        Iterator<ZSetOperations.TypedTuple<Object>> iterator = tuples.iterator();
        while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple<Object> typedTuple = iterator.next();
            System.out.println("value:" + typedTuple.getValue() + "score:" + typedTuple.getScore());
        }
结果：value:zset-1score:3.0
value:zset-2score:6.0
value:zset-3score:9.0
value:zset-4score:18.0
Cursor<TypedTuple<V>> scan(K key, ScanOptions options);
遍历zset
使用： Cursor<ZSetOperations.TypedTuple<Object>> cursor = template.opsForZSet().scan("zzset1", ScanOptions.NONE);
        while (cursor.hasNext()){
            ZSetOperations.TypedTuple<Object> item = cursor.next();
            System.out.println(item.getValue() + ":" + item.getScore());
        }
结果：zset-1:1.0
zset-2:2.0
zset-3:3.0
zset-4:6.0
注：TimeUnit是java.util.concurrent包下面的一个类，表示给定单元粒度的时间段
常用的颗粒度
TimeUnit.DAYS //天
TimeUnit.HOURS //小时
TimeUnit.MINUTES //分钟
TimeUnit.SECONDS //秒
TimeUnit.MILLISECONDS //毫秒





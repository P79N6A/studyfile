1.思路：'创建'一个'静态Hashtable'用于'保存key和value'
对于'cache过期后的'方法'回调'，在'cache过期后再来访问cache'的时候进行，
'避免'了使用'定时'器'查询过期时间清除cache'，进行cache清除的效率损耗
2.使用synchronize关键字进行多线程同步

包括两个类和一个接口
'cache类:全是静态方法','提供基于key,value,进行cache的添加,修改,访问'
进行cache过期后调用callback方法

'cacheitem类:用于管理每一个条目的cache内容和超时时间回调方法'

ICacheMethod接口：cache到期回调方法需要实现的接口;

//使用jar包ehcache-core做缓存
在spring中使用如下两个jar包支持缓存
spring-context-support-3.2.0.RELEASE.jar
spring-context-3.2.0.RELEASE.jar


1.添加 echcache.xml
将ehcache.xml文件添加到src路径下面。这样就能用classpath访问
<ehcache>
    <diskStore path="java.io.tempdir" />
    <defaultCache maxElementsInMemory="1000" eternal="false"  
    	timeToIdleSeconds="120" timeToLiveSeconds="120" overflowToDisk="true" />
    <cache name="ehcacheName" maxElementsInMemory="10000"  
        eternal="false" timeToIdleSeconds="300000" timeToLiveSeconds="600000"
        overflowToDisk="true" />
</ehcache>

Cache配置中的几个属性： 

name：Cache的名称，必须是唯一的(ehcache会把这个cache放到HashMap里)。 
maxElementsInMemory：内存中保持的对象数量。 
maxElementsOnDisk：DiskStore中保持的对象数量，默认值为0，表示不限制。 
eternal：是否是永恒数据，如果是，则它的超时设置会被忽略。 
overflowToDisk：如果内存中数据数量超过maxElementsInMemory限制，是否要缓存到磁盘上。 
timeToIdleSeconds：对象空闲时间，指对象在多长时间没有被访问就会失效。只对eternal为false的有效。默认值0，表示一直可以访问。 
timeToLiveSeconds：对象存活时间，指对象从创建到失效所需要的时间。只对eternal为false的有效。默认值0，表示一直可以访问。 
diskPersistent：是否在磁盘上持久化。指重启jvm后，数据是否有效。默认为false。 
diskExpiryThreadIntervalSeconds：对象检测线程运行时间间隔。标识对象状态的线程多长时间运行一次。 
diskSpoolBufferSizeMB：DiskStore使用的磁盘大小，默认值30MB。每个cache使用各自的DiskStore。 
memoryStoreEvictionPolicy：如果内存中数据超过内存限制，向磁盘缓存时的策略。默认值LRU，可选FIFO、LFU。 

2.添加spring配置文件
在applicContext.xml文件中添加
<bean id="cacheManagerFactory" 
    class="org.springframework.cache.ehcache.EhCacheManagerFactoryBean"
    p:configLocation="classpath:ehcache.xml">
</bean>
  
<!-- 声明cacheManager -->  
<bean id="cacheManager" class="org.springframework.cache.ehcache.EhCacheCacheManager"   
    p:cacheManager-ref="cacheManagerFactory" >
</bean>

需要去掉<cache:annotation-driven cache-manager="cacheManager" />否则会冲突


3.定义EHCache工具方法
public class EHCache {  
    private static final CacheManager cacheManager = new CacheManager();  
    private Cache cache;  
    public EHCacheService(){  
        this.cache=cacheManager.getCache("ehcacheName")  
    }  
    public Cache getCache() {
        return cache;  
    }
    public void setCache(Cache cache) {
        this.cache = cache;  
    }
	/* 
	 * 通过名称从缓存中获取数据 
	 */
    public Object getCacheElement(String cacheKey) throws Exception {  
            net.sf.ehcache.Element e = cache.get(cacheKey);  
        if (e == null) {  
            return null;  
        }  
        return e.getValue();  
    }  
    /* 
     * 将对象添加到缓存中 
     */  
    public void addToCache(String cacheKey, Object result) throws Exception {  
        Element element = new Element(cacheKey, result);  
        cache.put(element);  
    }  
}  

//测试
public class Test{
    EHCache ehCache = new EHCache();  
    public void Test(){  
        //测试将json对象存入缓存中  
        JSONObject obj = new JSONObject();  
        obj.put("name","lsz");  
        ehCache.addToCache("cache_json",obj);  
  
        //从缓存中获取  
        JSONObject getobj = (JSONObject)ehCache.getCacheElement("cache_json");  
        System.out.println(getobj.toString());  
    }  
}  

ehcache中数据是以java对象的形式存在的，
使用了java的序列化保存到磁盘，
所以保存的对象要实现Serializable接口。ehcache还可以支持分布式缓存。

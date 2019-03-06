package com.zte.pub.common.service;

public interface Cache2Service {
	@Deprecated
	public final static String CACHE_PREFIX = "_NUD";// 本标志过期不再使用
	public final static String MEMCACHE_PREFIX = "_MEM";// 新MEMCACHE缓存KEY前缀

	/**
	 * 
	 * 把对象放入缓存，如果对象已存在则替换
	 * 
	 * @param key
	 *            键
	 * @param val
	 *            要缓存的对象，须实现java.io.Serializable接口
	 */
	void put(String key, Object val);

	/**
	 * 
	 * 把对象放入缓存，如果对象已存在则替换
	 * 
	 * @param key
	 *            键
	 * @param val
	 *            要缓存的对象，须实现java.io.Serializable接口
	 * @param exp
	 *            缓存过期时间，单位：毫秒
	 */
	void put(String key, Object val, Integer exp);

	/**
	 * 
	 * 获取缓存对象
	 * 
	 * @param key
	 *            键
	 * @return 缓存对象
	 */
	Object get(String key);

	/**
	 * 
	 * 获取缓存对象,并刷新对象
	 * 
	 * @param key
	 *            键
	 * @param refreshPeriod
	 *            刷新周期，即refreshPeriod 毫秒后对象失效。
	 * @return 缓存对象
	 */
	Object get(String key, Integer refreshPeriod);

	/**
	 * 
	 * 根据键删除缓存对象
	 * 
	 * @param key
	 *            键
	 */
	void remove(String key);
}

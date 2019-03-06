package com.zte.pub.common.internal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import bee.base.ioc.annotation.Inject;
import bee.base.ioc.annotation.ServiceLocator;
import bee.base.service.BaseService;
import bee.besta.cache.service.CacheService;

import com.zte.pub.common.constant.ServiceType;
import com.zte.pub.common.service.Cache2Service;

public class Cache2ServiceImpl implements Cache2Service {
	final Logger logger = LoggerFactory.getLogger(Cache2ServiceImpl.class);

	public final static String NAMESPACE_SESSION = "CACHE";

	@Inject
	private BaseService baseService;

	@Inject
	@ServiceLocator(ServiceType.OSGI)
	CacheService cacheService;

	@Override
	public void put(String key, Object val) {
		if (!key.startsWith(MEMCACHE_PREFIX)) {
			cacheService.getLocalCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).put(key, val);
		} else {
			try {
				cacheService.getDistributedCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).put(key, val);
			} catch (Exception ex) {
				logger.error("memcache调用异常", ex);
			}
		}
	}

	@Override
	public void put(String key, Object val, Integer exp) {
		if (!key.startsWith(MEMCACHE_PREFIX)) {
			cacheService.getLocalCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).put(key, val, exp / 1000);
		} else {
			try {
				cacheService.getDistributedCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).put(key, val,
						exp / 1000);
			} catch (Exception ex) {
				logger.error("memcache调用异常", ex);
			}
		}
	}

	@Override
	public Object get(String key) {
		if (!key.startsWith(MEMCACHE_PREFIX)) {
			return cacheService.getLocalCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).get(key);
		} else {
			try {
				return cacheService.getDistributedCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).get(key);// ,this.getClass().getClassLoader()
			} catch (Exception ex) {
				logger.error("memcache调用异常", ex);
				return null;
			}
		}
	}

	@Override
	public Object get(String key, Integer refreshPeriod) {
		if (!key.startsWith(MEMCACHE_PREFIX)) {
			return cacheService.getLocalCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).get(key,
					refreshPeriod / 1000);
		} else {
			try {
				return cacheService.getDistributedCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).get(key,
						refreshPeriod / 1000);
			} catch (Exception ex) {
				logger.error("memcache调用异常", ex);
				return null;
			}
		}
	}

	@Override
	public void remove(String key) {
		if (!key.startsWith(MEMCACHE_PREFIX)) {
			cacheService.getLocalCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).remove(key);
		} else {
			try {
				cacheService.getDistributedCacheManager(baseService.getNamespace(NAMESPACE_SESSION)).remove(key);
			} catch (Exception ex) {
				logger.error("memcache调用异常", ex);
			}
		}
	}

}

package com.xgd.risk.web.common.db;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * 
 * @author dengzs
 * Create at: 2017年1月11日 上午11:15:06   
 * Description:多数据源切换 
 */
public class DynamicDataSource extends AbstractRoutingDataSource {

	
	private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>(); 
	 
	
	/**
	 * 
	 * @return  the currentLookupKey 
	 */
    public static String getCurrentLookupKey() {    
        return (String) contextHolder.get();    
    }      
	
    
    /**
     * 
     * @param currentLookupKey
     */
    public static void setCurrentLookupKey(String currentLookupKey) {    
        contextHolder.set(currentLookupKey);    
    } 
    
    
	@Override
	protected Object determineCurrentLookupKey() {
		return getCurrentLookupKey();
	}

}

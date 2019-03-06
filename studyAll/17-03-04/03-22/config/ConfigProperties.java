package com.xgd.risk.web.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigProperties {

	private static final Logger log = LoggerFactory.getLogger(ConfigProperties.class);
	
	private static final Map<String,String> config = new HashMap<String,String>();
	
	private static Properties prop = null;
	
	private static String fileName = "http.properties";
	
	private static String hbaseFileName = "hbase.properties";
	
	/**
	 * 初始化
	 */
	static {
		try {
			init("config/"+fileName,fileName);	
			init("config/"+hbaseFileName,hbaseFileName);	
			
		} catch (Exception ex) {
			log.error("初始化配置文件失败.",ex);
		}
	}
	
	/**
	 * 初始化属性配置方法
	 * @param relativePath
	 * @return
	 * @throws Exception
	 */
	private static void init(String relativePath,String indexFileName) throws Exception {
		Properties props = new Properties();
		URL url = Thread.currentThread().getContextClassLoader().getResource(relativePath);
		if(url == null) {
			throw new FileNotFoundException(relativePath);			
		}
		props.load(new FileInputStream(new File(url.toURI())));
		prop = props;
		Iterator<?> iter = props.keySet().iterator();
		while(iter.hasNext()) {
			String key = (String) iter.next();
			Object value = props.get(key);
			if(value == null) {
				log.error("文件"+ indexFileName +"无此属性:"+key+",请检查配置!");
			}
			config.put(key, String.valueOf(value));
		}
		
		if(log.isInfoEnabled()){
			log.info("prop:"+props.toString());
		}
	}
	
	public static Properties getProperties(){
		return prop;
	}
	
	/**
	 * 获取属性
	 * @param key
	 * @return String
	 */
	public static String get(String key) {
		String value = config.get(key);
		if(StringUtils.isBlank(value)) {
			return null;
		}
		return value.trim();
	}
	
	/**
	 * 获取属性
	 * @param key
	 * @return String
	 */
	public static String get(String key, String defaultValue) {
		String value = config.get(key);
		if(StringUtils.isBlank(value)) {
			return defaultValue;
		}
		return value.trim();
	}
	
	/**
	 * 获取属性.整型值
	 * @param key
	 * @return int 
	 */
	public static int getInt(String key) {
		String value = config.get(key);
		if(StringUtils.isNotBlank(value)) {
			return Integer.valueOf(value);
		}
		return 0;
	}
	
	/**
	 * 获取属性.整型值
	 * @param key
	 * @return int 
	 */
	public static int getInt(String key, int defaultValue) {
		String value = config.get(key);
		if(StringUtils.isNotBlank(value)) {
			return Integer.valueOf(value);
		}
		return defaultValue;
	}

}

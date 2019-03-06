package com.xgd.risk.web.utils;

import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class PropertiesUtil{

	private static final Logger log = LoggerFactory.getLogger(PropertiesUtil.class);
	
	private List<String> locations;
	public Properties props;
	
	public PropertiesUtil(List<String> locations) {
		this.locations = locations;
		props = new Properties();
		if(locations != null && locations.size() > 0){
			for (String path : locations) {
				try {
					copyProp(props, readProp(path));
				} catch (Exception e) {
					if(log.isErrorEnabled()) {
						log.error("PropertiesUtil", e);
					}
				}
			}
		}
	}

	private void copyProp(Properties rootProp,Properties subProp){
		Iterator<Object> iter = subProp.keySet().iterator();
		while (iter.hasNext()) {
			String key = (String) iter.next();
			rootProp.setProperty(key, subProp.getProperty(key));
		}
	}
	
	private Properties readProp(String classPathLocation) throws Exception{
		if(log.isInfoEnabled()) {
			log.info("PropertiesUtil| msg=Loading properties file from class path resource: "+classPathLocation);
		}
		Properties prop = new Properties();
		InputStream in = PropertiesUtil.class.getResourceAsStream("/"+classPathLocation);
		prop.load(in);
		in.close();
		return prop;
	}
	
	public List<String> getLocations() {
		return locations;
	}

	public void setLocations(List<String> locations) {
		this.locations = locations;
	}
	
}

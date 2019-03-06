package com.zte.ecc.secret.utils;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 
 * @author ÂÞÉ­
 * @date 2016/07/06
 * 
 */
public class PropUtils {

	public static final String filePath = "key.conf";

	private static PropUtils propUtil = null;

	public static PropUtils getInstance() {
		if (propUtil == null) {
			propUtil = new PropUtils();
		}
		return propUtil;
	}

	public String readValue(String key) {
		Properties props = new Properties();
		try {
			InputStream in = PropUtils.class.getResourceAsStream(filePath);
			props.load(in);
			String value = props.getProperty(key);
			in.close();  
			return value;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Map<String, String> readProperties() {
		Properties props = new Properties();
		Map<String, String> map = new HashMap<String, String>();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(filePath));
			props.load(in);
			Enumeration<?> en = props.propertyNames();
			while (en.hasMoreElements()) {
				String key = (String) en.nextElement();
				String value = props.getProperty(key);
				map.put(key, value);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	public void writeProperties(String key, String value) {
		Properties prop = new Properties();
		try {
			InputStream fis = new FileInputStream(filePath);
			prop.load(fis);
			OutputStream fos = new FileOutputStream(filePath);
			prop.setProperty(key, value);
			prop.store(fos, "Update '" + key + "' value");
		} catch (IOException e) {
			System.err.println("Visit " + filePath + " for updating " + key
					+ " value error");
		}
	}

	/*public static void main(String[] args) {
		String value = PropUtils.getInstance().readValue("MSMS.Secret");
		System.out.println(value);
	}*/
}

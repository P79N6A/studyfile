package com.zte.ecc.secret.utils;
 

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
/**
 * spring
 * @author ÂÞÉ­
 *
 */
public class SpringUtils {
	private static ApplicationContext ac =null;
	private static ApplicationContext getContext(){
		if(ac==null){
			ac=new ClassPathXmlApplicationContext("applicationContext.xml");
		}
		return ac;
	}
	public static Object getBean(String name){
		return getContext().getBean(name);
	}
}
	
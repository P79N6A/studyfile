package com.xgd.risk.web.utils;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 
 * @author dengzs
 * Create at: 2017年1月3日 下午7:20:48   
 * Description:ip工具类
 */
public class LocalIPUtil {

	private static final Logger log = LoggerFactory.getLogger(LocalIPUtil.class);
	
	/**
	 * 获取当前机器ip:可解决多网卡：vpn
	 * @return
	 */
	public static String getLocalIp(){
		
		String indexIp = "";
		
		Enumeration<NetworkInterface> e = null;
		try {
			e = NetworkInterface.getNetworkInterfaces();
		} catch (SocketException e1) {
			e1.printStackTrace();
		}
		while(e.hasMoreElements())
		{
			NetworkInterface intf = e.nextElement();
			for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
	               InetAddress inetAddress = enumIpAddr.nextElement();
	               //只有一个
	               indexIp = inetAddress.getHostAddress().toString();
			}
			
		}
		
		if(log.isInfoEnabled()){
			log.info("------------------- local ip is 【"+ indexIp +"】 -------------------");
		}
		
		return indexIp;
	}
}

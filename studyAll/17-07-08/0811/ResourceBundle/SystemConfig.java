/**
 * 
 */
package com.ve.api.config;

import java.util.ResourceBundle;

/**
 * @author 研发中心-孙尉凯
 * @date 2017年6月6日 下午7:39:25
 */
public class SystemConfig {
	
	private static final ResourceBundle rb = ResourceBundle.getBundle("system");
	
	/**
	 * 获取文件服务器的根路径
	 * @return
	 * @author: 研发部-孙尉凯
	 */
	public static String getFileSystemUrl(){
		return rb.getString("filesystem.service.url");
	}
	
	/**
	 * 获取上传文件的url
	 * @return
	 * @author: 研发部-孙尉凯
	 */
	public static String getUploadFileUrl(){
		return getFileSystemUrl() + rb.getString("filesystem.upload.uri");
	}
	
	/**
	 * 获取查看文件的url
	 * @return
	 * @author: 研发部-孙尉凯
	 */
	public static String getLinkFileUrl(){
		return getFileSystemUrl() + rb.getString("filesystem.link.uri");
	}
	
	/**
	 * 获取删除文件的url
	 * @return
	 * @author: 研发部-孙尉凯
	 */
	public static String getDeleteFileUrl(){
		return getFileSystemUrl() + rb.getString("filesystem.delete.uri");
	}
	
	/**
	 * 获取登陆最长有效期
	 * @return
	 * @author: 研发部-孙尉凯
	 */
	public static long getLoginValidTime(){
		return Long.parseLong(rb.getString("login.valid.time"));
	}

}

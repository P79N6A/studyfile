package com.xgd.risk.web.utils;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 反洗钱上传文件路径
 * 
 * @author dengzs 
 * Create at: 2016年12月23日 下午5:30:49 
 * Description:创建上传文件目录:
 */
public class UploadFileUtil {

	private static final Logger log = LoggerFactory
			.getLogger(UploadFileUtil.class);

	/**
	 * 上传目录：默认upoad
	 * 
	 * @param request
	 */
	public static String createUpload(HttpServletRequest request) {

		try {
			// 若upload不存在，则新增文件夹
			String webPath = System.getProperty("user.dir").replace("bin", "webapps");
			String uploadPath = webPath + File.separator + "upload";
			
			if (log.isInfoEnabled()) {
				log.info("---------  into UploadFileUtil:createUpload(uploadPath:"
						+ uploadPath + ") function  ---------");
			}

			File uploadFile = new File(uploadPath);
			if (!(uploadFile.isDirectory())) {
				uploadFile.mkdir();
			}

			if (log.isInfoEnabled()) {
				log.info("--------- upload file created success!!  ---------");
			}

			return uploadPath;

		} catch (Exception e) {
			e.printStackTrace();

			if (log.isInfoEnabled()) {
				log.error("--------- upload file created failure  ---------"
						+ e.toString());
			}
		}

		return null;
	}

}

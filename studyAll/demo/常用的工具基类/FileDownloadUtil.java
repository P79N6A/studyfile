package com.zte.ecc.secret.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @author 罗森
 * @date 2016/07/06
 *
 */
public class FileDownloadUtil {

	public synchronized static FileDownloadUtil getInstance() {
		return new FileDownloadUtil();
	}

 
	public void exportExcel(HttpServletResponse response, String fileName) throws IOException {
		String ss = "";
		if (fileName.indexOf("/") != -1) {
			ss = "/";
		}
		if (fileName.indexOf("\\") != -1) {
			ss = "\\" + "\\";
		}

		String[] names = fileName.split(ss);
		String originalName = names[names.length - 1];
		this.downloadFile(response, fileName, originalName);
	}

	public void downloadFile(HttpServletResponse response, String realPath, String originalName) throws IOException {
		originalName = URLEncoder.encode(originalName, "UTF-8");
		FileInputStream fis = null;
		fis = new FileInputStream(realPath);
		BufferedInputStream bis = new BufferedInputStream(fis);

		response.setCharacterEncoding("UTF-8");
		response.setContentType("APPLICATION/OCTET-STREAM");
		response.setHeader("Content-Disposition", "attachment; filename=" + originalName);
		OutputStream os = response.getOutputStream();
		BufferedOutputStream bos = new BufferedOutputStream(os);
		byte[] cbuf = new byte[1024];
		int len = 0;
		while ((len = bis.read(cbuf)) != -1) {
			bos.write(cbuf,0,len);
		}
		bos.flush();
		try {
			bos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			bis.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

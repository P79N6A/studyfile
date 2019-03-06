package com.zycx.udream.util;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class PicUtil {
	/**
	 * 判断文件是否为图片 	返回null则不为图片，反之是图片
	 * @param f 参数必须指定具体的路径和文件名  
	 * @return
	 */
	public static String getFormatName(File f) {
		try {
			// 在图像上创建图像输入流
			ImageInputStream iis = ImageIO.createImageInputStream(f);
			// 查找识别图像格式的图像读取器
			Iterator<ImageReader> iter = ImageIO.getImageReaders(iis);
			if (!iter.hasNext()) {
				// 没有输出流
				return null;
			}
			// 使用第一个输出流
			ImageReader reader = iter.next();
			// 关闭流
			iis.close();
			// 返回格式后的名字
			return reader.getFormatName();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 文件不可读
		return null;
	}
}

package com.zte.ecc.secret.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;
/**
 * 
 * @author 罗森
 * @date 2016/07/06
 *
 */
public class ImageUtil {

    private static String[] expHeader = new String[] { "data:image/jpg;base64,", "data:image/jpeg;base64,",
            "data:image/png;base64,", "data:image/bmp;base64," };

 
    public static boolean GenerateImage(String base64Img, String path, String imgName) {

        if (base64Img == null) {
            return false;
        }
        for (int i = 0; i < expHeader.length; i++) {
            if (base64Img.contains(expHeader[i])) {
                base64Img = base64Img.replace(expHeader[i], "");
            }
        }

        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(base64Img);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) { 
                    b[i] += 256;
                }
            }
            File file = new File(path);
            if (!file.exists()) {
                file.mkdirs();
            }
            OutputStream out = new FileOutputStream(path + imgName);
            out.write(b);
            out.flush();
            out.close();

            return true;
        } catch (Exception e) {
            return false;
        }
    }
 
    public static String GetImageStr(String imgFilePath) {

        InputStream in = null;
        byte[] data = null;
 
        try {
            in = new FileInputStream(imgFilePath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
 
        BASE64Encoder encoder = new BASE64Encoder();

        return encoder.encode(data); 
    }

}

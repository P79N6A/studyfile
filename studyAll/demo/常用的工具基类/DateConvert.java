package com.zte.ecc.secret.utils;

import java.text.SimpleDateFormat;

import org.apache.commons.beanutils.Converter;
/**
 * 
 * @author ÂÞÉ­
 * @date 2016/07/06
 *
 */
public class DateConvert implements Converter {

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Object convert(Class arg0, Object arg1) {
        String p = (String) arg1;
        if (p == null || p.trim().length() == 0) {
            return null;
        }
        p = p.trim();
        try {
            SimpleDateFormat df = null;
            if (p.length() == 10) {
                df = new SimpleDateFormat("yyyy-MM-dd");
            } else if (p.length() == 19) {
                df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            }
            return df.parse(p.trim());
        } catch (Exception e) {
            return null;
        }
    }
}

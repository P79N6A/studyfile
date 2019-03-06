package com.zte.ecc.secret.utils;

import java.util.Locale;
import java.util.ResourceBundle;
/**
 * 
 * @author 罗森
 * @date 2016/07/06
 *
 */
public class PropertyUtil {
 
    private final static String PROPERTIES_FILE_NAME = "config/common";

 
    public static String getValue(String key) {

        ResourceBundle bundle = ResourceBundle.getBundle(PROPERTIES_FILE_NAME, Locale.getDefault());

        return bundle.getString(key);
    }

 
    public static String getValue(String key, String fileName) {

        ResourceBundle bundle = ResourceBundle.getBundle(fileName, Locale.getDefault());

        return bundle.getString(key);
    }

 
    public static String getValue(String key, String fileName, Locale locale) {

        ResourceBundle bundle = ResourceBundle.getBundle(fileName, locale);

        return bundle.getString(key);
    }
 
    public static String getValueByParam(String key, String... params) {

        String value = getValue(key);
 
        if (params != null && params.length > 0) {
            for (int i = 0; i < params.length; i++) {
                value = value.replace("{" + i + "}", params[i]);
            }
        }

        return value;
    }

}

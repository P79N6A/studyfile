package com.zte.ecc.secret.utils;
import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.ConvertUtils;

/**
 * 
 * @author 罗森
 * @date 2016/07/06
 *
 */
public class BeanUtils extends org.apache.commons.beanutils.BeanUtils {

    static {
        ConvertUtils.register(new DateConvert(), java.util.Date.class);
        ConvertUtils.register(new DateConvert(), java.sql.Date.class);
 
    }

    public static void copyProperties(Object dest, Object orig) {
        try {
            org.apache.commons.beanutils.BeanUtils.copyProperties(dest, orig);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

}

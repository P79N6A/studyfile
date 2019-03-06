package com.zte.ecc.secret.utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONObject;
/**
 * 
 * @author 罗森
 * @date 2016/07/06
 *
 */
public class CommonUtil {

   
    /**
     * 
     * json杞琺ap
     * 
     * @author 罗森
     * @add_date: 2016/5/24
     * 
     * 
     * @param jsonStr
     * @return
     */
    public static Map<String, Object> jsonStr2Map(String jsonStr) {
        Map<String, Object> result = new HashMap<String, Object>();
        JSONObject jsonObj = JSONObject.fromObject(jsonStr);
        Iterator<?> keys = jsonObj.keys();
        String key;
        Object val;
        while (keys.hasNext()) {
            key = (String) keys.next();
            val = jsonObj.get(key);
            result.put(key, val);
        }
        return result;
    }
}

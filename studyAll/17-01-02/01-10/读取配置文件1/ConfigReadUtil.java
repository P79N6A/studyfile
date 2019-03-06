package com.zte.pub.common.util.besta;

import java.util.Properties;

import bee.base.service.BaseService;
import bee.base.service.Namespace;

public class ConfigReadUtil {
    
    private static BaseService baseService;
    
    public static void setBaseService(BaseService baseService) {
        ConfigReadUtil.baseService = baseService;
    }
    
    public static Namespace getNamespace(String name) {
        Namespace ns = baseService.getNamespace(name);
        return ns;
    }
    
    public static String getLovConfigAsProperties(String configKey) {
        Properties pro = getNamespace("lov").getConfigAsProperties("HqlConfig");
        return pro.getProperty(configKey);
    }
    
    public static String getUIConfigAsProperties(String configKey) {
        Properties pro = getNamespace("ui").getConfigAsProperties("ContextConfig");
        return pro.getProperty(configKey);
    }
    
    public static String getSelectConfigAsProperties(String configKey) {
        Properties pro = getNamespace("select").getConfigAsProperties("HqlConfig");
        return pro.getProperty(configKey);
    }
    
    /**
     * 获取wsdl配置参数的文件
     * @param configKey
     * @return
     */
    public static String getWsdlParamAsProperties(String configKey)
    {
        Properties pro = getNamespace("wsdl").getConfigAsProperties("ParamConfig");
        return pro.getProperty(configKey);
    }

    /**
     * 文件上传相关配置
     * @param configKey
     * @return
     */
    public static String getUploadConfigAsProperties(String configKey) {
        Properties pro = getNamespace("upload").getConfigAsProperties("Config");         //在upload.Config.properties文件中读取信息
        return pro.getProperty(configKey);
    }
}

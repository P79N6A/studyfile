以下配置全在服务方：
/*创建 dubbo应用*/
<dubbo:application name="biz_module-provider" />
/*registry 配置注册表*/
<dubbo:registry protocol="zookeeper" address="udream.zk:2181" />
/*service 配置服务*/
<dubbo:service interface="com.zycx.udream.service.BusinessUserService"
	ref="businessUserService" version="test_server" />


以下配置全在应用方：
/*reference 参考*/
<dubbo:reference id="businessUserService" interface="com.zycx.udream.service.BusinessUserService"
	check="false" version="test_server"  />
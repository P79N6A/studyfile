'可以分散配置xml文件，在主文件引入进来就可以了'
例如可以把数据库连接文件拆出来，写在db.properties
在主文件的<context:property-placeholder location="classpath:db.properties"/>引入
<bean id="dataSour" class="">
	//调用时用如下通配符${}
	<property name="url"><value>${db.url}</value></property>
</bean>

'注意'spring只允许定义一个property-placeholder元素，引入多个方法如下
<context:property-placeholder location="classpath:db.properties,classpath:db2.properties"/>
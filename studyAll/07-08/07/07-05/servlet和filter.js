//filter用于将指定url的请求拦截下来，做出相应的处理
<!-- 定义Filter -->
<filter>
	<!-- Filter的名字 -->
	<filter-name>log</filter-name>
	<!-- Filter的实现类 -->
	<filter-class>lee.LogFilter</filter-class>
</filter>

<!-- 定义Filter拦截的URL地址 -->
<filter-mapping>
	<!-- Filter的名字 -->
	<filter-name>log</filter-name>
	<!-- Filter负责拦截的URL 全部以/的请求,如果<url-pattern>/*.action</url-pattern>,将会以拦截*.action的请求 -->
	<url-pattern>/*</url-pattern>
</filter-mapping>

//servlet也是将相应的url拦截下来，做出处理
<servlet>
	//servlet名称
	<servlet-name>action</servlet-name>
	//servlet对应的类
	<servlet-class>
		org.apache.struts.action.ActionServlet
	</servlet-class>
	//servlet对应的参数
	<init-param>
		<param-name>application</param-name>
		<param-value>com.zte.ecc.ApplicationResources</param-value>
	</init-param>
</servlet>

//指定servlet拦截的url
<servlet-mapping>
	//用于拦截的名称
	<servlet-name>action</servlet-name>
	//用于拦截的url
	<url-pattern>*.do</url-pattern>
</servlet-mapping>
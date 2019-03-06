's'
<mvc:annotation-driven/>
注解意义：自动注册DefaultAnnotationHandlerMapping
与AnnotationMethodHandlerAdapter
声明（开启）的注解驱动MVC控制器（即@RequestMapping，@Controller等）的明确支持

<context:component-scan base-package="x.x.web">
声明（开启）一般注释 @Required, @Autowired, @PostConstruct 等等

InternalResourceViewResolver：视图解析器。
通过配置使得控制器返回jstl
<bean class="InternalResourceViewResolver">  
	<property name="prefix" value="/WEB_INF/jsp"/>
	<property name="suffix" value=".jsp">
</bean>


springMVC页面跳转实例
首先在web.xml加入

//servlet是web程序的入口
//servlet配置
<servlet>
	<servlet-name>springMVC</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<load-on-startup>1</load-on-startup>
</servlet>

//servlet-mapping元素在servlet和url之间定义一个映射
//当servlet收到请求，它先确定该请求由哪一个程序来响应，映射到servlet的路径是请求uri减去上下文的路径web应用的Context在去掉uri的
<servlet-mapping>
	//必须是servlet中声明过的servlet
	<servlet-name>springmvc</servlet-name>
	这个表示springMVC是默认的Servlet
	<url-pattern>/</url-pattern>
</servlet-mapping>




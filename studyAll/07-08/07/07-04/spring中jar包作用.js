spring3.2.9
（1）spring-aop-3.2.9.RELEASE.jar
包含使用springAOP所需的类。使用基于AOP的spring特性，
声明型事务管理（Declarative Transaction Management）
'spring的面向切面编程，提供AOP（面向切面编程）实现。'

（2）spring-aspects-3.2.9.RELEASE.jar
'Spring整合了aspectjrt.jar'，也可以使用aspectjrt.jar来代替。

（3）spring-beans-3.2.9.RELEASE.jar
'SpringIOC（依赖注入）的基础实现，所有应用都要用到的'，它包含'访问配置文件'、
'创建和管理bean'以及进行Inversion of Control / Dependency Injection（IoC/DI）
操作相关的所有类。

（4）spring-build-src-3.2.9.RELEASE.jar

（5）spring-context-3.2.9.RELEASE.jar
spring 提供'在基础 IoC 功能上的扩展服务'，此外还提供'许多企业级服务的支持'，
如 '邮件服务、任务调度、JNDI定位、EJB 集成、远程访问'、
'缓存以及各种视图层框架的封装等'。

（6）spring-context-support-3.2.9.RELEASE.jar
'spring-context 的扩展支持'，包含'支持缓存Cache（ehcache）、JCA、JMX、邮件服务（Java Mail、COS Mail）'、
任务计划Scheduling（Timer、Quartz）方面的类。

（7）spring-core-3.2.9.RELEASE.jar
包含'Spring框架基本的核心工具类'，Spring其它组件要都要使用到这个包里的类，是其它组件的基本核心。

（8） spring-expression-3.2.9.RELEASE.jar
 'spring 表达式语言'。

（9） spring-framework-bom-3.2.9.RELEASE.jar

（10） spring-instrument-3.2.9.RELEASE.jar
'spring3.2.9 对服务器的代理接口'。

（11） spring-instrument-tomcat-3.2.9.RELEASE.jar
spring3.2.9 对 Tomcat 的连接池的集成。

（12） spring-jdbc-3.2.9.RELEASE.jar
包含对Spring对JDBC数据访问进行封装的所有类。

（13） spring-jms-3.2.9.RELEASE.jar
提供了对JMS 1.0.2/1.1的支持类。

（14） spring-orm-3.2.9.RELEASE.jar
'包含Spring对DAO特性集进行了扩展，使其支持 iBATIS、JDO、OJB、TopLink'，因为Hibernate已经独立成包了，
现在不包含在这个包里了。这个jar文件里'大部分的类都要依赖spring-dao.jar里的类'，
用这个包时你需要同时包含spring-dao.jar包 。

（15） spring-oxm-3.2.9.RELEASE.jar
spring 对Object/XMI 的映射的支持，可以让JAVA与XML之间来回切换。

（16） spring-struts-3.2.9.RELEASE.jar
 整合 Struts 的支持。

（17） spring-test-3.2.9.RELEASE.jar
spring 对Junit 等测试框架的简单封装。

（18） spring-tx-3.2.9.RELEASE.jar
 为JDBC、Hibernate、JDO、JPA等提供的一致的声明式和编程式事务管理。

（19）spring-web-3.2.9.RELEASE.jar
包含Web应用开发时，用到Spring框架时所需的核心类，包括自动载入WebApplicationContext特性的类、Struts与JSF集成类、
文件上传的支持类、Filter类和大量工具辅助类。

（20） spring-webmvc-3.2.9.RELEASE.jar
这个jar文件包含Spring MVC框架相关的所有类。包含国际化、标签、Theme、
视图展现的FreeMarker、JasperReports、Tiles、Velocity、 XSLT相关类。
当然，如果你的应用使用了独立的MVC框架，则无需这个JAR文件里的任何类。

（21） spring-webmvc-portlet-3.2.9.RELEASE.jar
springMVC 的增强，支持portlet标准（JSR168/JSR286）。

如何选择jar包，除了要了解每个jar的用途以外，还要了解jar包与jar包之间的依赖关系。有些jar包是其它jar包的基础，而有些jar则需要依赖于其它jar包才能工作。那么Spring里jar包是怎样一个依赖关系呢？

1) spring-core.jar依赖commons-collections.jar。

2) spring-beans.jar依赖spring-core.jar，cglib-nodep-2.1_3.jar

3) spring-aop.jar依赖spring-core.jar，spring-beans.jar，cglib-nodep-2.1_3.jar，aopalliance.jar

4) spring-context.jar依赖spring-core.jar，spring-beans.jar，spring-aop.jar，commons-collections.jar，aopalliance.jar

5) spring-dao.jar依赖spring-core.jar，spring-beans.jar，spring-aop.jar，spring-context.jar

6) spring-jdbc.jar依赖spring-core.jar，spring-beans.jar，spring-dao.jar

7) spring-web.jar依赖spring-core.jar，spring-beans.jar，spring-context.jar

8) spring-webmvc.jar依赖spring-core.jar/spring-beans.jar/spring-context.jar/spring-web.jar

9) spring -hibernate.jar依赖spring-core.jar，spring-beans.jar，spring-aop.jar，spring- dao.jar，spring-jdbc.jar，spring-orm.jar，spring-web.jar，spring-webmvc.jar

10) spring-orm.jar依赖spring-core.jar，spring-beans.jar，spring-aop.jar，spring- dao.jar，spring-jdbc.jar，spring-web.jar，spring-webmvc.jar

11) spring -remoting.jar依赖spring-core.jar，spring-beans.jar，spring-aop.jar，spring- dao.jar，spring-context.jar，spring-web.jar，spring-webmvc.jar

12) spring-support.jar依赖spring-core.jar，spring-beans.jar，spring-aop.jar，spring-dao.jar，spring-context.jar，spring-jdbc.jar

13) spring-mock.jar依赖spring-core.jar，spring-beans.jar，spring-dao.jar，spring-context.jar，spring-jdbc.jar 

spring-core.jar是spring的核心包，其它所有jar包都依赖于它。
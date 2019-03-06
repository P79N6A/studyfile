Hibernate一共包括了23个jar包：hibernate2.jar和lib目录下有22个jar包

必须篇：
1.hibernate2.jar: Hibernate的库
2.cglib-asm.jar:'CGLIB库'，Hibernate用它来实现PO字节码的动态生成，非常核心的库
3.dom4j.jar: 'dom4j'是一个Java的XML API，类似于jdom，用来读写XML文件的。
4.odmg.jar: 'ODMG'是一个ORM的规范，Hibernate实现了ODMG规范
5.commons-collections.jar： 
	'Apache Commons'包中的一个，包含了一些Apache开发的集合类，功能比java.util.*强大
6.commons-beanutils.jar： 'Apache Commons'包中的一个，包含了一些Bean工具类。
7.commons-lang.jar: 
	'Apache Commons'包中的一个，包含了一些数据类型工具类，是java.lang.*的扩展。
8.commons-logging.jar: 
	'Apache Commons'包中的一个，包含了日志功能

可选篇：
9.ant.jar: 'Ant'编译工具的jar包，用来编译Hibernate源代码的。
10.optional.jar： 'Ant'的一个辅助包。
11.c3po.jar： 'C3PO'是一个数据库连接池，Hibernate可以配置为使用C3PO连接池。
12.proxool.jar： 也是一个连接池
13.commons-pool.jar, 
14.commons-dbcp.jar: 
	'DBCP'数据库连接池，Apache的Jakarta组织开发的，Tomcat4的连接池也是DBCP。 
	如果在EJB中使用Hibernate，一定要用App Server的连接池，不要用以上3种连接池，否则容器管理事务不起作用
15.connector.jar: （多余）
	JCA 规范，如果你在App Server上把Hibernate配置为Connector的话，就需要这个jar
16.jaas.jar: （多余）
	JAAS是用来进行权限验证的
17.jcs.jar：如果你准备在Hibernate中使用JCS的话，那么必须包括它   //做缓存的
18.jdbc2_0-stdext.jar:（多余）
19.jta.jar：//事物管理
20.junit.jar

21. xalan.jar,
22. xerces.jar,
23. xml-apis.jar:Xerces是XML解析器，Xalan是格式化器，xml-apis实际上是JAXP

描述'jndi'，如'获取数据源'，jndi地址有两种写法，例如jndi/testDS数据源
A：java: comp/env/jdbc/testDS
B：jdbc/testDS
两种写法配置方式不同'A是利用程序移植或迁移'的方法'B是硬引用'
java: comp/env是'环境上下文'，是在ejb规范1.1之后引入的，为了提高移植性
JDBC 数据源引用在java: comp/env/jdbc 子上下文中声明 
JMS 连接工厂在java: comp/env/jms 子上下文中声明 
JavaMail 连接工厂在java: comp/env/mail 子上下文中声明 
URL 连接工厂在 java:comp/env/url子上下文中声明

A: java: comp/env/jdbc/testDS(虚地址)   ------>    映射描述符   ------>  jdbc/testDS (实际的地址)
B: jdbc/testDS (实际的地址)
A通过映射来对接实际地址，便于移植

获取datasource，例如：dataSource = (DataSource) ctx.lookup("java:comp/env/jdbc/testDS");
 
在web.xml中,
<resource-ref>
  <res-ref-name>jdbc/testDS</res-ref-name>
  <res-type>javax.sql.DataSource</res-type>
  <res-auth>Container</res-auth>
</resource-ref>

资源配置xml中（不同的应用服务器均不同，WSAD中，可以进行可视化的设置），
<reference-descriptor>
  <resource-description>
    <res-ref-name>jdbc/testDS</res-ref-name>
    <jndi-name>OraDataSource</jndi-name>
  </resource-description>
</reference-descriptor>
实际服务器中的JNDI名字是OraDataSource，逻辑名jdbc/DBPool只是用来和它作映射的，这样做的好处是为了提高可移植性，
移植的时候只需要把配置文件改一下就可以，而应用程序可不用改动。

java: comp/env和JNDI是不同的
java: comp/env是环境命名上下文
(environment naming context(ENC)
引入这个是为了解决原来JNDI查找所引起的冲突问题。

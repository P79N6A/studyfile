
 2017-10-12 18:33:54.468 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-38] INFO  c.v.a.i.SpringSecurityInterceptor -当前客户端版本: 1.0.0.20170821, 访问的url为: /api/veAssociatorCard/cardList, 要除去的url为: []
 2017-10-12 18:33:54.468 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-44] INFO  c.v.a.i.SpringSecurityInterceptor -当前客户端版本: 1.0.0.20170821, 访问的url为: /api/associator/selectVenueUser, 要除去的url为: []
 2017-10-12 18:33:54.485 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-44] WARN  o.e.j.s.ServletHandler -
org.springframework.web.util.NestedServletException: Request processing failed; nested exception is java.lang.RuntimeException: org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:75)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:371)
	at com.sun.proxy.$Proxy20.selectList(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:198)
	at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:119)
	at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:63)
	at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:52)
	at com.sun.proxy.$Proxy33.selectVenueUser(Unknown Source)
	at com.ve.venue.service.impl.AssociatorServiceImpl.selectVenueUser(AssociatorServiceImpl.java:535)
	at sun.reflect.GeneratedMethodAccessor372.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:98)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:266)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:95)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:207)
	at com.sun.proxy.$Proxy46.selectVenueUser(Unknown Source)
	at com.ve.venue.service.proxy.AssociatorServiceDelegate.selectVenueUser(AssociatorServiceDelegate.java:149)
	at com.pay1pay.hsf.common.bytecode.Wrapper24.invokeMethod(Wrapper24.java)
	at com.pay1pay.hsf.rpc.proxy.javassist.JavassistProxyFactory$1.doInvoke(JavassistProxyFactory.java:64)
	at com.pay1pay.hsf.rpc.proxy.AbstractProxyInvoker.invoke(AbstractProxyInvoker.java:72)
	at com.pay1pay.hsf.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53)
	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:72)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170)
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52)
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:745)
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.apache.ibatis.exceptions.ExceptionFactory.wrapException(ExceptionFactory.java:26)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:111)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:102)
	at sun.reflect.GeneratedMethodAccessor254.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:358)
	... 50 more
Caused by: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at java.util.ArrayList.rangeCheck(ArrayList.java:653)
	at java.util.ArrayList.get(ArrayList.java:429)
	at com.dangdang.ddframe.rdb.sharding.jdbc.util.ParameterList.set(ParameterList.java:89)
	at com.dangdang.ddframe.rdb.sharding.parser.result.merger.Limit.replaceParameters(Limit.java:74)
	at com.dangdang.ddframe.rdb.sharding.router.SQLRouteEngine.routeSQL(SQLRouteEngine.java:105)
	at com.dangdang.ddframe.rdb.sharding.router.PreparedSQLRouter.route(PreparedSQLRouter.java:66)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.routeSQL(ShardingPreparedStatement.java:163)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.execute(ShardingPreparedStatement.java:112)
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.query(PreparedStatementHandler.java:59)
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.query(RoutingStatementHandler.java:73)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:60)
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:267)
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:137)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:96)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:77)
	at sun.reflect.GeneratedMethodAccessor248.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Invocation.proceed(Invocation.java:49)
	at com.ve.util.dao.PrintSQLInterceptor.intercept(PrintSQLInterceptor.java:53)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:60)
	at com.sun.proxy.$Proxy106.query(Unknown Source)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:108)
	... 55 more

	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:973) ~[spring-webmvc-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:863) ~[spring-webmvc-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:707) ~[javax.servlet-api-3.1.0.jar:3.1.0]
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:837) ~[spring-webmvc-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:790) ~[javax.servlet-api-3.1.0.jar:3.1.0]
	at org.eclipse.jetty.servlet.ServletHolder.handle(ServletHolder.java:808) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1669) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at com.ve.api.filter.TokenCenter.doFilter(TokenCenter.java:216) ~[classes/:na]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlets.CrossOriginFilter.handle(CrossOriginFilter.java:259) ~[jetty-all-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlets.CrossOriginFilter.doFilter(CrossOriginFilter.java:222) ~[jetty-all-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at com.ve.util.threadlocal.config.ThreadLocalFilter.doFilter(ThreadLocalFilter.java:63) ~[classes/:na]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:88) ~[spring-web-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:585) [jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:143) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.security.SecurityHandler.handle(SecurityHandler.java:577) [jetty-security-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:223) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1127) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:515) [jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:185) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:1061) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:141) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:97) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.Server.handle(Server.java:497) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.HttpChannel.handle(HttpChannel.java:310) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.HttpConnection.onFillable(HttpConnection.java:257) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.io.AbstractConnection$2.run(AbstractConnection.java:540) [jetty-io-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.util.thread.QueuedThreadPool.runJob(QueuedThreadPool.java:635) [jetty-util-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.util.thread.QueuedThreadPool$3.run(QueuedThreadPool.java:555) [jetty-util-9.2.9.v20150224.jar:9.2.9.v20150224]
	at java.lang.Thread.run(Thread.java:745) [na:1.8.0_65]
Caused by: java.lang.RuntimeException: org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:75)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:371)
	at com.sun.proxy.$Proxy20.selectList(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:198)
	at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:119)
	at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:63)
	at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:52)
	at com.sun.proxy.$Proxy33.selectVenueUser(Unknown Source)
	at com.ve.venue.service.impl.AssociatorServiceImpl.selectVenueUser(AssociatorServiceImpl.java:535)
	at sun.reflect.GeneratedMethodAccessor372.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:98)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:266)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:95)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:207)
	at com.sun.proxy.$Proxy46.selectVenueUser(Unknown Source)
	at com.ve.venue.service.proxy.AssociatorServiceDelegate.selectVenueUser(AssociatorServiceDelegate.java:149)
	at com.pay1pay.hsf.common.bytecode.Wrapper24.invokeMethod(Wrapper24.java)
	at com.pay1pay.hsf.rpc.proxy.javassist.JavassistProxyFactory$1.doInvoke(JavassistProxyFactory.java:64)
	at com.pay1pay.hsf.rpc.proxy.AbstractProxyInvoker.invoke(AbstractProxyInvoker.java:72)
	at com.pay1pay.hsf.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53)
	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:72)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170)
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52)
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:745)
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.apache.ibatis.exceptions.ExceptionFactory.wrapException(ExceptionFactory.java:26)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:111)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:102)
	at sun.reflect.GeneratedMethodAccessor254.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:358)
	... 50 more
Caused by: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at java.util.ArrayList.rangeCheck(ArrayList.java:653)
	at java.util.ArrayList.get(ArrayList.java:429)
	at com.dangdang.ddframe.rdb.sharding.jdbc.util.ParameterList.set(ParameterList.java:89)
	at com.dangdang.ddframe.rdb.sharding.parser.result.merger.Limit.replaceParameters(Limit.java:74)
	at com.dangdang.ddframe.rdb.sharding.router.SQLRouteEngine.routeSQL(SQLRouteEngine.java:105)
	at com.dangdang.ddframe.rdb.sharding.router.PreparedSQLRouter.route(PreparedSQLRouter.java:66)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.routeSQL(ShardingPreparedStatement.java:163)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.execute(ShardingPreparedStatement.java:112)
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.query(PreparedStatementHandler.java:59)
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.query(RoutingStatementHandler.java:73)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:60)
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:267)
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:137)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:96)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:77)
	at sun.reflect.GeneratedMethodAccessor248.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Invocation.proceed(Invocation.java:49)
	at com.ve.util.dao.PrintSQLInterceptor.intercept(PrintSQLInterceptor.java:53)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:60)
	at com.sun.proxy.$Proxy106.query(Unknown Source)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:108)
	... 55 more

	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:148) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109) ~[hsf-all-2.5.13.jar:na]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) ~[na:1.8.0_65]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) ~[na:1.8.0_65]
	... 1 common frames omitted
 2017-10-12 18:33:54.486 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-44] WARN  o.e.j.s.HttpChannel -/api/associator/selectVenueUser?pageNo=0&pageSize=10
org.springframework.web.util.NestedServletException: Request processing failed; nested exception is java.lang.RuntimeException: org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:75)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:371)
	at com.sun.proxy.$Proxy20.selectList(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:198)
	at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:119)
	at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:63)
	at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:52)
	at com.sun.proxy.$Proxy33.selectVenueUser(Unknown Source)
	at com.ve.venue.service.impl.AssociatorServiceImpl.selectVenueUser(AssociatorServiceImpl.java:535)
	at sun.reflect.GeneratedMethodAccessor372.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:98)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:266)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:95)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:207)
	at com.sun.proxy.$Proxy46.selectVenueUser(Unknown Source)
	at com.ve.venue.service.proxy.AssociatorServiceDelegate.selectVenueUser(AssociatorServiceDelegate.java:149)
	at com.pay1pay.hsf.common.bytecode.Wrapper24.invokeMethod(Wrapper24.java)
	at com.pay1pay.hsf.rpc.proxy.javassist.JavassistProxyFactory$1.doInvoke(JavassistProxyFactory.java:64)
	at com.pay1pay.hsf.rpc.proxy.AbstractProxyInvoker.invoke(AbstractProxyInvoker.java:72)
	at com.pay1pay.hsf.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53)
	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:72)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170)
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52)
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:745)
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.apache.ibatis.exceptions.ExceptionFactory.wrapException(ExceptionFactory.java:26)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:111)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:102)
	at sun.reflect.GeneratedMethodAccessor254.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:358)
	... 50 more
Caused by: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at java.util.ArrayList.rangeCheck(ArrayList.java:653)
	at java.util.ArrayList.get(ArrayList.java:429)
	at com.dangdang.ddframe.rdb.sharding.jdbc.util.ParameterList.set(ParameterList.java:89)
	at com.dangdang.ddframe.rdb.sharding.parser.result.merger.Limit.replaceParameters(Limit.java:74)
	at com.dangdang.ddframe.rdb.sharding.router.SQLRouteEngine.routeSQL(SQLRouteEngine.java:105)
	at com.dangdang.ddframe.rdb.sharding.router.PreparedSQLRouter.route(PreparedSQLRouter.java:66)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.routeSQL(ShardingPreparedStatement.java:163)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.execute(ShardingPreparedStatement.java:112)
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.query(PreparedStatementHandler.java:59)
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.query(RoutingStatementHandler.java:73)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:60)
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:267)
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:137)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:96)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:77)
	at sun.reflect.GeneratedMethodAccessor248.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Invocation.proceed(Invocation.java:49)
	at com.ve.util.dao.PrintSQLInterceptor.intercept(PrintSQLInterceptor.java:53)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:60)
	at com.sun.proxy.$Proxy106.query(Unknown Source)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:108)
	... 55 more

	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:973) ~[spring-webmvc-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:863) ~[spring-webmvc-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:707) ~[javax.servlet-api-3.1.0.jar:3.1.0]
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:837) ~[spring-webmvc-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:790) ~[javax.servlet-api-3.1.0.jar:3.1.0]
	at org.eclipse.jetty.servlet.ServletHolder.handle(ServletHolder.java:808) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1669) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at com.ve.api.filter.TokenCenter.doFilter(TokenCenter.java:216) ~[classes/:na]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlets.CrossOriginFilter.handle(CrossOriginFilter.java:259) ~[jetty-all-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlets.CrossOriginFilter.doFilter(CrossOriginFilter.java:222) ~[jetty-all-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at com.ve.util.threadlocal.config.ThreadLocalFilter.doFilter(ThreadLocalFilter.java:63) ~[classes/:na]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:88) ~[spring-web-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1652) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:585) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:143) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.security.SecurityHandler.handle(SecurityHandler.java:577) ~[jetty-security-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:223) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1127) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:515) ~[jetty-servlet-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:185) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:1061) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:141) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:97) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.Server.handle(Server.java:497) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.HttpChannel.handle(HttpChannel.java:310) ~[jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.server.HttpConnection.onFillable(HttpConnection.java:257) [jetty-server-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.io.AbstractConnection$2.run(AbstractConnection.java:540) [jetty-io-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.util.thread.QueuedThreadPool.runJob(QueuedThreadPool.java:635) [jetty-util-9.2.9.v20150224.jar:9.2.9.v20150224]
	at org.eclipse.jetty.util.thread.QueuedThreadPool$3.run(QueuedThreadPool.java:555) [jetty-util-9.2.9.v20150224.jar:9.2.9.v20150224]
	at java.lang.Thread.run(Thread.java:745) [na:1.8.0_65]
Caused by: java.lang.RuntimeException: org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:75)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:371)
	at com.sun.proxy.$Proxy20.selectList(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:198)
	at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:119)
	at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:63)
	at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:52)
	at com.sun.proxy.$Proxy33.selectVenueUser(Unknown Source)
	at com.ve.venue.service.impl.AssociatorServiceImpl.selectVenueUser(AssociatorServiceImpl.java:535)
	at sun.reflect.GeneratedMethodAccessor372.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:98)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:266)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:95)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:207)
	at com.sun.proxy.$Proxy46.selectVenueUser(Unknown Source)
	at com.ve.venue.service.proxy.AssociatorServiceDelegate.selectVenueUser(AssociatorServiceDelegate.java:149)
	at com.pay1pay.hsf.common.bytecode.Wrapper24.invokeMethod(Wrapper24.java)
	at com.pay1pay.hsf.rpc.proxy.javassist.JavassistProxyFactory$1.doInvoke(JavassistProxyFactory.java:64)
	at com.pay1pay.hsf.rpc.proxy.AbstractProxyInvoker.invoke(AbstractProxyInvoker.java:72)
	at com.pay1pay.hsf.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53)
	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:72)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170)
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52)
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:745)
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.apache.ibatis.exceptions.ExceptionFactory.wrapException(ExceptionFactory.java:26)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:111)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:102)
	at sun.reflect.GeneratedMethodAccessor254.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:358)
	... 50 more
Caused by: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at java.util.ArrayList.rangeCheck(ArrayList.java:653)
	at java.util.ArrayList.get(ArrayList.java:429)
	at com.dangdang.ddframe.rdb.sharding.jdbc.util.ParameterList.set(ParameterList.java:89)
	at com.dangdang.ddframe.rdb.sharding.parser.result.merger.Limit.replaceParameters(Limit.java:74)
	at com.dangdang.ddframe.rdb.sharding.router.SQLRouteEngine.routeSQL(SQLRouteEngine.java:105)
	at com.dangdang.ddframe.rdb.sharding.router.PreparedSQLRouter.route(PreparedSQLRouter.java:66)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.routeSQL(ShardingPreparedStatement.java:163)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.execute(ShardingPreparedStatement.java:112)
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.query(PreparedStatementHandler.java:59)
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.query(RoutingStatementHandler.java:73)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:60)
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:267)
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:137)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:96)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:77)
	at sun.reflect.GeneratedMethodAccessor248.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Invocation.proceed(Invocation.java:49)
	at com.ve.util.dao.PrintSQLInterceptor.intercept(PrintSQLInterceptor.java:53)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:60)
	at com.sun.proxy.$Proxy106.query(Unknown Source)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:108)
	... 55 more

	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:148) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109) ~[hsf-all-2.5.13.jar:na]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) ~[na:1.8.0_65]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) ~[na:1.8.0_65]
	... 1 common frames omitted
 2017-10-12 18:33:54.487 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-44] WARN  o.e.j.s.HttpChannel -Could not send response error 500: org.springframework.web.util.NestedServletException: Request processing failed; nested exception is java.lang.RuntimeException: org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:75)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:371)
	at com.sun.proxy.$Proxy20.selectList(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:198)
	at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:119)
	at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:63)
	at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:52)
	at com.sun.proxy.$Proxy33.selectVenueUser(Unknown Source)
	at com.ve.venue.service.impl.AssociatorServiceImpl.selectVenueUser(AssociatorServiceImpl.java:535)
	at sun.reflect.GeneratedMethodAccessor372.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:98)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:266)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:95)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:207)
	at com.sun.proxy.$Proxy46.selectVenueUser(Unknown Source)
	at com.ve.venue.service.proxy.AssociatorServiceDelegate.selectVenueUser(AssociatorServiceDelegate.java:149)
	at com.pay1pay.hsf.common.bytecode.Wrapper24.invokeMethod(Wrapper24.java)
	at com.pay1pay.hsf.rpc.proxy.javassist.JavassistProxyFactory$1.doInvoke(JavassistProxyFactory.java:64)
	at com.pay1pay.hsf.rpc.proxy.AbstractProxyInvoker.invoke(AbstractProxyInvoker.java:72)
	at com.pay1pay.hsf.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53)
	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:72)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38)
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84)
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170)
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52)
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:745)
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.apache.ibatis.exceptions.ExceptionFactory.wrapException(ExceptionFactory.java:26)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:111)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:102)
	at sun.reflect.GeneratedMethodAccessor254.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:358)
	... 50 more
Caused by: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at java.util.ArrayList.rangeCheck(ArrayList.java:653)
	at java.util.ArrayList.get(ArrayList.java:429)
	at com.dangdang.ddframe.rdb.sharding.jdbc.util.ParameterList.set(ParameterList.java:89)
	at com.dangdang.ddframe.rdb.sharding.parser.result.merger.Limit.replaceParameters(Limit.java:74)
	at com.dangdang.ddframe.rdb.sharding.router.SQLRouteEngine.routeSQL(SQLRouteEngine.java:105)
	at com.dangdang.ddframe.rdb.sharding.router.PreparedSQLRouter.route(PreparedSQLRouter.java:66)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.routeSQL(ShardingPreparedStatement.java:163)
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.execute(ShardingPreparedStatement.java:112)
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.query(PreparedStatementHandler.java:59)
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.query(RoutingStatementHandler.java:73)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy108.query(Unknown Source)
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:60)
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:267)
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:137)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:96)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:77)
	at sun.reflect.GeneratedMethodAccessor248.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.apache.ibatis.plugin.Invocation.proceed(Invocation.java:49)
	at com.ve.util.dao.PrintSQLInterceptor.intercept(PrintSQLInterceptor.java:53)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:60)
	at com.sun.proxy.$Proxy106.query(Unknown Source)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:108)
	... 55 more

 2017-10-12 18:33:54.492 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-38] INFO  c.v.a.i.TimeCostInterceptor -CostTime  : 24ms
-------------------------------------------------------------------------------

 2017-10-12 18:33:57.397 [c18ca6b68f924157a2e76cc0d08ae4c8] [qtp623247230-43] INFO  c.v.a.i.TimeCostInterceptor -
-----------------------2017-10-12 06:33:57-------------------------------------
BusinessId: B#d704b09d883a437387418ba0c9740426 BusinessIdNickName:null
UserId:  UserNickName:
RemoteAddr: 192.168.1.61
X-Forwarded-For: null
X-Real-IP : null
Controller: com.ve.api.controller.associator.AssociatorController
Method    : selectVenueUser
URI       : /api/associator/selectVenueUser
Params    : pageSize=10	pageNo=0	
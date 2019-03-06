
2017-10-12 18:33:54.479|c18ca6b68f924157a2e76cc0d08ae4c8|HsfServerHandler-192.168.1.177:12531-thread-26|ERROR|c.p.h.r.f.ExceptionFilter-Got unchecked and undeclared exception which called by 192.168.1.177. service: com.ve.service.venue.AssociatorService, method: selectVenueUser, exception: org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
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
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:75) ~[mybatis-spring-1.2.2.jar:1.2.2]
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:371) ~[mybatis-spring-1.2.2.jar:1.2.2]
	at com.sun.proxy.$Proxy20.selectList(Unknown Source) ~[na:na]
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:198) ~[mybatis-spring-1.2.2.jar:1.2.2]
	at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:119) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:63) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:52) ~[mybatis-3.2.7.jar:3.2.7]
	at com.sun.proxy.$Proxy33.selectVenueUser(Unknown Source) ~[na:na]
	at com.ve.venue.service.impl.AssociatorServiceImpl.selectVenueUser(AssociatorServiceImpl.java:535) ~[classes/:na]
	at sun.reflect.GeneratedMethodAccessor372.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_65]
	at java.lang.reflect.Method.invoke(Method.java:497) ~[na:1.8.0_65]
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:98) ~[spring-tx-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:266) ~[spring-tx-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:95) ~[spring-tx-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:207) ~[spring-aop-4.1.0.RELEASE.jar:4.1.0.RELEASE]
	at com.sun.proxy.$Proxy46.selectVenueUser(Unknown Source) ~[na:na]
	at com.ve.venue.service.proxy.AssociatorServiceDelegate.selectVenueUser(AssociatorServiceDelegate.java:149) ~[classes/:na]
	at com.pay1pay.hsf.common.bytecode.Wrapper24.invokeMethod(Wrapper24.java) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.proxy.javassist.JavassistProxyFactory$1.doInvoke(JavassistProxyFactory.java:64) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.proxy.AbstractProxyInvoker.invoke(AbstractProxyInvoker.java:72) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ExceptionFilter.invoke(ExceptionFilter.java:72) ~[hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.monitor.support.MonitorFilter.invoke(MonitorFilter.java:104) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.TimeoutFilter.invoke(TimeoutFilter.java:42) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.dubbo.filter.TraceFilter.invoke(TraceFilter.java:78) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ContextFilter.invoke(ContextFilter.java:60) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.GenericFilter.invoke(GenericFilter.java:132) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.ClassLoaderFilter.invoke(ClassLoaderFilter.java:38) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.filter.EchoFilter.invoke(EchoFilter.java:38) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.rpc.protocol.dubbo.DubboProtocol$1.reply(DubboProtocol.java:108) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.handleRequest(HeaderExchangeHandler.java:84) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.exchange.support.header.HeaderExchangeHandler.received(HeaderExchangeHandler.java:170) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.transport.DecodeHandler.received(DecodeHandler.java:52) [hsf-all-2.5.13.jar:na]
	at com.pay1pay.hsf.remoting.transport.dispatcher.ChannelEventRunnable.run(ChannelEventRunnable.java:109) [hsf-all-2.5.13.jar:na]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) [na:1.8.0_65]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) [na:1.8.0_65]
	at java.lang.Thread.run(Thread.java:745) [na:1.8.0_65]
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
### The error may exist in file [F:\workspace\ve\ve-venue\target\classes\META-INF\mybatis\VeAssociatorMapper.xml]
### The error may involve com.ve.venue.dao.VeAssociatorDao.selectVenueUser-Inline
### The error occurred while setting parameters
### SQL: SELECT       IFNULL(vac.BALANCE,'-')BALANCE,      IFNULL(vac.COUNT,'-')COUNT,      IFNULL(vac.USE_COLUMN,'-')USE_COLUMN,   va.*,va.MEMBER_TYPE type,   vac.EXPIRY_DATE expiryDate,   vac.CARD_STATUS cardStatus,   vac.SPECIFIC_ID specificId,   vac.NEED_PASSWORD needPassowrd  FROM   ve_associator va  LEFT JOIN ve_associator_card vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 = 1      AND va.VENUE_ID = ?                             limit ?,?
### Cause: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at org.apache.ibatis.exceptions.ExceptionFactory.wrapException(ExceptionFactory.java:26) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:111) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:102) ~[mybatis-3.2.7.jar:3.2.7]
	at sun.reflect.GeneratedMethodAccessor254.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_65]
	at java.lang.reflect.Method.invoke(Method.java:497) ~[na:1.8.0_65]
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:358) ~[mybatis-spring-1.2.2.jar:1.2.2]
	... 50 common frames omitted
Caused by: java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
	at java.util.ArrayList.rangeCheck(ArrayList.java:653) ~[na:1.8.0_65]
	at java.util.ArrayList.get(ArrayList.java:429) ~[na:1.8.0_65]
	at com.dangdang.ddframe.rdb.sharding.jdbc.util.ParameterList.set(ParameterList.java:89) ~[sharding-jdbc-core-1.4.0.jar:na]
	at com.dangdang.ddframe.rdb.sharding.parser.result.merger.Limit.replaceParameters(Limit.java:74) ~[sharding-jdbc-core-1.4.0.jar:na]
	at com.dangdang.ddframe.rdb.sharding.router.SQLRouteEngine.routeSQL(SQLRouteEngine.java:105) ~[sharding-jdbc-core-1.4.0.jar:na]
	at com.dangdang.ddframe.rdb.sharding.router.PreparedSQLRouter.route(PreparedSQLRouter.java:66) ~[sharding-jdbc-core-1.4.0.jar:na]
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.routeSQL(ShardingPreparedStatement.java:163) ~[sharding-jdbc-core-1.4.0.jar:na]
	at com.dangdang.ddframe.rdb.sharding.jdbc.ShardingPreparedStatement.execute(ShardingPreparedStatement.java:112) ~[sharding-jdbc-core-1.4.0.jar:na]
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.query(PreparedStatementHandler.java:59) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.query(RoutingStatementHandler.java:73) ~[mybatis-3.2.7.jar:3.2.7]
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_65]
	at java.lang.reflect.Method.invoke(Method.java:497) ~[na:1.8.0_65]
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62) ~[mybatis-3.2.7.jar:3.2.7]
	at com.sun.proxy.$Proxy108.query(Unknown Source) ~[na:na]
	at sun.reflect.GeneratedMethodAccessor245.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_65]
	at java.lang.reflect.Method.invoke(Method.java:497) ~[na:1.8.0_65]
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62) ~[mybatis-3.2.7.jar:3.2.7]
	at com.sun.proxy.$Proxy108.query(Unknown Source) ~[na:na]
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:60) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:267) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:137) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:96) ~[mybatis-3.2.7.jar:3.2.7]
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:77) ~[mybatis-3.2.7.jar:3.2.7]
	at sun.reflect.GeneratedMethodAccessor248.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_65]
	at java.lang.reflect.Method.invoke(Method.java:497) ~[na:1.8.0_65]
	at org.apache.ibatis.plugin.Invocation.proceed(Invocation.java:49) ~[mybatis-3.2.7.jar:3.2.7]
	at com.ve.util.dao.PrintSQLInterceptor.intercept(PrintSQLInterceptor.java:53) ~[classes/:na]
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:60) ~[mybatis-3.2.7.jar:3.2.7]
	at com.sun.proxy.$Proxy106.query(Unknown Source) ~[na:na]
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:108) ~[mybatis-3.2.7.jar:3.2.7]
	... 55 common frames omitted
2017-10-12 18:33:54.480|221310f17f5443538ed461919e22f54f|AsyncAppender-Worker-Thread-1|INFO |c.p.h.r.p.InvokerInvocationHandler-Invoke Info:MonitorFacade|jdbcsqlMonitorCollection|IN:["127.0.0.1","ve-server","2017-10-12 18:33:54.479|c18ca6b68f924157a2e76cc0d08ae4c8|HsfServerHandler-192.168.1.177:12531-thread-25|SQL|0|2|SELECT s.*, t.TYPE_NAME FROM ve_associator_card_specific_type s LEFT JOIN ve_associator_card_type \nt ON t.TYPE_ID = s.TYPE_ID WHERE 1 = 1 AND s.VENUE_ID = 'JfQ0YK0rzpBuPp4q21z' AND s.IS_VALID \n= 0 ORDER BY s.MODIFY_TIME DESC LIMIT 0, 1000"]|OUT:"RpcException:Forbid consumer 192.168.1.177 access service com.ibu.monitor.facade.MonitorFacade from registry 127.0.0.1:2184 use hsf version 2.5.13, Please check registry access list (whitelist/blacklist)."|0ms|null|json:1ms
2017-10-12 18:33:54.482|c18ca6b68f924157a2e76cc0d08ae4c8|HsfServerHandler-192.168.1.177:12531-thread-25|INFO |jdbc.sqlonly-SELECT b.ID, b.NAME, a.ID AS AREA_ID, a.NAME AS AREA_NAME, a.STATUS FROM ve_venue_area a JOIN 
ve_venue_area_type b ON a.SPORT_ID = b.ID WHERE a.VENUE_ID = 'JfQ0YK0rzpBuPp4q21z' AND a.STATUS 
IN (0, 1) 
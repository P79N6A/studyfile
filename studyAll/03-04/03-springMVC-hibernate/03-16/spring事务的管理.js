'spring事务的配置如下所示'//annotation-driven表示支持注解  tx表示事务  mvc表示controller中支持
<!-- 开启注解事务 只对当前配置文件有效 支持事务注解 transaction-manager="txManager" 指定了事务管理器是txManager-->
<tx:annotation-driven transaction-manager="txManager" />


<!-- '创建事务管理器',是一个bean，用来处理hibernate中的事务 -->
<bean id="txManager"
	class="org.springframework.orm.hibernate4.HibernateTransactionManager"
	abstract="false" lazy-init="default" autowire="default">
	<property name="sessionFactory" ref="sessionFactory" />
</bean>
<!-- '创建通知'，'通过通知筛选'需要'管理事务的方法' -->
<tx:advice id="txAdvice" transaction-manager="txManager">
	<tx:attributes>
		<!--'hibernate4必须配置'为'开启事务' 否则 'getCurrentSession()获取不到' -->
		<tx:method name="get*" propagation="REQUIRED" read-only="true" />
		<tx:method name="count*" propagation="REQUIRED" read-only="true" />
		<tx:method name="find*" propagation="REQUIRED" read-only="true" />
		<tx:method name="list*" propagation="REQUIRED" read-only="true" />
		<tx:method name="save*" propagation="REQUIRED" rollback-for="java.lang.Throwable" />
	</tx:attributes>
</tx:advice>


//这些说明哪些方法需要加入事务控制
<!-- '曝光(开启)代理' -->
<aop:config expose-proxy="true">
	<!-- '配置切入的位置' -->
	<aop:pointcut id="facadePointcut"
		expression="execution(* com.zycx.udream.service.impl..*.*(..))" />
	<!-- '使用哪一个通知' -->
	<aop:advisor advice-ref="txAdvice" pointcut-ref="facadePointcut" />
</aop:config>


//事务管理器需要一个通知，通知需要一个切入位置的配置

//能否在controller中使用事务管理
<tx:annoation-driven/>'只'会'查找'和它在'相同'的'应用上下文'件中定义'的bean'上面的@Transactional注解，
如果你'把它放在Dispatcher'的'应用上下文中'，'它''只'检查'控制器'（Controller）上的@Transactional注解，
而'不是'你'services'上'的@Transactional注解'。
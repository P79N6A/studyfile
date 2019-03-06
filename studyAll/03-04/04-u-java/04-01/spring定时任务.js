'1.在spring中，定时任务是用继承QuartzJobBean类，重写executeInternal方法来实现的;'

'2.在spring.xml中配置定时器'

<!-- ClusterDemoJob -->
<bean id="clusterDemoJob" class="com.zycx.udream.service.timer.ClusterDemoJob" />

<!-- ClusterTesterJobDetail -->
<!-- 配置job业务调度类 -->
<bean id="clusterDemoJobDetail"
	class="org.springframework.scheduling.quartz.JobDetailFactoryBean">
	<property name="jobClass">
		<!-- 业务对应的bean -->
        <value>com.zycx.udream.service.timer.ClusterDemoJob</value>  
    </property>  
	<property name="name" value="clusterDemoJob" />
	<property name="durability" value="true" />
</bean>

<!-- ClusterDemoCronTriggerBean -->
<!-- 调度时间配置 -->
<bean id="clusterDemoCronTriggerBean" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
	<property name="jobDetail" ref="clusterDemoJobDetail" />
	<!-- cron 表达式可以提取到配置文件 -->
	<property name="cronExpression" value="0/10 * * * * ? *" />
</bean> 
<!-- END OF 示例定时任务 -->
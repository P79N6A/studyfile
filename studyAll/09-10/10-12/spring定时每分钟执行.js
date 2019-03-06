/*开发的bean*/
<bean id="StaticPageQuartz" class="com.test.quartz.pageconvertor.StaticPageConvertor" />
/*注入到定时执行类*/
<bean id="BuildStaticPageTask" class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
    <property name="targetObject" ref="StaticPageQuartz" />
    <property name="targetMethod" value="doHTMLConvertor" />
    <property name="concurrent" value="false" />
</bean>
/*配置时间*/
<bean id="BuildStaticPageTrigger" class="org.springframework.scheduling.quartz.CronTriggerBean">
    <property name="jobDetail" ref="BuildStaticPageTask" />
    <property name="cronExpression" value="0 0/5 * * * ?" /><!--每五分钟执行一次-->
</bean>
'继承装配'
使用bean属性parent="id";
<bean id='stu11' class="org.vo.Stu">
	<property name="name" value="lucy"></property>
	<property name="age" value="18"></property>
</bean>
<bean id='gra11' parent="stu11" class="org.vo.Gradu">
	<property name="grr" value="大学"></property>
</bean>

'构造函数注入'
较少使用
<bean id="emplyoee" class="com.hsp.constructor.Emplyoee">
	<constructor-arg index="0" type="java.lang.String" value="gg"/>  
	<constructor-arg index="1" type="int" value="33"/>
</bean>

'自动装配'
使用bean属性autowire
{	bytype;
	byname;通过bean名装载
	constructor;
	defualt;意思是使用'<beans>'的default-autowire属性作为装载指标
	no;不使用自动装配
}
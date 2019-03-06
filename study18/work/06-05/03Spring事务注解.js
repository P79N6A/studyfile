spring的'@Transactional'注解'详细用法'
概述
事务管理对于企业应用来说是至关重要的，即使出现异常情况，它也可以保证数据的一致性。

'Spring' Framework对'事务管理'提供了一致的抽象，其'特点如下'：
为'不同的事务API''提供''一致'的'编程模型'，
比如JTA(Java Transaction API),JDBC,Hibernate,
JPA(Java Persistence API)和JDO(Java Data Objects)
支持声明式事务管理，特别是基于'注解'的'声明式事务管理'，简单易用
提供'比'其他事务API如'JTA''更简单'的编程式事务管理API
与spring数据访问抽象的完美集成

'事务管理方式'：
'spring''支持编程式''事务管理'和'声明式''事务管理'两种方式。

'编程式事务管理'使'用TransactionTemplate'或者直接使用底层的'PlatformTransactionManager'。
对于'编程式事务管理'，spring推荐'使用TransactionTemplate'。

'声明式事务管理'建立'在AOP之上'的。其'本质'是'对方法前后进行拦截'，
然后'在目标方法'开始'之前''创建'或者加入一个'事务'，
在'执行完'目标方法'之后'根据执行情况'提交'或者'回滚事务'。
'声明式事务'最大的'优点'就是'不需要'通过'编程'的方式'管理事务'，
这样就'不需要'在'业务逻辑代码'中'掺杂事务管理'的'代码'，
'只需在配置文件'中'做相关'的'事务规则声明'('或'通过'基于@Transactional注解'的方式)，
'便可'以'将事务规则'应'用到业务逻辑中'。

显然'声明式事务'管理要'优于编程式事务管理'，这正是spring倡导的非侵入式的开发方式。
声明式事务管理使业务代码不受污染，一个普通的POJO对象，只要加上注解就可以获得完全的事务支持。
和编程式事务相比，声明式事务唯一'不足'地方是，后者的最'细粒度只能作用到方法级'别，
'无法'做到'像编程式事务'那样可以'作用到代码块级别'。但是即便'有这样的需求'，
'也存在'很多'变通的方法'，比如，可以'将'需要'进行事务管理的代码块''独立为方法'等等。

'声明式事务管理'也有'两种'常用的'方式'，一种是'基于'tx和aop名字空间的'xml配置'文件，
另一种就是'基于@Transactional注解'。显然'基于注解'的方式'更简单易用'，更清爽。

'自动提交(AutoCommit)与连接关闭时的是否自动提交'：

自动提交
'默认'情况下，'数据库''处于自动提交模式'。'每一条语句''处于'一个'单独的事务'中，
在这条'语句执行完毕'时，如果执行'成功则隐式的提交事务'，如果
执行'失败则隐式'的'回滚事务'。

对于'正常的事务管理'，'是一组'相关的'操作''处于一个事务'之'中'，因此'必须关闭数据库'的'自动提交模式'。
不过，这个我们不用担心，'spring'会'将底层连接'的'自动提交特性''设置为false'。
org/springframework/jdbc/datasource/DataSourceTransactionManager.java

 if (con.getautocommit()) {
     txobject.setmustrestoreautocommit(true);
     if (logger.isdebugenabled()) {
         logger.debug("switching jdbc connection [" + con + "] to manual commit");
     }
     con.setautocommit(false);
 }

'有些'数据'连接池''提供'了'关闭'事务'自动提交'的'设置'，最好在设置连接池时就将其关闭。
但'C3P0'没有提供这一特性，'只能依靠spring'来'设置'。
因为JDBC规范规定，当'连接对象建立'时'应'该'处于自动提交模式'，这是跨DBMS的缺省值，
如果需要,必须显式的关闭自动提交。C3P0遵守这一规范，
让客户代码来显式的设置需要的提交模式。

'连接关闭时'的'是否自动提交'
当一个'连接关闭'时，如果'有未提交的事务'应该'如何处理'？JDBC规范没有提及，
'C3P0默认'的'策略'是'回滚任何未提交的事务'。这是一个正确的策略，
但JDBC驱动提供商之间对此问题并没有达成一致。
C3P0的autoCommitOnClose属性默认是false,没有十分必要不要动它。
或者可以显式的设置此属性为false，这样会更明确。

基于'注解'的'声明式事务'管理配置
spring-servlet.xml
<!-- transaction support -->
<!-- PlatformTransactionMnager -->
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource" />
</bean>
<!-- enable transaction annotation support -->
<tx:annotation-driven transaction-manager="txManager" />

还要在spring-servlet.xml中添加tx名字空间

 	...
	xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="
	...
	http://www.springframework.org/schema/tx
	http://www.springframework.org/schema/tx/spring-tx.xsd
	...

'MyBatis''自动参与到spring事务'管理中，'无需额外配置'，
只'要'org.mybatis.spring.SqlSessionFactoryBean'引用'的'数据源'
与DataSourceTransactionManager引用的数据源一致即可，否则事务管理会不起作用。

另外需要下载依赖包aopalliance.jar放置到WEB-INF/lib目录下。否则spring初始化时会报异常
java.lang.NoClassDefFoundError: org/aopalliance/intercept/MethodInterceptor

spring'事务特性'
spring'所有'的'事务管理策略类'都'继承自org.springframework.transaction.PlatformTransactionManager'接口


public interface PlatformTransactionManager {
	TransactionStatus getTransaction(TransactionDefinition definition)throws TransactionException;
	void commit(TransactionStatus status) throws TransactionException;
	void rollback(TransactionStatus status) throws TransactionException;
}

其中TransactionDefinition接口定义以下特性：

'事务隔离级别'
'不可重复读' 
是指'事务中'，'两次查询'的'结果不一致'，原因，在'查询'的'过程中'，'其他事务''做了更新'的'操作'

'脏读'是'读取'了'前一个事务'，'未提交的脏数据' 
'不可重复读'，是在'事务内重复读取'了，'别的线程已提交的数据'

隔离级别是指'若干'个'并发'的'事务之间'的'隔离程度'。
TransactionDefinition 接口中定义了'五个'表示'隔离级别的常量'：

TransactionDefinition.'ISOLATION_DEFAULT'：
这是默认值，表示'使用'底层'数据库'的'默认隔离级别'。对大部分数据库而言，
通常这值'就是TransactionDefinition.ISOLATION_READ_COMMITTED'。

TransactionDefinition.ISOLATION_READ_UNCOMMITTED：
该隔离级别'表示一个事务可'以'读'取'另一个事务''修改但'还'没有提交''的数据'。
该级别'不'能'防止脏读'，'不可重复读'和'幻读'，因此很少使用该隔离级别。
比如PostgreSQL实际上并没有此级别。

TransactionDefinition.ISOLATION_READ_COMMITTED：
该隔离级别'表示一个事务''只能读取另一个事务'已经'提交的数据'。
该级别'可以防止脏读'，这也是大多数情况下的推荐值。

TransactionDefinition.ISOLATION_REPEATABLE_READ：
该隔离级别'表示一个事务'在'整个过程中'可以'多次重复执行'某个'查询'，
并且'每次返回'的'记录都相同'。该级别'可以防止脏读和不可重复读'。

TransactionDefinition.ISOLATION_SERIALIZABLE：
所有的'事务'依次'逐个执行'，这样事务之间就'完全不可能产生干扰'，
也就是说，该级别可以'防止脏读'、'不可重复读以及幻读'。
但是这将'严重影响程序的性能'。通常情况下也不会用到该级别。

'事务传播行为'
所谓事务的传播行为是'指'，如果在'开始当前事务之前'，'一个事务'上下文'已经存在'，
'此时'有若干选项'可以指定'一个事务性方法的'执行行为'。
在TransactionDefinition定义中包括了'如下几个'表示'传播行为的常量'：

TransactionDefinition.PROPAGATION_REQUIRED：(两个放在一个事务里)
如果'当前存在事务'，则'加入该事务'；如果'当前没有事务'，则'创建一个新的事务'。这是默认值。

TransactionDefinition.PROPAGATION_REQUIRES_NEW：(独立出两个事务)
'创建'一个'新的事务'，如果'当前存在事务'，则'把当前事务挂起'。

TransactionDefinition.PROPAGATION_SUPPORTS：(独立出两个事务)
如果'当前存在事务'，则'加入该事务'；如果'当前没有事务'，则以'非事务的方式继续运行'。

TransactionDefinition.PROPAGATION_NOT_SUPPORTED：（第一个事务挂起，让第二个跑完，再执行第一个）
以'非事务方式运行'，如果'当前存在事务'，则'把当前事务挂起'。

TransactionDefinition.PROPAGATION_NEVER：（不要事务）
以'非事务方式运行'，如果'当前存在事务'，则'抛出异常'。

TransactionDefinition.PROPAGATION_MANDATORY：
如果'当前存在事务'，则'加入该事务'；如果'当前没有事务'，则'抛出异常'。

TransactionDefinition.PROPAGATION_NESTED：（有两个事务，就嵌套事务，只有一个事务，就放一起）
如果'当前存在事务'，则'创建一个事务'作'为当前事务的嵌套事务'来'运行'；如果'当前没有事务'，
则该取值'等价于TransactionDefinition.PROPAGATION_REQUIRED'。

'事务超时'
所谓事务超时，就是'指一个事务'所允许执行的'最长时间'，如果'超'过该'时'间限制但'事务还没'有'完成'，
则'自动回滚事务'。在 TransactionDefinition 中以 int 的值来表示超时时间，其单位是秒。

默认设置为底层事务系统的超时值，如果底层数据库事务系统没有设置超时值，
那么就是none，没有超时限制。

'事务只读属性'
'只读事务'用于'客户代码只读'但'不修改数据'的'情形'，只读事务'用于特定情景'下'的优化'，
比如使用Hibernate的时候。

'默认为读写事务'。
spring事务回滚规则

指示'spring事务管理'器'回滚一个事务'的'推荐方法'是'在当前事务'的上下文'内抛出异常'。
spring'事务管理器'会'捕捉任何未处理'的'异常'，然后'依据规则'决定是否'回滚'抛出异常的'事务'。

'默认'配置下，spring只有'在抛出'的异常为'运行时unchecked异常'时'才回滚'该'事务'，
也'就是'抛出的'异常为RuntimeException的子类'(Errors也会导致事务回滚)，
而抛出checked异常则不会导致事务回滚。
'可以明确的配置'在抛出'那些异常'时'回滚事务'，包括checked异常。
也可以'明确定义那些异常'抛出时'不回滚事务'。

还'可以编程性'的'通过setRollbackOnly()'方法来'指示'一个'事务必须回滚'，
在调用完setRollbackOnly()后你所能执行的唯一操作就是回滚。

'@Transactional注解'
属性						类型							描述
value					String						可选的限定描述符，'指定'使用的'事务管理器'
propagation				enum: Propagation			可选的'事务传播行为'设置
isolation				enum: Isolation				可选的'事务隔离级别'设置
readOnly				boolean						读写或只读事务，'默认读写'
timeout					int (in seconds granularity)		事务'超时时间'设置
rollbackFor				Class对象数组，必须继承自Throwable	导致事务'回滚的异常类数组'
rollbackForClassName	类名数组，必须继承自Throwable			导致事务'回滚的异常类名字数组'
noRollbackFor			Class对象数组，必须继承自Throwable	不会导致事务回滚的异常类数组
noRollbackForClassName	类名数组，必须继承自Throwable			不会导致事务回滚的异常类名字数组
 

用法
'@Transactional' 可以'作用于接口'、'接口方法'、'类'以及'类方法'上。
当'作用于类上'时，该类的'所有 public 方法'将都'具有'该类型的'事务属性'，
同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。
虽然 @Transactional 注解可以作用于接口、接口方法、类以及类方法上，
但是 Spring 建议不要在接口或者接口方法上使用该注解，
因为这只有在使用基于接口的代理时它才会生效。
另外， '@Transactional 注解'应该'只被应用到 public 方法上'，
这是由 Spring AOP 的本质决定的。
如果你在 protected、private 或者默认可见性的方法上使用 @Transactional 注解，
这将被忽略，也不会抛出任何异常。

默认情况下，'只有'来自'外部的方法调用'才'会被AOP代理捕获'，也就是，
类'内部方法调用'本类'内部的其他方法'并'不会引起事务行为'，
即使被调用方法使用@Transactional注解进行修饰。

@Transactional(readOnly = true)
public class DefaultFooService implements FooService {
  
	public Foo getFoo(String fooName) {
		//do something
	}
  
	//these settings have precedence for this method
	'//方法上注解属性'会'覆盖类注解'上的相同'属性'
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public void updateFoo(Foo foo) {
		//do something
	}
}


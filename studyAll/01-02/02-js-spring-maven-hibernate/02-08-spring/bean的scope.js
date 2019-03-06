'scope'
scope='singleton','该bean'取出的'对象为单例对象'
scope='prototype','该bean'取出的'对象不是''单例对象'，默认prototype 
<bean id="stu" class="org.vo.Stu" scope="prototype">
</bean>

原文网址：http://blog.csdn.net/chenjian198819/article/details/6663185
<bean id="role" class="spring.chapter2.maryGame.Role" scope="singleton"/>
这里的'scope'就是用来'配置spring bean'的'作用域，它标识bean的作用域。
在'spring2.0之前'bean只有'2种作用域'即：'singleton(单例)'、non-singleton（也称'prototype'）,
'Spring2.0以后'，'增加了session、request、global'三种专用于Web应用程序上下文的Bean。
因此，'默认情况下Spring2.0'现在有'五种类型的Bean'。当然，Spring2.0对Bean的类型的设计进行了重构，
并设计出灵活的Bean类型支持，理论上可以有无数多种类型的Bean，用户可以根据自己的需要，
增加新的Bean类型，满足实际应用需求。

1、'singleton作用域'  所有对bean的请求，都指向同一个对象，线程不安全；
和单例设计模式不一样，他是在ioc容器中只存在一个该class对应的bean
当一个bean的作用域设置为singleton, 那么Spring IOC容器中'只会存在一个共享的bean实例'，
并且'所有对bean的请求'，'只要id与该bean定义相匹配'，则'只会返回bean的同一实例'。换言之，
当把一个'bean'定义设置'为singleton作用域时'，Spring IOC'容器只会创建'该'bean'定义'的唯一实例'。
这个'单一实例'会被'存储到单例缓存'（singleton cache）中，并且所有'针对该bean'的后续'请求'和
'引用'都将'返回被缓存的''对象实例'，这里要'注意'的是'singleton作用域''和GOF设计模式'
'中的单例'是'完全不同'的，'单例设计模式''表示一个ClassLoader'中'只有一个class存在'，
而'这里的singleton'则'表示一个容器对应一个bean'，也就是说'当一个bean被标识为singleton'时候，
'spring的IOC'容器中'只会存在一个该bean'。
配置实例：
<bean id="role" class="spring.chapter2.maryGame.Role" scope="singleton" />
或者
<bean id="role" class="spring.chapter2.maryGame.Role" singleton="true" />

2、'prototype'
'prototype''作用域'部署'的bean'，'每一次请求'（'将其注入到另一个bean中'，或者以程序的方式
'调用'容器的'getBean()'方法）'都会产生一个新的bean'实例，相当于一个new的操作，对于
'prototype作用域的bean'，'有一点'非常重要，那就是'Spring不能对一个prototype bean'
'的整个生命周期负责'，容器在'初始化'、'配置'、'装饰'或者是装配完'一个prototype实例后'，
将它'交给客户端'，'随后就对该prototype实例''不闻不问'了。'不管何种作用域'，'容器都会'
'调用''所有对象'的'初始化生命周期''回调方法'，而'对prototype而言'，任何配置好的析构'生'
'命周期回调方法'都将'不会被调用'。'清除prototype作用域的对象'并'释放任何prototype' 
'bean所持有的昂贵资源'，'都是客户端代码的职责'。（让'Spring容器''释放被singleton''作'
'用域bean占用资源的一种'可行'方式是'，通过'使用bean的后置处理器'，该'处理器持有''要'
'被清除的bean''的引用'。）
配置实例：
<bean id="role" class="spring.chapter2.maryGame.Role" scope="prototype"/>
或者
<bean id="role" class="spring.chapter2.maryGame.Role" singleton="false"/>
<bean id="meetAction" class="com.web.actions.MeetsAction" scope="prototype"> 
  <property name="meetsService" ref="meetsService" /> 
</bean>

scope="prototype"没写的问题,'项目中'对'一个表的增删该操作'是'用一个action'，
这个'action'add,update,delete,save'这些方法'， '添加和修改'是'共用一个页面'，
当'页面得到id'时代表'进行的修改操作'，'反之是添加操作'。因为'在配置spring的bean'
时'忘了写scope="prototype"'所以'每次添加'时'都显示''最后一次'访问过的'记录',
'scope="prototype"' 会'在该类型的对象'被'请求 时''创建一个新的action对象'。
如果'没有配置scope=prototype'则'添加的时候不会新建一个action'，他'任然会保留'
'上次访问的过记录的信息' 'webwork的Action''不是线程安全'的，要求在'多线程环境下'
必须是'一个线程对应一个独立的实例'，'不能使用singleton'。所以，我们在'Spring'
'配置Webwork Action Bean时'，需要'加上属性scope=”prototype”'或singleton=”false”。
'singleton模式'指的是对'某个对象的完全共享'，包括'代码空间和数据空间'，
说白了，如果'一个类是singleton的'，假如'这个类有成员变量'，那么这个'成员变量的值'
'是各个线程共享的'（有点类'似于static'的样子了），'当线程A'往'给变量赋了一个值'以后，
'线程B'就'能读出这个值'。因此，对于前台Action，肯定不能使用singleton的模式，
必须是一个线程请求对应一个独立的实例。推而广之，'只要'是'带数据成员变量的类'，
为了'防止多个线程混用数据'，就'不能使用singleton'。对于我们用到的'Service、Dao'，
之所以'用了singleton'，就是因为'他们没有用到数据成员变量'，如果谁的'Service'
'需要数据成员变量'，请'设置singleton=false'。 有'状态的bean'都'使用Prototype作用域'，
而对'无状态的bean'则应该'使用singleton作用域'。

在 'Spring2.0中'除了'以前的Singleton和Prototype'外'又加入了三个新的web作用域'，
分别为'request、session和 global' 
session。如果'你希望'容器里的'某个bean'拥有其中'某种新的web作用域'，'除了在bean'级上
'配置相应的scope属性'，'还必须'在容器级'做一个额外的初始化配置'。即'在web应用的web.xml'
中'增加这么一个'
ContextListener： org.springframework.web.context.request.RequestContextListener 
'以上是''针对Servlet 2.4以后的版本'。比如Request作用域。





















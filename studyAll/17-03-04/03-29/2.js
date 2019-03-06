用于持有ApplicationContext,可以使用SpringContextHolder.getBean('xxxx')的静态方法得到spring bean对象

<bean class="com.xxxxx.SpringContextHolder"  />

'该工具类'主要'用于'：那些没有归入spring框架管理的类却要'调用spring容器中的bean'提供的工具类。

在spring中要通过IOC依赖注入来取得对应的对象，但是该类通过'实现ApplicationContextAware'接口，以'静态变量保存Spring ApplicationContext', 
'可'在任何代码任何地方'任何时候中取出ApplicaitonContext'.

如此就不能说说org.springframework.context.ApplicationContextAware这个接口了：

当一个'类'实现了这个'接口'（ApplicationContextAware）之后，这个类就'可以'方便'获得ApplicationContext'中的'所有bean'。
换句话说，就是这个类'可'以'直接获取'spring'配置文件'中，所有有引用到的'bean对象'。


//除了以上SpringContextHolder类之外，还有不需要多次加载spring配置文件就可以取得bean的类：
//
//1.Struts2框架中，在监听器中有这么一句
//ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
//之后可以用
//scheduleService = (IScheduleService)context.getBean("scheduleService");
//取到对象，请问context都可以取到什么信息，这些信息的来源在哪？是XML里配置了呢，还是固定的一部分信息呢？
//2、这个 application封装的是web.xml 内部的信息
//而你的web.xml里面有spring的配置文件，所有，里面还包含spring的信息
//同样包含struts2的filter信息
//总之就是和web.xml有关系的所有信息
//
//3、在web.xml里有这么一段
//    <context-param>
//        <param-name>contextConfigLocation</param-name>
//        <param-value>/WEB-INF/applicationContext*.xml</param-value>
//    </context-param>
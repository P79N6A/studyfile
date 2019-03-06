核心类

'控制器'核心类：
•org.springframework.web.servlet.'DispatcherServlet'  － 配置'web.xml'
 
加载'配置文件核心类'：
•org.springframework.web.context.'ContextLoaderListener' – spring的'配置文件'
 
处理'url影射核心类'：
•org.springframework.web.servlet.handler.'BeanNameUrlHandlerMapping'－根据bean的名称请求一个bean.spring的配置文件－ /abc
 
处理'视图资源核心类'：
•org.springframework.web.servlet.view.'ResourceBundleViewResolver'
•return hello – 决定返回的字符串由哪一个页面来显示。
•<context:component-scan package=“cn.hncu”/>用于替代上面的类。
 
方法动态调用核心类
•org.springframework.web.servlet.mvc.multiaction.ParameterMethodNameResolver
 
用Spring处理Web请求-Spring的MVC
 
'DispatcherServlet'是SpringMVC的'核心类'，它就'是一个Servlet'.此类默认'读取'WEB－INF/[servlet-name]-servlet.xml'配置文件'。
 
重要说明：DispatcherServlet可以多次配置到web.xml中，它们将会读取自己的配置文件，
但不会共享Bean.如果希望设置一些共享的Bean应该配置ContextLoaderListener来读取Spring的配置文件。
 
 
canSpringmvc
 
 
web.xml
[html] view plain copy
<span style="color:#000000;"><?xml version="1.0" encoding="UTF-8"?>  
<web-app version="3.0"   
    xmlns="http://java.sun.com/xml/ns/javaee"   
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee   
    http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">  
  <display-name></display-name>   
  <!-- 架构一个Spring,需要'配置一个监听器'，配置文件位置及名称若想自己取，则需配置ContextConfigLocation参数 -->  
  <context-param>  
    <param-name>contextConfigLocation</param-name>  
    <param-value>  
        classpath:beans.xml  
    </param-value>  
  </context-param>  
  <listener>  
    <listener-class>org.springframework.web.context.'ContextLoaderListener'</listener-class>  
  </listener>  
    
  <!-- 架SpringMVC还需再配一个DispatcherServlet -->  
  <servlet>  
    <servlet-name>hncu</servlet-name>  
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>  
    <!-- 读取类似struts框架的配置文件struts.xml，该配置文件在springmvc的默认命名规则为：servlet的名字+" -servlet.xml "   
        如想自己制定springmvc的配置文件，则应进行以下配置：  
    -->  
    <init-param>  
        <param-name>namespace</param-name>  
        <param-value>hncu-servlet</param-value>  
    </init-param>  
      
    <!-- 项目一启动就加载SpringMVC的分发器 -->  
    <load-on-startup>1</load-on-startup>  
  </servlet>  
  <servlet-mapping>  
    <servlet-name>hncu</servlet-name>  
    <url-pattern>/sp/*</url-pattern>  
  </servlet-mapping>  
  <welcome-file-list>  
    <welcome-file>index.jsp</welcome-file>  
  </welcome-file-list>  
</web-app>  
</span>  

 
进入servlet后会读取配置文件hncu-servlet.xml
[html] view plain copy
<span style="color:#000000;"><?xml version="1.0" encoding="UTF-8"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
        xmlns:context="http://www.springframework.org/schema/context"  
        xmlns:tx="http://www.springframework.org/schema/tx"  
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd  
                http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd  
                http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.3.xsd">  
    <!-- controller 的bean 可以用id或name标识，但id不能用"/"，而name可以("/hello"标明访问路径) -->  
    <bean name="/hello" class="cn.hncu.one.HelloWorldController"></bean>  
    <!-- 为了把前段的url请求转换成访问对应的bean,要配如下这个类() spring4以后则可省略-->  
    <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"></bean>  
      
    <!-- 以转发形式显示的view必须配置下面这个的类以进行解析 -->  
    <bean class="org.springframework.web.servlet.view.ResourceBundleViewResolver">  
        <property name="basenames">  
            <list>  
                <value>hncu</value><!-- 资源配置文件在classpath下：hncu.properties -->  
            </list>  
        </property>  
        <property name="defaultParentView" value="hncu"></property><!-- 配置默认父View -->  
    </bean>  
      
    <!-- 配置方法动态调用核心类 -->  
    <bean id="MethodResolver" class="org.springframework.web.servlet.mvc.multiaction.ParameterMethodNameResolver">  
        <!-- 默认执行的方法名 -->  
        <property name="defaultMethodName" value="execute"></property>  
        <property name="paramName" value="method"></property>  
    </bean>  
    <!-- 第2个Controller,演示多方法动态调用核心类 -->  
    <bean name="/muliti" class="cn.hncu.one.MulitiMethodController">  
        <property name="methodNameResolver" ref="MethodResolver"></property>  
    </bean>  
      
</beans></span>  

第一个controller-----HelloWorldController.java    访问方式：
[java] view plain copy
<span style="color:#000000;">package cn.hncu.one;  
  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
import org.springframework.web.servlet.ModelAndView;  
import org.springframework.web.servlet.View;  
import org.springframework.web.servlet.mvc.Controller;  
import org.springframework.web.servlet.view.RedirectView;  
  
//springmvc中的控制器要实现Controller接口，类似struts的action要实现Action接口一样  
public class HelloWorldController implements Controller{  
/*  版本1 
    @Override 
    public ModelAndView handleRequest(HttpServletRequest request, 
            HttpServletResponse response) throws Exception { 
        System.out.println("Hello  Contorller......"); 
        return null;//没有导向结果页面 
    } 
*/  
/*  版本2导向一个重定向的结果页面 
    @Override 
    public ModelAndView handleRequest(HttpServletRequest request, 
            HttpServletResponse response) throws Exception { 
        System.out.println("Hello  Contorller......RedirectView"); 
         
        //让控制器返回一个 重定向view 
        View view=new RedirectView("/jsps/hello.jsp",true);//参数true表示访问时带项目名 
        ModelAndView mv=new ModelAndView();//空参 
        mv.setView(view); 
        return mv; 
    } 
*/  
    //版本3 导向一个转发的结果页面-----需要在配置文件中加载ResourceBundleViewResolver类  
    @Override  
    public ModelAndView handleRequest(HttpServletRequest request,  
            HttpServletResponse response) throws Exception {  
        System.out.println("Hello  Contorller.....转发 ");  
        //让我们的控制器返回一个 转发View  
        ModelAndView mv=new ModelAndView("send","name","我的大城院");//导向 send 所对应的资源视图，并且封装参数：name="我的大城院"  
        return mv;  
    }  
}  
</span>  

 



 

方法动态调用核心类需要一个properties的配置文件
[plain] view plain copy
<span style="color:#000000;">hncu.(class)=org.springframework.web.servlet.view.JstlView  
hncu.url=/jsps/hello.jsp  
send.url=/jsps/one.jsp  
one.url=/jsps/one.jsp  
two.url=/jsps/two.jsp  
three.url=/jsps/three.jsp  
four.url=/jsps/four.jsp</span>  

MulitiMethodController.java
[java] view plain copy
<span style="color:#000000;">package cn.hncu.one;  
  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
import org.springframework.web.servlet.ModelAndView;  
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;  
  
import cn.hncu.domain.User;  
  
public class MulitiMethodController extends MultiActionController{  
    //反模式：这种不带req和resp两个参数的方法不能被访问(要求至少要两个参数,多个也可以)  
    public void one(){  
        System.out.println("该方法访问不到.......");  
    }  
    public String execute(HttpServletRequest req,HttpServletResponse resp){  
        System.out.println("这是一个默认方法，可以被访问到。。。。");  
        return "one";  
    }  
    public String two(HttpServletRequest req,HttpServletResponse resp){  
        System.out.println("two这个方法，可以被访问到。。。。");  
        return "two";  
    }  
    public ModelAndView three(HttpServletRequest req,HttpServletResponse resp){  
        System.out.println("three这个方法，可以被访问到。。。。");  
        String name =req.getParameter("name");  
        return new ModelAndView("three", "name", name);  
    }  
    //学习如何封装复杂数据  
    public ModelAndView four(HttpServletRequest req,HttpServletResponse resp,User user){  
        System.out.println("four这个方法，可以被访问到。。。。");  
        ModelAndView mv=new ModelAndView();  
        mv.setViewName("four");  
        mv.addObject(user);  
        return mv;  
    }  
}  
</span>  

 

方法名为"four"的访问路径为：http://localhost:8080/canSpringmvc/sp/muliti?method=four&name=Tom&age=21   Spring会帮我们封装对象



 

User.java值对象
[java] view plain copy
<span style="color:#000000;">package cn.hncu.domain;  
  
public class User {  
    private String name;  
    private Integer age;  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public Integer getAge() {  
        return age;  
    }  
    public void setAge(Integer age) {  
        this.age = age;  
    }  
    @Override  
    public String toString() {  
        return "User [name=" + name + ", age=" + age + "]";  
    }  
      
}  
</span>  

还有几个jsp页面，没有什么内容，主要是供显示用一下，这里不再贴了。
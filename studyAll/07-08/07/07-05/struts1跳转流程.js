1.web.xml 以后再看

2.跳转映射文件：默认名称是struts-config.xml
在<struts-config>里面配置<form-beans>,<action-mappings>.
最重要是配置<form-beans>里面的<form-bean>和<action-mappings>
内的<action>
<form-beans>主导数据获取。<action>定义业务处理方式


关键说明
1.login.jsp中form表单里属性action="/login.jsp"是根据struts-config.xml里的
action配置，<action path="/login">.追源，在web.xml中的struts的配置中。接受*.do
的请求响应

2.login.jsp中对应的字段必须和loginForm类的变量一致

3.Forward中的跳转，键值对name，path；其中loginAction.java中的返回值类型对应name

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

struts1
actionServlet:
1.在web.xml中引入ActionServlet
<servlet>
    <servlet-name>action</servlet-name>  
    <servlet-class>org.apache.struts.action.ActionServlet</servlet-class>  
    <init-param>
        <param-name>config</param-name>
        <param-value>/WEB-INF/struts-config.xml</param-value>
    </init-param>
    <init-param>
        <param-name>debug</param-name>  
        <param-value>2</param-value>  
    </init-param>
    <load-on-startup>2</load-on-startup>  
</servlet>

action:
actionForm:
actionMapping:
actionForward:
2.servlet根据请求到web.xml中进行匹配，struts只有一个servlet。程序要怎么选择
使用action呢？在struts-config.xml中一一对应
action中path就是截取到的url，type就是action的路径，name是action对应的form
<form-beans>中可以配置多个form，<action-mappings>中可以配置多个action
    <struts-config>
        <form-beans>
           <form-bean name="logonForm" type="com.tgb.struts1.form.LogonActionForm"></form-bean>
        </form-beans>
        <action-mappings>
          <action path="/logon" type="com.tgb.struts1.LogonAction" name="logonForm" scope="request>
            <forward name="success" path="/success.jsp"></forward>
            <forward name="error" path="/error.jsp"></forward>
          </action>
        </action-mappings>
    </struts-config>

'form',就是表单数据  必须继承ActionForm

'action'就是控制跳转 必须继承Action


1.项目启动后，根据web.xml的配置信息，初始化ActionServlet。

2.ActionServlet初始化时读取struts-config.xml的信息。
一定要把struts-config.xml加入到web.xml中去，否则程序无法读取其中的内容;

3.客户端发送请求，ActionServlet截取url(截取到logon)，根据读取的配置信息，找到logon对应的action的配置。

4.通过action中的name属性得到对应的ActionForm，实例化form，将表单数据赋值给form，并调用form的validate方法进行验证。

5.验证通过后，实例化相应的action，并执行action中指定的方法

6.根据action中方法的返回值，从配置信息中找到对应的转向信息(jsp页面或者是其他的action方法)。



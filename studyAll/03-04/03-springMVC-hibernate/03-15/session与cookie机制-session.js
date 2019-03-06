会话跟踪常用技术session,cookie

'session保存在服务器上'{
	
	getAttribute(String key);//获取session  getAttribute(String key)
	setAttribute(String kry,Object obj);//保存session setAttribute(String key)

	request.getSession();//从servlet中获取session对象
}

//如下设置session
HttpSession session=requset.getSession();'他是HttpSession'//获取servlet传来的session对象
session.setAttribute("loginTime",new Date());//保存键为loginTime的session

(Date)session.getSession("loginTime");//获取键为loginTime的session

//jsp中是Session
'servlet客户端页面跳转'
response.sendRedirect(request.getContextPath() + "/welcome.jsp");
'session常用的内置方法'{
	void setAttribute(String attribute, Object value);//设值
	String getAttribute(String attribute);//取值
	Enumeration getAttributeNames();//获取所有属性名  getAttributeNames
	void removeAttribute(String attribute);//移除 
	long getLastAccessedTime();//返回最后活跃时间
	void setMaxInactiveInterval(int second);//设置超时时间单位是秒
	int getMaxInactiveInterval();//获取超时时间
	void invalidate();//使该session失效
}

//Tomcat中Session的默认超时时间为20分钟。
//通过setMaxInactiveInterval(int seconds)修改超时时间。
//可以修改web.xml改变Session的默认超时时间。例如修改为60分钟：
<session-config>
   <session-timeout>60</session-timeout> <!-- 单位：分钟 -->
</session-config>

'修改文件：禁止Session使用Cookie作为识别标志'
文件路劲
WebRoot/context.xml（没有就新建）
<?xml version='1.0' encoding='UTF-8'?>

<Context path="/sessionWeb"cookies="false">
</Context>

或者tomcat全局的cong/context.xml
<!-- The contents of this file will be loaded for eachweb application -->
<Context cookies="false">
    <!-- ... 中间代码略 -->
</Context>
bean:write
把'后台'提交到前台的'内容显示出来'；
bean:write常用的属性有'如下几个'：
1。name，用来指定属性的名字
2。filter，用来指定是否屏蔽到属性值的HTML格式
3。property，用来指定name所代表的对象的属性名字
4。format，用来指定显示的时间，数字，日期等的格式


<%@ page language="java" contentType="text/html; charset=GB18030"  
	pageEncoding="GB18030"%>  
<%@ taglib prefix="bean" uri="http://struts.apache.org/tags-bean"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">  
<title>测试Beanwrite标签</title>
</head>
<body>
<li>测试Beanwrite标签</li>
<hr>
普通string输出:<br>
string(jsp):<%=request.getAttribute("string") %><br>
string(taglib):<bean:write name="string"/>
<hr>
输出html文件：<br>
html(default):<bean:write name="html"/><br>
html(filter="true"):<bean:write name="html" filter="true"/><br>
html(filter="false"):<bean:write name="html" filter="false"/><br>  
<hr>
输出date：<br>
date(default):<bean:write name="date"/><br>  
date(format="yy-MM-dd HH:mm:ss"):<bean:write name="date" format="yy-MM-dd HH:mm:ss"/><br>  
<hr>
输出number：<br>  
number(default):<bean:write name="number"/><br>  
number(format="###,###.###"):<bean:write name="number" format="###,###.###"/><br>  
number(format="###,###.000"):<bean:write name="number" format="###,###.000"/><br>  
<hr>  
输出User：<br>  
Name:<input type="text" value=" <bean:write name="user" property="username"/> " ><br>  
Age:<input type="text" value=" <bean:write name="user" property="age"/> "><br>  
Group:<input type="text" value=" <bean:write name="user" property="group.name"/> "><br>  
</body>
</html>



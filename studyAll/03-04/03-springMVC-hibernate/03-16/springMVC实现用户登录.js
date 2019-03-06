'主要是session的处理'
在控制器上注入@SeseionAttributes("loginUser")
这个就是'把loginUser''加入到session'中的意思

只要在登录成功后把后台数据提到attribute中就好了
model.addAttribute("loginUser",u);
"就把u中的内容作为session放到了前台"

这种方式想要删除session就用remove
model.asMap().remove("loginUser");

写登录过滤器，在没有session的时候踢回登录页面;
先加载filter再加载servlet  web.xml加载顺序 
ServletContext -> context-param -> listener -> filter -> servlet
servlet中的doFilter方法在请求url时执行

//实现 Filter接口
'重写doFilter方法'
'判断有没有session'，'没有就用sendRedirect()';提到其他页面
//doFilter
1.filter在HttpServletRequest到达servlet之前，拦截HttpServletRequest
2.根据需要检查HttpServletRequest，也可以修改HttpServletRequest头和数据。
3.在Respons到达之前拦截response，对其做检查和修改

init(FilterConfig config);//用于完成对filter的初始化
destory();//用于销毁filter前，做资源回收
doFilter(request response);//实现过滤功能，该方法就是对每个请求及响应增加的额外处理。
chain.doFilter(request,response);

/*权限相关*/
在jstl标签中判断字符为空
<c:if test="${not empty loginUser}">
	内容
</c:if>


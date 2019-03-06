'C标签中的值：'
1。取得后台'session中的值'；
2。取得'request'中的值;request.setAttribute("HH","hah");

判断c标签为空用not empty   取用c标签的值用 ${sessionKey}
<c:if test="${not empty CURRENT_OFFICE_ACCOUNT}" >
	<span class="navbar-brand">欢迎${CURRENT_OFFICE_ACCOUNT}：登陆</span>
</c:if>
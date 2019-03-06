HttpServletRequest对象——封装'请求'对象
(1)请求行：请求类型/请求路径/参数/http协议--GET/demo/test?username=XX HTTP/1.1
(2)请求消息头
(3)（前一个表单所获得的数据作为参数封装到请求信息中）getPatrameter(参数名)参数//获取表单数据
(4)（消息实体内容）getInputStream()得到字节输入流
	getReader——得到字符输入流
	最后用流对象.read()获取消息实体内容
{
	getPatrameter（）获取表单参数	
	getInputStream（）.read（）获取消息实体内容
	getReader（）.read（）获取消息实体内容
}

HttpServletResponse对象——封装'应答'对象
（1）状态行 HTTP/1.1 200 OK
	Response.setStatus(HttpServletRespones.SC_OK)自己写或者由系统自动生成状态码
（2）相应消息的消息头//获得消息信息头
		Context-Type
			Respones.setContextType("text/html");
		Refresh:
			Response.setHeader("Refresh","2;URL=page.html");	
（3）消息实体内容//获得实体内容
通过输出流对象进行设置//获得文件流{
	getOutputStream //返回Servlet引擎创建的字节输出流对象
	getWrite 返回Servlet引擎创建的字符输出流对象
}
response.getOutputStream() 字节输出流对象-二进制数组
response.getWrite()字符输出流对象——纯文本
getOutputStream和getWriter这两个方法互相排斥，调用了其中的任何一个方法后，就不能再调用另一方法。
需要两个jar包   'commons-fileload;commons-io'	

在add方法参数中加上文件类参数 'MUltipartFile attach'
'method=requestMethod.post'
前台方面用
 	enctype="multipart/formdata"
	<input type="file" name="attach"/>

在bean.xml中配置文件上传支持
<bean id="multipartResolver" class="CommonsMulti">
	<property name="maxUploadSize" value="5000000"></property>
</bean>


后台得到路径后，用FileUtils上传文件
String path=httpServletRequest.getServletContext().getRealPath();
File f=new File(path+"/"+attach.getInputStream(),f)
FileUtils.copyInputStreamToFile(attach.getOriginalFilename());


使用json
@ResponseBody；  method=requestMethod.get.params="json"
前台请求参数时候，把路径末尾加上?json

'servlet相关'{
	getServletContext();//得到web应用中的上下文，在这个上下文中
	有一些方法可以用来得到相关的很多内容  
}
servletContext{
	getRealPath("/");//获取系统绝对路劲
	getResource("WEB-INF/config.xml");//获取文件
}

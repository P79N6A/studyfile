'分为两步操作'
1.在'web页面添加上传输入项'
2.在'servlet中读取上传文件的数据并保存在本地硬盘中'

//input type="flie"  enctype="multipart/form-data" method="post"
1.web端上传 {
	'input输入项的属性必填，否则浏览器不会发送上传文件数据'
	'必须把form的enctype属性设为multipart/form-data,这样浏览器就把文件流带到http请求中'
	'表单提交方式必须post'
}

2.服务器获取文件	{
	'不能通过传统方式获取multipart/form-data类型的表单,必须用输入流' 必须用流来获取
}

//用已经封装好的jar包
Apache-Commons-fileupload,处理表单上传的开源组件，使用Commmoms-fileupload需要Commons-io包的支持

fileupload组件工作流程 {
	1。客户端post文件流在request中
	2。服务端获取request中的流
	3.解析器将form中的每一个file项各自封装为FileItem
	4.判断FileItem是否是普通表单项isFormField,返回true是普通表单项；普通表单项通过getFileName获取表单名，getString获取表单项值
	5.isFormField返回false是用户上传的数据流，通过getInputStream获取上传文件的数据，通过getName获取上传文件的文件名
}

3.通过File file = new File(filePath);来定义文件的名字和位置 {
	file.transferTo(targetFile);
	//可以通过transferTo将文件复制到指定的文件下(此文件指定了路径和名字)；已存在会覆盖
}
file.transferTo(targetFile);//transferTo接收到的文件传输给指定的目标文件
//可以把文件复制到文件系统（一个位置），将内容保存到目标文件


我们在上传表单和文件的时候，需要将表单和文件分开处理
一般都是先上传文件的；
然后再单独处理剩下的表单，不要一起处理；
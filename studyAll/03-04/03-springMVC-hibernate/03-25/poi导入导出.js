	'File的构造函数是有参数的，参数指定File位置'//首先创建文件路径，再根据路径创建文件
	
	String filePath = "D:/test1/test2/test3";
	File file = new File(filePath);
	// 创建目录	exists
	if(!file.exists()){
		file.mkdirs();// 目录不存在的情况下，创建目录。
	}
	System.out.println("执行结束"+filePath);
	//文件输出流的构造方法也是有参数的，需要指定输出位置和文件名
	FileOutputStream out = new FileOutputStream(file+"/x.xls");

	flie.exists();目录存在返回true 反之false//exists 判断文件是否存在
	flie.mkdirs();创建目录//创建file文件指定的路径

	导出方案:
	1.把文档导出来，作为零时文件放在指定路径；
	2.在前台去此处下载文档，由于去服务器拿文件，所以需要知道服务器的
	全局url：协议（http）：ip：端口：path
'web文件上传原理'

//处理上传的文件，其实是web早就把文件上传到服务器了，
//我们用上传处理函数，来处理，将文件放到正确的位置

'处理函数都是用服务端语言来实现的'

首先在前端有一个form表单
<form action="do_file_upload.php" method="post" enctype="multipart/form-data">
	<p>Pictures:
	<input type="file" name="picture" />
	<input type="submit" value="Send" />
	</p>
</form>
//这里只是把文件传到后台(服务器)，在后台是怎样被处理的，就需要用java，php，c等来做了

UEditor是一款好用的web编辑器

下载网址：http://ueditor.baidu.com/
一般下载UBuilder版本即可

共有四大模块'基本','插入','格式化','表格'，根据需求选择需要的功能模块，
'隐藏功能最好是全选'，语言选择zh-cn(中文的对应码)，服务端版本有三个'PHP','.NET','JSP'，根据需求来选
我们解压缩下载下来的UEditor压缩包。双击打开index.html,这是一个完整的样例demo，可以在这里演示需要的模块

'使用UEditor创建编辑器'
1。引入两个js文件'editor_config.js'和'editor_all.js'
2.js创建一个可编辑区域，必须要有id，类型必须为text/plain（如下）
<div>
	<script id="editor" type="text/plain" name="test">
</div>

3.实例化编辑器（代码如下）
<script type="text/javascript">
	var ue=UE.getEditor('editor');
</script>


要想将UEditor应用到项目中，我们还要对编辑器的路径进行设置。
1.打开editor_config.js文件，找到window.UEDITOR_HOME_URL
在这里我们需要设置路径，可以是相对路径，也可以是绝对路径
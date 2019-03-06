<frameset/>标签
使用frameset可以在一个浏览器窗口显示不止一个页面
<frameset cols="25%,75%">
	<frame src="frame_a.htm">
	<frame src="frame_b.htm">
</frameset>
'引入页面不能有body'
frameset可选属性
{
	cols{
		%:定义列的尺寸
	}
	rows{
		%:定义行的尺寸
	}
}

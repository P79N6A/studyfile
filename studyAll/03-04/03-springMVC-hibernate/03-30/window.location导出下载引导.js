$.ajax({
	type : "post",
	url :"exportExcel",
	data : jsontext,
	success : function(data, textStatus) {
		window.location=data.imageurl;
	},
	complete : function(XMLHttpRequest, textStatus) {
		// HideLoading();
	},
	error : function() {
		// 请求出错处理
	}
});

window.location=data.imageurl;

'window.location'{
	1.获得当前页面的地址(URL);
	2.把浏览器重新定位新页面;
}

方法{
	href:返回当前页面整个url
	Parhname:返回url路径名
	Assign(String);加载新文档
}

赋值
window.location=url;//打开新页面，如果页面对应是文档，则会下载文档；
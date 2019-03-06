$.ajax({
	type : "post",
	url :"getOrderList",
	data : jsontext,
	async:false,
	success : function(data, textStatus) {
		
	}
});

async:false,//默认是true，为异步方式，这样在ajax数据返回过程中，
//继续执行之后的脚本，到触发ajax里的sucess，会执行两个线程

//false表示同步，这个ajax请求只在sucess之后才执行之后的脚本
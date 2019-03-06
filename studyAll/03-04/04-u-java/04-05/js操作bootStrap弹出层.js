显示：$('#myModal').modal('show');

隐藏：$('#myModal').modal('hide');

开关：$('#myModal').modal('toggle');

事件：$('#myModal').on('hidden', function () {
	
});

//关闭弹出层
function closePup(){
	alert("关闭");
	$('#myModal').modal('hide');
	$('#myModal').on('hidden', function (){
		alert("ddd");
	});
}


显示：$("#myModel").modal('show');
影藏：$("#myModel").modal('hide');
开关：$('#mymodel').modal('toggle');
//事件：
$('#myModel').on('hidden',function(){
	alert("xdx");
});


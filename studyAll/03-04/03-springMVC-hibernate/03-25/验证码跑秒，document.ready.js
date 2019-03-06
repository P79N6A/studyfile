var countdown=60;
function settime(){
	if (countdown == 0) {
    	$("#subtn").removeAttr("disabled");
    	$("#subtn").html("再次获取"); 
        countdown = 60; 
        return;
    } else {
    	$("#subtn").attr("disabled","disabled");
    	$("#subtn").html("重新发送(" + countdown + ")"); 
        countdown--; 
    }
	setTimeout(
		function(){
			settime();
	    },1000
	);
};


'在这个document中的事件，会在页面dom元素加载完成之后，会立即加载，并且在页面内容加载前加载'
$(document).ready(function(){
	//在这个document中的事件，会在页面dom元素加载完成之后，会立即加载，并且在页面内容加载前加载
});


javaScript setTimeout()函数
'在指定时间(毫秒)后，执行'
setTimeout(
	function(){};//执行的方法
	1000;//等待的时间
)

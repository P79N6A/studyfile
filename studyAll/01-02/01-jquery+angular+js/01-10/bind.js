//bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。
$("p").bind("click",function(){
	alert($(this).text);
});
$("#name").bind("mouseenter mouseleave",function(){
	$(this).toggleClass("entered");
});
//多个事件，进行处理 
$("button").bind({
	click:function(){
		$("p").slideToggle();
	},
	mouseover:function(){
		$("body").css("background-color","red");
	},
	mouseout:function(){
		$("body").css("background-color","#FFFFFF");
	},
});
$("button").bind({
	click:function(){
	},
	mouseover:function(){
		$("body").css("background-color","red");
	},
	mouseout:function(){
		$("body").css("background-color","red");
	}
});
//触发事件前，传递参数(可以是对象) bind("click",{foo:"bar"},func);
//$("button").bind("click",{foo:"bar"},func);
$("p").bind("click",{
	foo:"bar"},
handler);
function handler(event){
	alert(event.data.foo);
}
//通过返回false取消默认行为return false
$("form").bind("submit",function(){
	return false;
});

//preventDefault()只取消默认行为
$("form").bind("submit",function(event){
	event.preventDefault();
});
//stopPropagation();只阻止一个事件起泡
$("form").bind("submit",function(event){
	event.stopPropagation();
});

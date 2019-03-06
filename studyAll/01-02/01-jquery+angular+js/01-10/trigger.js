//触发 input 元素的 select 事件：
$("button").click(function(){
  $("input").trigger("select");
});
//trigger() 方法触发被选元素的指定事件类型。

//使对应事件立即触发，
$("p").trigger("change",function(msg1,msg2){
});

//可以给一个事件传递参数
$("p").bind("myEvent",function(event,sg1,sg2){
	alert(sg1+"*"+sg2);
}).trigger("myEvent",["11","22"]);

//提交第一个表单
$("from:first").trigger("submit");

//trigger  bind
//trigger触发事件  是指有动作的行为 比如click mouseover keydown
//而hide show没有动作不属于事件
//触发点击事件用和不用trigger的区别
$("p").click(function(){
	console.log("world");
});
//用的话显得麻烦  但是用的话trigger能够传递参数
$("p").click(function(){
	console.log("world");
}).trigger("click");

//bind为对象添加处理程序 并规定事件发生时运行的函数
//将事件和函数绑定到对象
//type可以是任何字符串浏览器有的事件自动触发，没有的需要用trigger来触发
//type中有。字符这个点用来分割事件和命名空间
("p").bind("type",function(){
	
});
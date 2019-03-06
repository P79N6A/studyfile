$("p").bind("myEvent",function(event,msg1,msg2){
	console.log(msg1+" "+msg2);
});
$("p").trigger("myEvent",["1","w"])
//触发change事件；触发change事件
$("p").trigger("change");
//自定义事件
$("p").bind("event",function(event,msg1,msg2){
	consol.log(msg1+"s"+msg2);
})
//trigger作用就是触发事件
$("p").trigger("event",["msg1","msg2"]);
//触发js内置事件
$("p").trigger("change");

/***************/
//使事件立即触发
/*立即触发select事件*/
$("input").trigger("select");
/*立即触发change事件*/
$("p").trigger("change");
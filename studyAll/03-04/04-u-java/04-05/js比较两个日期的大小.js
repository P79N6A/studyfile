//将两个日期转化为时间戳，比较时间戳能得出时间的大小
var dateBeg=((new Date($("#myModal #begin_time").val().replace(/-/g,'/')).getTime())/1000);
var dateEnd=((new Date($("#myModal #end_time").val().replace(/-/g,'/')).getTime())/1000);
if(dateEnd<=dateBeg){
	alert("结束时间不能小于开始时间");
	return;
}

替换字符串//通过正则表达式
String.replace(/-/g,'/');


//获取1970到Date的毫秒数
Date.getTime();
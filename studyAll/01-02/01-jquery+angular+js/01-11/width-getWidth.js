width([val|fun]);取得'第一个'匹配'元素'当前计算的'宽度值'	
//val即css中的‘width’ width([val|fun]);width
//function(index, height)返回用于设置宽度的一个值 接收元素的索引值和旧元素的宽度作为参数

//例子：获取第一段的宽
$("p").width();
//例子：把所有段落宽度设置为20；
$("p").width(20);//用function描述
$("button").click(function() {
	$("p").width(
		function(n, c) {
			return c + 10;
		}
	);
});
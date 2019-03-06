toggleClass;//存在删除，不存在添加
toggleClass(class|fn[sw]);//用过滤器控制切换元素

//为Jq对象切换'selected'类
$("p").toggleClass("selected");
//(class,switch) 每点击三下加上一次‘highlight’类
//<strong id="test"><strong>
//双击触发
var count=0;
$("test").click(function(){
	$(this).toggleClass("highlight",count++%2==0);
});

//参数是一个返回String的函数,在函数类可以根据过滤器来筛选样式
$("div.foo").toggleClass(function(){

});

//对设置或移除被选元素的一个或多个类进行切换。切换css效果
$("button").click(function() {
	$("p").toggleClass("main");
});
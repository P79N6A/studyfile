//快速变化切换元素可见性，切换后触发一个函数
//slideToggle将段落滑下  slideToggle slideToggle
//600毫秒缓慢将段落滑下
//200毫秒快速将段落滑下
$("p").slideToggle("slow");
$("p").slideToggle("fast",function(){
	alert("你好世界");
});
//slideToggle
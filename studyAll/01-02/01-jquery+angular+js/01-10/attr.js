'设置'或'返回'被选元素的'属性值'
返回文档中所有图像的src属性值
$("img").attr("src");
//为所有图像设置src和alt属性值
$("img").attr({src:"test.jpg",alt:"test Image"});
//为所有图像设置src
$("img").attr("src","test.jpg");
//把src属性的值设置为title属性的
//一个属性名称，
//再有一个返回属性值的函数，第一个参数为当前元素的属性(索引)值，第二个参数返回属性值的函数
$("img").attr("title",function(){
	return this.src;
});
//attr与prop的区别在prop是html元素中存在的属性 attr是给html元素没有的属性赋值

一：取jq对象的值
二：给jq对象赋值
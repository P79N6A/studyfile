overflow;规定'溢出元素'内容区的元素如何处理;
规定溢出元素内容区的内容会如何处理;{
	'auto';    //如果内容剪辑，则显示滚动条，以方便查看其余内容 auto加滚动条
	'scroll';   //内容被剪辑，但是浏览器会显示滚动条
	'hidden';//内容被剪辑，剪辑部分看不到
	'visible';  默认值; //不被剪辑，出现在框外面
	'inherit'; //继承父元素的overflow
};
IE8及更低不支持;
div{
	width:150px; 
	height:150px;
	overflow:scroll;
};

css 背景;//允许纯色做背景;也可以用背景图作背景，创造复杂效果；css
background 简写属性,在一个声明中设置所有的属性;
顺序如下;
background-color;//为元素设置背景色 
background-image;//把图像放入元素背景 background-image
background-repeat;//在页面上对背景图像进行平铺 repeat-x 水平方向平铺 repeat-y 垂直方向平铺 
background-attachment;//fixed 图像不随之滚动 background-attachment;
background-position;//改变图像在背景中的位置 center top bottom right left	
//不设置某一个值也不会出现问题;
body{
	background:red url(test.jpg) no-repeat fixed top;
};
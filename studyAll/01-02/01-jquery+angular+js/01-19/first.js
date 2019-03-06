first();获取第一个元素;
/*
<ul>
	<li>a</li>
	<li>b</li>
</ul>
*/
$("li").first();
//<li>a</li>

":first";只匹配一个元素;
/*
<ul>
	<li>a</li>
	<li>b</li>
</ul>
*/
$("ul li:first");
//返回<li>a</li>;
first()与+"first"的区别,两者都是用于过滤去第一个dom元素用的;只是写法不同;

":first-child";为每一个父元素匹配一个子元素;有几个父元素,就匹配几个子元素;
/*
<ul>
	<li>a</li>
	<li>b</li>
</ul>
<ul>
	<li>a</li>
	<li>b</li>
</ul>
<ul>
	<li>a</li>
	<li>b</li>
</ul>
*/
$("ul li:first-child");
//返回[<li>a</li>,<li>a</li>,<li>a</li>]
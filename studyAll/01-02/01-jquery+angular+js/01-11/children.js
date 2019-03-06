children([expr]);'取得'对象元素的'子元素'的'集合'；只考虑子元素，不考虑孙，重孙元素
//获取Jq对象的子元素集合，单单子元素

//例子：查找div中的每一个子元素
//<p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
$("div").children();
//return [<span>Hello Again</span>]
//在每一个div中找。select的类
//<div><span>Hello</span><p class="selected">Hello Again</p><p>And Again</p></div>
$("div").children(".select");
//return [<p class="selected">Hello Again</p>]

children获取的是一个数组【】；first-child 取第一个
parent获取的是一个数组【】；

eq(1)选择一组中的第一个；

:first   '获取第一个元素'。
:first-child  '选择器'选取属于其'父元素的第一个子元素'的所有元素。
first() 返回'被选元素的首个元素'。
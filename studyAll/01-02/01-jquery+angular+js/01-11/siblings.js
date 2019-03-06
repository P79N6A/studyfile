siblings;//取得一个不包含匹配元素的所有同辈元素的元素集合。
//可以用可选的表达式进行刷选
//例子：找到每个div的所有同辈元素    不包含本身
//<p>Hello</p><div><span>HelloTwo</span></div><p>helloThree</p>
$("div").siblings();$("div").siblings();
//返回[<p>Hello</p>,<p>helloThree</p>]

$("#myTable tr:td").remove();
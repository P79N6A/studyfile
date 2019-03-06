append(content|fun);'向Jq对象''末尾添加内容'
例子：向所有的段落中追加html标记
//<p>I would like to say:</p>
$("p").append("<b>Hello</b>");//$("p").append("<b>Hello</b>")
//结果[<p>I would like to say:<b>Hello</b></p>]
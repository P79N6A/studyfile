"find";
'搜索所有'与指定表达式'匹配的元素;'
用来找出'正在处理的元素的后代元素'+可用"选择器语法来写";
//"从所有段落"开始"查找span元素"。同于
//<p><span>Hello</span>,how are you</p>
$("p span");
$("p").find("span");
//结果是<span>Hello</span>

"next";
取得Jq对象的'同辈元素(不包含匹配者)'的集合;
//<p>1</p><span class="red"><p>22</p></span><div>12</div>
$("p").next();
//结果是[<span></p>22</p></span> ,<div>12</div>]
$("p").next(".red");
//结果是<span class="red"><p>22</p></span>

"nextAll";
查找'当前元素之后(不包括当前元素)'+的所有同辈元素;
//<div></div><div></div><div></div>
$("div:first").nextAll().addClass("blue");
//[<div class="blue"></div>,<div class="blue"></div>]

nextUntil();
查找'当前元素之后'+所有同辈元素;直到'遇到匹配元素'+为止;
//find是查找子元素 next是查找同辈元素
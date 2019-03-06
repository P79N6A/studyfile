parentsUntil//查找Jq对象的父辈元素，直到遇到匹配的那个元素为止 
parentsUntil([expr|element][filter]);
//例子：
/*<ul class="level-1">
<li class="item-i">I</li>
<li class="item-ii">II
  <ul class="level-2">
    <li class="item-a">A</li>
    <li class="item-b">B
      <ul class="level-3">
        <li class="item-1">1</li>
        <li class="item-2">2</li>
        <li class="item-3">3</li>
      </ul>
    </li>
    <li class="item-c">C</li>
  </ul>
</li>
<li class="item-iii">III</li>
</ul>*/
//找到item-a的所有父辈元素不包含level-1

$("li.item-a").parentsUntil(".level-1").css("background",'red');

parent > child;//parent在给定的父元素下匹配所有的子元素
//匹配表单中所有子集的input元素
//<form>
//	<label>Name:</label>
//	<input name="name"/>
//	<fieldset>
//		<label>Newsletter:</label>
//		<input name="newsletter"/>
//	</fieldset>
//</form>
//<input name="none"/>
$("form>input");
parent;'取得包含所有匹配元素（包含他的孙，重孙。。。）'
//返回包含匹配元素的元素集合
//例子：查找每个段落的父元素
//<div><p>Hello</p><p>world<p/></div>
$("p").parent();
//返回 <div><p>Hello</p><p>world<p/></div>

//例子2 查找段落父元素中每一个类名为selected的父元素
//<div><p>Hello</p></div><div class="selected"><p>Hello Again</p></div>
$("p").parent(".selected");
//返回<div class="selected"><p>Hello Again</p></div>

parents;//取得祖先元素元素集合
//取得一个包含着所有匹配元素的祖先元素的元素集合（不包含根元素）。可以通过一个可选的表达式进行筛选 

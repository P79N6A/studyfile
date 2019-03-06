Layui'提倡返璞归真'，'遵循于原生态'的'元素书写规则'，所以通常而言，
你仍然是'在写基本的HTML'和'CSS代码'，不同的是，在'HTML结构'上及'CSS定义'
上'需要小小遵循'一定的'规范'。

【CSS'内置公共基础类'】

类名（class）	说明
布局
'layui-main'	用于'设置一个宽度为 1140px '的'水平居中块'（无响应式）
'layui-inline'	用于'将标签设为内联块状元素'
'layui-box'	用于'排除一些UI框架'（如Bootstrap）'强制'将全部'元素设为'box-sizing: border-box'所引发的尺寸偏差'
'layui-clear'	用于'消除浮动'（一般不怎么常用，因为layui几乎没用到浮动）
辅助
'layui-icon'	用于'图标'
'layui-elip'	用于'单行文本溢出省略'
'layui-unselect'	用于'屏蔽选中'
'layui-disabled'	用于设置元素'不可点击状态'
'layui-circle'	用于'设置元素为圆形'
'layui-show'	用于'显示块状元素'
'layui-hide'	用于'隐藏元素'
文本
'layui-text'	定义'一段文本区域'（如文章），该'区域内的特殊标签'（如'a'、'li'、'em'等）将'会进行''相应处理'
'layui-word-aux'	'灰色''标注性文字'，'左右会有间隔'
背景色
'layui-bg-red'	用于设置'元素赤色背景'
'layui-bg-orange'	用于设置元素'橙色'背景
'layui-bg-green'	用于设置元素'墨绿色'背景（主色调）
'layui-bg-cyan'	用于设置元素'藏青色'背景
'layui-bg-blue'	用于设置元素'蓝色'背景
'layui-bg-black'	用于设置元素经典'黑色'背景
'layui-bg-gray'	用于设置元素经典'灰色'背景

【CSS命名规范】
class命名前缀：'layui，连接符：-'，如：class="layui-form"

命名格式一般分为两种：
一：'layui-模块名-状态'或'类型'，
二：'layui-状态或类型'。因为有些类并非是某个模块所特有，他们通常会是一些公共类。
	如：一（定义'按钮的原始风格'）：class="layui-btn layui-btn-primary"、
		二（定义'内联块状元素'）：class="layui-inline"

大致记住这些简单的规则，会让你在填充HTML的时候显得更加得心应手。
另外，如果你是开发Layui拓展（模块），你最好也要遵循于类似的规则，
并且请勿占用Layui已经命名好的类，假设你是在帮Layui开发一个markdown编辑器，
你的css书写规则应该如下：

【HTML规范：结构】
'Layui'在'解析'HTML'元素时'，必须充分'确保'其'结构是被支持的'。以Tab选项卡为例：
<div class="layui-tab">
<ul class="layui-tab-title">
  <li class="layui-this">标题一</li>
  <li>标题二</li>
  <li>标题三</li>
</ul>
<div class="layui-tab-content">
  <div class="layui-tab-item layui-show">内容1</div>
  <div class="layui-tab-item">内容2</div>
  <div class="layui-tab-item">内容3</div>
</div>
</div>
你如果'改变了结构'，极有可能'会导致Tab功能''失效'。所以在'嵌套HTML的时候'，
你应该'细读''各个元素模块'的'相关文档'（如果你不是拿来主义）

【HTML规范：常用公共属性】
很多时候，'元素'的'基本交互行为'，都是'由模块自动开启'。
但'不同的区域'可能'需要触发''不同的动作'，这就'需要'你'设定'我们所'支持的自定义属性'
来作为'区分'。如下面的 'lay-submit'、'lay-filter'即为'公共属性'
（即以 'lay-' '作为前缀'的'自定义属性'）：
<button class="layui-btn" lay-submit lay-filter="login">登入</button>    

'目前'我们的'公共属性如下'所示（即'普遍运用于''所有元素上的属性'）
'lay-skin'	定义'相同元素'的'不同风格'，如'checkbox的开关风格'
'lay-filter'	'事件过滤器'。你可能会在很多地方看到他，他一般是用于'监听特定的自定义事件'。
		你可以把它看作是一个'ID选择器'
'lay-submit'	定义一个'触发表单提交的button'，不用填写值






















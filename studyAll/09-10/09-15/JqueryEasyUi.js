//调出弹出框
$('#editUserInfo').show().dialog({
	//
});


属性名      		属性值类型 	描述 									默认值 
title       		string  			窗口的标题文本。 				New Window 
collapsible 	boolean 		定义是否显示可折叠按钮。 	true 
minimizable boolean 		定义是否显示最小化按钮。 	true 
maximizable boolean 		定义是否显示最大化按钮。 	true 
closable    	boolean 		定义是否显示关闭按钮。 		true 
closed      		boolean	 	定义是否可以关闭窗口。 		false 
zIndex      	number  		窗口Z轴坐标。 					9000 
draggable   	boolean 		定义是否能够拖拽窗口。 		true 
resizable   	boolean 		定义是否能够改变窗口大小。 true 
shadow      	boolean 		如果设置为true，在窗体显示的时候显示阴影。 true 
inline      		boolean 		定义如何布局窗口，如果设置为true，窗口将显示在它的父容器中，否则将显示在所有元素的上面。 false 
modal      		boolean 		定义是否将窗体显示为模式化窗口。 true 


buttons 对话框底部窗口
可用值有：
1) 一个数组，每一个按钮的属性都和linkbutton相同。
2) 一个选择器指定按钮栏。 

form的clear是清空表单的意思
$obj.form('clear');//清空from表单


datagrid的option方法是得到或设置datagrid的所有属性
$('#tab_list').datagrid('options')


//datebox设置时间
$('#starttime').datebox({
	//触发onSelect事件
    onSelect: function(date){  
        alert(date);  
    }
});  

easyui datagrid
easyui datagrid 表格组件列属性formatter和styler使用方法

//如果不做处理，则默认表格DOM的样式如下
<td field="code">
	<div style="text-align:left" class="datagrid-cell datagrid-cell-c1-code">
	     文字
	</div>
</td>
//formatter用来改变默认dom的样式
formatter: function(value, row, index){
    if (value == "007") {
        return '<font color="red">' + value + '</font>';
    }
    else {
        return value;
    }
}
无论'formatter'出何种形式，'格式化'出'的DOM'一定都是'被包含在默认'的'div标签'内
在写formatter函数时要保证有值返回，否则单元格没有内容可展示，所以if的时候别忘了else
'formatter'函数'不'会'作用在'列属性'checkbox为true的单元格上'，checkbox列是组件预留的。

'styler' 它只是'利用jQuery的css'函数'修改'默认'td'标签'的样式'
styler: function(value, row, index){
    if (value == "007") {
        return 'background-color:blue;';
    }
}

frozenColumns
作用是冻结某些列
js
frozenColumns:[[
{field:'no',title:'编号',align:'left'}, 
{field:'name',title:'名称',align:'left'} 
]]

html
<thead frozen="true">  
<tr>  
    <th field="itemid" width="80">Item ID</th>  
    <th field="productid" width="80">Product ID</th>  
</tr>  
</thead>  

如果grid的宽高采用的是自适应，也就是设置了fit和fitColumns，那么grid列的width就不要设置了.否则可能冻结列设置没有效果


'1 window('open')'
经过设置后的弹出窗口
window.open('page.html', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')   //该句写成一行代码

//jquery easyUi
//1、标记创建窗口（window）。
扩展自 $.fn.panel.defaults。通过 $.fn.window.defaults 重写默认的 defaults。
<div id="win" class="easyui-window" title="My Window" style="width:600px;height:400px"
    data-options="iconCls:'icon-save',modal:true">
    Window Content
</div>

//2使用javascript
<div id="win"></div>
$('#win').window({
    width:600,
    height:400,
    modal:true
});

//3打开和关闭窗口（window）。
$('#win').window('open'); // open a window
$('#win').window('close'); // close a window

//4通过 ajax 加载窗口内容。
$('#win').window('refresh', 'get_content.php');
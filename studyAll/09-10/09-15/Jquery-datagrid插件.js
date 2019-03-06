'Jquery datagrid插件:' 
getSelected：取得'第一个选中行'数据，如果没有选中行，则返回 null，否则返回记录。
getSelections：取得'所有选中行'数据，返回元素记录的数组数据。
getChecked：取得'checkbox选择行'的数据，返回元素记录的数组数据。

getSelected跟getSelections是'选中行'，
选中行的意思就是，我们单击到某一个行。这个时候该行的背景色为黄色，就证明我们选中了该行。
而getChecked是'选择行'。
而选择行的意思就是，我们在该行放置了一个checkbox按钮，我勾选了这个按钮，因此也可以将选择行称为勾选行更贴切一些！


jquery: $('#TabId').datagrid({
})//jquery建表插件的用法
//把表格放在id为'TabId'的table中
// http://zhidao.baidu.com/link?url=y-uKxmkPJSPV5bfCC9AK1Vq-LDECFtJ70oGJBrhgP4X5NDsZiEpUby_QcFeVmSAFLPQ1HHtpRxne1ZU14gLnO4LjSKxgYfwg28me3A5Eoc_


'jquery-easyui'
$.form('clear');//清空表单

'调出弹出框'
$('#editUserInfo').show().dialog({
	//
});

'制表属性'
属性名      		属性值类型 	描述 									默认值 
title       	string  			窗口的标题文本。 				New Window 
collapsible 	boolean 		定义是否显示可折叠按钮。   		true 
minimizable     boolean 		定义是否显示最小化按钮。 	 		true 
maximizable     boolean 		定义是否显示最大化按钮。 	 		true 
closable    	boolean 		定义是否显示关闭按钮。 	 		true 
closed      	boolean	 	    定义是否可以关闭窗口。 	 		false 
zIndex      	number  		窗口Z轴坐标。 			 		9000 
draggable   	boolean 		定义是否能够拖拽窗口。 	 		true 
resizable   	boolean 		定义是否能够改变窗口大小。 		true 
shadow      	boolean 		如果设置为true，在窗体显示的时候显示阴影。 true 
inline      	boolean 		定义如何布局窗口，如果设置为true，窗口将显示在它的父容器中，否则将显示在所有元素的上面。 false 
modal      		boolean 		定义是否将窗体显示为模式化窗口。 true 


'buttons 对话框底部窗口'
可用值有：
1) 一个数组，每一个按钮的属性都和linkbutton相同。
2) 一个选择器指定按钮栏。 


'表格组件列属性formatter和styler使用方法'
//如果不做处理，则默认表格DOM的样式如下
<td field="code">
	<div style="text-align:left" class="datagrid-cell datagrid-cell-c1-code">
	     文字
	</div>
</td>

formatter用来'改变默认dom的样式'
formatter: function(value, row, index){
    if (value == "007") {
        return '<font color="red">' + value + '</font>';
    }else {
        return value;
    }
}
无论formatter出何种形式，格式化出的'DOM一定都是被包含在默认的div标签内'
在写formatter函数时要保证有值返回，否则单元格没有内容可展示，所以if的时候别忘了else
formatter函数不会作用在列属性checkbox为true的单元格上，checkbox列是组件预留的。

style 它只是利用jQuery的css函数'修改默认td标签'的'样式'
style: function(value, row, index){
    if (value == "007") {
        return 'background-color:blue;';
    }
}


'frozenColumns'
作用是'冻结'某些'列'
'js'
frozenColumns:[[
	{field:'Number',title:'编号',align:'left'}, 
	{field:'name',title:'名称',align:'left'} 
]]
'html'
<thead frozen="true">
<tr>  
    <th field="itemid" width="80">Item ID</th>  
    <th field="productid" width="80">Product ID</th>  
</tr>  
</thead>  


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

'datagrid'的'option'方法是'得到'或'设置datagrid的'所有'属性'
$('#tab_list').datagrid('options');

//JQery eazy-ui 中dataGrid控件获取pageSize,pageNumber等方法
'获取下拉'列表'框'的'值'方法：$('#tabId').datagrid('getPager').data("pagination").options.pageSize;  
如果要获取当前的页，只需要把pageSize 改变为pageNumber即可。
要'获取其他属性'，只需要'改变pageSize为相应'的'属性即可'。



'模块之间的互相调用'
1.A按照顺序写入注册模块，然后暴露出来。
2.B引用A，同时按照顺序写入注册模块。这样就能在模块之间互相调用了

'1.html页面请求后台'
用这种方式往后台请求数据   提交给 'BusinessCenter4ItemManager'的'curruserItem_pageQuery'方法
url : context+'/jsonServlet?method=interfase.manager__ItemManager.curruserItem_pageQuery',

//表单传参
queryParams:{
	params:$("#queryForm").toJson()
}
toJSON() 方法可以将 Date 对象转换为字符串，并格式化为 JSON 数据格式。

/*
在 jQuery 中，fn 其实就是 JavaScript 中 propotype 的一个别名，$ 是 jQuery 的别名，所以
$.fn.pluginName 等同于 jQuery.prototype.pluginName
$.fn.pluginName 表示创建一个 jQuery 的属性，通俗的说是写一个 jQuery 函数
pluginName 才是函数名
*/

/*
jQuery.extend(object);为扩展jQuery本身扩展方法
jQuery.fn.extend(object);给jQuery对象扩展方法
*/

'2.往后台传参'
//1.这种方式传递一个map
url : context
+ '/jsonServlet?method=interfase.manager__BusiManager.pageQueryAppBusinessInfo',
queryParams : {
	params : json.params
},

//这样可以直接传递一个appItem类到后台
json.appItem = {};
json.appItem.itemId = '100';
$.post(context+'/jsonServlet?method=interfase.manager__ItemManager.updateAppItemStatus', json, function(data){

});


'3后台控制器manager接收参数'
//注意参数一定要和manager声明一致
@BusinessDescriptor(//
        name = "商机建议",//
        desc = "更新商机信息",//
        paramsDesc = {"appBusinessInfo=商机信息"},//一定要申明参数
        returnDesc = "操作结果"//
 )
String updateAdviceAppBusinessInfof(Passport passport/*上下文参数不用指出*/,
		AppBusinessInfo appBusinessInfo/*其它参数必须申明*/);

//JS工具
//1窗口导航
goIndex();//让打开这个弹窗的父窗口刷新
window.parent.location.reload();//让打开这个窗口的父窗口刷新
window.parent.HideThisDiv() //应该是让窗口的父窗口的某个DIV影藏
javascript:history.back() //(-1)就是后退一页

//2设置选中的值
selectedValue(id,value);

//3获取下拉框中被选中的index
var checkedIndex = document.getElementById('currStatus').selectedIndex;


//4,获取下拉框，多选
getSelectValues(datagrid_id, field_id, singleSelect);

getSelected：取得'第一个'选中行数据，如果没有选中行，则返回 null，否则返回记录。
getSelections：取得'所有'选中行数据，返回元素记录的数组数据。
getChecked：取得'checkbox选择行'的数据，返回元素记录的数组数据。

getSelected跟getSelections是'选中行'，
选中行的意思就是，我们单击到某一个行。这个时候该行的背景色为黄色，就证明我们选中了该行。

而getChecked是'选择行'。
而选择行的意思就是，我们在改行放置了一个checkbox按钮，我勾选了这个按钮，因此也可以将选择行称为勾选行更贴切一些！

//5重置表单（清空表单）
$obj.form('clear');

//6查询下拉编码
initLookupValues(lookupType,selId,selectedValue);
查询下拉框所有的值

//7getCheckedValues
获取表格中选定行的指定列

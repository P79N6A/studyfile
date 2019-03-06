最近在使用EasyUI制作一个多选的功能，查找了很多资料，
有几个说的不是很全，所以就尝试去写，今天终于弄出来了，
就把完整的代码 贴出来，部门也是参照前人所说：

'第一步：JSP页面'
①在'data-options'需'要设置的属性或方法'：
idField: 'EMPLOYEE_UUID',	view: fileview,
onCheckAll:addcheckItem,	onCheck:addcheckItem,
onUncheckAll:removeAllItem,	onUncheck: removeSingleItem,

设置datagrid属性的idField主键--唯一主键---checkbox的field 随意设置，
只要不是后台传来的字段

<table id="ttemp" data-options="iconCls:'myicon-table',fitColumns:true,rownumbers:true,toolbar:'#tbemp',
	pageSize:10,pagination:'true',pageList:[10,20,50,100], url:'agentsmanage_findEmployeePerson.do',idField: 'EMPLOYEE_UUID', view: fileview,
	onCheckAll: addcheckItem,onCheck:addcheckItem,onUncheckAll: removeAllItem,onUncheck: removeSingleItem,remoteSort:true">
	<thead>
		<tr>
		 <th data-options="field:'k',checkbox:true,width:20"></th>
		 <th data-options="field:'EMPLOYEE_UUID',hidden:'true'">人员UUID</th>
		 <th data-options="field:'EMPLOYEE_NAME',width:100,halign:'center',align:'center',formatter:_setContent,sortable:true">姓名</th>
		 <th data-options="field:'UNIT_NAME',width:140,halign:'center',align:'center',formatter:_setContent,sortable:true">aaa</th>
		 <th data-options="field:'DEPT_NAME',width:140,halign:'center',align:'center',formatter:_setContent,sortable:true">bbbb</th>
		</tr>
	</thead>
</table>

接下来就是JS了，
说明（引用他人的）：
'建立一个全局'的JavaScript'数组var checkedItems = []'，用来存放选中checkbox的值。

3、'核心方法'，addcheckItem()、removeAllItem(rows)、
	removeSingleItem(rowIndex, rowData)当选中或者取消checkbox时触发
	用来'将checkbox的主键'值保'存在checkedItems数组'，
	或者'从数组中删除对应的id'值，'findCheckedItem(ID)'这个函数用来'查找数组中'
	'是否存在checkbox的值'，'存在则返回id'值，'不存在则返回-1'.

4、'什么时候调用这些方法呢'？分别'在datagrid的' 
	'onCheckAll: addcheckItem,		onCheck: addcheckItem,'
	'onUncheckAll: removeAllItem,	onUncheck: removeSingleItem' 这四个事件中
	调用对应的方法。

5、	'翻页后'如何'给checkbox赋值'呢？关键就在这里，
	'datagrid重写'了$.fn.datagrid.defaults.view的'onAfterRender事件'，
　　因此'在datagrid的view事件'里'绑定这个函数'就OK了。
  	'onAfterRender事件'是'当easyui的元素渲染完毕后执行的事件'，
  	在'这里会调用手写的ischeckItem函数'来'实现对checkbox的赋值！'

$("#maingrid").datagrid({   
    idField: 'id',   
    view: fileview   
});
  
var fileview = $.extend({}, $.fn.datagrid.defaults.view, { onAfterRender: function (target) { ischeckItem(); } });  
  
var checkedItems = [];  
 function ischeckItem() {  
        for (var i = 0; i < checkedItems.length; i++) {  
            $('#maingrid').datagrid('selectRecord', checkedItems[i]); //根据id选中行   
        }  
    }  
  
 function findCheckedItem(ID) {  
        for (var i = 0; i < checkedItems.length; i++) {  
            if (checkedItems[i] == ID) return i;  
        }  
        return -1;  
    }  
  
 function addcheckItem() {  
        var row = $('#maingrid').datagrid('getChecked');  
        for (var i = 0; i < row.length; i++) {  
            if (findCheckedItem(row[i].id) == -1) {  
                checkedItems.push(row[i].id);  
            }  
        }  
    }  
    function removeAllItem(rows) {  
  
        for (var i = 0; i < rows.length; i++) {  
            var k = findCheckedItem(rows[i].id);  
            if (k != -1) {  
                checkedItems.splice(i, 1);  
            }  
        }  
    }  
    function removeSingleItem(rowIndex, rowData) {  
        var k = findCheckedItem(rowData.id);  
        if (k != -1) {  
            checkedItems.splice(k, 1);  
        }  
    }  
  
一下工作操作时，调用上面的方法。  
  
    opts.onSelect = function(rowIndex, rowData){  
       <span style="color:#FF0000;"><strong> addcheckItem();</strong></span>  
        var blId = rowData.ssemExpBlId;  
        var key = getKey(rowIndex);  
        blnos[key] = blId;  
        printLog("onselect " + rowData.ssemBlNo);  
    };  
      
    opts.onUnselect = function(rowIndex, rowData){  
        removeSingleItem(rowIndex, rowData);  
        var blId = rowData.ssemExpBlId;  
        var key = getKey(rowIndex);  
        blnos[key] = false;  
        printLog("onunselect " + rowData.ssemBlNo);  
    };  
      
    //选中全部  
    opts.onSelectAll = function(rows){  
        addcheckItem();  
        $.each(rows,function(i,e){  
            var key = getKey(i);  
            if(!blnos[key]) blnos[key] = e.ssemExpBlId;  
        });  
        //loadcnt();  
    };  
      
    //取消全部  
    opts.onUnselectAll = function(rows){  
        removeAllItem(rows);  
        $.each(rows,function(i,e){  
            var key = getKey(i);  
            if(blnos[key]) blnos[key] = false;  
        });  
        //loadcnt();  
    };  
//批量删除
function destroyItems(items) {
        var row = null;
        if (items == "list") {
            items = checkedItems.join(',');
            row = $('#maingrid').datagrid('getSelections');
        }
        else {
            row = items;
        }
        if (row != null) {
            $.messager.confirm('Confirm', '您确定要删除此记录?', function (r) {
                if (r) {
                    $.post(location.href, { id: items, action: "deletelist" }, function (result) {
 
                        if (result == "1") {
                            $('#maingrid').datagrid('reload');
                        } else {
                            $.messager.show({
                                title: 'Error',
                                msg: result
                            });
                        }
                    });
                }
            });
        }
        else { $.messager.alert('-警告-', '请选择至少一条记录才能进行删除', 'info'); }
    }
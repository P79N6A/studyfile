一，需要引用这四个静态资源文件
<link href="${ctxStatic}/jqGrid/4.6/css/ui.jqgrid.css" rel="stylesheet" />
<link href="${ctxStatic}/jqGrid/4.6/css/default/jquery-ui-1.8.2.custom.css" rel="stylesheet" />
<script src="${ctxStatic}/jqGrid/4.6/js/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="${ctxStatic}/jqGrid/4.6/i18n/grid.locale-en.js" type="text/javascript"></script>

二，加载json数据格式rows是数组，一般查询得出的不是类似的结构数据，因此选择加载list<?>转化的json数组


a 选择用json请求数据之后用本地加载的形式来加载数据

/*第一步先设置好所要显示的表单的样式*/
$("#list5").jqGrid({
	datatype : "local",
	colNames : [ '因子id', '因子名称', '因子type' ],
	colModel : [ {name : 'divisorId',index : 'divisorId',width : '20%',align : "center",sorttype : "float"}, 
	             {name : 'divisorName',index : 'divisorName',width : '40%',align : "left",sorttype : "float"}, 
	             {name : 'divisorType',index : 'divisorType',width : '40%',align : "left",sortable : false} ],
	multiselect : true,/*复选框是否显示*/
	width : 530,/*宽度*/
	height : '100%',/*高度*/
	ExpandColClick : false,
	caption : "因子列表",/*标题*/
	rowNum : pageSize,/*显示条数，不填的话不能全部显示*/
	rowList : [ 12, 24, 36 ],/*分页大小*/
	pager : '#pager5',/*分页对象位置*/
	onPaging : function(pageBtn) {  /*onPaging提供了分页对象的一些事件*/
		var re_page = $("#list5").getGridParam('page');//获取返回的当前页  
		var re_rowNum = $("#list5").getGridParam('rowNum');//获取每页数
		var divisorName = $("#divisorName").val();//获取每页数

		if (pageBtn === "next_pager5")/*下一页按钮*/
			/*调用加载数据的方法*/
			
		if (pageBtn === "prev_pager5")/*上一页按钮*/
			/*调用加载数据的方法*/
			
		if (pageBtn === "records") {/*改变页大小按钮*/
			var textsize = $(".ui-pg-selbox").val();
			/*调用加载数据的方法*/
		}

		if (pageBtn === "user") {/*改变当前页*/
			var textPage = $(".ui-pg-input").val();
			var re_total = $("#list5").getGridParam('lastpage');//获取总页数

			if (textPage < 1)
				textPage = 1;
			else if (textPage > re_total)
				textPage = re_total;

			/*调用加载数据的方法*/
		}
	}
});

/*第二步，给第一步装载数据*/
var url = '${ctx}/get.do';
$.ajax({
	type : "get",
	url : url,
	dataType : "json",
	data : {"pageNo" : pageNo,"pageSize" : pageSize,"divisorName" : divisorName},
	success : function(data) {
		var reader = { //提供了自定义表单数据的方式，自定义数据还有分页信息
			root : function(obj) {return data.list;},
			page : function(obj) {return data.pageNo;},  /*当前页*/
			total : function(obj) {return Math.ceil(data.count / data.pageSize);}, /*总页数*/
			records : function(obj) {return data.count;} /*总条数*/
		}
		//设置grid的参数。有些参数的修改必须要重新加载grid才可以生效，这个方法可以覆盖事件
		$("#list5").setGridParam({data : data.list,localReader : reader}).trigger('reloadGrid');
		
		/*还可以用循环添加的方式*/
//		for ( var i = 0; i <= data.list.length; i++){
//			jQuery("#list5").jqGrid('addRowData', i + 1, data.list[i]);
//		}
		
		//改变弹出框的大小
		$(".ui-pg-input").attr("style", "width:60px;");
		$(".ui-pg-selbox").attr("style", "width:100px;");
		$("#pager5_center").attr("style","white-space: pre; width: 520px;");
		$("#cb_list5").attr("style", "margin:0 0;");
		
	}
});

b.设置各种方法
/*setGridParam 设置数据参数 一个参数 data 用来匹配数据  一个参数reader 用来描述页面 .trigger('reloadGrid')让数据一次加载*/
$("#list5").setGridParam({data : data.list,localReader : reader}).trigger('reloadGrid');

/* getGridParam  获取参数 
 * 获得参数 selarrrow 获取选择的行的行号 
 * lastpage 分页信息的总页数
 * page 分页信息的当前页  
 * rowNum 分页信息的页面积
 */
$('#list5').getGridParam('selarrrow');

/*getRowData 
 * 获取行信息 参数是行号
 */
$('#list5').getRowData(rowId)

/* jqGrid 获取或者设置表单
 * getRowData 获取所有数据
 * clearGridData 清空数据
 * delRowData rowid 按照行号删除
 * addRowData rowid model 按照行号将model加入
 */
$("#list6").jqGrid("getRowData");
$("#list6").jqGrid("clearGridData");
$("#list6").jqGrid('delRowData', rowId);
$("#list6").jqGrid('addRowData', 1, list)


三，自定义文本框样式
1.写formater方法,options表示调用者的行信息
var actFormatter = function(cellvalue, options, rawObject) {
	if(showFlag!='view'){
		var deleteBtn = '<a onclick="delFac(' + options.rowId + ')">删除</a>';
		return deleteBtn;
	}else{
		return "禁止删除";
	}
}

在显示信息中新加一行
{name : "act", width : '15%',align : "center", title : false, formatter : actFormatter,sortable : false }


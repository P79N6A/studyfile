/**
 */
function goIndex(){
	window.parent.location.reload();
}

/**
 * 快速编码
 * @param lookupType 快速编码类型	
 * @param selId	下拉框的id
 */
function initLookupValues(lookupType,selId,selectedValue){
	
	$.post(context + '/jsonServlet?method=interfase.system__FbpLookupTypes.findValues&lookupType='+lookupType+"&tt="+Math.random() ,null, function(data){
		var connectCharList = data['result'];
		var sel = document.getElementById (selId);
		if (!sel){
			return;
		}
		$(sel).html('');
		var opt = document.createElement ("option");//新建select选项
		opt.value='';//给选项赋value
		opt.innerText ='请选择';//给选项赋code
		sel.appendChild (opt); //将选项给节点
		if(connectCharList != null && connectCharList.length > 0){
			for(var i=0; i<connectCharList.length; i++){
				var connectChar=connectCharList[i];
				var code = connectChar.lookupCode;
				var name = connectChar.meaning;
				opt = document.createElement ("option");
				if(code==selectedValue){
					opt.selected=true;		 
				}
				opt.value=code;
				opt.innerText =name;
				sel.appendChild (opt); 
			}
		}
	});
}

/**
 * setTimeout 设置一个时间，时间一到，就执行一个指定的方法
 * 重置iframe的高度
 */
function iframeReSize(){
	var parentFrame=parent.document.getElementById('iframepage');
	// 控制iframepage的高度
	var t=setTimeout(function(){
		parentFrame.style.height='630px';
		var sHeight=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		if(sHeight>1000){
			parentFrame.style.height=sHeight+'px';
		}else{
			parentFrame.style.height=sHeight+100+'px';
		}
		// console.log(parentFrame.style.height);
		clearTimeout(t);
	},200)
}

/**
 * 序列化元素，返回JSON对象 参数：flag 空元素是否系列化成空字符串
 */
$.fn.toJson = function (flag) {
	var json = {};//新建json对象
	var fields = this.serializeArray();
	$.each(fields, function () {
		if (json[this.name]) {//判断是否存在这个json属性
			if (!json[this.name].push) {//如果这个属性是数组对象
				json[this.name] = [json[this.name]];//就初始化对象
			}
			if (flag || (!flag && this.value != "")) {//给这个属性赋上值
				json[this.name].push(this.value || "");//给这个属性赋上值
			}
		} else {//如果不存在这个属性
			if (flag || (!flag && this.value != "")) {
				json[this.name] = this.value || "";//新建属性，这个属性赋上值
			}
		}
	});
	return json;
};

/**
 * 获取URL参数
 * 
 * @param name
 * @returns
 */
'$.extend({})':为'扩展jQuery类本身'.'为类添加新'的'方法'；
其实就是它扩展的方法直接用$.来调用;
$.extend({getUrlParam:function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) 
		return unescape(r[2]); 
	return null;
}});


/*
 * 摘要说明：增删改查的按钮操作方法 使用方法：选填 @author pjw
 */
function edit_handle(id,path){
	location.href=path+ (path.indexOf("?")==-1 ? "?" : "&") +'id='+id;  // 链接到一个方法去操作
}

function upgrade_handle(id,path){
	location.href=path+(path.indexOf("?")==-1 ? "?" : "&") +'id='+id+"&upgrade=1";
}

function add_handle(path){
	location.href=path;
}


function detail_handle(id,path){
	location.href=path+'?id='+id;
}

function btn_back(path){
	location.href=path;
}

/**
 * 重置表单
 * 
 * @param form_id
 * 表单ID
 */
function btn_reset(form_id){
	var checkBox = new Array();
	var index = 0;
	$('#'+form_id+" input[checked='checked']").each(function(){
		checkBox[index++] = this;//将checked的checkBox全部选出来
	});
	$('#'+form_id).form('clear');
	$.each(checkBox, function(){//制为非选中
		$(this).attr('checked', false);
	});
	var selectObj = $("#"+form_id+" select");//jquery 选中select
	$.each(selectObj, function(){
		$(this).val("");
	});
}


function btn_reset_free(form_id){
	var checkBox = new Array();
	var index = 0;
	$('#'+form_id+" input[checked='checked']").each(function(){
		checkBox[index++] = this;
	});
	// $('#'+form_id).form('clear');
	$.each(checkBox, function(){
		$(this).attr('checked', 'checked');
	});
	var selectObj = $("#"+form_id+" select");
	$.each(selectObj, function(){
		$(this).val("");
	});
	
	
	var inputObj = $("#"+form_id+" input");
	$.each(inputObj, function(){
		$(this).attr("checked",false); 
		$(this).val("");
	});
	
	var textareaObj = $("#"+form_id+" textarea");
	$.each(textareaObj, function(){
		$(this).val("");
	});
}
/**
 * 获取表格中选定行的指定列
 * 
 * @param datagrid_id
 *            表格ID
 * @param field_id
 *            指定列ID(列名)
 * @returns {String} value1,value2,value3,……
 */
function getCheckedValues(datagrid_id, field_id, singleSelect){
	var values = null;
	var rows = $('#'+datagrid_id).datagrid('getChecked');
	if(rows.length>0){
		values = '';
		$.each(rows, function(){
			values += (this[field_id] + ',');
		});
		if(values.length>0){
			values = values.substring(0, values.length-1);
			if(null!=singleSelect && true == singleSelect && null != values.match(/\,/)){
				$.messager.alert('提示','不能同时选择多行！','info');
				values = null;
			}
		}
	}else{
		// $.messager.alert('提示','没有选中行！','info');
		values = null;
	}
	return values;
}

/**
 * 初始化Select
 * 
 * @param id
 *            select控件ID
 * @param typeCode
 *            下拉列表类型
 * @param _array
 *            接收值的数组
 */
function initSelect(id,typeCode, _array,callback){
	var obj = $("#"+id);
	obj.html('');
	$.ajax({
			url : context + '/jsonServlet?method=Widget.select&typeCode='+typeCode+'&abe='+Math.random(),
			success:function(data){
				if(data.code==0){
					$.each(data.result, function(){
						$.each(this, function(index, value){
							if(null!=_array){
								_array[index] = value;
							}
							obj.append("<option value='"+ index + "'title='"+value+"'>" + value + "</option>");
						});
					});
				}
				if(null!=callback){
					callback();
				}
			},
			async : false,
			dataType : 'json'
	});
}

function conventnull(operaValue){
	if(operaValue == null || operaValue == '' || operaValue =='undefined'){
		operaValue = '';
	}
	return operaValue;
}
function conventtime(operatime){
	if(operatime == null || operatime == '' || operatime ==undefined){
		operatime = ' ';
	}else{
		operatime=operatime.substring(0,operatime.indexOf(' '));
	}
	return operatime;
}
function conventtime4(operatime){
	if(operatime == null || operatime == '' || operatime ==undefined){
		operatime = ' ';
	}else{
		operatime=operatime.replace("/[]/g", "").substring(0,4);
	}
	return operatime;
}

function initSelects(id,typeCode, _array,callback){
	var obj = $("#"+id);
	obj.html('');
	$.get(context + '/jsonServlet?method=Widget.select&typeCode='+typeCode, function(data){
		if(data.code==0){
			$.each(data.result, function(){
				$.each(this, function(index, value){
					if(null!=_array){
						_array[index] = value;
					}
					if(value=="--选择--"){
						
					}else if(value=="人民币"){
						obj.append("<option selected='selected' value='"+ index + "'>" + value + "</option>");
					}else if(value=="立即付款"){
						obj.append("<option selected='selected' value='"+ index + "'>" + value + "</option>");
					}else if(value=="手工支付"){
						obj.append("<option selected='selected' value='"+ index + "'>" + value + "</option>");
					}else if(value=="电子"){
						obj.append("<option selected='selected' value='"+ index + "'>" + value + "</option>");
					}else if(value=="中国"){
						obj.append("<option selected='selected' value='"+ index + "'>" + value + "</option>");
					}else if(index=="YINHANGZHANGHU"){
						obj.append("<option selected='selected' value='"+ index + "'>" + value + "</option>");
						$("#registrationAttachment").find('#fileTypeCode').val(index);
					}else{
						obj.append("<option  value='"+ index + "'>" + value + "</option>");
					}
				});
			});
		}
		if(null!=callback){
			callback();
		}
	});
}

/**
 * 初始化快码数组
 * 
 * @param typeCode
 *            快码类型
 * @param _array
 *            接收值的数组
 */
function initArray(typeCode, _array,callback){
	/*
	 * $.get(context + '/jsonServlet?method=Widget.select&typeCode='+typeCode,
	 * function(data){ if(data.code==0){ $.each(data.result, function(){
	 * $.each(this, function(index, value){ if(null!=_array){ alert(value);
	 * _array[index] = value; } }); }); } if(null!=callback){ callback(); } });
	 */
	//alert(Math.random());
	
	$.ajax({
			url : context + '/jsonServlet?method=Widget.select&typeCode='+typeCode+'&abe='+Math.random(), 
			success:function(data){
		 
				if(data.code==0){
					$.each(data.result, function(){
						$.each(this, function(index, value){
						 
							if(null!=_array){
								_array[index] = value;
							}
						});
					});
				}
				if(null!=callback){
					callback();
				}
			},
			async : false,
			dataType : 'json'
	});
 
}


/**
 * 转换以分号间隔快码
 * 
 * @param value
 *            值
 * @param _array
 *            接收值的数组
 */
function splitArray(value,array){
	
	var arryder = new Array();
	var valueArry="";
	if(value!="" && value!=undefined){
		
	
	value = value.substring(0, value.length - 1); 
	 
 	arryder=value.split(';') 
	$.each(arryder, function(){ 
		valueArry+=array[this]+"; "; 
	});   

 	valueArry = valueArry.substring(0, valueArry.length - 2); 
 //	alert(valueArry);
	/* if(valueArry=='undefined'){
		 alert(value);
		 valueArry= arryder[value];
	 }*/
	 //alert(valueArry);
	return valueArry; 
	} 
	return " ";
}






/**
 * 获取选中的值或设置选中的值
 * 
 * @param id
 * @param value
 * @returns
 */
function selectedValue(id, value){
	if(value==null){
		return $("#"+id).val();
	}else{
		$("#"+id).val(value);
	}
}

/**
 * 获取选中的index
 * 
 * @param id
 */
function selectedIndex(id){
	$("#"+id).get(0).selectedIndex=index;
}

/**
 * 获取选中的Text
 * 
 * @param id
 * @returns
 */
function selectedText(id){
	return $("#"+id).find("option:selected").text();
}

/**
 * 禁用老数据的选择
 * 
 * @param tabId
 */
function disabledOldData(tabId){
	tabId = "#" + tabId;
	$(tabId).parent().find('input[type="checkbox"]').each(function(){
		if("on"!=$(this).val()){
			$(this).attr('disabled', true);
		}else{
			$(this).unbind("click");
			$(this).bind("click", function(){
				var v = $(tabId).parent().find('input[type="checkbox"][value="on"]').attr("checked");
				v = 'checked' == v ? true : false;
				$(tabId).parent().find('input[type="checkbox"][value=""]').each(function(){
					$(this).attr('checked', v);
				});
			});
		}
	});
}


/**
 * 获取选项的值并给出相应的提示
 * 
 * @param datagrid_id
 *            表格ID
 * @param field_id
 *            指定列ID(列名)
 * @returns {String} value1,value2,value3,……
 */
function getSelectValues(datagrid_id, field_id, singleSelect){
	var values = null;
	var rows = $('#'+datagrid_id).datagrid('getChecked');
	if(rows.length>0){
		values = '';
		$.each(rows, function(){
			values += (this[field_id] + ',');
		});
		if(values.length>0){
			values = values.substring(0, values.length-1);
			if(null!=singleSelect && true == singleSelect && null != values.match(/\,/)){
				$.messager.alert('提示','不能同时选择多行！','info');
				values = null;
			}
		}
	}else{                                                         // 没有选中行
		$.messager.alert('提示','没有选中行！','info');
		values = null;
	}
	return values;
}


/**
 * 判断数据操作人是否有操作权限
 * 
 * @param datagrid_id
 * @param field_id
 *            需要判断的字段
 * @param current_filed
 *            当前用户的字段值
 * @returns {Boolean}
 */
function check_current_user_data(datagrid_id,field_id,current_filed){
	var createdBys = getCheckedValues(datagrid_id, field_id, false);
	var flag = true;
	var createdBysArray = createdBys.split(',');
	if(createdBys.length > 0){
		for(var i=0;i<createdBysArray.length;i++ ){
			if(createdBysArray[i] != current_filed){
				flag = false;
				break;
			}
		}
	}
	if(!flag){
		$.messager.alert('提示','含有没有操作权限的数据！','info'); 
	}
	return flag;
}

/**
 * 长度验证
 */
function checkMaxLength(obj){
	if($(obj).val().length > $(obj).attr('max-length')){
		$.messager.alert('提示', '该值长度最大为：' +　$(obj).attr('max-length') + " ！", 'info', function(){
			$(obj).focus();
			$(obj).select();
		});
	}
}

// 日期格式化
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "H+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// ADD BY chenya JSON对象转字符串
function Obj2str(o) {
	   if(navigator.userAgent.indexOf("MSIE")>0) {  
		   /* 判断浏览器版本 */
			var browser=navigator.appName;
			var b_version=navigator.appVersion;
			var version=b_version.split(";");
			var trim_Version=version[1].replace(/[ ]/g,"");
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
				 return JSON.stringify(o);
			}else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0"){
				 return JSON.stringify(o);
			}else{
				if (o == undefined) {
			        return "";
			    }
			    var r = [];
			    if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
			    if (typeof o == "object") {
			        if (!o.sort) {
			            for (var i in o)
			                r.push("\"" + i + "\":" + Obj2str(o[i]));
			            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
			                r.push("toString:" + o.toString.toString());
			            }
			            r = "{" + r.join() + "}"
			        } else {
			            for (var i = 0; i < o.length; i++)
			                r.push(Obj2str(o[i]))
			            r = "[" + r.join() + "]";
			        }
			        return r;
			    }
			    return o.toString().replace(/\"\:/g, '":""');
			}
	   }else{
		   if (o == undefined) {
		        return "";
		    }
		    var r = [];
		    if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
		    if (typeof o == "object") {
		        if (!o.sort) {
		            for (var i in o)
		                r.push("\"" + i + "\":" + Obj2str(o[i]));
		            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
		                r.push("toString:" + o.toString.toString());
		            }
		            r = "{" + r.join() + "}"
		        } else {
		            for (var i = 0; i < o.length; i++)
		                r.push(Obj2str(o[i]))
		            r = "[" + r.join() + "]";
		        }
		        return r;
		    }
		    return o.toString().replace(/\"\:/g, '":""');
	   }
}
function vendorSite_btn(obj){
	var wd = document.getElementById('vendorSiteLov_iframe').contentWindow;
	var ckvalue = wd.document.getElementById("ck_value").value;
	var ackValueArr = ckvalue.split(',');
	if(ackValueArr.length > 0){	
		$("#orgIdSite").val(ackValueArr[0]);
		$("#orgNameSite").val(ackValueArr[1]);
		$("#mdmVendorSiteIdBank").val(ackValueArr[2]);
		$("#vendorSiteCodeBank").val(ackValueArr[3]);
		$("#vendorSiteCode").val(ackValueArr[3]);
		$("#mdmVendorSiteId").val(ackValueArr[2]);
		$("#orgName").val(ackValueArr[1]);
		$("#orgId").val(ackValueArr[0]);
	}
	wd.document.getElementById("ck_value").value == '';
	closepop(obj);
	// init_datalist(ackValueArr[0]);
	/*
	 * $('#vendorSiteCodeBank').val($("#vendorSiteLov_iframe").contents().find("#ck_value").val());
	 * $("#vendorSiteLov_iframe").contents().find("#ck_value").val("");
	 * closepop(obj);
	 */

}

// 给选择供应商lov 赋值
function vendor_btn(obj){
	var wd = document.getElementById('vendor_iframe').contentWindow;
	var ckvalue = wd.document.getElementById("ck_value").value;
	var ackValueArr = ckvalue.split(',');
	if(ackValueArr.length > 1){
		$('#vendorMdmId').val(ackValueArr[0]);
		$('#vendorName').val(ackValueArr[1]);
		$('#vendorMdmCode_label').text(ackValueArr[2]);
		$('#vendorAlias_label').text(ackValueArr[3]);
		$('#orgcertnumber_label').text(ackValueArr[4]);
		$('#vendorMdmType_label').text(ackValueArr[5]);
		$('#lastUpdateDate_label').text(ackValueArr[6]);
		$('#vatRegistrationNum_label').text(ackValueArr[7]);	
		// 格式时间20130703
		$('#foundtime_label').text(ackValueArr[8]);
	}else{
		$('#vendorMdmId').val('');
		$('#vendorName').val('');
		$('#vendorMdmCode_label').text('');
		$('#vendorAlias_label').text('');
		$('#orgcertnumber_label').text('');
		$('#vendorMdmType_label').text('');
		$('#lastUpdateDate_label').text('');
		$('#vatRegistrationNum_label').text('');	
		$('#foundtime_label').text('');
	}
	wd.document.getElementById("ck_value").value == '';
	closepop(obj);
	init_datalist(ackValueArr[0]);
}
function approvClose(){
	var wd = document.getElementById('approvPeople_iframe').contentWindow;
	var checkp=wd.document.getElementsByName("checkPeople");
	for(var i=0;i<checkp.length;i++){
		if(checkp[i].checked){
			checkp[i].checked=false;
		}
	}
}
// 给审批人LOV赋值
function approvPeople_btn(obj){
	var wd = document.getElementById('approvPeople_iframe').contentWindow;
	var ckvalue = wd.document.getElementById("ck_value").value;
	
	var checkp=wd.document.getElementsByName("checkPeople");
	for(var i=0;i<checkp.length;i++){
		if(checkp[i].checked){
			checkp[i].checked=false;
		}
	}
	
	 if(ckvalue.length>0)
	 {
		$("input[name='ApprovePeoplefullName']").val(ckvalue.split(',')[1]);
		$("input[name='ApprovePeopleId']").val(ckvalue.split(',')[0]);
	 }
	 else
	 { 
	 	$("input[name='ApprovePeoplefullName']").val("");
		$("input[name='ApprovePeopleId']").val("");
	 }
		wd.document.getElementById("ck_value").value ='';
	    closepop(obj);
    }


function download(url){
	location.href = context+"/downloadServlet?file="+url;
}



function ck_selector(selectorname){ 
	var arrChk=$("input[name='"+selectorname+"']");
	var flag = false;
	if(this.checked)
	{
		this.checked=false;
		$(arrChk).each(function(){
	    	if(this.checked){
	    		this.checked=false;
	    	}                      
	    });
	}
	else
	{
		this.checked=true;
		$(arrChk).each(function(){
	    	if(!this.checked){
	    		this.checked=true;
	    	}                      
	    });
	}
}

function single_ck(obj){	
   	if(!this.checked){
   		$("#allckid").attr("checked",false);
   		 var statu=$(obj).val().substring($(obj).val().length-1,$(obj).val().length);
	    if(!(statu==0 || statu==2)){
	    	$.messager.alert('提示', '这条数据不能被处理！', "info");
	    	$(obj).attr("checked",false);
	    }
   		return;
   	} 
}

function single_ck_fin(obj){	
   	if(!this.checked){
   		$("#allckid").attr("checked",false);
   		 var statu=$(obj).val().substring($(obj).val().length-1,$(obj).val().length);
   		return;
   	}  
}



	/**
	 * 获取表格多选数据ID并判断状态是否可以操作 传入选择的cheackbox对象
	 */
	function getselect_Values(arrChk){	
	var values='';
	if(arrChk.length > 0){
		var ckValues = '';
		$(arrChk).each(function(){
			if(this.value != ''){
				ckValues += this.value + ',';	
			}
		});
		if(ckValues.length>0){
			var valueArr = ckValues.split(",");
			for(var i=0;i<valueArr.length;i++){
				var status = '';
				if((i%2)==1){
					status = valueArr[i];
					if(status == '1' || status == '3'){
						values = '';
						return '';
					}
				}else{
					if(valueArr[i]!=''){
						values += valueArr[i]+",";
					}						
				}
			}
		}
	}
	return values;
}
	
	
	/**
	 * 隐藏查询条件
	 * 
	 * @param obj
	 * @param id
	 */
	function shrinkById(icon, elemId){
		var clsName = icon.className,
		elemId=$('#'+elemId);
		if(clsName.indexOf("searchTDown") < 0){
			clsName = clsName.replace(/searchTUp/g,"searchTDown");
			icon.className = clsName;
			elemId.show()
		}else{
			clsName = clsName.replace(/searchTDown/g,"searchTUp");
			icon.className = clsName;
			elemId.hide()
		}
		//iframeReSize();
	}
	
	
	function shagreeById (icon, elemId){
		var clsName = icon.className,
		elemId=$('#'+elemId);
		if(clsName.indexOf("ConDown") < 0){
			clsName = clsName.replace(/ConUp/g,"ConDown");
			icon.className = clsName;
			elemId.show()
		}else{
			clsName = clsName.replace(/ConDown/g,"ConUp");
			icon.className = clsName;
			elemId.hide()
		}
		//iframeReSize();
	}


	// 获得指定层下被选中的的值
	function getSelectes(eid)
	{
		var values="";
		$("#"+eid+" input[checked='checked']").each(function(){
			values+=this.value+",";
		});
		if(values.length>0)
		{
			values=values.substring(0,values.length-1);
		}
		return values;
	}
	/**
	 * 判断值等于NaN或者是‘’的时候返回0
	 * 
	 * @param operaValue
	 * @returns
	 */
	function conventNaN(operaValue){
		if(operaValue == null || operaValue == '' || operaValue =='undefined' || isNaN(operaValue)){
			operaValue = 0;
		}
		return operaValue;
	}
	
	// 撤单
	function goWithdrawals(typeName)
	{ 
		// alert(typeName);
		var type=typeName+"_"+$.getUrlParam("dataId");
					$.post( context + '/jsonServlet',
							{
								method : 'JbpmManager.JbpmManager__stopProcessInstance',
								processId : $.getUrlParam("processId"),
								processName : type 
							},function(data) {
								if(data.code=='0'){
									$.messager.alert("提示", "撤单成功！", "info"); 
									location.href="../vendor/MyHadOrAsk.html?askOrHad=ask";
									 
								}else{
									$.messager.alert("提示", data.msg, "error");
								}
					 	}); 
	}
	
	
 
 
	
	// 回退调用，给跳转地址
	function tiDan(ev) { 
			approve(ev);
	}
		
	// 驱动流程
	function approve(msg,action,url)
	{
		   
		$.messager.confirm('提示', "确认提交？" , function(r){
			if(r){
			$.post(context + '/jsonServlet', 
					{
						method : 'JbpmManager.JbpmManager__complateTask',
						taskId : $.getUrlParam("taskId"),
						advice : msg,
						processId:$.getUrlParam("processId"),
						processName:$.getUrlParam("processName"),
						handleEvent:msg
						
					}, 
					function(data) {
						if(data.code=='0'){
							$.messager.alert("提示", "完成任务", "info");
							location.href='../vendor/baslInfoBackAll.html?checkTab=2';
						}else{
							$.messager.alert("提示", data.msg, "error");
						}
				});
			}
		});
	}
// 验证是否为日期
function isDate(obj){
	alert(obj);
// var reg='/^(\d{4})-(\d{2})-(\d{4})$/';
// if (!reg.test(str)){
// $.messager.alert('提示', '格式输入不正确', 'info', function() {
// $("#"+id).val("");
// });
// }
// return true;
// }
}


// 退单跳转页面修改
function updateTitle(){
 
	if(null!=$.getUrlParam("taskId")){ 
		if(""!=$.getUrlParam("taskId")){
			if("null"!=$.getUrlParam("taskId")){
			$("#titleSwitch").text('退单修改');
			$("#app").remove();
			$("#li_approve").remove();
			
			
			
			 // 得到路由
			$.post(context + '/jsonServlet', 
					{
						method : 'JbpmManager.JbpmManager__getEnvets',
						taskId : $.getUrlParam("taskId")
						
					}, 
					function(data) { 
						if(data.code=='0'){
							var html='';
							var str=data.result.split(';');
							for(var i=0;i<str.length;i++)
							{
								if(str[i] =="重提"){
									html+=' <a href="#;"  class="btnRightG" onclick="tiDan(\''+str[i]+'\')"><b></b>'+str[i]+'</a> ';
								}
							}
							$("#approveUl").append(html);
						}else{
							$.messager.alert("提示", data.msg, "error");
						}
						 
				}); 
			}
		} 
		
		
	
 	}
}


function vendorbackUrl() { 
    if(null!=$.getUrlParam("taskId") && ""!=$.getUrlParam("taskId") && "null"!=$.getUrlParam("taskId")){
    	var vendortype =$.getUrlParam("org_type");
  	    var pssId      =$.getUrlParam("processId");
  	    var id         =$.getUrlParam("id"); 
  	    var taskId     =$.getUrlParam("taskId");
  	    var processName=$.getUrlParam("processName");
  	    var org_type   =$("#segment3").val();
    	 
  	    if(org_type=='6'){
  	    	location.href = 'vendorBack_domestic.html?type=2&processId='+pssId+'&dataId='+id+'&taskId='+taskId+'&processName='+processName+'&org_type='+org_type;
  	    }else{
  	    	location.href = 'vendorBack_domesticExceptAll.html?type=2&processId='+pssId+'&dataId='+id+'&taskId='+taskId+'&processName='+processName+'&org_type='+org_type;
  	    }
    	
    }else{
    	location.href = 'baslInfoDraftAll.html';
    }
	 
}





/**
 * 
 * 弹出新增银行账户信息页面
 * 
 */

function  showAddDivBank(){  

		location.href="../../bank/bankFinanceSite.html?vendorMdmId="+$("#vendorMdmId").val()+"&vendorMdmCode="
				+$("#vendorMdmCode").val()+"&orgcertnumber="+conventnull($("#orgcertnumber").val()) +"&vendorName="
				+$("#vendorName").val()+"&vendorAlias="+$("#vendorAlias").val()+"&vendorType="+"draftType"+"&vendorMdmType="
				+__array_orgType[$("#segment3").val()] +'&taskId='+$.getUrlParam("taskId") +'&processId='+ $.getUrlParam("processId")+'&processName='+ $.getUrlParam("processName"); 

}



// 修改银行账户

function edit_handleChecked_bank(selectorname){

	var arrChk=$("input[name='"+selectorname+"']:checked");

	var flag = false;

	if(arrChk.length > 1){

		// alert("只能选择一行数据编辑！");

		$.messager.alert("提示","只能选择一行数据编辑！","info");

	}else if(arrChk.length==1){

		var ckValues = '';

		$(arrChk).each(function(){

		    var statu=this.value.substring(this.value.length-1,this.value.length);

		    if(!(statu==0 || statu==2)){

		   		$.messager.alert("提示","${m.The_data_cannot_be_processed}！","info");

		    	flag=true;

		    }

			if(this.value != ''){

				ckValues += this.value.substring(0,this.value.length-2) + ',';

			}

		});

		if(!flag){ 
			if(ckValues.length > 0){

				ckValues = ckValues.substring(0, ckValues.length-1);
 
				location.href="../../bank/bankUpdate.html?id="+ckValues+"&vendorMdmId="+$.getUrlParam("id")+
						"&vendorType="+"draftType&type="+$("#segment3").val()+"&processId="+$.getUrlParam("processId")+
						"&taskId="+$.getUrlParam("taskId")+'&processName='+ $.getUrlParam("processName");

			}

		}

	}else{

		$.messager.alert('提示', "请选择行！", 'info'); 

	}

}



function showAddDivSite()

{

		location.href="../../vendorsite/vendorsiteAddNew.html?vendorMdmId="+$.getUrlParam("id")+"&vendorType="+"draftType"
		            +'&taskId='+$.getUrlParam("taskId") +'&processId='+ $.getUrlParam("processId")+'&processName='+ $.getUrlParam("processName");

}


// 修改供应商地点

function edit_handleChecked_vendorsite(selectorname){
	
		var arrChk=$("input[name='"+selectorname+"']:checked");

		var flag = false;

		if(arrChk.length > 1){ 

			$.messager.alert('提示', "只能选择一行数据编辑！", 'info'); 

		}else if(arrChk.length==1){

			var ckValues = '';

			$(arrChk).each(function(){

			    var statu=this.value.substring(this.value.length-1,this.value.length);

			    if(!(statu==0 || statu==2)){
			    	$.messager.alert("包含不能够修改的状态！");
			    	flag=true;
			    }
				if(this.value != ''){
					ckValues += this.value.substring(0,this.value.length-2) + ',';
				}
			});
			if(!flag){
				if(ckValues.length > 0){
					ckValues = ckValues.substring(0, ckValues.length-1);
					// location.href="../../vendorsite/vendorsiteUpdate.html?id="+ckValues+"&vendorMdmId="+$.getUrlParam("id")+"&vendorType="+"vendorType";
					location.href="../../vendorsite/vendorsiteUpdate.html?id="+ckValues+"&vendorMdmId="+$.getUrlParam("id")+"&vendorType="+"draftType&type="+$.getUrlParam("type")+'&taskId='
							+$.getUrlParam("taskId")+'&processId='+ $.getUrlParam("processId")+'&processName='+ $.getUrlParam("processName");
				}
			}
		}else{
			$.messager.alert('提示', "请选择行！", 'info'); 
		}
}



// 修改联系人

function edit_linkman(selectorname){

	var arrChk=$("input[name='"+selectorname+"']:checked");

	if(arrChk.length == 1){

	   var ckValues = arrChk[0].value.split(',')[0];
 
	   location.href="../../linkman/linkmanEdit.htm?"+"dataId="+ckValues+"&vendorType="+"draftType"+"&id="+$.getUrlParam("id")+"&orgType="+$("#segment3").val()
	   +'&taskId='+$.getUrlParam("taskId")+'&processId='+ $.getUrlParam("processId")+'&processName='+ $.getUrlParam("processName");
		   

	}else if(arrChk.length > 1){ 

		$.messager.alert('提示', "只能编辑一条数据！", 'info');  

	}else{

		$.messager.alert('提示', "${m.Please_select_a_line}！", 'info');  

	}

}


function templatesGetUrl(type,urlValue){
	//取绝对路径地址
	var protocol = window.location.protocol;
	var host = window.location.host;
	var pathname = window.location.pathname.split('/');
	var urlName='';
	var url = protocol+"//"+host+"/"+pathname[1];
	   //alert(type);
	   //alert(urlValue);
	if(type=='立项阶段'){
		
		urlName='flowchartdetail1.html';
	}else if(type=='采购阶段'){
		
		urlName='flowchartdetail2.html';
	}else if(type=='签约阶段'){
		
		urlName='flowchartdetail3.html';
	}else if(type=='履行阶段'){
		
		urlName='flowchartdetail4.html';
	}else if(type=='评估阶段'){
		
		urlName='flowchartdetail5.html';
	} 
	
	//location.href=url+urlName+urlValue;	
	 location.href=urlName+urlValue;
}
 
function GetCookie(form_id){  
 
       var selectObj = $("#"+form_id+" input");
	    $.each(selectObj, function(){
	    	var name=""; 
		    var value="";
		    name=$(this).attr("id");
		    var cookie = ";"+document.cookie.replace(/;\s+/g,";")+";"  
		    var pos = cookie.indexOf(";"+name+"=");  
		    if(pos>-1){  
		        var start = cookie.indexOf("=",pos);  
		        var end = cookie.indexOf(";",start);  
		        value = unescape(cookie.substring(start+1,end));  
		    }  
		    $(this).val(value);
		 });  
}   
function GetCookie_page(name){  
	    var value=0;
		var cookie = ";"+document.cookie.replace(/;\s+/g,";")+";"  
		var pos = cookie.indexOf(";"+name+"=");  
		if(pos>-1){  
			var start = cookie.indexOf("=",pos);  
			var end = cookie.indexOf(";",start);  
			value = unescape(cookie.substring(start+1,end));  
		}  
		return parseInt(value);
}   


  function SetCookie(form_id){
	  var name;
	  var value;
	  var domain;
	  var path;
	  var hour;
	  
	  var selectObj = $("#"+form_id+" input");
	  $.each(selectObj, function(){
	   
	  	name=$(this).attr("id");
	  	value=$(this).val();
	  
	  	var expire = new Date();
		 expire.setTime(expire.getTime() + (hour?3600000 * hour:30*24*60*60*1000));
		document.cookie = name + "=" + value + "; " 
		 + "expires=" + expire.toGMTString()
		+" path="+ (path ? path :"/")
		+ "; " 
		+ (domain ? ("domain=" + domain + ";") : "");
	  	
	  }); 
	
 } 
 function SetCookie_page(name,value){
	  var domain;
	  var path;
	  var hour;
		  var expire = new Date();
		  expire.setTime(expire.getTime() + (hour?3600000 * hour:30*24*60*60*1000));
		  document.cookie = name + "=" + value + "; " 
		  + "expires=" + expire.toGMTString()
		  +" path="+ (path ? path :"/")
		  + "; " 
		  + (domain ? ("domain=" + domain + ";") : "");
  } 
  function DelCookie(form_id,reset) {
	  var name;
	  var domain;
	  var path;
	  var selectObj = $("#"+form_id+" input");
 
	  if(null==$.getUrlParam("cookietype") ||reset!= undefined){  
		   
		  $.each(selectObj, function(){
			   
			      name=$(this).attr("id");  
				  document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path="+ (path ? path :"/")+ "; " + (domain ? ("domain=" + domain + ";") : "");
			  }); 
	  }
 }
  function DelCookie_page(name,reset) {
	  var domain;
	  var path;
	  if(null==$.getUrlParam("cookietype") ||reset!= undefined){  
		  document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path="+ (path ? path :"/")+ "; " + (domain ? ("domain=" + domain + ";") : "");
	  }
  }
 
   //合同性质下拉
	function initConNatute(conNatureId,selectedValue){
		var objSrc = $("#"+conNatureId);
		$(objSrc).append("<option value=''>请选择</option>");
		$.ajax({
			url : context + '/jsonServlet?method=interfase.system__FbpConNatute.getAllFbpConNatute&tt='+Math.random(),
			success:function(data){
				if(data.code==0){
					$.each(data.result, function(index){ 
						if(selectedValue==this.natuteOid){
							$(objSrc).append("<option value='"+this.natuteOid+"' selected='true'>"+this.natuteName+"</option>");
						}else if(selectedValue==this.natuteName){
							$(objSrc).append("<option value='"+this.natuteOid+"' selected='true'>"+this.natuteName+"</option>");
						}else{
							$(objSrc).append("<option value='"+this.natuteOid+"'>"+this.natuteName+"</option>");
							
						}
					});
				}else{
					
				}
				
			},
			async : false,
			dataType : 'json'
		});
		
	}
	function initfileDown(fileInfo){
		 var fileReturn = '';
		 var fileNames;
		 if (fileInfo) {
		        fileNames = fileInfo.split(";");
				for ( var i = 0; i < fileNames.length; i++) {
					var fileTemp = fileNames[i].split(',');
					fileReturn = fileReturn+"   " + '<a href="' + context
							+ '/downloadServlet?file=' + fileTemp[1]
							+ '" target="_Blank">' + conventnull(fileTemp[0])
							+ '</a>'
				}
		}
		return fileReturn;
	 }

  
  
  
  
  
  
  
  
$.fn.serializeObject = function() {
	var o = {}; 
	var a = this.serializeArray(); 
	$.each(a, function() { 
		if (o[this.name]) { //表单中可能有多个相同标签，比如有多个label，那么你在json即o中插入第一个label后，还要继续插入，那么这时候o[label]在o中就已经存在，所以你要把o[label]做嵌套数组处理
			if (!o[this.name].push) { //如果o[label]不是嵌套在数组
				o[this.name] = [ o[this.name] ]; //将o[label]初始为嵌套数组，如o={a,[a,b,c]}
			}
			o[this.name].push(this.value || ''); //将值插入o[label]
		} else {
			o[this.name] = this.value || ''; //第一次在o中插入o[label]
		}
	}); 
	return o; 
}
  
  
  


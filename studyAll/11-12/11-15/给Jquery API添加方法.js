//给jquery添加表单输入框禁用的方法
$.fn.disable = function() {
	return 
	$(this).find("*").each(function() {
		$(this).attr("disabled", "disabled");
	});
}
'调用： $(".cla").disable()';

//给jquery添加表单输入框启用的方法
$.fn.enable = function() {
	return 
	$(this).find("*").each(function() {
		$(this).removeAttr("disabled");
	});
}

//查找table的某一列的第2个值
//1.先找到列("#id tr")，循环列找到列的行find("td")，定位到行的第几个eq(2);
$("#table_listHtml tr").each(function(){
	  if('销售合同' == $(this).find("td").eq(2).html()){
		  flag1 = true;
	  }
	  if('客户承诺函' == $(this).find("td").eq(2).html()){
		  flag2 = true;
	  }
	  if(flag1&&flag2){
		  return false;
	  }
});


//序列化元素，返回JSON对象 参数：flag 空元素是否系列化成空字符串
//注意：serializeArray() --序列化表单值，创建对象数组。一个或多个元素(input/textarea),或form元素。
//serializeArray() api地址 http://www.w3school.com.cn/tiy/t.asp?f=jquery_ajax_serializearray

'js ||运算符' 
'A||B： A为真返回A，A为假返回B'

$.fn.toJson = function(flag) {
	var json = {};
	var fields = this.serializeArray();
	$.each(fields, function() {
		if (json[this.name]) {
			if (!json[this.name].push) {
				json[this.name] = [ json[this.name] ];
			}
			if (flag || (!flag && this.value != "")) {
				json[this.name].push(this.value || "");
			}
		} else {
			if (flag 
					|| (!flag && this.value != "")) {
				json[this.name] = this.value || "";
			}
		}
	});
	return json;
}

一，
'json-lib-2.4-jdk15.jar'
'JSONArray  用于List转化为json数据'
'JSONObject 用于Map转化为json数据，也可以是实体类（属性：值）'

二，
'spring能够传参json,到后台自动转化为bean'

前端：
$.ajax({
	type:'POST',
	
	url:'save.do',
	
	dataType:'json',
	
	contentType: 'application/json',
	
	data: JSON.stringify(params),
	
	success: function(data){
		console.log(data);
	}

});
'1、JSON.stringify(params)生成json字符串格式的参数，ie浏览器需要加入json2.js库；'
'2、contentType需要设置为application/json；'


后端：
'a. 定义json数据对应的Java类：ConfigurationForm 该类成员结构和名称必须和json字符串中的结构完全一致。'
'b. Controller处理代码：'

@RequestMapping(value="/save", method=RequestMethod.POST)
@ResponseBody
protected Object save(HttpServletRequest request, HttpServletResponse response, '@RequestBody' ConfigurationForm configForm){
	ActionResult actionResult = new ActionResult();
	boolean ret=true;
	
	System.out.println(configForm);
	
	return actionResult;
}





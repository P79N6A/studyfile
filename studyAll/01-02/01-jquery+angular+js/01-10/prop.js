//获取属性值
//判断复选框是否选中，是返回true，反之false 判断是否选中，是返回true 反之返回false
$("input[type='checkbox']").prop("checked");

//禁用所有的复选框
$("input[type:'checkbox']").prop({
	disabled:true
});

//选中所有的复选框
$("input[type:'checkbox']").prop("checked",true);

//通过函数，选中所有复选框
$("input[type='checkbox']").prop("checked",function(i,val){
	return !val;
});
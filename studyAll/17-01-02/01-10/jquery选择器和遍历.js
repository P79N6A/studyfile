//先用tr选择table的所有tr
$("#table_listHtml tr").each(function(){
	//用find选择 该tr下的td用eq(i)选择第几个
	  if('销售合同' == $(this).find("td").eq(2).html()){
		  flag1 = true;
	  }
	  if('客户承诺函' == $(this).find("td").eq(2).html()){
		  flag2 = true;
	  }
	  if(flag1&&flag2){
		  //js中用return false 终止循环 java中用break终止循环
		  return false;
	  }
});
controller

测试接口的url
@RequestMapping(value="/udream/barberWorksRest")
@RequestMapping(value = "/barberWorks701", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })

localhost:8080/udream/barberWorksRest/barberWorks701
在请求中可以去掉声明部分 -> localhost:8080
在参数方面
	//参数全是json格式
{
	"jsonParams": {"barberId":"13434785279","customerId":"1234567","frontPic":"frontPic","backPic":"backPic","workType":"1","projectId":"1234567",hairQuality:"1"},
	"commoninfo": {"clientType": "1","clientVersion": "1.0","sessionKey": "UUID","sign": "MD5","format": "0"}
}

//理发师ID和客户ID不可为空	

//作品类型不能为空

//正反面至少一个不为空

//项目类型不能为空

	 * "barberId" : "理发师ID（long）" ,
	 * "barbershopId" : "理发店ID（long）" ,
	 * "workType" : "（String）作品类型：0:洗发 1:剪发 2:烫发 3:染发 4:养护 5:造型 6:套餐 7:接发" , 
	 * "projectId" : "（long）" , 
	 * "projectName" : "（String）" , 
	 * "projectPrice" : "（BigDecimal）" ,
	 * "customerId" : "（long）" , 
	 * "faceType" : "（String）" ,
	 * "skinColor" : "（String）" , 
	 * "hairQuality":发质
	 * "hairCount":发量

{
"jsonParams": {"barberId":"13434785279","customerId":"123456","frontPic":"frontPic","backPic":"backPic","workType":"1","projectId":"1000000","hairQuality":"hairQuality"}
,"commoninfo": {"clientType": "1","clientVersion": "1.0","sessionKey": "UUID","sign": "MD5","format": "0"}
}
"@RequestMapping"
处理请求地址映射的注解，
用在类上：表示'类下的所有方法以此为父路径'
方法上：表示'该路径执行该方法'

'三大类共6个属性'
//1.value,method
value:指定请求的实际地址，指定的url可以是url template模式
{
	1。具体值。
	2。含有某变量的一类值
	3。可以指定为含正则表达式的一类值
}

method:指定请求的method类型，get，post，put，delete
//2.consumes,produces
consumes：指定'处理请求的提交内容类型'(Content-Type),例如application/json,text/html
produces：指定'返回的内容类型'，仅当request请求头中的(Accept)类型中包含该指定类型才返回
{
	consumes="application/json":只接收Json数据
	produces="application/json":方法仅处理request请求中Accept头中包含了"application/json"的请求	
}

//3.params,headers
params：'指定'request中'必须包含某些参数值'是，才让该方法处理
headers：'指定'request中'必须包含某些指定的header'，才让该方法处理请求
{
	params="myParam=myValue") 仅处理请求中包含了名为"myParam"，值为"myValue"的请求；
	headers="Referer=http://www.ifeng.com/"仅处理request的header中包含了指定“Refer”请求头和对应值为“http://www.ifeng.com/”的请求；
}


'绑定到参数'
'@PathVariable'  //rest风格专用
someURL/{paramId}//将paramId作为参数注解到URL上
@Controller  
//对于绑定id的删除，查看，用这个传参非常方便
@RequestMapping("/owners/{ownerId}")
public class RelativePathUriTemplateController {
  @RequestMapping("/pets/{petId}")
  public void findPet(@PathVariable String ownerId, @PathVariable String petId, Model model) {
	  
  }
}
//这个将ownerId，petId作为参数传给方法

'@RequestHeader、@CookieValue'
@RequestHeader //把request的header部分的值绑定到方法参数上
//请求头
Host							localhost:8080  
Accept						text/html,application/xhtml+xml,application/xml;q=0.9  
Accept-Language		fr,en-gb;q=0.7,en;q=0.3  
Accept-Encoding		gzip,deflate  
Accept-Charset			ISO-8859-1,utf-8;q=0.7,*;q=0.7  
Keep-Alive				300  
//controller
@RequestMapping("/displayHeaderInfo.do") 
public void displayHeaderInfo(@RequestHeader("Accept-Encoding") String encoding, @RequestHeader("Keep-Alive") long keepAlive){
	
}
//把Accept-Encoding的值传给参数encoding；Keep-Alive传给 keepAlive
@CookieValue '将'request 'header中的cookie值绑定''到方法参数上'

@RequestMapping("/displayHeaderInfo.do")  
public void displayHeaderInfo(@CookieValue("JSESSIONID") String cookie)  {
	
}
//即把JSESSIONID的值绑定到参数cookie上。 


'@RequestParam, @RequestBody'
@RequestParam//

@RequestBody//

'@SessionAttributes, @ModelAttribute'
'@SessionAttributes' 该注解用来'绑定HttpSession中的attribute'对象'的值'，便于'在'方法中的'参数里使用'。
//该注解有value、types两个属性，可以通过名字和类型指定要使用的attribute 对象
@ModelAttribute  用于方法上时,过滤器， '调用控制器前''调用该方法'，用于'先请求module'
 用于参数上时 通过'名称对应'，把相应名称的值绑定到注解的参数bean上
要绑定的值来源于{
	@SessionAttributes 启用的attribute 对象上；
	@ModelAttribute 用于方法上时指定的model对象
	上述两种情况都没有时，new一个需要绑定的bean对象，然后把request中按'名称'对应的方式把值绑定到bean中
}

@ModelAttribute  
public Account addAccount(@RequestParam String number) {
	return accountManager.findAccount(number);  
}  
这种方式实际的效果就是在调用@RequestMapping的方法之前，为request对象的model里put（"number",number）；

@RequestMapping(value="/owners/{ownerId}/pets/{petId}/edit", method = RequestMethod.POST)  
public String processSubmit(@ModelAttribute Pet pet) {  
	
}
首先查询 @SessionAttributes有无绑定的Pet对象，若没有则查询@ModelAttribute方法层面上是否绑定了Pet对象，若没有则将URI template中的值按对应的名称绑定到Pet对象的各属性上。
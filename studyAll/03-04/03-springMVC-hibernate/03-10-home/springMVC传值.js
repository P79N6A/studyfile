'接受页面参数用一个String' '对应页面的参数名即可'//

这种'属性名和参数名一样'的可以省略@Paramter  @paramter表明后面的将作为参数，可以直接取来使用
login.do?userName=x
String login(String userName){
	//这里	username是x
}

//后台往前台给数据
1.
login.do?userName=x   url传参后台接受
String login(String userName,map<String object> cont){
	//这里	username是x  往前台写数据，直接用cont就行了，不用用response
	cont.put("username",username);
	return "login";
}

login.jsp中
{username}//为x
2.
login.do?userName=x
String login(String userName,Model model){//Model model 使用model直接往页面传参数
	//这里	username是x
	model.addAttribute("username",username);
	//model.addAttribute();一个参数，使用对象类型做key
	return "login";
}

spring 通过model传值 就是单例

'rest风格'
不在是user?id=12  而是/user/12
delete?id=13   user/13/delete
update?id=14   user/14/update
users
user/users

rest用不同方法对应不同操作
get post put delete

topic/23/delete
String wel(){
	
}

'总结'
在springMVC中，我们要做的最主要的就是把后台的值用Model传到前台使用
最常用的当然是map往前台传参数了
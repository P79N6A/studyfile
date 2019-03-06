会话跟踪常用技术session,cookie

'cookie是放在客户端的'
cookie{
	'每个用户''一个Cookie',可以'判断该用户的状态';每'一个用户有一个Cookie'
	具有'不可跨域名性'
	常用'属性如下'：
	name ：该Cookie的名称，Cookie一旦创建，那么不可修改；
	Object： value 该cookie的值，编码是Unicode字符，就需要为字符编码，二进制数据不用
	int maxAge：有效期，单位是秒 
	boolean secure：是否使用安全协议 
	path
	domain
}
'设置Cookie'

Cookie cookie=new Cookie("username","helloweenvsfei");//新建cooki
Cookie.setMaxAge(Integer.MAX_VALUE);//设置生命周期
response.addCookie(cookie);//输出到客户端

"读取Cookie"
Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
for(Cookie cookie : cookies){
    cookie.getName();	// get the cookie name
    cookie.getValue(); 	// get the cookie value
}

'封装对cookie的读写'

/**
 * 设置cookie
 * @param response
 * @param name  cookie名字
 * @param value cookie值
 * @param maxAge cookie生命周期  以秒为单位
 */
public static void addCookie(HttpServletResponse response,String name,String value,int maxAge){
    Cookie cookie = new Cookie(name,value);
    cookie.setPath("/");
    if(maxAge>0)
    	cookie.setMaxAge(maxAge);
    response.addCookie(cookie);
}

/**
 * 根据名字获取cookie
 * @param request
 * @param name cookie名字
 * @return
 */
public static Cookie getCookieByName(HttpServletRequest request,String name){
    Map<String,Cookie> cookieMap = ReadCookieMap(request);
    if(cookieMap.containsKey(name)){
        Cookie cookie = (Cookie)cookieMap.get(name);
        return cookie;
    }else{
        return null;
    }
}
/**
 * 将cookie封装到Map里面
 * @param request
 * @return
 */
private static Map<String,Cookie> ReadCookieMap(HttpServletRequest request){  
    Map<String,Cookie> cookieMap = new HashMap<String,Cookie>();
    Cookie[] cookies = request.getCookies();
    if(null!=cookies){
        for(Cookie cookie : cookies){
            cookieMap.put(cookie.getName(), cookie);
        }
    }
    return cookieMap;
}

//cookie.setMaxAge(0);表示删除该cookie
删除：
cookie.setMaxAge(0);

//cookie.setMaxAge(-1);
要想'修改Cookie'只能'使用'一个'同名的Cookie'来'覆盖原来'的'Cookie';//修改用同名覆盖
修改：
new 一个重名的cookie覆盖旧cookie

'js操作cookie'cook对象是 '$.cookie'

//前台用document.cookie获取cookie值
<script>document.write(document.cookie);</script>

'JQuery' '操作cookie'
<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script> 

'新增'加一个'cookie':  '$.cookie("cokName","value")';
$.cookie('cokName','value');

当'没有给cook设置时间'，'默认关闭浏览器就关闭了cook'
创建'cookie设置时间是7天'	$.cookie("name","val",{expires:7})
$.cookie('cokName','value',{expires:7});
//创建cookie设置时间是7天,设置路径
$.cookie('cokName', 'value', { expires: 7,path:"/" });

'读取'
$.cookie('cokName');//cookie存在=》value  不存在=》null

'通过设置cookie值为空来删除'
$.cookie("cokName",null);

'参数'
$.cookie{
	expires:int cookie存在时间，单位是天
	secure:boolean 使用安全协议（https）
	raw:false 读写时候自动进行编码与解码 true 不进行编码解码
}

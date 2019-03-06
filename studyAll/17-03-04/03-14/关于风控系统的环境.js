WebSocket protocol '是HTML5'一种'新的协议'。它'实现了浏览器与服务器全双工通信'(full-duplex)。
一开始的'握手需要'借助'HTTP请求完成'。
在浏览器中通过'http仅能实现单向'的'通信',
'comet'可以一定程度上'模拟双向通信',但'效率较低',并需要服务器有较好的支持; 
'flash'中'的socket和xmlsocket'可以'实现真正的双向通信',通过 'flex ajax bridge',
'可以在javascript中使用这两项功能'. 可以预见,如果websocket一旦在浏览器中得到实现,
将会替代上面两项技术,得到广泛的使用.面对这种状况，
'HTML5定义了WebSocket'协议，能更好的'节省服务器资源和带宽'并'达到实时通讯'。

1.在tomcat7中存在WebSocketServlet类（但已经过时），在tomcat8中彻底删除
此处'使用@ServerEndpoint'注解，主要是'将目前的类定义成一个websocket服务器端'
'注解的值'将被'用于监听用户连接的终端访问URL地址'

2.当服务器接'收到客户端'发送的'消息'时'所调用的方法'
该方法可能包含一个javax.websocket.'Session可选参数'
如果'有这个参数'，容器将会'把'当前发送消息'客户端的连接Session注入进去'

3.当一个'新用户连接'时所'调用的方法'
该方法可能包含一个javax.websocket.'Session可选参数'
如果'有这个参数'，容器将会'把'当前发送消息'客户端的连接Session注入进去'

4.当一个'用户断开'连接'时所调用的方法'

注意：
1）demo只能在jdk1.7以上 tomcat7.047以上才能使用
2）需要映入tomcat的jar包


1.参数实体类 RyuTestParamVo.java 和返回实体类 RyuTestInfo.java 
2.mybatis 映射类  RyuTestMapper.java
3.mybatis 映射文件  RyuTestMapper.xml
4.dao层接口 IRyuTestDao.java 和实现类 RyuTestDaoImpl.java //@Repository
5.service层接口 IRyuTestService.java 和实现类 RyuTestServiceImpl.java //@Service
6.控制器 RyuTestController extends BaseController //@Controller
7.添加菜单
8.页面

使用基础类
1.mabatis 映射类 RoleDao

2.添加注解@MyBatisDao，继承CrudDao<T>类 
@MyBatisDao
public interface RoleDao extends CrudDao<Role>
3.service类
public class ArticleService extends CrudService<ArticleDao, Article> 

在控制器中用map往页面传数据
pageNo pageSize totalPage totalCount 
entity(查询参数 一个vo类) page(一段h5代码) list(页面展示类的集合)

'**##**'
@Autowired是根据类型进行自动装配的。
如果当spring'上下文'中存在'不止一个UserDao类型的bean'时，
就会抛出BeanCreationException异常;
如果Spring上下文中'不存在UserDao类型的bean'，
也会抛出BeanCreationException异常。
我们可以使用'@Qualifier'配合'@Autowired'来解决这些问题。如下：
①可能存在多个UserDao实例
'Qualifier指定Bean的名称，变成byName方式获取bean'
@Qualifier("userServiceImpl")  
②可能不存在UserDao实例
@Autowired(required = false)

	//20条  27773
	'http协议下的数据请求'  //需要jar包httpclient4.4.1   httpcore4.4.1 httpmima4.4.1
	HttpClient httpClient = new DefaultHttpClient();
	HttpPost httpPost = new HttpPost(url);

	httpPost.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
	httpPost.setHeader("Accept-Language", "zh-cn,zh;q=0.5");

	List<NameValuePair> params = new ArrayList<NameValuePair>();  
	params.add(new BasicNameValuePair("data", jsonObj.toString()));

	// 设置请求的数据
	httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
	HttpResponse httpResponse = httpClient.execute(httpPost);
	
	if(code==HttpStatus.SC_OK){
		HttpEntity httpEntity = httpResponse.getEntity();
		if(httpEntity!=null){
			String jsonStr = EntityUtils.toString(httpEntity, "UTF-8");
			return jsonStr;
		}
	}
	
	

json的使用 //需要jar包json-lib-2.4-jdk15
js用法					java用法
var a={}; 				JSONObject a = new JSONObject();
a.name="刘奇";			a.put("name", "刘奇");
var b={};   			JSONObject b = new JSONObject();
b.name="zjj";			b.put("name", "zjj");
a.wife=b;				a.put("wife",b);

var c=[];				JSONArray c = new JSONArray();
var d={};				JSONObject d = new JSONObject();
d.color1='red';			d.put("color1", "red");
d.color2='blue';		d.put("color2", "blue");
var e={};				JSONObject e = new JSONObject();
e.color1='green';		e.put("color1", "green");
e.color2='yellow';		e.put("color2", "yellow");
c.push(d);				c.add(d);
c.push(e);				c.add(e);
a.yifu=c;				a.put("yifu",c);

JSONObject.fromObject(jsonStr);//将json字符串转换成json

private static AtomicInteger ai = new AtomicInteger(0);

使用mybatis
1.parameterType可以不用指定，如果参数是一个类，取类的字段，直接拿字段就行 //类.字段 是错的
2.resultType必须指定



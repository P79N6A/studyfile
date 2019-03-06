'HTTP 协议'可能是现在 'Internet' 上'使用得最多'、'最重要的协议'了，越来越多的 'Java 应用程序需要直接通过 HTTP' 协议来'访问网络资源'。
虽然在 JDK 的 java.net 包中已经提供了访问 HTTP 协议的基本功能，但是对于大部分应用程序来说，'JDK 库'本身提'供的功能还不够丰富和灵活'。
'HttpClient' 是 Apache Jakarta Common 下的子项目，用来'提供高效'的、'最新'的、'功能丰富的支持 HTTP' '协议'的'客户端编程工具包'，
并且它支持 HTTP 协议最新的版本和建议。HttpClient 已经应用在很多的项目中，比如 Apache Jakarta 上很著名的另外两个开源项目
Cactus 和 HTMLUnit 都使用了 HttpClient，更多使用 HttpClient 的应用可以参见
http://wiki.apache.org/jakarta-httpclient/HttpClientPowered。
'HttpClient 项目非常活跃'，'使用的人还是非常多的'。目前 'HttpClient 版本是在 2005.10.11 发布的 3.0 RC4' 。
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

应用'HttpClient'来'对付各种''顽固的WEB服务器'
http://blog.csdn.net/ambitiontan/archive/2006/01/06/572171.aspx

一般的情况下我们都是使用'IE'或者'Navigator浏览器'来访问一个WEB服务器，'用来浏览页面''查看信息'或者'提交一些数据'等等。
所访问的这些页面'有的仅仅是一些普通的页面'，'有的需要用户登录后方可使用'，'或者''需要认证'以及是'一些通过加密方式传输'，例'如HTTPS'。
目前我们使用的浏览器处理这些情况都不会构成问题。不过你可能在'某些时候'需'要通过程序'来'访问这样的一些页面'，比如从别人的网页中'“偷”一些数据'；
'利用某些站点提供的页面'来'完成某种功能'，例如说我们想知道'某个手机号码的归属地'而'我们自己又没有这样的数据'，
因此只好借助其他公司已有的网站来完成这个功能，这个时候'我们需要向网页提交手机号码'并'从返回的页面中解析出我们想要的数据来'。
如果对方仅仅是一个很简单的页面，那我们的程序会很简单，本文也就没有必要大张旗鼓的在这里浪费口舌。但是考虑到'一些服务授权的问题'，
很多公司提供的页面往往并不是可以通过一个简单的URL就可以访问的，而'必须经过注册然后登录后方可使用提供服务的页面'，
这个时候就涉及到'COOKIE问题的处理'。我们知道目前流行的动态网页技术例如ASP、JSP无不是通过COOKIE来处理会话信息的。
'为了使我们的程序'能使'用别人所提供的服务页面'，就要求'程序首先登录后再访问服务页面'，这过程就'需要自行处理cookie'，
想想当你用java.net.HttpURLConnection来完成这些功能时是多么恐怖的事情啊！况且这仅仅是我们所说的顽固的WEB服务器中的一个很常见的“顽固”！
再有如通过HTTP来上传文件呢？不需要头疼，这些问题有了“它”就很容易解决了！

我们不可能列举所有可能的顽固，我们会针对几种最常见的问题进行处理。当然了，正如前面说到的，如果我们自己使用java.net.HttpURLConnection
来搞定这些问题是很恐怖的事情，因此在开始之前我们先要介绍一下一个开放源码的项目，这个项目就是Apache开源组织中的httpclient，
它隶属于Jakarta的commons项目，目前的版本是2.0RC2。commons下本来已经有一个net的子项目，但是又把httpclient单独提出来，可见http服务器的访问绝非易事。

'Commons-httpclient'项目就是'专门'设计来'简化HTTP客户端''与服务器进行各种通讯编程'。通过它可以让原来很头疼的事情现在轻松的解决，
例如'你不再管是HTTP或者HTTPS的通讯方式'，告诉它你想使用HTTPS方式，剩下的事情交给httpclient替你完成。
本文会针对我们在编写HTTP客户端程序时经常碰到的几个问题进行分别介绍如何使用httpclient来解决它们，
为了让读者更快的熟悉这个项目我们最开始先给出一个简单的例子来读取一个网页的内容，然后循序渐进解决掉前进中的所有问题。



1． '读取网页(HTTP/HTTPS)内容'
下面是我们给出的一个简单的例子用来'**访问**''某个页面'
/** 
 *最简单的HTTP客户端,用来演示通过GET或者POST方式'访问某个页面'
 */
public class SimpleClient {
public static void main(String[] args) throws IOException {
	  HttpClient client = new HttpClient(); 
      //设置代理服务器地址和端口      
      //client.getHostConfiguration().setProxy("proxy_host_addr",proxy_port); 
      //使用 GET 方法 ，如果服务器需要通过 HTTPS 连接，那只需要将下面 URL 中的 http 换成 https 
      HttpMethod method= GetMethod("http://site.baidu.com/");
      //使用POST方法
      //HttpMethod method = new PostMethod("http://java.sun.com");
      client.executeMethod(method);
      //打印服务器返回的状态
      System.out.println(method.getStatusLine());
      //打印返回的信息
      System.out.println(method.getResponseBodyAsString());
      //释放连接
      method.releaseConnection();
   }
}
在这个例子中'首先创建一个HTTP客户端'(HttpClient)的'实例'，'然后选择提交的方法'是'GET或者POST'，'最后在HttpClient实例上''执行提交的方法'，
'最后从'所选择的提交'方法中读取服务器'反馈'回来的结果'。这就是使用HttpClient的基本流程。其实用一行代码也就可以搞定整个请求的过程，非常的简单！



2．'以GET或者POST方式向网页''**提交参数**'
其实前面一个最简单的示例中我们已经介绍了如何'使用GET或者POST方式'来'请求一个页面'，本小节'与之不同的是''多了'提交时'设定页面所需的参数'，
我们知道如果是'GET的请求方式'，那么所有'参数都直接放到页面的URL后面''用问号与页面地址隔开'，每个'参数用&隔开'，例如：
"http://java.sun.com/?name=liudong&mobile=123456，"
但是当使用'POST方法时'就'会稍微有一点点麻烦'。本小节的例子演示向'如何查询手机号码所在的城市'，代码如下：
/**
 * 提交参数演示 该程序连接到一个用于查询手机号码所属地的页面 以便查询号码段1330227所在的省份以及城市
 */
public class SimpleHttpClient {
	public static void main(String[] args) throws IOException {
		HttpClient client = new HttpClient();
		client.getHostConfiguration().setHost("www.imobile.com.cn", 80, "http");
		HttpMethod method = new getPostMethod(); // 使用 POST 方式提交数据
		client.executeMethod(method); // 打印服务器返回的状态
		System.out.println(method.getStatusLine()); // 打印结果页面
		String response = new String(method.getResponseBodyAsString().getBytes("8859_1"));
		// 打印返回的信息
		System.out.println(response);
		method.releaseConnection();
	}
	/**  
    * 使用 GET 方式提交数据  
    *@return  
    */  
   private static HttpMethod getGetMethod(){  
      return new GetMethod("/simcard.php?simcard=1330227");  
   }
	/**
	 * 使用 POST 方式提交数据
	 * @return
	 */
	private static HttpMethod getPostMethod() {
		PostMethod post = new PostMethod("/simcard.php");
		NameValuePair simcard = new NameValuePair("simcard", "1330227");
		post.setRequestBody(new NameValuePair[] { simcard });
		return post;
	}
}
在上面的例子中页面
http://www.imobile.com.cn/simcard.php
需要一个参数是simcard，这个参数值为手机号码段，即手机号码的前七位，服务器会返回提交的手机号码对应的省份、城市以及其他详细信息。
'GET的提交方法只需要在URL后加入参数信息'，而'POST'则'需要通过NameValuePair类'来'设置参数名称和它所对应的值'。



'3． 处理页面重定向'
在JSP/Servlet编程中'response.sendRedirect方法'就是'使用HTTP协议中的重定向机制'。
它与JSP中的'<jsp:forward …>的区别'在于'后者是在服务器中实现页面的跳转'，也就是说'应用容器加载了'所要跳转的'页面的内容'并'返回给客户端'；
而'前者是返回一个状态码'，这些状态码的可能值见下表，然后'客户端读取需要跳转到的页面的URL'并'重新加载新的页面'。
就是这样一个过程，所以'我们'编程的时候就要'通过HttpMethod.getStatusCode()'方法'判断返回值是否为下表中的某个值'来'判断是否需要跳转'。
'如果'已经'确认需要'进行页面'跳转'了，那么'可以通过读取HTTP头中的location属性'来'获取新的地址'。

状态码      对应 HttpServletResponse 的常量       详细描述
301         SC_MOVED_PERMANENTLY                 页面已经'永久移到'另外一个'新地址'
302         SC_MOVED_TEMPORARILY                 页面'暂时移动到'另外一个'新的地址'
303         SC_SEE_OTHER                         客户端请求的'地址'必须'通过'另外的'URL来访问'
307         SC_TEMPORARY_REDIRECT                同 SC_MOVED_TEMPORARILY
 
下面的代码片段'演示如何处理页面的重定向'
public class SimpleRedirict {
	public static void main(String[] args) throws IOException {
		HttpClient client = new HttpClient();
		client.getHostConfiguration().setHost("www.imobile.com.cn", 80, "http");
		HttpMethod method = getPostMethod(); // 使用 POST 方式提交数据
		client.executeMethod(method); // 打印服务器返回的状态
		System.out.println(method.getStatusLine()); // 打印结果页面
		String response = new String(method.getResponseBodyAsString().getBytes("8859_1"));
		// 打印返回的信息
		System.out.println(response);

		client.executeMethod(method);
		System.out.println(method.getStatusLine().toString());
		method.releaseConnection();
		// 检查是否重定向
		int statuscode = method.getStatusCode();
		if ((statuscode == HttpStatus.SC_MOVED_TEMPORARILY) || (statuscode == HttpStatus.SC_MOVED_PERMANENTLY)
				|| (statuscode == HttpStatus.SC_SEE_OTHER) || (statuscode == HttpStatus.SC_TEMPORARY_REDIRECT)) {
			// 读取新的 URL 地址
			Header header = method.getResponseHeader("location");
			if (header != null) {
				String newuri = header.getValue();
				if ((newuri == null) || (newuri.equals("")))
					newuri = "/";
				GetMethod redirect = new GetMethod(newuri);
				client.executeMethod(redirect);
				System.out.println("Redirect:" + redirect.getStatusLine().toString());
				redirect.releaseConnection();
			} else
				System.out.println("Invalid redirect");
		}

		method.releaseConnection();
	}
	/**
	 * 使用 POST 方式提交数据
	 * @return
	 */
	private static HttpMethod getPostMethod() {
		PostMethod post = new PostMethod("/simcard.php");
		NameValuePair simcard = new NameValuePair("simcard", "1330227");
		post.setRequestBody(new NameValuePair[] { simcard });
		return post;
	}
}

我们可以'自行编写两个JSP页面'，其中'一个页面用response.sendRedirect方法''重定向到另外一个页面'用来'测试上面的例子'。



4． '模拟输入用户名和口令进行登录'
本小节应该说是HTTP客户端编程中最常碰见的问题，'很多网站的内容'都只是'对注册用户可见'的，这种情况下就'必须要求使用正确的用户名和口令登录成功后'，
'方可浏览到想要的页面'。因为'HTTP协议是无状态的'，也就是'连接的有效期只限于当前请求'，请求'内容结束后连接就关闭了'。
在这种情况下'为了保存用户的登录信息'必须'使用到Cookie机制'。以JSP/Servlet为例，当'浏览器请求'一个'JSP'或者是'Servlet的页面'时，
应用'服务器会返回一个参数'，名为'jsessionid'（因不同应用服务器而异），值是一个较长的唯一字符串的Cookie，这个字符串值也就是当前访问该站点的'会话标识'。
浏览器在'每访问该站点的其他页面'时候'都要带上jsessionid'这样的Cookie信息，应用'服务器根据读取这个会话标识'来'获取对应的会话信息'。

对于需要用户'登录的网站'，一般在'用户登录成功'后会'将用户资料保存'在'服务器的会话'中，这样当'访问到其他的页面时'候，'应用服务器''根据'浏览器送上的'Cookie'
中'读取当前请求对应的会话标识'以'获得对应的会话信息'，然后就'可以判断用户资料''是否存在于会话信息中'，如果'存在则允许访问页面'，
'否则跳转到登录页面中'要求用户输入帐号和口令进行登录。这就是一般使用JSP开发网站在处理用户登录的比较通用的方法。
这样一来，对于'HTTP的客户端来讲'，如果'要访问一个受保护的页面'时就'必须模拟浏览器所做的工作'，首先就是'请求登录页面'，然后'读取Cookie值'；
'再次请求登录页面'并'加入登录页所需的每个参数'；最后就是'请求最终所需的页面'。当然在除'第一次请求外其他的请求都需要附带上Cookie信息'
以便'服务器能判断当前请求''是否已经通过验证'。

可是'如果你使用httpclient的话'，你甚至'连一行代码都无需增加'，你'只需要先传递登录信息执行登录过程'，
'然后直接访问想要的页面'，跟'访问一个普通的页面没有任何区别'，因为'类HttpClient已经帮你做了所有该做的事情了'，太棒了！下面的例子实现了这样一个访问的过程。
/**
 * 用来演示登录表单的示例
 */
public class FormLoginDemo {
	static final String LOGON_SITE = "localhost";
	static final int LOGON_PORT = 8080;

	public static void main(String[] args) throws Exception {
		HttpClient client = new HttpClient();
		client.getHostConfiguration().setHost(LOGON_SITE, LOGON_PORT);

		// 模拟登录页面 login.jsp->main.jsp
		PostMethod post = new PostMethod("/main.jsp");
		NameValuePair name = new NameValuePair("name", "ld");
		NameValuePair pass = new NameValuePair("password", "ld");
		post.setRequestBody(new NameValuePair[] { name, pass });
		int status = client.executeMethod(post);
		System.out.println(post.getResponseBodyAsString());
		post.releaseConnection();

		// 查看 cookie 信息
		CookieSpec cookiespec = CookiePolicy.getDefaultSpec();
		Cookie[] cookies = cookiespec.match(LOGON_SITE, LOGON_PORT, "/", false, client.getState().getCookies());
		if (cookies.length == 0) {
			System.out.println("None");
		} else {
			for (int i = 0; i < cookies.length; i++) {
				System.out.println(cookies[i].toString());
			}
		}

		// 访问所需的页面 main2.jsp
		GetMethod get = new GetMethod("/main2.jsp");
		client.executeMethod(get);
		System.out.println(get.getResponseBodyAsString());
		get.releaseConnection();
	}
}
5． '提交XML格式参数'

提交XML格式的参数很简单，仅仅'是一个提交时候的ContentType问题'，

下面的例子演示'从文件文件中读取XML信息'并'提交给服务器''的过程'，该过程'可以用来测试Web服务'。
/**
 * 用来演示提交XML格式数据的例子
 */
public class PostXMLClient {
	public static void main(String[] args) throws Exception {
		File input = new File("test.xml");
		PostMethod post = new PostMethod("http://localhost:8080/httpclient/xml.jsp");

		// 设置请求的内容直接从文件中读取
		post.setRequestBody(new FileInputStream(input));
		if (input.length() < Integer.MAX_VALUE)
			post.setRequestContentLength(input.length());
		else
			post.setRequestContentLength(EntityEnclosingMethod.CONTENT_LENGTH_CHUNKED);

		// 指定请求内容的类型
		post.setRequestHeader("Content-type", "text/xml; charset=GBK");
		HttpClient httpclient = new HttpClient();
		int result = httpclient.executeMethod(post);
		System.out.println("Response status code: " + result);
		System.out.println("Response body: ");
		System.out.println(post.getResponseBodyAsString());
		post.releaseConnection();
	}
}



6． '通过HTTP上传文件'
'httpclient使用'了单独的一个'HttpMethod子类'来'处理文件的上传'，这个类就是'MultipartPostMethod'，该类已经封装了文件上传的细节，
我们要做的仅仅是'告诉它我们要上传文件的全路径即可'，下面的代码片段演示如何使用这个类。

public class HttpPostFile {
	public static void main(String[] args) {
		String targetURL="";
		String targetFilePath="";
		MultipartPostMethod filePost = new MultipartPostMethod(targetURL);   
		filePost.addParameter( "fileName" , targetFilePath);   
		HttpClient client = new HttpClient();  
		  
		// 由于要上传的文件可能比较大 , 因此在此设置最大的连接超时时间   
		client.getHttpConnectionManager(). getParams().setConnectionTimeout(5000);   
		try {
			int status = client.executeMethod(filePost);
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}  
	}
}



7． '访问启用认证的页面'

我们经常会碰到这样的页面，当'访问它的时候'会'弹出一个浏览器的对话框'要求'输入用户名和密码后方可'，
这种'用户认证的方式''不同于'我们在前面介绍的'基于表单的用户身份验证'。'这是HTTP的认证策略'，
'httpclient支持三种认证方式'包括：'基本'、'摘要'以及'NTLM认证'。其中'基本认证最简单、通用''但也最不安全'；
摘要认证是在HTTP 1.1中加入的认证方式，
而NTLM则是微软公司定义的而不是通用的规范，最新版本的NTLM是比摘要认证还要安全的一种方式。

下面例子是从httpclient的CVS服务器中下载的，它简单'演示如何访问一个认证保护的页面'：
  
public class BasicAuthenticationExample {   
   public BasicAuthenticationExample() {   
   }  
   public static void main(String[] args) throws Exception {  
      HttpClient client = new HttpClient();  
      client.getState().setCredentials( "www.verisign.com" , "realm" , new UsernamePasswordCredentials( "username" , "password") );  
  
      GetMethod get = new GetMethod( "https://www.verisign.com/products/index.html" );  
      get.setDoAuthentication( true );  
      int status = client.executeMethod( get );  
      System.out.println(status+ "\n" + get.getResponseBodyAsString());  
      get.releaseConnection();  
   }   
}  



8． '多线程模式下使用httpclient'

'多线程同时访问httpclient'，例如'同时从一个站点上''下载多个文件'。对于'同一个HttpConnection''同一个时间只能有一个线程访问'，
'为了保证多线程工作环境下不产生冲突'，'httpclient''使用了'一个'多线程连接管理器'的'类'：'MultiThreadedHttpConnectionManager'，
要使用这个类很简单，只'需要在构造HttpClient实例的时候传入即可'，

代码如下：
MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();
HttpClient client = new HttpClient(connectionManager);

以后尽管访问client实例即可。



－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
参考资料：
httpclient首页：    http://jakarta.apache.org/commons/httpclient/
关于NTLM是如何工作：  http://davenport.sourceforge.net/ntlm.html

HttpClient入门
http://blog.csdn.net/ambitiontan/archive/2006/01/07/572644.aspx

Jakarta Commons HttpClient 学习笔记
http://blog.csdn.net/cxl34/archive/2005/01/19/259051.aspx

Cookies,SSL，httpclient的多线程处理，HTTP方法
http://blog.csdn.net/bjbs_270/archive/2004/11/05/168233.aspx

原文:http://www.blogjava.net/Alpha/archive/2007/01/22/95216.html
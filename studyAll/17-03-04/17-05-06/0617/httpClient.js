1)   百科名片:
HTTP 协议可能是现在 Internet 上使用得最多、最重要的协议了，越来越多的 Java 应用程序需要直接通过 'HTTP 协议来访问网络资源'。
虽然在 JDK 的 Java net包中已经提供了访问 HTTP 协议的基本功能，但是对于大部分应用程序来说，JDK 库本身提供的功能还不够丰富和灵活。
HttpClient 是 Apache Jakarta Common 下的子项目，用来提供高效的、最新的、功能丰富的支持 HTTP 协议的客户端编程工具包，
并且它支持 HTTP 协议最新的版本和建议。HttpClient 已经应用在很多的项目中，比如 Apache Jakarta 上很著名的另外两个开源项目 Cactus 和 HTMLUnit 
都使用了 HttpClient。现在HttpClient最新版本为 HttpClient 4.1.


2) 'HttpClient 的范围'
'基于HttpCore的客户端HTTP运输实现库'
'基于经典（阻塞）I/O'
'内容无关'


3) 'httpClient 特性'
基于'标准,纯净的java语言'.实现了Http1.0和Http1.1
以可'扩展的面向对象的结构实现了Http全部的方法' (GET, POST, PUT, DELETE, HEAD, OPTIONS, and TRACE).
'支持HTTPS协议'.
通过Http代理建立透明的连接.
利用CONNECT 方法通过Http代理建立隧道的https连接.
Basic, Digest, NTLMv1, NTLMv2, NTLM2 Session, SNPNEGO/Kerberos 认证方案.
'插件式'的'自定义认证方案'.
便携可靠的套接字工厂使它更容易的使用第三方解决方案.
连接管理器支持多线程应用.支持设置最大连接数,同时支持设置每个主机的最大连接数.发现并关闭过期的连接.
插件式的'自定义Cookie策略'.
在http1.0和http1.1中'利用KeepAlive保持持久连接'.
'直接获取服务器发送的response code和 headers'.
'设置连接超时的能力'.
实验性的支持http1.1 response caching.
源代码基于Apache License 可免费获取.


HttpClient'基本功能的使用'

a) 环境准备
从apache下载httpClient;
下载地址: http://hc.apache.org/downloads.cgi;
解压、将lib下的jar导入工程;

b) 几个主要类解释
类名	作用
HttpClient	'HttpClient'代表了'一个http'的'客户端'，HttpClient接口'定义了'大'多数基本的http请求执行行为'.
HttpEntity	'entity'是'发送'或者'接收消息''的载体'。'entities''可以通过''request和response''获取到'.
HttpConnection	'HttpConnection''代表'了'一个http连接'。
 	 
c)    第一个程序
说明: '用get方法访问www.baidu.com并返回内容Code:'

	HttpClient httpclient = new DefaultHttpClient();
	try {
		// 创建httpget.
		HttpGet httpget = new HttpGet("http://www.baidu.com/");
		System.out.println("executing request " + httpget.getURI());
	
		// 执行get请求.
		HttpResponse response = httpclient.execute(httpget);
	
		// 获取响应实体
		HttpEntity entity = response.getEntity();
		System.out.println("--------------------------------------");
	
		// 打印响应状态
		System.out.println(response.getStatusLine());
	
		if (entity != null) {
			// 打印响应内容长度
			System.out.println("Response content length: " + entity.getContentLength());
	
			// 打印响应内容
			System.out.println("Response content: " + EntityUtils.toString(entity));
		}
	
		System.out.println("------------------------------------");
	} catch (Exception e) {
		e.getMessage();
	} finally {
		// 关闭连接,释放资源
		httpclient.getConnectionManager().shutdown();
	}

d)   如何传递参数
说明: 用post方法访问本地应用并根据传递参数不同返回不同结果
Code:

 

Struts2配置：

<package name="Ajax" extends="json-default" namespace="/Ajax">

    <action name="serivceJ" class="com.wanghe.test.TestAction" method="serivceJ" >

       <result  type="json"></result>

    </action>

</package>

 

Action Code：

public void serivceJ() {

        try {

    HttpServletResponse response = ServletActionContext.getResponse();

HttpServletRequest request = ServletActionContext.getRequest();

 System.out.println("request...serivceJ");

        response.setCharacterEncoding("UTF-8");

            String type = request.getParameter("type");

            String c = "none";

            if(type.equalsIgnoreCase("car")){

                c = "Hello:给你一辆宝马";

            }else if(type.equalsIgnoreCase("house")){

                c = "Hello:给你一栋别墅";

            }

           response.getWriter().write(c);

       } catch (IOException e) {

           e.printStackTrace();

       }

    }

TestingCode：

//创建默认的httpClient实例.

HttpClient httpclient = new DefaultHttpClient();

//创建httppost

HttpPost httppost = new HttpPost("http://localhost:8080/myDemo/Ajax/serivceJ.action");

//创建参数队列

List<NameValuePair> formparams = new ArrayList<NameValuePair>();

formparams.add(new BasicNameValuePair("type", "house"));

UrlEncodedFormEntity uefEntity;

try {

    uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");

    httppost.setEntity(uefEntity);

    System.out.println("executing request " + httppost.getURI());

    HttpResponse response;

    response = httpclient.execute(httppost);

    HttpEntity entity = response.getEntity();

    if (entity != null) {        System.out.println("--------------------------------------");

    System.out.println("Response content: " + EntityUtils.toString(entity,"UTF-8"));

System.out.println("--------------------------------------");

           }

       } catch (ClientProtocolException e) {

           e.printStackTrace();

       }catch(UnsupportedEncodingException e1) {

           e1.printStackTrace();

       }catch (IOException e) {

           e.printStackTrace();

       }finally{

             //关闭连接,释放资源

           httpclient.getConnectionManager().shutdown();

       }

输出:

executing request http://localhost:8080/myDemo/Ajax/serivceJ.action

--------------------------------------

Response content: Hello:给你一栋别墅

--------------------------------------

 

 

 

e)    模拟表单登录
说明: 用post方法登录本地应用
Code:

 

Struts2配置：

<package name="staff"  extends="struts-default" namespace="/staff">

       <action name="serivce" class="com.wanghe.test.TestAction" method="serivce">

           <result name="success" >/index.jsp</result>

            <result name="error" >/error.jsp</result>

       </action>

    </package>

 

Action Code：

public String serivceJ() {

HttpServletRequest request = ServletActionContext.getRequest();

 System.out.println("request...serivceJ");

            String username = request.getParameter("username");

String password = request.getParameter("password");

            if(username.equalsIgnoreCase("admin")&& password.equalsIgnoreCase("123456")){

                return "success";

            }

            return "error";

    }

TestingCode：

//创建默认的httpClient实例.

HttpClient httpclient = new DefaultHttpClient();

//创建httppost

HttpPost httppost = new HttpPost("http://localhost:8080/myDemo/Ajax/serivceJ.action");

//创建参数队列

List<NameValuePair> formparams = new ArrayList<NameValuePair>();

formparams.add(new BasicNameValuePair("username", "admin"));

formparams.add(new BasicNameValuePair("password", "123456"));

UrlEncodedFormEntity uefEntity;

try {

    uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");

    httppost.setEntity(uefEntity);

    System.out.println("executing request " + httppost.getURI());

    HttpResponse response;

    response = httpclient.execute(httppost);

    HttpEntity entity = response.getEntity();

    if (entity != null) {        System.out.println("--------------------------------------");

    System.out.println("Response content: " + EntityUtils.toString(entity,"UTF-8"));

System.out.println("--------------------------------------");

           }

       } catch (ClientProtocolException e) {

           e.printStackTrace();

       }catch(UnsupportedEncodingException e1) {

           e1.printStackTrace();

       }catch (IOException e) {

           e.printStackTrace();

       }finally{

             //关闭连接,释放资源

           httpclient.getConnectionManager().shutdown();

       }

会将返回的jsp输出:

executing request http://localhost:8080/myDemo/Ajax/serivceJ.action

--------------------------------------

Response content:

<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>

 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>

<head>

    <title>测试页面</title>

</head>

<body>

    <div>hello:登录成功</div>

</body>

</html>

--------------------------------------

 

 

 

f)     HttpClient连接SSL
1)      生成KeyStore
打开cmd，输入(jdk环境变量当然是配置好的):

keytool -genkey -alias tomcat -keyalg RSA –validity 60  -keystore D:\tomcat.keystore

cmd输出:
输入keystore密码：******
您的名字与姓氏是什么？
[Unknown]： localhost
您的组织单位名称是什么？
[Unknown]： it
您的组织名称是什么？
[Unknown]： dev
您所在的城市或区域名称是什么？
[Unknown]： bj
您所在的州或省份名称是什么？
[Unknown]： bj
该单位的两字母国家代码是什么
[Unknown]： CN
CN=localhost, OU= it, O= dev, L=bj, ST=bj, C=CN 正确吗？
[否]： Y

输入的主密码（如果和 keystore 密码相同，按回车）：*******

参数说明:

 -genkey表示生成密钥
 -validity指定证书有效期，这里是60天
 -alias指定别名，这里是tomcat
 -keyalg指定算法，这里是RSA
 -keystore指定存储位置，这里是D:\ tomcat.keystore
使用的自定义密码为 123456

Keytool 详细命令说明请参考百度百科;

*其中 您的名字与姓氏是什么？ localhost是网站的域名或者ip,根据实际情况填写。否者会出现证书上的名称无效;

2)       配置tomcat服务器支持SSL
将生成的 tomcat.keystore文件，放到%TOMCAT_HOME%/conf目录中(其他也OK).

说明: 修改%TOMCAT_HOME%/conf/server.xml,新增Connector(原注释里有):
Code:

<Connector  

              SSLEnabled="true"  

              URIEncoding="UTF-8"  

              clientAuth="false"  

              keystoreFile="conf/tomcat.keystore"  

              keystorePass="123456"  

              maxThreads="150"  

              port="8443"  

              protocol="HTTP/1.1"  

              scheme="https"  

              secure="true"  

               sslProtocol="TLS" />

 

 

这样你的tomcat就支持https访问了;

属性说明(来源网上资源)：

 port： 这个port属性(默认值是8443)是 TCP/IP端口数码，Tomcat在其上监听安全连接。你可以把它更改成任何你愿意要的数值(如默认的https通信，数目是443)。不过，在许多操作系统中，要想在比1024小的端口数码上运行Tomcat，需要特殊的设置(它超出了这个文档资料的范围)。
 redirectPort： 如果你在这里更改端口数值，你还必须更改在non-SSL连接器上的redirectPort 这个属性特定的值。这允许Tomcat自动地redirect那些试图访问有安全限制页面的用户，指明根据 Servlet 2.4 Specification要求，SSL是必需的
 clientAuth： 如果你想要Tomcat要求所有的SSL客户在使用这个socket时出示用户认证书，把这个值设定为 true 。如果你想要Tomcat要求出示用户认证书，但是如果没有认证书也可以， 就把这个值设定为want 。
 keystoreFile： 如果你产生的keystore文件不在Tomcat期望的默认地方(一个叫做.keystore 的文件在Tomcat运行的主目录)，就添加这个属性。你可以指定一个绝对路径名称， 或者一个由$CATALINA_BASE环境变量而派生的相对路径名称。
 keystorePass： 如果你使用一个不同的keystore(以及认证书)密码，而不是Tomcat期望的密码 (就是changeit)，添加这个元素。
 keystoreType： 如果使用一个PKCS12 keystore的话，就添加这个element。 有效的值是JKS 和 PKCS12
 sslProtocol： 要在这个socket上被使用的加密／解密协定。如果你在使用Sun的JVM，我们不提倡更改 这个值。据报道，TLS协定的IBM's 1.4.1 实现与一些通用的浏览器不兼容。 如果是这样，就使用value SSL
 ciphers： 这个socket允许使用的由逗号分隔开的加密密码列单。默认的情况下，任何可用的密码都允许被使用。
 algorithm： 可用的X509算法。默认是Sun的实现( SunX509 )。 对于IBM JVMs，你应该使用值 IbmX509。对于其他卖主，查阅JVM文档资料来 找正确的值。
 truststoreFile： 用来验证用户认证书的TrustStore文件。
 truststorePass： 访问TrustStore的密码。默认值就是keystorePass的值。
 truststoreType： 如果你在使用与KeyStore不同格式的TrustStore，添加这个元素。 合法的值是JKS和PKCS12
 keyAlias： 如果 keystore 里面有多个 key，你可以为用这个选项为加入的 key 起一个名字。 如果没有指定名字，使用时 keystore 内的第一个 key 将会被使用
3)       用浏览器访问你的应用
输入:https://localhost:8443/myDemo

你会发现:

你的应用已经处于SLL安全通道中了.

4)       用httpClient访问https
说明: 利用官方的一个例子来说明:

Code:

 

httpClientCode：

public class ClientCustomSSL {

    public final static void main(String[] args) throws Exception {

        DefaultHttpClient httpclient = new DefaultHttpClient();

        try {

            KeyStore trustStore  = KeyStore.getInstance(KeyStore.getDefaultType());

                     FileInputStream instream =

new FileInputStream(new File("d:\\tomcat.keystore"));

            try {

                     //加载keyStore d:\\tomcat.keystore

                trustStore.load(instream, "123456".toCharArray());

            } finally {

                try { instream.close(); } catch (Exception ignore) {}

            }

                     //穿件Socket工厂,将trustStore注入

            SSLSocketFactory socketFactory = new SSLSocketFactory(trustStore);

                     //创建Scheme

            Scheme sch = new Scheme("https", 8443, socketFactory);

                     //注册Scheme

            httpclient.getConnectionManager().getSchemeRegistry().register(sch);

            //创建http请求(get方式)

                                       HttpGet httpget =

                                         new HttpGet("https://localhost:8443/myDemo/Ajax/serivceJ.action");

            System.out.println("executing request" + httpget.getRequestLine());

            HttpResponse response = httpclient.execute(httpget);

            HttpEntity entity = response.getEntity();

            System.out.println("----------------------------------------");

            System.out.println(response.getStatusLine());

            if (entity != null) {

                    System.out.println("Response content length: " +

entity.getContentLength());

              String ss = EntityUtils.toString(entity);

                     System.out.println(ss);

                       EntityUtils.consume(entity);

            }

        } finally {

            httpclient.getConnectionManager().shutdown();

        }

    }

}

 

 

服务器端的action：

 

public void serivceJ() {

        try {

          HttpServletResponse response =

ServletActionContext.getResponse();  

       System.out.println("request...serivceJ");

        response.setCharacterEncoding("UTF-8");

        response.getWriter().write("hello world!");

       } catch (IOException e) {

           e.printStackTrace();

       }

    }

 

 

运行程序:

 

executing requestGET https://localhost:8443/myDemo/Ajax/serivceJ.action HTTP/1.1

----------------------------------------

HTTP/1.1 200 OK

Response content length: 12

hello world!

 

到此,一个完整的httpClient 访问https的流程就走OK了；

注意:生成keyStore的jdk和myEclipse的jdk要一致.否则可能出现错误;
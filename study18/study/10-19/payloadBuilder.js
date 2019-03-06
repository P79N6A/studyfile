'Android应用'一般'通过后台向服务器轮询请求''获取信息'，
而'iOS应用'则'会在被切换到后台''一段时间后停止运行'，
这时候'如果'想'要达到信息的获取'则'只能依靠APNS'
（Apple Push Notification Service），由'服务器主动进行推送'。
'APNS的原理'以及'令牌获取方式'网上一搜一大堆，
'这里'主要'介绍一下'Java的'APNS类库notnoop'。


notnoop中的'核心类'是'ApnsService'和'PayloadBuilder'，
'ApnsService'可以'向服务器发送请求'，并且'在ApnsServiceBuilder'
中'提供了常用的服务器host'。'一个ApnsService的创建'可以'通过下面'几句简单的'代码完成'：

//p12文件路径
String keyPath = "E:/Pushtest.p12";
//p12文件密匙
String password = "111111";
//创建一个APNS service
ApnsService service = APNS.newService()
		.withCert(keyPath, password)	'使用指定的p12文件'以及'密匙'
		.withSandboxDestination()	'使用apple'的测试'服务器'
		.build();

而'PayloadBuilder'则可以'帮助开发者''轻松'地'创建一个符合APNS规范的JSON'，例如：

//'创建一个消息'
String payload = APNS.newPayload()
		.alertBody("hello world!")	'推送通知显示的文字'
		.sound("default")	'推送时附带的声音提示'
		.badge(1)	'应用程序图标右上角显示的数字'
		.build();

'最后'只要'调用service的push'方法'即可将消息''推送到iOS设备了':
'token'由'客户端获取'
String token = "45124a4cf9f5e272d395f6392456e5ab7185d2ae6e98ba2f8426fe09f60e785b";
'发送消息'到'iOS设备'
service.push(token, payload);

由于'APNS'最高'只支持''256个字节'的'消息体'，并且'推送消息'中'大量重复的内容'也'会造成流量成本'，
这时'可以使用本地化字符串'。
本地化字符串'是在客户端'中的Localizable.strings文件中定义一对键值对，
'服务器'只需要'提供指定字符串'的键'和动态生成的参数'即'可生成一条完整的推送消息'，例如：
//Localizable.strings中定义 "focus"="%@关注了你"
List<String> args = new ArrayList();
args.add("张三");
String payload = APNS.newPayload()
	.localizedKey("focus")	//本地化字符串的key
	.localizedArguments(args)	//动态生成的参数
	.build();
service.push(token, payload);
//推送结果: 张三关注了你

最后，并不是每条消息都绝对会推送成功。
例如当用户卸载掉该应用时，所对应的token就已经失效了，
这时可以通过service的getInactiveDevices方法获得失效的token并作出处理。


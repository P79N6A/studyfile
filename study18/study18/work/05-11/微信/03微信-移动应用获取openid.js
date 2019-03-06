"移动应用""微信登录""开发指南"
准备工作

移动应用微信登录是基于OAuth2.0协议标准 构建的微信OAuth2.0授权登录系统。

在进行微信OAuth2.0授权登录接入之前，在微信开放平台"注册开发者帐号"，
并"拥有"一个"已审核通过"的"移动应用"，并"获得"相应的"AppID"和"AppSecret"，
申请微信登录且通过审核后，可开始接入流程。

1、目前"移动应用"上微信登录"只提供""原生"的"登录方式"，需要用户安装微信客户端才能配合使用。

2、对于"Android应用"，建议总是"显示微信登录按钮"，当用户手机"没有安装微信"客户端时，请"引导"用户下载"安装微信"客户端。

3、对于"iOS应用"，考虑到iOS应用商店审核指南中的相关规定，建议开发者接入微信登录时，
"先检测"用户手机"是否"已"安装微信"客户端（使用sdk中isWXAppInstalled函数 ），
对"未安装"的用户"隐藏微信登录"按钮，只"提供其他登录方式"（比如手机号注册登录、游客登录等）。

授权流程说明
微信OAuth2.0"授权登录"让"微信用户"使用微信身份"安全登录第三方应用"或网站，
在微信用户授权"登录"已接入微信OAuth2.0的"第三方应用后"，
"第三方"可以"获取到用户"的"接口调用凭证"（access_token），
"通过access_token"可以"进行"微信"开放平台"授权关系"接口调用"，
从而可实现"获取微信用户"基本"开放信息"和帮助用户实现基础开放功能等。

微信OAuth2.0授权登录目前支持authorization_code模式，适用于拥有server端的应用授权。该模式整体流程为：

1. "第三方"发起"微信授权"登录请求，"微信用户允许授权"第三方应用后，微信会"拉起应用"或"重定向到第三方网站"，并且"带上授权临时票据code参数"；

2. "通过code参数"加上"AppID"和"AppSecret"等，"通过API换取access_token"；

3. "通过access_token"进行"接口调用"，"获取用户基本数据"资源或"帮助用户实现基本操作"。
获取access_token时序图：



"第一步：请求CODE"

移动应用"微信授权登录"
开发者需要配合"使用"微信开放平台提供的"SDK"进行"授权登录"请求"接入"。
正确"接入SDK后"并"拥有相关授权域"（scope，什么是授权域？）权限后，
开发者移动"应用"会"在终端"本地"拉起微信应用"进行"授权登录"，
微信"用户确认"后"微信"将"拉起"开发者移动"应用"，并"带上授权"临时"票据"（code）。

iOS平台应用授权登录接入代码示例（请参考iOS接入指南）：
-(void)sendAuthRequest
{
    //构造SendAuthReq结构体
    SendAuthReq* req =[[[SendAuthReq alloc]init]autorelease];
    req.scope = @"snsapi_userinfo";
    req.state = @"123";
    //第三方向微信终端发送一个SendAuthReq消息结构
    [WXApi sendReq:req];
}

Android平台应用授权登录接入代码示例（请参考Android接入指南）：
{
    // send oauth request
    Final SendAuth.Req req = new SendAuth.Req();
    req.scope = "snsapi_userinfo";
    req.state = "wechat_sdk_demo_test";
    api.sendReq(req);
}

参数说明
参数		是否必须		说明
appid	是		应用唯一标识，在微信开放平台提交应用审核通过后获得
scope	是		应用授权作用域，如获取用户个人信息则填写snsapi_userinfo（ 什么是授权域？ ）
state	否		用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验


返回示例：
appid: wxd477edab60670232
scope: snsapi_userinfo
state: wechat_sdk_demo
可拉起微信打开授权登录页：



返回说明

用户点击授权后，微信客户端会被拉起，跳转至授权界面，用户在该界面点击允许或取消，SDK通过SendAuth的Resp返回数据给调用方。

返回值	说明
ErrCode	ERR_OK = 0(用户同意) ERR_AUTH_DENIED = -4（用户拒绝授权） ERR_USER_CANCEL = -2（用户取消）
code	用户换取access_token的code，仅在ErrCode为0时有效
state	第三方程序发送时用来标识其请求的唯一性的标志，由第三方程序调用sendReq时传入，由微信终端回传，state字符串长度不能超过1K
lang	微信客户端当前语言
country	微信用户当前国家信息
第二步：通过code获取access_token

获取第一步的code后，请求以下链接获取access_token：

https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
参数说明

参数	是否必须	说明
appid	是	应用唯一标识，在微信开放平台提交应用审核通过后获得
secret	是	应用密钥AppSecret，在微信开放平台提交应用审核通过后获得
code	是	填写第一步获取的code参数
grant_type	是	填authorization_code
返回说明

正确的返回：

{ 
"access_token":"ACCESS_TOKEN", 
"expires_in":7200, 
"refresh_token":"REFRESH_TOKEN",
"openid":"OPENID", 
"scope":"SCOPE",
"unionid":"o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
参数	说明
access_token	接口调用凭证
expires_in	access_token接口调用凭证超时时间，单位（秒）
refresh_token	用户刷新access_token
openid	授权用户唯一标识
scope	用户授权的作用域，使用逗号（,）分隔
unionid	当且仅当该移动应用已获得该用户的userinfo授权时，才会出现该字段
错误返回样例：

{"errcode":40029,"errmsg":"invalid code"}
刷新access_token有效期

access_token是调用授权关系接口的调用凭证，由于access_token有效期（目前为2个小时）较短，当access_token超时后，可以使用refresh_token进行刷新，access_token刷新结果有两种：

1. 若access_token已超时，那么进行refresh_token会获取一个新的access_token，新的超时时间；
2. 若access_token未超时，那么进行refresh_token不会改变access_token，但超时时间会刷新，相当于续期access_token。
refresh_token拥有较长的有效期（30天），当refresh_token失效的后，需要用户重新授权。

请求方法

获取第一步的code后，请求以下链接进行refresh_token：

https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
参数说明

参数	是否必须	说明
appid	是	应用唯一标识
grant_type	是	填refresh_token
refresh_token	是	填写通过access_token获取到的refresh_token参数
返回说明

正确的返回：

{
"access_token":"ACCESS_TOKEN",
"expires_in":7200,
"refresh_token":"REFRESH_TOKEN",
"openid":"OPENID",
"scope":"SCOPE"
}
参数	说明
access_token	接口调用凭证
expires_in	access_token接口调用凭证超时时间，单位（秒）
refresh_token	用户刷新access_token
openid	授权用户唯一标识
scope	用户授权的作用域，使用逗号（,）分隔
错误返回样例：

{"errcode":40030,"errmsg":"invalid refresh_token"}
注意：


1、Appsecret 是应用接口使用密钥，泄漏后将可能导致应用数据泄漏、应用的用户数据泄漏等高风险后果；存储在客户端，极有可能被恶意窃取（如反编译获取Appsecret）；
2、access_token 为用户授权第三方应用发起接口调用的凭证（相当于用户登录态），存储在客户端，可能出现恶意获取access_token 后导致的用户数据泄漏、用户微信相关接口功能被恶意发起等行为；
3、refresh_token 为用户授权第三方应用的长效凭证，仅用于刷新access_token，但泄漏后相当于access_token 泄漏，风险同上。
建议将Appsecret、用户数据（如access_token）放在App云端服务器，由云端中转接口调用请求。

第三步：通过access_token调用接口

获取access_token后，进行接口调用，有以下前提：

access_token有效且未超时；
微信用户已授权给第三方应用帐号相应接口作用域（scope）。
对于接口作用域（scope），能调用的接口有以下：

授权作用域（scope）	接口	接口说明
snsapi_base	/sns/oauth2/access_token	通过code换取access_token、refresh_token和已授权scope
/sns/oauth2/refresh_token	刷新或续期access_token使用
/sns/auth	检查access_token有效性
snsapi_userinfo	/sns/userinfo	获取用户个人信息
其中snsapi_base属于基础接口，若应用已拥有其它scope权限，则默认拥有snsapi_base的权限。使用snsapi_base可以让移动端网页授权绕过跳转授权登录页请求用户授权的动作，直接跳转第三方网页带上授权临时票据（code），但会使得用户已授权作用域（scope）仅为snsapi_base，从而导致无法获取到需要用户授权才允许获得的数据和基础功能。

接口调用方法可查阅《微信授权关系接口调用指南》

F.A.Q

1. 什么是授权临时票据（code）？

答：第三方通过code进行获取access_token的时候需要用到，code的超时时间为10分钟，一个code只能成功换取一次access_token即失效。code的临时性和一次保障了微信授权登录的安全性。第三方可通过使用https和state参数，进一步加强自身授权登录的安全性。

2. 什么是授权作用域（scope）？

答：授权作用域（scope）代表用户授权给第三方的接口权限，第三方应用需要向微信开放平台申请使用相应scope的权限后，使用文档所述方式让用户进行授权，经过用户授权，获取到相应access_token后方可对接口进行调用。

3.开放平台移动应用微信登陆目前是否收费？

答：“微信登录”和第三方网站共享微信庞大的用户价值，同时为微信用户提供更便捷服务和更优质内容，实现双向共赢，目前不收取任何费用。
'微信网页授权'
如果'用户'在'微信客户端'中'访问第三方网页'，'公众号'可以'通过微信网页授权机制'，
来'获取用户基本信息'，进而'实现业务逻辑'。
关于网页授权回调域名的说明

1、在'微信公众号''请求用户网页授权之前'，'开发者'需'要先到公众平台'官网中的
'“开发 - 接口权限 - 网页服务 - 网页帐号 - 网页授权获取用户基本信息”'的配置选项中，
'修改'授权'回调域名'。请注意，这里填写的是'域名'（是一个字符串），而'不是URL'，
因此请'勿加 http:// '等协议头；

2、'授权回调''域名'配置'规范为全域名'，比如'需要网页授权'的'域名为'：'www.qq.com'，
'配置'以'后'此'域名下'面的'页面''http://www.qq.com/music.html' 、 'http://www.qq.com/login.html' 
'都可以'进行'OAuth2.0鉴权'。但'http://pay.qq.com' 、 'http://music.qq.com' 、 'http://qq.com''无法'进行OAuth2.0'鉴权'

3、如果'公众号'登录'授权'给了'第三方开发者'来进行'管理'，则'不必做'任何'设置'，由'第三方代''替公众号''实现网页授权'即可
关于'网页授权'的'两种scope'的'区别说明'

1、以'snsapi_base'为scope发起的网页授权，是'用来获取'进入页面的'用户的openid'的，
并且是'静默授权'并'自动跳转到回调页'的。'用户感知'的就'是''直接进入'了回调页（往往是'业务页面'）

2、以'snsapi_userinfo'为scope发起的网页授权，是用来'获取用户'的'基本信息'的。
但'这种授权'需'要用户手动同意'，并且由于用户同意过，所以无须关注，就'可在授权后''获取'该用户的'基本信息'。

3、'用户管理类'接口'中'的'“获取用户基本信息接口”'，是'在用户'和'公众号产生消息交互'或'关注后'事件推送后，
才能'根据用户OpenID'来'获取用户基本信息'。'这个接口'，包括其他微信接口，
都是需'要该用户'（即openid）'关注'了'公众号后'，'才'能'调用成功'的。

关于'网页授权''access_token'和'普通''access_token'的'区别'

1、微信'网页授权'是'通过''OAuth2.0机制''实现'的，在'用户授权'给公众号'后'，
公众号'可以'获'取到'一个网页授权特有的'接口调用凭证'（网页授权'access_token'），
'通过'网页授权'access_token'可以'进行授权后''接口调用'，如获取用户基本信息；

2、'其他''微信接口'，需'要通过''基础支持中'的'“获取access_token”接口'来'获取'到的'普通access_token调用'。

关于'UnionID机制'
1、请注意，'网页授权''获取''用户基本信息'也'遵循UnionID机制'。即如果'开发者''有'在'多个公众号'，或在'公众号'、
'移动应用'之间'统一用户帐号'的需求，需'要前往微信开放平台'（open.weixin.qq.com）'绑定公众号后'，
才可'利用UnionID'机制来'满足上述需求'。

2、'UnionID机制'的'作用说明'：如果'开发者'拥'有多个''移动应用'、'网站应用'和'公众帐号'，
可'通过''获取''用户基本信息'中的'unionid'来'区分用户'的'唯一性'，因为同一用户，
对'同一个微信开放平台'下的'不同应用'（移动应用、网站应用和公众帐号），'unionid'是'相同'的。

关于'特殊场景'下的'静默授权'
1、上面已经提到，对于以'snsapi_base'为scope的'网页授权'，就'静默授权'的，'用户无感知'；

2、对于'已关注公众号'的'用户'，'如果用户'从'公众号'的'会话''或'者'自定义菜单''进入''本公众号'的网页授权页，
'即使是scope为snsapi_userinfo'，'也是静默授权'，用户无感知。

具体而言，'网页授权流程'分为'四步'：
1、'引导用户''进入''授权页面''同意授权'，'获取code'
2、'通过code''换取'网页'授权access_token'（与基础支持中的access_token不同）
3、'如果需要'，'开发者''可'以'刷新网页授权access_token'，'避免过期'
4、'通过网页授权''access_token'和'openid''获取''用户基本信息'（支持UnionID机制）

目录
1 第一步：用户同意授权，获取code
2 第二步：通过code换取网页授权access_token
3 第三步：刷新access_token（如果需要）
4 第四步：拉取用户信息(需scope为 snsapi_userinfo)
5 附：检验授权凭证（access_token）是否有效

第一步：用户'同意授权'，'获取code'

在'确保'微信'公众账号'拥'有授权作用域'（scope参数）的权限的'前提下'
（服务号获得高级接口后，'默认'拥'有scope'参数中的'snsapi_base'和'snsapi_userinfo'），引导关注者打开如下页面：

https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
若'提示“该链接无法访问”'，请'检查参数'是否填写'错误'，是否'拥有scope参数'对应的'授权作用域权限'。
尤其注意：由于'授权操作''安全等级较高'，所以'在发起授权请求'时，微信'会对授权链接''做正则强匹配''校验'，
如果'链接的参数顺序不对'，授权页面将'无法正常访问'

参考链接(请在微信客户端中打开此链接体验):
'scope为snsapi_base'
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect
'scope为snsapi_userinfo'
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
尤其注意：'跳转回调''redirect_uri'，'应'当'使用https'链接来'确保授权code'的'安全性'。

参数说明

参数	是否必须	说明
'appid'	是	'公众号'的'唯一标识'
'redirect_uri'	是	授权后'重定向'的'回调链接地址'， 请使'用urlEncode' 对链接进行'处理'
response_type	是	返回类型，请填写code
scope	是	应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
state	否	重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
#wechat_redirect	是	无论直接打开还是做页面302重定向时候，必须带此参数
下图为scope等于snsapi_userinfo时的授权页面：



用户同意授权后

如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE。

code说明 ： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
错误返回码说明如下：

返回码	说明
10003	redirect_uri域名与后台配置不一致
10004	此公众号被封禁
10005	此公众号并没有这些scope的权限
10006	必须关注此测试号
10009	操作太频繁了，请稍后重试
10010	scope不能为空
10011	redirect_uri不能为空
10012	appid不能为空
10013	state不能为空
10015	公众号未授权第三方平台，请检查授权状态
10016	不支持微信开放平台的Appid，请使用公众号Appid

第二步：通过code换取网页授权access_token

首先请注意，这里通过code换取的是一个特殊的网页授权access_token,与基础支持中的access_token（该access_token用于调用其他接口）不同。公众号可通过下述接口来获取网页授权access_token。如果网页授权的作用域为snsapi_base，则本步骤中获取到网页授权access_token的同时，也获取到了openid，snsapi_base式的网页授权流程即到此为止。

尤其注意：由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也必须从服务器发起。

请求方法

获取code后，请求以下链接获取access_token：  https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
参数说明

参数	是否必须	说明
appid	是	公众号的唯一标识
secret	是	公众号的appsecret
code	是	填写第一步获取的code参数
grant_type	是	填写为authorization_code
返回说明

正确时返回的JSON数据包如下：

{ "access_token":"ACCESS_TOKEN",
"expires_in":7200,
"refresh_token":"REFRESH_TOKEN",
"openid":"OPENID",
"scope":"SCOPE" }
参数	描述
access_token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
expires_in	access_token接口调用凭证超时时间，单位（秒）
refresh_token	用户刷新access_token
openid	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
scope	用户授权的作用域，使用逗号（,）分隔
错误时微信会返回JSON数据包如下（示例为Code无效错误）:

{"errcode":40029,"errmsg":"invalid code"}

第三步：刷新access_token（如果需要）

由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权。

请求方法

获取第二步的refresh_token后，请求以下链接获取access_token：
https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
参数	是否必须	说明
appid	是	公众号的唯一标识
grant_type	是	填写为refresh_token
refresh_token	是	填写通过access_token获取到的refresh_token参数
返回说明

正确时返回的JSON数据包如下：

{ "access_token":"ACCESS_TOKEN",
"expires_in":7200,
"refresh_token":"REFRESH_TOKEN",
"openid":"OPENID",
"scope":"SCOPE" }
参数	描述
access_token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
expires_in	access_token接口调用凭证超时时间，单位（秒）
refresh_token	用户刷新access_token
openid	用户唯一标识
scope	用户授权的作用域，使用逗号（,）分隔
错误时微信会返回JSON数据包如下（示例为code无效错误）:

{"errcode":40029,"errmsg":"invalid code"}

第四步：拉取用户信息(需scope为 snsapi_userinfo)

如果网页授权作用域为snsapi_userinfo，则此时开发者可以通过access_token和openid拉取用户信息了。

请求方法

http：GET（请使用https协议） https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
参数说明

参数	描述
access_token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
openid	用户的唯一标识
lang	返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
返回说明

正确时返回的JSON数据包如下：

{    "openid":" OPENID",
" nickname": NICKNAME,
"sex":"1",
"province":"PROVINCE"
"city":"CITY",
"country":"COUNTRY",
"headimgurl":    "http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
"privilege":[ "PRIVILEGE1" "PRIVILEGE2"     ],
"unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
参数	描述
openid	用户的唯一标识
nickname	用户昵称
sex	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
province	用户个人资料填写的省份
city	普通用户个人资料填写的城市
country	国家，如中国为CN
headimgurl	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
privilege	用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
unionid	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
错误时微信会返回JSON数据包如下（示例为openid无效）:

{"errcode":40003,"errmsg":" invalid openid "}

附：检验授权凭证（access_token）是否有效

请求方法

http：GET（请使用https协议） https://api.weixin.qq.com/sns/auth?access_token=ACCESS_TOKEN&openid=OPENID
参数说明

参数	描述
access_token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
openid	用户的唯一标识
返回说明
正确的JSON返回结果：

{ "errcode":0,"errmsg":"ok"}
错误时的JSON返回示例：

{ "errcode":40003,"errmsg":"invalid openid"}
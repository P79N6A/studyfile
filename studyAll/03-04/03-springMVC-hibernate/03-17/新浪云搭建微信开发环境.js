'1.申请微信公众号。地址  https://mp.weixin.qq.com'
'2.购买服务器，由于没有服务器，我们就用新浪云来做部署'

//第二部详细
//1。登录新浪云，就用新浪微博即可
//2。创建应用，也就是你的服务器域名，这个是客户访问你输在浏览器地址栏的东西

'微信成为开发者其实就是用一个私有服务器，在上面部署代码，由微信服务器作为中间桥梁，使两者相互连通'

'接收'相当于request//公众号粉丝发的信息常见有如下几种
//文本  
ToUserName 消息接收方微信号，一般为公众平台账号微信号
FromUserName 消息发送方微信号
CreateTime 消息创建时间
MsgType 消息类型；文本消息为text
Content 消息内容
MsgId 消息ID号

//图片
ToUserName 公众号，服务器(公众号)   
FromUserName 消息发送者(fans)
CreateTime 消息创建时间
MsgType 消息类型；图片消息为image
PicUrl 图片链接地址，可以用HTTP GET获取
MsgId 消息ID号
//附：AMR接口简介
//全称Adaptive Multi-Rate，主要用于移动设备的音频，压缩比比较大，但相对其他的压缩格式质量比较差，由于多用于人声，通话，效果还是很不错的。
还有音频，视频，位置，连接等等信息；前台都有相应的东西来接收

'回复'相当于response//主要有文本，图文，音乐等等
'图文包括单条和多条'

1.文本消息格式
//回复文本.和接收文本反过来
<xml>
<ToUserName><![CDATA[oIDrpjqASyTPnxRmpS9O_ruZGsfk]]></ToUserName>
<FromUserName><![CDATA[gh_680bdefc8c5d]]></FromUserName>
<CreateTime>1359036631</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[【深圳】天气实况 温度：27℃ 湿度：59% 风速：东北风3级
11月03日 周日 27℃~23℃ 小雨 东北风4-5级
11月04日 周一 26℃~21℃ 阵雨 微风
11月05日 周二 27℃~22℃ 阴 微风]]></Content>
<FuncFlag>0</FuncFlag>
</xml>

图文比较复杂见'2. 图文消息格式'

'事件消息类型'：目前用户在关注和取消关注，以及点击菜单的时候会自动向公众平台发送事件推送消息
//1。关注事件 
<xml>
<ToUserName><![CDATA[gh_b629c48b653e]]></ToUserName>
<FromUserName><![CDATA[ollB4jv7LA3tydjviJp5V9qTU_kA]]></FromUserName>
<CreateTime>1372307736</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA['subscribe']]></Event>
<EventKey><![CDATA[]]></EventKey>
</xml>

//2.取消关注事件
<xml>
<ToUserName><![CDATA[gh_b629c48b653e]]></ToUserName>
<FromUserName><![CDATA[ollB4jqgdO_cRnVXk_wRnSywgtQ8]]></FromUserName>
<CreateTime>1372309890</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA['unsubscribe']]></Event>
<EventKey><![CDATA[]]></EventKey>
</xml>

//3.菜单点击事件
<xml>
<ToUserName><![CDATA[gh_680bdefc8c5d]]></ToUserName>
<FromUserName><![CDATA[oIDrpjqASyTPnxRmpS9O_ruZGsfk]]></FromUserName>
<CreateTime>1377886191</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA['CLICK']]></Event>
<EventKey><![CDATA[天气深圳]]></EventKey>
</xml>

//ToUserName     接收方微信号
//FromUserName 发送方微信号，若为普通用户，则是一个OpenID
//CreateTime     消息创建时间
//MsgType     消息类型，event
//Event     事件类型，subscribe(订阅)、unsubscribe(取消订阅)、CLICK(自定义菜单点击事件)
//EventKey 事件KEY值，与自定义菜单接口中KEY值对应

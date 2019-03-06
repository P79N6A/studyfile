扫码支付可分为'两种模式'，商户根据'支付场景''选择相应模式'。

【模式一】：商户后台系统'根据微信支付规则链接生成二维码'，链接中'带固定参数productid'
（可定义为产品标识或订单号）。用户扫码后，'微信'支付系统'将productid'和'用户唯一标识(openid)'
'回调商户'后台系统(需要设置支付'回调URL')，'商户'后台系统'根据productid''生成支付交易'，
最后'微信支付'系统'发起用户支付流程'。
    商户支付'回调URL设置指引'：进入公众平台-->微信支付-->开发配置-->扫码支付-->修改，如图6.6所示。
    模式一开发前，商户'必须在公众平台''后台设置支付回调URL'。
URL实现的功能：'接收'用户扫码后'微信支付系统回调'的'productid'和'openid'；'URL设置详见回调地址设置'。


1.'商户'系统'按照微信规则生成二维码'（）'向用户展示'二维码
2.'用户打开微信扫码，提交扫码信息'，
3.'微信支付系统回调商户设置的url'
4.'商户系统响应回调'，'生成订单'（）
5.'商户调统一下单api'。'生成预付交易'   https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1
6.'微信'支付系统'生成预支付交易'
7.'微信'支付系统'返回交易会话标识（prepay_id）'
'再按签名规范重新生成签名'后，'将数据传输给APP'。'参与签名的字段名为'
'appid'，'partnerid'，'prepayid'，'noncestr'，'timestamp'，'package'。注意：'package的值格式为Sign=WXPay'
8.商户返回并让用户完成支付(prepay_id)  
9.微信支付系统返回并让用户完成支付()   app端开发步骤说明  https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=8_5
   10.用户密码支付 ,提交授权   
   11.微信支付系统验证支付交易
   12.微信支付系统返回支付结果，发送短信，微信信息提示
   13.微信支付系统异步通知商户支付结果，商户告知接收情况   支付结果通知API  https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_7
   14.商户调用查询订单api，返回支付交易结果  查询订单API   https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_2


生成二维码规则
二维码中的内容为链接，形式为：
    weixin://wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX
&time_stamp=XXXXXX&nonce_str=XXXXX
其中XXXXX为商户需要填写的内容，商户将该链接生成二维码，如需要打印发布二维码，需要采用此格式。
商户可'调用第三方库''生成二维码图片'。参数说明如下：


公众账号ID	appid	    String(32)	是	wx8888888888888888	             微信分配的'公众账号ID'
商户号	    mch_id	    String(32)	是	1900000109	                     微信支付分配的'商户号'
时间戳	    time_stamp	String(10)	是	1414488825	                     系统当前时间，定义规则详见时间戳
随机字符串	nonce_str	String(32)	是	5K8264ILTKCH16CQ2502SI8ZNMTM67VS 随机字符串，不长于32位。'推荐随机数生成算法'
商品ID	    product_id	String(32)	是	88888	                         '商户定义的商品id' 或者订单号
签名	        sign	    String(32)	是	C380BEC2BFD727A4B6845133519F3AD6 签名，详见'签名生成算法'

回调商户支付URL
    商户提供的支付回调URL（回调地址设置）'需要实现''以下功能'：'接收'用户扫码后
'微信支付系统''发送的数据'，根据接收的数据生成支付订单，调用【统一下单API】提交支付交易。


3.2 输出参数

返回状态码  return_code	 String(16)	 是	SUCCESS	                             SUCCESS/FAIL,此字段是'通信标识'，非交易标识，'交易是否成功需要查看result_code'来判断
返回信息	   return_msg	 String(128) 否	签名失败	                             返回信息，'如非空'，'为错误原因';签名失败;具体某个参数格式校验错误.
公众账号ID  appid	     String(32)	 是	wx8888888888888888	                 微信分配的'公众账号ID'
商户号	    mch_id	     String(32)	 是	1900000109	                         微信支付分配的'商户号'
随机字符串	nonce_str	 String(32)	 是	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	 微信返回的'随机字符串'
预支付ID	    prepay_id	 String(64)	 是	wx201410272009395522657a690389285100 调用统一下单接口'生成的预支付ID'
业务结果	    result_code	 String(16)	 是	SUCCESS	                             SUCCESS/FAIL
错误描述	    err_code_des String(128) 否		                                 当result_code为FAIL时，'商户展示给用户的错误提示'
签名	        sign	     String(32)	 是	C380BEC2BFD727A4B6845133519F3AD6     返回数据签名，'签名生成算法'


模式二
模式'二'与模式一相比，流程更为简单，'不依赖'设置的'回调支付URL'。'商户后台系统'先调用
'微信支付'的'统一下单接口'，微信'后台系统''返回链接参数code_url'，'商户后台系统'将'code_url'
值'生成二维码图片'，'用户使用微信客户端扫码'后'发起支付'。注意：'code_url有效期为2小时'，
过期后扫码不能再发起支


1.商户生成订单
2.商户调统一下单api
3.微信支付生成预支付交易，返回预支付交易链接
4.商户将链接生成二维码，展示给用户
5.用户微信扫码，提交扫描链接
6.微信支付验证链接有效性，返回需要用户授权
7.用户确认支付，输入密码，提交支付授权
8.微信支付验证授权，完成支付交易
9.微信支付返回支付结果给用户，发送短信，消息等
10.微信支付异步通知商户支付结果，商户告知通知接收情况
11.商户调用查询api，返回支付状态



应用场景
除'被扫支付场景'以外，商户系统'先调用该接口'在'微信支付服务后台''生成预支付交易单'，
'返回正确的预支付交易回话标识'后再按'扫码、JSAPI、APP'等不同场景生成交易串调起支付。

状态机
支付状态转变如下：

接口链接
URL地址：https://api.mch.weixin.qq.com/pay/unifiedorder

是否需要证书
否

请求参数
字段名	   变量名	   必填	类型	示例值	描述
*公众账号ID	appid	       是	String(32)	wxd678efh567hg6787	                微信支付分配的'公众账号ID'（企业号corpid即为此appId）
*商户号	    mch_id	       是	String(32)	1230000109	                        '微信支付''分配'的'商户号'
设备号	    device_info	   否	String(32)	013467007045764	                    自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
*随机字符串	nonce_str      是	String(32)	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	'随机字符串'，长度要求在'32位以内'。推荐随机数生成算法
*签名       sign	           是	String(32)	C380BEC2BFD727A4B6845133519F3AD6	通过'签名算法计算得出的签名值'，详见签名生成算法
签名类型	    sign_type	   否	String(32)	MD5	                                签名类型，默认为MD5，支持HMAC-SHA256和MD5。
*商品描述	body	       是	String(128)	腾讯充值中心-QQ会员充值	           '商品简单描述'，该字段请按照规范传递，具体请见参数规定
商品详情	    detail	       否	String(6000)                                    商品详细描述，对于使用单品优惠的商户，改字段必须按照规范上传，详见“单品优惠参数说明”
附加数据	    attach	       否	String(127)	深圳分店	                            附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
*商户订单号	out_trade_no   是	String(32)	20150806125346	                    商户系统'内部订单号'，要求'32个字符内'，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。详见商户订单号
标价币种	    fee_type	   否	String(16)	CNY	                                符合ISO 4217标准的三位字母代码，默认人民币：CNY，详细列表请参见货币类型
*标价金额	total_fee	   是	Int	        88	                                订单总金额，'单位'为'分'，详见支付金额
*终端IP	 spbill_create_ip  是	String(16)	123.12.12.123	                    APP和网页支付'提交用户端ip'，'Native支付''填调用微信支付API的机器IP'。
交易起始时间	time_start	   否	String(14)	20091225091010	                    订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
交易结束时间	time_expire	   否	String(14)	20091227091010	                    订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。其他详见时间规则注意：最短失效时间间隔必须大于5分钟
订单优惠标记	goods_tag	   否	String(32)	WXG	                                订单优惠标记，使用代金券或立减优惠功能时需要的参数，说明详见代金券或立减优惠
*通知地址	notify_url	   是	String(256)	http://www.weixin.qq.com/wxpay/pay.php	异步'接收微信支付结果'通知的'回调地址'，通知url必须为外网可访问的url，不能携带参数。
*交易类型	trade_type	   是	String(16)	JSAPI	                            取值如下：JSAPI，NATIVE，APP等，说明详见参数规定
商品ID	    product_id	   否	String(32)	12235413214070356458058	            'trade_type=NATIVE时（即扫码支付），此参数必传'。此参数为二维码中包含的商品ID，商户自行定义。
指定支付方式	limit_pay	   否	String(32)	no_credit	                        上传此参数no_credit--可限制用户不能使用信用卡支付
用户标识	    openid	       否	String(128)	oUpF8uMuAJO_M2pxb1Q9zNjWeS6o	    trade_type=JSAPI时（即公众号支付），此参数必传，此参数为微信用户在商户对应appid下的唯一标识。openid如何获取，可参考【获取openid】。企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
+场景信息	scene_info	   否	String(256)	{"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据，对象格式为{"store_info":{"id": "门店ID","name": "名称","area_code": "编码","address": "地址" }} ，字段详细说明请点击行前的+展开







1,支付成功，更改订单状态

2，将支付结果丢给前台

{
  "tip": "执行成功",
  "status": 1,
  "code": "100",
  "data": {
    "nonce_str": "l0C1NvqBIqwI0MEW",
    "code_url": "weixin://wxpay/bizpayurl?pr=91vU4HB",
    "appid": "wxab8acb865bb1637e",
    "sign": "1D87033B28E277FC2A4D485E72C540E4",
    "trade_type": "NATIVE",
    "return_msg": "OK",
    "result_code": "SUCCESS",
    "mch_id": "11473623",
    "return_code": "SUCCESS",
    "prepay_id": "wx20170804100237aa3b75e54f0086987423"
  }
}













当'交易'发生'之后一段时间内'，由于'买家或'者'卖家'的原因'需要退款时'，
'卖家'可以'通过退款接口将''支付款'退'还给买家'，'微信支付'将在'收到退款请求'并且'验证成功'之'后'，
按'照退款规则''将支付款'按原路'退到买家''帐号上'。
注意：
1、'交易时间''超过一年'的订单'无法'提交'退款'；

2、微信支付'退款''支持''单笔交易'分'多次退款'，
'多次退款'需要'提交原支付订单的商户订单号'和'设置''不同'的'退款单号'。
申请'退款''总金额''不能''超过订单金额'。 '一笔退款''失败后''重新提交'，请'不要更换''退款单号'，
请'使用原商户''退款单号'。

3、'请求频率限制'：150qps，即'每秒钟'正常的申请'退款请求次数''不超过150次'
    错误或'无效请求频率'限制：6qps，即'每秒钟异常'或'错误'的'退款申请'请求'不超过6次'
    
4、'每个支付订单'的'部分退款次数''不能超过50次'

接口链接：'https://api.mch.weixin.qq.com/secapi/pay/refund'

请求'需要双向证书'。 详见证书使用


"请求参数:" 
字段名			变量名			必填		类型			示例值	描述
公众账号ID		appid			是		String(32)	wx8888888888888888	'微信分配的''公众账号ID'（企业号corpid即为此appId）
商户号			mch_id			是		String(32)	1900000109			'微信支付''分配的商户号'
随机字符串		nonce_str		是		String(32)	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	'随机字符串'，不长于32位。推荐随机数生成算法
签名				sign			是		String(32)	C380BEC2BFD727A4B6845133519F3AD6	'签名'，详见签名生成算法
/*签名类型			sign_type		否		String(32)	HMAC-SHA256			签名类型，目前支持HMAC-SHA256和MD5，默认为MD5*/
微信订单号		transaction_id	二选一	String(32)	1217752501201407033233368018	'微信生成的订单号'，在'支付通知中有返回'
商户订单号		out_trade_no	二选一	String(32)	1217752501201407033233368018	'商户系统内部订单号'，要求'32个字符内'，只能是'数字、大小写字母'_-|*@ ，且在'同一个商户号下唯一'。
商户退款单号		out_refund_no	是		String(64)	1217752501201407033233368018	'商户系统内部的退款单号'，'商户系统内部唯一'，只能是数字、大小写字母_-|*@ ，'同一退款单号多次请求只退一笔'。
订单金额			total_fee		是		Int			100					'订单总金额'，'单位为分'，'只能为整数'，详见支付金额
退款金额			refund_fee		是		Int			100					'退款总金额'，'订单总金额'，'单位为分'，只能为整数，详见支付金额
/*货币种类			refund_fee_type	否		String(8)	CNY					货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型*/
/*退款原因			refund_desc		否		String(80)	商品已售完			'若商户传入'，会'在下发给用户的退款消息'中体'现退款原因'*/
/*退款资金来源		refund_account	否		String(30)	REFUND_SOURCE_RECHARGE_FUNDS	仅针对老资金流商户使用REFUND_SOURCE_UNSETTLED_FUNDS---未结算资金退款（默认使用未结算资金退款）REFUND_SOURCE_RECHARGE_FUNDS---可用余额退款*/


"返回结果:"
字段名			变量名		必填		类型		示例值		描述
返回状态码	return_code		是	String(16)	SUCCESS		SUCCESS/FAIL
返回信息		return_msg		否	String(128)	签名失败		返回信息，'如非空'，'为错误原因''签名失败参数格式''校验错误'


"以下字段在return_code为SUCCESS的时候有返回:"
字段名		变量名			必填		类型		示例值			描述
业务结果		result_code		是	String(16)	SUCCESS			'SUCCESS/FAILSUCCESS''退款申请''接收成功'，结果通过退款查询接口查询FAIL 提交业务失败
错误代码		err_code		否	String(32)	SYSTEMERROR		'列表详见错误码列表'
错误代码描述	err_code_des	否	String(128)	系统超时			'结果信息描述'
公众账号ID	appid			是	String(32)	wx8888888888888888	'微信分配的公众账号ID'
商户号		mch_id			是	String(32)	1900000109		'微信支付分配的商户号'
随机字符串	nonce_str		是	String(32)	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	'随机字符串，不长于32位'
签名			sign			是	String(32)	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	'签名，详见签名算法'
微信订单号	transaction_id	是	String(32)	4007752501201407033233368018	'微信订单号'
商户订单号	out_trade_no	是	String(32)	33368018		'商户系统内部订单号'，要求'32个字符内'，只能是'数字、大小写字母'_-|*@ ，且在同一个商户号下唯一。
商户退款单号	out_refund_no	是	String(64)	121775250		'商户系统内部的退款单号'，'商户系统'内部'唯一'，'只能是数字'、'大小写字母'_-|*@ ，'同一退款单号''多次请求只退一笔'。
微信退款单号	refund_id		是	String(32)	2007752501201407033233368018	'微信退款单号'
退款金额		refund_fee		是	Int			100				'退款总金额','单位为分','可以做部分退款'
应结退款金额	settlement_refund_fee	否	Int	100				'去掉非充值代金券''退款金额后的退款金额'，'退款金额'='申请退款金额''-非充值代金券退款金额'，'退款金额<=申请退款金额'
标价金额		total_fee		是	Int			100				订单总金额，单位为分，只能为整数，详见支付金额
应结订单金额	settlement_total_fee	否	Int	100				去掉非充值代金券金额后的订单总金额，应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额。
标价币种		fee_type		否	String(8)	CNY				订单金额货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
现金支付金额	cash_fee		是	Int			100				现金支付金额，单位为分，只能为整数，详见支付金额
现金支付币种	cash_fee_type	否	String(16)	CNY				货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
现金退款金额	cash_refund_fee	否	Int			100				现金退款金额，单位为分，只能为整数，详见支付金额
代金券类型	coupon_type_$n	否	String(8)	CASH			CASH--充值代金券 NO_CASH---非充值代金券订单使用代金券时有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_0
代金券退款总金额	coupon_refund_fee	否	Int	100				代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠
单个代金券退款金额	coupon_refund_fee_$n	否	Int	100		代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠
退款代金券使用数量	coupon_refund_count	否	Int	1			退款代金券使用数量
退款代金券ID	coupon_refund_id_$n	否	String(20)	10000 		退款代金券ID, $n为下标，从0开始编号


3、'商户证书'
（1）'获取'商户'证书'
'微信支付'接口中，涉及'资金回滚'的接口会'使用'到'商户证书'，'包括退款'、'撤销'接口。
'商家'在申请微信'支付成功后'，'收到'的相应'邮件'后，可以'按照''指引''下载API证书'，
'也可'以'按'照以'下路径下载'：微信商户平台(pay.weixin.qq.com)-->'账户中心'-->'账户设置'
-->'API安全'-->'证书下载' 。证书'文件有四个'，分别'说明如下'：

表4.2：证书文件说明
证书附件		描述		使用场景		备注
【'pkcs12格式(apiclient_cert.p12)'】
'包含'了'私钥信息的证书文件'，为'p12(pfx)格式'，
'由微信支付签发'给您'用来标识'和'界定您的身份'

'撤销'、'退款申请API中调用'

'windows'上可以直接'双击导入系统'，'导入过程中'会'提示输入证书密码'，
'证书密码''默认为您的商户ID'（如：10010000）

'以下两个证书''在PHP环境中使用'：
【'CA证书'（rootca.pem）】
'微信支付api服务器'上也'部署了证明微信支付''身份的服务器证书'，
您'在使用api进行调用时'也'需要验证所调用服务器'及'域名的真实性'

'该文件'为'签署微信支付证书'的'权威机构的根证书'，可以'用来验证微信支付服务器证书'的'真实性'

'部分工具'已经'内置了若干权威机构的根证书'，'无需引用该证书'也'可以正常进行验证'，
'这里提供给您'在'未内置所必须根证书的环境中'载入使用

【'证书pem格式'（apiclient_cert.pem）】
'从apiclient_cert.p12'中'导出证书部分''的文件'，'为pem格式'，请妥善保管'不要泄漏'和'被他人复制'

'PHP等''不能直接使用p12文件'，'而需要使用pem'，'为了方便您使用'，已'为您直接提供'	

您'也可以使用openssl命令'来'自己导出'：openssl pkcs12 -clcerts -nokeys -in apiclient_cert.p12 -out apiclient_cert.pem

【'证书密钥pem格式'（apiclient_key.pem）】	
'从apiclient_key.pem'中'导出密钥部分的文件'，为pem格式	

'PHP等不能直接使用p12文件'，而'需要使用pem'，为了方便您使用，已为您直接提供	

'您也可以''使用openssl命令'来'自己导出'：openssl pkcs12 -nocerts -in apiclient_cert.p12 -out apiclient_key.pem


（2）使用商户证书
◆ 'apiclient_cert.p12'是'商户证书文件'，除'PHP外的开发'均'使用此证书文件'。
◆ '商户''如果使用.NET'环境开发，请'确认Framework版本大于2.0'，必须'在操作系统上''双击安装证书apiclient_cert.p12后''才能被正常调用'。
◆ '商户证书调用'或'安装''都需要使用到密码'，该'密码的值为微信商户号'（mch_id）
◆ 'PHP开发环境'请'使用商户证书文件apiclient_cert.pem''和apiclient_key.pem' ，'rootca.pem是CA证书'。
'各版本的调用'实例请'参考微信支付'提供的'Demo外链'。

（3）商户证书安全
'证书文件''不能放在web服务器虚拟目录'，应'放在''有访问权限控制'的'目录中'，'防止被他人下载'。
'商户服务器'要'做好病毒和木马防护工作'，不被非法侵入者窃取证书文件。




{
	appid=wx8a8a78ba51c5954c, 
	mch_id=1487276022, 
	nonce_str=21c2441eb0015b5ce9b46437d105c682, 
	out_refund_no=171025000000059, 
	out_trade_no=171025000000059, 
	refund_desc=正常退款, 
	refund_fee=1, 
	total_fee=1
}
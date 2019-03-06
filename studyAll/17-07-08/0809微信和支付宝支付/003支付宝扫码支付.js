'扫码支付'

场景介绍

扫码支付，指'用户'打开支付宝钱包中的“'扫一扫'”功能，扫描商户针对每个订单实时生成的订单'二维码'，
并在手机端确认'支付'。


1.商户系统调用支付宝'统一收单线下交易预创建'alipay.trade.precreate，'获得'该订单'二维码图片地址'。

2.发起轮询获得支付结果：等待5秒后调用'交易查询接口'alipay.trade.query'通过'支付时传入的'商户订单号'
(out_trade_no)'查询'支付'结果'（返回参数TRADE_STATUS），如果仍然返回等待用户付款（WAIT_BUYER_PAY），
则再次等待5秒后继续查询，'直到返回确切的支付结果'（成功TRADE_SUCCESS 或 已撤销关闭TRADE_CLOSED），
或是超出轮询时间。在'最后一次查询'仍然'返回等待'用户付款的情况下，必'须立即调用''交易撤销接口'
alipay.trade.cancel将这笔交易撤销，避免用户继续支付。

3.除了主动轮询，也可以通过'接受异步通知''获得支付结果'，详见扫码异步通知，注意一定'要对异步通知做验签'，
确保通知是支付宝发出的。



'统一收单线下交易预创建'
alipay.trade.precreate('统一收单线下交易预创建')
收银员通过收银台或商户后台调用支付宝接口，生成二维码后，展示给用户，由'用户扫描二维码''完成订单支付'。

"公共参数"

"请求地址"

环境			HTTPS请求地址
正式环境		https://openapi.alipay.com/gateway.do

"公共请求参数"
参数				类型		是否必填		最大长度		描述						示例值
-- app_id			String	是			32		支付宝分配给开发者的应用ID	2014072300007148
-- method			String	是			128		接口名称						alipay.trade.precreate
-- format			String	否			40		仅支持JSON					JSON
-- charset			String	是			10		请求使用的编码格式，如utf-8,gbk,gb2312等	"utf-8"
-- sign_type		String	是			10		商户生成签名字符串所使用的签名算法类型，目前支持RSA2和RSA，推荐使用RSA2	"RSA2"
-- sign			    String	是			256		商户请求参数的签名串，详见签名	详见示例
-- timestamp		String	是			19		发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"		"2014-07-24 03:07:50"
-- version			String	是			3		调用的接口版本，固定为：1.0	"1.0"
notify_url		String	否			256		支付宝服务器主动通知商户服务器里指定的页面http/https路径。	"http://api.test.alipay.net/atinterface/receive_notify.htm"
app_auth_token	String	否			40		详见应用授权概述	
biz_content		String	是					请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档	

"请求参数"
参数					类型		是否必填	最大长度	描述			示例值
"out_trade_no		String	必选		64	商户订单号,64个字符以内、只能包含字母、数字、下划线；需保证在商户端不重复	20150320010101001
seller_id			String	可选		28	卖家支付宝用户ID。 如果该值为空，则默认为商户签约账号对应的支付宝用户ID	2088102146225135
"total_amount		Price	必选		11	订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000] 如果同时传入了【打折金额】，【不可打折金额】，【订单总金额】三者，则必须满足如下条件：【订单总金额】=【打折金额】+【不可打折金额】	88.88
discountable_amount	Price	可选		11	可打折金额. 参与优惠计算的金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000] 如果该值未传入，但传入了【订单总金额】，【不可打折金额】则该值默认为【订单总金额】-【不可打折金额】	8.88
"subject			String	必选		256	订单标题	Iphone6 16G
body				String	可选		128	对交易或商品的描述	Iphone6 16G
goods_detail	GoodsDetail[] 可选		订单包含的商品列表信息.Json格式. 其它说明详见：“商品明细说明”	
operator_id			String	可选		28	商户操作员编号	yx_001
store_id			String	可选		32	商户门店编号	NJ_001
terminal_id			String	可选		32	商户机具终端编号	NJ_T_001
extend_params		ExtendParams 可选	业务扩展参数	
timeout_express		String	可选		6	该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。	90m

"公共响应参数"
参数	类型	是否必填	最大长度	描述	示例值
code	String	是	-	网关返回码,详见文档	40004
msg	String	是	-	网关返回码描述,详见文档	Business Failed
sub_code	String	否	-	业务返回码,详见文档	ACQ.TRADE_HAS_SUCCESS
sub_msg	String	否	-	业务返回码描述,详见文档	交易已被支付
sign	String	是	-	签名,详见文档	DZXh8eeTuAHoYE3w1J+POiPhfDxOYBfUNn1lkeT/V7P4zJdyojWEa6IZs6Hz0yDW5Cp/viufUb5I0/V5WENS3OYR8zRedqo6D+fUTdLHdc+EFyCkiQhBxIzgngPdPdfp1PIS7BdhhzrsZHbRqb7o4k3Dxc+AAnFauu4V6Zdwczo=

"响应参数"
参数	类型	是否必填	最大长度	描述	示例值
out_trade_no	String	必填	64	商户的订单号	6823789339978248
qr_code	String	必填	1024	当前预下单请求生成的二维码码串，可以用二维码生成工具根据该码串值生成对应的二维码	https://qr.alipay.com/bavh4wjlxf12tper3a

"最终url"：需要注意的是，在地址中
https://openapi.alipaydev.com/gateway.do?
	charset=UTF-8&
	method=alipay.trade.precreate&
	sign=JDbZ2lsA8ko3HLt%2FQj%2Fm3pNzZKYF%2BrEi1zYeP08W9rABtOT3ghzQ0%2FMTLBDTFfue8bG7bfo8IXKKtvaVn%2FMHceTREy2%2FR2IAJ9qQm6wJQr3aGuIdxChuYLHMyAagLNVPUw%2Bnq61zHJ73gzJ%2BSfigMK89SXyzrKEyrWSJlZokT1U%3D&
	notify_url=http%3A%2F%2Fliuqhj.tunnel.echomod.cn%2Fapi%2Fpay%2Fcallback%2F1%2F&
	version=1.0&
	app_id=2016080600180872&
	sign_type=RSA&
	timestamp=2017-08-10+10%3A21%3A17&
	alipay_sdk=alipay-sdk-java-dynamicVersionNo&
	format=json
		
		
		
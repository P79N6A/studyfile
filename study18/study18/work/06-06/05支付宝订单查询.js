'alipay.fund.trans.order.query'(查询转账订单接口)
商户可'通过该接口''查询''转账'订单的'状态'、支付时间等相关信息，主要'应用于''B2C转账'订单'查询'的'场景'

公共参数
请求地址
环境	HTTPS请求地址
正式环境	https://openapi.alipay.com/gateway.do
公共请求参数
参数	类型	是否必填	最大长度	描述	示例值
app_id	String	是	32	支付宝分配给开发者的应用ID	2014072300007148
method	String	是	128	接口名称	alipay.fund.trans.order.query
format	String	否	40	仅支持JSON	JSON
charset	String	是	10	请求使用的编码格式，如utf-8,gbk,gb2312等	utf-8
sign_type	String	是	10	商户生成签名字符串所使用的签名算法类型，目前支持RSA2和RSA，推荐使用RSA2	RSA2
sign	String	是	344	商户请求参数的签名串，详见签名	详见示例
timestamp	String	是	19	发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"	2014-07-24 03:07:50
version	String	是	3	调用的接口版本，固定为：1.0	1.0
app_auth_token	String	否	40	详见应用授权概述	
biz_content	String	是		请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档	


'请求参数'
参数		类型		是否必填		最大长度		描述		示例值
out_biz_no	String	可选	64	'商户转账''唯一订单号'：发起转账来源方定义的转账单据ID。 
'和支付宝''转账单据号''不能同时为空'。当和支付宝转账单据号'同时提供'时，将'用支付宝转账单据号'进行查询，忽略本参数。	3142321423432
order_id	String	可选	64	支付宝转账单据号：和商户转账唯一订单号不能同时为空。当和商户转账唯一订单号同时提供时，将用本参数进行查询，忽略商户转账唯一订单号。	20160627110070001502260006780837
公共响应参数
参数	类型	是否必填	最大长度	描述	示例值
code	String	是	-	网关返回码,详见文档	40004
msg	String	是	-	网关返回码描述,详见文档	Business Failed
sub_code	String	否	-	业务返回码，参见具体的API接口文档	ACQ.TRADE_HAS_SUCCESS
sub_msg	String	否	-	业务返回码描述，参见具体的API接口文档	交易已被支付
sign	String	是	-	签名,详见文档	DZXh8eeTuAHoYE3w1J+POiPhfDxOYBfUNn1lkeT/V7P4zJdyojWEa6IZs6Hz0yDW5Cp/viufUb5I0/V5WENS3OYR8zRedqo6D+fUTdLHdc+EFyCkiQhBxIzgngPdPdfp1PIS7BdhhzrsZHbRqb7o4k3Dxc+AAnFauu4V6Zdwczo=

	
'响应参数'
参数	类型	是否必填	最大长度	描述	示例值
order_id	String	选填	64	支付宝转账单据号，查询失败不返回。	2912381923
status	String	选填	10	转账单据状态。 
SUCCESS：成功（配合"单笔转账到银行账户接口"产品使用时, 同一笔单据多次查询有可能从成功变成退票状态）； 
FAIL：失败（具体失败原因请参见error_code以及fail_reason返回值）； 
INIT：等待处理； 
DEALING：处理中； 
REFUND：退票（仅配合"单笔转账到银行账户接口"产品使用时会涉及, 具体退票原因请参见fail_reason返回值）； 
UNKNOWN：状态未知。	SUCCESS
pay_date	String	选填	20	支付时间，格式为yyyy-MM-dd HH:mm:ss，转账失败不返回。	2013-01-01 08:08:08
arrival_time_end	String	选填	20	预计到账时间，转账到银行卡专用，格式为yyyy-MM-dd HH:mm:ss，转账受理失败不返回。 
注意： 
此参数为预计时间，可能与实际到账时间有较大误差，不能作为实际到账时间使用，仅供参考用途。	2013-01-01 08:08:08
order_fee	String	选填	20	预计收费金额（元），转账到银行卡专用，数字格式，精确到小数点后2位，转账失败或转账受理失败不返回。	0.02
fail_reason	String	选填	100	查询到的订单状态为FAIL失败或REFUND退票时，返回具体的原因。	单笔额度超限
out_biz_no	String	选填	64	发起转账来源方定义的转账单据号。 
该参数的赋值均以查询结果中 的 out_biz_no 为准。 
如果查询失败，不返回该参数。	3142321423432
error_code	String	选填	100	查询失败时，本参数为错误代 码。 
查询成功不返回。 对于退票订单，不返回该参数。	ORDER_NOT_EXIST
请求示例
JAVA  .NET  PHP  HTTP请求源码
AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do","app_id","your private_key","json","GBK","alipay_public_key","RSA2");
AlipayFundTransOrderQueryRequest request = new AlipayFundTransOrderQueryRequest();
request.setBizContent("{" +
"\"out_biz_no\":\"3142321423432\"," +
"\"order_id\":\"20160627110070001502260006780837\"" +
"  }");
AlipayFundTransOrderQueryResponse response = alipayClient.execute(request);
if(response.isSuccess()){
System.out.println("调用成功");
} else {
System.out.println("调用失败");
}
响应示例
JSON 示例  XML 示例
{
    "alipay_fund_trans_order_query_response": {
        "code": "10000",
        "msg": "Success",
        "order_id": "2912381923",
        "status": "SUCCESS",
        "pay_date": "2013-01-01 08:08:08",
        "arrival_time_end": "2013-01-01 08:08:08",
        "order_fee": "0.02",
        "fail_reason": "单笔额度超限",
        "out_biz_no": "3142321423432",
        "error_code": "ORDER_NOT_EXIST"
    },
    "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
}
异常示例
JSON 示例
{
    "alipay_fund_trans_order_query_response": {
        "code": "20000",
        "msg": "Service Currently Unavailable",
        "sub_code": "isp.unknow-error",
        "sub_msg": "系统繁忙"
    },
    "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
}
业务错误码
公共错误码

错误码	错误描述	解决方案
ORDER_NOT_EXIST	转账订单不存在	转账订单不存在的原因,可能是转账还在处理中,也可能是转账处理失败,导致转账订单没有落地。商户首先需要检查该订单号是否确实是自己发起的, 如果确认是自己发起的转账订单,请不要直接当作转账失败处理,请隔几分钟再尝 试查询,或者通过相同的 out_biz_no 再次发起转账。如果误把还在转账处理中的订单直接当转账失败处理,商户自行承担因此而产生的所有损失。
NO_ORDER_PERMISSION	商家没有该笔订单的操作权限	请重新检查一下查询条件是否正确。商户只允许查询自己发起的转账订单,如果查询的转账订单不属于该商户就会报该错误。
INVALID_PARAMETER	参数有误。	请检查请求参数的长度正确性和合法性，out_biz_no与order_id不能同时为空
ILLEGAL_ACCOUNT_STATUS_EXCEPTION	账户状态异常	请检查一下账户状态是否正常，如果账户不正常请联系支付宝小二。联系方式：https://support.open.alipay.com/alipay/support/index.htm
SYSTEM_ERROR	系统繁忙	支付宝系统繁忙或者处理超时，请稍后重试。
ORDER_ID_INVALID	非法的支付宝转账单据号	当请求参数order_id不为空时，检查长度是否符合要求。当前order_id长度仅支持30或32位。
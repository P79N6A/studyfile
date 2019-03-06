'当交易发生'之后'一段时间'内，由于买家或者卖家的原因'需要退款时'，
'卖家'可以'通过退款接口''将支付款退还给买家'，
'支付宝'将在'收到退款请求''并且验证成功之后'，
'按照退款规则''将支付款'按'原路退到买家帐号'上。
交易'超过约定时间'（签约时设置的可退款时间）的订单'无法进行退款'
'支付宝退款''支持单笔交易分多次退款'，
'多次退款'需要'提交原支付订单'的'商户订单号'和'设置不同的退款单号'。
'一笔退款失败'后'重新提交'，要'采用原来的退款单号'。
'总退款金额''不能超过用户实际支付金额'

公共请求参数

参数				类型		是否必填		最大长度		描述							示例值
app_id			String	是			32	支付宝分配给开发者的'应用ID'		2014072300007148
method			String	是			128	'接口名称'							alipay.trade.refund
'format			String	否			40	仅支持JSON						JSON'
charset			String	是			10	请求使用的编码格式，如utf-8,gbk,gb2312等	utf-8
sign_type		String	是			10	商户生成签名字符串所使用的'签名算法类型'，目前支持RSA2和RSA，推荐使用RSA2	RSA2
sign			String	是			256	商户请求参数的'签名串'，详见签名	详见示例
timestamp		String	是			19	发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"	2014-07-24 03:07:50
version			String	是			3	调用的接口版本，固定为：1.0	'1.0'
'app_auth_token	String	否			40	详见应用授权概述'	
biz_content		String	是				'请求参数的集合'，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档

请求参数
out_trade_no	String	特殊可选	64	订单支付时传入的'商户订单号','不能和 trade_no''同时为空'。	20150320010101001
//trade_no		String	特殊可选	64	'支付宝交易号'，和'商户订单号不能同时为空'					2014112611001004680073956707
refund_amount	Price	必选		9	需要'退款的金额'，该金额'不能大于订单金额',单位为元，支持两位小数	200.12
//refund_reason	String	可选		256	退款的原因说明										正常退款
//out_request_no	String	可选		64	标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。	HZ01RF001
//operator_id		String	可选		30	商户的操作员编号										OP001
//store_id		String	可选		32	商户的门店编号										NJ_S_001
//terminal_id		String	可选		32	商户的终端编号										NJ_T_001

公共响应参数
code		String	是	-	网关返回码,详见文档		40004
msg			String	是	-	网关返回码描述,详见文档	Business Failed
sub_code	String	否	-	业务返回码,详见文档		ACQ.TRADE_HAS_SUCCESS
sub_msg		String	否	-	业务返回码描述,详见文档	交易已被支付
sign		String	是	-	签名,详见文档			DZXh8eeTuAHoYE3w1J+POiPhfDxOYBfUNn1lkeT/V7P4zJdyojWEa6IZs6Hz0yDW5Cp/viufUb5I0/V5WENS3OYR8zRedqo6D+fUTdLHdc+EFyCkiQhBxIzgngPdPdfp1PIS7BdhhzrsZHbRqb7o4k3Dxc+AAnFauu4V6Zdwczo=

响应参数
trade_no				String	必填	64	2013112011001004330000121536	支付宝交易号
out_trade_no			String	必填	64	商户订单号	6823789339978248
buyer_logon_id			String	必填	100	用户的登录id	159****5620
fund_change				String	必填	1	本次退款是否发生了资金变化	Y
refund_fee				Price	必填	11	退款总金额	88.88
gmt_refund_pay			Date	必填	32	退款支付时间	2014-11-27 15:45:57
refund_detail_item_list	TradeFundBill 选填 退款使用的资金渠道	
store_name				String	选填	512	交易在支付时候的门店名称	望湘园联洋店
buyer_user_id			String	必填	28	买家在支付宝的用户id	2088101117955611


170818144700082


{
	"alipay_trade_refund_response":{
		"code":"40004",
		"msg":"Business Failed",
		"sub_code":"ACQ.INVALID_PARAMETER",
		"sub_msg":"参数无效"
	}
	"sign":"VUvzsc2j3RftCJvllUH51KfBBbQ4KZIqRpgI9ftkkryQ5Sk7EDUSqVxaVdhoECONY/zhWi6zfTn9CefazeF/RQNHSf/FciqtOnt165aEWl2fCYNMJ5gkQwvyvzihgs6SRH/9ONPeSc6SQzI4DmHrR44ZNuNmN76pqtUw+L0/v3s="
}

{
	"alipay_trade_refund_response":{"code":"40004","msg":"Business Failed","sub_code":"ACQ.INVALID_PARAMETER","sub_msg":"参数无效"},
	"sign":"VUvzsc2j3RftCJvllUH51KfBBbQ4KZIqRpgI9ftkkryQ5Sk7EDUSqVxaVdhoECONY/zhWi6zfTn9CefazeF/RQNHSf/FciqtOnt165aEWl2fCYNMJ5gkQwvyvzihgs6SRH/9ONPeSc6SQzI4DmHrR44ZNuNmN76pqtUw+L0/v3s="
}
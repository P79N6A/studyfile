'设备号'	device_info	否	String(32)	013467007045764	微信支付分配的终端设备号，
'用户标识'	openid	是	String(128)	oUpF8uMuAJO_M2pxb1Q9zNjWeS6o	用户在商户appid下的唯一标识
'是否关注公众账号'	is_subscribe	否	String(1)	Y	用户是否关注公众账号，Y-关注，N-未关注，仅在公众账号类型支付有效
'交易类型'	trade_type	是	String(16)	APP	调用接口提交的交易类型
'交易状态'	trade_state	是	String(32)	SUCCESS	
'SUCCESS'—支付成功   //==

'REFUND'—转入退款

'NOTPAY'—未支付

'CLOSED'—已关闭     //==

'REVOKED'—已撤销（刷卡支付）

'USERPAYING'--用户支付中

'PAYERROR'--支付失败(其他原因，如银行返回失败)

'付款银行'	bank_type	是	String(16)	CMC	银行类型，采用字符串类型的银行标识
'总金额'	total_fee	是	Int	100	订单总金额，单位为分
'货币种类'	fee_type	否	String(8)	CNY	货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
'现金支付金额'	cash_fee	是	Int	100	现金支付金额订单现金支付金额，详见支付金额
'现金支付货币类型'	cash_fee_type	否	String(16)	CNY	货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
'应结订单金额'	settlement_total_fee	否	Int	100	当订单使用了免充值型优惠券后返回该参数，应结订单金额=订单金额-免充值优惠券金额。
'代金券金额'	coupon_fee	否	Int	100	“代金券或立减优惠”金额<=订单总金额，订单总金额-“代金券或立减优惠”金额=现金支付金额，详见支付金额
'代金券使用数量'	coupon_count	否	Int	1	代金券或立减优惠使用数量
'代金券ID'	coupon_id_$n	否	String(20)	10000 	代金券或立减优惠ID, $n为下标，从0开始编号
'代金券类型'	coupon_type_$n	否	String	CASH	
'CASH'--充值代金券 
'NO_CASH'---非充值优惠券

开通免充值券功能，并且订单使用了优惠券后有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_$0

'单个代金券支付金额'	coupon_fee_$n	否	Int	100	单个代金券或立减优惠支付金额, $n为下标，从0开始编号
'微信支付订单号'	transaction_id	是	String(32)	1009660380201506130728806387	微信支付订单号
'商户订单号'	out_trade_no	是	String(32)	20150806125346	商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
'附加数据'	attach	否	String(128)	深圳分店	附加数据，原样返回
'支付完成时间'	time_end	是	String(14)	20141030133525	订单支付时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
'交易状态描述'	trade_state_desc	是	String(256)	支付失败，请重新下单支付	对当前查询订单状态的描述和下一步操作的指引
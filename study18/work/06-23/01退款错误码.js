wx:
SYSTEMERROR				接口返回错误									系统超时等	请不要更换商户退款单号，请使用相同参数再次调用API。
BIZERR_NEED_RETRY		'退款业务流程错误'，需要商户'触发重试来解决'	'并发情况下'，'业务被拒绝'，商户'重试即可解决'	请不要更换商户退款单号，请使用相同参数再次调用API。
TRADE_OVERDUE			订单'已经超过退款期限'							订单已经超过'可退款的最大期限'(支付后'一年'内可退款)	请选择其他方式自行退款
ERROR					'业务错误'										申请'退款业务发生错误'	该错误都'会返回具体的错误原因'，'请根据实际返回''做相应处理'。
USER_ACCOUNT_ABNORMAL	退款请求失败									'用户帐号注销'	此状态'代表退款申请失败'，商户可'自行处理退款'。
INVALID_REQ_TOO_MUCH	无效请求过多									连续错误请求数过多被系统短暂屏蔽	请检查业务是否正常，确认业务正常后请在1分钟后再来重试
NOTENOUGH				'余额不足'										商户可用退款余额不足	此状态代表退款申请失败，商户可根据具体的错误提示做相应的处理。
INVALID_TRANSACTIONID	'无效transaction_id'							请求参数未按指引进行填写	请求参数错误，检查原交易号是否存在或发起支付交易接口返回失败
PARAM_ERROR				参数错误										请求参数未按指引进行填写	请求参数错误，请重新检查再调用退款申请
APPID_NOT_EXIST	APPID	不存在											参数中缺少APPID	请检查APPID是否正确
MCHID_NOT_EXIST	MCHID	不存在											参数中缺少MCHID	请检查MCHID是否正确
REQUIRE_POST_METHOD		请使用post方法									未使用post传递参数 	请检查请求参数是否通过post方法提交
SIGNERROR				签名错误										参数签名结果不正确	请检查签名参数和方法是否都符合签名算法要求
XML_FORMAT_ERROR		XML格式错误										XML格式错误	请检查XML参数格式是否正确
FREQUENCY_LIMITED		'频率限制'										2个月之前的订单申请退款有频率限制	该笔退款未受理，请降低频率后重试


ali:
'ACQ.SYSTEM_ERROR'				系统错误				请使用相同的参数'再次调用'
'ACQ.INVALID_PARAMETER'			参数无效				请求'参数有错'，重新'检查请求'后，'再调用退款'
'ACQ.SELLER_BALANCE_NOT_ENOUGH'	卖家余额不足			商户支付宝账户'充值后''重新发起退款'即可
'ACQ.REFUND_AMT_NOT_EQUAL_TOTAL'退款金额超限			检查退款金额是否正确，重新修改请求后，重新发起退款
'ACQ.REASON_TRADE_BEEN_FREEZEN'	请求退款的'交易被冻结'	联系支付宝小二，确认该笔交易的具体情况
'ACQ.TRADE_NOT_EXIST'			'交易不存在'			检查请求中的交易号和商户订单号是否正确，确认后重新发起
'ACQ.TRADE_HAS_FINISHED'		交易已完结				该'交易已完结'，'不允许进行退款'，确认请求的退款的交易信息是否正确
ACQ.TRADE_STATUS_ERROR			交易状态非法			查询交易，确认交易是否已经付款
ACQ.DISCORDANT_REPEAT_REQUEST	不一致的请求			检查该退款号是否已退过款或更换退款号重新发起请求
ACQ.REASON_TRADE_REFUND_FEE_ERR	退款金额无效			检查退款请求的金额是否正确
ACQ.TRADE_NOT_ALLOW_REFUND		当前交易不允许退款		检查当前交易的状态是否为交易成功状态以及签约的退款属性是否允许退款，确认后，重新发起请求
ACQ.REFUND_FEE_ERROR			交易退款金额有误		请检查传入的退款金额是否正确

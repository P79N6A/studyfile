接口介绍
业务流程	接口	简介
付款	'企业付款'	'用于企业''向''微信用户'个人'付款'
目前'支持'向'指定微信用户'的'openid付款'。（获取openid参见微信公众平台开发者文档： 网页授权获取用户基本信息）
注意事项：

◆ 当返回'错误码'为'“SYSTEMERROR”'时，请'不要更换'商户'订单号'，一定要'使用原商户订单号''重试'，
否则可能造成重复支付等资金风险。

◆ XML具有可扩展性，因此'返回参数''可能'会'有新增'，
而且顺序可能不完全遵循此文档规范，如果在'解析回包'的时候'发生错误'，
请商户'务必不要换单重试'，'请商户联系客服''确认付款情况'。如果'有新回包字段'，'会更新到'此'API文档中'。

◆ 因为'错误代码字段''err_code'的值后续'可能会增加'，所以'商户'如果'遇到回包返回''新的错误码'，
请商户务必'不要换单重试'，请商户联系客服确认付款情况。如果有新的错误码，会更新到此API文档中。

◆ 错误代码'描述字段err_code_des''只供人工定位'问题时做'参考'，系统实现时请不要依赖这个字段来做自动化处理。

接口地址
接口链接：https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers
	
数字证书

'请求参数'
商户账号appid		'mch_appid'		是		wx8888888888888888					String		申请商户号的appid或商户号绑定的appid
商户号				'mchid'			是		1900000109							String(32)	微信支付分配的'商户号'
//设备号				device_info		否		013467007045764						String(32)	微信支付分配的终端设备号
随机字符串			'nonce_str'		是		5K8264ILTKCH16CQ2502SI8ZNMTM67VS	String(32)	随机字符串，不长于32位
签名					sign			是		C380BEC2BFD727A4B6845133519F3AD6	String(32)	'签名'，详见签名算法
商户订单号		  'partner_trade_no'是		10000098201411111234567890			String		商户'订单号'，需'保持唯一'性(只能是字母或者数字，不能包含有符号)
用户openid			'openid'		是		oxTWIuGaIt6gTKsQRLau2M0yL16E		String		'商户appid下'，某用户的'openid'
校验用户姓名选项		'check_name'	是		FORCE_CHECK							String		NO_CHECK：'不校验'真实姓名 FORCE_CHECK：强校验真实姓名
//收款用户姓名		re_user_name	可选		王小王								String		收款用户真实姓名。 如果check_name设置为FORCE_CHECK，则必填用户真实姓名
金额					'amount'		是		10099								int			企业'付款金额'，单位为分
企业付款描述信息		'desc'			是		理赔									String		企业付款'操作说明'信息。必填。
Ip地址			  'spbill_create_ip'是		192.168.0.1							String(32)	'该IP'同'在商户平台'设置的'IP白名单'中的IP'没有关联'，该IP可传用户端或者服务端的IP。



'返回参数'
返回状态码		return_code	是	SUCCESS	String(16)	SUCCESS/FAIL 此字段是通信标识，非交易标识，交易是否成功需要查看result_code来判断
返回信息			return_msg	否	签名失败	String(128)	返回信息，如非空，为错误原因 签名失败 参数格式校验错误

return_code为SUCCESS的时候有返回
商户appid		mch_appid	是	wx8888888888888888	String		申请商户号的appid或商户号绑定的appid（企业号corpid即为此appId）
商户号			mchid		是	1900000109			String(32)	微信支付分配的商户号
设备号			device_info	否	013467007045764		String(32)	微信支付分配的终端设备号，
随机字符串		nonce_str	是	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	String(32)	随机字符串，不长于32位
业务结果			result_code	是	SUCCESS				String(16)	SUCCESS/FAIL，注意：当状态为FAIL时，存在业务结果未明确的情况，所以如果状态FAIL，请务必再请求一次查询接口[请务必关注错误代码（err_code字段），通过查询查询接口确认此次付款的结果。]，以确认此次付款的结果。
错误代码			err_code	否	SYSTEMERROR			String(32)	错误码信息，注意：出现未明确的错误码时（SYSTEMERROR等）[出现系统错误的错误码时（SYSTEMERROR），请务必用原商户订单号重试，或通过查询接口确认此次付款的结果。]，请请务必再请求一次查询接口，以确认此次付款的结果。
错误代码描述		err_code_des否	系统错误				String(128)	结果信息描述

以下字段在return_code 和result_code都为SUCCESS的时候有返回
商户订单号		partner_trade_no是	1217752501201407033233368018	String(32)	商户订单号，需保持历史全局唯一性(只能是字母或者数字，不能包含有符号)
微信订单号		payment_no		是	1007752501201407033233368018	String		企业付款成功，返回的微信订单号
微信支付成功时间	payment_time	是	2015-05-19 15：26：59			String		企业付款成功时间










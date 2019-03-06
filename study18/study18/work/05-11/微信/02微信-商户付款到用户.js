
业务"流程"		接口			简介
付款			    企业付款		用于企业向微信用户个人付款
目前支持"向指定"微信"用户的openid""付款"。
（获取openid参见微信公众平台开发者文档： 网页授权获取用户基本信息）

重要提醒：
"当"返回"错误码"为"“SYSTEMERROR”时"，请"不要更换商户订单号"，
一定要使"用原"商户"订单号重试"，"否则"可能"造成重复支付"等资金风险。

接口地址
接口链接："https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers"

是否需要证书
请求"需要双向证书"。 详见证书使用

【请求参数】
【字段名】		【变量名】	【必填】	【示例值】	【类型】		【描述】
商户账号appid	mch_appid	是	wx8888888888888888	String	申请商户号的"appid"或商户号绑定的appid
商户号			mchid		是	1900000109			String"(32)" 微信支付分配的"商户号"
//设备号			device_info	否	013467007045764		String(32)	微信支付分配的终端设备号
随机字符串		nonce_str	是	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	String"(32)"	"随机字符串"，不长于32位
签名				sign		是	C380BEC2BFD727A4B6845133519F3AD6	String"(32)"	"签名"，详见签名算法
商户订单号 partner_trade_no  是	10000098201411111234567890	String	"商户订单号"，需保持唯一性(只能是字母或者数字，不能包含有符号)
用户openid		openid		是	oxTWIuGaIt6gTKsQRLau2M0yL16E	String	"商户appid下"，某"用户的openid"
校验用户姓名选项	check_name	是	FORCE_CHECK	String	NO_CHECK：不校验真实姓名 FORCE_CHECK：强校验真实姓名
收款用户姓名	re_user_name   可选	王小王	String	收款用户真实姓名。 如果check_name设置为"FORCE_CHECK"，则"必填"用户"真实姓名"
金额				amount		是	10099	"int"	企业付款金额，"单位为分"
企业付款描述信息	desc		是	理赔	String	企业付款操作说明信息。必填。
Ip地址	spbill_create_ip	是	192.168.0.1	String"(32)"	该IP同在商户平台设置的IP白名单中的IP没有关联，该IP可传用户端或者服务端的IP。
请求示例：

<xml> 
	<mch_appid>wxe062425f740c30d8</mch_appid>  
	<mchid>10000098</mchid>  
	<nonce_str>3PG2J4ILTKCH16CQ2502SI8ZNMTM67VS</nonce_str>  
	<partner_trade_no>100000982014120919616</partner_trade_no>  
	<openid>ohO4Gt7wVPxIT1A9GjFaMYMiZY1s</openid>  
	<check_name>FORCE_CHECK</check_name>  
	<re_user_name>张三</re_user_name>  
	<amount>100</amount>  
	<desc>节日快乐!</desc>  
	<spbill_create_ip>10.2.3.10</spbill_create_ip>  
	<sign>C97BDBACF37622775366F38B629F45E3</sign> 
</xml>

【返回参数】
【字段名】	【变量名】	【必填】	【示例值】	【类型】		【描述】
返回状态码	return_code		是	SUCCESS		String(16)	SUCCESS/FAIL 此字段是通信标识，非交易标识，"交易""是否成功"需要"查看result_code"来判断
返回信息		return_msg		否	签名失败		String(128)	返回信息，如"非空"，为"错误原因" 签名失败 参数格式校验错误


以下字段在"return_code"为"SUCCESS"的时候"有返回"
【字段名】	【变量名】	【必填】	【示例值	】	【类型】		【描述】
商户appid	mch_appid	是	wx8888888888888888	String	申请商户号的appid或商户号绑定的appid（企业号corpid即为此appId）
商户号		mchid		是	1900000109		String(32)	微信支付分配的商户号
设备号	device_info		否	013467007045764	String(32)	微信支付分配的终端设备号，
随机字符串	nonce_str	是	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	String(32)	随机字符串，不长于32位
业务结果	result_code		是	SUCCESS			String(16)	SUCCESS/FAIL，注意：当状态为"FAIL"时，存在业务"结果未明确"的情况，所以如果状态FAIL，请务必"再请求一次查询接口"[请务必"关注错误代码"（"err_code字段"），通过查询"查询接口""确认此次付款"的"结果"。]，以确认此次付款的结果。
错误代码	err_code		否	SYSTEMERROR		String(32)	错误码信息，注意："出现未明确"的"错误码时"（SYSTEMERROR等）[出现系统错误的错误码时（SYSTEMERROR），请务必"用原商户订单号""重试"，"或"通过"查询接口确认"此次"付款"的"结果"。]，请请务必再请求一次查询接口，以确认此次付款的结果。
错误代码描述	err_code_des否	系统错误			String(128)	结果信息描述


以下字段在"return_code" 和"result_code"都为"SUCCESS"的时候有返回
【字段名】	【变量名】	【必填】	【示例值】					【类型】    【描述】
商户订单号 partner_trade_no	 是	1217752501201407033233368018 String(32)	商户订单号，需保持历史全局唯一性(只能是字母或者数字，不能包含有符号)
微信订单号	payment_no		 是	1007752501201407033233368018 String	    企业付款成功，返回的微信订单号
微信支付成功时间	payment_time 是	2015-05-19 15：26：59	     String	    企业付款成功时间

成功示例：
<xml> 
	<return_code><![CDATA[SUCCESS]]></return_code>  
	<return_msg><![CDATA[]]></return_msg>  
	<mch_appid><![CDATA[wxec38b8ff840bd989]]></mch_appid>  
	<mchid><![CDATA[10013274]]></mchid>  
	<device_info><![CDATA[]]></device_info>  
	<nonce_str><![CDATA[lxuDzMnRjpcXzxLx0q]]></nonce_str>  
	<result_code><![CDATA[SUCCESS]]></result_code>  
	<partner_trade_no><![CDATA[10013574201505191526582441]]></partner_trade_no>  
	<payment_no><![CDATA[1000018301201505190181489473]]></payment_no>  
	<payment_time><![CDATA[2015-05-19 15：26：59]]></payment_time> 
</xml>

错误示例：
<xml> 
	<return_code><![CDATA[FAIL]]></return_code>  
	<return_msg><![CDATA[系统繁忙,请稍后再试.]]></return_msg>  
	<result_code><![CDATA[FAIL]]></result_code>  
	<err_code><![CDATA[SYSTEMERROR]]></err_code>  
	<err_code_des><![CDATA[系统繁忙,请稍后再试.]]></err_code_des> 
</xml>


错误码
【错误代码】	【描述】			【原因】														   【解决方案】
NO_AUTH		 "没"有该"接口权限"	1. 用户"账号被冻结"，无法付款
							2. 产品权限"没有开通"或者被风控冻结
							3. 此"IP地址不允许"调用接口，如有需要请登录微信支付商户平台更改配置 请根据具体的错误返回描述做对应处理，如返回描述不够明确，请参考此处的错误原因做排查

AMOUNT_LIMIT "金额超限"		1. 被"微信风控拦截"，最低单笔付款限额调整为5元。
							2. "低于最低"单笔付款限额或者"高于最高"单笔付款限额                目前最低付款金额为1元，最高200w，请确认是否付款金额超限

PARAM_ERROR	  "参数错误"	    1. 请求"参数校验错误"
							2. 字符中包含"非utf8字符"
							3. "商户号"和"appid没有绑定"关系                                 请参照原因检查您的请求参数是否正确

OPENID_ERROR  "Openid错误"	Openid"格式错误"或者"不属于商家"公众账号	                        Openid与appid是有一一映射关系的，请确保正确使用

SEND_FAILED	 "付款错误"	  付款错误，请"查单确认"付款"结果" 									请查单确认付款结果

NOTENOUGH	"余额不足"	 您的付款帐号余额不足或资金未到账                                     如果要"继续付款"必须"使用原"商户"订单号"重试。

SYSTEMERROR	"系统繁忙，请稍后再试。微信内部接口调用发生错误"  请"先调用查询"接口，"查看此次付款结果"，"如结果"为"不明确状态"（如订单号不存在），请"务必使用原商户订单号"进行"重试"

NAME_MISMATCH "姓名校验出错"	 付款人"身份校验不通过" 如果要继续付款"必须使用原"商户"订单号重试"。

SIGN_ERROR	"签名错误"	 校验签名错误 请检查您的请求参数和签名密钥KEY是否正确，如果要继续付款必须使用原商户订单号重试。

XML_ERROR	Post内容出错	 Post请求数据"不是合法的xml格式"内容 格式问题，请检查请求格式是否正确

FATAL_ERROR	"两次请求参数不一致" 两次请求"商户单号一样"，但是"参数不一致" 重入必须保证所有参数值都不变

FREQ_LIMIT	"超过频率"限制，请稍后再试。 接口请求频率超时接口限制 调用接口过于频繁，请稍后再试，如果要"继续付款"必"须使用原"商户"订单号"重试。

MONEY_LIMIT	已经达到今日付款"总额上限"/已达到付款给此用户额度上限	 请关注接口的付款限额条件 付款额度已经超限，请参考接口使用条件，如果要继续付款必须使用原商户订单号重试。

CA_ERROR	商户"API证书校验出错"	请求没带商户API证书或者带上了错误的商户API证书	您使用的调用证书有误，请确认是否使用了正确的证书，可以前往商户平台重新下载，证书需与商户号对应，如果要继续付款必须使用原商户订单号重试。

V2_ACCOUNT_SIMPLE_BAN  "无法"给"非实名用户付款"	用户微信支付账户未知名，无法付款	不支持给非实名用户付款，如果要继续付款必须使用原商户订单号重试。

PARAM_IS_NOT_UTF8	请求参数中"包含非utf8编码字符"	接口规范要求所有请求参数都必须为utf8编码 微信接口使用编码是UTF-8，请确认，如果要继续付款必须使用原商户订单号重试。

SENDNUM_LIMIT 该用户今日"付款次数超过限制,如有需要请登录微信支付商户平台更改API安全配置 该用户今日付款次数超过限制,如有需要请登录微信支付商户平台更改API安全配置 向用户付款的次数超限了，请参考接口使用条件，如果要继续付款必须使用原商户订单号重试。


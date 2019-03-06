2. 接口调用配置
各语言版本服务端SDK详细使用说明，请参考《服务端SDK使用说明》

'SDK调用前'需要进行'初始化'，'代码'示例'如下'：

AlipayClient alipayClient = new DefaultAlipayClient(URL, APP_ID, APP_PRIVATE_KEY, FORMAT, CHARSET, ALIPAY_PUBLIC_KEY, SIGN_TYPE);
关键参数说明：

配置参数	示例值解释	获取方式/示例值
'URL'	支付宝'网关'（固定）	https://openapi.alipay.com/gateway.do
'APP_ID'	APPID即创建应用后生成	获取见上面创建应用并获取APPID
'APP_PRIVATE_KEY'	开发者应用私钥，由开发者自己生成	获取见上面配置密钥
'FORMAT'	参数返回格式，'只支持json'	json（固定）
'CHARSET'	请求和签名使用的字符编码格式，支持GBK和'UTF-8'	开发者根据实际工程编码配置
'ALIPAY_PUBLIC_KEY'	支付宝公钥，由支付宝生成	获取详见上面配置密钥
'SIGN_TYPE'	商户生成签名字符串所使用的'签名算法类型'，目前支持RSA2和RSA，推荐使用RSA2	'RSA2'
接口调用
调用流程
image

说明：
'如果商户重复请求转账'，支付宝会'幂等返回成功'结果，商户必须'对重复转账的业务''做'好'幂等处理'；
如果不判断，存在潜在的风险，商户自行承担因此而产生的所有损失。
如果'调用'alipay.fund.trans.toaccount.transfer'掉单时'，'或返回'结果'code=20000时'，'或返回'结果'code=40004，sub_code= SYSTEM_ERROR时'，
'请调用'alipay.fund.trans.order.query'发起查询'，如果'未查询'到'结果'，请'保持原请求不变''再次请求'alipay.fund.trans.toaccount.transfer'接口'。
商户'处理转账结果'时，'对'于'错误码的处理'，只能'使用sub_code'作为后续处理的'判断'依据，不可使用sub_msg作为后续处理的判断依据。
SDK调用
1.alipay.fund.trans.toaccount.transfer接口调用示例：

AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do","app_id","your private_key","json","GBK","alipay_public_key","RSA2");
AlipayFundTransToaccountTransferRequest request = new AlipayFundTransToaccountTransferRequest();
request.setBizContent("{" +
"    \"out_biz_no\":\"3142321423432\"," +
"    \"payee_type\":\"ALIPAY_LOGONID\"," +
"    \"payee_account\":\"abc@sina.com\"," +
"    \"amount\":\"12.23\"," +
"    \"payer_show_name\":\"上海交通卡退款\"," +
"    \"payee_real_name\":\"张三\"," +
"    \"remark\":\"转账备注\"," +
"  }");
AlipayFundTransToaccountTransferResponse response = alipayClient.execute(request);
if(response.isSuccess()){
System.out.println("调用成功");
} else {
System.out.println("调用失败");
}
2.alipay.fund.trans.order.query接口调用示例

AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do","app_id","your private_key","json","GBK","alipay_public_key","RSA2");
AlipayFundTransOrderQueryRequest request = new AlipayFundTransOrderQueryRequest();
request.setBizContent("{" +
"    \"out_biz_no\":\"3142321423432\"," +
"    \"order_id\":\"20160627110070001502260006780837\"" +
"  }");
AlipayFundTransOrderQueryResponse response = alipayClient.execute(request);
if(response.isSuccess()){
System.out.println("调用成功");
} else {
System.out.println("调用失败");
}
关于沙箱
如何接入沙箱
沙箱环境是开放平台提供给开发者调试接口的环境，具体操作步骤见沙箱接入指南。

'单笔转账'到支付宝账户'沙箱接入''注意点'
单笔转账到支付宝账户'支持沙箱接入'：在沙箱调通接口后，'必须在线上进行测试'与'验收'，所有'返回码'及'业务逻辑''以线上为准'；
单笔转账到支付宝账户请'使用单笔转账'到支付宝产品'沙箱账号进行测试'：点击开发者中心-沙箱环境-沙箱账号。




'单笔转账'到支付宝账户接口是'基于'支付宝的'资金处理能力'，'为'了'满足'支付宝'商家向'其他'支付宝账户转账''的需求'，
针对有部分开发能力的商家，提供通过API接口完成支付宝账户间的转账的功能。 
该接口适用行业较广，比如商家间的货款结算，商家给个人用户发放佣金等。

环境	HTTPS请求地址
正式环境	https://openapi.alipay.com/gateway.do
'公共请求参数'
参数	类型	是否必填	最大长度	描述	示例值
'app_id'	String	是	32	支付宝分配给'开发者的应用ID'	2014072300007148
'method'	String	是	128	接口名称	'alipay.fund.trans.toaccount.transfer'
format	String	否	40	仅支持JSON	JSON
'charset'	String	是	10	请求使用的编码格式，如utf-8,gbk,gb2312等	utf-8
'sign_type'	String	是	10	商户生成签名字符串所使用的签名算法类型，目前支持RSA2和RSA，推荐使用RSA2	RSA2
'sign'	String	是	344	商户请求参数的签名串，详见签名	详见示例
'timestamp'	String	是	19	发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"	2014-07-24 03:07:50
'version'	String	是	3	调用的接口版本，固定为：1.0	1.0
app_auth_token	String	否	40	详见应用授权概述	
'biz_content'	String	是		请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档	


'请求参数'
参数		类型		是否必填		最大长度		描述		示例值
'out_biz_no'	String	必选	64	商户转账唯一'订单号'。发起转账来源方定义的转账单据ID，用于将转账回执通知给来源方。 
不同来源方给出的ID可以重复，同一个来源方必须保证其ID的唯一性。 
只支持半角英文、数字，及“-”、“_”。	3142321423432
'payee_type'	String	必选	20	'收款方账户类型'。可取值： 
1、ALIPAY_USERID：'支付宝账号'对应'的支付宝唯一用户号'。以2088开头的16位纯数字组成。 
2、ALIPAY_LOGONID：'支付宝登录号'，支持'邮箱'和'手机号格式'。	ALIPAY_LOGONID
'payee_account'	String	必选	100	'收款方账户'。'与payee_type配合'使用。付款方和收款方不能是同一个账户。	abc@sina.com
'amount'	String	必选	16	'转账金额'，'单位：元'。 
只支持2位小数，小数点前最大支持13位，金额必须大于等于0.1元。 
最大转账金额以实际签约的限额为准。	12.23
'payer_show_name'	String	可选	100	'付款方姓名'（最长支持100个英文/50个汉字）。显示在收款方的账单详情页。如果该字段不传，则默认显示付款方的支付宝认证姓名或单位名称。	'上海交通卡退款
payee_real_name	String	可选	100	收款方真实姓名（最长支持100个英文/50个汉字）。 
如果本参数不为空，则会校验该账户在支付宝登记的实名是否与收款方真实姓名一致。	张三
'remark'	String	可选	200	转账备注（支持200个英文/100个汉字）。
当付款方为企业账户，且转账金额达到（大于等于）50000元，remark不能为空。收款方可见，会展示在收款用户的收支详情中。	转账备注


'公共响应参数'
参数	类型	是否必填	最大长度	描述	示例值
'code'	String	是	-	网关返回码,详见文档	40004
'msg'	String	是	-	网关返回码描述,详见文档	Business Failed
'sub_code'	String	否	-	业务'返回码'，参见具体的API接口文档	ACQ.TRADE_HAS_SUCCESS
'sub_msg'	String	否	-	业务'返回码描述'，参见具体的API接口文档	交易已被支付
'sign'	String	是	-	'签名',详见文档	DZXh8eeTuAHoYE3w1J+POiPhfDxOYBfUNn1lkeT/V7P4zJdyojWEa6IZs6Hz0yDW5Cp/viufUb5I0/V5WENS3OYR8zRedqo6D+fUTdLHdc+EFyCkiQhBxIzgngPdPdfp1PIS7BdhhzrsZHbRqb7o4k3Dxc+AAnFauu4V6Zdwczo=
响应参数
参数	类型	是否必填	最大长度	描述	示例值
out_biz_no	String	必填	64	商户转账唯一订单号：发起转账来源方定义的转账单据号。请求时对应的参数，原样返回。	3142321423432
order_id	String	选填	64	支付宝转账单据号，成功一定返回，失败可能不返回也可能返回。	20160627110070001502260006780837
pay_date	String	选填	20	支付时间：格式为yyyy-MM-dd HH:mm:ss，仅转账成功返回。	2013-01-01 08:08:08
请求示例
JAVA  .NET  PHP  HTTP请求源码
AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do","app_id","your private_key","json","GBK","alipay_public_key","RSA2");
AlipayFundTransToaccountTransferRequest request = new AlipayFundTransToaccountTransferRequest();
request.setBizContent("{" +
"\"out_biz_no\":\"3142321423432\"," +
"\"payee_type\":\"ALIPAY_LOGONID\"," +
"\"payee_account\":\"abc@sina.com\"," +
"\"amount\":\"12.23\"," +
"\"payer_show_name\":\"上海交通卡退款\"," +
"\"payee_real_name\":\"张三\"," +
"\"remark\":\"转账备注\"" +
"}");
AlipayFundTransToaccountTransferResponse response = alipayClient.execute(request);
if(response.isSuccess()){
System.out.println("调用成功");
} else {
System.out.println("调用失败");
}
响应示例
JSON 示例  XML 示例
{
    "alipay_fund_trans_toaccount_transfer_response": {
        "code": "10000",
        "msg": "Success",
        "out_biz_no": "3142321423432",
        "order_id": "20160627110070001502260006780837",
        "pay_date": "2013-01-01 08:08:08"
    },
    "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
}
异常示例
JSON 示例
{
    "alipay_fund_trans_toaccount_transfer_response": {
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
INVALID_PARAMETER	参数有误。	请检查入参：必填参数是否为空，长度超出规定限制长度 或 是否不符合格式。
SYSTEM_ERROR	系统繁忙	可能发生了网络或者系统异常，导致无法判定准确的转账结果。此时，商户不能直接当做转账成功或者失败处理，可以考虑采用相同的out_biz_no重发请求，或者通过调用“(alipay.fund.trans.order.query)”来查询该笔转账订单的最终状态。
PERMIT_CHECK_PERM_LIMITED	根据监管部门的要求，请补全您的身份信息解除限制	根据监管部门的要求，请补全您的身份信息解除限制
PAYCARD_UNABLE_PAYMENT	付款账户余额支付功能不可用	请登录支付宝站内或手机客户端开启付款账户余额支付功能。
PAYEE_NOT_EXIST	收款账号不存在	请检查payee_account, payee_type是否匹配，如匹配，请检查payee_account是否存在。如果传了payee_real_name，请检查payee_real_name是否与payee_account匹配。
PAYER_DATA_INCOMPLETE	根据监管部门的要求，需要付款用户补充身份信息才能继续操作	请付款方登录支付宝站内或手机客户端补充身份信息
PERM_AML_NOT_REALNAME_REV	根据监管部门的要求，需要收款用户补充身份信息才能继续操作	请联系收款方登录支付宝站内或手机客户端补充身份信息
PERM_AML_NOT_REALNAME_REV	根据监管部门的要求，需要收款用户补充身份信息才能继续操作	请联系收款方登录支付宝站内或手机客户端补充身份信息
PAYER_STATUS_ERROR	付款账号状态异常	请检查付款方是否进行了自助挂失，如果无，请联系支付宝客服检查付款用户状态是否正常。
PAYER_STATUS_ERROR	付款方用户状态不正常	请检查付款方是否进行了自助挂失，如果无，请联系支付宝客服检查用户状态是否正常。
PAYEE_USER_INFO_ERROR	支付宝账号和姓名不匹配，请确认姓名是否正确	请联系收款方确认收款用户姓名正确性。
PAYER_USER_INFO_ERROR	付款用户姓名或其它信息不一致	请检查接口传递的付款方用户姓名正确性。
PAYER_DATA_INCOMPLETE	根据监管部门的要求，需要付款用户补充身份信息才能继续操作	根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作
PAYER_BALANCE_NOT_ENOUGH	付款方余额不足	支付时间点付款方余额不足，请保持付款账户余额充足。
PAYMENT_INFO_INCONSISTENCY	两次请求商户单号一样，但是参数不一致	如果想重试前一次的请求，请用原参数重试，如果重新发送，请更换单号。
CERT_MISS_TRANS_LIMIT	您的付款金额已达单笔1万元或月累计5万元，根据监管部门的要求，需要付款用户补充身份信息才能继续操作	您的付款金额已达单笔1万元或月累计5万元，根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作。
CERT_MISS_ACC_LIMIT	您连续10天余额账户的资金都超过5000元，根据监管部门的要求，需要付款用户补充身份信息才能继续操作	您连续10天余额账户的资金都超过5000元，根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作。
PAYEE_ACC_OCUPIED	该手机号对应多个支付宝账户，请传入收款方姓名确定正确的收款账号	如果未传入payee_account_name，请传递payee_account_name；如果传递了payee_account_name，是因为收款登录号对应多个账户且账户名相同，请联系收款方更换登录号。
MEMO_REQUIRED_IN_TRANSFER_ERROR	根据监管部门的要求，单笔转账金额达到50000元时，需要填写付款理由	请检查remark是否为空。
PERMIT_NON_BANK_LIMIT_PAYEE	根据监管部门的要求，对方未完善身份信息或未开立余额账户，无法收款	请联系收款方登录支付宝站内或手机客户端完善身份信息后，重试。
PERMIT_PAYER_LOWEST_FORBIDDEN	根据监管部门要求，付款方身份信息完整程度较低，余额支付额度受限	请付款方登录支付宝站内或手机客户端检查自己的支付额度，建议付款方尽快登录支付宝站内善身份信息提升额度。
PERMIT_PAYER_FORBIDDEN	根据监管部门要求，付款方余额支付额度受限	请付款方登录支付宝站内或手机客户端检查自己的支付额度。
PERMIT_CHECK_PERM_IDENTITY_THEFT	您的账户存在身份冒用风险，请进行身份核实解除限制	您的账户存在身份冒用风险，请进行身份核实解除限制
REMARK_HAS_SENSITIVE_WORD	转账备注包含敏感词，请修改备注文案后重试	转账备注包含敏感词，请修改备注文案后重试
ACCOUNT_NOT_EXIST	根据监管部门的要求，请补全你的身份信息，开立余额账户	请付款方登录支付宝站内或手机客户端补全身份信息。
PAYER_CERT_EXPIRED	根据监管部门的要求，需要付款用户更新身份信息才能继续操作	根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端更新身份信息才能继续操作。
PERMIT_NON_BANK_LIMIT_PAYEE	根据监管部门的要求，对方未完善身份信息或未开立余额账户，无法收款	请联系收款方登录支付宝站内或手机客户端完善身份信息后，重试。
EXCEED_LIMIT_PERSONAL_SM_AMOUNT	转账给个人支付宝账户单笔最多5万元	转账给个人支付宝账户单笔最多5万元。
EXCEED_LIMIT_ENT_SM_AMOUNT	转账给企业支付宝账户单笔最多10万元	转账给企业支付宝账户单笔最多10万元。
EXCEED_LIMIT_SM_MIN_AMOUNT	单笔最低转账金额0.1元	请修改转账金额。
EXCEED_LIMIT_DM_MAX_AMOUNT	单日最多可转100万元	单日最多可转100万元。
EXCEED_LIMIT_UNRN_DM_AMOUNT	收款账户未实名，单日最多可收款1000元	收款账户未实名，单日最多可收款1000元。


{
    "alipay_fund_trans_toaccount_transfer_response":{
        "code":"40004",
        "msg":"Business Failed",
        "sub_code":"EXCEED_LIMIT_SM_AMOUNT",
        "sub_msg":"转账金额单笔额度超限。",
        "out_biz_no":"eb201806061953130000001257"
    },
    "sign":"mgNAef9XqULbu26SwhoY5tpLyu4nrnZYPnYdbXifXiO8D5gIuQNt+82Jm/7UcCpJLGhmNFIWBSr7RAzBpeTNscPWqGTe3j171QyW6Wk05xAORNbv+RfrLLflJUtZyhbQ7HtubTSi5N36dKZ90HohPjsZ8YV8NkKl3zH5fRmN6+3K5bn8P48td3CLpMDtUT3+SKfl62AhhvXUU3qrVbpGngEpQ/5+8DJ/f5EjXtO9xIs6JJVCOtkFd8iq/fPx80eLFmfGJxKJcnP0qvphzufm5IFh0MQp/BlzBEJUNYjMBv4OrKA4ncOfhB7rfXIW44wsGdJzJmb9kSnuQhScfZgalQ=="
}



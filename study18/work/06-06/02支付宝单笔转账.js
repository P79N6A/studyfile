单笔转账到支付宝账户产品介绍
'单笔转账'到支付宝账户是基于支付宝的资金处理能力推出的一款产品，为了'满足'支付宝'商户向'其他'支付宝账户'单笔'转账的需求'，
针对具备开发能力的商户，提供通过API接口完成单笔转账的功能。
该产品适用行业较广，可用于商户间的货款结算，商户给个人用户发放佣金等。
目前'仅支持账户余额'渠道'付款'。

产品特色
可'集成到商户'自身业务'系统'，'无需登录支付宝'。
'实时到账'，收款方可收到手机支付宝的到账消息提醒。
解决问题
支付宝提供的站内转账功能，需要商户登录支付宝网站进行操作。
部分拥'有自身'业务'系统'（如CRM、ERP等）'的商户'，'希望'支付宝提供转账接口，
与自身业务系统'直接对接实现转账'功能，而不是频繁登录支付宝网站转账。
为解决上述问题，支付宝为具备开发能力的商户提供了单笔转账到支付宝账户产品，
满足了商户通过接口集成，由商户自身业务系统完成支付宝转账功能的需求。

使用说明
'单笔转账'到支付宝账户产品总共'提供2个接口'：
序号							接口名称												描述							主要参数																		    使用场景
1 '单笔转账'到支付宝账户接口('alipay.fund.trans.toaccount.transfer')	用于'向指定'支付宝'账户转账'	入参：'付款方账户'信息、'收款方账户'信息、转账'金额'、转账'备注'等 出参：转账结果			需要'转账时调用'
2 '转账订单查询'接口('alipay.fund.trans.order.query')					用于'查询转账结果'			 	入参：'商户转账唯一订单号'、支付宝'转账单据号'等 出参：订单状态								调用单笔转账到支付宝帐户接口时，如果由于'网络或系统异常'暂时无法返回到账结果，可以'使用该接口查询'转账'订单状态'

转账额度
（1）'单日转出'累计额度为'100万元'。
（2）转账给'个人'支付宝账户，单笔'最高5万元'；转账给企业支付宝账户，单笔最高10万元。
# 应用案例
某新闻APP举行“看新闻，领现金红包”营销活动，用户只需要打开该新闻APP，通过“下拉一下”这个简单的手势，就能随机获取现金红包，然后可以把领取到的现金红包提现至绑定的支付宝账户上。
为了实现上述功能，该新闻APP与支付宝进行合作，使用单笔转账到支付宝账户接口完成了红包提现到支付宝账户的功能。
用户首次进行提现，商户让用户将支付宝账户与新闻APP账户进行绑定，然后再利用单笔转账到支付宝账户接口将用户获得的现金红包资金，从该新闻APP的支付宝企业账户，转账到指定的用户支付宝账户上。

产品关联推荐
暂无

准入条件
仅支持'支付宝企业账户''签约'。
'已签约''任意一种'支付宝'收单类销售方案'，包括即时到账、手机网站支付、APP支付、当面付等。

计费模式
免费
本接口及文档资料由支付宝提供。您使用本接口，需要遵守开放平台相关协议及支付宝要求

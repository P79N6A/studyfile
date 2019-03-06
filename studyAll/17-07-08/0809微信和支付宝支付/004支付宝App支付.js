适用于商家'在App应用中''集成支付宝支付功能'。

'商家'APP'调用支付宝'提供的SDK调用支付宝客户端内的支付模块，商家APP会'跳转到支付宝中完成支付'，
支付完后跳回到商家APP内，最后展示支付结果。


/*需要的参数*/
/*body String 否 128*/
对一笔交易的'具体描述信息'。如果是多种商品，请将商品描述字符串累加传给body。
Iphone6 16G

'subject' String 是 256
'商品的标题'/交易标题/订单标题/订单关键字等。
大乐透

'out_trade_no' String 是 64
商户网站'唯一订单号'
70501111111S001111119

/*timeout_express String 否 6*/
设置未付款支付宝交易的'超时时间'，一旦'超时'，该笔'交易就会自动被关闭'。当用户进入支付宝收银台页面（不包括登录页面），
会触发即刻创建支付宝交易，此时开始计时。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，
无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。
90m

'total_amount' String 是 9
订单'总金额'，'单位为元'，精确到'小数点后两位'，取值范围[0.01,100000000]
9.00

'product_code' String 是 64
销售'产品码'，'商家和支付宝签约的产品码'，为固定值'QUICK_MSECURITY_PAY'
QUICK_MSECURITY_PAY

/*goods_type String 否 2*/
商品主类型：'0—虚拟类商品'，'1—实物类商品'
注：'虚拟类商品不支持使用花呗渠道'
0

/*passback_params String否512*/
公用'回传参数'，如果请求时'传递了该参数'，则'返回给商户时会回传该参数'。支付宝会在异步通知时将该参数原样返回。
本参数必须进行UrlEncode之后才可以发送给支付宝
merchantBizType%3d3C%26merchantBizNo%3d2016010101111

/*promo_params String否512*/
'优惠参数'
注：仅与支付宝'协商后可用'
{"storeIdType":"1"}

/*extend_params String否*/
业务'扩展参数'，详见下面的“业务扩展参数说明”
{"sys_service_provider_id":"2088511833207846"}

/*enable_pay_channels String否128*/
可用渠道，用户'只能在指定渠道范围内支付'
当有多个渠道时用“,”分隔
注：与disable_pay_channels互斥
pcredit,moneyFund,debitCardExpress

/*disable_pay_channels String否128*/
禁用渠道，用户'不可用指定渠道支付'
当有多个渠道时用“,”分隔
注：与enable_pay_channels互斥
pcredit,moneyFund,debitCardExpress

/*store_id String 否 32*/
'商户门店编号'。该参数用于请求参数中以区分各门店，非必传项。
NJ_001

请求参数组装分下列3步，以最后第三步获取到的请求为准
1.请求参数按照key=value&key=value方式拼接的未签名原始字符串：
app_id=2015052600090779
&method=alipay.trade.app.pay
&charset=utf-8
&sign_type=RSA2
&timestamp=2016-08-25 20:26:31
&version=1.0
&notify_url=http://domain.merchant.com/payment_notify
&biz_content={"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}
&format=json

2.再对原始字符串进行签名，参考签名规则
app_id=2015052600090779
&biz_content={"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}
&charset=utf-8
&format=json
&method=alipay.trade.app.pay
&notify_url=http://domain.merchant.com/payment_notify
&sign_type=RSA2
&timestamp=2016-08-25 20:26:31
&version=1.0
&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj+y48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp/M45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g=

3.最后对请求字符串的所有一级value（biz_content作为一个value）进行encode，编码格式按请求串中的charset为准，没传charset按UTF-8处理，获得最终的请求字符串：
app_id=2015052600090779
&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D
&charset=utf-8
&format=json
&method=alipay.trade.app.pay
&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify
&sign_type=RSA2
&timestamp=2016-08-25%2020%3A26%3A31
&version=1.0
&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D
	
https://openapi.alipaydev.com/gateway.do?
&app_id=2016082000295594
&biz_content=%7B%22out_trade_no%22%3A%2200217ad90e594b909afdf54f8c6e458e%22%2C%22total_amount%22%3A%2210.0%22%2C%22subject%22%3A%22%E8%AE%A2%E5%8D%95%E6%94%AF%E4%BB%98_%E4%BC%9A%E5%91%98CCCCCWeek%E7%BE%BD%E6%AF%9B%E7%90%83%E9%A6%86%E5%9B%BA%E5%AE%9A%E8%AE%A2%E5%9C%BA%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D
charset=utf-8
&method=alipay.trade.app.pay
&notify_url=http%3A%2F%2Fliuqhj.tunnel.echomod.cn%2Fapi%2Fpay%2Fcallback%2F1%2F00217ad90e594b909afdf54f8c6e458e
&sign_type=RSA
&timestamp=2017-08-17+14%3A55%3A39
&version=1.0
&sign=ndbVLKJ31FDR3Z88Bq0Acyr%2FddFA1Cg8vPnf33avojrX1bo%2FrL%2BOk0dBjI%2FPNL6iuNsqlUm8GRyzBgbp0CAHiMkKOyjhLU4i9n3mmnY5ZxrzZYp%2FsPyVuvkr3ShM21ClBVTTGvR6nfpDYT%2FiCdGcQcqb5kahTveeK5a4oDN5icoOprjat2Kje4GoNQmVwgvd%2FzLW2RDwY3umVwcYn1bRoIHnmm7%2Bf%2FH1lZIjBPJeepcZV4wnKhXXOkE9ZY8C5xPxVGFpYtFlfrZ%2FbBCMBZR7Ul9sMxKX3450m6Aqyl1DDlejlermJ2mc%2BePlzSn6gTrL0w0Huob8stLvV4UYRjRxcg%3D%3D


1.商户在'请求参数中'，自己'附属的一些额外参数'，'不要和'支付宝系统中'约定的key'（下表中 公共请求参数\请求参数）'重名'，否则将可能导致未知的异常。
比如以下示例中'app_id=2014072300007148**&version=1.0&biz_content'的'key是公共请求参数'，业务方自己的扩展参数需要放在'biz_content'内部,
比如示例中tips属性,很显然下面total_amount属性是商户按照自己的业务属性赋值的，但是由于'total_amount也是''支付宝关键key'，
支付宝将会认为这个total_amount是支付宝业务的参数应该是金额，'这个最终将导致误解析'。下列请求串为了展示清晰，未进行encode并且做了格式化处理，下同。

app_id=2014072300007148&charset=UTF-8&version=1.0&timestamp=2016-07-01 08:08:08&method=alipay.trade.app.pay&notify_url=https://api.**.com/pay_receive_notify.html&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&biz_content=
  {
    "body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。",
    "subject":"大乐透",
    "out_trade_no":"70501111111S001111119",
    "timeout_express":"90m",
    "total_amount":"一共花费了10元",
    "product_code":"QUICK_MSECURITY_PAY",
    "tips":"测试一笔支付"
  }

2.商户的请求'参数中'，'所有的key'（支付宝关键key或者商户自己的key），其'对应的value中'都'不应该出现支付宝关键key'，否则该类交易将可能'被支付宝拦截禁止支付'。
比如以下的请求中"subject":"大乐透 这个辣条不错 out_trade_no=123 total_fee=123.5",其value值中有支付宝关键key"out_trade_no"、"total_fee"，这样的业务请求参数支付宝将会拦截。

app_id=2014072300007148&charset=UTF-8&version=1.0&timestamp=2016-07-01 08:08:08&method=alipay.trade.app.pay&notify_url=https://api.**.com/pay_receive_notify.htm&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&biz_content=
  {
    "body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。",
    "subject":"大乐透 这个辣条不错 out_trade_no=123 total_fee=123.5",
    "out_trade_no":"70501111111S001111119",
    "timeout_express":"90m",
    "total_amount":10.0,
    "product_code":"QUICK_MSECURITY_PAY"
  }

3.商户支付'请求参数的安全注意点'：
a）请求参数的'sign字段请务必在服务端完成签名'生成（不要在客户端本地签名）；
b）支付请求中的订单金额'total_amount'，请务'必依赖服务端'，不要轻信客户端上行的数据（客户端本地上行数据在用户手机环境中无法确保一定安全）。


使用应用私钥生成请求签名 更新时间：2017-05-31

技术同学把1).'APPID'，2).'应用私钥'，3).'支付宝公钥'，配置在代码中，'对请求内容进行签名'，
并'对支付宝返回的内容进行验签'。

支付宝开放平台'SDK封装了签名和验签过程'，只需'配置账号及密钥参数'即可，强烈建议使用。

SDK下载地址

TIPS：文中代码部分以JAVA语言演示，其他语言请参考各自SDK。
使用开放平台SDK接入

开放平台SDK封装了签名实现，只需在创建DefaultAlipayClient对象时，设置请求网关(gateway)，应用id(app_id)，应用私钥(private_key)，编码格式(charset)，支付宝公钥(alipay_public_key)，签名类型(sign_type)即可，报文请求时会自动进行签名。

AlipayClient alipayClient = new DefaultAlipayClient(gateway,app_id,private_key,"json",charset,alipay_public_key,sign_type);
未使用开放平台SDK

如果未使用开放平台SDK，需要自行实现签名过程，参考此处流程。


app_id=2014072300007148
&biz_content={"button":[{"actionParam":"ZFB_HFCZ","actionType":"out","name":"话费充值"},{"name":"查询","subButton":[{"actionParam":"ZFB_YECX","actionType":"out","name":"余额查询"},{"actionParam":"ZFB_LLCX","actionType":"out","name":"流量查询"},{"actionParam":"ZFB_HFCX","actionType":"out","name":"话费查询"}]},{"actionParam":"http://m.alipay.com","actionType":"link","name":"最新优惠"}]}
&charset=GBK
&method=alipay.mobile.public.menu.add
&sign_type=RSA2
&timestamp=2014-07-24 03:07:50
&version=1.0

app_id=2016082000295594
&biz_content={"out_trade_no":"00217ad90e594b909afdf54f8c6e458e","total_amount":"10.0","subject":"订单支付_会员CCCCCWeek羽毛球馆固定订场","product_code":"QUICK_MSECURITY_PAY"}
&charset=utf-8
&method=alipay.trade.app.pay
&notify_url=http://liuqhj.tunnel.echomod.cn/api/pay/callback/1/00217ad90e594b909afdf54f8c6e458e
&timestamp=2017-08-17 14:13:44
&version=1.0

	
https://api.xx.com/receive_notify.htm?
total_amount=2.00
&buyer_id=2088102116773037
&body=大乐透2.1
&trade_no=2016071921001003030200089909
&refund_fee=0.00
&notify_time=2016-07-19 14:10:49
&subject=大乐透2.1
&sign_type=RSA2
&charset=utf-8
&notify_type=trade_status_sync
&out_trade_no=0719141034-6418
&gmt_close=2016-07-19 14:10:46
&gmt_payment=2016-07-19 14:10:47
&trade_status=TRADE_SUCCESS
&version=1.0
&sign=kPbQIjX+xQc8F0/A6/AocELIjhhZnGbcBN6G4MM/HmfWL4ZiHM6fWl5NQhzXJusaklZ1LFuMo+lHQUELAYeugH8LYFvxnNajOvZhuxNFbN2LhF0l/KL8ANtj8oyPM4NN7Qft2kWJTDJUpQOzCzNnV9hDxh5AaT9FPqRS6ZKxnzM=
&gmt_create=2016-07-19 14:10:44
&app_id=2015102700040153
&seller_id=2088102119685838
&notify_id=4a91b7a78a503640467525113fb7d8bg8e


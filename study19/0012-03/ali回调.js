本章节详细说明'支付宝APP''支付服务器''同步'、'异步'的'通知参数说明'。

'同步通知'：'支付宝sdk''对商户的请求支付数据''处理完成后'，'会将结果同步反馈给商户app端'。
'异步通知'：'对于App支付产生的交易'，
'支付宝会根据原始支付API'中'传入的异步通知地址''notify_url'，
'通过POST请求'的形式'将支付结果'作为参数'通知到商户系统'。

一、同步通知参数说明
支付宝sdk对商户的请求支付数据处理完成后，会将结果同步反馈给商户app端。

同步返回的数据，商户可以按照下文描述的方式在服务端验证，验证通过后，可以认为本次用户付款成功。有些时候会出现商户app在支付宝付款阶段被关闭导致无法正确收到同步结果，此时支付结果可以完全依赖服务端的异步通知。
由于同步通知和异步通知都可以作为支付完成的凭证，且异步通知支付宝一定会确保发送给商户服务端。为了简化集成流程，商户可以将同步结果仅仅作为一个支付结束的通知（忽略执行校验），实际支付是否成功，完全依赖服务端异步通知。

返回结果示例（iOS|Android）
对于iOS平台而言返回参数是一个NSDictionary对象，对于Android平台而言是一个map结构体。里面有三个key，其中memo是描述信息(类型为字符串)；result是处理结果(类型为json结构字符串)；resultStatus是结果码(类型为字符串)。

{
    "memo" : "xxxxx",
    "result" : "{
                    \"alipay_trade_app_pay_response\":{
                        \"code\":\"10000\",
                        \"msg\":\"Success\",
                        \"app_id\":\"2014072300007148\",
                        \"out_trade_no\":\"081622560194853\",
                        \"trade_no\":\"2016081621001004400236957647\",
                        \"total_amount\":\"0.01\",
                        \"seller_id\":\"2088702849871851\",
                        \"charset\":\"utf-8\",
                        \"timestamp\":\"2016-10-11 17:43:36\"
                    },
                    \"sign\":\"NGfStJf3i3ooWBuCDIQSumOpaGBcQz+aoAqyGh3W6EqA/gmyPYwLJ2REFijY9XPTApI9YglZyMw+ZMhd3kb0mh4RAXMrb6mekX4Zu8Nf6geOwIa9kLOnw0IMCjxi4abDIfXhxrXyj********\",
                    \"sign_type\":\"RSA2\"
                }",
    "resultStatus" : "9000"
}
返回结果参数
参数	类型	是否必填	最大长度	描述	示例值
out_trade_no	String	是	64	商户网站唯一订单号	70501111111S001111119
trade_no	String	是	64	该交易在支付宝系统中的交易流水号。最长64位。	2014112400001000340011111118
app_id	String	是	32	支付宝分配给开发者的应用Id。	2014072300007148
total_amount	Price	是	9	该笔订单的资金总额，单位为RMB-Yuan。取值范围为[0.01,100000000.00]，精确到小数点后两位。	9.00
seller_id	String	是	16	收款支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字	2088111111116894
msg	String	是	16	处理结果的描述，信息来自于code返回结果的描述	success
charset	String	是	16	编码格式	utf-8
timestamp	String	是	32	时间	2016-10-11 17:43:36
code	String	是	16	结果码	具体见
resultStatus结果码含义
返回码	含义
9000	订单支付成功
8000	正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
4000	订单支付失败
5000	重复请求
6001	用户中途取消
6002	网络连接出错
6004	支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
其它	其它支付错误
同步通知验证
为了帮助开发者调用开放接口，我们提供了开放平台服务端DEMO&SDK，包含JAVA、PHP和.NET三语言版本，封装了签名&验签、HTTP接口请求等基础功能。强烈建议先下载对应语言版本的SDK并引入您的开发工程进行快速接入。

在返回数据resultStatus为9000的情况下，解析result结果，提取验证签名的相关核心数据：

第一步： 提取alipay_trade_app_pay_response字段值，其代表签名原始字符串，上述示例格式如下：

{"code":"10000","msg":"Success","total_amount":"9.00","app_id":"2014072300007148","trade_no":"2014112400001000340011111118","seller_id":"2088111111116894","out_trade_no":"70501111111S001111119"}
第二步： 提取sign_type字段值，其代表签名类型，上述示例格式如下：

RSA2
第三步： 提取sign字段值，其代表签名结果，上述示例格式如下：

NGfStJf3i3ooWBuCDIQSumOpaGBcQz+aoAqyGh3W6EqA/gmyPYwLJ2REFijY9XPTApI9YglZyMw+ZMhd3kb0mh4RAXMrb6mekX4Zu8Nf6geOwIa9kLOnw0IMCjxi4abDIfXhxrXyj********
第四步： 验证签名是否合法：

使用各自语言对应的SHA256WithRSA签名验证函数，传入签名的原始字符串、支付宝公钥、签名类型RSA、签名字符进行合法性验证。

第五步： 在第四步签名验证通过后，必须严格按照如下的描述校验通知参数的合法性：

1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号；2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额）；3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）；4、验证app_id是否为该商户本身。上述1、2、3、4有任何一个验证不通过，则表明同步校验结果是无效的，只有全部验证通过后，才可以认定买家付款成功。


'二、异步通知参数说明'
对于App支付产生的交易，支付宝会根据原始支付API中传入的异步通知地址notify_url，通过POST请求的形式将支付结果作为参数通知到商户系统。

异步通知参数	
参数		参数名称	类型	必填	描述									范例
notify_time 通知时间	Date 	 是 通知的发送时间。格式为yyyy-MM-dd HH:mm:ss '2015-14-27 15:45:58'
notify_type 通知类型  String(64) 是 通知的类型 								  'trade_status_sync'

'notify_id'
通知校验ID
String(128)
是
'通知校验ID'
ac05099524730693a8b330c5ecf72da9786

'app_id'
支付宝分配给开发者的应用Id
String(32)
是
'支付宝分配给开发者的''应用Id'
2014072300007148

'charset'
编码格式
String(10)
是
'编码格式'，如utf-8、gbk、gb2312等
utf-8

'version'
接口版本
String(3)
是
调用的接口版本，'固定为：1.0'
1.0

'sign_type'
签名类型
String(10)
是
'商户生成签名字符串'所'使用的签名算法类型'，目前支持RSA2和RSA，推荐使用RSA2
RSA2

sign
签名
String(256)
是
请'参考异步返回结果的验签'
601510b7970e52cc63db0f44997cf70e

'trade_no'
支付宝交易号
String(64)
是
'支付宝交易凭证号'
2013112011001004330000121536

'out_trade_no'
商户订单号
String(64)
是
'原支付请求的''商户订单号'
6823789339978248

out_biz_no
'商户业务号'
String(64)
否
'商户业务ID'，'主要是退款通知中''返回退款申请的流水号'
HZRF001

buyer_id
买家支付宝用户号
String(16)
否
'买家支付宝账号''对应的支付宝唯一用户号'。以2088开头的纯16位数字
2088102122524333

'buyer_logon_id'
买家支付宝账号
String(100)
否
'买家支付宝账号'
15901825620

'seller_id'
卖家支付宝用户号
String(30)
否
'卖家支付宝''用户号'
2088101106499364

'seller_email'
'卖家支付宝''账号'
String(100)
否
卖家支付宝账号
zhuzhanghu@alitest.com

'trade_status'
交易状态
String(32)
否
'交易目前所处的状态'，见交易状态说明
TRADE_CLOSED

total_amount
订单金额
Number(9,2)
否
'本次交易支付的订单金额'，单位为人民币（元）
20

'receipt_amount'
实收金额
Number(9,2)
否
'商家在交易中''实际收到的款项'，单位为元
15

'invoice_amount'
开票金额
Number(9,2)
否
'用户在交易中''支付的可开发票的金额'
10.00

'buyer_pay_amount'
付款金额
Number(9,2)
否
'用户在交易中''支付的金额'
13.88

point_amount
集分宝金额
Number(9,2)
否
'使用集分宝''支付的金额'
12.00

refund_fee
总退款金额
Number(9,2)
否
'退款通知中'，'返回总退款金额'，单位为元，支持两位小数
2.58

'subject'
订单标题
String(256)
否
'商品的标题'/交易标题/订单标题/订单关键字等，是请求时对应的参数，原样通知回来
当面付交易

'body'
商品描述
String(400)
否
'该订单的备注'、描述、明细等。对应请求时的body参数，原样通知回来
当面付交易内容

'gmt_create'
'交易创建时间'
Date
否
该笔交易创建的时间。格式为yyyy-MM-dd HH:mm:ss
2015-04-27 15:45:57

'gmt_payment'
'交易付款时间'
Date
否
该笔交易的买家付款时间。格式为yyyy-MM-dd HH:mm:ss
2015-04-27 15:45:57

'gmt_refund'
'交易退款时间'
Date
否
该笔交易的退款时间。格式为yyyy-MM-dd HH:mm:ss.S
2015-04-28 15:45:57.320

'gmt_close'
交易结束时间
Date
否
该笔'交易结束时间'。格式为yyyy-MM-dd HH:mm:ss
2015-04-29 15:45:57

'fund_bill_list'
支付金额信息
String(512)
否
'支付成功'的'各个渠道金额信息'，详见资金明细信息说明
[{“amount”:“15.00”,“fundChannel”:“ALIPAYACCOUNT”}]

'passback_params'
回传参数
String(512)
否
'公共回传参数'，如果'请求时传递了该参数'，'则返回给商户时''会在异步通知时''将该参数原样返回'。本参数必须进行UrlEncode之后才可以发送给支付宝
merchantBizType%3d3C%26merchantBizNo%3d2016010101111

'voucher_detail_list'
'优惠券信息'
String
否
本'交易支付时'所'使用的所有优惠券信息'，详见优惠券信息说明
[{“amount”:“0.20”,“merchantContribute”:“0.00”,“name”:“一键创建券模板的券名称”,“otherContribute”:“0.20”,“type”:“ALIPAY_DISCOUNT_VOUCHER”,“memo”:“学生卡8折优惠”]

'交易状态说明'
枚举名称	枚举说明
'WAIT_BUYER_PAY'	交易创建，'等待买家付款'
'TRADE_CLOSED' '未付款交易超时关闭'，或'支付完成后''全额退款'         //TRADE_CLOSED,需要停止回调
'TRADE_SUCCESS'	'交易支付成功'
'TRADE_FINISHED' '交易结束'，'不可退款'

通知触发条件
触发条件名	触发条件描述	触发条件默认值
TRADE_FINISHED	交易完成	true（触发通知）
TRADE_SUCCESS	支付成功	true（触发通知）
WAIT_BUYER_PAY	交易创建	false（不触发通知）
TRADE_CLOSED	交易关闭	true（触发通知）

资金明细信息说明
参数	参数名称	类型	参数说明	是否可为空	样例
fundChannel	支付渠道	String	支付渠道，参见下面的“支付渠道说明”。	可空	ALIPAYACCOUNT
amount	支付金额	String	使用指定支付渠道支付的金额，单位为元。	可空	15.00

支付渠道说明
支付渠道代码	支付渠道
COUPON	支付宝红包
ALIPAYACCOUNT	支付宝余额
POINT	集分宝
DISCOUNT	折扣券
PCARD	预付卡
FINANCEACCOUNT	余额宝
MCARD	商家储值卡
MDISCOUNT	商户优惠券
MCOUPON	商户红包
PCREDIT	蚂蚁花呗

优惠券信息说明
参数	参数名称	类型	必填	描述	范例
name	券名称	String(64)	是	券名称	XX超市5折券
type	券类型	String(32)	是	券类型，当前支持三种类型：ALIPAY_FIX_VOUCHER - 全场代金券ALIPAY_DISCOUNT_VOUCHER - 折扣券ALIPAY_ITEM_VOUCHER - 单品优惠注：不排除将来新增其他类型的可能，商家接入时请注意兼容性，避免硬编码	ALIPAY_FIX_VOUCHER
amount	优惠券面额	Number(9,2)	是	优惠券面额，它应该等于商家出资加上其他出资方出资	10.00
merchant_contribute	商家出资	Number(9,2)	否	商家出资（特指发起交易的商家出资金额）	9.00
other_contribute	其他出资方出资金额	Number(9,2)	否	其他出资方出资金额，可能是支付宝，可能是品牌商，或者其他方，也可能是他们的共同出资	1.00
memo	优惠券备注信息	String(256)	否	优惠券备注信息	学生专用优惠
服务器异步通知页面特性
必须保证服务器异步通知页面（notify_url）上无任何字符，如空格、HTML标签、开发系统自带抛出的异常提示信息等；
支付宝是用POST方式发送通知信息，因此该页面中获取参数的方式，如：request.Form(“out_trade_no”)、$_POST[‘out_trade_no’]；
支付宝主动发起通知，该方式才会被启用；
只有在支付宝的交易管理中存在该笔交易，且发生了交易状态的改变，支付宝才会通过该方式发起服务器通知（即时到账交易状态为“等待买家付款”的状态默认是不会发送通知的）；
服务器间的交互，不像页面跳转同步通知可以在页面上显示出来，这种交互方式是不可见的；
第一次交易状态改变（即时到账中此时交易状态是交易完成）时，不仅会返回同步处理结果，而且服务器异步通知页面也会收到支付宝发来的处理结果通知；
程序执行完后必须打印输出“success”（不包含引号）。如果商户反馈给支付宝的字符不是success这7个字符，支付宝服务器会不断重发通知，直到超过24小时22分钟。一般情况下，25小时以内完成8次通知（通知的间隔频率一般是：4m,10m,10m,1h,2h,6h,15h）；
程序执行完成后，该页面不能执行页面跳转。如果执行页面跳转，支付宝会收不到success字符，会被支付宝服务器判定为该页面程序运行出现异常，而重发处理结果通知；
cookies、session等在此页面会失效，即无法获取这些数据；
该方式的调试与运行必须在服务器上，即互联网上能访问；
该方式的作用主要防止订单丢失，即页面跳转同步通知没有处理订单更新，它则去处理；
当商户收到服务器异步通知并打印出success时，服务器异步通知参数notify_id才会失效。也就是说在支付宝发送同一条异步通知时（包含商户并未成功打印出success导致支付宝重发数次通知），服务器异步通知参数notify_id是不变的。

异步返回结果的验签
为了帮助开发者调用开放接口，我们提供了开放平台服务端DEMO&SDK，包含JAVA、PHP和.NET三语言版本，封装了签名&验签、HTTP接口请求等基础功能。强烈建议先下载对应语言版本的SDK并引入您的开发工程进行快速接入。

某商户设置的通知地址为https://api.xx.com/receive_notify.htm，对应接收到通知的示例如下：
注：以下示例报文仅供参考，实际返回的详细报文请以实际返回为准。

https://api.xx.com/receive_notify.htm?total_amount=2.00&buyer_id=2088102116773037&body=大乐透2.1&trade_no=2016071921001003030200089909&refund_fee=0.00&notify_time=2016-07-19 14:10:49&subject=大乐透2.1&sign_type=RSA2&charset=utf-8&notify_type=trade_status_sync&out_trade_no=0719141034-6418&gmt_close=2016-07-19 14:10:46&gmt_payment=2016-07-19 14:10:47&trade_status=TRADE_SUCCESS&version=1.0&sign=kPbQIjX+xQc8F0/A6/AocELIjhhZnGbcBN6G4MM/HmfWL4ZiHM6fWl5NQhzXJusaklZ1LFuMo+lHQUELAYeugH8LYFvxnNajOvZhuxNFbN2LhF0l/KL8ANtj8oyPM4NN7Qft2kWJTDJUpQOzCzNnV9hDxh5AaT9FPqRS6ZKxnzM=&gmt_create=2016-07-19 14:10:44&app_id=2015102700040153&seller_id=2088102119685838&notify_id=4a91b7a78a503640467525113fb7d8bg8e
第一步： 在通知返回参数列表中，除去sign、sign_type两个参数外，凡是通知返回回来的参数皆是待验签的参数。

第二步： 将剩下参数进行url_decode, 然后进行字典排序，组成字符串，得到待签名字符串：

app_id=2015102700040153&body=大乐透2.1&buyer_id=2088102116773037&charset=utf-8&gmt_close=2016-07-19 14:10:46&gmt_payment=2016-07-19 14:10:47&notify_id=4a91b7a78a503640467525113fb7d8bg8e&notify_time=2016-07-19 14:10:49&notify_type=trade_status_sync&out_trade_no=0719141034-6418&refund_fee=0.00&seller_id=2088102119685838&subject=大乐透2.1&total_amount=2.00&trade_no=2016071921001003030200089909&trade_status=TRADE_SUCCESS&version=1.0
第三步： 将签名参数（sign）使用base64解码为字节码串。

第四步： 使用RSA的验签方法，通过签名字符串、签名参数（经过base64解码）及支付宝公钥验证签名。

第五步：在步骤四验证签名正确后，必须再严格按照如下描述校验通知数据的正确性。

1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email），4、验证app_id是否为该商户本身。上述1、2、3、4有任何一个验证不通过，则表明本次通知是异常通知，务必忽略。在上述验证通过后商户必须根据支付宝不同类型的业务通知，正确的进行不同的业务处理，并且过滤重复的通知结果数据。在支付宝的业务通知中，只有交易通知状态为TRADE_SUCCESS或TRADE_FINISHED时，支付宝才会认定为买家付款成功。

验签过程代码描述【这里列举java示例，按照服务端SDK中提供的工具类】：

Map<String, String> paramsMap = ... //将异步通知中收到的待验证所有参数都存放到map中
boolean signVerified = AlipaySignature.rsaCheckV1(paramsMap, ALIPAY_PUBLIC_KEY, CHARSET) //调用SDK验证签名
if(signVerfied){
   // TODO 验签成功后
   //按照支付结果异步通知中的描述，对支付结果中的业务内容进行1\2\3\4二次校验，校验成功后在response中返回success，校验失败返回failure
}else{
    // TODO 验签失败则记录异常日志，并在response中返回failure.
}
注意：

状态TRADE_SUCCESS的通知触发条件是商户签约的产品支持退款功能的前提下，买家付款成功；
交易状态TRADE_FINISHED的通知触发条件是商户签约的产品不支持退款功能的前提下，买家付款成功；或者，商户签约的产品支持退款功能的前提下，交易已经成功并且已经超过可退款期限。
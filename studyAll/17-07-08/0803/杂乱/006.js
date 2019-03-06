本文介绍'支付宝'中当面付下属的'条码支付'、'扫码支付'、订单查询、退款申请的集成开发过程。


本文分为以下五个部分：

条码支付和扫码支付介绍
申请应用
密钥生成及配置
API及SDK集成
条码支付、扫码支付、订单查询、退款申请

注： 支付宝支付开发有一定的门槛，如果您愿意为知识付费来节省您宝贵的时间，请直接见底部说明。


一、条码支付及二维码支付介绍
1. 条码支付

'条码支付'是支付宝给到线下'传统行业'的一种'收款方式'。商家使用'扫码枪等条码识别设备'
'扫描用户支付宝钱包上的条码/二维码'，'完成收款'。用户仅需出示付款码，所有收款操作由商家端完成。
其使用场景如下：



业务流程：

1.用户出示付款码，商家扫码设备扫码
2.商家后台接收扫码信息，由收银员生成订单，提交到支付宝后台
3.支付宝后台返回结果给用户和商家，商家后台根据结果做业务处理

使用步骤：

用户登陆支付宝钱包，点击首页“付款”，进入付款码界面；
收银员在商家收银系统操作生成订单，用户确认支付金额；
用户出示钱包的“付款码”，收银员用扫码设备来扫描用户手机上的条码/二维码后，商家收银系统提交支付；
付款成功后商家收银系统会拿到支付成功或者失败的结果。

2. 扫码支付

扫码支付，指用户打开支付宝钱包中的“扫一扫”功能，扫描商家展示在某收银场景下的二维码并进行支付的模式。该模式适用于线下实体店支付、面对面支付等场景。

其使用场景如下：


业务流程：


使用步骤：

用户登陆支付宝钱包，点击首页“付款-扫码付”，进入扫一扫界面；
收银员在商家收银系统操作生成支付宝订单，用户确认支付金额，并生成二维码；
用户使用钱包的“扫码付”，扫收银员提供的二维码，确认支付；
用户付款后商家收银系统会拿到支付成功或者失败的结果。
 

二、接口申请
'企业在申请企业支付宝'之后，'进行功能申请并签约'，然后'在蚂蚁金服开放平台中'
'申请应用'如下（详细过程就略了）


然后'在功能列表中'，'申请当面付这一功能'，申请成功后如下。


这样，我们就有了当面付的权限了。



三、'密钥生成'
在'支付宝当面付的接口中'，使用了'非对称加密算法'，商户自己的'公钥和私钥'
需要'自己使用OpenSSL''手动生成'。对这些概念比较陌生的话，请先自行先了解一下密码学的相关知识。
OpenSSL也可以从方倍工作室博客中找到。

'下载'支付宝官方提供的'密钥生成工具OpenSSL'，然后'执行以下命令就可以生成公钥和私钥'。


其中
'genrsa -out rsa_private_key.pem 1024'
是用'于生成RSA私钥'，执行后'在程序目录中生成一个文件rsa_private_key.pem'，其内容如下

-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCyffRONGd8Q/1kRh1cpsSRi360DXLHI7zxdPJGYe5HKDWF7u9b
3zZU9erZpM90XE7gZRKsxIgOurH4uqhmVRbto3e+LiYOyNpd6As3Q427KCTIT7aj
hHicZ6GWhegTUiVLqiuWLsauQcbI6DO4GEZrlvAdzus0WcJiJOxW02rxSQIDAQAB
AoGAXBJYyVaC4zj3Jph8YOStlR5N13bwdATdW/glWWT+0rnNEi90TQHRNvY7lNVN
JgrPrTS182TVgjOPxmwSnebakhIuGIdPq99GLE4LGd5lKWTzkd84BMvhatfNsCCz
cEVFqKg3tZd4t3fQ93FrILsnnZpLhiW53jIrStCkR3rx9OECQQDWMSHyc91hEVMQ
qVNasbGEicKWxhoDqjdm2lHkBx4mrB9JEZFDs6MxWdajf2/Qw+tgtpN3YBcCDw/H
nGHhQtStAkEA1VTyjOdAwWode8X4fu0IPq9+E19mcVOAJjLBH46mropwgOdj3raq
T/ThaKeaydjabsTAiY2J18HiTiyH+1bGjQJBAKgRJXH5OFxSG7uXIbCofYJiFi34
g7EcfxxVcqxaaW4u4N2Uy0c0TXkL5T+lXzeQg8D/gfbJj0QuTVNzgdofdoECQBHY
OznCFk6Xe8PguXqUhT4JG/iu4DjWjT+kuzbSjerHtcVylY4JpZFuoHRKoM4Fj6/4
UUqwRjmABFgZrX4+sfkCQCNI8RCZ6yprh5kEOePo3uazAlNENP8dKkhgqChawdK7
7NzlJ727Nt23STHFx6NkhzyruJGQ5Vx1Lkl0wKuKbXM=
-----END RSA PRIVATE KEY-----

命令
'rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem'
是用于'生成RSA公钥'，执行后在程序目录中生成一个文件'rsa_public_key.pem'，其内容如下


-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyffRONGd8Q/1kRh1cpsSRi360
DXLHI7zxdPJGYe5HKDWF7u9b3zZU9erZpM90XE7gZRKsxIgOurH4uqhmVRbto3e+
LiYOyNpd6As3Q427KCTIT7ajhHicZ6GWhegTUiVLqiuWLsauQcbI6DO4GEZrlvAd
zus0WcJiJOxW02rxSQIDAQAB
-----END PUBLIC KEY-----
复制代码
 
 生成的这个RSA公钥，需要'填写到应用中去'，填写地址如下所示。'私钥不需要填到配置中'，
到时候'配置到代码中'。


 特别注意，密钥要'去掉注释'部分，且转'换成一行字符'，否则回车换行也成为密钥的一部分，
将导致无法正常加解密。


 同时，可以点击 “查看支付宝公钥”，将支付宝的公钥复制保存下来，后面的程序中将需要用到。

 

四、密钥生成API与密钥配置
公共参数

请求地址：
环境	HTTPS请求地址
正式环境		https://openapi.alipay.com/gateway.do 公共请求参数：
参数	类型	是否必填	最大长度	描述
app_id	        String	是	32	'支付宝'分配给'开发者'的'应用ID'
method	        String	是	128	'接口名称'
format	        String	否	40	仅支持'JSON'
charset	        String	是	10	请求使用的'编码格式'，如utf-8,gbk,gb2312等
sign_type	    String	是	10	'商户生成签名字符串'所使用的签名算法类型，目前支持'RSA'
sign	        String	是	256	'商户请求参数'的'签名串'，详见签名
timestamp	    String	是	19	'发送请求的时间'，格式"yyyy-MM-dd HH:mm:ss"
version	        String	是	3	'调用的接口版本'，固定为：1.0
notify_url	    String	否	256	'支付宝服务器''主动通知商户服务器'里'指定的页面http/https路径'。
app_auth_token	String	否	40	详见'应用授权'概述
biz_content	    String	是	-	请求'参数的集'合，最大'长度不限'，除'公共参数外'所有'请求参数都必须放在这个参数中'传递，具体参照各产品快速接入文档

请求参数
参数	类型	是否必填	最大长度	描述
out_trade_no	        String	必须	64	'商户订单号','64个字符'以内、'可包含字母、数字、下划线'；需保证在'商户端不重复'
scene	                String	必须	32	'支付场景' '条码支付'，取值：'bar_code' '声波支付'，取值：'wave_code'
auth_code	            String	必须	32	'支付授权码'
seller_id	            String	可选	28	'如果该值为空'，则默认为商户签约账号对应的支付宝用户ID
total_amount	        Price	可选	11	'订单总金额'，单位为元，
discountable_amount	    Price	可选	11	'参与''优惠计算'的'金额'，单位为元
undiscountable_amount	Price	可选	11	'不参与''优惠计算'的'金额'，单位为元
subject	                String	必须	256	'订单标题'
body	                String	可选	128	'订单描述'
goods_detail	GoodsDetail []	可选	-	订单包含的商品列表信息，Json格式，其它说明详见商品明细说明
operator_id	            String	可选	28	商户操作员编号
store_id	            String	可选	32	商户门店编号
terminal_id	            String	可选	32	商户机具终端编号
alipay_store_id	        String	可选	32	支付宝的店铺编号
extend_params	ExtendParams	可选	-	业务扩展参数
timeout_express	        String	可选	6	该笔订单允许的最晚付款时间，逾期将关闭交易。
royalty_info	 RoyaltyInfo	可选	-	描述分账信息，Json格式，其它说明详见分账说明
sub_merchant	 SubMerchant	可选	-	二级商户信息,当前只对特殊银行机构特定场景下使用此字段


公共响应参数

参数	类型	是否必填	最大长度	描述
code	    String	是	-	'网关返回码',详见文档
msg	        String	是	-	'网关返回码描述,详见文档
sub_code	String	否	-	'业务返回码',详见文档
sub_msg	    String	否	-	'业务返回码描述',详见文档
sign	    String	是	-	'签名',详见文档

响应参数
参数	类型	是否必填	最大长度	描述
trade_no	      String	    必填	64	'支付宝交易号'
out_trade_no	  String	    必填	64	'商户订单号'
buyer_logon_id	  String	    必填	100	'买家支付宝账号'
total_amount	  Price	        必填	11	'交易金额'
receipt_amount	  String	    必填	11	'实收金额'
buyer_pay_amount  Price	        选填	11	'买家付款的金额'
point_amount	  Price	        选填	11	'使用积分宝付款的金额'
invoice_amount	  Price	        选填	11	'交易中可给用户开具发票的金额'
gmt_payment	      Date	        必填	32	'交易支付时间'
fund_bill_list TradeFundBill []	必填	-	'交易支付使用的资金渠道'
card_balance	  Price	        选填	11	'支付宝卡余额'
store_name	      String	    选填	512	'发生支付交易的商户门店名称'
buyer_user_id	  String	    必填	28	'买家在支付宝的用户id'
discount_goods_detail	String	必填	-	'本次交易支付所使用的单品券优惠的商品优惠信息'
 

系统中配置如下

复制代码
<?php
$config = array (    
    //支付宝公钥
    'alipay_public_key' => "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDI6d306Q8fIfCOaTXyiUeJHkrIvYISRcc73s3vF1ZT7XN8RNPwJxo8pWaJMmvyTn9N4HQ632qJBVHf8sxHi/fEsraprwCtzvzQETrNRwVxLO5jVmRGi60j8Ue1efIlzPXV9je9mkjzOmdssymZkh2QhUrCmZYI/FCEa3/cNMW0QIDAQAB",

    //商户私钥
    'merchant_private_key' => "MIICXAIBAAKBgQCyffRONGd8Q/1kRh1cpsSRi360DXLHI7zxdPJGYe5HKDWF7u9b3zZU9erZpM90XE7gZRKsxIgOurH4uqhmVRbto3e+LiYOyNpd6As3Q427KCTIT7ajhHicZ6GWhegTUiVLqiuWLsauQcbI6DO4GEZrlvAdzus0WcJiJOxW02rxSQIDAQABAoGAXBJYyVaC4zj3Jph8YOStlR5N13bwdATdW/glWWT+0rnNEi90TQHRNvY7lNVNJgrPrTS182TVgjOPxmwSnebakhIuGIdPq99GLE4LGd5lKWTzkd84BMvhatfNsCCzcEVFqKg3tZd4t3fQ93FrILsnnZpLhiW53jIrStCkR3rx9OECQQDWMSHyc91hEVMQqVNasbGEicKWxhoDqjdm2lHkBx4mrB9JEZFDs6MxWdajf2/Qw+tgtpN3YBcCDw/HnGHhQtStAkEA1VTyjOdAwWode8X4fu0IPq9+E19mcVOAJjLBH46mropwgOdj3raqT/ThaKeaydjabsTAiY2J18HiTiyH+1bGjQJBAKgRJXH5OFxSG7uXIbCofYJiFi34g7EcfxxVcqxaaW4u4N2Uy0c0TXkL5T+lXzeQg8D/gfbJj0QuTVNzgdofdoECQBHYOznCFk6Xe8PguXqUhT4JG/iu4DjWjT+kuzbSjerHtcVylY4JpZFuoHRKoM4Fj6/4UUqwRjmABFgZrX4+sfkCQCNI8RCZ6yprh5kEOePo3uazAlNENP8dKkhgqChawdK77NzlJ727Nt23STHFx6NkhzyruJGQ5Vx1Lkl0wKuKbXM=",

    //编码格式
    'charset' => "UTF-8",

    //支付宝网关
    'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

    //应用ID
    'app_id' => "2016061501500000",

    //异步通知地址,只有扫码支付预下单可用
    'notify_url' => "http://www.fangbei.org/alipay/notify.html",

    //最大查询重试次数
    'MaxQueryRetry' => "10",

    //查询间隔
    'QueryDuration' => "3"
);

其中'支付宝公钥'就是在'前面中复制保存的'，直接复制到程序中即可，而商户'私钥是之前OpenSSL中生成的私钥'。
'APPID是该服务的id号'。

而这个'异步通知'将会'接收扫码支付结果'的通知。

 

五、条码支付、扫码支付、订单查询、退款申请
1. 条码支付

条码支付的参数配置如下

// (必填) 商户网站订单系统中唯一订单号，64个字符以内，只能包含字母、数字、下划线，
// 需保证商户系统端不能重复，建议通过数据库sequence生成，
$outTradeNo = "barpay" . date('Ymdhis') . mt_rand(100, 1000);
$subject = "方倍工作室-支付宝-当面付-条码支付";
$totalAmount = 0.01;    // (必填) 订单总金额，单位为元，不能超过1亿元

// (必填) 付款条码，用户支付宝钱包手机app点击“付款”产生的付款条码
$authCode = $_POST['auth_code']; //28开头18位数字

// 支付超时，线下扫码交易定义为5分钟
$timeExpress = "5m";

// 创建请求builder，设置请求参数
$barPayRequestBuilder = new AlipayTradePayContentBuilder();
$barPayRequestBuilder->setOutTradeNo($outTradeNo);
$barPayRequestBuilder->setTotalAmount($totalAmount);
$barPayRequestBuilder->setAuthCode($authCode);
$barPayRequestBuilder->setTimeExpress($timeExpress);
$barPayRequestBuilder->setSubject($subject);
// 调用barPay方法获取当面付应答
$barPay = new AlipayTradeService($config);
$barPayResult = $barPay->barPay($barPayRequestBuilder);

switch ($barPayResult->getTradeStatus()) {
    case "SUCCESS":
        echo "支付宝支付成功:" . "<br>--------------------------<br>";
        print_r($barPayResult->getResponse());
        break;
    case "FAILED":
        echo "支付宝支付失败!!!" . "<br>--------------------------<br>";
        if (!empty($barPayResult->getResponse())) {
            print_r($barPayResult->getResponse());
        }
        break;
    case "UNKNOWN":
        echo "系统异常，订单状态未知!!!" . "<br>--------------------------<br>";
        if (!empty($barPayResult->getResponse())) {
            print_r($barPayResult->getResponse());
        }
        break;
    default:
        echo "不支持的交易状态，交易返回异常!!!";
        break;
}
    return;
}
复制代码
程序监测，最终提交的url如下

https://openapi.alipay.com/gateway.do?app_id=2016061501500000&version=1.0&format=json&sign_type=RSA&method=alipay.trade.pay&timestamp=2016-08-26+17%3A14%3A52&auth_token=&alipay_sdk=alipay-sdk-php-20160411&terminal_type=&terminal_info=&prod_code=&notify_url=&charset=UTF-8&app_auth_token=&sign=EMVoBAhPkW6B1m%2BoXytdbUpIxnIAq73jtiPhlH2VUYy4OcJQ2UiVTXWttw0y%2B7UEXHWILY8fYRDoNrJWSjBATrAqbGCLpPc4YBQSwtPCb%2F76d65dMQEyrEnk2sgcqhxCiJNKRoQjgAQmBQdHneerU7SwSNJ%2FfF%2F025yltZk5lzQ%3D
发送的json数据如下：

复制代码
{
    "scene":"bar_code",
    "out_trade_no":"barpay20160826051452680",
    "total_amount":0.01,
    "auth_code":"289743098358423535",
    "timeout_express":"5m",
    "subject":"方倍工作室-支付宝-当面付-条码支付"
}
复制代码
接收到的数据如下

复制代码
{
    "alipay_trade_pay_response":{
        "code":"10000",
        "msg":"Success",
        "buyer_logon_id":"118***@qq.com",
        "buyer_pay_amount":"0.01",
        "buyer_user_id":"2088002364008751",
        "fund_bill_list":[
            {
                "amount":"0.01",
                "fund_channel":"ALIPAYACCOUNT"
            }
        ],
        "gmt_payment":"2016-08-26 17:14:59",
        "invoice_amount":"0.01",
        "open_id":"20880044751374809757987911112575",
        "out_trade_no":"barpay20160826051452680",
        "point_amount":"0.00",
        "receipt_amount":"0.01",
        "total_amount":"0.01",
        "trade_no":"2016082621001004750244100034"
    },
    "sign":"pEDeMwh6x73t9LmWrZpGnVb1npnKtODw6+8MDUTurNPVWXR1JHT+x3cRt2G4SDNHzxkJTzSpUXjNylsWisRTnQJJzqRP5XMujxmaAHP/d5xXeyWasDag5Cj7yGD7t80buDAsdE4eoqQ6ox7KzJ6LwKcphOX13tI+Ukt1dGCQS5o="
}
复制代码
 

2. 扫码支付

扫码支付的参数配置如下

复制代码
// (必填) 商户网站订单系统中唯一订单号，64个字符以内，只能包含字母、数字、下划线，
// 需保证商户系统端不能重复，建议通过数据库sequence生成，
$outTradeNo = "qrpay".date('Ymdhis').mt_rand(100,1000);
$subject = "方倍工作室-支付宝-当面付-扫码支付";
$totalAmount = "0.01";

// 支付超时，线下扫码交易定义为5分钟
$timeExpress = "5m";

// 创建请求builder，设置请求参数
$qrPayRequestBuilder = new AlipayTradePrecreateContentBuilder();
$qrPayRequestBuilder->setOutTradeNo($outTradeNo);
$qrPayRequestBuilder->setTotalAmount($totalAmount);
$qrPayRequestBuilder->setTimeExpress($timeExpress);
$qrPayRequestBuilder->setSubject($subject);

// 调用qrPay方法获取当面付应答
$qrPay = new AlipayTradeService($config);
$qrPayResult = $qrPay->qrPay($qrPayRequestBuilder);

//    根据状态值进行业务处理
switch ($qrPayResult->getTradeStatus()){
    case "SUCCESS":
        echo "支付宝创建订单二维码成功:"."<br>---------------------------------------<br>";
        $response = $qrPayResult->getResponse();
        $qrcode = $qrPay->create_erweima($response->qr_code);
        echo $qrcode;
        print_r($response);
        
        break;
    case "FAILED":
        echo "支付宝创建订单二维码失败!!!"."<br>--------------------------<br>";
        if(!empty($qrPayResult->getResponse())){
            print_r($qrPayResult->getResponse());
        }
        break;
    case "UNKNOWN":
        echo "系统异常，状态未知!!!"."<br>--------------------------<br>";
        if(!empty($qrPayResult->getResponse())){
            print_r($qrPayResult->getResponse());
        }
        break;
    default:
        echo "不支持的返回状态，创建订单二维码返回异常!!!";
        break;
}
复制代码
生成的提交请求URL如下

https://openapi.alipay.com/gateway.do?app_id=2016061501500000&version=1.0&format=json&sign_type=RSA&method=alipay.trade.precreate&timestamp=2016-08-26+17%3A38%3A13&auth_token=&alipay_sdk=alipay-sdk-php-20160411&terminal_type=&terminal_info=&prod_code=&notify_url=http%3A%2F%2F123.daoqidata.com%2Fweixin%2Frawpost.php&charset=UTF-8&app_auth_token=&sign=ayYiJRZ63RomVEt8Ayz58Uiyv3y5IrbbX8CTfX6zNHkT%2Fu11U7ISUYWCXjrwrwCo2Oq2tdo%2FjtuhrBbDp5ULnTmuBBUktQDCCF53PF5yiUDGikxUPFYugeUrTg3gw4DqxOiNKM6ZB6MI0n%2F9M78a%2FnP8GtZ4WthyHIl%2B%2FozSyT4%3D
发送的json数据如下：

复制代码
{
    "out_trade_no":"qrpay20160826053813582",
    "total_amount":"0.01",
    "timeout_express":"5m",
    "subject":"方倍工作室-支付宝-当面付-扫码支付"
}
复制代码
返回的数据如下：

复制代码
{
    "alipay_trade_precreate_response":{
        "code":"10000",
        "msg":"Success",
        "out_trade_no":"qrpay20160826053813582",
        "qr_code":"https://qr.alipay.com/bax00885xbhszseo9l7p404d"
    },
    "sign":"VfNTGo2WMZ+2CE1L05lNYWtFn4inHXO/tUaBZIBHN4fPlXnCvyc9IhS8S7wa3FYw23G30luEPEHkZWobnfpUjILonmExZVElHv3ylINz+Q2mQ5M8Sb/d61YPvf4Bgy1OvlrT4D3H/i3judmzEDBrOyFN9kB9vSkKaYC+b6L41Zw="
}
复制代码
其中的https://qr.alipay.com/bax00885xbhszseo9l7p404d 就是二维码链接地址，使用接口将其成二维码后如下所示。



当支付宝用户扫码的时候，接口通知将收到如下数据

复制代码
{
    "notify_id":"4c2c04c3cc50e978d44212febe7c3f0lse",
    "seller_email":"pay***@fangbei.org",
    "notify_type":"trade_status_sync",
    "sign":"R0iRdYmSQ0+zuSUGLzkutHcR40hoOp+CcKojVBCMa1uji3rqQFe5XeHoJB1nMBCApE3zXPKhXMdLis109ngPbGy+NUEBR7YZjYuR/hXq3WXeYfZ8aiWLvloZHrF7dQWxDho/VHYexaLeqvRi/03m0HxrwhZKUOu1eS9wMgZOlqQ=",
    "trade_no":"2016082621001004750241229810",
    "buyer_id":"2088002364008751",
    "app_id":"2016061501500000",
    "gmt_create":"2016-08-26 18:20:37",
    "out_trade_no":"qrpay20160826062009757",
    "seller_id":"2088421202724253",
    "notify_time":"2016-08-26 18:20:37",
    "subject":"方倍工作室-支付宝-当面付-扫码支付",
    "trade_status":"WAIT_BUYER_PAY",
    "open_id":"20880044751374809757987911112575",
    "total_amount":"0.01",
    "sign_type":"RSA",
    "buyer_logon_id":"118***@qq.com"
}
复制代码
当用户输入密码付款成功之后，将收到如下数据

复制代码
{
    "fund_bill_list":"[{"amount":"0.01","fundChannel":"ALIPAYACCOUNT"}]",
    "subject":"方倍工作室-支付宝-当面付-扫码支付",
    "trade_no":"2016082621001004750241229810",
    "gmt_create":"2016-08-26 18:20:37",
    "notify_type":"trade_status_sync",
    "total_amount":"0.01",
    "out_trade_no":"qrpay20160826062009757",
    "invoice_amount":"0.01",
    "open_id":"20880044751374809757987911112575",
    "seller_id":"2088421202724253",
    "notify_time":"2016-08-26 18:20:50",
    "trade_status":"TRADE_SUCCESS",
    "gmt_payment":"2016-08-26 18:20:50",
    "seller_email":"pay***@fangbei.org",
    "receipt_amount":"0.01",
    "buyer_id":"2088002364008751",
    "app_id":"2016061501500000",
    "notify_id":"56f97611ee609f46384b188b409e75else",
    "buyer_logon_id":"118***@qq.com",
    "sign_type":"RSA",
    "buyer_pay_amount":"0.01",
    "sign":"nf/KJryACk0utqlNrnuYMiSnYw6HsxqpJPk2O5MhCZ+wZUVQbrD3sq5POO3GU7LSRoSiUUIO4JEYEL12Ek2+w3lTcLS9WEi60sYowPOcJEYGmVfNZbVR6+k7yO5au2WIkM3MKsxm2XxIB9xPMmRDACGhvqZ2BXUAQujkPk1FT0s=",
    "point_amount":"0.00"
}
复制代码
 

3. 订单查询

订单查询的参数配置如下

复制代码
////获取商户订单号
$out_trade_no = trim($_POST['out_trade_no']);

//第三方应用授权令牌,商户授权系统商开发模式下使用
$appAuthToken = "";//根据真实值填写

//构造查询业务请求参数对象
$queryContentBuilder = new AlipayTradeQueryContentBuilder();
$queryContentBuilder->setOutTradeNo($out_trade_no);

$queryContentBuilder->setAppAuthToken($appAuthToken);


//初始化类对象，调用queryTradeResult方法获取查询应答
$queryResponse = new AlipayTradeService($config);
$queryResult = $queryResponse->queryTradeResult($queryContentBuilder);

//根据查询返回结果状态进行业务处理
switch ($queryResult->getTradeStatus()){
    case "SUCCESS":
        echo "支付宝查询交易成功:"."<br>--------------------------<br>";
        print_r($queryResult->getResponse());
        break;
    case "FAILED":
        echo "支付宝查询交易失败或者交易已关闭!!!"."<br>--------------------------<br>";
        if(!empty($queryResult->getResponse())){
            print_r($queryResult->getResponse());
        }
        break;
    case "UNKNOWN":
        echo "系统异常，订单状态未知!!!"."<br>--------------------------<br>";
        if(!empty($queryResult->getResponse())){
            print_r($queryResult->getResponse());
        }
        break;
    default:
        echo "不支持的查询状态，交易返回异常!!!";
        break;
}
复制代码
最终提交的url如下

https://openapi.alipay.com/gateway.do?app_id=2016061501500000&version=1.0&format=json&sign_type=RSA&method=alipay.trade.query&timestamp=2016-08-26+18%3A27%3A07&auth_token=&alipay_sdk=alipay-sdk-php-20160411&terminal_type=&terminal_info=&prod_code=&notify_url=&charset=UTF-8&app_auth_token=&sign=eIuYJtes95quAN3X9eXbQzBa%2FCvm5QgQ0ToUsS8MSkCjhZACYpnU7ZT5MuD31lPZPFHVEjCKsdWiq4tuNtJPFPxirg7pkTiT09C%2Bz8PsUA844Y7hjkkX%2B4CVZcGtO11m3Ap0JECrtZW8hhJTE9bPY1v43X2BSL5Cp3Ulpac1FsM%3D
发送的json数据如下：

{
    "out_trade_no":"qrpay20160826053813582"
}
接收到的数据如下

复制代码
{
    "alipay_trade_query_response":{
        "code":"10000",
        "msg":"Success",
        "buyer_logon_id":"118***@qq.com",
        "buyer_pay_amount":"0.01",
        "buyer_user_id":"2088002364008751",
        "fund_bill_list":[
            {
                "amount":"0.01",
                "fund_channel":"ALIPAYACCOUNT"
            }
        ],
        "invoice_amount":"0.01",
        "open_id":"20880044751374809757987911112575",
        "out_trade_no":"qrpay20160826053813582",
        "point_amount":"0.00",
        "receipt_amount":"0.01",
        "send_pay_date":"2016-08-26 17:38:58",
        "total_amount":"0.01",
        "trade_no":"2016082621001004750239053830",
        "trade_status":"TRADE_SUCCESS"
    },
    "sign":"E2MxjdAhW/EqRFNkZgy/Y//dA5Cmb54Hnqa0cjBz+ZcFTULi1lvFms93onP7cpVK/fI7YxbkZTKBPk29o4aeWKXlSYCrT92domAyqahzYCA7/5A3Msc/awALYrFOdWyJJdlncWdFRN9hx52iVRIjxvLJ0hIMVIQqEDavG28HPbo="
}
复制代码
 

4. 订单退款

订单退款的参数配置如下

复制代码
$out_trade_no = trim($_POST['out_trade_no']);
$refund_amount = trim($_POST['refund_amount']);
$out_request_no = trim($_POST['out_request_no']);

//第三方应用授权令牌,商户授权系统商开发模式下使用
$appAuthToken = "";//根据真实值填写

//创建退款请求builder,设置参数
$refundRequestBuilder = new AlipayTradeRefundContentBuilder();
$refundRequestBuilder->setOutTradeNo($out_trade_no);
$refundRequestBuilder->setRefundAmount($refund_amount);
$refundRequestBuilder->setOutRequestNo($out_request_no);

$refundRequestBuilder->setAppAuthToken($appAuthToken);

//初始化类对象,调用refund获取退款应答
$refundResponse = new AlipayTradeService($config);
$refundResult =    $refundResponse->refund($refundRequestBuilder);

//根据交易状态进行处理
switch ($refundResult->getTradeStatus()){
    case "SUCCESS":
        echo "支付宝退款成功:"."<br>--------------------------<br>";
        print_r($refundResult->getResponse());
        break;
    case "FAILED":
        echo "支付宝退款失败!!!"."<br>--------------------------<br>";
        if(!empty($refundResult->getResponse())){
            print_r($refundResult->getResponse());
        }
        break;
    case "UNKNOWN":
        echo "系统异常，订单状态未知!!!"."<br>--------------------------<br>";
        if(!empty($refundResult->getResponse())){
            print_r($refundResult->getResponse());
        }
        break;
    default:
        echo "不支持的交易状态，交易返回异常!!!";
        break;
}
复制代码
最终提交的url如下

https://openapi.alipay.com/gateway.do?app_id=2016061501500000&version=1.0&format=json&sign_type=RSA&method=alipay.trade.refund&timestamp=2016-08-26+18%3A47%3A35&auth_token=&alipay_sdk=alipay-sdk-php-20160411&terminal_type=&terminal_info=&prod_code=&notify_url=&charset=UTF-8&app_auth_token=&sign=Y1c5qWglAQ0t3brViEtqFnIJRQMn%2Fl9vMla1xgXKcExercJopMyS2rPOHaw%2F2PJEOKJC7r9qAfDGkNq4LHzXhBrD8sxLPqImPS6aWcW9p8s%2FzC2oQCJnLfaPx6lh8veHarj4WzDayeZLA48ttoQLjuMGPrITgOXYjHHyUKdBqSs%3D
发送的json数据如下：

{
    "out_trade_no":"qrpay20160826053813582",
    "refund_amount":"0.01",
    "out_request_no":"1"
}
接收到的数据如下

复制代码
{
    "alipay_trade_refund_response":{
        "code":"10000",
        "msg":"Success",
        "buyer_logon_id":"123***@qq.com",
        "buyer_user_id":"2088002364008751",
        "fund_change":"Y",
        "gmt_refund_pay":"2016-08-26 18:47:41",
        "open_id":"20880044751374809757987911112575",
        "out_trade_no":"qrpay20160826053813582",
        "refund_detail_item_list":[
            {
                "amount":"0.01",
                "fund_channel":"ALIPAYACCOUNT"
            }
        ],
        "refund_fee":"0.01",
        "send_back_fee":"0.01",
        "trade_no":"2016082621001004750239053830"
    },
    "sign":"YDNSMpX5y0rQEs0ZbfNxRFVIp8hf0W30OR74cMtwKVPO2BYee6TQC+pbnwESSZ2XSGLozTyy7o+SIa07L+FMhDv/PTt6QX1mVgQv7RhzoDkls0zDRS/5/fy9Oyj01XS1wb8Od/93iNLZDkd2yw9g0He6qGYlpcXutkmwuASd7BM="
}
复制代码
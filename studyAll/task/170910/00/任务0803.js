//1.回写订单状态
//2.返回预支付信息

一，商户端我的订单，对'未付款'的订单的处理
1.'未付款' '类型是线上'，显示在创建时间10分钟以内的订单，过期的不显示
2.'未付款' '类型不是线上'，都显示
3.付过款的全部显示


<xml>
<nonce_str>0fccec00bbcf5bf1fba50192e9f808ac</nonce_str>
<out_trade_no>170824163509952</out_trade_no>
<appid>wxf648f0b53f9d12c8</appid>
<total_fee>1.0</total_fee>
<product_id>170824163509952</product_id>
<sign>E778D27CD43578645331664EBD02D635</sign>
<trade_type>NATIVE</trade_type>
<mch_id>1487329722</mch_id>
<body>会员羽毛球馆固定订场</body>
<notify_url>http://liuqhj.tunnel.echomod.cn/api/pay/callback/0/001e39c781f94eac9fb04e12e972c2d8</notify_url>
<spbill_create_ip>127.0.0.1</spbill_create_ip>
</xml>
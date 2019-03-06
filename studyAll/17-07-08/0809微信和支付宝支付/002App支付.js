App支付场景介绍
'商户APP'会'跳转到微信'中'完成支付'，支付'完后跳回'到'商户APP'内，最后展示支付结果。

'步骤如下：'
步骤（1）：'用户''进入商户APP'，'选择商品下单'、'确认购买'，进入支付环节。
'商户'服务后台'生成支付订单'，'签名'后'将数据传输到APP端'。
步骤（2）：用户点击后发起支付操作，进入到微信界面，调起微信支付，出现确认支付界面
步骤（3）：用户确认收款方和金额，点击立即支付后出现输入密码界面，可选择零钱或银行卡支付
步骤（4）：输入正确密码后，'支付完成'，用户端微信出现支付详情页面
步骤（5）：'回跳到商户APP中'，商户APP'根据支付结果'个性化'展示订单处理结果'

业务流程
商户系统和微信支付系统主要交互说明：
步骤1：'用户在商户APP'中'选择商品'，提交订单，选择'微信支付'。
步骤2：'商户'后台'收到用户支付单'，'调用'微信支付'统一下单接口'。
步骤3：'统一下单'接口'返回正常的prepay_id'，'再按签名规范重新生成签名后'，将数据'传输给APP'。
'参与签名的字段'名为appid，partnerid，prepayid，noncestr，timestamp，package。注意：package的值格式为Sign=WXPay
步骤4：'商户'APP'调起微信支付'。api参见本章节【app端开发步骤说明】
步骤5：商户后台接收支付通知。api参见【支付结果通知API】
步骤6：商户后台查询支付结果。，api参见【查询订单API】
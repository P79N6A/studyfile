如果
//线下开场
1.8-9  8:30创建   8:30-8:40  8:35-8:45
8:35请求二维码(有效时间设置为10分钟) --》 order二维码过期时间（8:45）
//线下预定
2.8-9  6创建   7:30取消
6:30请求二维码(有效时间设置为10分钟) --》 二维码有效时间6:40<7:30不处理
7:25请求二维码(有效时间设置为10分钟) --》 二维码有效时间7:35>7:30不处理 order二维码过期时间（7:35）

过期时间（8:45）只用于定时任务取消订单，
不用在请求支付接口的时候后台动态判断过期

PAY_EXPIRY_DATE
ALTER TABLE `ve_area_order`
	add COLUMN `PAY_EXPIRY_DATE` datetime DEFAULT NULL COMMENT '订单支付过期时间';

请求完二维码，去更新时间，如果已经被删掉，就不返回url
where ID='' and IS_DELETE= '';
定时取消订单的时候，需要比较PAY_EXPIRY_DATE，如果已经不一样了，就不删除
where ID='' and PAY_EXPIRY_DATE= '';



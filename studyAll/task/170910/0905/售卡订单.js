搜索订单

可按'订单编号'或'手机号'查找

筛选订单状态（'线上充值'才'显示筛选按钮'，
因'线下充值'订单'只有一种状态'）
内容：
1、全部订单
2、已支付
3、待支付
4、已取消

切换'选项卡'
内容：
1、'线上售卡'
2、'线下开卡'

订单日期
'按'订单'日期倒序'显示

订单状态：
一、'线上售卡'订单'状态'有三种：
  1、'已支付'：已经支付完成
  2、'待支付'：提交订单，但未付款
  3、'已取消'：提交订单未付款，系统在'十分钟后自动取消'
或者商户'手动取消'

二、'线下开卡订单'状态只有一种
  1、'已支付'：已经支付完成

下单时间
订单生成的时间

用户名称
优先获取用户'昵称'，如'未填写昵称'，则获取用户'账户名'

订单来源

取消订单按钮（线上售卡）
显示规则：'订单状态为待支付'才'显示此按钮'。若'为线下开卡订单'，
则还需'显示“支付“按钮'

操作：点击后'弹框提示是否确定取消订单'，确定取消后'订单状态变更为已取消'

说明：'待支付'状态下的订单，'显示倒计时'，'10分钟内''未支付'
会'自动取消订单'，也'可手动取消'

交易关闭（线上售卡）
显示规则：'订单状态'为'已取消'才'显示此文字'


售卡订单列表
列表排列规则：按'下单时间倒序排列'

初始：'显示当天''所有状态订单'，若'无订单页面提示'：'还没有订单'

操作：'上拉加载记录'/'下拉刷新列表'

加载规则：'每次前一天'的'订单记录'

//订单类型：0:线下，1:固定，2:线上， 3:拍卖产生订单，4:会员线下开卡，5:会员退卡，6:会员换卡，7:会员线下充值，
//8:拍卖底价，9:线上预定-约个球，10:线上预定-活动，11约个球参与人员产生的订单，12活动参与人员产生的订单，
//13：会员线上开卡，14会员线上充值

//订单状态（0:未支付，1：已支付未开场,4：未评价，5：评价完成,6:出票失败，
//7:非约球类订单已支付，8取消-指订单支付后，没有验证开场过期的状态,9,退款中；10,已退款)

{
    "orderStatus":"",
    "orderType":"",
    "orderNo":"",
    "phone":"1"
}


{
	orderStatus=, 
	orderType=, 
	orderNo=, 
	phone=1, 
	venueId=JfQ0YK0rzpBuPp4q21z, 
	buyerAccounts=[2EJPTMJ10Gi7To5RZau, tqGHZ1EX5G8pEtjzzTp, sCraYXFn11dStJVtHUK]
}

//退卡，
//换卡，产生订单
//退卡，生成退卡订单  orderType = 5
//换卡，生成换卡订单  orderType = 6
//PAY_STATUS 	=  	1 支付成功
//PAY_TYPE 	= 	3 现金
//orderName会员退卡订单
//orderName会员换卡订单
//
////
//退卡
//ve_order_associator_detial  只记录旧卡
//
////
//换卡
//ve_order_associator_detial  记录新卡和旧卡

//
//拍卖订单，如果付款成功，需要把场次，赋值给拍卖订单

//
//会员固定生成订单，需要扣会员卡的金额

//订单类型分类，待开始，已完成。 '除'了'待评价'和'已经评价'的，其他订单'都属于未开始'。
//
//场馆名称，点击可以到达场馆详情。
//订单状态，'未支付（下单未支付）'，'已取消（未支付主动取消，商户取消）'，'未开始'，
//'待评价'，'已完成'（已评价）。
//时间场次，金额
//
//操作：'未开始为拍卖和开场'，  '未评价为评价'，'已完成可再次下单'（'直接到达'此场馆的'当日场次选择界面'）。
//
//拍卖'竞拍者'需要出价钱先'支付'一个'低价订单'，如果'拍卖成拍'，
//则还需要'支付一个差价'买受人订单。
//
//如果是'其他人竞拍成功'，其他已经'出过价的人'将开始'退款次底价订单'，
//原路退回，订单需要增加'退款中'和'已退款'状态。
//
//'成交者'自动'获得一个拍卖订单'，支付或取消订单都存在。
//
//'拍卖所得订单'和'普通订单相同'，指示拍卖订单，'倒计时支付'。
//如果'过期未支付'则'扣除底价支付'给发起拍卖人，同时'承担相应的系统黑名单限制'。
//
//由于'一个订单'有'多个场次'，所以'多个场次'订单的'开场二维码'可以'多次验证'，相当于通票。
//并在'验证完最后一个场次'的时候，'改变订单状态'。
//开场'前五分钟'和'后十分钟'可以验证，除了这个区间'验证失败并不退款'。

1./*完成时间  正常                      最后一个场次验证了开场，*/  
  /*定时任务  取消（过期）*//*释放 待确定---不释放*//*订单中最后一个场次过期的时候*/
  /*定时任务  逻辑删除 未付款 取消订单， 设置完成时间*/
  
//2.支付状态 
// 我的订单  已完成订单中需要有orderStatus是8的订单
   
//
// 选择场次中，需要把过10分钟的票去掉


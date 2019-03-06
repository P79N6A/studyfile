1.绑定电池有3个路径
  运营后台绑定与解绑
  代理商扫码
  去柜子取电池
	
2.用户有几个电池 t_batery ownid
  用户还电池没有
  用 orderNumber 查询 BatteryOrder 个数和 deposit batteries 是否相同
  查询 Order 中 type = 0 的退款单个数
	
  
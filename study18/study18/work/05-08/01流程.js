EbikeController 


------ "短信开锁流程"


app端 跟 app后台之间的交互
nearby 主界面"附近的车" -> "rent/begin 扫码开锁"  "发短信给车" -> rent/ping app端查询是否开锁成功,  EXP_LOCK_EBIKE
	如果从 EXP_LOCK_EBIKE 中拿到订单id， app提示开锁成功。


服务端 跟 车之间的的交互

车接收到短信 -> lockOrNot 车请求是否满足开锁条件 回应可以 -> lockState 车开锁 并上报开锁状态， 此时服务端生成租车订单 
	同时设置 EXP_LOCK_EBIKE 中值为 订单id


----- "电池开锁流程"

车检测到"电池插入" -> portState "上报插入电池"  校验满足生成租车订单条件  回应 开锁 -> 车收到可以开锁的回应信息 -> 车立即开锁 lockState  同时上报开锁状态 



1. rent/begin  扫码开锁
2. ping 请求处理中
3. http://120.76.72.18:8084/ebike/test/unlock?sID=000000000001  -- 车已经开锁
4. ping  订单成功

















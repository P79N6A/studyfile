"临时停车流程"
"app"端点击"临时停车" ->  "temp/lock" -> loading，临时停车ping temp/lock/ping   
等车跟后台完成交互，提示临时停车成功

"手动按关锁键"  "车"关锁之后"上报"  -> lockState  -> "lockEnd" 判断是否为临时停车  "status: -2 临时锁车"

"继续用车"流程
app端点击继续用车 -> temp/continue  发短信给车 -> temp/unlock/ping  等车完成解锁 提示成功

短信解除临时停车：
车收到短信 -> lockOrNot 可以开锁 -> 车立即开锁 然后上报状态 lockState -> unLock -> tempUnlock 解除临时停车

电池解除临时停车：
车检测到电池插入 -> portState 校验 rentOrder.getStatus() == -2   回应可以开锁 ->  车立即开锁 然后上报状态 lockState -> unLock -> tempUnlock 解除临时停车  （if else 不同）


"租电池"
DockController
app端扫码，扫借的电池， -> rent/begin  redis广播命令给dock  -> ping 

dock服务端监听redis 广播 RedisSubListener.onMessage 通过channel 发送给dock -> dock收到之后 请求服务器  -> proOrder  回应已经生成订单 -> dock亮绿灯 用户拔走电池

-- 还电池流程
dock 还电池的孔 检测到电池插入 -> portState  back 还电池成功，结束订单
public static final String EB_USER_SID = "sID";// 
用户对应的"车"， 如果"过期了"，可能用户"找不到"使用中的"车"，"这种"情况"基本不会发生"
如果发生了这种情况，"token过期"，导"致订单消失"，也"就损失"这个用户的"一笔钱"，"别人"还是"可以租车"的


---- '过期时间'和'订单一致性'
1. 车订单'过期时间30s', 短信'开锁的时候'，车会'跟我先交互一次'，
如果'APP'端因为'过期提示'已经'失败'，回复车'不要开锁'
2. 电池'订单30s过期'，插入电池，'APP端已经过期'，用户'拔出电池'，但是'订单不会生成'，
为了保持一致性、如果不这样，app提示失败，可是单还是会生成。

---- 单'车通信'
1. '拔'出'电池 '
  计'算混合时间'，'累积在''电池'和'车中'

2. '插'入'电池'  注意插入电池 '后台'这边来'说明''要不要开锁'
  '标志混合''开始时间'
  看'电池是不是''有人租了'
    '没人租'过 回应'直接开锁'
    '有人租'过
      '自己'租的，回应啥也不干，通过上面'记录mix时间'
      '别人'租的，回应'关锁'，因为'一个电池'对应的'用户只能开一个车'
  
  ---- '电池开锁'的时候， '中控请求'我'一下'，我'回应可以开锁'，然后'中控就开锁'， 流程就'结束'了

3. 开锁
  '短信开锁'
    先'问'我'是否可以开锁'，目的是'保持跟app'提示'一致'性
  电池开锁
    用户'电池首次''放入该车'，'开锁'，'生成订单'
    用户电池'非首次放入'，'啥也不干'
    

4. 关锁
  '结束订单'
  '临时停车'，'如果'是'在电子围栏里面'
  
  
  
  
  
  
  
  
  
  
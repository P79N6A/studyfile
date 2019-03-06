------ dock
'一个箱子'里面有'两个dock', type'0-借' '1-还' ，

1. '借电池'
  '插入电池'，先把'电池加'入'到dock'，便于'app'那边'能'够'通过dock' '拿到电池id'
  '广播'之'后'，'中控收到'，然后'请求我'，'是不是可以租'电池，回应'可以租电池'，表示ok, 这个时候'已经生成'了'订单'
  '生成订单'之后，'响3声'然后，'通知用户'可以'取走电池'

0. '模拟插入'电池
hset eb:dock:222222222222 bid 000000000003
hgetall eb:dock:222222222222

1. '掉接口'  dock '扫码用电池'  注意 sID=222222222222  
2. '开锁dock'
  http://120.76.72.18:8084/ebike/test/dock/rent?sID=222222222222

3.查一下 'dock 的using' '是不是'已经'租电池成功'

'看一下订单'
get eb:dock:order:000000000003

4. '结束电池'
  http://120.76.72.18:8084/ebike/test/dock/back?sID=333333333333&bID=030000000000

  select * from eb_battery_order order by finish_time desc limit 12
  
  
  
------ '电池开锁'

1. '插入电池'解锁  注意'电池是反的'， 就这个地方是反的
  http://120.76.72.18:8084/ebike/test/unlock?sID=000000000001&bID=030000000000



2. '先结束车'，     '注意'下数据库中的'mix'
  需要先'拔出电池'，'才能'够'看到mix_time'

  http://120.76.72.18:8084/ebike/test/lockend?sID=000000000001
  select * from eb_ebike_order order by finish_time desc limit 12

3. '结束电池'
  http://120.76.72.18:8084/ebike/test/dock/back?sID=333333333333&bID=030000000000
  select * from eb_battery_order order by finish_time desc limit 12  
  
'查下'车的'订单情况'
hgetall eb:ebike:mix:000000000001

get eb:ebike:order:000000000001

get eb:dock:order:000000000003 
  

-----------'整体性'
关于'车的位置'信息：
0. '车心跳'如果'有经纬度'，'写入'
1. '开锁'，'解锁'的时候会'写入'
2. 用户'扫码'的时候'写入'

3. 这个 安卓打印日志过多了。


------- 'B3 电池'：
提供'删除'和'修改'功能'给客户端'

'条形码存在'， 返回'错误'
条形码'不存在'，'看id'
     'id 存在'，直接'覆盖'
     'id不存在'，'新建一条记录'

select * from eb_battery group by bar_code having count(bar_code) > 1


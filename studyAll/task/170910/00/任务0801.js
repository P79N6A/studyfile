这里表示往这个手机号发短信，对吗
这个不强制，一定是用户用来登录的手机号
对不对？
张举  9:11:05
'目前不让修改'，'只能是自己给自己买'
刘奇  9:11:25
意思是，就是'用户注册c端的手机号码'
这个是'带出来的'吗

张举  9:15:58
是的
刘奇  9:16:31
好的


//
昨天董哥说的那个改了策略就要出票的，如果今天的票已经出了，还要立马出票吗

'常规策略'总天数是'7天的'。'才会出票',
'按照可预订天数'，某一天'只要是出过票'，那么该天'不再出票'，
'新的策略'，'只会对以后'，'还没有出票'的'某天场地''生效'


新增常规方案
1.遍历场地 //验证数据  某一个场地的常规方案不得超过七天
2.验证时间，需要时间在营业时间内，同时时间不能有重叠部分
3.新增方案 ① 新增方案表   ③在添加新方案
注意  如果新增时。常规策略满足7天，那么将异步更新场馆票表
0删除掉ve_area_time中该场地的数据
1将入参中的时间价格拆好
2把拆分后的数据和旧数据比较，如果相当，就更新状态


修改常规方案
1.遍历场地 //验证数据  某一个场地的常规方案不得超过七天
2.验证时间，需要时间在营业时间内，同时时间不能有重叠部分
3.修改方案 ① 修改方案表   ②先删除旧方案  ③在添加新方案
注意  如果修改时。常规策略满足7天，那么将异步更新场馆票表
0删除掉ve_area_time中该场地的数据
1将入参中的时间价格拆好
2把拆分后的数据和旧数据比较，如果相当，就更新状态




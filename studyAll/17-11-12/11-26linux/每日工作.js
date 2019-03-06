20171127
重启14整套环境
1、'启动redis和zk'
'/etc/init.d/ligusports_redis_6382 start'
'/home/project/ligusports/zookeeper-3.4.10/bin/zkServer.sh start'
2、启动主从数据库，及集群建立
数据库路径'/home/data/mysql-venue/'
3307主（写） 3308从（读）
--启动两个mysql服务
'sh .3307/start.sh'
'sh .3308/start.sh'

--'在3307查询mysql的用户'
select * from mysql.user;
主从同步帐号是一个叫“master”的帐号

--'在3307'查询出'Master'服务器的'状态'
show master status;//记录下File、Position字段的内容

--从服务器'3308'连接'主服务器3307'
change master to master_host='192.168.1.14',//Master服务器的IP
master_port=3307,
master_user='master',
master_password='1234', 
master_log_file='mysql-bin.000012',//Master服务器产生的日志
master_log_pos=15085;

--'启动“主从服务”'/'停止“主从服务”'
'start slave;/stop slave';

--查看'Slave服务器''是否同步成功'(放到工具里面执行，好像不用\G)
'show slave status\G';//主要查看Slave_IO_Running: Yes 和 Slave_SQL_Running: Yes

3、'启动mycat'
'启动mycat->web'
'启动顺序必须为：zookper -> mycat -> mycat_web',否则可能会出现问题
'/home/data/mycat/zookeeper/bin/zkServer.sh stop'
'/home/data/mycat/zookeeper/bin/zkServer.sh start'
'netstat -ant | grep 2183' //---查看是否启动成功

'启动mycat'
'/home/data/mycat/mycat/bin/mycat start'

'启动mycat-web'
'/home/data/mycat/web/start.sh &'
'netstat -ant | grep 8083' //---查看是否启动成功

//---------------下面的用来查看一些信息 不用理会
--通过.sock文件连接mysql
mysql -uroot -p1234 -P9066 -h127.0.0.1 -S /tmp/3307_mysql.sock
--退出mysql命令窗口
quit;
//----------------------------------------------



20171124
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
添加银行卡、更新银行卡的时候，调整场馆状态
运营后台、商户PC的日志记录
分库分表：刘奇
缩略图 ：黄书化
KAFKA做数据同步
WrongDocumentError

同步开发库和测试库的表结构
处理测试环境脏数据

20171123
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
添加银行卡、更新银行卡的时候，调整场馆状态
运营后台、商户PC的日志记录
分库分表：刘奇
缩略图 ：黄书化

20171121
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
添加银行卡、更新银行卡的时候，调整场馆状态 -》林兵
朱选文那半个一个mybatis的空指针异常
数据库死锁 -》分析出死锁的原因
游戏接口-》http协议即可
分库分表：刘奇
缩略图 ：黄书化


20171120
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
转测材料 -》代码评审与签字
订单找不到固定方案  --》朱选文已解决
运营后台-发现模块 --》黄书化
菜单下面刘空白，浏览器显示状态的时候，看不到菜单了-》加高底部
朱选文那半个一个mybatis的空指针异常
数据库死锁
游戏接口
分库分表：刘奇
缩略图 ：黄书化



20171117
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
框架异常处理、日志打印（获取注册验证码时，手机号不对，后台的错误没有正确抛出）
广告页面由api传递过去，没有到服务器上  -》广告模块在删除原图片时，逻辑处理不合理，把刚传的新图片删除了
朱选文那半个一个mybatis的空指针异常
数据库死锁
订单找不到固定方案



20171116
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
活动的订单自动消失了BUG<3点开始的已支付订单发起活动后，2:50在待开始里面看不到了，在已完成中显示了，且显示为“线上预定”> ----->9月份的一个处理活动订单的定时任务TimerOutBookingOrder需要删掉，10分钟的判断有误；后来集中在另外一个定时任务中处理了
UI样式整体调整 -》改了源码，本可以不用该，开始时选用的按钮已经使用太多，更改太多，直接改掉了基础样式 

20171115
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
冻结的会员，不能做任何操作，接口要限定
	1-/userorder/offlineStart 线下开场
	1-/userorder/addOfflineOrder 线下预定
	1-/confirmorder 确认订单
	1-/userorder/associatorpay 会员卡支付
	1-/businessorder/payUseMoney 现金支付
	未搜索到-/associator/changeless 固定预定
	未搜索到-/associator/changeless 修改固定预定
	未搜索到-/associator/changeless/{id} 删除固定预定
	1-/associator/backCard/{id} 退卡
	1-/associator/updatePassword 重置会员密码		----------------没有任何校验
	1-/associator/activateCard/{id} 开卡
	1-/associator/changeCard/{id} 换卡
	1-/userorder/rechargeToAssociatorCard/{cardNo} 生成充值订单
	1-/userorder/rechargeToAssociatorCard/{orderNo}/pay 生成充值订单支付url
	1-/userorder/rechargeToAssociatorCard/{orderNo}/bussiness/update 现金支付后商户更新会员卡充值的订单（商户更新自己的会员卡充值订单）
	1-/userorder/associatorBindCard/{associatorId} 生成开卡订单（产生实际的卡，卡信息放入生成的订单中）
	1-/userorder/associatorBindCard/{orderNo}/pay 生成开卡订单支付url
	1-/userorder/associatorBindCard/{orderNo}/bussiness/update 现金支付后商户更新会员卡开卡的订单（商户更新自己的会员卡开卡订单）
	1-/pay/order 支付订单，获得扫码支付的url（APP自己生成二维码，让用户扫）
	1-/pay/order/retprepayid 微信支付获取微信app跳转参数
	1-/pay/order/alipayretall 支付宝获取跳转app的url
	1-/venueAssociator/associator 新增固定（立即固定）
	1-/venueAssociator/updateAssociator 更新固定
	1-/userorder/dchangOrderByTicketId 线下开场
	1-/userorder/saveOfflineOrderByTicketId 线下预定
	
	1-/venue/receiveByVoucherId id领取代金券
	1-/venue/receivebyphone 手机号领取代金券
	1-/uservoucher/getvoucher 领取代金券
	1-/rent/confirmorder 确认订单
	1-/userorder/user/associatorpay  用户使用会员卡支付订单
	0-/businessorder/beginByTicketId ticket开场     ------------------已经付了款的开场，不拦着
	1-/associator/activeCard/{cardNo} 会员卡激活
	1-/userorder/reCharge/{cardNo} 线上充值
	1-/userorder/buyCard 线上购卡
	
商户PC场馆注册功能


20171114
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
进度核对 --》
B&C端会员卡支付校验 --》用户已经被当前场馆冻结
冻结的会员，不能做任何操作，接口要限定
	1-/userorder/offlineStart 线下开场
	1-/userorder/addOfflineOrder 线下预定
	1-/confirmorder 确认订单
	1-/userorder/associatorpay 会员卡支付
	1-/businessorder/payUseMoney 现金支付
	未搜索到-/associator/changeless 固定预定
	未搜索到-/associator/changeless 修改固定预定
	未搜索到-/associator/changeless/{id} 删除固定预定
	1-/associator/backCard/{id} 退卡
	1-/associator/updatePassword 重置会员密码		----------------没有任何校验
	1-/associator/activateCard/{id} 开卡
	1-/associator/changeCard/{id} 换卡
	-/userorder/rechargeToAssociatorCard/{cardNo} 生成充值订单
	-/userorder/rechargeToAssociatorCard/{orderNo}/pay 生成充值订单支付url
	-/userorder/rechargeToAssociatorCard/{orderNo}/bussiness/update 现金支付后商户更新会员卡充值的订单（商户更新自己的会员卡充值订单）
	-/userorder/associatorBindCard/{associatorId} 生成开卡订单（产生实际的卡，卡信息放入生成的订单中）
	-/userorder/associatorBindCard/{orderNo}/pay 生成开卡订单支付url
	-/userorder/associatorBindCard/{orderNo}/bussiness/update 现金支付后商户更新会员卡开卡的订单（商户更新自己的会员卡开卡订单）
	-/pay/order 支付订单，获得扫码支付的url（APP自己生成二维码，让用户扫）
	-/pay/order/retprepayid 微信支付获取微信app跳转参数
	-/pay/order/alipayretall 支付宝获取跳转app的url
	-/venueAssociator/associator 新增固定（立即固定）
	-/venueAssociator/updateAssociator 更新固定
	-/userorder/dchangOrderByTicketId 线下开场
	-/userorder/saveOfflineOrderByTicketId 线下预定
	
	-/venue/receiveByVoucherId id领取代金券
	-/venue/receivebyphone 手机号领取代金券
	-/uservoucher/getvoucher 领取代金券
	-/rent/confirmorder 确认订单
	1-/userorder/user/associatorpay  用户使用会员卡支付订单
	-/businessorder/beginByTicketId ticket开场
	-/associator/activeCard/{cardNo} 会员卡激活
	-/userorder/reCharge/{cardNo} 线上充值
	-/userorder/buyCard 线上购卡
	
	
未激活的会员卡提示有误  --》 判断并提示未激活
重置支付密码，不点击“发送验证码”，直接随便输入一个验证码，提交修改会报系统异常；点击“发送验证码”后，提示验证码无效，就正常了。 -->未判断空

遗留：
java.lang.RuntimeException: org.springframework.dao.DeadlockLoserDataAccessException: 
### Error updating database.  Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLTransactionRollbackException: Deadlock found when trying to get lock; try restarting transaction
### The error may involve com.ve.order.dao.VeAreaOrderDao.updateByPrimaryKey-Inline
### The error occurred while setting parameters
### SQL: update ve_area_order     set ORDER_NO = ?,       ORDER_TYPE = ?,       BUYER_ACCOUNT = ?,       BUYER_TYPE = ?,       BUYER_NAME_TIP = ?,       TOTAL_PRICE = ?,       ORDER_STATUS = ?,       ORDER_REMARK = ?,       PAY_STATUS = ?,       PAY_TYPE = ?,       PAY_REMARK = ?,       PAY_TIME = ?,       VENUE_ID = ?,       VENUE_NAME = ?,       IS_ARRIVE = ?,       IS_DELETE = ?,       CREATER = ?,       CREATE_TIME = ?,       MODIFIER = ?,       MODIFY_TIME = ?,       FINISH_TIME = ?,       IS_COMMENT = ?     where ID = ?



20171113
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
支付密码错误给个固定code --》90000
C端会员卡支付，校验是自己的卡 --》可以使用别人的会员卡，只要输入的对方钱包密码也争取，没钱包密码的，不用输入钱包密码。
C端登录用户不存在，实际是存在的 --》被举报，标记为逻辑删除；删除举报记录时，删除用户帐号。

20171107
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！
代码评审记录使用新模版
造固定订场订单数据给APP开发人员使用

20171106
调整官网效果
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！

20171103


20171102
调整商户PC的帐号登录逻辑 完成
打包更新测试环境 完成
调整官网效果 
晚上整体更新外网测试环境
十一月份的开发计划

下班写日报！！！！！！！！！！！！！！！！！！！！！！！！


20171031
APP二阶段代码评审表
APP二阶段开发自测
运营端代码评审表
运营端开发自测表
商户PC端开发计划

下班写日报！！！！！！！！！！！！！！！！！！！！！！！！


20171026
代码评审表
自测表
运营端
活动标记取消时，参与人的钱要原路退款
后面记得在代金券为什么不能用加更准确的提示

下班写日报！！！！！！！！！！！！！！！！！！！！！！！！

20171026
代码评审表
活动标记取消时，参与人的钱要原路退款
后面记得在代金券为什么不能用加更准确的提示

下班写日报！！！！！！！！！！！！！！！！！！！！！！！！


20171025
代码评审表
活动标记取消时，参与人的钱要原路退款
后面记得在代金券为什么不能用加更准确的提示

下班写日报！！！！！！！！！！！！！！！！！！！！！！！！


20171023
官网适配
代码评审表
绩效考核面谈

下班写日报！！！！！！！！！！！！！！！！！！！！！！！！

20171023
官网适配
代码评审表
绩效考核面谈
学习银联支付 和 用户提现 商家结算
下班写日报！！！！！！！！！！！！！！！！！！！！！！！！

20171021
论文
官网适配
代码评审表
绩效考核面谈
学习银联支付 和 用户提现 商家结算
下班写日报!!!

20171020
代码评审表
绩效考核面谈
学习银联支付 和 用户提现 商家结算
官网适配
下班写日报!!!

20171019
圈子列表接口 偶尔异常
官网的代码评审记录 和 自测记录 （完成）

20171018
圈子列表接口 偶尔异常
官网的代码评审记录 和 自测记录

20171017
圈子列表有时候报异常的框架问题
学习银联支付 和 用户提现 商家结算
代码评审模版
自测记录模版

20171016
确定微信支付的是否完成
学习银联支付 和 用户提现 商家结算

20171013
运营后台功能调整任务分配
运营后台的登录界面
增加运营后台的日志记录功能对入参的记录

银联支付，银联体现的功能梳理、确认

20171012
商户web框架

所有人要写日报，抄送给直属负责人和项目经理

20171011
商户PC框架

所有人要写日报，抄送给直属负责人

20170925
系统架构：
官网框架
运营后台框架
商户后台框架

20170921
上午：梳理二阶段剩下的内容
下午：商户PC框架

20170918
14/15每个整点升级后台服务
活动/参与活动/底价订单详情要展示的内容确定 -》后台再加 活动相关详情的接口/底价订单拍卖相关的详情接口
黑名单规则确定 完成
https
web的脚本注入问题审核，权限管理的审核
zk dubbo的性能，服务注册数量
分表测试（不对外展示）


20170915
14/15每个整点升级后台服务 （完成）

跟张举确定各种订单、各支付状态、各付款状态的展示问题  （完成）

20170914
梳理个人要完成的接口，把控进度 完成
14/15每个整点升级后台服务 完成

跟张举确定各种订单、各支付状态、各付款状态的展示问题


下一步
jetty支持https
数据库分表/分库测试

20170913
场馆用户列表：增加加个余额排序
查询会员详情：增加生日、省、市、区、地址

跟张举确认 线下订单 固定预定是否确定在C端不显示-->前者不显示 后者显示

跟张举确认每种订单，每个阶段，显示的按钮，文字

跟徐超确认，场馆推送给我的代金券列表页面的展示效果，翻页的维度，场馆？券？->场馆



20170912
罗列接口，跟踪接口开发进度 完成
验证分表分库SQL写法与性能 

20170911
更新90JDBC 完成
个人工作内容罗列 完成
本地构建社交模块 完成
分配C/B端卡、卡别列表，以及B端创建卡别的接口给黄书化 完成
代码检视（使用findbugs） 完成
解决api session配置问题	完成

20170905
八月绩效表
二阶段文档整理
二阶段接口定义澄清



20170904
发起拍卖，封顶假是起拍价*5 如果起拍价》0，否则是订单价格*5 完成
黑名单
创建拍卖的时候，没有传递拍卖截至时间，后台要抛个错<后台已有空判断，估计前台传了个不合法的字符串>

B/C端连点下单，会产生多条单，但后台的票上只有一个单的关联<暂时记录>

B端待开始中取消了，后台查不到了，前端缓存了，点了已完成后切回来，就好了
B端待开始中可以开场的订单，开场后，回来 待开始/已完成中都有该订单显示，实际接口已经不会返回该订单，前端问题


20170902
修改场馆资质接口没有，创建资质接口是否可以使用？ 可用
10:59开11:00的时候报 不合法的场次？完成
我的问题单验证 完成
拍卖问题解决 完成
拍卖底价支付超时后没有重新生成订单 完成

-----------------------2017-09-02 01:45:16-------------------------------------
BusinessId: B-5ac1ffb782c84e03b0e26bcf11c2589b BusinessIdNickName:null
UserId:  UserNickName:
RemoteAddr: 183.15.176.20
X-Forwarded-For: null
X-Real-IP : null
Controller: com.ve.api.controller.venue.VenueController
Method    : index
URI       : /api/venue
Params    : 
body      : {logo=http://183.239.164.66:8501/file/link?date=20170902&name=6b7579fa-8b1f-4d9a-b7d6-94d1bedc7c9c.jpg, lon=113.947503, 
businessCirclesId=440305009000, status=0, businessCircles=南山区-西丽街道办事处, tel=15602454304, 
officeTimeBegin=23:00, city=深圳市, officeTimeEnd=08:00, sportId=3, address=广东省深圳市南山区北环大道5号51栋靠近龙图教育(北环大道辅路), description=我的简介, name=孙尉凯的场馆, lat=22.552594, mapType=0}

 2017-09-02 13:45:17.176 [e21b86dc4b1548e4a4569336b5cf27e0] [qtp1566227085-30] INFO  c.v.a.i.TimeCostInterceptor -CostTime  : 247ms
-------------------------------------------------------------------------------
安卓B端创建场馆时营业时间传给后台是反的<后台可以简单校验时间>
安卓B端创建方案时间选择5:00-23:00，提示“结束时间不能小于开始时间”
安卓B端线下预定后，没支付，过了开场时间后，C端列表查不到订单，B端场地状态那里那个场次还显示着“开场“和”取消预定”。然后在B端下一个场次再预定一下，上一个场次就显示正常了。

20170830
支付了未开场的、开场后10分钟后，标记为取消，钱也被固定了。多场次的，怎么算这个点（不要“冻结金额”，成功之后才把参与人支付的钱放到发起人的钱包，取消的参与人钱原路退款；多个场次的只管最后一个场次的）
拍卖的最终支付能否支付最终竞价的总价，不只是除去底价单后的差价，底价订单还是给他原路退回，底价底单的退回就不分买受人和没抢到拍卖的人了，容易区分（确认不算差价，两个单单独算，底价单原路退回）


20170829
我参与的拍卖和发起拍卖列表不用所在城市作为参数（朱选文）
场馆下架，调用删除商户token的函数<加个缓存中转>(崔京、宋德平 20170829)
增加我的钱包表，用来记录用户的余额（宋德平）
线上预定现在ve_user往ve_associator的时候，现在好像没有把名字复制过去，把前者的nick_name移动到后者的name中（刘奇）
订单详情buyerAccount中为空，实际上associator中没有名字，但是有phone（刘奇）


20170828
黑名单规则？
底价订单能不能单独压着，拍卖订单收出价的钱？
定价订单超过10分钟后，怎么处理？竞价的时候创建新的底价订单？
底价订单在列表上，显示文字、按钮是什么样的？
正在拍卖的订单，订单在列表上要显示哪里按钮？照常
已支付未到场线上、固定、线下单，后台标记为取消<如果有多个场次呢>，目前前台不让这种单进行拍卖，C端显示在已完成中，B端呢？。列表上这种单怎么展示？只是不显示“拍卖”按钮？



20170828
退款功能（刘奇）
拍卖详情中aff标识获取的是0，实际应该是1，与列表不一致（朱选文）
场馆下架，调用删除商户token的函数<加个缓存中转>(崔京、宋德平)
退卡之后，memberType字段的维护（刘奇 20180826）

根据环境不同而需要修改的配置整理，方便部署

#APP文件存放路径
ve.app.path=C:\\Users\\sunweikai\\Desktop

ve_area_order
ORDER_NO
ORDER_STATUS:1
PAY_STATUS:1
PAY_TYPE:1
PAY_TIME

select * from ve_area_order where order_no = '170829112300022';
update ve_area_order set ORDER_STATUS='1', PAY_STATUS='1', PAY_TYPE='1', PAY_TIME=DATE_FORMAT(now(), '%Y-%m-%d %H:%i:%s') where order_no='170829112300022'; 
select * from ve_area_order where order_no = '170829112300022';

20170826
崔京提供通过商户账号ID删除商户token的函数（崔京）

20170825
C端线上预定，且付款了。B端还能取消订单，又可以下订单？<张举:付了钱的订单不能取消>（20170825 12:00）
C端取消订单后，订单还能查出来显示到列表中（刘奇，过滤掉逻辑删除的 20170825 15:30）


20170824
刷新订单买家账号ID的旧数据（刘奇）
创建线下预定/线下开场时，输入的手机号用来检测如果已经是场馆用户，就把他的名字更新（刘奇）
（先不做）在用户缓存中加公共方法，根据场馆ID获取他在其下的用户ID，没有就从数据库获取，捕获异常记录日志不抛出，获取不到就返回空字符串。（刘奇）
（先不做）将现在项目中，buyerAccount作为SQL条件的地方，由登陆人的ID改成场馆用户ID，传递到dao层（刘奇）

20170823
修复会员还原的BUG

线下开场，13:59确认14:00的场次订单时提示没有场次（刘奇 20170823 14:22）
已经支付了的订单能否再取消？
拍卖的封顶价格后台要自己计算 = 起拍价*5 （朱选文 20170823 10:00）

20170822
C端订单列表，过期的自动取消订单，也不要再展示（刘奇 20170822）
所有的订单接口基本都只操作逻辑未删除的订单

20170821
下载APK，下载最新的apk文件（黄书化）
APP中检测是否有新版本APK，状态返回是否有新的（黄书化）

运营端权限模块完成（宋德平）
导出取出权限配置数据，部署新环境时可以用（宋德平）
收藏列表，接口中加入场馆使用的模板（宋德平 20170821 10:30）
雷达搜索，接口中加入场馆使用的模板（宋德平 20170821 10:30）

拍卖详情，接口中加入场馆使用的模板（朱选文）

运营端参数防修改的加密（崔京）
协助安卓集成极光推送（崔京）
朋友圈发送语音（崔京）

api日志打印中，把application/json类型的，body打印出来（林兵 20170821 11:30）

浏览器后退按钮控制<退出后，不可以按后退按钮又回到主页面>

绩效表用新的模板提交一份
确定订单中的倒计时规则
取消订单后台的触发方式
改问题单中的BUG


20170818（原则：我们的对象属性要比产品定义的更细）
支付宝支付<二维码、APP支付>完全调通（刘奇 20170818）

人资料展示、积分成长体系初步表结构构思与分析（黄书化）

约一约、圈内活动初步表结构构思与分析（朱选文）

兑换券初步表结构构思与分析（宋德平 20170818 有文档，内容优）

13200000000 账号C端订单列表中场馆名称和ID为空（林兵 20170818）

apk请求头上加入是商户端还是用户端（孙尉凯 20170818）

收藏列表
雷达搜索
拍卖详情
上述接口中加入场馆使用的模板



20170817
下载APK，下载最新的apk文件（黄书化）
APP中检测是否有新版本APK，状态返回是否有新的（黄书化）

添加接口，终审通过且查看过状态界面，status改为7（宋德平 20170817 16:00）

13200000000 账号C端订单列表中场馆名称和ID为空（林兵）

select* from ve_business_account where mobile_phone='13200000000';
select * from ve_venue where BUSSINESS_ACCOUNT_ID='B#d704b09d883a437387418ba0c9740426';
select * from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z';
select * from ve_associator_card where card_no in (select card_no from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');

select * from ve_area_order where buyer_account in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');
select * from ve_area_order_detial where order_no in (select order_no from ve_area_order where buyer_account in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z'));
select * from ve_area_order_user where USER_ACCOUNT in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');

select * from ve_associator_changeless_stategy where ASSOCIATOR_ID in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');
select * from ve_associator_changeless_detial where VACS_ID in (select id from ve_associator_changeless_stategy where ASSOCIATOR_ID in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z'));


delete from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z';
delete from ve_associator_card where card_no in (select card_no from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');

delete from ve_area_order where buyer_account in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');
delete from ve_area_order_detial where order_no in (select order_no from ve_area_order where buyer_account in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z'));
delete from ve_area_order_user where USER_ACCOUNT in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');

delete from ve_associator_changeless_stategy where ASSOCIATOR_ID in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z');
delete from ve_associator_changeless_detial where VACS_ID in (select id from ve_associator_changeless_stategy where ASSOCIATOR_ID in (select id from ve_associator where venue_id='JfQ0YK0rzpBuPp4q21z'));





场馆更新、添加场馆、添加方案三个接口 都要判断下，如果场馆的状态是初审通过，都需要把状态改为提交终审 （宋德平、刘奇 20170807 16:00）
协议加上浏览器次数（朱选文 20170807 18:50）
拍卖详情查出拍卖协议的浏览次数（黄书化 20170807 18:00）
MantisBT：0000959 ，查询场馆使用模板失败，因为没有使用记录，抛的异常处理(林兵 20170807 15:27:11)

用下面的语句刷新没提交终审的场馆（孙尉凯旧数据问题 20170807 17:00）
select * from ve_venue where status = '1';
select distinct(venue_id) from ve_venue_area where venue_id in (select ID from ve_venue where status = '1');
select distinct(venue_id) from ve_area_rent_plan where venue_id in (select ID from ve_venue where status = '1');
select * from ve_venue where status = '1' and (id in (select distinct(venue_id) from ve_venue_area where venue_id in (select ID from ve_venue where status = '1')) or id in(select distinct(venue_id) from ve_area_rent_plan where venue_id in (select ID from ve_venue where status = '1')));
select * from ve_venue where status = '1' and (id not in (select distinct(venue_id) from ve_venue_area where venue_id in (select ID from ve_venue where status = '1')) and id not in(select distinct(venue_id) from ve_area_rent_plan where venue_id in (select ID from ve_venue where status = '1')));

C端列表加入场馆ID（林兵 20170807 17:21:47）
查询订单详情空指针异常（刘奇）


20170808
1、创建的卡别user_column不对（朱选文 20170808 18:24:32）
2、会员卡别列表中，要统计每张卡别上的会员人数（朱选文 20170808 18:24:32）（原型没有这个统计）
3、C端订单列表，要求再加一个订单名称（林兵 20170808 16:00）
4、确定订单去掉一些不必要的入参，留下能确定唯一性的参数（刘奇 20170808 16:00）

5、下面请求实际有票据，接口查询出来没有（刘奇 20170808 16:00）（场地对应的运动类型被删了，场馆详情界面上面的类型页签就没有了，对应的秒杀票数量也就没有了）
GET - url : areaticket/ticketnum - params : {venueId = sunweikaiinsert1;}

6、固定预定筛选没有可固定的信息(刘奇 方案要是7天的，才能有固定场选项)
7、修改方案后，没有自动生成未来7天的票，需要定位第一天的日期是怎么取的（刘奇 20170808 18:30）

注：
90升级必须保证稳定版本
接口必须自测，无论多紧急



解决统计接口翻页返回条数对不上的问题
分享场馆获取场馆信息H5的接口

2017/7/28
加接口查询充值订单支付成功后，订单对应的会员、卡号、支付金额信息

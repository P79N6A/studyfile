//1.新增固定，往ve_associator_changeless_stategy表加入数据， 会员id是ve_associator
//	① 会员id怎么获取？，
//	调用接口  8、输入手机号或者卡号，返回是否需要密码
//	这里校验会员是否存在，并返回会员id和是否需要密码
//	② 密码校验
//
//2.固定会员列表，查询ve_associator_changeless_stategy
//
//3.线下开场和线上订票都要生成会员
//
//4.固定会员详情是用ve_associator_changeless_stategy主键做得
//
//5.删除同4

//1.线下开场
//生成订单，需要反写ticket中的orderNo
//生成订单有  线下预定，线下开场，固定生成订单

根据'周期类型'，'具体日期'日期代码'查询场次列表'
入参：'场馆ID'、'周期类型'、'具体日期代码'、'固定预定ID'（查询'未固定''和自己固定过的场次'）
1、'查询场次要去重'（同一个场地、同一个时间段）
2、如果'不传具体日期代码'，'查询所有场次'
3、根据前台传回的'周期类型'、具体'日期代码'、'场地ID'、'开始时间'、'结束时间'查询场次 计算评价加格
4、前台传进来的参数直接存到固定预定表，方便以后自动生成订单失败责任认定
5、查询对应'会员固定预定信息'，查询'未固定的场次'，或'已固定且固定ID'
在当前会员的changelessdetialId中的，是否反选

固定预定创建
固定预定查询列表（带上会员卡相关信息）
固定预定查询详情（带上会员卡号和手机号）
固定预定修改（输入会员卡号或手机号，密码确认修改固定）
固定预定删除

会员场次固定过的，供反选用
1、固定预定ID
{
	type：0每周/1每月
	times：[1，2]
	areainfo：[{areaId,name,star,end},{}]
}



需求
列表：
'固定预订列表'，左滑动'可删除'，点击'可修改'。修改'只'可以'修改''同价格'的'场次'。
{
	venueId:"",
}
{
	输出必须有 vacsId，详情用
}

详情：
'选定的固定场次'，更新状态下'可修改'。频次显示为'每周三、每周六'。  '每月3号、每月15号'。
'每次的金额'，此金额'为固定金额'，固定成功后价格不变，以后的分'订单价格变化不影响此价格'
'输入会员手机或卡号'，会员卡'需要密码的''输入密码'，确认固定。
{
	vacsId:"",
}
{
	输出必须有vacsId 供反选可固定场次用；
	必须有：会员卡号/手机号
	必须有：是否需要密码   -- 更新按钮使用
}

场地列表：
'每周或每月'固定，'二选一'
'周几或几号可以多选'，每'选择一个'或'取消一个'，'列表刷新'。子选项为组合搜索。
注意'修改固定预定'的时候这里的'已选频次要被选上'。
列表可以下拉刷新，'上拉翻页'，按场次'排序后再按营业时间排序'。

这里查询出来可以固定的场次'最多可以被预定四个场次'，多于四个弹框提醒：'您每次只可以固定四个场次。'
注意修改固定预定的时候，'已经被固定的场次需要显示并勾选住'，每次修改固定都会'覆盖掉原来的固定'，去掉勾选则释放资源。
场地号，'可以预订场次'，'多选想预定的场次'，'最多四个场次'。
{
	venueId:"",
	periodType:"",
	periodTime:[],
	vacsId:"",
}



新增固定：
选定的'固定场次'，更新状态下可修改。
'频次'显示为'每周三、每周六'。  '每月3号、每月15号'

****一个单独的接口，输入会员，返回是否需要密码
{
	venueId:"",
	phone:""
}
{
	associatorId:""//固定会员id必须返回，新增固定需要这个入参
	needPassWord:""//是否需要密码，这个必须要
}

新增固定入参:
1，先增加ve_associator_changeless_stategy表，
2，再增加ve_associator_changeless_detial表,
3，再更新ve_area_time场馆票
{
	venueId:"",
	periodType:"",
	periodTime:[],
	areas:[
		{areaId，areaName，startTime，endTime}
	],
	associatorId:"",
	phone:"",
	needPassWord:"",//是否需要密码，这个必须要
	passWord:"",//密码
	price:""
}

更新固定：
选定的固定'场次'，'更新'状态下'可修改'。
'频次'显示为'每周三、每周六'。  每月3号、每月15号

每次的'金额'，此金额为'固定金额'，固定成功后价格不变，以后的分订单价格变化不影响此价格

输入会员'手机或卡号'，会员卡需要密码的输入密码，'确认固定'。

更新固定入参:
1，先更新ve_associator_changeless_stategy表，
2，①根据vacsId删除所有详情；再增加ve_associator_changeless_detial表,
3，再更新ve_area_time场馆票
{
	vacsId:"",
	venueId:"",
	periodType:"",
	periodTime:[],
	areas:[{areaId，areaName，startTime，endTime}],
	associatorId:"",
	phone:"",
	needPassWord:"",//是否需要密码，这个必须要
	passWord:""//密码
}

删除固定：
{
	vacsId:"",
}
1，先删除ve_associator_changeless_stategy表，
2，①根据vacsId删除所有详情
3，再更新ve_area_time场馆票

*****定时生成票中，固定票逻辑需要修改

RequestCommonParamsValidate

//新增和修改场地价格方案
//0删除掉ve_area_time中该场地的数据
//1新增周固定，反写固定情况
//2新增月固定，反写固定情况

//删除场地价格方案的时候，得删除场次  ve_area_time表  目前不用处理
RequestCommonParamsValidate

TIbNXW0iNNezFvMokda
{
    "leftNum": 3,
    "ticketList": [
      {
        "orderType": "",
        "orderNo": "",
        "orderId": "",
        "phone": "",
        "price": 20,
        "ticketStatus": 2,
        "sharding_gen_1": "11:00:00",
        "startTime": "11:00:00",
        "endTime": "12:00:00",
        "userName": "",
        "ticketId": "766f97559aab433ba08f8e176607d11b"
      },
      {
        "orderType": "",
        "orderNo": "",
        "orderId": "",
        "phone": "",
        "price": 20,
        "ticketStatus": 2,
        "sharding_gen_1": "12:00:00",
        "startTime": "12:00:00",
        "endTime": "13:00:00",
        "userName": "",
        "ticketId": "13d7c062e7d3439597e9b63531bbc429"
      },
      {
        "orderType": "0",
        "orderNo": "170728110400046",
        "orderId": "4b4107511c1b417cbde32a045252ebee",
        "phone": "18677931271",
        "price": 20,
        "ticketStatus": 1,
        "sharding_gen_1": "13:00:00",
        "startTime": "13:00:00",
        "endTime": "14:00:00",
        "userName": "123456",
        "ticketId": "5c9528a195ba498d935925255eabc75e"
      },
      {
        "orderType": "0",
        "orderNo": "170728110600048",
        "orderId": "6757400aa2d24499b34e9c14d57e87ab",
        "phone": "18677931271",
        "price": 60,
        "ticketStatus": 1,
        "sharding_gen_1": "14:00:00",
        "startTime": "14:00:00",
        "endTime": "15:00:00",
        "userName": "123456",
        "ticketId": "7ed68806b02f44afa05df594b8016ff2"
      },
      {
        "orderType": "0",
        "orderNo": "170728110900049",
        "orderId": "594f198f36a74c4386dac92f1953016f",
        "phone": "18677931271",
        "price": 60,
        "ticketStatus": 1,
        "sharding_gen_1": "15:00:00",
        "startTime": "15:00:00",
        "endTime": "16:00:00",
        "userName": "123456",
        "ticketId": "1055469e7e9f43d3a567f3bc17eef6be"
      },
      {
        "orderType": "0",
        "orderNo": "170728110900050",
        "orderId": "321e39c8d27a4e6380149ab300f04359",
        "phone": "18677931271",
        "price": 60,
        "ticketStatus": 1,
        "sharding_gen_1": "16:00:00",
        "startTime": "16:00:00",
        "endTime": "17:00:00",
        "userName": "123456",
        "ticketId": "b46bc800fab34000bb7a7e3ea6a055af"
      },
      {
        "orderType": "",
        "orderNo": "",
        "orderId": "",
        "phone": "",
        "price": 60,
        "ticketStatus": 0,
        "sharding_gen_1": "17:00:00",
        "startTime": "17:00:00",
        "endTime": "18:00:00",
        "userName": "",
        "ticketId": "87b0933bf50d40faaa17c5ca6d2a28f1"
      },
      {
        "orderType": "",
        "orderNo": "",
        "orderId": "",
        "phone": "",
        "price": 60,
        "ticketStatus": 0,
        "sharding_gen_1": "18:00:00",
        "startTime": "18:00:00",
        "endTime": "19:00:00",
        "userName": "",
        "ticketId": "e84cc37932854ea280e5fa2fa4ca41b1"
      },
      {
        "orderType": "",
        "orderNo": "",
        "orderId": "",
        "phone": "",
        "price": 60,
        "ticketStatus": 0,
        "sharding_gen_1": "19:00:00",
        "startTime": "19:00:00",
        "endTime": "20:00:00",
        "userName": "",
        "ticketId": "4105cdee559544c68fd9d1d5b91adcfe"
      }
    ],
    "areaId": "TIbNXW0iNNezFvMokda",
    "areaName": "liuq1号羽毛球场地",
    "sharding_gen_1": "liuq1号羽毛球场地",
    "officeTimeEnd": "23:57:00",
    "curStatus": 2,
    "officeTimeBegin": "21:17:00"
  },



















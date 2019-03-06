赛事接口（建议，不要在控制层的类名上加上RequestMapping）

赛事---------------------------------------------------------------------------
轮播资讯
GET /infomation_home
返回
{status:1,tip:"","code":0,
data:[
{id:"",coverImg:"",title:""}]
}

近期赛事
GET /biggame_home
返回
{status:1,tip:"","code":0,
data:[
{id:"",logo:"",title:"",createTime:0,joinStartTime:0,joinEndTime:0,startTime:0,endTime:0,
standard:0,standardTip:"0人制",type:1,typeTip:"杯赛",province:"",city:"深圳市",district:"",address:"",showLocation:"",lon:0.00,lat:0.00,
status:0,statusTip:"开始报名"}]
}

赛事-全部赛事---------------------------------------------------------------------------
赛事列表
POST /biggame_list
入参
query pageNo
query pageSize
body {keyword:"",status:0}
返回
{status:1,tip:"","code":0,
data:[
{id:"",logo:"",title:"",createTime:0,joinStartTime:0,joinEndTime:0,startTime:0,endTime:0,
standard:0,standardTip:"0人制",type:1,typeTip:"杯赛",province:"",city:"深圳市",district:"",address:"",showLocation:"",lon:0.00,lat:0.00,
status:0,statusTip:"开始报名"}]
}

赛事-全部赛事-赛事信息---------------------------------------------------------------------------
赛事详情
GET /biggame/{id}
入参
head X-Request-Token(非必填)
path id
返回
{status:1,tip:"","code":0,
data:[
{id:"",logo:"",title:"",createTime:0,joinStartTime:0,joinEndTime:0,startTime:0,endTime:0,
standard:0,standardTip:"0人制",type:1,typeTip:"杯赛",province:"",city:"深圳市",district:"",address:"",showLocation:"",lon:0.00,lat:0.00,
status:0,statusTip:"开始报名",
noticeContent:"须知",ruleContent:"规程",teams:[{teamId:"",teamName:"",teamLogo:""}],
isAttention:0,canJoin:0
}]
}
注意：是否任命教练的弹出框，通过接口返回的异常code值去做，满足未来可能还有其他控制条件

关注和取消关注赛事
POST /biggame/{id}/attention
入参
head X-Request-Token
path id
返回
{status:1,tip:"","code":0,data:""}

获取站点列表
GET /biggame/{id}/site_list
入参
head X-Request-Token
path id
query pageNo
query pageSize
返回
{status:1,tip:"","code":0,
data:[
{id:"",name:"",leftTeamNum:0,maxTeamNum:0,hasTeamNum:0}]
}



报名赛事生成订单
PUT /biggame/{id}/join
入参
head X-Request-Token
path id
body {siteId:"",playerIds:[""]}
返回
{status:1,tip:"","code":0,data:"orderNo",facePrice:0.00}

*************逻辑*************订单支付、让球队报名成功的处理

赛事-全部资讯---------------------------------------------------------------------------
资讯列表
POST /information_list
入参
query pageNo
query pageSize
body {keyword:""}
返回
{status:1,tip:"","code":0,
data:[
{id:"",coverImg:"",title:"",createTime:0,
browseCount:0,usefulCount:0,judgeCount:0}]
}

资讯详情
POST /imformation/{id}
入参
head X-Request-Token（非必填）
path id
body {uniqueId:"点赞和判断点赞时用到的唯一值（token存在时就不需要它），非必填"}
返回
{status:1,tip:"","code":0,
data:{id:"",coverImg:"",title:"",createTime:0,
browseCount:0,usefulCount:0,judgeCount:0,content:"",isLike:0}
}

赞和取消赞
POST /imformation/{id}/like
入参
head X-Request-Token（非必填）
path id
body {uniqueId:"点赞和判断点赞时用到的唯一值（token存在时就不需要它），非必填"}
返回
{status:1,tip:"","code":0,data:""}

评论资讯
PUT /imformation/{id}/judge
入参
head X-Request-Token
path id
body {content:""}
返回
{status:1,tip:"","code":0,data:""}

查询资讯的评价列表
GET /imformation/{id}/judge_list
入参
path id
query pageNo
query pageSize
返回
{status:1,tip:"","code":0,
data:[{userAccount:"",userNickname:"",photoUrl:"",content:""}]
}

赛事-个人中心-我的赛事---------------------------------------------------------------------------
我的赛事
POST /my/biggame_list
入参
head X-Request-Token
query pageNo
query pageSize
body {type:1我关注的或者我收藏的}
返回
{status:1,tip:"","code":0,
data:[
{id:"",logo:"",title:"",createTime:0,joinStartTime:0,joinEndTime:0,startTime:0,endTime:0,
standard:0,standardTip:"0人制",type:1,typeTip:"杯赛",province:"",city:"深圳市",district:"",address:"",showLocation:"",lon:0.00,lat:0.00,
status:0,statusTip:"开始报名"}]
}

赛事-个人中心-我的球队---------------------------------------------------------------------------
创建/修改球队
POST /fbteam
入参
head X-Request-Token
form {id:"要判断是不是自己的球队",logo:file,name:"",province:"",city:"深圳市",district:"",address:"":"",lon:0.00,lat:0.00,level:1,standard:[5],
myClothNo:0,myClothSize:"",myPosition:"",myLevel:1}
返回
{status:1,tip:"","code":0,data:""}

球队详情
GET /fbteam/{id}
入参
head X-Request-Token（非必填）
path id
返回
{status:1,tip:"","code":0,
data:{myTeam:0,logo:"",name:"",canJoin:0,requestJoinNum:0,memberNum:0,
level:1,levelTip:"低",standard:[5],standardTip:[""],
myClothNo:0,myClothSize:"",myPosition:"",myLevel:1,myLevelTip:"",
type:1,typeTip:"",captain:{playerId:"",name:"",photo:""},coach:{playerId:"",name:"",photo:""},newPlayer:{playerId:"",name:"",photo:""},
province:"",city:"深圳市",district:"",address:"",showLocation:"",lon:0.00,lat:0.00,createTime:0}
}

申请加入球队
PUT /fbteam/{id}/join
入参
head X-Request-Token
path id
body {content:""}
返回
{status:1,tip:"","code":0,data:""}

查询球队的入队申请列表
GET /fbteam/{id}/join_list
入参
head X-Request-Token
返回
{status:1,tip:"","code":0,
data:{myTeam:0,list:[{id:"joinId",playerId:"",playerName:"",playerPhoto:"",content:"",createTime:0,status:3,statusTip:"已同意"}]}
}

同意/拒绝加入球队
POST /fbteam_join/{id}
入参，判断自己是否有权限
head X-Request-Token
path id
body {type:3}
返回
{status:1,tip:"","code":0,data:""}

删除加入球队申请
DELETE /fbteam_join/{id}
入参，判断自己是否有权限
head X-Request-Token
path id
返回
{status:1,tip:"","code":0,data:""}


球队人员信息列表
POST /fbteam_member_list
入参
head X-Request-Token（非必填）
query pageNo
query pageSize
body {myTeam:0,teamId:"如果是我的球队，就不需要球队ID"}
返回
{status:1,tip:"","code":0,
data:{myTeam:0,player:[{playerId:"",playerName:"",
role:2,roleTip:"教练",phone:"",
photo:"",position:"",firstPosition:"",
clothNo:0,clothSize:"XXL"}]}
}

修改球队人员的角色
POST /fbteam_member/{playerId}
入参
head X-Request-Token
body {role:1}
返回
{status:1,tip:"","code":0,data:""}

球队列表
POST /fbteam_list
入参
head X-Request-Token（非必填）
query pageNo
query pageSize
body {myTeam:0,name:"",province:"",city:"深圳市",district:"",address:"":"",lon:0.00,lat:0.00}
返回
{status:1,tip:"","code":0,
data:[{myTeam:0,id:"", name:"", logo:"",memberNum:0,province:"",city:"",district:"",address:"",showLocation:"",lot:0.00,lat:0.00,mapType:1}]
}

赛事-个人中心-选择认证类型-成人实名认证---------------------------------------------------------------------------
创建/修改个人实名信息
POST /player_real
入参
head X-Request-Token
form {id:"要和登录人的playerId比对",type:1,name1:"",name2:"",idCard1:"",idCard2:"",photo1:file, photo2:file, cardImg11:file, cardImg12:file, cardImg21:file, cardImg22:file}
返回
{status:1,tip:"","code":0,data:""}

查询实名信息
GET /player_real/{playerId}
入参
head X-Request-Token（非必填）
path playerId player.ID
返回
{status:1,tip:"","code":0,
data:{id:"playerId",type:1,typeTip:"",name:"",idCard:"",photo:"",cardImg1:"",cardImg2:"",remark:"",
guardian:{name:"",idCard:"",photo:"",cardImg1:"",cardImg2:""}}
}

创建/修改我的球员资料
POST /player
入参
head X-Request-Token
body {id:"要和登录人的playerId比对",position:"",level:0,
province:"",city:"",district:"",address:"",lot:0.00,lat:0.00,mapType:1,
clothNo:0,clothSize:""}
返回
{status:1,tip:"","code":0,data:"playerId"}

查询球员资料
GET /player/{playerId}
入参
head X-Request-Token（非必填）
path playerId player.ID
返回
{status:1,tip:"","code":0,data:{id:"playerId",position:"",level:0,
province:"",city:"",district:"",address:"",lot:0.00,lat:0.00,mapType:1,
clothNo:0,clothSize:"",
team:{id:"", name:"", logo:"",memberNum:0,province:"",city:"",district:"",address:"",showLocation:"",lot:0.00,lat:0.00,mapType:1}
}}

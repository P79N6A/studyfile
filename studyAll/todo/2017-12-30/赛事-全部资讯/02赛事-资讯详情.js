
大家'更新'下这个'excel'，把'完成了'的“接口'名称'”'改成绿色'文字，
'正在做'的改成'蓝色'文字

资讯详情
POST /information/{id}
入参
head X-Request-Token（非必填）
path id
body {uniqueId:"点赞和判断点赞时用到的唯一值（token存在时就不需要它），非必填"}   // uniqueId 用于游客点赞
返回
{
    "status":1,
    "tip":"",
    "code":0,
    "data":{
        "id":"",
        "coverImg":"",
        "title":"",
        "createTime":0,
        "browseCount":0,
        "usefulCount":0,
        "judgeCount":0,
        "content":"",
        "isLike":0  //是否已点赞
    }
}
赞和取消赞
POST /information/{id}/like
入参
head X-Request-Token（非必填）
path id
body {uniqueId:"点赞和判断点赞时用到的唯一值（token存在时就不需要它），非必填"}
返回
{
    "status":1,
    "tip":"",
    "code":0,
    "data":""
}

评论资讯
PUT /information/{id}/judge
入参
head X-Request-Token
'path' id
'body' {content:""}
返回
{
    "status":1,
    "tip":"",
    "code":0,
    "data":""
}

查询资讯的评价列表
GET /information/{id}/judge_list
入参
'path' id
'query' pageNo
'query' pageSize
返回
{
    "status":1,
    "tip":"",
    "code":0,
    "data":[
        {
            "userAccount":"",
            "userNickname":"",
            "photoUrl":"",
            "content":""
        }
    ]
}

轮播资讯
GET /infomation_home
返回
{
    "status":1,
    "tip":"",
    "code":0,
    "data":[
        {
            "id":"",
            "coverImg":"",
            "title":""
        }
    ]
}


"资讯详情再加个接口"
GET /information/{id}/h5
"入参"
id path
"返回"
不要json，直接返回information的CONTENT值

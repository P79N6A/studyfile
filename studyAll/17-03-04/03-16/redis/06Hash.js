hset user id 11 //设置 键user  值 id：11
hget user id //根据两个键取值

//与string不同 key一样 value是键值
 hmset customer id 01 name n01 age 18//批量设置hash
 hgetall customer //取出customer的所有键值
 
 hdel user name //根据两键删除
 hlen user //取user键下的总键数
 
 hexists customer id//判断是否存在id
 hkeys customer//取键下面所有键
 hvals customer//取键下面所有values
 
 hincrby customer age 2 //让对应值增加2
 hincrbyfloat customer 0.1 //让对应值增加0.1（小数）
 
 hsetnx 存在不添加，不存在添加
 
 hdecrby customer 
 
 hset user id 11
 hget ps:admin:station:error:3dcd875a03ee6c24
 

hget ec:sID:574C54E8B882 

[
  {
    "voltage": 10,
    "damage": 1,
    "current": 11,
    "portNumber": 0,
    "fault": 39,
    "temperature": 12,
    "cycle": 10,
    "location": "22.581960,113.837548",
    "soc": 90,
    "id": "000000000001"
  },
  {
    "voltage": 13,
    "damage": 1,
    "current": 14,
    "portNumber": 1,
    "fault": 39,
    "temperature": 15,
    "cycle": 255,
    "location": "22.581960,113.837548",
    "soc": 80,
    "id": "000000000002"
  }
]
hset  11
hmset ps:hardware:config: fwAnalysisVer "1" fwAnalysisUrl "www.baidu.com" 
hdel customer id

hset ps:request:limitUrl:/power/locationTakeBack/ maxTimes 20

sadd set01 1 1 2 3 //新建set01 值会自动去重复
smembers set01 //获取set01的值
sismember set01 5//判断是否有5这个值

srem set01 3 //删除3
srandmember set01 //从中取三个随机数

spop set01 //随机出栈，就是随机删除
smove set01 set02 5 //把set01的5移动到set02中

del set01 //删除set01
sdiff set01 set02  //取set01-set02的值  差集
sinter set01 set02 //取交集
sunion set01 set02 //取并集

smembers ps:refund:group: 
sadd ps:refund:group: 1


smembers eb:set:unlock:bats

1)  "100BCC2B9648"
2)  "1B3A17AL00310"
3)  "1B3A17AL00592"
4)  "100B5AA77CEA"
5)  "100B5AA7124D"
6)  "1B3A17AY00885"
7)  "100BCCAF7B2A"
8)  "1B3A17AL00591"
9)  "100B43E002B1"
10)  "100B5AA65CCB"
11)  "1B3A17AL00412"
12)  "1B3A17AL00174"
13)  "100B5AA7A907"
14)  "100C43EF5B9A"
15)  "100BCBF5C8A9"
16)  "100B4438AFD6"
17)  "100BC4D6B005"
18)  "1B3A17AL00028"
19)  "100BCC062CD3"
20)  "100A929472BC"
21)  "100B43CBADB3"
22)  "100BCADF7E94"
23)  "1B3A17AL00056"
24)  "100A13956A75"
25)  "1B3A17AL00475"
26)  "100B43C10AE6"
27)  "100B44398D9F"
28)  "100B43B68381"


1) "100BCCAF7B2A"
2) "100BCC062CD3"
3) "1B3A17AL00591"
4) "100B43B68381"
5) "100C43EF5B9A"
6) "100B4438AFD6"
7) "100B43CBADB3"
8) "100BCBF5C8A9"
9) "1B3A17AL00174"
10) "100BC4D6B005"
11) "1B3A17AL00475"
12) "100B5AA7124D"
13) "100A13956A75"
14) "100B44398D9F"
15) "100BCC2B9648"
16) "100B43C10AE6"
17) "100B5AA7A907"
18) "100B43E002B1"
19) "100B5AA65CCB"
20) "1B3A17AL00592"
21) "100B5AA77CEA"

	

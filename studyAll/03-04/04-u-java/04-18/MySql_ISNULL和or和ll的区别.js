ISNULL()和ifnull()

where ISNULL(USERNAME)等价于 where USERNAME is null	isnull(clumon)等价clumon is null

'mysql中OR与||几乎没有区别'
当两个数非null有一个不为0 则返回1		1 or 0 返回 1		
0和null 返回null			0 or null 返回 null
1和null 返回1				1 or null 返回 1

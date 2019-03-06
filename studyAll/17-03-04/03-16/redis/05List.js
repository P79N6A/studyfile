Lpush list1 1 2 4 5 7 //从左到右插入  正进反出

Rpush list2 4 6 2 5 1 //从右往左插入   正进正出

lpop list1 //移除list1中的一个 L反出   

rpop list1 //移除list1中的一个 R正出

lindex list1 1//从左边按下标取值
rindex list1 3//从右边按下标取值

llen list1 //查看长度

lrem list1 2 3//从list1删除两个3

ltrim list1 1 3 //截取指定值，赋给list1

rpoplpush list1 list2  //把list1的尾巴加到list2的头上


lpush				rpush
1 2 3 4 5           5 4 3 2 1
_________\          /_________

lset list 0 v1 //把v1赋给list的第一个值

insert list befor/after v1 v2 //在v1左边/右边插入值v2   是插入不是替换

list是字符串列表，left，right都可以添加
头尾插入效率高，中间操作效率低

Lpush mylist 1 2 4 5 7

Lpush ps:offlineOrder:mobilelist: 1 2 4 5 7

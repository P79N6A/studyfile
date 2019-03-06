
1009
1.jvm回收机制jvm内存模型；
http://blog.csdn.net/zhangpengju999/article/details/11773183
JVM堆怎么分区 JMM(volatile  happen-before)gc及内存划分
http://blog.csdn.net/zhangren07/article/details/6270842

2.数据库分布式缓存，
http://blog.csdn.net/happyqwz/article/details/8308196
nosql 和Redis

3.分布式session，
http://blog.csdn.net/u014352080/article/details/51764311
分布式 5.session共享原理，分布式session集中式和分布式的优缺点？

4.数据库date类型与时间戳类型的区别，
http://blog.csdn.net/coder_taoge/article/details/53838965
5.spring循环注入什么时候有问题什么时候没问题，
http://blog.csdn.net/u013244809/article/details/50921723
spring框架的核心实现，
http://blog.csdn.net/sunchen2012/article/details/53939253
及orm框架的整合；spring事务配置
http://blog.csdn.net/zhaofuwu/article/details/52432883
6.hashmap 底层原理，理解要深入（hash碰撞）
http://blog.csdn.net/zeb_perfect/article/details/52574915
，zset的用途；hash的内在实现；
7.redis都怎么用；redis常用的数据结构都有什么；b
http://www.cnblogs.com/jxhd1/p/6528612.html
以及相关的用法；redis实现分布式锁；
http://www.cnblogs.com/liuyang0/p/6744076.html
redis的数据类型；redis中的击穿，雪崩怎么处理，以及发生的场景
http://blog.csdn.net/suneqing/article/details/52080302

https://my.oschina.net/u/1156660/blog/672321
；redis为什么能处理高并发，怎么处理；
http://blog.csdn.net/zhaoyueshun123/article/details/48970547

8.一个人委托你去买东西，让你说步骤，主要是分析这个需求
9.原理性，概念的东西好多。问了20多个问题，分布式锁，乐观锁，
https://www.baidu.com/link?url=ahrhpGc5nci2Aiq7yofbUNF4B2i3EYlLsT51kxw1-SnM4cZAQwxUv10h5W2-5Q-4uTBZs0MDxFYu1vmfemmidq&wd=&eqid=e9c50c70000257850000000359dba69c

http://blog.csdn.net/albertfly/article/details/52639432
nio ，数据库引擎，索引原理
10.主要是聊项目架构 还有原理的东西，（1.spring原理2.jvm原理3.项目框架）
11.dubbo失败重试机制。
http://blog.csdn.net/cxl0921/article/details/53407808

http://www.cnblogs.com/binyue/p/5380322.html
dubbo服务优点缺点儿，为什么要用dubbo？
http://www.oschina.net/p/dubbo
http://ask.csdn.net/questions/176871
http://blog.csdn.net/fgstudent/article/details/50667158
12.dubbo的异步是在consumer还是procider？
http://www.cnblogs.com/bruceChan0018/p/5777219.html
13.订单幂等性设计？
http://www.cnblogs.com/RunForLove/p/5640949.html
14.遇到的印象最深的问题？
15.说说常见的排序算法，排序算法的时间复杂度，为什么是这样的？
16.一致性hash算法怎么实现的？
http://blog.csdn.net/cywosp/article/details/23397179/
17.如何手动实现序列化？
http://qiaolevip.iteye.com/blog/1743100
18.什么是死锁？怎么避免死锁？
http://blog.csdn.net/ls5718/article/details/51896159
19.如何实现分布式全局id？
20.线程阻塞时会占用CPU时间吗？
http://blog.csdn.net/wang_bo_justone/article/details/51597671
21.io在什么时候发生阻塞？           
http://www.cnblogs.com/kzfy/p/5063467.html
22.consumer和provider
23.生产者消费者模型(代码)
24.代码实现单项链表
25.项目介绍和其中遇到的问题及解决方案
26.activemq消费端获取数据方式，以及特点
http://www.cnblogs.com/zhuxiaojie/p/5564187.html

http://shmilyaw-hotmail-com.iteye.com/blog/1897635
27.threadlocal的作用
https://www.2cto.com/kf/201202/118914.html
28.javabean中属性怎么不序列化 
http://www.importnew.com/10705.html
29.mysql的数据存储引擎及数据结构；如何选择mysql存储引擎？
30.多线程的实现方式；
http://www.cnblogs.com/felixzh/p/6036074.html
31.数组和链表的内在实现及比较；
http://blog.csdn.net/baoq_v5_java/article/details/44982537
32.linux常用命令；
 
 
cto问题:
反转链表算法手写
http://www.cnblogs.com/pianoid/archive/2011/05/03/reverse-a-singly-linked-list.html
说说项目上做过最困难的如何解决的，说说看过的书和文章的内容
优化方案以及自己所涉猎的技术
最近研究的一门技术，有什么想法，能解决什么样的问题


jdk底层：jvm内存分布、内存模型、类加载机制、垃圾回收算法、性能调优等（这些需要看书积累，实际分析，因为问题是这些类型，但是东西挺多的）；
java集合类：集合类框架数据结构实现、map类的数据结构及如何扩展；
线程相关：线程安全类
http://blog.csdn.net/robertcpp/article/details/51872613
、怎么证明线程安全或不安全，
https://www.baidu.com/link?url=6MCBLGucw6XnViCeuhTOiA4ArAZ0UqFF3ZB6-srHqXJomAi0I8-gm5dzjW_MZnJj1IO7UzcTAM_J8nLcqml3rq&wd=&eqid=95613e8e0002a1600000000359dba8de
 volatile关键字与原子类实现原理（CAS操作）
http://blog.csdn.net/sigangjun/article/details/47784213
、应用场景及jdk源码中有哪些应用，线程状态转换
http://blog.csdn.net/sinat_36042530/article/details/52565296
，多线程框架及实现机制
设计模式及框架：当时问了策略模式与模板方式区别、外观模式与适配器模式区别、观察者模式实现及场景，spring原理及实现机制，消息队列实现机制（active与kafka比较，消息队列原理
http://blog.csdn.net/andybbc/article/details/50723670
我没了解过，开始我就没答出来）
分布式相关：我没实际应用经验，我答的是远程调用相关，反正不晓得怎么就放过了。
架构相关：看个人项目情况，我的是电商项目，负载，js压缩，静态化等


1、java集合框架的实际应用场景 
2、hashmap,concurrenthashmap,hashtable的原理和区别
3、arrays,arraylist的区别和优缺
4、threadLocal的机制，会不会造成内存泄露 
http://www.cnblogs.com/softidea/p/4819866.html
http://www.jdon.com/20314
5、cookie,session的作用与区别，tomcat如何实现session机制
http://blog.csdn.net/jiaomingliang/article/details/47417351
6、response的结构，http2.0和http1.0的区别
7、如果要做一个商品缓存的...要考虑那些问题
8、有没有开发秒杀相关的经验，应注意那些问题 
9、redis api
10、做了哪些技术，插件等等，MQ以及微服务
11、问的都是底层，特别是JDK底层实现和线程。
12、jdk里面线程池是怎么实现的
http://blog.csdn.net/yaoqinggg/article/details/41804859
13、hashmap存储结构是什么样的，原理是什么
14、为什么要封装线程池
http://blog.csdn.net/xiangyunwan/article/details/72550948
15、设计一个电商秒杀系统需要考虑哪些？至少写3点
16、spring和jdk中用到了哪些设计模式，优点是什么？
http://www.cnblogs.com/baizhanshi/p/6187537.html

http://blog.csdn.net/gtuu0123/article/details/6114197
17、说一下spring的ioc和aop4，blockingqueue有哪些实现方式，有什么特点
18、怎么处理缓存雪崩
http://www.cnblogs.com/jinjiangongzuoshi/archive/2016/03/03/5240280.html
19、hashmap、jdk机制的区别以及优化
20、运行时内存区域的配置
21、多线程
22、分布式事务、分布式锁
23、消息中间件相关的
24、springboot的加载机制等
 

0921
1.事务隔离级别
http://www.cnblogs.com/fjdingsd/p/5273008.html
2.分布式事务
http://blog.csdn.net/mine_song/article/details/64118963 
3.spring组件
http://blog.csdn.net/yxb1173276058/article/details/69568572
4.hashmap实现原理
http://www.cnblogs.com/chengxiao/p/6059914.html
5.spring用了哪些设计模式
http://blog.csdn.net/bigtree_3721/article/details/51037547
6.dubbo组件

7.多线程，整体架构流程，事务机制

8.简历里项目用到的框架都问了
数据库分库分表，分布式文件系统，netty，rpc，dubbo，zookeeper，还有手绘项目架构图，多线程，redis，MQ

mysql的索引
http://blog.csdn.net/xlgen157387/article/details/51865289
dubbo的rpc原理，zk的同步机制选举原理
redis的持久化方案
http://zhengdl126.iteye.com/blog/2191834
支付宝微信支付对接
遇到的项目坑以及解决方案
虚拟机内存回收算法
http://blog.csdn.net/chaozhi_guo/article/details/50162861
常见的垃圾回收器
http://blog.csdn.net/kimylrong/article/details/18265807
分布式锁，分布式session。
http://www.cnblogs.com/Desneo/p/7209492.html
没有session的时候怎么保持http的状态（token机制）。

算法题找出两个数组中相同的数据。
http://blog.csdn.net/mr_linjw/article/details/50388268
你觉得要怎么样设计一个项目
谈谈项目遇到的问题。
redis的数据结构  kafka
http://www.cnblogs.com/binyue/p/5342281.html
1.数据库的索引优化
http://blog.csdn.net/suifeng3051/article/details/52669644
2.项目分布式的rpc使用
http://blog.csdn.net/scythe666/article/details/51954306
3.session的集群共享方法
http://www.cnblogs.com/ruiati/p/6247588.html
4.redis的集群
http://blog.csdn.net/myrainblues/article/details/25881535/
5.redis处理高并发   包含事务：隔离性  一致性
http://www.cnblogs.com/iforever/p/5796902.html
6.如果分配下属工作
7.如何理解敏捷开发
8.以往工作的难处
9.具体项目的表结构以及对象逻辑设计
1.springmvc struts的实现原理
http://blog.csdn.net/u013126379/article/details/52263911
2.http有哪些请求方式，说说该协议的原理
http://blog.csdn.net/witsmakemen/article/details/8994963
3.请求跨域如何解决，为什么jsonp可以解决跨域问题，他的原理
http://www.jb51.net/article/75669.htm
1.算法数据结构，冒泡算法排序，堆冒泡等等
http://blog.csdn.net/wanglelelihuanhuan/article/details/51340290
2.spring的原理及机制
http://blog.csdn.net/nrain2/article/details/45459311
3.一些简历上的技能
4.集合包、spring框架、
mysql搜索引擎
http://blog.csdn.net/shenpengchao/article/details/51914844

、sql优化
http://blog.csdn.net/kevinlifeng/article/details/43233227
、大数据sql查询


5.mysql的两个引擎有什么区别
http://blog.csdn.net/ls5718/article/details/52248040
6.set list map  继承哪个类
7.struts2 的action是单线程还是多线程的
8.高并发处理；
9.数据库的优化；
http://database.51cto.com/art/201407/445934.htm
10.集合相关问题；
11.并发容器工具类（细节）
http://blog.csdn.net/yangnan0110/article/details/45032749

http://blog.csdn.net/yangnan0110/article/details/45032749
12.主要是看整体技术架构思维 
13.基础知识、高并发以及原理性
1、mongodb,mongodb索引,mongodb和mysql区别
2、redis,
redis支持的数据类型和应用
http://www.cnblogs.com/mrhgw/p/6278619.html
,相关实际问题解决
3、session共享,常见的实现方式
http://blog.csdn.net/fuxiaohui/article/details/45440829

0929
4、dubbo
http://blog.csdn.net/xlgen157387/article/details/51865289
，集群配置
http://blog.csdn.net/hardworking0323/article/details/51137364
，监控dubbo服务是否异常
http://www.jianshu.com/p/d3d3857b7ec0
5、开发过程中遇到的比较困难的问题，如何解决
6、jvm垃圾回收 gc root
http://blog.csdn.net/x_i_y_u_e/article/details/50897229
7、mysql,索引,sql优化
8、spring相关
9、list set map hashmap concurrenthashmap
10、struts2和spring mvc区别
http://www.cnblogs.com/langtianya/p/4628967.html
11、http请求和响应头部
1.索引的b树存储与hash存储
http://www.cnblogs.com/heiming/p/5865101.html
http://blog.csdn.net/ranjea/article/details/8944518
2.数据结构
3.hashmap，索引存储结构，并发
4.tcp  ip  udp区别

http://www.cnblogs.com/xiejw/p/5293322.html
5.netty的线程模型
6.netty建立连接和发消息的过程
7.select/poll和epoll的区别
http://www.cnblogs.com/Anker/p/3265058.html

8.JVM是怎么回收垃圾有什么方式
http://blog.csdn.net/sunny243788557/article/details/52797088
9.fastdfs基本架构和文件上传机制
http://blog.csdn.net/wishfly/article/details/6940788
10.rabbitmq  rpc底层的机制 
http://www.cnblogs.com/ChrisMurphy/p/6550184.html
11.fastdfs的分布式如何做
12.容灾怎么处理
http://blog.chinaunix.net/uid-20675977-id-3066055.html
13.分布式的session的共享机制如何做
http://blog.csdn.net/fyxxq/article/details/9731747
14.分布式锁
http://www.cnblogs.com/PurpleDream/p/5559352.html
  数据库扩容
http://blog.chinaunix.net/uid-16979052-id-3442923.html
 同一时间
15.聊mysql数据类型
http://blog.csdn.net/anxpp/article/details/51284106
16.sql优化方法
17.ssh和springmvc各自的优劣
18.oracle存储过程的优缺点
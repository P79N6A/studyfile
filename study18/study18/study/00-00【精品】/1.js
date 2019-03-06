一、简历
简历里面需要包含的内容应该是学历，自己的技术栈，然后自己做过的一些项目。简历不需要太长，两页纸即可。里面应该重点写你使用过的一些框架，自己做的一些项目，以及自己的收获，简练第一。一般面试官不会有很多的耐心，看你的项目详细描述，所以尽量简洁明了即可。
二、简历投递
投递的方式有几种吧，相信大家也都知道。一般在程序员的垂直招聘网站投递即可，比如脉脉、BOSS直聘、拉勾等等。智联招聘啥的，不太适合咱们程序员，你懂的。另外，由于自己不是大牛，所以如果有猎头勾搭的话，我尽量不会理会，因为有过血的教训??。所以尽量还是自己投简历比较靠谱，或者是内推。
三、面试
由于我是跨城市，所以我接到的面试一般都是电话面试+视频面试，如果聊得差不多了，也有现场面试，不会拘泥于形式。
一般来说，面试流程都差不太多。首先自我介绍，重点介绍一下自己的一些工作经历，以及自己主要负责的一些内容。这块可以提前准备一下，不过也不需要特地准备，别搞得像背书似的，反而觉得不真实。
3.1 技术面试
一般公司都会有两到三轮的技术面试，大厂的技术面试轮次还可能更多，但是每轮考察的内容又不是很一致，下面列举一些自己遇到的一些问题。
3.1.1 Java基础
此时一般会问到一些Java的基础知识，比如
? synchronized static修饰类和方法有什么区别
? HashMap的原理，底层数据结构，rehash的过程，指针碰撞问题
http://blog.csdn.net/mark2when/article/details/52649955
? HashMap的线程安全问题，为什么会产生这样的线程安全问题
? ConcurrentHashMap的数据结构，底层原理，put和get是否线程安全

--安全底层node  链表由volatile来实现put  和get值
? Java IO的一些内容，包括NIO，BIO等
http://blog.csdn.net/anxpp/article/details/51512200
--异步的套接字通道时真正的异步非阻塞I/O，对应于UNIX网络编程中的事件驱动I/O（AIO）
--传统的BIO编程:网络编程的基本模型是C/S模型，即两个进程间的通信。
3.1.2 Java高级特性
此时问到的问题一般包含JVM，多线程的一些内容，这块建议大家多看看源码，大致如下：
? Java线程池的构造方法，里面参数的含义，以及原理
http://cuisuqiang.iteye.com/blog/2019372

? volatile和ThreadLocal解决了什么问题
http://blog.csdn.net/paincupid/article/details/47346423
? CAS在Java中的具体实现
--利用cup的底层指令来时间java的非阻塞算法
http://blog.csdn.net/ls5718/article/details/52563959
? Java虚拟机的构成，以及一个Java对象的生命周期，还有堆栈和方法区中存储的内容

http://blog.csdn.net/sodino/article/details/38387049
? JVM的GC过程，包括一些实际问题的分析，比如说明一个现象，让你分析可能是什么原因会导致这样的问题，应该如何对JVM参数进行调优
? synchronized和Lock的区别，以及底层实现原理
http://blog.csdn.net/u012403290/article/details/64910926?locationNum=11&fps=1
? Full GC和Minor GC触发的条件
http://blog.csdn.net/yhyr_ycy/article/details/52566105
? GC Roots的选择
http://blog.csdn.net/u010218288/article/details/50541091
? jmap，jstat，jstack等的使用场景，MAT等
http://blog.csdn.net/xiaofengnh/article/details/51900787
? ClassLoader的加载过程
http://blog.csdn.net/cruise_h/article/details/27380027
? CountDownLatch、CyclicBarrier和Semaphore等
--CountDownLatch类位于java.util.concurrent包下，利用它可以实现类似计数器的功能。比如有一个任务A，它要等待其他4个任务执行完毕之后才能执行，此时就可以利用CountDownLatch来实现这种功能了。
http://blog.csdn.net/qq_19431333/article/details/70212663
? Java 8 的新特性等
http://blog.csdn.net/yczz/article/details/50896975
3.1.3 数据库
这里的数据库包含两种，一种一般是MySQL，另外是NoSql数据库，包括Redis、MongoDB等。一般会问的问题有：
? inner join和left join等的区别
http://blog.csdn.net/scythe666/article/details/51881235
? SQL调优，explain，profile等
explain
https://www.cnblogs.com/xuanzhi201111/p/4175635.html

profile
http://blog.csdn.net/isoleo/article/details/46508669
? InnoDB和Myisam的区别
? ACID
? 数据库的事务隔离级别，以及他们分别能解决什么问题
? Redis的几种数据结构
http://blog.csdn.net/imred/article/details/51222237
? Redis是单线程还是多线程

--单线程
http://blog.csdn.net/qqqqq1993qqqqq/article/details/77538202

? Redis的持久化
http://blog.csdn.net/yinxiangbing/article/details/48627997
? 悲观锁和乐观锁的含义
http://blog.csdn.net/hongchangfirst/article/details/26004335
? 最左前缀索引，索引的数据结构，聚簇索引等（这块还没搞明白）

http://blog.csdn.net/alexdamiao/article/details/51934917
--结构b-tree
--最左原则：复合索引：以第一个字搜索可被使用索引
https://www.cnblogs.com/xaf-dfg/p/4367874.html
3.1.4 框架
3.1.4.1 Spring
因为Spring是我们常用的框架，所以这块的内容会问的比较多，也会比较细。
? Spring的两大特性（IoC和AOP）
? Spring的bean的生命周期
http://developer.51cto.com/art/201104/255961.htm
? Spring是如何解决Bean的循环引用问题的
--加一个bean，类路径一致，bean名不一致
http://wolfsquare.iteye.com/blog/38687
? AOP的两种实现方式，以及两者的区别（这里其实使用了动态代理，具体动态代理分为两种，一种是JDK的动态代理，主要使用的是JDK的反射，还有一种是CGLib，两者区别可以自己搜索，文章比较多）
http://blog.csdn.net/u010136727/article/details/51829912

? AOP一般的使用场景
--场景一：Aop与事物
--场景二：Aop与日志  http://blog.csdn.net/czmchen/article/details/42392985
--场景三：Aop与缓存
https://zhidao.baidu.com/question/297960733.html
? Spring的事务原理
http://www.codeceo.com/article/spring-transactions.html
3.1.4.2 MyBatis
这块问到的比较简单些：
? $和#的区别
? MyBatis和Hibernate的区别
http://blog.csdn.net/firejuly/article/details/8190229
? 源码，一般问的比较少
3.1.4.3 Dubbo
因为平时自己用到了Dubbo，所以这块会有问到：
? RPC的原理
http://blog.csdn.net/rulon147/article/details/53814589
? Dubbo是如何完成远程调用的
? Dubbo如何进行调优
? Dubbo的通信协议
? Dubbo是如何实现负载均衡的
3.1.4.4 ZooKeeper
? ZK的使用场景
http://blog.csdn.net/claram/article/details/51567412
? ZK的选举机制
https://www.cnblogs.com/ASPNET2008/p/6421571.html
? ZK的节点类型
http://blog.csdn.net/heyutao007/article/details/38741207
? 一致性Hash原理
http://blog.csdn.net/cywosp/article/details/23397179/
3.1.5 数据结构和算法
这块的内容是基础，如果面试官怀疑你的能力，一般一会问到这部分内容，比如树的遍历、快速排序等。
3.1.6 linux
一般会问一些命令
3.1.7 综合题
这块的题目，面试官一般会问的比较深入。比如如何设计一个抢购系统，String转Integer等，这部分需要考验的就是一个
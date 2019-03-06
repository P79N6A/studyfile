Java并发指南系列文章在我的专栏：Java并发指南
'Java并发'编程一直'是'Java'程序员必须懂'但又是很难懂'的技术内容'。
这里'不仅仅'是'指使用'简单的'多线程编程'，'或者使用juc的某个类'。当然这些都是并发编程的基本知识，
除了使用这些工具以外，Java并发编程中涉及到的技术原理十分丰富。为了更好地把并发知识形成一个体系，
也鉴于本人没有能力写出这类文章，于是参考几位并发编程专家的博客和书籍，做一个简单的整理。
本文只是简要的介绍和总结。详细的内容欢迎来我的专栏阅读，会有更多的系列文章。
CSDN专栏：Java并发编程指南 
https://blog.csdn.net/column/details/21961.html
我的个人博客：https://h2pl.github.io/
我的github：https://github.com/h2pl/

一：'并发基础'和'多线程'
首'先'需要'学习'的就是并发的基础知识，什么是并发，为什么要'并发'，'多线程'的概念，'线程安全'的概念等。
然'后学'会使'用Java'中的'Thread''或是其他线程实现'方法，'了解线程'的'状态转换'，'线程的方法'，'线程的通信'方式'等'。

二：'JMM内存模型'
任何'语言'最终'都'是'运行在处理器上'，'JVM虚拟机'为了'给开发者'一个'一致的编程内存模型'，
需要制定一套规则，这套规则可以在不同架构的机器上有不同实现，并且向上为程序员提供统一的JMM内存模型。
所以'了解JMM内存模型'也'是了解Java并发原理'的'一个重点'，其中'了解指令重排'，'内存屏障'，以及'可见性原理'尤为重要。
'JMM只保证''happens-before'和'as-if-serial规则'，所以在'多线程并发时'，可能'出现原子性'，'可见性'以及'有序性'这'三大问题'。
下面的内容则会讲述Java是如何解决这三大问题的。

三：'synchronized'，'volatile'，'final等关键字'
对于'并发的三大问题'，'volatile'可以'保证原子性'和'可见性'，'synchronized'三种特性'都可以保证'（允许指令重排）。
'synchronized'是'基于操作系统'的mutex lock'指令实现'的，'volatile和final'则是'根据JMM''实现其内存''语义'。
此处'还要了解CAS操作'，它'不仅提供'了'类似volatile'的'内存语义'，并'且保证'操作'原子性'，因为'它是由硬件实现的'。
'JUC中的Lock底层''就是'使'用volatile''加上CAS'的方式'实现的'。
'synchronized''也'会'尝试用cas操作'来'优化''器重量级锁'。
了解这些关键字是很有必要的。

四：'JUC包'
在了解完上述内容以后，就可以看看JUC的内容了。
'JUC''提供'了'包括Lock'，'原子操作类'，'线程池'，'同步容器'，'工具类''等内容'。
'这些类'的'基础'都'是AQS'，所以'了解AQS的原理'是'很重要'的。
除此'之外'，'还可以了解'一下'Fork/Join'，以'及JUC'的'常用场景'，
比如'生产者消费者'，'阻塞队列'，以'及读写容器'等。

五：实践
上述这些内容，'除了JMM'部分的内容比较'不好实现'之外，像是多线程基本使用，
'JUC的使用'都'可以在代码实践'中'更好地理解其原理'。多尝试一些场景，
或者在网上'找一些比较经典的并发场景'，或者'参考别人的例子'，在'实践中加深理解'，还是很有必要的。

六：补充
由于很多Java新手可能对并发编程没什么概念，在这里放一篇不错的总结，简要地提几个并发编程中比要重要的点，
也是比较基本的点吗，算是抛砖引玉，开个好头，在大致了解了这些基础内容以后，才能更好地开展后面详细内容的学习。


1.'并发编程三要素'
'原子性'
原子，即'一个''不可再被分割''的颗粒'。在'Java中原子性''指'的是'一个或多个操作''要么全部执行成功''要么全部执行失败'。

'有序性'
'程序执行的顺序'按'照代码的先后顺序执行'。（'处理器可'能会'对指令'进行'重排序'）

'可见性'
当'多个线程访问同一个变量'时，如果其中'一个线程对其作了修改'，'其他线程'能'立即获取'到'最新的值'。

2.'线程的五大状态'
'创建状态'
当用 'new' 操作符创建'一个线程''的时候'

'就绪状态'
'调用 start' 方法，'处于就绪状态'的线程并'不一定马上'就会'执行 run 方法'，还'需要等待CPU的调度'

'运行状态'
'CPU' 开始'调度线程'，并开始'执行 run 方法'

'阻塞状态'
线程的'执行'过程'中''由于一些原因''进入阻塞状态'
比'如'：'调用 sleep' 方法、'尝试'去'得到一个锁'等等
​​
'死亡状态'
'run' 方法'执行完' '或'者 '执行过程'中'遇到'了一个'异常'

3.'悲观锁与乐观锁'
悲观锁：'每次操作'都会'加锁'，会'造成线程阻塞'。
乐观锁：'每次操作''不加锁'而是'假设没有冲突'而'去完成某项操作'，
'如果因为冲突失败''就重试'，'直到成功为止'，'不'会'造成''线程阻塞'。
​
4.'线程之间的协作'
4.1 'wait/notify/notifyAll'
'这一组''是''Object类的方法'
需要注意的是：'这三个方法'都'必须在同步'的'范围内调用'​

'wait'
'阻塞当前线程'，'直到notify''或者notifyAll来唤醒'​​​​

'wait''有三种方式的调用'
'wait()'
必要要'由''notify'或者'notifyAll''来唤醒'​​​​
'wait(long timeout)'
在'指定时间内'，如果'没有notify'或'notifAll方法'的'唤醒'，也'会自动唤醒'。
'wait(long timeout,long nanos)'
本质上'还是调用一个参数的方法'
public final void wait(long timeout, int nanos) throws InterruptedException {
	if (timeout < 0) {
		throw new IllegalArgumentException("timeout value is negative");
	}
	if (nanos < 0 || nanos > 999999) {
		throw new IllegalArgumentException("nanosecond timeout value out of range");
	}
	if (nanos > 0) {
		timeout++;
	}
	wait(timeout);
}
'notify'
只能'唤醒一个'处于 wait 的线程
'notifyAll'
'唤醒全部'处于 wait 的线程
​
4.2 'sleep/yield/join'
这'一组'是 'Thread类'的'方法'

'sleep'
让'当前线程''暂停指定时间'，只是'让出''CPU'的'使用权'，并'不释放锁'

'yield'
'暂停当前线程''的执行'，也就是'当前CPU的使用权'，'让其他线程''有机会执行'，'不能指定时间'。
会'让当前线程''从运行状态'转'变为就绪状态'，此方法'在生产环境'中'很少会使用到'，​​​
官方在其注释中也有相关的说明
  /**
  * A hint to the scheduler that the current thread is willing to yield
  * its current use of a processor. The scheduler is free to ignore this
  * hint.
  *
  * <p> Yield is a heuristic attempt to improve relative progression
  * between threads that would otherwise over-utilise a CPU. Its use
  * should be combined with detailed profiling and benchmarking to
  * ensure that it actually has the desired effect.
  *
  * <p> It is rarely appropriate to use this method. It may be useful
  * for debugging or testing purposes, where it may help to reproduce
  * bugs due to race conditions. It may also be useful when designing
  * concurrency control constructs such as the ones in the
  * {@link java.util.concurrent.locks} package.
  */​​

'join'
等'待调用join方法的线程执行结束'，'才执行后面的代码'
其'调用'一定'要在' 'start 方法之后'（看源码可知）​
使用场景：'当父线程'需'要''等待子线程''执行结束''才执行后面内容'
或者需'要某个子线程的执行结果''会用到join方法'​

5.'valitate关键字'
5.1 '定义'
java编程语言'允许线程''访问共享变量'，'为'了'确保''共享变量'能'被准确'和'一致''的更新'，
'线程''应'该'确保''通过排他锁''单独获得''这个变量'。
Java语言提供了'volatile'，'在某些情况下''比锁更加方便'。
如果'一个字段'被'声明成volatile'，java'线程内存模型''确保所有线程''看到'这个'变量的值'是'一致'的。

'valitate'是'轻量级'的'synchronized'，'不'会'引起线程''上下文'的'切换和调度'，'执行开销更小'。

5.2 '原理'
1. 使'用volitate修饰的变量'在汇编阶段，'会多出一条lock前缀指令'
2. 它'确保指令重排'序时'不会把'其'后面的指令排到内存屏障之前'的位置，
也'不会把前面的指令排到内存屏障的后面'；即'在执行到内存屏障'这句'指令时'，在它'前面的操作''已经全部完成'
3. '它会强制''将对缓存的修改'操作'立即写入主存'
4. 如果是'写操作'，它'会导致''其他CPU里''缓存了该内存地址的数据''无效'

5.3 '作用'
'内存可见性'
'多线程操作的时候'，'一个线程修改'了'一个变量的值'，'其他线程''能立即看到''修改后的值'
'防止重排序'
即'程序的执行顺序'按'照代码的顺序执行'（处理器为了提高代码的执行效率可能会对代码进行重排序）

'并不能保证''操作的原子性'（比如下面这段代码的执行结果一定不是100000）
public class testValitate {
	public volatile int inc = 0;
	public void increase() {
		inc = inc + 1;
	}
	public static void main(String[] args) {
		final testValitate test = new testValitate();
		for (int i = 0; i < 100; i++) {
			new Thread() {
                public void run() {
                    for (int j = 0; j < 1000; j++)
                        test.increase();
                }
            }.start();
        }
        while (Thread.activeCount() > 2) {  //保证前面的线程都执行完
        	Thread.yield();
        }
        System.out.println(test.inc);
	}
}

6. 'synchronized' 关键字
'确保'线程'互斥'的'访问''同步代码'

6.1 '定义'
'synchronized' '是JVM'实现'的一种锁'，其中'锁的获取'和'释放'分别'是'
'monitorenter'和'monitorexit'指令，'该锁'在'实现上''分为'了'偏向锁'、'轻量级锁'和'重量级锁'，
其中'偏向锁'在 'java1.6' 是'默认开启'的，'轻量级锁'在'多线程'竞争的情况下'会膨胀成重量级锁'，
有关'锁的数据'都'保存在对象头中'

6.2 '原理'
加了 'synchronized' 关键字的'代码段'，'生成的字节码'文件'会多出' 
'monitorenter' 和 'monitorexit' '两条指令'（利用javap -verbose 字节码文件可看到关，关于这两条指令的文档如下：

monitorenter
Each object is associated with a monitor. A monitor is locked if and only if it has an owner. The thread that executes monitorenter attempts to gain ownership of the monitor associated with objectref, as follows:
• If the entry count of the monitor associated with objectref is zero, the thread enters the monitor and sets its entry count to one. The thread is then the owner of the monitor.
• If the thread already owns the monitor associated with objectref, it reenters the monitor, incrementing its entry count.
• If another thread already owns the monitor associated with objectref, the thread blocks until the monitor's entry count is zero, then tries again to gain ownership.​

monitorexit
The thread that executes monitorexit must be the owner of the monitor associated with the instance referenced by objectref.
The thread decrements the entry count of the monitor associated with objectref. If as a result the value of the entry count is zero, the thread exits the monitor and is no longer its owner. Other threads that are blocking to enter the monitor are allowed to attempt to do so.​​

'加了 synchronized' 关键字'的方法'，'生成的字节码文件'中'会多一个' 'ACC_SYNCHRONIZED' 标志位，
当'方法调用时'，'调用指令'将'会检查方法'的 'ACC_SYNCHRONIZED' '访问标志''是否被设置'，
'如果设置了'，执行'线程将先获取monitor'，'获取成功之后''才能执行方法体'，
'方法执行完后再释放monitor'。在'方法执行期间'，'其他任何线程'都'无法'再'获得同一个monitor对象'。 
其实'本质上没有区别'，'只是'方法的'同步是一种隐式的方式'来'实现'，无需通过字节码来完成。

6.3 '关于使用'
'修饰普通方法'
'同步对象''是''实例对象'

'修饰静态方法'
'同步对象''是''类本身'

'修饰代码块'
'可以自己''设置''同步对象'
​
6.4 '缺点'
'会让没有得到锁''的资源''进入Block状态'，'争夺到资源之后''又转为Running状态'，
'这个过程''涉及到''操作系统''用户模式'和'内核模式的切换'，'代价比较高'。
'Java1.6为 synchronized' '做了优化'，'增加'了'从偏向锁''到轻量级锁''再到重量级锁''的过度'，
但是在'最终转变''为重量级锁之后'，'性能仍然较低'。

7. 'CAS'
'AtomicBoolean'，'AtomicInteger'，'AtomicLong'以及'Lock'相关类'等底层'就'是用 CAS实现的'，
在'一定程度上''性能比 synchronized 更高'。

7.1 '什么是CAS'
'CAS全称'是'Compare And Swap'，'即比较替换'，'是'实现'并发'应用到的一种'技术'。
操作'包含三个操作数' —— '内存位置'（V）、'预期原值'（A）和'新值'(B)。 
如果'内存位置的值'与'预期原值'相'匹配'，那么'处理器'会'自动将该位置值''更新为新值' 。
'否则'，处理器'不做'任何'操作'。

7.2 '为什么'会'有CAS'
如果'只'是'用synchronized'来保证'同步'会'存在以下问题'
'synchronized''是'一种'悲观锁'，在使用上'会造成'一定的'性能问题'。
在'多线程竞争下'，'加锁'、'释放锁'会'导致比较多'的上下文'切换和调度延时'，'引起性能问题'。
'一个线程'持'有锁'会'导致其它'所有需要此锁的'线程挂起'。

7.3 '实现原理'
Java'不能直接的访问操作系统底层'，是'通过native方法'（JNI）来'访问'。
'CAS底层''通过Unsafe类''实现原子性操作'。

7.4 '存在的问题'
'ABA问题'
什么是ABA问题？比如有一个'int' 类型的值'N是1'
此时有'三个线程'想'要去改变它'：
线程'A' ​​：希望'给 N 赋值为 2'
线程'B'： 希望'给 N 赋值为 2'
线程'C'： 希望'给 N 赋值为 1'​​
此时'线程A和线程B'同时'获取到N的值1'，
'线程A'率'先得到系统资源'，'将 N 赋值为 2'，
'线程B'由于某种原因'被阻塞住'，
'线程C''在线程A执行完后''得到N的当前值2'
'此时'的'线程状态'
线程'A成功给 N 赋值为2'
线程'B获取到 N 的当前值 1' '希望给他赋值为 2'，'处于阻塞状态'
线程'C获取当好N的当前值 2' ​​​​​'希望给他赋值为1'
​​
然后线程'C成功给N赋值为1'
​最后线程'B得到了系统资源'，又'重新恢复了运行'状态，​在'阻塞之前'线程'B获取到的N的值是1'，
执行'compare'操作发现'当前N的值''与获取到的值相同'（均为1），成功'将N赋值为了2'。
​
在这个过程中线程'B获取到N的值''是一个旧值​​'，虽然'和当前N的值相等'，但是'实际上'N的值已经'经历了一次' '1到2到1的改变'
上面这个例子就是典型的ABA问题​
'怎样'去'解决ABA问题'
'给变量''加一个版本号'即可，在'比较的时候'不仅要'比较当前变量的值' '还'需要'比较当前变量'的'版本号'。
Java中'AtomicStampedReference' '就解决了这个问题'

'循环时间长开销大'
在'并发量比较高'的情况下，如果'许多线程反复'尝试'更新某一个变量'，
却'又一直'更新'不成功'，'循环往复'，会'给CPU带来很大的压力'。

'CAS只能保证''一个共享变量'的'原子操作'

8. 'AbstractQueuedSynchronizer'(AQS)
'AQS抽象的队列式同步器'，'是一种基于状态'（state）的'链表管理方式'。
'state' 是'用CAS去修改'的。它'是' 'java.util.concurrent' 包中'最重要的基石'，
要学习'想学习' java.util.'concurrent' 包里'的内容''这个类是关键'。 
'ReentrantLock​'、'CountDownLatcher'、'Semaphore' '实现的原理'就是'基于AQS'。
想知道他怎么实现以及实现原理 可以参看这篇文章
https://www.cnblogs.com/waterystone/p/4920797.html

9. 'Future'
在'并发编程'我们'一般使用Runable'去'执行异步任务'，然而'这样做'我们是'不能拿到异步任务'的'返回值'的，
但是'使用Future就可以'。使'用Future很简单'，只需'把Runable换成FutureTask即可'。使用上比较简单，这里不多做介绍。

10. 线程池
如果我们使用线程的时候就去创建一个线程，虽然简单，但是存在很大的问题。
如果'并发的线程数量很多'，并且'每个线程'都是'执行一个时间很短的任务''就结束'了，
这样'频繁创建线程'就'会大大降低系统的效率'，因为'频繁创建'线程和'销毁'线程'需要时间'。
'线程池'通过'复用''可'以'大大减少线程频繁创建'与'销毁''带来的性能上的损耗'。

Java中'线程池的实现类' 'ThreadPoolExecutor'，其'构造函数'的'每一个参数的含义'
在注释上已经写得很清楚了，这里几个关键参数可以再简单说一下
'corePoolSize'：'核心线程数'即一直'保留在线程池中的线程数量'，
	即使处于'闲置状态'也'不会被销毁'。要'设置 allowCoreThreadTimeOut 为 true'，'才会被销毁'。
'maximumPoolSize'：'线程池中允许存在'的'最大线程数'
'keepAliveTime' ：'非核心线程'允许的'最大闲置时间'，'超过'这个时间就'会本地销毁'。
'workQueue'：用来'存放任务的队列'。
	'SynchronousQueue'：这个'队列'会'让新添加的任务''立即得到执行'，如果'线程池中所有的线程''都在执行'，
	那么'就会去创建'一个'新的线程'去'执行这个任务'。当'使用这个队列的时候'，'maximumPoolSizes'一般都'会设置一个最大值' 'Integer.MAX_VALUE'
	'LinkedBlockingQueue'：'这个队列''是'一个'无界队列'。怎么理解呢，就是'有多少任务'来我们'就会执行多少任务'，如果'线程池中的线程小于corePoolSize' ,
	我们就会'创建一个新的线程'去'执行这个任务'，如果'线程池中的线程数等于corePoolSize'，就'会将任务放入队列中等待'，
	由于'队列大小''没有限制'所以'也被称为无界队列'。当'使用这个队列'的时候'maximumPoolSizes不生效'
	（'线程池'中'线程的数量''不'会'超过corePoolSize'），所以'一般都会''设'置'为0'。
	'ArrayBlockingQueue'：这个队列'是'一个'有界队列'。可以'设置队列'的'最大容量'。当'线程池'中'线程数大于或者等于' 'maximumPoolSizes' '的时候'，
	就会'把任务放到这个队列中'，当'当前队列中'的'任务''大于''队列的最大容量'就'会丢弃掉该任务'交'由 RejectedExecutionHandler 处理'。
	
最后，本文主要对Java并发编程开发需要的知识点作了简单的讲解，这里每一个知识点都可以用一篇文章去讲解，
由于篇幅原因不能对每一个知识点都详细介绍，我相信通过本文你会对Java的并发编程会有更近一步的了解。
如果您发现还有缺漏或者有错误的地方，可以在评论区补充，谢谢。
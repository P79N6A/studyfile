Java中的锁机制及Lock类

'锁的释放'-'获取'建立的'happens before关系'
锁是java并发编程中最重要的同步机制。
'锁'除了
'让临界区互斥执行'外，
还可以'让释放锁的线程向''获取同一个锁的线程''发送消息'。

下面是锁释放-获取的示例代码：

class MonitorExample {
    int a = 0;
 
    public synchronized void writer() {  //1
        a++;                             //2
    }                                    //3
 
    public synchronized void reader() {  //4
        int i = a;                       //5
        ……
    }                                    //6
} 

根据程序次序规则，
1 happens before 2, 
2 happens before 3; 
4 happens before 5, 
5 happens before 6。
假设线程'A执行writer()方法'，随后线程'B执行reader()方法'。
根据happens before规则，
这个过程包含的happens before 关系可以'分为两类'：

根据'监视器锁规则'，           3 happens before 4。
根据happens before 的传递性，  2 happens before 5。
上述happens before 关系的图形化表现形式如下：

在上图中，每一个箭头链接的两个节点，代表了一个happens before 关系。
'黑色箭头'表示'程序顺序规则'；'橙色箭头'表示'监视器锁规则'；
'蓝色箭头'表示'组合这些规则后''提供的happens before保证'。

上图表示在线程'A释放了锁之后'，随后'线程B获取同一个锁'。
在上图中，'2 happens before 5'。
'因此'，线程'A在释放锁之前'所有'可见的共享变量'，
'在'线程'B获取'同一个'锁之后'，将立刻变得'对B线程可见'。

'锁释放'和获取的'内存语义'
当'线程释放锁时'，JMM会把'该线程'对应的'本地内存中的共享变量''刷新到主内存'中。
以上面的MonitorExample程序为例，A线程释放锁后，共享数据的状态示意图如下：


当'线程获取锁时'，JMM会把'该线程'对应的本地内存置为无效。
从而使得被监视器保护的临界区代码必须要'从主内存中去读取共享变量'。


'对比''锁释放-获取'的'内存语义'与'volatile写-读'的'内存语义'，
可以看出：
'锁释放与''volatile写'有'相同'的内存语义；
'锁获取与''volatile读'有'相同'的内存语义。

下面对锁释放和锁获取的内存语义做个总结：

线程A释放一个锁，实质上是线程A向接下来将要获取这个锁的某个线程发出了
（线程A对共享变量所做修改的）消息。
线程B获取一个锁，实质上是线程B接收了之前某个线程发出的
（在释放这个锁之前对共享变量所做修改的）消息。
线程A释放锁，随后线程B获取这个锁，
这个过程实质上是线程A通过主内存向线程B发送消息。

'锁内存语义的实现'
本文将借助ReentrantLock的源代码，
来分析锁内存语义的具体实现机制。

请看下面的示例代码：
class ReentrantLockExample {
	int a = 0;
	ReentrantLock lock = new ReentrantLock();

	public void writer() {
		lock.lock(); // 获取锁
		try {
			a++;
		} finally {
			lock.unlock(); // 释放锁
		}
	}

	public void reader() {
		lock.lock(); // 获取锁
		try {
			int i = a;
			//……
		} finally {
			lock.unlock(); // 释放锁
		}
	}
}

在ReentrantLock中，
'调用lock()方法''获取锁'；
'调用unlock()方法''释放锁'。

ReentrantLock的'实现依赖于'java'同步器框架AbstractQueuedSynchronizer'（本文简称之为AQS）。
'AQS'使'用一个整型'的'volatile变量'（命名为state）来'维护同步状态'，
马上我们会看到，这个'volatile变量''是'ReentrantLock'内存语义实现的关键'。 
下面是'ReentrantLock的类图'（仅画出与本文相关的部分）：


ReentrantLock分为公平锁和非公平锁，我们首先分析'公平锁'。

使用'公平锁'时，'加锁方法'lock()的方法'调用轨迹'如下：

ReentrantLock : lock()
FairSync : lock()
AbstractQueuedSynchronizer : acquire(int arg)
ReentrantLock : tryAcquire(int acquires)
在'第4步真正开始加锁'，下面是该方法的源代码：

protected final boolean tryAcquire(int acquires) {
	final Thread current = Thread.currentThread();
	int c = getState(); // 获取锁的开始，首先读volatile变量state
	if (c == 0) {
		if (isFirst(current) && compareAndSetState(0, acquires)) {
			setExclusiveOwnerThread(current);
			return true;
		}
	} else if (current == getExclusiveOwnerThread()) {
		int nextc = c + acquires;
		if (nextc < 0)
			throw new Error("Maximum lock count exceeded");
		setState(nextc);
		return true;
	}
	return false;
}

从上面源代码中我们可以看出，
'加锁方法'首'先读volatile变量state'。

在使用公平锁时，'解锁方法'unlock()的方法'调用轨迹'如下：

ReentrantLock : unlock()
AbstractQueuedSynchronizer : release(int arg)
Sync : tryRelease(int releases)
在'第3步真正开始释放锁'，下面是该方法的源代码：

protected final boolean tryRelease(int releases) {
	int c = getState() - releases;
	if (Thread.currentThread() != getExclusiveOwnerThread())
		throw new IllegalMonitorStateException();
	boolean free = false;
	if (c == 0) {
		free = true;
		setExclusiveOwnerThread(null);
	}
	setState(c); // 释放锁的最后，写volatile变量state
	return free;
}

从上面的源代码我们可以看出，在'释放锁的最后''写volatile变量state'。

'公平锁'在'释放锁的最后''写volatile变量state'；'在获取锁时'首'先读这个volatile变量'。
根据'volatile的happens-before规则'，
'释放锁的线程'在'写volatile变量''之前可见的共享变量'，
在'获取锁的线程''读'取同一个'volatile变量后'将立即变的'对'获取锁的'线程可见'。

现在我们分析'非公平锁'的'内存语义'的实现。

'非公平锁的释放''和公平锁完全一样'，所以这里仅仅分析

'非公平锁的获取'。
'使用公平锁时'，'加锁方法lock()'的方法'调用轨迹'如下：

ReentrantLock : lock()
NonfairSync : lock()
AbstractQueuedSynchronizer : compareAndSetState(int expect, int update)
在'第3步真正开始加锁'，下面是该方法的源代码：
protected final boolean compareAndSetState(int expect, int update) {
	return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}

该方法'以原子操作'的方式'更新state变量'，
'本文把java的compareAndSet'()方法'调用简称为CAS'。
JDK文档对该方法的说明如下：
如果'当前状态值''等于预期值'，则'以原子方式''将同步状态''设置为给定的更新值'。
'此操作具有 volatile 读和写的内存语义'。

这里我们分别从编译器和处理器的角度来分析,
'CAS''如何同时具有volatile读'和'volatile写的内存语义'。

前文我们提到过，'编译器不会对volatile读'与'volatile读后面的任意内存操作''重排序'；
'编译器不会对volatile写''与volatile写前面的''任意内存操作''重排序'。
'组合这两个条件'，意味着为了'同时实现volatile读''和volatile写的内存语义'，
'编译器''不能对CAS与CAS前面和后面的''任意内存操作''重排序'。

下面我们来分析在常见的intel x86处理器中，
CAS是如何同时具有volatile读和volatile写的内存语义的。

下面是sun.misc.Unsafe类的compareAndSwapInt()方法的源代码：

public final native boolean compareAndSwapInt(Object o, long offset,
                                              int expected,
                                              int x);
可以看到这是个本地方法调用。
这个本地方法在openjdk中依次调用的c++代码为：
unsafe.cpp，atomic.cpp和atomicwindowsx86.inline.hpp。
这个本地方法的最终实现在openjdk的如下位置：
openjdk-7-fcs-src-b147-27jun2011\openjdk\hotspot\src\oscpu\windowsx86\vm\ atomicwindowsx86.inline.hpp
（对应于windows操作系统，X86处理器）。
下面是对应于intel x86处理器的源代码的片段：

// Adding a lock prefix to an instruction on MP machine
// VC++ doesn't like the lock prefix to be on a single line
// so we can't insert a label after the lock prefix.
// By emitting a lock prefix, we can define a label after it.
#define LOCK_IF_MP(mp) __asm cmp mp, 0  \
                       __asm je L0      \
                       __asm _emit 0xF0 \
                       __asm L0:
 
inline jint     Atomic::cmpxchg    (jint     exchange_value, volatile jint*     dest, jint     compare_value) {
  // alternative for InterlockedCompareExchange
  int mp = os::is_MP();
  __asm {
    mov edx, dest
    mov ecx, exchange_value
    mov eax, compare_value
    LOCK_IF_MP(mp)
    cmpxchg dword ptr [edx], ecx
  }
}
如上面源代码所示，程序会根据当前处理器的类型来决定是否为cmpxchg指令添加lock前缀。
如果程序是在多处理器上运行，就为cmpxchg指令加上lock前缀（lock cmpxchg）。
反之，如果程序是在单处理器上运行，
就省略lock前缀（单处理器自身会维护单处理器内的顺序一致性，不需要lock前缀提供的内存屏障效果）。

intel的手册对lock前缀的说明如下：

确保对内存的读-改-写操作原子执行。在Pentium及Pentium之前的处理器中，
带有lock前缀的指令在执行期间会锁住总线，使得其他处理器暂时无法通过总线访问内存。
很显然，这会带来昂贵的开销。从Pentium 4，Intel Xeon及P6处理器开始，
intel在原有总线锁的基础上做了一个很有意义的优化：
如果要访问的内存区域（area of memory）
在lock前缀指令执行期间已经在处理器内部的缓存中被锁定
（即包含该内存区域的缓存行当前处于独占或以修改状态），
并且该内存区域被完全包含在单个缓存行（cache line）中，
那么处理器将直接执行该指令。由于在指令执行期间该缓存行会一直被锁定，
其它处理器无法读/写该指令要访问的内存区域，因此能保证指令执行的原子性。
这个操作过程叫做缓存锁定（cache locking），
缓存锁定将大大降低lock前缀指令的执行开销，
但是当多处理器之间的竞争程度很高或者指令访问的内存地址未对齐时，
仍然会锁住总线。
禁止该指令与之前和之后的读和写指令重排序。
把写缓冲区中的所有数据刷新到内存中。
上面的第2点和第3点所具有的内存屏障效果，
足以同时实现volatile读和volatile写的内存语义。

经过上面的这些分析，
现在我们终于能明白为什么JDK文档说CAS同时具有volatile读和volatile写的内存语义了。

现在对公平锁和非公平锁的内存语义做个总结：

'公平锁和非公平锁''释放时'，最后'都要写一个volatile变量state'。
'公平锁获取时'，'首先会去读这个volatile变量'。
'非公平锁获取时'，'首先会用CAS更新''这个volatile变量',
'这个操作同时具有volatile读和volatile写的内存语义'。
从本文对ReentrantLock的分析可以看出，
锁释放-获取的内存语义的实现至少有下面两种方式：
'利用volatile变量的写-读所具有的''内存语义'。
'利用CAS'所'附带的volatile读和volatile写的''内存语义'。

'concurrent包的实现'
由于java的'CAS同时具有 volatile 读和volatile写的内存语义'，
'因此Java线程之间的通信'现在'有了下面四种方式'：

'A线程写volatile变量'，'随后B线程读''这个volatile变量'。
'A线程写volatile变量'，'随后B线程''用CAS更新''这个volatile变量'。
'A线程用CAS更新''一个volatile变量'，'随后B线程''用CAS更新这个volatile变量'。
'A线程用CAS更新''一个volatile变量'，'随后B线程''读这个volatile变量'。
'Java的CAS'会'使用'现代'处理器上提供的'高效机器级别'原子指令'，
这些原子指令'以原子方式''对内存执行读-改-写操作'，
这是'在多处理器中''实现同步的关键'
（从本质上来说，能够支持原子性读-改-写指令的计算机器，
是顺序计算图灵机的异步等价机器，
因此任何现代的多处理器都会去支持某种能对内存执行原子性读-改-写操作的原子指令）。
同时，'volatile变量的读/写'和'CAS''可以实现线程之间'的'通信'。
把这些特性整合在一起，就形成了整个concurrent包得以实现的基石。
如果我们仔细分析'concurrent包'的源代码实现，会发现'一个通用化的实现模式'：

'首先'，'声明共享变量为volatile'；
'然后'，'使用CAS的原子条件更新''来实现线程之间的同步'；
'同时'，'配合以volatile的读/写和CAS所具有的volatile读和写的内存语义'
来'实现线程之间的通信'。

'AQS'，'非阻塞数据结构'和'原子变量类'（java.util.concurrent.atomic包中的类），
'这些concurrent包中的基础类''都是使用这种模式来实现的'，
而'concurrent包中'的'高层类'又'是依赖于这些基础类'来'实现的'。
从整体来看，'concurrent包的实现示意图如下'：

synchronized实现原理

记得刚刚开始学习Java的时候，一遇到多线程情况就是synchronized，
相对于当时的我们来说synchronized是这么的神奇而又强大，
那个时候我们赋予它一个名字“同步”，
也成为了我们解决多线程情况的百试不爽的良药。
但是，随着我们学习的进行我们知道synchronized是一个重量级锁，
相对于Lock，它会显得那么笨重，
以至于我们认为它不是那么的高效而慢慢摒弃它。
诚然，随着Javs SE 1.6对synchronized进行的各种优化后，
synchronized并不会显得那么重了。
下面跟随LZ一起来探索synchronized的实现机制、
Java是如何对它进行了优化、锁优化机制、锁的存储结构和升级过程；

'实现原理'
synchronized可以'保证方法或者代码块在运行时'，
'同一时刻只有一个方法'可以'进入到临界区'，
同时它'还可以保证共享变量'的'内存可见性'

'Java中''每一个对象都可以作为锁'，'这是synchronized实现同步''的基础'：

'普通同步方法'，'锁是当前实例对象'
'静态同步方法'，'锁是当前类的class对象'
'同步方法块'，'锁是括号里面的对象'

'当一个线程访问同步代码块时'，'它首先'是'需要得到锁''才能执行同步代码'，
'当退出或者抛出异常时''必须要释放锁'，
那么'它是如何来实现这个机制的呢'？我们先看一段简单的代码：

public class SynchronizedTest {
    public synchronized void test1(){
    }

    public void test2(){
        synchronized (this){
        }
    }
}

利用javap工具查看生成的class文件信息来分析Synchronized的实现  

从上面可以看出，'同步代码块'是'使用monitorenter'和'monitorexit指令'实现的'，
'同步方法'（在这看不出来需要看JVM底层实现）'依靠的是''方法修饰符上的''ACC_SYNCHRONIZED''实现'。 

'同步代码块'：
'monitorenter指令''插入到同步代码块的''开始位置'，
'monitorexit指令''插入到同步代码块的''结束位置'，
'JVM需要保证''每一个monitorenter''都有一个monitorexit''与之相对应'。
'任何对象''都有一个monitor''与之相关联'，'当且一个monitor被持有之后'，
'他将处于锁定状态'。'线程执行到monitorenter指令时'，
'将会尝试获取对象所对应的''monitor所有权'，'即尝试获取对象的锁'； 

'同步方法'：
'synchronized方法'则会'被翻译成普通的方法调用和返回指令'
如:invokevirtual、areturn指令，
'在VM字节码层面'并'没有任何特别的指令'来'实现被synchronized修饰的方法'，
而是'在Class文件的方法表中''将该方法的access_flags字段中''的synchronized标志位置1'，
'表示该方法'是'同步方法''并使用调用该方法的对象或该方法所属的Class'
在JVM的内部对象表示Klass做为锁对象。

下面我们来继续分析，但是在深入之前我们需要了解两个重要的概念：

'Java对象头'，'Monitor'。
Java对象头和monitor是实现synchronized的基础！
下面就这两个概念来做详细介绍。

Java对象头
'synchronized用的锁'是'存在Java对象头里的'，那么'什么是Java对象头呢？'
'Hotspot虚拟机的对象头'主要'包括两部分数据'：'Mark Word'（标记字段）、
'Klass Pointer'（类型指针）。
其中'Klass Point'是'是对象指向它的''类元数据的指针'，
'虚拟机''通过这个指针'来'确定这个对象''是哪个类的实例'，
'Mark Word''用于存储对象''自身的运行时数据'，
'它是实现轻量级锁'和'偏向锁的关键'，所以下面将重点阐述

'Mark Word'。 
'Mark Word''用于存储对象自身的''运行时数据'，如哈希码（HashCode）、
'GC分代年龄'、'锁状态标志'、'线程持有的锁'、'偏向线程ID'、'偏向时间戳'等等。
'Java对象头''一般占有两个机器码'（在32位虚拟机中，1个机器码等于4字节，也就是32bit），
'但是''如果对象是数组类型'，则'需要三个机器码'，
'因为JVM虚拟机''可以通过Java对象的元数据信息''确定Java对象的大小'，
'但是''无法从数组的元数据'来'确认数组的大小'，所以'用一块'来'记录数组长度'。
下图是Java对象头的存储结构（32位虚拟机）： 

'对象头信息''是与对象自身定义的数据''无关的额外存储成本'，
'但是考虑到虚拟机的空间效率'，
'Mark Word''被设计成一个非固定的数据结构''以便在极小的空间内存''存储尽量多的数据'，
'它会根据对象的状态''复用自己的存储空间'，也就是说，
'Mark Word''会随着程序的运行''发生变化'，变化状态如下（32位虚拟机）： 


简单介绍了Java对象头，我们下面再看Monitor。

'Monitor'
'什么是Monitor？'我们'可以把它理解为''一个同步工具'，
'也可以描述为''一种同步机制'，它'通常被描述为一个对象'。 
'与一切皆对象一样'，'所有的Java对象''是天生的Monitor'，
'每一个Java对象''都有成为Monitor的潜质'，因为在Java的设计中 ，
'每一个Java对象''自打娘胎里出来''就带了一把看不见的锁'，它'叫做内部锁''或者Monitor锁'。 
'Monitor 是线程私有的数据结构'，'每一个线程''都有一个可用monitor record列表'，
'同时还有一个全局的可用列表'。
'每一个被锁住的对象''都会和一个monitor关联'
（'对象头的Mark Word中的''Lock Word指向''monitor的起始地址'），
'同时monitor中''有一个Owner字段''存放拥有该锁的线程的''唯一标识'，
'表示该锁''被这个线程占用'。

'Owner'：'初始时为NULL''表示当前''没有任何线程拥有该''monitor record'，
'当线程成功拥有该锁后''保存线程唯一标识'，'当锁被释放时''又设置为NULL'；

'EntryQ':'关联一个系统互斥锁'（semaphore），
'阻塞所有试图锁住monitor record失败的线程'。 

'RcThis':'表示blocked''或waiting''在该monitor record上的''所有线程的个数'。

'Nest':'用来实现重入锁的计数'。

'HashCode':'保存从对象头''拷贝过来的HashCode值'（可能还包含GC age）。

'Candidate':'用来避免''不必要的阻塞''或等待线程唤醒'，
'因为每一次只有一个线程''能够成功拥有锁'，
'如果每次''前一个释放锁的线程''唤醒所有''正在阻塞或等待的线程'，
'会引起不必要的''上下文切换'（'从阻塞''到就绪''然后因为竞争锁失败''又被阻塞'）
'从而导致性能严重下降'。
'Candidate''只有两种可能的值'
'0表示没有需要唤醒的线程'
'1表示要唤醒一个继任线程''来竞争锁'。 
摘自：Java中synchronized的实现原理与应用

我们知道'synchronized是重量级锁'，效率不怎么滴，
同时这个观念也一直存在我们脑海里，
不过在jdk 1.6中对synchronize的实现进行了各种优化，
使得它显得不是那么重了，那么JVM采用了那些优化手段呢？

'锁优化'
jdk1.6对锁的实现引入了大量的优化，
如'自旋锁、适应性自旋锁、锁消除、锁粗化、偏向锁、轻量级锁等技术'来'减少锁操作的开销'。 
'锁主要存在四中状态'，依次是：
'无锁状态'、'偏向锁状态'、'轻量级锁状态'、'重量级锁状态'，
他们会随着竞争的激烈而逐渐升级。注意'锁可以升级不可降级'，
这种策略是为了'提高获得锁和释放锁的效率'。

'自旋锁'
线程的阻塞和唤醒需要CPU从用户态转为核心态，
频繁的阻塞和唤醒对CPU来说是一件负担很重的工作，
势必会给系统的并发性能带来很大的压力。
同时我们发现在许多应用上面，对象锁的锁状态只会持续很短一段时间，
为了这一段很短的时间'频繁地阻塞和唤醒线程'是'非常不值得'的。
'所以引入自旋锁'。 

何谓自旋锁？ 
所谓'自旋锁'，'就是让该线程等待一段时间'，不会被立即挂起，
'看持有锁的线程''是否会很快释放锁'。
'怎么等待呢？执行一段无意义的循环即可（自旋）'。 
自旋等待不能替代阻塞，
先不说对处理器数量的要求（多核，貌似现在没有单核的处理器了），
虽然'它可以避免线程切换带来的开销'，'但是它占用了处理器的时间'。
如果持有锁的线程很快就释放了锁，那么自旋的效率就非常好，
反之，自旋的线程就会白白消耗掉处理的资源，
它不会做任何有意义的工作，典型的占着茅坑不拉屎，
这样反而会带来性能上的浪费。所以说，
自旋等待的时间（自旋的次数）必须要有一个限度，
如果自旋超过了定义的时间仍然没有获取到锁，则应该被挂起。 
'自旋锁'在JDK 1.4.2中引入，默认关闭，但是可以使用-XX:+UseSpinning开开启，
'在JDK1.6中默认开启'。
同时'自旋的默认次数为10次'，可以通过参数-XX:PreBlockSpin来调整； 
如果通过参数-XX:preBlockSpin来调整自旋锁的自旋次数，会带来诸多不便。
假如我将参数调整为10，
但是系统很多线程都是等你刚刚退出的时候就释放了锁（假如你多自旋一两次就可以获取锁），
你是不是很尴尬。
于是JDK1.6引入自适应的自旋锁，让虚拟机会变得越来越聪明。

'适应自旋锁'
JDK 1.6引入了更加聪明的自旋锁，即自适应自旋锁。
所谓自适应就意味着'自旋的次数'不再是固定的，
它是'由前一次在同一个锁上的自旋时间''及锁的拥有者的状态来决定'。
它怎么做呢？'线程如果自旋成功'了，那么'下次自旋的次数会更加多'，
因为虚拟机认为既然上次成功了，那么此次自旋也很有可能会再次成功，
那么它就会允许自旋等待持续的次数更多。
反之，'如果对于某个锁'，'很少有自旋能够成功的'，
那么在以后要或者这个锁的时候'自旋的次数会减少''甚至省略掉自旋过程'，
以免浪费处理器资源。 
有了自适应自旋锁，随着程序运行和性能监控信息的不断完善，
虚拟机对程序锁的状况预测会越来越准确，
虚拟机会变得越来越聪明。

一、'自旋锁的概念'
首先是一种锁，与互斥锁相似，基本作用是用于线程（进程）之间的同步。
与普通锁不同的是，'一个线程A在获得普通锁后'，
如果'再有线程B试图获取锁'，那么这个'线程B将会挂起'（阻塞）；
试想下，如果两个线程资源竞争不是特别激烈，
而'处理器阻塞一个线程''引起的线程上下文的切换的代价''高于等待资源的代价'的时候
（锁的已保持者保持锁时间比较短），
那么'线程B可以不放弃CPU时间片'，而是'在“原地”忙等'，
'直到锁的持有者释放了该锁'，这就是自旋锁的原理，可见'自旋锁是一种非阻塞锁'。

二、自旋锁可能引起的问题：
1.'过多占据CPU时间'：如果'锁的当前持有者''长时间不释放该锁'，
那么'等待者将长时间的占据cpu时间片'，'导致CPU资源的浪费'，
'因此可以设定一个时间'，'当锁持有者''超过这个时间不释放锁时'，
'等待者会放弃CPU时间片阻塞'；

2.'死锁问题'：试想一下，'有一个线程连续两次试图获得自旋锁'（比如在递归程序中），
'第一次这个线程获得了该锁'，'当第二次试图加锁的时候'，
检测到'锁已被占用'（其实是被自己占用），'那么这时'，
'线程会一直等待自己释放该锁'，'而不能继续执行'，这样'就引起了死锁'。
'因此递归程序''使用自旋锁''应该遵循以下原则'：
'递归程序''决不能在持有自旋锁时''调用它自己'，
'也决不能''在递归调用时''试图获得''相同的自旋锁'。

'锁消除'
'为了保证数据的完整性'，我们'在进行操作时''需要对这部分操作''进行同步控制'，
但是在'有些情况下'，'JVM检测到''不可能存在共享数据竞争'，
这是'JVM会对这些同步锁''进行锁消除'。锁消除的'依据是逃逸分析的数据支持'。 
如果不存在竞争，为什么还需要加锁呢？
所以'锁消除可以节省毫无意义的请求锁的时间'。
变量是否逃逸，对于虚拟机来说需要使用数据流分析来确定，
但是对于我们程序员来说这还不清楚么？
我们会在明明知道不存在数据竞争的代码块前加上同步吗？
但是有时候程序并不是我们所想的那样？我们虽然没有显示使用锁，
但是我们在使用'一些JDK的内置API'时，如StringBuffer、Vector、HashTable等，
这个时候'会存在隐形的加锁操作'。
比'如StringBuffer的append()方法'，'Vector的add()方法'：

	public void vectorTest(){
		Vector<String> vector = new Vector<String>();
		for(int i = 0 ; i < 10 ; i++){
			vector.add(i + "");
		}
		System.out.println(vector);
	}

在运行这段代码时，JVM可以明显检测到变量vector没有逃逸出方法vectorTest()之外，
所以JVM可以大胆地将vector内部的加锁操作消除。

'锁粗化'
我们知道在'使用同步锁的时候'，
'需要让同步块的作用范围''尽可能小'—'仅在共享数据的实际作用域中''才进行同步'，
这样做的'目的是为了''使需要同步的操作数量''尽可能缩小'，'如果存在锁竞争'，
'那么等待锁的线程''也能尽快拿到锁'。 
在'大多数的情况下，上述观点是正确的'，LZ也一直坚持着这个观点。
'但是如果一系列'的'连续加锁解锁操作'，'可能会导致''不必要的性能损耗'，
所以'引入锁粗话的概念'。 
'锁粗话'概念比较好理解，'就是将多个连续的加锁、解锁操作''连接在一起'，
'扩展成一个范围更大的锁'。
'如上面实例'：'vector每次add的时候''都需要加锁操作'，
'JVM检测到对同一个对象'（vector）'连续加锁、解锁操作'，
'会合并一个更大范围的加锁、解锁操作'，'即加锁解锁操作''会移到for循环之外'。

'轻量级锁'
'引入轻量级锁的主要目的''是在没有多线程竞争的前提下'，
'减少传统的重量级锁''使用操作系统互斥量''产生的性能消耗'。
'当关闭偏向锁功能''或者多个线程竞争偏向锁''导致偏向锁升级为轻量级锁'，
则'会尝试获取轻量级锁'，其步骤如下： 

'获取锁'
'判断当前对象''是否处于无锁状态'（hashcode、0、01），
'若是'，则'JVM首先将在当前线程的栈帧中''建立一个名为锁记录（Lock Record）的空间'，
'用于存储锁对象目前的Mark Word''的拷贝'
（官方把这份拷贝加了一个Displaced前缀，即Displaced Mark Word）；否则执行步骤（3）；

'JVM利用CAS操作''尝试将对象的Mark Word''更新为指向Lock Record的指正'，
'如果成功表示竞争到锁'，'则将锁标志位变成00'（表示此对象处于轻量级锁状态），
'执行同步操作'；'如果失败则执行步骤'（3）；
'判断当前对象的Mark Word''是否指向当前线程的栈帧'，
'如果是''则表示当前线程''已经持有当前对象的锁'，'则直接执行同步代码块'；
'否则只能说明''该锁对象''已经被其他线程抢占了'，
'这时轻量级锁''需要膨胀为重量级锁'，
'锁标志位变成10'，'后面等待的线程''将会进入阻塞状态'；

'释放锁'
'轻量级锁的释放''也是通过CAS操作来进行的'，主要步骤如下：

'取出在获取轻量级锁''保存在Displaced Mark Word中的数据'；
'用CAS操作将取出的数据''替换到当前对象的Mark Word中'，
'如果成功，则说明释放锁成功'，否则执行（3）；
'如果CAS操作替换失败'，'说明有其他线程尝试获取该锁'，
'则需要在释放锁的同时''需要唤醒被挂起的线程'。
'对于轻量级锁'，'其性能提升的依据是''“对于绝大部分的锁'，
'在整个生命周期内''都是不会存在竞争的”'，'如果打破这个依据''则除了互斥的开销外'，
'还有额外的CAS操作'，'因此在有多线程竞争的情况下'，'轻量级锁比重量级锁更慢'；

'偏向锁'
'引入偏向锁主要目的是'：
'为了在无多线程竞争的情况下''尽量减少不必要的轻量级锁执行路径'。
'上面提到了轻量级锁的加锁解锁操作''是需要依赖多次CAS原子指令的'。
那么'偏向锁是如何来减少不必要的CAS操作呢'？
我们'可以查看Mark work的结构'就明白了。
'只需要检查是否为偏向锁'、'锁标识'为'以及ThreadID即可'，处理流程如下：

'获取锁'
'检测Mark Word是否为可偏向状态'，'即是否为偏向锁1'，'锁标识位为01'；
'若为可偏向状态'，'则测试线程ID''是否为当前线程ID'，
如果是，则执行步骤（5），否则执行步骤（3）；
'如果线程ID不为当前线程ID'，'则通过CAS操作''竞争锁'，'竞争成功'，
'则将Mark Word的线程ID''替换为当前线程ID'，否则执行线程（4）；
'通过CAS竞争锁失败'，'证明当前存在多线程竞争情况'，
'当到达全局安全点'，'获得偏向锁的线程被挂起'，
'偏向锁升级为轻量级锁'，'然后被阻塞在安全点的线程''继续往下执行同步代码块'；
执行同步代码块

'释放锁'
'偏向锁的释放''采用了一种只有竞争''才会释放锁的机制'，
'线程是不会主动去释放偏向锁'，'需要等待其他线程来竞争'。
'偏向锁的撤销''需要等待全局安全点'（这个时间点是上没有正在执行的代码）。

其步骤如下：
'暂停拥有偏向锁的线程'，'判断锁对象石''是否还处于被锁定状态'；
'撤销偏向锁'，'恢复到无锁状态'（01）'或者轻量级锁的状态'；
下图是偏向锁的获取和释放流程 

重量级锁
'重量级锁''通过对象内部的监视器（monitor）实现'，
'其中monitor的本质''是依赖于底层操作系统的Mutex Lock实现'，
'操作系统实现线程之间的切换''需要从用户态到内核态的切换'，'切换成本非常高'。


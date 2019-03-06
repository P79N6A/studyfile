一行一行源码分析清楚AbstractQueuedSynchronizer

在分析 Java 并发包 java.util.concurrent 源码的时候，
少不了需要了解 AbstractQueuedSynchronizer（以下简写'AQS'）这个抽象类，
因为它'是Java并发包的基础工具类'，
'是实现 ReentrantLock、CountDownLatch、Semaphore、FutureTask''等类的基础'。

Google 一下 AbstractQueuedSynchronizer，我们可以找到很多关于 AQS 的介绍，
但是很多都没有介绍清楚，因为大部分文章没有把其中的一些关键的细节说清楚。

本文将从ReentrantLock的公平锁源码出发，
分析下 AbstractQueuedSynchronizer 这个类是怎么工作的，
希望能给大家提供一些简单的帮助。

申明以下几点：
1本文有点长，但是很简单很简单很简单，主要面向读者对象为并发编程的初学者，
或者想要阅读java并发包源码的开发者。

2建议在电脑上阅读，如果你想好好地理解所有的细节，而且你从来没看过相关的分析，
你可能至少需要 20 分钟仔细看所有的描述，
本文后面的 1/3 以上很简单，前面的 1/4 更简单，中间的部分要好好看。

3如果你不知道为什么要看这个，我想告诉你，即使你看懂了所有的细节，
你可能也不能把你的业务代码写得更好

4源码环境 JDK1.7，看到不懂或有疑惑的部分，最好能自己打开源码看看。
Doug Lea 大神的代码写得真心不错。

5有很多英文注释我没有删除，这样读者可以参考着英文说的来，万一被我忽悠了呢

6本文不分析共享模式，这样可以给读者减少很多负担，只要把独占模式看懂，
共享模式读者应该就可以顺着代码看懂了。
而且也不分析 condition 部分，所以应该说很容易就可以看懂了。

7本文大量使用我们平时用得最多的 ReentrantLock 的概念，
本质上来说是不正确的，读者应该清楚，AQS 不仅仅用来实现锁，
只是希望读者可以用锁来联想 AQS 的使用场景，降低读者的阅读压力

8ReentrantLock 的公平锁和非公平锁只有一点点区别，没有任何阅读压力

9你需要提前知道什么是 CAS(CompareAndSet)

CLH队列
此篇博客所有源码均来自JDK 1.8

'AQS'内部维护着'一个''FIFO队列'，该队列就'是CLH同步队列'。

'CLH同步队列是一个'FIFO'双向队列'，'AQS依赖它'来'完成同步状态的管理'，
'当前线程'如果'获取同步状态失败时'，
'AQS则会将''当前线程'已经'等待状态'等信息'构造成一个节点'（Node）并'将其加入到CLH同步队列'，
'同时会阻塞当前线程'，'当同步状态释放时'，'会把首节点唤醒'（公平锁），
'使其再次尝试获取同步状态'。

在'CLH同步队列中'，'一个节点表示一个线程'，它'保存着线程的'引用（thread）、
'状态'（waitStatus）、'前驱'节点（prev）、'后继'节点（next），其定义如下：

static final class Node {
    /** 共享 */
    static final Node SHARED = new Node();

    /** 独占 */
    static final Node EXCLUSIVE = null;

    因为'超时或者中断'，'节点会被设置为取消状态'，
    '被取消的节点'时'不会参与到竞争中'的，
    他会'一直保持取消状态'不会转变为其他状态；
    static final int CANCELLED =  1;
    
    后继节点的线程'处于等待状态'，
    而'当前节点的线程''如果释放了同步状态'或者被取消，
    将'会通知后继节点'，'使后继节点的线程''得以运行'
    static final int SIGNAL    = -1;

    '节点在等待队列中'，节点'线程等待在Condition上'，
    '当其他线程'对Condition'调用了signal()后'，
    改'节点'将'会从等待队列中''转移到同步队列中'，
    '加入到同步状态的获取中'
    static final int CONDITION = -2;

    '表示下一次共享式同步状态'
    '获取将会无条件地传播下去'
    static final int PROPAGATE = -3;

    /** 等待状态 */
    volatile int waitStatus;

    /** 前驱节点 */
    volatile Node prev;

    /** 后继节点 */
    volatile Node next;

    /** 获取同步状态的线程 */
    volatile Thread thread;

    Node nextWaiter;

    final boolean isShared() {
        return nextWaiter == SHARED;
    }

    final Node predecessor() throws NullPointerException {
        Node p = prev;
        if (p == null)
            throw new NullPointerException();
        else
            return p;
    }

    Node() {
    }

    Node(Thread thread, Node mode) {
        this.nextWaiter = mode;
        this.thread = thread;
    }

    Node(Thread thread, int waitStatus) {
        this.waitStatus = waitStatus;
        this.thread = thread;
    }
}

入列
学了数据结构的我们，'CLH队列入列'是再简单不过了，无非'就是tail指向新节点'、
'新节点的prev指向''当前最后的节点'，'当前最后节点'的next'新节点'。
代码我们可以'看看addWaiter(Node node)方法'：

private Node addWaiter(Node mode) {
    //新建Node
    Node node = new Node(Thread.currentThread(), mode);
    快速'尝试添加尾节点'
    Node pred = tail;
    if (pred != null) {
        node.prev = pred;
        'CAS设置尾节点'
        if (compareAndSetTail(pred, node)) {
            pred.next = node;
            return node;
        }
    }
    //多次尝试
    enq(node);
    return node;
}

addWaiter(Node node)'先'通过'快速尝试设置尾节点'，'如果失败'，
则'调用enq(Node node)方法设置尾节点'

    private Node enq(final Node node) {
        '多次尝试'，'直到成功'为止
        for (;;) {
            Node t = tail;
            'tail不存在'，'设置为首节点'
            if (t == null) {
                if (compareAndSetHead(new Node()))
                    tail = head;
            } else {
                '设置尾节点'
                node.prev = t;
                if (compareAndSetTail(t, node)) {
                    t.next = node;
                    return t;
                }
            }
        }
    }

在'上面代码中'，'两个方法''都是通过一个CAS方法'compareAndSetTail(Node expect, Node update)
来'设置尾节点'，'该方法可以确保''节点是线程安全添加的'。
在'enq(Node node)方法中'，'AQS通过“死循环”的方式'来'保证节点可以正确添加'，
只有成功添加后，当前线程才会从该方法返回，否则会一直执行下去。

出列
CLH同步队列遵循FIFO，'首节点'的线程'释放同步状态后'，'将会唤醒'它的'后继节点'（next），
而'后继节点'将'会在获取同步状态'成功'时''将自己设置为首节点'，
这个过程非常简单，head执行该节点并断开原首节点的next和当前节点的prev即可，
注意在这个过程是不需要使用CAS来保证的，
因为只有一个线程能够成功获取到同步状态。过程图如下：

'AQS 结构'
先来看看 AQS 有哪些属性，搞清楚这些基本就知道 AQS 是什么套路了，毕竟可以猜嘛！

	'头结点'，你直接把它当做 '当前持有锁的线程' 可能是最好理解的
	private transient volatile Node head;

	阻塞的'尾节点'，'每个新的节点进来'，'都插入到最后'，也就'形成了'一个'隐视的链表'
	private transient volatile Node tail;
	
	'这个是最重要的'，不过也是最简单的，代表'当前锁的状态'，'0代表没有被占用'，
	'大于0代表''有线程持有'当前锁
	之所以说'大于0，而不是等于1'，是'因为锁可以重入'嘛，'每次重入都加上1'
	private volatile int state;
	
	'代表当前'持有'独占锁的线程'，举个最重要的使用例子，因为锁可以重入
	reentrantLock.lock()可以嵌套调用多次，
	所以每次'用这个来判断''当前线程是否''已经拥有了锁'
	//if (currentThread == getExclusiveOwnerThread()) {state++}
	private transient Thread exclusiveOwnerThread; //继承自AbstractOwnableSynchronizer
	怎么样，看样子应该是很简单的吧，毕竟也就四个属性啊。

AbstractQueuedSynchronizer 的'等待队列'示意'如下所示'，注意了，
'之后分析过程'中'所说的 queue'，也'就是阻塞队列''不包含 head'，
不包含 head，不包含 head。

'等待队列中每个线程''被包装成一个node'，'数据结构是链表'，一起看看源码吧：

static final class Node {
    /** Marker to indicate a node is waiting in shared mode */
     '标识节点'当前'在共享模式下'
    static final Node SHARED = new Node();
    
    /** Marker to indicate a node is waiting in exclusive mode */
     '标识节点'当前'在独占模式下'
    static final Node EXCLUSIVE = null;
 
     ======== '下面的几个int常量'是'给waitStatus用的' ===========
    /** waitStatus value to indicate thread has cancelled */
     代码'此线程''取消了争抢这个锁'
    static final int CANCELLED =  1;
     
    /** waitStatus value to indicate successor's thread needs unparking */
     官方的描述是，其'表示'当前node的'后继节点'对应的线程'需要被唤醒'
    static final int SIGNAL    = -1;
    /** waitStatus value to indicate thread is waiting on condition */
     //本文不分析condition，所以略过吧，下一篇文章会介绍这个
    static final int CONDITION = -2;
    /**
    waitStatus value to indicate the next acquireShared should
    unconditionally propagate
     */
    //同样的不分析，略过吧
    static final int PROPAGATE = -3;
    // =====================================================
 
     '取值为上面的1、-1、-2、-3，或者0'(以后会讲到)
     这么理解，暂时只需要知道'如果'这个值 '大于0' '代表此线程取消了等待'，
     也许就是说半天抢不到锁，不抢了，ReentrantLock是可以指定timeouot的。。。
    volatile int waitStatus;
    // '前驱节点的引用'
    volatile Node prev;
    // '后继节点的引用'
    volatile Node next;
    // '这个就是线程本尊'
    volatile Thread thread;
 
}
Node 的数据结构其实也挺简单的，就是 'thread + waitStatus + pre + next' 四个属性而已，
大家先要有这个概念在心里。

上面的是基础知识，后面会多次用到，心里要时刻记着它们，心里想着这个结构图就可以了。
下面，我们开始说 ReentrantLock 的公平锁。多嘴一下，我说的阻塞队列不包含 head 节点。

首先，我们先看下'ReentrantLock的使用方式'。

// 我用个web开发中的service概念吧
public class OrderService {
     '使用static'，这样'每个线程拿到的''是同一把锁'，
	 当然，spring mvc中service默认就是单例，别纠结这个
    private static ReentrantLock reentrantLock = new ReentrantLock(true);
 
    public void createOrder() {
         比如我们'同一时间'，'只允许一个线程创建订单'
        reentrantLock.lock();
         通常，'lock 之后紧跟着 try 语句'
        try {
             '这块代码同一时间''只能有一个线程进来'(获取到锁的线程)，
             '其他的线程在lock()方法上阻塞'，'等待获取到锁'，再进来
            // 执行代码...
            // 执行代码...
            // 执行代码...
        } finally {
             '释放锁'
            reentrantLock.unlock();
        }
    }
}
'ReentrantLock' '在内部用了内部类 Sync 来管理锁'，
所以'真正的获取锁和释放锁'是'由 Sync 的实现类'来'控制'的。

abstract static class Sync extends AbstractQueuedSynchronizer {
 
}
'Sync 有两个实现'，分别为 'NonfairSync'（非公平锁）和 'FairSync'（公平锁），
我们看 FairSync 部分。
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}

'线程抢锁'
很多人肯定开始嫌弃上面废话太多了，下面跟着代码走，我就不废话了。

static final class FairSync extends Sync {
    private static final long serialVersionUID = -3000897897090466540L;
    // 争锁
    final void lock() {
        acquire(1);
    }
    来自父类AQS，我直接贴过来这边，下面分析的时候同样会这样做，不会给读者带来阅读压力
    我们看到，这个方法，'如果tryAcquire'(arg) '返回true', 也'就结束了'。
    '否则，acquireQueued方法'会'将线程压到队列中'
    public final void acquire(int arg) { // 此时 arg == 1
         '首先调用tryAcquire(1)'一下，名字上就知道，这个只是试一试
         因为有可能'直接'就'成功'了呢，也就'不'需要'进队列排队'了，
         对于公平锁的语义就是：本来就没人持有锁，根本没必要进队列等待
         (又是挂起，又是等待被唤醒的)
        if (!tryAcquire(arg) &&
            'tryAcquire(arg)没有成功'，这个时候'需要把当前线程挂起'，'放到阻塞队列中'。
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg)) {
              selfInterrupt();
        }
    }
 
    /**
     * Fair version of tryAcquire.  Don't grant access unless
     * recursive call or no waiters or is first.
     */
     尝试'直接获取锁'，返回值是boolean，代表是否获取到锁
     '返回true'：1.'没有线程在等待锁'；2.重入锁，'线程本来就持有锁'，也就可以理所当然可以直接获取
     protected final boolean tryAcquire(int acquires) {
         final Thread current = Thread.currentThread();
         int c = getState();
         // state == 0 此时此刻没有线程持有锁
         if (c == 0) {
              虽然此时此刻'锁'是'可以用'的，但是这是公平锁，既然是公平，就得讲究先来后到，
              看'看有没有'别人'(其他节点)在队列中'等了半天了
             if (!hasQueuedPredecessors() &&
                  如果'没有线程在等待'，那'就用CAS尝试一下'，'成功了就获取到锁了'，
                  '不成功'的话，只能'说明'一个问题，就在刚刚几乎同一时刻'有个线程抢先了' =_=
                  因为刚刚还没人的，我判断过了
                 compareAndSetState(0, acquires)) {

                  到这里就是'获取到锁'了，'标记一下'，告诉大家，现在是我占用了锁
                 setExclusiveOwnerThread(current);
                 return true;
             }
         }
         会'进入这个else if'分支，'说明是重入'了，需要操作：'state=state+1'
         else if (current == getExclusiveOwnerThread()) {
             int nextc = c + acquires;
             if (nextc < 0)
                 throw new Error("Maximum lock count exceeded");
             setState(nextc);
             return true;
         }
          如果'到这里'，说明前面的if和else if都没有返回true，'说明没有获取到锁'
          '回到上面一个外层调用方法'继续看:
          if (!tryAcquire(arg) 
                 && acquireQueued(addWaiter(Node.EXCLUSIVE), arg)) 
              selfInterrupt();
         return false;
     }

      '假设tryAcquire(arg) 返回false'，那么代码'将执行'：
      'acquireQueued(addWaiter(Node.EXCLUSIVE), arg)'，
      这个方法，'首先需要执行：addWaiter(Node.EXCLUSIVE)'

     /**
      * Creates and enqueues node for current thread and given mode.
      *
      * @param mode Node.EXCLUSIVE for exclusive, Node.SHARED for shared
      * @return the new node
      */
      '此方法的作用'是'把线程包装成node'，同时'进入到队列中'
      '参数mode此时是Node.EXCLUSIVE'，'代表独占模式'
     private Node addWaiter(Node mode) {
         Node node = new Node(Thread.currentThread(), mode);
         // Try the fast path of enq; backup to full enq on failure
          以下几行代码想把'当前node加到链表的最后面'去，也就是'进到阻塞队列的最后'
         Node pred = tail;

          tail!=null => '队列不为空'(tail==head的时候，其实队列是空的，不过不管这个吧)
         if (pred != null) { 
              '设置'自己的'前驱' 为当前的队尾节点
             node.prev = pred; 
              '用CAS''把自己''设置为队尾', 如果成功后，tail == node了
             if (compareAndSetTail(pred, node)) { 
                  进到这里说明'设置成功'，当前node==tail, '将自己''与之前的队尾相连'，
                  上面已经有 node.prev = pred
                  加上下面这句，也就实现了和之前的尾节点双向连接了
                 pred.next = node;
                  线程入队了，可以返回了
                 return node;
             }
         }
          仔细看看上面的代码，如果会到这里，
          说明 'pred==null'(队列是空的) '或者 CAS失败'(有线程在竞争入队)
          读者一定要跟上思路，如果没有跟上，建议先不要往下读了，往回仔细看，否则会浪费时间的
          '用自旋的方式入队'
         enq(node);
         return node;
     }

     /**
      * Inserts node into queue, initializing if necessary. See picture above.
      * @param node the node to insert
      * @return node's predecessor
      */
      采'用自旋的方式入队'
      之前说过，到这个方法只有两种可能：等待'队列为空'，或者'有线程竞争入队'，
      自旋在这边的语义是：CAS设置tail过程中，竞争一次'竞争不到'，我'就多次竞争'，'总会排到的'
     private Node enq(final Node node) {
         for (;;) {
             Node t = tail;
              之前说过，队列为空也会进来这里
             if (t == null) { // Must initialize
                  'CAS初始化head节点'
                  细心的读者会知道原来head和tail初始化的时候都是null，反正我不细心
                  还是一步CAS，你懂的，现在可能是很多线程同时进来呢
                 if (compareAndSetHead(new Node()))
                      给后面用：这个时候head节点的waitStatus==0, 
                      	看new Node()构造方法就知道了
                      这个时候有了head，但是tail还是null，设置一下，
                      把tail指向head，放心，马上就有线程要来了，到时候tail就要被抢了
                      注意：这里只是'设置了tail=head'，这里可'没return'哦，没有return，没有return
                      所以，'设置完了以后'，'继续for循环'，下次'就到'下面的'else分支'了
                     tail = head;
             } else {
                  下面几行，和上一个方法addWaiter是一样的，
                  只是这个套在无限循环里，反正就是将当前线程排到队尾，
                  有线程竞争的话排不上重复排
                 node.prev = t;
                  '用CAS''把自己''设置为队尾'
                 if (compareAndSetTail(t, node)) {
                	 '设置成功'，'将自己''与之前的队尾相连'
                     t.next = node;
                     return t;
                 }
             }
         }
     }

      现在，又回到这段代码了
      if (!tryAcquire(arg)
             && acquireQueued(addWaiter(Node.EXCLUSIVE), arg)) 
          selfInterrupt();

      下面这个方法，参数node，经过addWaiter(Node.EXCLUSIVE)，此时已经进入阻塞队列
      注意一下：如果acquireQueued(addWaiter(Node.EXCLUSIVE), arg))返回true的话，
      意味着上面这段代码将进入selfInterrupt()，所以正常情况下，下面应该返回false
      这个方法非常重要，应该说真正的'线程挂起'，'然后被唤醒后''去获取锁'，'都在这个方法里'了
     final boolean acquireQueued(final Node node, int arg) {
         boolean failed = true;
         try {
             boolean interrupted = false;
             for (;;) {
                 final Node p = node.predecessor();
                  'p == head''说明'当前节点虽然进到了阻塞队列，但是是阻塞队列的第一个，
                  因为'它的前驱是head'
                  注意，阻塞队列不包含head节点，head一般指的是占有锁的线程，
                  head后面的才称为阻塞队列
                  所以当前节点可以去试抢一下锁
                  这里我们说一下，为什么可以去试试：
                  首先，'它是队头'，这个是第一个条件，
                  其次，'当前'的'head'有'可能是刚刚初始化的node'，
                  'enq(node)' 方法'里面有提到'，'head是延时初始化的'，
                  而且new Node()的时候没有设置任何线程
                  也就是说，'当前'的'head''不属于任何一个线程'，所以'作为队头'，'可以去试一试'，
                  tryAcquire已经分析过了, 忘记了请往前看一下，就是简单'用CAS试操作一下state'
                 if (p == head && tryAcquire(arg)) {
                     setHead(node);
                     p.next = null; // help GC
                     failed = false;
                     return interrupted;
                 }
                 到这里，说明上面的if分支没有成功，'要么当前node本来就不是队头'，
                 '要么就是tryAcquire(arg)没有抢赢别人'，继续往下看
                 if (shouldParkAfterFailedAcquire(p, node) &&
                     parkAndCheckInterrupt())
                     interrupted = true;
             }
         } finally {
             if (failed)
                 cancelAcquire(node);
         }
     }

     /**
      * Checks and updates status for a node that failed to acquire.
      * Returns true if thread should block. This is the main signal
      * control in all acquire loops.  Requires that pred == node.prev
      *
      * @param pred node's predecessor holding status
      * @param node the node
      * @return {@code true} if thread should block
      */
      刚刚说过，会到这里就是没有抢到锁呗，
      这个方法说的是：当前线程'没有抢到锁'，'是否需要挂起当前线程'？
      '第一个参数'是'前驱节点'，'第二个参数'才'是'代表'当前线程的节点'
     private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
         int ws = pred.waitStatus;
          '前驱节点的 waitStatus == -1' ，说明前'驱节点状态正常'，
          '当前线程需要挂起，直接可以返回true'
         if (ws == Node.SIGNAL)
             /*
              * This node has already set status asking a release
              * to signal it, so it can safely park.
              */
             return true;

          '前驱节点' waitStatus'大于0' ，之前说过，大于0 '说明前驱节点''取消了排队'。
          这里需要知道这点：
          '进入阻塞队列''排队的线程'会'被挂起'，而'唤醒的操作'是'由前驱节点完成'的。
          所以'下面'这块代码说的是'将当前节点的prev''指向waitStatus<=0的节点'，
          简单说，就是为了找个好爹，因为你还得依赖它来唤醒呢，如果前驱节点取消了排队，
          找前驱节点的前驱节点做爹，往前循环总能找到一个好爹的
         if (ws > 0) {
             do {
                 node.prev = pred = pred.prev;
             } while (pred.waitStatus > 0);
             pred.next = node;
         } else {
              仔细想想，如果进入到这个分支意味着什么
              前驱节点的'waitStatus'不等于-1和1，那也就是只'可能是0，-2，-3'
              在我们前面的源码中，都没有看到有设置waitStatus的，
              所以每个新的node入队时，waitStatu都是0
              '用CAS将前驱节点的waitStatus''设置为'Node.SIGNAL(也就是'-1')
             compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
         }
         return false;
     }

     // private static boolean shouldParkAfterFailedAcquire(Node pred, Node node)
      这个方法结束根据返回值我们简单分析下：
      如果'返回true', 说明'前驱节点的waitStatus==-1'，'是正常情况'，
      那么当前线程需要被挂起，等待以后被唤醒
      我们也说过，以后是被前驱节点唤醒，
      就等着前驱节点拿到锁，然后释放锁的时候叫你好了
      '如果返回false', 说明'当前不需要被挂起'，为什么呢？往后看

      跳回到前面是这个方法
     // if (shouldParkAfterFailedAcquire(p, node) &&
     //                parkAndCheckInterrupt())
     //                interrupted = true;

      1. '如果shouldParkAfterFailedAcquire(p, node)返回true'，
      '那么需要执行parkAndCheckInterrupt()':

      这个方法很简单，因为前面返回true，所以需要挂起线程，'这个方法'就'是'负责'挂起线程的'
      这里'用'了LockSupport.'park'(this)'来挂起线程'，然后就停在这里了，等待被唤醒=======
     private final boolean parkAndCheckInterrupt() {
         LockSupport.park(this);
         return Thread.interrupted();
     }

     2. 接下来说说'如果''shouldParkAfterFailedAcquire(p, node)''返回false'的情况

     仔细看shouldParkAfterFailedAcquire(p, node)，我们可以发现，
     其实'第一次'进来的时候，一般都不会返回true的，原因很简单，
     前驱节点的waitStatus=-1是依赖于后继节点设置的。
     也就是说，我都'还没给前驱设置-1'呢，怎么可能是true呢，
     但是要看到，这个方法是套在循环里的，所以'第二次进来'的时候状态'就是-1了'。

     解释下为什么'shouldParkAfterFailedAcquire'(p, node)返回false的时候'不直接挂起线程'：
     => 是为了应对在'经过这个方法'后，'node'已经'是''head的直接后继节点'了。
     剩下的读者自己想想吧。
 }

说到这里，也就明白了，多看几遍 final boolean acquireQueued(final Node node, int arg) 
这个方法吧。自己推演下各个分支怎么走，哪种情况下会发生什么，走到哪里。

'解锁操作'
最后，就是还需要介绍下唤醒的动作了。我们知道，'正常情况下'，如果'线程没获取到锁'，
线程会'被' LockSupport.'park'(this);'挂起'停止，'等待被唤醒'。

'唤醒'的代码还是'比较简单'的，你如果上面加锁的都看懂了，下面都不需要看就知道怎么回事了
public void unlock() {
    sync.release(1);
}

public final boolean release(int arg) {
    if (tryRelease(arg)) {
        Node h = head;
        if (h != null && h.waitStatus != 0)
            unparkSuccessor(h);
        return true;
    }
    return false;
}

 回到ReentrantLock'看tryRelease方法'
protected final boolean tryRelease(int releases) {
    int c = getState() - releases;
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    // 是否完全释放锁
    boolean free = false;
     其实就是重入的问题，'如果c==0'，也就是说'没有嵌套锁'了，
     '可以释放'了，'否则'还'不能释放掉'
    if (c == 0) {
        free = true;
        setExclusiveOwnerThread(null);
    }
    setState(c);
    return free;
}

/**
 * Wakes up node's successor, if one exists.
 *
 * @param node the node
 */
 '唤醒后继节点'
 从上面调用处知道，'参数node是head头结点'
private void unparkSuccessor(Node node) {
    int ws = node.waitStatus;
    '如果head节点'当前'waitStatus<0', '将其修改为0'
    if (ws < 0)
        compareAndSetWaitStatus(node, ws, 0);
     '下面'的代码就是'唤醒后继节点'，但是有'可能后继节点''取消了等待'（waitStatus==1）
     '从队尾往前'找，'找到waitStatus<=0的所有节点中''排在最前面的'
    Node s = node.next;
    if (s == null || s.waitStatus > 0) {
        s = null;
        从后往前找，仔细看代码，'不必担心'中间有'节点取消'(waitStatus==1)'的情况'
        for (Node t = tail; t != null && t != node; t = t.prev)
            if (t.waitStatus <= 0)
                s = t;
    }
    if (s != null)
        '唤醒线程'
        LockSupport.unpark(s.thread);
}
唤醒线程以后，'被唤醒的线程'将从以下代码中'继续往前走'：

private final boolean parkAndCheckInterrupt() {
    LockSupport.park(this); '刚刚线程'被'挂起在这里'了
    return Thread.interrupted();
}
又回到这个方法了：'acquireQueued(final Node node, int arg)'，'这个时候'，'node的前驱是head'了
好了，后面就不分析源码了，剩下的还有问题自己去仔细看看代码吧。

总结

'在并发环境下'，'加锁和解锁'需'要以下三个部件''的协调'：

1'锁状态'。我们要知道锁是不是被别的线程占有了，这个就是state的作用，
它'为0'的时候'代表没有线程占有锁'，'可以去争抢这个锁'，'用 CAS将state设为 1'，
'如果 CAS 成功'，说明'抢到了锁'，这样'其他线程就抢不到了'，
'如果锁重入的话'，'state进行+1就可以'，'解锁就是减 1'，'直到 state 又变为 0'，
'代表释放锁'，所以 lock() 和 unlock() 必须要配对啊。
'然后唤醒等待队列中'的'第一个线程'，'让其来占有锁'。

2'线程的阻塞和解除阻塞'。'AQS' 中'采用'了 LockSupport.'park'(thread) 来'挂起线程'，
'用unpark''来唤醒线程'。

3'阻塞队列'。'因为争抢锁的线程'可能'很多'，但是'只能有一个线程拿到锁'，
'其他的线程'都'必须等待'，这个时候'就需要一个 queue' 来'管理这些线程'，
'AQS' '用的是一个 FIFO' 的'队列'，就'是一个链表'，
'每个 node' '都持有后继节点的引用'。'AQS 采用了 CLH 锁'的变体'来实现'，
感兴趣的读者可以参考这篇文章关于CLH的介绍，写得简单明了。

示例图解析
下面属于回顾环节，用简单的示例来说一遍，如果上面的有些东西没看懂，
这里还有一次帮助你理解的机会。

'首先'，'第一个线程调用' reentrantLock.'lock'()，翻到最前面可以发现，
'tryAcquire(1)' '直接就返回 true' 了，结束。'只是设置了 state=1'，
'连 head 都没有初始化'，'更谈不上什么阻塞队列了'。
要是线程 1 调用 unlock() 了，才有线程 2 来，那世界就太太太平了，
完全没有交集嘛，那我还要 AQS 干嘛。

'如果线程 1 没有调用 unlock() 之前'，'线程 2 调用了 lock()', 
想想'会发生什么'？

'线程 2 会初始化 head【new Node()】'，
'同时线程 2' '也会插入到阻塞队列''并挂起'
('注意看'这里是一个' for 循环'，
而且'设置 head 和 tail 的部分''是不 return 的'，
'只有入队成功''才会跳出循环')

private Node enq(final Node node) {
    for (;;) {
        Node t = tail;
        if (t == null) { // Must initialize
            if (compareAndSetHead(new Node()))
                tail = head;
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;
            }
        }
    }
}
'首先'，是'线程2初始化 head 节点'，此时 'head==tail, waitStatus==0'

'然后线程 2 入队'：
'同时'我们'也要看此时节点的 waitStatus'，我们知道 'head 节点是线程 2 初始化的'，
'此时的 waitStatus 没有设置'， java '默认会设置为 0'，
但是'到shouldParkAfterFailedAcquire'这个方法'的时候'，'线程 2' '会把前驱节点'，
也就是 head '的waitStatus设置为-1'。

'那线程 2 节点''此时''的 waitStatus 是多少呢'，由于没有设置，所以'是 0'；
'如果线程3此时再进来'，'直接插到线程2的后面就可以了'，
'此时线程 3 的 waitStatus 是 0'，
'到shouldParkAfterFailedAcquire方法的时候'
'把前驱节点线程 2 的 waitStatus 设置为 -1'。

这里可以简单说下 'waitStatus 中'' SIGNAL(-1) 状态的意思'，
Doug Lea 注释的是：'代表后继节点''需要被唤醒'。
也就是说这个'waitStatus''其实代表的不是自己的状态'，
而'是后继节点的状态'，我们知道，每个'node''在入队的时候'，
都'会把前驱节点的状态改为SIGNAL'，'然后阻塞'，'等待被前驱唤醒'。
'这里涉及的''是两个问题'：'有线程取消了排队'、'唤醒操作'。
其实'本质是一样的'，
读者也可以顺着 “'waitStatus代表后继节点的状态'” 这种思路'去看一遍源码'。


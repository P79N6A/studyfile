本文关注以下几点内容：
1深入理解 ReentrantLock 公平锁和非公平锁的区别
2深入分析 AbstractQueuedSynchronizer 中的 ConditionObject
3深入理解 java 线程中断和 InterruptedException 异常

基本上本文把以上几点都说清楚了，
我假设读者看过上一篇文章中对 AbstractQueuedSynchronizer 的介绍 ，
当然如果你已经熟悉 AQS 中的独占锁了，那也可以直接看这篇。
各小节之间基本上没什么关系，大家可以只关注自己感兴趣的部分。

'公平锁和非公平锁'
'ReentrantLock' '默认采用非公平锁'，'除非你在构造方法'中'传入参数 true'。
public ReentrantLock() {
    sync = new NonfairSync();
}
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
'公平锁的lock方法'：
static final class FairSync extends Sync {
    final void lock() {
        acquire(1);
    }
    // AbstractQueuedSynchronizer.acquire(int arg)
    public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
    protected final boolean tryAcquire(int acquires) {
        final Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            1.'和非公平锁相比'，这里'多了一个判断'：'是否有线程在等待'
            if (!hasQueuedPredecessors() &&
                compareAndSetState(0, acquires)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        }
        else if (current == getExclusiveOwnerThread()) {
            int nextc = c + acquires;
            if (nextc < 0)
                throw new Error("Maximum lock count exceeded");
            setState(nextc);
            return true;
        }
        return false;
    }
}

'非公平锁'的'lock方法'：
static final class NonfairSync extends Sync {
    final void lock() {
        2.'和公平锁相比'，这里会'直接先进行一次CAS'，成功就返回了
        if (compareAndSetState(0, 1))
            setExclusiveOwnerThread(Thread.currentThread());
        else
            acquire(1);
    }
    // AbstractQueuedSynchronizer.acquire(int arg)
    public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
    protected final boolean tryAcquire(int acquires) {
        return nonfairTryAcquire(acquires);
    }
}
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
总结：'公平锁'和'非公平锁只有两处不同'：
1'非公平锁'在'调用lock后'，'首先就会调用CAS' '进行一次抢锁'，
如果这个时候恰巧锁没有被占用，
那么直接就获取到锁返回了。
2'非公平锁'在 'CAS失败后'，和公平锁一样都会'进入到 tryAcquire 方法'，
在 tryAcquire 方法中，'如果发现锁'这个时候'被释放了'（state == 0），
非公平锁'会直接CAS抢锁'，但是'公平锁''会判断等待队列''是否有线程处于等待状态'，
如果有则不去抢锁，乖乖排到后面。
公平锁和非公平锁就这两点区别，如果这两次 CAS 都不成功，
那么后面非公平锁和公平锁是一样的，都要进入到阻塞队列等待唤醒。

相对来说，'非公平锁'会'有更好的性能'，'因为它的吞吐量比较大'。
当然，'非公平锁'让'获取锁的时间'变得更加'不确定'，
可能'会导致'在'阻塞队列中的线程''长期处于饥饿状态'。

必须要先看懂上一篇关于 AbstractQueuedSynchronizer 的介绍，
或者你已经有相关的知识了，否则这节肯定是看不懂的。

'Condition的使用场景'，Condition'经常'可以'用在生产者-消费者的场景中'，
请看 Doug Lea 给出的这个例子：

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
 
class BoundedBuffer {
    final Lock lock = new ReentrantLock();
    'condition''依赖于lock来产生'
    final Condition notFull = lock.newCondition();
    final Condition notEmpty = lock.newCondition();
 
    final Object[] items = new Object[100];
    int putptr, takeptr, count;
 
    //生产
    public void put(Object x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length)
            	'队列已满'，等待，'直到（不满）not full''才能继续生产'
                notFull.await();  
            items[putptr] = x;
            if (++putptr == items.length) 
            	putptr = 0;
            ++count;
            '生产成功'，队列'已经（不空）not empty了'，'发个通知出去'
            notEmpty.signal(); 
        } finally {
            lock.unlock();
        }
    }
 
    //消费
    public Object take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0)
            	'队列为空'，等待，'直到队列（不空）not empty'，'才能继续消费'
                notEmpty.await(); 
            Object x = items[takeptr];
            if (++takeptr == items.length) 
            	takeptr = 0;
            --count;
            '被我消费掉一个'，'队列not full了'，'发个通知出去'
            notFull.signal(); 
            return x;
        } finally {
            lock.unlock();
        }
    }
}
（'ArrayBlockingQueue' 采'用这种方式''实现了生产者-消费者'，
所以请只把这个例子当做学习例子，实际生产中可以直接使用 ArrayBlockingQueue）

我们常用'obj.wait()，obj.notify()或 obj.notifyAll()'来'实现相似的功能'，
'但是'，'它们'是'基于对象的''监视器锁'的。需要深入了解这几个方法的读者，
可以参考我的另一篇文章《深入分析 java 8 编程语言规范：Threads and Locks》。
而这里说的 'Condition' '是基于 ReentrantLock' 实现的，
而'ReentrantLock'是'依赖于 AbstractQueuedSynchronizer' 实现的。

在往下看之前，读者心里要有一个整体的概念。
'condition' 是依赖于 ReentrantLock 的，
不管是'调用 await 进入等待'还是 'signal 唤醒'，
'都必须获取到锁''才能进行操作'。

每个'ReentrantLock' 实例'可以'通过调用'多次'
'newCondition''产生多个'ConditionObject的'实例'：

final ConditionObject newCondition() {
    return new ConditionObject();
}
我们'首先来看下'我们关注的 Condition 的实现类
'AbstractQueuedSynchronizer' 类'中的 ConditionObject'。

public class ConditionObject implements Condition, java.io.Serializable {
	private static final long serialVersionUID = 1173984872572414699L;
	'条件队列'的'第一个节点'
	//不要管这里的关键字 transient，是不参与序列化的意思
	private transient Node firstWaiter;
	'条件队列'的'最后一个节点'
	private transient Node lastWaiter;
	......
在上一篇介绍 AQS 的时候，我们有一个'阻塞队列'，用于'保存'等待获取锁的'线程的队列'。
'这里'我们'引入另一个概念'，叫'条件队列'（condition queue），

这里的阻塞队列如果叫做同步队列（sync queue）其实比较贴切，
不过为了和前篇呼应，我就继续使用阻塞队列了。
'记住'这里的'两个概念'，'阻塞队列和条件队列'。

这里，我们简单回顾下'Node'的属性：
//可取值 0、CANCELLED(1)、SIGNAL(-1)、CONDITION(-2)、PROPAGATE(-3)
volatile int waitStatus; 
volatile Node prev;
volatile Node next;
volatile Thread thread;
Node nextWaiter;
'prev和next'用于'实现阻塞队列'的'双向链表'，
'nextWaiter'用于'实现条件队列'的'单向链表'

基本上，把这张图看懂，你也就知道 condition 的处理流程了。
所以，我先简单解释下这图，然后再具体地解释代码实现。
1.我们知道'一个 ReentrantLock 实例''可以'通过'多次调用 newCondition()' 
来'产生''多个 Condition 实例'，'这里对应 condition1 和 condition2'。
注意，'ConditionObject 只有两个属性' 'firstWaiter'和'lastWaiter'；
2.'每个condition''有一个关联的条件队列'，如'线程 1' '调用 condition1.await()' 
方法即'可将当前线程 1 包装成 Node'后'加入到条件队列中'，
'然后阻塞在这里'，不继续往下执行，'条件队列是一个单向链表'；
3.'调用 condition1.signal()' '会将condition1 对应的条件队列的' 
'firstWaiter 移到阻塞队列的队尾'，'等待获取锁'，
'获取锁后'await方法返回，'继续往下执行'。

我这里说的 1、2、3 是最简单的流程，没有考虑中断、signalAll、
还有带有超时参数的 await 方法等，不过把这里弄懂是这节的主要目的。
同时，从图中也可以很直观地看出，哪些操作是线程安全的，哪些操作是线程不安全的。
这个图看懂后，下面的代码分析就简单了。
接下来，我们一步步按照流程来走代码分析，我们'先来看看 wait 方法'：

首先，'这个方法''是可被中断的'，'不可被中断的是'另一个方法'awaitUninterruptibly'()
'wait'这个方法'会阻塞'，'直到调用signal方法'（指 signal() 和signalAll()，下同），'或被中断'
public final void await() throws InterruptedException {
    if (Thread.interrupted())
        throw new InterruptedException();
     '添加到' condition 的'条件队列'中
    Node node = addConditionWaiter();
     '释放锁'，'返回'值是'释放'锁之'前的state值'
    int savedState = fullyRelease(node);
    int interruptMode = 0;
     '这里退出循环''有两种情况'，之后再仔细分析
     '1.isOnSyncQueue(node)' '返回 true'，即'当前 node' '已经转移到阻塞队列'了
     '2.checkInterruptWhileWaiting(node) != 0' '会到break'，'然后退出循环'，
     代表的是'线程中断'
    while (!isOnSyncQueue(node)) {
        LockSupport.park(this);
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
            break;
    }
     '被唤醒后'，将'进入阻塞队列'，'等待获取锁'
    if (acquireQueued(node, savedState) && interruptMode != THROW_IE)
        interruptMode = REINTERRUPT;
    if (node.nextWaiter != null) // clean up if cancelled
        unlinkCancelledWaiters();
    if (interruptMode != 0)
        reportInterruptAfterWait(interruptMode);
}
其实，我大体上也把整个 await 过程说得十之八九了，
下面我们分步把上面的几个点用源码说清楚。

'1. 将节点加入到条件队列'
'addConditionWaiter()''是将当前节点''加入到条件队列'，
看图我们知道，'这种条件队列'内的'操作是线程安全的'。

'将当前线程'对应'的节点'入队，'插入队尾'
private Node addConditionWaiter() {
    Node t = lastWaiter;
    '如果条件队列'的'最后一个节点取消了'，'将其清除出去'
    if (t != null && t.waitStatus != Node.CONDITION) {
        '这个方法'会'遍历整个条件队列'，然后会'将已取消的所有节点''清除出队列'
        unlinkCancelledWaiters();
        t = lastWaiter;
    }
    Node node = new Node(Thread.currentThread(), Node.CONDITION);
    '如果队列为空'
    if (t == null)
        firstWaiter = node;
    else
        t.nextWaiter = node;
    lastWaiter = node;
    return node;
}
'在addWaiter方法中'，有一个'unlinkCancelledWaiters() 方法'，
该方法'用于清除队列中''已经取消等待的节点'。

'当await的时候'如果'发生了取消操作'（这点之后会说），'或者'是在'节点入队的时候'，
发现'最后一个节点是被取消的'，'会调用一次这个方法'。

'等待（条件）队列''是'一个'单向链表'，遍历链表'将已经取消等待的节点''清除出去'
纯'属链表操作'，'很好理解'，看不懂多看几遍就可以了
private void unlinkCancelledWaiters() {
    Node t = firstWaiter;
    Node trail = null;
    while (t != null) {
        Node next = t.nextWaiter;
        如果节点的'状态不是 Node.CONDITION'的话，这个节点就'是被取消的'
        if (t.waitStatus != Node.CONDITION) {
            t.nextWaiter = null;
            if (trail == null)
                firstWaiter = next;
            else
                trail.nextWaiter = next;
            if (next == null)
                lastWaiter = trail;
        }
        else
            trail = t;
        t = next;
    }
}

'2.完全释放独占锁'
'回到wait方法'，'节点入队了以后'，会'调用' int savedState = 'fullyRelease(node)';
方法释放锁，注意，这里是'完全释放独占锁'，因为ReentrantLock 是可以重入的。

'首先'，我们要先观察到'返回值savedState''代表release之前的state值'
对于最简单的操作：'先lock.lock()'，'然后condition1.await()'。
那么'state经过这个方法''由1变为0'，'锁释放'，'此方法返回1'
相应的，'如果lock重入了n次'，'savedState==n'
'如果这个方法失败'，'会将节点''设置为"取消"状态'，并抛出异常IllegalMonitorStateException
final int fullyRelease(Node node) {
    boolean failed = true;
    try {
        int savedState = getState();
        这里使'用'了'当前的 state' '作为' release 的'参数'，
        也就是'完全释放掉锁'，'将 state 置为 0'
        if (release(savedState)) {
            failed = false;
            return savedState;
        } else {
            throw new IllegalMonitorStateException();
        }
    } finally {
        if (failed)
            node.waitStatus = Node.CANCELLED;
    }
}
'3.等待进入阻塞队列'
'释放掉锁以后'，接下来是这段，这边'会自旋'，如果'发现自己''还没到阻塞队列'，
'那么挂起'，'等待被转移到阻塞队列'。
	int interruptMode = 0;
	while (!isOnSyncQueue(node)) {
	    // 线程挂起
	    LockSupport.park(this);
	 
	    if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
	        break;
	}

isOnSyncQueue(Node node) 用于'判断节点''是否已经'转移'到阻塞队列了'：
 在'节点入''条件队列的时候'，'初始化'时'设置了 waitStatus = Node.CONDITION'
 前面我提到，'signal 的时候'需要'将节点从条件队列''移到阻塞队列'，
 '这个方法''就是判断 node' '是否已经移动到阻塞队列了'
final boolean isOnSyncQueue(Node node) {
     '移动过去''的时候'，node 的 'waitStatus' 会'置为 0'，这个之后在说 signal 方法的时候会说到
     '如果 waitStatus' 还是 Node.CONDITION，也就'是 -2'，那肯定'就是还在条件队列中'
     '如果 node 的前驱 prev 指向还是 null'，说明肯定'没有在 阻塞队列'
    if (node.waitStatus == Node.CONDITION || node.prev == null)
        return false;
     '如果 node' 已经'有后继节点' next 的时候，那肯定'是在阻塞队列'了
    if (node.next != null) 
        return true;
     '这个方法'从阻塞队列的队尾开始'从后往前遍历找'，如果'找到相等的'，说明'在阻塞队列'，
     '否则'就是'不在阻塞队列'
     可以'通过判断 node.prev() != null' 来'推断出 node 在阻塞队列吗'？答案是：'不能'。
     这个可以看上篇 AQS 的入队方法，'首先设置的是 node.prev' '指向 tail'，
     '然后'是 CAS 操作'将自己设置为新的 tail'，可是这次的 CAS 是可能失败的。
 
     '调用这个方法的时候'，往往'我们'需'要'的就'在队尾的部分'，
     所以'一般'都'不需要完全遍历'整个队列的
    return findNodeFromTail(node);
}
 
'从同步队列'的'队尾往前遍历'，如果'找到，返回 true'
private boolean findNodeFromTail(Node node) {
    Node t = tail;
    for (;;) {
        if (t == node)
            return true;
        if (t == null)
            return false;
        t = t.prev;
    }
}
'回到前面的循环'，'isOnSyncQueue'(node) '返回 false 的话'，
那么进到 LockSupport.park(this); 这里'线程挂起'。

'4.signal唤醒线程，转移到阻塞队列'
为了大家理解，这里我们先看唤醒操作，因为刚刚到 LockSupport.park(this);
把线程挂起了，等待唤醒。

'唤醒操作'通常'由另一个线程来操作'，就像生产者-消费者模式中，
如果'线程因为等待消费而挂起'，那么当生产者生产了一个东西后，
'会调用 signal' '唤醒正在等待的线程'来'消费'。

 '唤醒'等待了最久的'线程'
 其实'就是'，'将这个线程'对应'的node''从条件队列转''移到阻塞队列'
public final void signal() {
     '调用 signal' 方法'的线程'必'须持有'当前的'独占锁'
    if (!isHeldExclusively())
        throw new IllegalMonitorStateException();
    Node first = firstWaiter;
    if (first != null)
        doSignal(first);
}
 
 '从条件队列'队头'往后遍历'，'找出第一个'需'要转移的 node'
 因为前面我们说过，'有些线程''会取消排队'，但是'还在队列中'
private void doSignal(Node first) {
    do {
        将 'firstWaiter' '指向' 'first' 节点'后面的第一个'
        '如果'将队头移除后，'后面没有节点'在等待了，那么需要'将 lastWaiter 置为 null'
        if ( (firstWaiter = first.nextWaiter) == null)
            lastWaiter = null;
        因为 'first' 马上要'被移到阻塞队列'了，和'条件队列的链接关系'在这里'断掉'
        first.nextWaiter = null;
    } while (!transferForSignal(first)&&
             (first = firstWaiter) != null);
       这里 while 循环，如果'first 转移不成功'，
       那么'选择 first 后面的第一个节点进行转移'，依此类推
}
 
'将节点'从条件队列转'移到阻塞队列'
'true' 代表'成功'转移
'false' 代表在'signal'之前，'节点已经取消'了
final boolean transferForSignal(Node node) {
     'CAS 如果失败'，说明此 node 的 waitStatus 已不是 Node.CONDITION，'说明节点已经取消'，
     既然已经取消，也就不需要转移了，'方法返回'，'转移后面一个节点'
     '否则，将 waitStatus 置为 0'
    if (!compareAndSetWaitStatus(node, Node.CONDITION, 0))
        return false;
 
    'enq(node)': '自旋''进入阻塞队列'的队尾
    注意，这里的'返回值p是node'在阻塞队列的'前驱节点'
    Node p = enq(node);
    int ws = p.waitStatus;
     'ws > 0 '说明'node'在阻塞队列中的前驱节点'取消了等待锁'，
    '直接唤醒 node 对应的线程'。唤醒之后会怎么样，后面再解释
     '如果 ws <= 0', 那么 'compareAndSetWaitStatus' 将会被调用，
     上篇介绍的时候说过，节点入队后，需要'把前驱节点的状态设为 Node.SIGNAL(-1)'
    if (ws > 0 || !compareAndSetWaitStatus(p, ws, Node.SIGNAL))
        如果'前驱节点取消''或者 CAS 失败'，会进'到这里唤醒线程'，之后的操作看下一节
        LockSupport.unpark(node.thread);
    return true;
}
'正常情况下'，'ws > 0 || !compareAndSetWaitStatus(p, ws, Node.SIGNAL) '这句中，
'ws <= 0'，'而且 compareAndSetWaitStatus(p, ws, Node.SIGNAL) 会返回 true'，
所以'一般也不会进去' 'if 语句块中唤醒 node 对应的线程'。
'然后这个方法返回 true'，也就'意味着 signal 方法结束了'，'节点进入了阻塞队列'。

'假设发生了阻塞队列中'的'前驱节点取消等待'，'或者 CAS 失败'，
'只要唤醒线程'，'让其进到下一步即可'。

'5. 唤醒后检查中断状态'
'上一步signal之后'，我们的'线程由条件队列'转'移到了阻塞队列'，之后'就准备获取锁'了。
只要重新获取到锁了以后，继续往下执行。
等线程从挂起中恢复过来，继续往下看
int interruptMode = 0;
while (!isOnSyncQueue(node)) {
    // 线程挂起
    LockSupport.park(this);
 
    if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
        break;
}
先解释下 interruptMode。'interruptMode''可以取值为' 
REINTERRUPT（1），THROW_IE（-1），0 
'REINTERRUPT'： '代表 await 返回的时候'，需'要重新设置中断状态'
'THROW_IE'： '代表 await 返回的时候'，需'要抛出 InterruptedException 异常'
'0' ：说明'在 await 期间，没有发生中断'
有以下三种情况会让 LockSupport.park(this); 这句返回继续往下执行：

1'常规路劲'。'signal' -> '转移节点到阻塞队列' -> '获取了锁'（unpark）
2'线程中断'。'在 park 的时候'，'另外一个线程对这个线程进行了中断'
3 signal的时候我们说过，'转移以后'的'前驱节点取消了'，或者对'前驱节点的CAS操作失败了'
4'假唤醒'。这个也是存在的，和 Object.wait() 类似，都有这个问题

'线程唤醒后'第一步是'调用 checkInterruptWhileWaiting(node) '这个方法，
此方法用于'判断''是否'在线程'挂起期间''发生了中断'，如果发生了中断，
'是' signal '调用之前中断'的，'还是' signal '之后'发生的'中断'。

 1. 如果在 signal '之前'已经'中断'，'返回 THROW_IE'
 2. 如果是 signal '之后中断'，'返回 REINTERRUPT'
 3. '没有'发生'中断'，'返回 0'
private int checkInterruptWhileWaiting(Node node) {
    return Thread.interrupted()
		?(transferAfterCancelledWait(node) ? THROW_IE : REINTERRUPT) : 0;
}
Thread.interrupted()：如果当前线程已经处于中断状态，
那么该方法返回 true，同时将中断状态重置为 false，所以，
才有后续的 重新中断（REINTERRUPT） 的使用。

看看怎么'判断是 signal 之前''还是之后''发生的中断'：
 只有线程处于中断状态，才会调用此方法
 '如果需要'的话，'将这个已经取消等待的节点''转移到阻塞队列'
 '返回 true'：如果'此线程''在signal之前''被取消'，
final boolean transferAfterCancelledWait(Node node) {
     '用 CAS' '将节点状态设置为 0' 
     如果这步'CAS 成功'，'说明'是'先'发生的'中断'，'再signal'，
     '因为'如果'先signal的话'，signal 中'会将 waitStatus 设置为 0'
    if (compareAndSetWaitStatus(node, Node.CONDITION, 0)) {
        '将节点放入阻塞队列'
        这里我们看到，即使中断了，依然会转移到阻塞队列
        enq(node);
        return true;
    }
    到这里是因为'CAS 失败'，肯定是'因为 signal' 方法'已经将 waitStatus 设置为了 0'
    'signal' 方法会'将节点''转移到阻塞队列'，但是可能还没完成，这边自旋等待其完成
    当然，这种事情还是比较少的吧：'signal 调用之后'，'没完成转移之前'，'发生了中断'
    while (!isOnSyncQueue(node))
        Thread.yield();
    return false;
}
这里再说一遍，'即使发生了中断'，'节点依然'会'转移到阻塞队列'。

到这里，大家应该都知道这个 while 循环怎么退出了吧。'要么中断'，'要么转移成功'。

'6.获取独占锁'
while '循环出来'以后，下面'是这段代码'：
if (acquireQueued(node, savedState) && interruptMode != THROW_IE)
    interruptMode = REINTERRUPT;
由于 while 出来后，我们'确定节点'已经'进入了阻塞队列'，'准备获取锁'。

这里的 'acquireQueued'(node, savedState) 的'第一个参数 node'
之前已经'经过 enq(node) 进入了队列'，'参数 savedState' '是之前释放锁前的 state'，
'这个方法返回的时候'，'代表当前线程''获取了锁'，而且 'state == savedState'了。

注意，前面我们说过，'不管有没有发生中断'，'都会进入到阻塞队列'，
而'acquireQueued(node, savedState)' 的'返回值''就是代表线程是否被中断'。
如果'返回 true'，说明'被中断了'，而且'interruptMode != THROW_IE'，
说明在'signal 之前就发生中断了'，
这里将'interruptMode 设置为 REINTERRUPT'，'用于待会重新中断'。

继续往下：

if (node.nextWaiter != null) // clean up if cancelled
    unlinkCancelledWaiters();
if (interruptMode != 0)
    reportInterruptAfterWait(interruptMode);
本着一丝不苟的精神，这边说说'node.nextWaiter != null 怎么满'足。
我前面也说了'signal 的时候'会'将节点转移到阻塞队列'，
'有一步'是'node.nextWaiter = null'，'将断开节点''和条件队列的联系'。

可是，在判断发生中断的情况下，是 signal 之前还是之后发生的？ 
这部分的时候，我也介绍了，如果'signal 之前就中断'了，
'也需要'将'节点进行转移到阻塞队列'，'这部分'转移的时候，
是'没有设置 node.nextWaiter = null' 的。

之前我们说过，'如果有节点取消'，'也会调用 unlinkCancelledWaiters' 这个方法，就是这里了。

'7. 处理中断状态'
到这里，我们终于可以好好说下这个'interruptMode干嘛用'了。
'0：什么都不做'。
'THROW_IE'：'await' 方法'抛出' InterruptedException '异常'
'REINTERRUPT'：'重新中断当前线程'
private void reportInterruptAfterWait(int interruptMode)
    throws InterruptedException {
    if (interruptMode == THROW_IE)
        throw new InterruptedException();
    else if (interruptMode == REINTERRUPT)
        selfInterrupt();
}
为什么这么处理？这部分的知识在本文的最后一节

* '带超时机制的 await'
经过前面的 7 步，整个 ConditionObject 类基本上都分析完了，
接下来简单分析下带超时机制的 await 方法。

public final long awaitNanos(long nanosTimeout) 
                  throws InterruptedException
public final boolean awaitUntil(Date deadline)
                throws InterruptedException
public final boolean await(long time, TimeUnit unit)
                throws InterruptedException
                
这'三个方法都差不多'，我们就挑一个出来看看吧：
public final boolean await(long time, TimeUnit unit)
        throws InterruptedException {
     '等待'这么多纳秒
    long nanosTimeout = unit.toNanos(time);
    if (Thread.interrupted())
        throw new InterruptedException();
    Node node = addConditionWaiter();
    int savedState = fullyRelease(node);
    '当前时间 + 等待时长 = 过期时间'
    final long deadline = System.nanoTime() + nanosTimeout;
    用于'返回await''是否超时'
    boolean timedout = false;
    int interruptMode = 0;
    while (!isOnSyncQueue(node)) {
         '时间到啦'
        if (nanosTimeout <= 0L) {
             '这里因为要 break' '取消等待了'。
             '取消等待的话'一定'要调用''transferAfterCancelledWait(node)' 这个方法
             '如果这个方法返回 true'，'在这个方法内'，将'节点转移到阻塞队列成功'
             '返回 false' 的话，说明'signal 已经发生'，'signal'方法'将节点转移了'。
             也'就是'说'没有超时'嘛
            timedout = transferAfterCancelledWait(node);
            break;
        }
         'spinForTimeoutThreshold' 的'值是 1000 纳秒'，也就是 1 毫秒
         也就是说，'如果不到 1 毫秒'了，那就不要选择 parkNanos '了，
         '自旋的性能反而更好'
        if (nanosTimeout >= spinForTimeoutThreshold)
            LockSupport.parkNanos(this, nanosTimeout);
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
            break;
         '得到剩余时间'
        nanosTimeout = deadline - System.nanoTime();
    }
    if (acquireQueued(node, savedState) && interruptMode != THROW_IE)
        interruptMode = REINTERRUPT;
    if (node.nextWaiter != null)
        unlinkCancelledWaiters();
    if (interruptMode != 0)
        reportInterruptAfterWait(interruptMode);
    return !timedout;
}
'超时的思路'还是'很简单'的，
'不带超时参数的 await' '是 park'，然后'等待别人唤醒'。
而现在'超时就是''调用 parkNanos 方法来''休眠指定的时间'，
'醒来后''判断是否 signal 调用'了，'调用'了就是'没有超时'，'否则'就是'超时'了。
'超时'的话，'自己来进行转移到阻塞队列'，'然后抢锁'。

* '不抛出 InterruptedException 的 await'
关于 Condition 最后一小节了。

public final void awaitUninterruptibly() {
    Node node = addConditionWaiter();
    int savedState = fullyRelease(node);
    boolean interrupted = false;
    while (!isOnSyncQueue(node)) {
        LockSupport.park(this);
        if (Thread.interrupted())
            interrupted = true;
    }
    if (acquireQueued(node, savedState) || interrupted)
        selfInterrupt();
}
很简单，我就不废话了。

'AbstractQueuedSynchronizer' '独占锁''的取消排队'
这篇文章说的是 AbstractQueuedSynchronizer，
只不过好像 Condition 说太多了，赶紧把思路拉回来。

接下来，我想说说'怎么取消对锁的竞争'？
'上篇文章'提到过，'最重要的方法是这个'，我们要在这里面找答案：
final boolean acquireQueued(final Node node, int arg) {
    boolean failed = true;
    try {
        boolean interrupted = false;
        for (;;) {
            final Node p = node.predecessor();
            if (p == head && tryAcquire(arg)) {
                setHead(node);
                p.next = null; // help GC
                failed = false;
                return interrupted;
            }
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                interrupted = true;
        }
    } finally {
        if (failed)
            cancelAcquire(node);
    }
}
首先，到这个方法的时候，节点一定是入队成功的。
我把'parkAndCheckInterrupt()代码'贴过来：

private final boolean parkAndCheckInterrupt() {
    LockSupport.park(this);
    return Thread.interrupted();
}
这两段代码联系起来看，是不是就清楚了。

如果我们要'取消'一个'线程的排队'，我们需'要在另外一个线程'中'对其进行中断'。
比如'某线程''调用 lock()' 老久'不返回'，我'想中断它'。'一旦对其'进行'中断'，
'此线程''会从' LockSupport.'park'(this); 
'中唤醒'，'然后' Thread.'interrupted'();返回 true。

我们发现一个问题，'即使'是'中断唤醒了这个线程'，
'也就只是设置了 interrupted = true' 然后'继续下一次循环'。
而且，'由于' Thread.'interrupted'(); '会清除中断状态'，
'第二次'进'parkAndCheckInterrupt的时候'，'返回会是 false'。

'所以'，我们'要看到'，'在这个方法中'，'interrupted' '只是'用来'记录''是否发生了中断'，
然后用于方法返回值，'其他没有做任何相关事情'。

所以，我们看'外层方法''怎么处理'acquireQueued返回'false的情况'。
public final void acquire(int arg) {
    if (!tryAcquire(arg) &&
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        selfInterrupt();
}
static void selfInterrupt() {
    Thread.currentThread().interrupt();
}
所以说，'lock'() 方法'处理中断'的方法'就是'，你'中断归中断'，我'抢锁还是照样抢'锁，
几乎没关系，'只是我抢到锁了以后'，'设置线程的中断状态而已'，
也不抛出任何异常出来。
'调用者获取锁后'，可以'去检查''是否发生过中断'，也可以不理会。

来条分割线。有没有被骗的感觉，我说了一大堆，可是和取消没有任何关系啊。

我们来'看 ReentrantLock' 的'另一个 lock 方法'：

public void lockInterruptibly() throws InterruptedException {
    sync.acquireInterruptibly(1);
}
方法上'多了个' 'throws InterruptedException' ，经过前面那么多知识的铺垫，
这里我就不再啰里啰嗦了。

public final void acquireInterruptibly(int arg)
        throws InterruptedException {
    if (Thread.interrupted())
        throw new InterruptedException();
    if (!tryAcquire(arg))
        doAcquireInterruptibly(arg);
}
继续往里：

private void doAcquireInterruptibly(int arg) throws InterruptedException {
    final Node node = addWaiter(Node.EXCLUSIVE);
    boolean failed = true;
    try {
        for (;;) {
            final Node p = node.predecessor();
            if (p == head && tryAcquire(arg)) {
                setHead(node);
                p.next = null; // help GC
                failed = false;
                return;
            }
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                 就是这里了，'一旦异常'，'马上结束'这个方法，'抛出异常'。
                 这里'不再只是标记'这个方法的返回值代表中断状态
                 而'是直接抛出异常'，而且外层也不捕获，一直往外抛到 lockInterruptibly
                throw new InterruptedException();
        }
    } finally {
         '如果'通过 InterruptedException '异常出去'，那么 'failed 就是 true' 了
        if (failed)
            cancelAcquire(node);
    }
}
既然到这里了，顺便说说 cancelAcquire 这个方法吧：

private void cancelAcquire(Node node) {
    // Ignore if node doesn't exist
    if (node == null)
        return;
    node.thread = null;
    // Skip cancelled predecessors
    Node pred = node.prev;
    while (pred.waitStatus > 0)
        node.prev = pred = pred.prev;
    // predNext is the apparent node to unsplice. CASes below will
    // fail if not, in which case, we lost race vs another cancel
    // or signal, so no further action is necessary.
    Node predNext = pred.next;
    // Can use unconditional write instead of CAS here.
    // After this atomic step, other Nodes can skip past us.
    // Before, we are free of interference from other threads.
    node.waitStatus = Node.CANCELLED;
    // If we are the tail, remove ourselves.
    if (node == tail && compareAndSetTail(node, pred)) {
        compareAndSetNext(pred, predNext, null);
    } else {
        // If successor needs signal, try to set pred's next-link
        // so it will get one. Otherwise wake it up to propagate.
        int ws;
        if (pred != head &&
            ((ws = pred.waitStatus) == Node.SIGNAL ||
             (ws <= 0 && compareAndSetWaitStatus(pred, ws, Node.SIGNAL))) &&
            pred.thread != null) {
            Node next = node.next;
            if (next != null && next.waitStatus <= 0)
                compareAndSetNext(pred, predNext, next);
        } else {
            unparkSuccessor(node);
        }
        node.next = node; // help GC
    }
}
到这里，我想我应该把取消排队这件事说清楚了吧。

再说'java线程中断'和'InterruptedException 异常'

在之前的文章中，我们接触了大量的中断，这边算是个总结吧。
如果你完全熟悉中断了，没有必要再看这节，本节为新手而写。

'线程中断'
首先，我们要明白，'中断不是'类似 linux 里面的命令'kill -9 pid'，
'不是'说我们'中断'某个'线程'，这个'线程就停止'运行'了'。
'中断''代表线程状态'，'每个线程'都'关联了一个中断状态'，
是一个'true 或 false'的 boolean 值，'初始值为 false'。

关于'中断状态'，我们需'要重点关注以下几个方法'：

	Thread 类中的实例方法，持有线程实例引用即可'检测线程中断状态'
	public boolean 'isInterrupted'() {}
 
 	Thread 中的'静态方法'，'检测'调用这个方法的'线程是否已经中断'
 	注意：'这个'方法'返回中断状态'的同'时'，'会''将此线程的中断状态重置为 false'
 	所以，如果我们'连续调用两次'这个方法的话，'第二次'的'返回值'肯定'就是 false'了
 	public static boolean 'interrupted'() {}
 
 	Thread 类中的实例方法，'用于''设置一个线程的中断状态为 true'
 	public void interrupt() {}
 	
我们说'中断一个线程'，其实'就是设置了线程的' 'interrupted status 为 true'，
至于说'被中断的线程''怎么处理这个状态'，那'是那个线程自己的事'。如以下代码：
while (!Thread.interrupted()) {
   doWork();
   System.out.println("我做完一件事了，准备做下一件，如果没有其他线程中断我的话");
}
当然，'中断除了是线程状态外'，'还有其他含义'，否则也不需要专门搞一个这个概念出来了。

如果'线程处于以下三种情况'，那么当线程'被中断的时候'，'能自动感知到'：

1来自 Object 类的'wait'()、wait(long)、wait(long, int)，
来自 Thread 类的'join'()、join(long)、join(long, int)、
来自 Thread 类的'sleep'(long)、sleep(long, int)
这几个方法的'相同之处'是，方法上都有:'throws InterruptedException'

如果'线程阻塞在''这些方法上'（我们知道，这些方法会让当前线程阻塞），
'这个时候'如果'其他线程''对这个线程''进行了中断'，
那么'这个线程''会'从这些方法中'立即返回'，'抛出 InterruptedException 异常'，
同时'重置中断状态为 false'。

2'实现了InterruptibleChannel接口'的类中'的一些 I/O 阻塞操作'，
如'DatagramChannel'中的'connect 方法和 receive 方法'等

'如果线程阻塞在这里'，'中断线程''会'导致这些方法'抛出'
'ClosedByInterruptException' '并重置中断状态'。

3'Selector' 中的'select方法'，这个有机会我们在讲 NIO 的时候说
'一旦中断'，'方法立即返回'

对于'以上3种情况'是'最特殊'的，因为他们'能自动感知'到'中断'
（这里说自动，当然也是基于底层实现），
并且在'做出相应的操作'后'都会重置中断'状态为 false。

那是不是只有以上 3 种方法能自动感知到中断呢？
不是的，如果'线程'阻塞在 LockSupport.park(Object obj) 方法，也叫'挂起'，
'这个时候'的'中断''也会导致线程唤醒'，'但是唤醒后''不会重置中断状态'，
所以唤醒后去检测中断状态将是 true。

'InterruptedException' 概述
它是一个特殊的异常，不是说 JVM 对其有特殊的处理，而是它的'使用场景比较特殊'。
通常，我们可以看到，像 'Object 中的wait()方法'，
'ReentrantLock 中的lockInterruptibly()方法'，'Thread中的sleep()方法'等等，
'这些方法'都'带有 throws InterruptedException'，
我们通常'称'这些方法'为阻塞方法'（blocking method）。

'阻塞方法'一个很明显的'特征是'，它们需'要花费比较长的时间'
（不是绝对的，只是说明时间不可控），还有'它们的方法结束返回'往往'依赖于外部条件'，
如'wait方法''依赖'于'其他线程'的'notify'，'lock'方法'依赖'于'其他线程'的'unlock'等等。

当我们看到方法上'带有 throws InterruptedException'时，我们就要知道，
'这个方法'应该'是阻塞方法'，我们'如果希望它'能'早点返回'的话，
我们往往可以'通过中断来实现'。

'除了几个特殊类'（如 Object，Thread等）外，
'感知中断''并提前返回''是通过轮询中断状态来实现的'。
'我们自己''需要写可中断的方法''的时候'，
'就是通过''在合适的时机'（通常在循环的开始处）'去判断线程的中断状态'，
'然后做相应的操作'（'通常'是'方法直接返回''或者抛出异常'）。
当然，我们也要看到，'如果'我们'一次循环'花的'时间比较长'的话，
那么'就需要比较长的时间''才能注意到线程中断'了。

处理中断
'一旦中断发生'，我们'接收到了这个信息'，然后'怎么去处理中断呢'？本小节将简单分析这个问题。

我们经常会这么写代码：
try {
    Thread.sleep(10000);
} catch (InterruptedException e) {
    // ignore
}
// go on
当 'sleep 结束'继续'往下执行的时候'，
我们'往往'都'不知道'这块'代码是真的 sleep 了 10 秒'，
'还是'只'休眠了 1 秒'就被中断了。这个代码的问题在于，
'我们将这个异常信息吞掉了'。
（'对于sleep 方法'，我相信'大部分情况下'，我们'都不在意''是否中断了'，这里是举例）

AQS的做法很值得我们借鉴，我们知道'ReentrantLock'有'两种lock'方法：
public void lock() {
    sync.lock();
}
public void lockInterruptibly() throws InterruptedException {
	sync.acquireInterruptibly(1);
}

前面我们提到过，'lock'() 方法'不响应中断'。如果 'thread1 调用了 lock'() 方法，
过了'很久'还'没抢到锁'，这个时候'thread2''对其'进行了'中断'，
'thread1''是不响应这个请求的'，它'会继续抢锁'，当然'它不会把“被中断”''这个信息扔掉'。
我们可以看以下代码：

public final void acquire(int arg) {
    if (!tryAcquire(arg) &&
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
         我们看到，'这里'也没做任何特殊处理，就是'记录下'来'中断状态'。
         这样，如果'外层方法'需要'去检测的时候'，至少我们'没有把这个信息丢了'
        selfInterrupt();// Thread.currentThread().interrupt();
}
而对于'lockInterruptibly'() 方法，因为其'方法上'面'有throws InterruptedException'，
'这个信号告诉我们'，如果我们'要取消线程抢锁'，'直接中断'这个线程'即可'，
它'会立即返回'，'抛出 InterruptedException'异常。

'在并发包中'，'有非常多'的'这种'处理'中断的例子'，'提供两个方法'，
'分别为响应中断'和'不响应中断'，

'对于不响应中断的方法'，
'记录中断'而不是丢失这个'信息'。如'Condition中'的'两个方法'就是这样的：
void 'await'() throws InterruptedException;
void 'awaitUninterruptibly'();
通常，'如果方法会抛出 InterruptedException 异常'，往往'方法体的第一句就是'：

public final void await() throws InterruptedException {
    if (Thread.interrupted())
        throw new InterruptedException();
     ...... 
}
熟练使用中断，对于我们写出优雅的代码是有帮助的，也有助于我们分析别人的源码
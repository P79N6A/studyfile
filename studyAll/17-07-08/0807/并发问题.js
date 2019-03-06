1 什么是并发问题。
'多个进程或线程'同时(或着说在同一段时间内)'访问同一资源'会产生并发问题。
银行两操作员同时操作同一账户就是典型的例子。比如
A、B操作员同时读取一余额为1000元的账户，A操作员为该账户增加100元，
B操作员同时为该账户减去 50元，A先提交，B后提交。 
最后实际账户余额为1000-50=950元，
但本该为 1000+100-50=1050。这就是典型的并发问题。如何解决？可以用锁。
用法1
public class Test{
    public synchronized void print(){
        ....;
    } 
}
某线程执行print()方法，则该对象将加锁。其它线程将无法执行该对象的所有synchronized块。
用法2
public class Test{
    public void print(){
        synchronized(this){//锁住本对象
            ...;
        }
    }
}
同用法1, 但更能体现synchronized用法的本质。
用法3
public class Test{
    private String a = "test";
    public void print(){
        synchronized(a){//锁住a对象
            ...;
        }
    }
    public synchronized void t(){
        ...; //这个同步代码块不会因为print()而锁定.
    }
}
执行print()，会给对象a加锁，注意不是给Test的对象加锁，也就是说 Test对象的其它synchronized方法不会因为print()而被锁。同步代码块执行完，则释放对a的锁。
为了锁住一个对象的代码块而不影响该对象其它 synchronized块的高性能写法：
public class Test{
    private byte[] lock = new byte[0];
    public void print(){
        synchronized(lock){
            ...;
        }
    }
    public synchronized void t(){
        ...; 
    }
}
静态方法的锁
public class Test{
    public synchronized static void execute(){
        ...;
    }
}
效果同
public class Test{
    public static void execute(){
        synchronized(TestThread.class){
            ...;
        }
    }
}
3 Java中的锁与排队上厕所。
锁就是阻止其它进程或线程进行资源访问的一种方式，即锁住的资源不能被其它请求访问。在Java中，sychronized关键字用来对一个对象加锁。比如:
public class MyStack {
    int idx = 0;
    char [] data = new char[6];

    public synchronized void push(char c) {
        data[idx] = c;
        idx++;
    }

    public synchronized char pop() {
        idx--;
        return data[idx];
    }

    public static void main(String args[]){
        MyStack m = new MyStack();
        /**
           下面对象m被加锁。严格的说是对象m的所有synchronized块被加锁。
           如果存在另一个试图访问m的线程T，那么T无法执行m对象的push和
           pop方法。
        */
        m.pop();//对象m被加锁。
    }
}
Java的加锁解锁跟多个人排队等一个公共厕位完全一样。第一个人进去后顺手把门从里面锁住，其它人只好排队等。
第一个人结束后出来时，门才会打开（解锁）。轮到第二个人进去，同样他又会把门从里面锁住，其它人继续排队等待。
用厕所理论可以很容易明白: 一个人进了一个厕位，这个厕位就会锁住，但不会导致另一个厕位也被锁住，
因为一个人不能同时蹲在两个厕位里。对于Java 就是说：Java中的锁是针对同一个对象的，不是针对class的。看下例：
MyStatck m1 = new MyStack();
MyStatck m2 = new Mystatck();
m1.pop();
m2.pop();  
m1对象的锁是不会影响m2的锁的，因为它们不是同一个厕位。就是说，假设有 3线程t1,t2,t3操作m1，那么这3个线程只可能在m1上排队等，
假设另2个线程 t8,t9在操作m2，那么t8,t9只会在m2上等待。而t2和t8则没有关系，即使m2上的锁释放了，t1,t2,t3可能仍要在m1上排队。
原因无它，不是同一个厕位耳。
Java不能同时对一个代码块加两个锁，这和数据库锁机制不同，数据库可以对一条记录同时加好几种不同的锁，请参见：
http://hi.baidu.com/dapplehou/blog/item/b341a97744fe6616b151b9a3.html

4 何时释放锁？
一般是执行完毕同步代码块（锁住的代码块）后就释放锁，也可以用wait()方式半路上释放锁。wait()方式就好比蹲厕所到一半，
突然发现下水道堵住了，不得已必须出来站在一边，好让修下水道师傅(准备执行notify的一个线程）进去疏通马桶，疏通完毕，
师傅大喊一声: "已经修好了"(notify)，刚才出来的同志听到后就重新排队。注意啊，必须等师傅出来啊，师傅不出来，谁也进不去。
也就是说notify后，不是其它线程马上可以进入封锁区域活动了，而是必须还要等notify代码所在的封锁区域执行完毕从而释放锁以后，其它线程才可进入。
这里是wait与notify代码示例：
public synchronized char pop() {
    char c;
    while (buffer.size() == 0) {
        try {
            this.wait(); //从厕位里出来
        } catch (InterruptedException e) {
            // ignore it...
        }
    }
    c = ((Character)buffer.remove(buffer.size()-1)).
        charValue();
    return c;
}

public synchronized void push(char c) {
    this.notify(); //通知那些wait()的线程重新排队。注意：仅仅是通知它们重新排队。
    Character charObj = new Character(c);
    buffer.addElement(charObj);
}//执行完毕，释放锁。那些排队的线程就可以进来了。
再深入一些。
由于wait()操作而半路出来的同志没收到notify信号前是不会再排队的，他会在旁边看着这些排队的人(其中修水管师傅也在其中）。注意，
修水管的师傅不能插队，也得跟那些上厕所的人一样排队，不是说一个人蹲了一半出来后，修水管师傅就可以突然冒出来然后立刻进去抢修了，
他要和原来排队的那帮人公平竞争，因为他也是个普通线程。如果修水管师傅排在后面，则前面的人进去后，发现堵了，就wait，
然后出来站到一边，再进去一个，再wait，出来，站到一边，只到师傅进去执行notify. 这样，一会儿功夫，排队的旁边就站了一堆人，等着notify.
终于，师傅进去，然后notify了，接下来呢？

1. 有一个wait的人（线程）被通知到。
2. 为什么被通知到的是他而不是另外一个wait的人？取决于JVM.我们无法预先
   判断出哪一个会被通知到。也就是说，优先级高的不一定被优先唤醒，等待
   时间长的也不一定被优先唤醒，一切不可预知！(当然，如果你了解该JVM的
   实现，则可以预知）。
3. 他（被通知到的线程）要重新排队。
4. 他会排在队伍的第一个位置吗？回答是：不一定。他会排最后吗？也不一定。
   但如果该线程优先级设的比较高，那么他排在前面的概率就比较大。
5. 轮到他重新进入厕位时，他会从上次wait()的地方接着执行，不会重新执行。
   恶心点说就是，他会接着拉巴巴，不会重新拉。
6. 如果师傅notifyAll(). 则那一堆半途而废出来的人全部重新排队。顺序不可知。
Java DOC 上说，The awakened threads will not be able to proceed until the current thread relinquishes the lock on this object(当前线程释放锁前，唤醒的线程不能去执行）。
这用厕位理论解释就是显而易见的事。
5 Lock的使用
用synchronized关键字可以对资源加锁。用Lock关键字也可以。它是JDK1.5中新增内容。用法如下：
class BoundedBuffer {
    final Lock lock = new ReentrantLock();
    final Condition notFull  = lock.newCondition(); 
    final Condition notEmpty = lock.newCondition(); 

    final Object[] items = new Object[100];
    int putptr, takeptr, count;

    public void put(Object x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) 
                notFull.await();
            items[putptr] = x; 
            if (++putptr == items.length) putptr = 0;
            ++count;
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public Object take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) 
                notEmpty.await();
            Object x = items[takeptr]; 
            if (++takeptr == items.length) takeptr = 0;
            --count;
            notFull.signal();
            return x;
        } finally {
            lock.unlock();
        }
    } 
}
(注：这是JavaDoc里的例子，是一个阻塞队列的实现例子。所谓阻塞队列，就是一个队列如果满了或者空了，都会导致线程阻塞等待。Java里的
ArrayBlockingQueue提供了现成的阻塞队列，不需要自己专门再写一个了。)
一个对象的lock.lock()和lock.unlock()之间的代码将会被锁住。这种方式比起synchronize好在什么地方？简而言之，就是对wait的线程进行了分类。
用厕位理论来描述，则是那些蹲了一半而从厕位里出来等待的人原因可能不一样，有的是因为马桶堵了，有的是因为马桶没水了。通知(notify)的时候，
就可以喊：因为马桶堵了而等待的过来重新排队（比如马桶堵塞问题被解决了），或者喊，因为马桶没水而等待的过来重新排队(比如马桶没水问题被解决了）。
这样可以控制得更精细一些。不像synchronize里的wait和notify，不管是马桶堵塞还是马桶没水都只能喊：刚才等待的过来排队！
假如排队的人进来一看，发现原来只是马桶堵塞问题解决了，而自己渴望解决的问题（马桶没水）还没解决，只好再回去等待(wait)，
白进来转一圈，浪费时间与资源。

Lock方式与synchronized对应关系：
Lock	await	signal	signalAll
synchronized	wait	notify	notifyAll
注意：不要在Lock方式锁住的块里调用wait、notify、notifyAll
6 利用管道进行线程间通信
原理简单。两个线程，一个操作PipedInputStream,一个操作 PipedOutputStream。PipedOutputStream写入的数据先缓存在Buffer中,
如果 Buffer满，此线程wait。PipedInputStream读出Buffer中的数据，如果Buffer 没数据，此线程wait。
jdk1.5中的阻塞队列可实现同样功能。
例1 这个例子实际上只是单线程，还谈不上线程间通信，但不妨一看。
http://hi.baidu.com/ecspell/blog/item/7b02d3133ab555005aaf53f5.html
package io;
import java.io.*;
public class PipedStreamTest {
    public static void main(String[] args) {
        PipedOutputStream ops=new PipedOutputStream();
        PipedInputStream pis=new PipedInputStream();
        try{
            ops.connect(pis);//实现管道连接
            new Producer(ops).run();
            new Consumer(pis).run();
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}

//生产者
class Producer implements Runnable{
    private PipedOutputStream ops;
    public Producer(PipedOutputStream ops){
        this.ops=ops;
    }

    public void run(){
        try{
            ops.write("hell,spell".getBytes());
            ops.close();
        }catch(Exception e)
            {e.printStackTrace();}
    }
}

//消费者
class Consumer implements Runnable{
    private PipedInputStream pis;
    public Consumer(PipedInputStream pis)
    {
        this.pis=pis;
    }

    public void run()
    {
        try{
            byte[] bu=new byte[100];
            int len=pis.read(bu);
            System.out.println(new String(bu,0,len));
            pis.close();
        }catch(Exception e)
            {e.printStackTrace();}
    }
} 
例2 对上面的程序做少许改动就成了两个线程。
package io;
import java.io.*;
public class PipedStreamTest {
    public static void main(String[] args) {
        PipedOutputStream ops=new PipedOutputStream();
        PipedInputStream pis=new PipedInputStream();
        try{
            ops.connect(pis);//实现管道连接
            Producer p = new Producer(ops);
            new Thread(p).start();
            Consumer c = new Consumer(pis);
            new Thread(c).start();
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}

//生产者
class Producer implements Runnable{
    private PipedOutputStream ops;
    public Producer(PipedOutputStream ops)
    {
        this.ops=ops;
    }

    public void run()
    {
        try{
            for(;;){
                ops.write("hell,spell".getBytes());
                ops.close();
            }
        }catch(Exception e)
            {e.printStackTrace();}
    }
}

//消费者
class Consumer implements Runnable{
    private PipedInputStream pis;
    public Consumer(PipedInputStream pis)
    {
        this.pis=pis;
    }

    public void run()
    {
        try{
            for(;;){
                byte[] bu=new byte[100];
                int len=pis.read(bu);
                System.out.println(new String(bu,0,len));
            }
            pis.close();
        }catch(Exception e)
            {e.printStackTrace();}
    }
}
例3. 这个例子更加贴进应用
import java.io.*;
       
public class PipedIO { //程序运行后将sendFile文件的内容拷贝到receiverFile文件中
    public static void main(String args[]){       
        try{//构造读写的管道流对象       
            PipedInputStream pis=new PipedInputStream();       
            PipedOutputStream pos=new PipedOutputStream();       
            //实现关联
            pos.connect(pis);
            //构造两个线程，并且启动。
            new Sender(pos,"c:\\text2.txt").start();           
            new Receiver(pis,"c:\\text3.txt").start();         
        }catch(IOException e){       
            System.out.println("Pipe Error"+ e);       
        }       
    }       
}       
//线程发送       
class Sender extends Thread{           
    PipedOutputStream pos;       
    File file;       
    //构造方法       
    Sender(PipedOutputStream pos, String fileName){       
        this.pos=pos;       
        file=new File(fileName);       
    }          
    //线程运行方法       
    public void run(){          
        try{       
            //读文件内容       
            FileInputStream fs=new FileInputStream(file);       
            int data;       
            while((data=fs.read())!=-1){       
                //写入管道始端       
                pos.write(data);       
            }       
            pos.close();                        
        }       
        catch(IOException e) {       
            System.out.println("Sender Error" +e);       
        }       
    }       
}
       
//线程读       
class Receiver extends Thread{       
    PipedInputStream pis;       
    File file;       
    //构造方法       
    Receiver(PipedInputStream pis, String fileName){         
        this.pis=pis;       
        file=new File(fileName);       
    }          
    //线程运行       
    public void run(){          
        try {       
            //写文件流对象       
            FileOutputStream fs=new FileOutputStream(file);       
            int data;       
            //从管道末端读       
            while((data=pis.read())!=-1){
       
                //写入本地文件       
                fs.write(data);       
            }       
            pis.close();            
        }       
        catch(IOException e){       
            System.out.println("Receiver Error" +e);       
        }       
    }       
}

7 阻塞队列
阻塞队列可以代替管道流方式来实现进水管/排水管模式（生产者/消费者).JDK1.5提供了几个现成的阻塞队列. 现在来看ArrayBlockingQueue的代码如下：
这里是一个阻塞队列
BlockingQueue<Object> blockingQ = new ArrayBlockingQueue<Object> 10;
一个线程从队列里取
for(;;){
    Object o = blockingQ.take();//队列为空，则等待（阻塞）
}
另一个线程往队列存
for(;;){
    blockingQ.put(new Object());//队列满，则等待（阻塞）
}
可见，阻塞队列使用起来比管道简单。
8 使用Executors、Executor、ExecutorService、ThreadPoolExecutor
可以'使用线程管理任务'。还可以使用jdk1.5提供的'一组类'来更方便的'管理任务'。从这些类里我们可以体会'一种面向任务''的思维方式'。这些类是：
'Executor接口'。使用方法：
'Executor executor = anExecutor';//生成一个Executor实例。
'executor.execute(new RunnableTask1())';
用意：'使用者只关注任务执行'，'不用操心去关注任务的创建、以及执行细节'等这些'第三方实现者关心的问题'。也就是说，把'任务的调用执行'和'任务的实现''解耦'。
实际上，JDK1.5中已经有该接口出色的实现。够用了。
'Executors''是一个'如同Collections一样的工厂类或'工具类'，用来'产生各种不同接口的实例'。
ExecutorService接口它继承自Executor. Executor只管'把任务扔进 executor()里去执行'，剩余的事就不管了。而'ExecutorService'则不同，它会'多做点控制'工作。比如：
class NetworkService {
    private final ServerSocket serverSocket;
    private final ExecutorService pool;

    public NetworkService(int port, int poolSize) throws IOException {
        serverSocket = new ServerSocket(port);
        pool = Executors.newFixedThreadPool(poolSize);
    }
 
    public void serve() {
        try {
            for (;;) {
                pool.execute(new Handler(serverSocket.accept()));
            }
        } catch (IOException ex) {
            pool.shutdown(); //不再执行新任务
        }
    }
}

class Handler implements Runnable {
    private final Socket socket;
    Handler(Socket socket) { this.socket = socket; }
    public void run() {
        // read and service request
    }
}
ExecutorService(也'就是代码里的pool对象'）'执行shutdown后'，它就'不能再执行新任务了'，但'老任务会继续执行完毕'，
那些等待执行的任务也不再等待了。
'任务提交者'与'执行者通讯'
public static void main(String args[])throws Exception {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Callable<String> task = new Callable<String>(){
        public String call()throws Exception{
            return "test";
        }
    };
    Future<String> f = executor.submit(task); 
    String result = f.get();//等待（阻塞）返回结果
    System.out.println(result);
    executor.shutdown();                
}
Executors.'newSingleThreadExecutor()'取得的Executor实例有以下特性:
任务顺序执行. 比如：
executor.submit(task1);
executor.submit(task2);
'必须等task1执行完，task2才能执行'。
'task1和task2会被放入一个队列里'，由'一个工作线程来处理'。即：一共有2个线程(主线程、处理任务的工作线程）。
其它的类请参考Java Doc
9 并发流程控制
本节例子来自温少的Java并发教程，可能会有改动。向温少致敬。
CountDownLatch 门插销计数器
启动线程，然后等待线程结束。即常用的主线程等所有子线程结束后再执行的问题。
public static void main(String[] args)throws Exception {
    // TODO Auto-generated method stub
    final int count=10;
    final CountDownLatch completeLatch = new CountDownLatch(count);//定义了门插销的数目是10
                
    for(int i=0;i<count;i++){
        Thread thread = new Thread("worker thread"+i){
                public void run(){
                    //do xxxx                                   
                    completeLatch.countDown();//减少一根门插销
                }
            };
        thread.start();
    }           
    completeLatch.await();//如果门插销还没减完则等待。
} 
JDK1.4时，常用办法是给子线程设置状态，主线程循环检测。易用性和效率都不好。
启动很多线程，等待通知才能开始
public static void main(String[] args) throws Exception {
    // TODO Auto-generated method stub
    final CountDownLatch startLatch = new CountDownLatch(1);//定义了一根门插销

    for (int i = 0; i < 10; i++) {
        Thread thread = new Thread("worker thread" + i) {
                public void run() {
                    try {
                        startLatch.await();//如果门插销还没减完则等待
                    } catch (InterruptedException e) {

                    }
                    // do xxxx
                }
            };
        thread.start();
    }
    startLatch.countDown();//减少一根门插销
}
CycliBarrier. 等所有线程都达到一个起跑线后才能开始继续运行。
public class CycliBarrierTest implements Runnable {
    private CyclicBarrier barrier;

    public CycliBarrierTest(CyclicBarrier barrier) {
        this.barrier = barrier;
    }

    public void run() {
        //do xxxx;
        try {
            this.barrier.await();//线程运行至此会检查是否其它线程都到齐了，没到齐就继续等待。到齐了就执行barrier的run函数体里的内容
        } catch (Exception e) {

        }
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        //参数2代表两个线程都达到起跑线才开始一起继续往下执行
        CyclicBarrier barrier = new CyclicBarrier(2, new Runnable() {
                public void run() {
                    //do xxxx;
                }
            });
        Thread t1 = new Thread(new CycliBarrierTest(barrier));         
        Thread t2 = new Thread(new CycliBarrierTest(barrier));
        t1.start();
        t2.start();
    }

}
这简化了传统的用计数器+wait/notifyAll来实现该功能的方式。
10 并发3定律
Amdahl定律. 给定问题规模，可并行化部分占12%，那么即使把并行运用到极致，系统的性能最多也只能提高1/(1-0.12)=1.136倍。即：并行对提高系统性能有上限。
Gustafson定律. Gustafson定律说Amdahl定律没有考虑随着cpu的增多而有更多的计算能力可被使用。其本质在于更改问题规模从而可以把Amdahl定律中那剩下的88%的串行处理并行化，从而可以突破性能门槛。本质上是一种空间换时间。
Sun-Ni定律. 是前两个定律的进一步推广。其主要思想是计算的速度受限于存储而不是CPU的速度. 所以要充分利用存储空间等计算资源，尽量增大问题规模以产生更好/更精确的解.
11 由并发到并行
计算机识别物体需要飞速的计算，以至于芯片发热发烫，而人在识别物体时却一目了然，却并不会导致某个脑细胞被烧热烧焦（夸张）而感到不适，是由于大脑是一个分布式并行运行系统，就像google用一些廉价的Linux服务器可以进行庞大复杂的计算一样，大脑内部无数的神经元的独自计算，互相分享成果，从而瞬间完成需要单个cpu万亿次运算才能有的效果。试想，如果在并行处理领域有所创建，将对计算机的发展和未来产生不可估量的影响。当然，其中的挑战也可想而知：许多的问题是并不容易轻易就“分割”的了的。

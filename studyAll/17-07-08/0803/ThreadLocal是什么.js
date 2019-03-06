'ThreadLocal'是什么
　　早在JDK 1.2的版本中就提供Java.lang.ThreadLocal，'ThreadLocal'为'解决多线程'程序的'并发问题'
  提供了一种新的思路。'使用''这个工具类'可以很简洁地'编写'出'优美的多线程程序'。
　　当'使用ThreadLocal'维护变量时，'ThreadLocal''为每个''使用该变量''的线程''提供''独立的变量副本'，
  所以'每一个线程''都可以独立''地改变自己的副本'，而'不会影响其它线程''所对应的副本'。
　　'从线程的角度看'，'目标变量'就象'是线程的本地变量'，这也是类名中“Local”所要表达的意思。
　　所以，在'Java中''编写线程局部变量的代码''相对来说要笨拙一些'，因此造成线程局部变量没有在Java
  开发者中得到很好的普及。

ThreadLocal的接口方法
ThreadLocal类接口很简单，'只有4个方法'，我们先来了解一下：
void 'set'(Object value)'设置当前线程''的''线程局部变量'的值。

public Object 'get'()该方法'返回当前线程'所对应'的''线程局部变量'。

public void 'remove'()'将当前线程''局部变量的值''删除'，目的是为了'减少内存的占用'，该方法是JDK 5.0
新增的方法。需要指出的是，当'线程结束后'，'对应该线程的局部变量'将'自动被垃圾回收'，所以
'显式调用该方法清除线程的局部变量'并'不是必须的操作'，但它可以加快内存回收的速度。

protected Object 'initialValue'()'返回该线程局部变量的初始值'，该方法是一个protected的方法，显然是
'为了让子类覆盖而设计的'。'这个方法是'一个'延迟调用方法'，在线程'第1次调用get'()'或set'(Object)时
'才执行'，并且'仅执行1次'。ThreadLocal中的'缺省实现''直接返回一个null'。
　　
   值得一提的是，在JDK5.0中，'ThreadLocal已经支持泛型'，该类的'类名已经变为ThreadLocal<T>'。API方法
也相应进行了调整，新版本的API方法分别是void 'set(T value)'、'T get()'以及'T initialValue()'。
　 'ThreadLocal'是'如何做到'为'每一个线程维护变量'的'副本的呢'？其实实现的'思路很简单'：
 在'ThreadLocal类中''有一个Map'，用于'存储每一个线程的变量副本'，Map中元素的'键为线程对象'，而
 '值对应线程的变量副本'。我们自己就可以提供一个简单的实现版本：

		
package com.test;  
  
public class TestNum {
    // ①通过'匿名内部类''覆盖ThreadLocal的initialValue()方法，指定初始值' 
    private static ThreadLocal<Integer> seqNum = new ThreadLocal<Integer>() {
        public Integer initialValue() {  
            return 0;  
        }
    };  
  
    // ②获取下一个序列值  
    public int getNextNum() {
        seqNum.set(seqNum.get() + 1);  
        return seqNum.get();  
    }
  
    public static void main(String[] args) {
        TestNum sn = new TestNum();
        // ③ 3个线程共享sn，各自产生序列号
        TestClient t1 = new TestClient(sn);
        TestClient t2 = new TestClient(sn);
        TestClient t3 = new TestClient(sn);
        t1.start();
        t2.start();
        t3.start();
    }  
  
    private static class TestClient extends Thread {  
        private TestNum sn;  
  
        public TestClient(TestNum sn) {  
            this.sn = sn;  
        }  
  
        public void run() {  
            for (int i = 0; i < 3; i++) {  
                // ④每个线程打出3个序列值  
                System.out.println("thread[" + Thread.currentThread().getName() + "] --> sn["  
                         + sn.getNextNum() + "]");  
            }  
        }  
    }  
}  


通常我们'通过匿名内部类'的方式'定义ThreadLocal的子类'，'提供初始的变量值'，如例子中①处所示。
'TestClient线程产生一组序列号'，在③处，我们生成'3个TestClient'，它们'共享同一个TestNum实例'。
运行以上代码，在控制台上输出以下的结果：
thread[Thread-0] --> sn[1]
thread[Thread-1] --> sn[1]
thread[Thread-2] --> sn[1]
thread[Thread-1] --> sn[2]
thread[Thread-0] --> sn[2]
thread[Thread-1] --> sn[3]
thread[Thread-2] --> sn[2]
thread[Thread-0] --> sn[3]
thread[Thread-2] --> sn[3]
考察输出的结果信息，我们发现'每个线程'所'产生的序号'虽然'都共享同一个TestNum实例'，
'但它们并没有发生相互干扰'的情况，而是'各自产生独立的序列号'，这是因为我们通过'ThreadLocal'
为每一个线程提供了单独的副本。

Thread同步机制的比较
　　'ThreadLocal'和'线程同步机制'相比'有什么优势呢'？
ThreadLocal和线程同步机制'都是为了解决多线程中''相同变量的访问冲突问题'。
　　 在'同步机制中'，通过'对象的锁机制'保证'同一时间只有一个线程访问变量'。这时'该变量是多个线程共享的'，
使用'同步机制要求程序'慎密地'分析什么时候对变量进行读写'，'什么时候'需要'锁定某个对象'，
'什么时候释放对象锁'等繁杂的问题，程序设计和编写难度相对较大。
	而'ThreadLocal'则'从另一个角度'来'解决多线程的并发访问'。ThreadLocal会'为每一个线程'
'提供一个独立的变量副本'，从而'隔离了多个线程''对数据的访问冲突'。因为'每一个线程都拥有自己的变量副本'，
从而也'就没有必要对该变量进行同步了'。'ThreadLocal''提供了线程安全'的'共享对象'，在编写多线程代码时，
'可以把不安全的变量''封装进ThreadLocal'。
	由于'ThreadLocal'中'可以持有任何类型的对象'，低版本JDK所提供的'get()返回的是Object对象'，需要强制
类型转换。但JDK 5.0通过泛型很好的解决了这个问题，在一定程度地简化ThreadLocal的使用，代码清单 9 2就
使用了JDK 5.0新的ThreadLocal<T>版本。
　　概括起来说，对于'多线程资源共享的问题'，'同步机制''采用了“以时间换空间”的方式'，而'ThreadLocal'
'采用了“以空间换时间”的方式'。'前者仅提供一份变量'，'让不同的线程排队访问'，而'后者为每一个线程'
都'提供了一份变量'，因此可以'同时访问而互不影响'。
　　spring使用'ThreadLocal''解决线程安全问题'我们知道在'一般情况下'，只有'无状态的Bean才可以'
'在多线程环境下共享'，在Spring中，'绝大部分Bean都可以声明为singleton作用域'。就是因为'Spring对一些Bean'
（如'RequestContextHolder'、'TransactionSynchronizationManager'、'LocaleContextHolder'等）
中'非线程安全状态采用ThreadLocal进行处理'，让'它们也成为线程安全的状态'，因为'有状态的Bean'就
'可以在多线程中共享了'。
　　一般的Web应用划分为'展现层'、'服务层'和'持久层'三个层次，在不同的层中编写对应的逻辑，
下层通过接口向上层开放功能调用。在一般情况下，从'接收请求'到'返回响应''所经过的所有程序调用'都
同'属于一个线程'，如图9‑2所示：
通通透透理解ThreadLocal
　　'同一线程贯通三层'这样你就'可以根据需要'，'将'一些'非线程安全的变量''以ThreadLocal存放'，
在'同一次''请求响应的调用线程'中，所有'关联的对象''引用到的'都'是同一个变量'。
　　下面的实例能够体现Spring对有状态Bean的改造思路：
  
代码清单3 'TestDao：非线程安全'
package com.test;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
public class TestDao {
    private Connection conn;// ①一个非线程安全的变量  
  
    public void addTopic() throws SQLException {  
        Statement stat = conn.createStatement();// ②引用非线程安全变量  
        // …  
    }  
}  

由于①处的'conn是成员变量'，因为'addTopic()方法'是'非线程安全的'，必须'在使用时创建一个新TopicDao实例'
'（非singleton）'。下面使用ThreadLocal对conn这个非线程安全的“状态”进行改造：
代码清单4 TestDao：线程安全
[java] view plain copy print?
package com.test;  
  
import java.sql.Connection;  
import java.sql.SQLException;  
import java.sql.Statement;  
  
public class TestDaoNew {  
    // ①使用ThreadLocal保存Connection变量  
    private static ThreadLocal<Connection> connThreadLocal = new ThreadLocal<Connection>();  
  
    public static Connection getConnection() {  
        // ②如果connThreadLocal没有本线程对应的Connection创建一个新的Connection，  
        // 并将其保存到线程本地变量中。  
        if (connThreadLocal.get() == null) {  
            Connection conn = getConnection();  
            connThreadLocal.set(conn);  
            return conn;  
        } else {  
            return connThreadLocal.get();// ③直接返回线程本地变量  
        }  
    }  
  
    public void addTopic() throws SQLException {  
        // ④从ThreadLocal中获取线程对应的Connection  
        Statement stat = getConnection().createStatement();  
    }  
}  


不同的线程在使用TopicDao时，'先判断connThreadLocal.get()是否是null'，如果是null，则说明'当前线程还没有'
'对应的Connection对象'，这时'创建一个Connection对象并添加到本地线程变量中'；如果不为null，则说明当前
的线程已经拥有了Connection对象，直接使用就可以了。这样，就'保证了不同的线程使用线程相关的Connection'，
而'不会使用其它线程的Connection'。因此，'这个TopicDao就可以做到singleton共享了'。
当然，这个例子本身很粗糙，将'Connection的ThreadLocal'直接'放在DAO''只能做到本DAO的多个方法'
'共享Connection时''不发生线程安全问题'，但'无法和其它DAO共用同一个Connection'，要做到'同一事务多DAO'
'共享同一Connection'，必须'在一个共同的外部类''使用ThreadLocal保存Connection'。


ConnectionManager.java

package com.test;  
  
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.SQLException;  
  
public class ConnectionManager {  
  
    private static ThreadLocal<Connection> connectionHolder = new ThreadLocal<Connection>() {  
        @Override  
        protected Connection initialValue() {  
            Connection conn = null;  
            try {  
                conn = DriverManager.getConnection(  
                        "jdbc:mysql://localhost:3306/test", "username",  
                        "password");  
            } catch (SQLException e) {  
                e.printStackTrace();  
            }  
            return conn;  
        }  
    };  
  
    public static Connection getConnection() {  
        return connectionHolder.get();  
    }  
  
    public static void setConnection(Connection conn) {  
        connectionHolder.set(conn);  
    }  
}  


java.lang.ThreadLocal<T>的具体实现
那么到底'ThreadLocal'类'是如何实现'这种'“为每个线程''提供不同的变量拷贝”''的呢'？先来看一下
ThreadLocal的set()方法的源码是如何实现的：

/** 
    * Sets the current thread's copy of this thread-local variable 
    * to the specified value.  Most subclasses will have no need to 
    * override this method, relying solely on the {@link #initialValue} 
    * method to set the values of thread-locals. 
    * 
    * @param value the value to be stored in the current thread's copy of 
    *        this thread-local. 
    */  
   public void set(T value) {  
       Thread t = Thread.currentThread();  
       ThreadLocalMap map = getMap(t);  
       if (map != null)  
           map.set(this, value);  
       else  
           createMap(t, value);  
   }  

在这个方法内部我们看到，'首先通过getMap(Thread t)方法''获取一个和当前线程相关的ThreadLocalMap'，
'然后将变量的值设置到这个ThreadLocalMap对象中'，当然'如果获取到的ThreadLocalMap对象为空'，
'就通过createMap方法创建'。


'线程隔离的秘密'，'就在于ThreadLocalMap这个类'。'ThreadLocalMap是ThreadLocal类''的一个静态内部类'，
它'实现了键值对''的设置和获取'（对比Map对象来理解），'每个线程'中都'有一个独立的ThreadLocalMap副本'，
'它所存储的值'，'只能被当前线程读取和修改'。'ThreadLocal类'通过'操作每一个线程特有的ThreadLocalMap'
副本，从而'实现了变量访问在不同线程中的隔离'。因为'每个线程的变量都是自己特有的'，完全'不会有并发错误'。
还有一点就是，'ThreadLocalMap'存储的'键值对中的键'是'this对象指向的ThreadLocal对象'，
而'值就是你所设置的对象了'。


为了加深理解，我们接着看上面代码中出现的getMap和createMap方法的实现：
[java] view plain copy print?
/** 
 * Get the map associated with a ThreadLocal. Overridden in 
 * InheritableThreadLocal. 
 * 
 * @param  t the current thread 
 * @return the map 
 */  
ThreadLocalMap getMap(Thread t) {  
    return t.threadLocals;  
}  
  
/** 
 * Create the map associated with a ThreadLocal. Overridden in 
 * InheritableThreadLocal. 
 * 
 * @param t the current thread 
 * @param firstValue value for the initial entry of the map 
 * @param map the map to store. 
 */  
void createMap(Thread t, T firstValue) {  
    t.threadLocals = new ThreadLocalMap(this, firstValue);  
}  

接下来再看一下ThreadLocal类中的get()方法:
[java] view plain copy print?
/** 
 * Returns the value in the current thread's copy of this 
 * thread-local variable.  If the variable has no value for the 
 * current thread, it is first initialized to the value returned 
 * by an invocation of the {@link #initialValue} method. 
 * 
 * @return the current thread's value of this thread-local 
 */  
public T get() {  
    Thread t = Thread.currentThread();  
    ThreadLocalMap map = getMap(t);  
    if (map != null) {  
        ThreadLocalMap.Entry e = map.getEntry(this);  
        if (e != null)  
            return (T)e.value;  
    }  
    return setInitialValue();  
}  

再来看setInitialValue()方法：
[java] view plain copy print?
/** 
    * Variant of set() to establish initialValue. Used instead 
    * of set() in case user has overridden the set() method. 
    * 
    * @return the initial value 
    */  
   private T setInitialValue() {  
       T value = initialValue();  
       Thread t = Thread.currentThread();  
       ThreadLocalMap map = getMap(t);  
       if (map != null)  
           map.set(this, value);  
       else  
           createMap(t, value);  
       return value;  
   }  

　　获取和当前线程绑定的值时，ThreadLocalMap对象是以this指向的ThreadLocal对象为键进行查找的，这当然和前面set()方法的代码是相呼应的。


　　进一步地，我们可以创建不同的ThreadLocal实例来实现多个变量在不同线程间的访问隔离，为什么可以这么做？因为不同的ThreadLocal对象作为不同键，当然也可以在线程的ThreadLocalMap对象中设置不同的值了。通过ThreadLocal对象，在多线程中共享一个值和多个值的区别，就像你在一个HashMap对象中存储一个键值对和多个键值对一样，仅此而已。

小结
　　ThreadLocal是解决线程安全问题一个很好的思路，它通过为每个线程提供一个独立的变量副本解决了变量并发访问的冲突问题。在很多情况下，ThreadLocal比直接使用synchronized同步机制解决线程安全问题更简单，更方便，且结果程序拥有更高的并发性。
ConnectionManager.java
[java] view plain copy print?
package com.test;  
  
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.SQLException;  
  
public class ConnectionManager {  
  
    private static ThreadLocal<Connection> connectionHolder = new ThreadLocal<Connection>() {  
        @Override  
        protected Connection initialValue() {  
            Connection conn = null;  
            try {  
                conn = DriverManager.getConnection(  
                        "jdbc:mysql://localhost:3306/test", "username",  
                        "password");  
            } catch (SQLException e) {  
                e.printStackTrace();  
            }  
            return conn;  
        }  
    };  
  
    public static Connection getConnection() {  
        return connectionHolder.get();  
    }  
  
    public static void setConnection(Connection conn) {  
        connectionHolder.set(conn);  
    }  
}  

后记
　　看到网友评论的很激烈，甚至关于ThreadLocalMap不是ThreadLocal里面的，而是Thread里面的这种评论都出现了，于是有了这个后记，下面先把jdk源码贴上，源码最有说服力了。
[java] view plain copy print?
/** 
     * ThreadLocalMap is a customized hash map suitable only for 
     * maintaining thread local values. No operations are exported 
     * outside of the ThreadLocal class. The class is package private to 
     * allow declaration of fields in class Thread.  To help deal with 
     * very large and long-lived usages, the hash table entries use 
     * WeakReferences for keys. However, since reference queues are not 
     * used, stale entries are guaranteed to be removed only when 
     * the table starts running out of space. 
     */  
    static class ThreadLocalMap {...}  

　　源码就是以上，这源码自然是在ThreadLocal里面的，有截图为证。


　　本文是自己在学习ThreadLocal的时候，一时兴起，深入看了源码，思考了此类的作用、使用范围，进而联想到对传统的synchronize共享变量线程安全的问题进行比较，而总结的博文，总结一句话就是一个是锁机制进行时间换空间，一个是存储拷贝进行空间换时间。

(全文完)
1.'方法声明时使用',放在范围操作符(public等)之后,返回类型声明(void等)之前.
即'一次只能有一个线程进入该方法','其他线程要'想在此时调用该方法,只能'排队等候',
'当前线程'(就是在synchronized方法内部的线程)'执行完'该方法'后,别的线程才能进入'.

public synchronized void synMethod() {
	//方法体
}

2.'对某一代码块使用',synchronized后跟括号,'括号里是变量',这样,'一次只有一个线程进入'该'代码块'.例如:
public int synMethod(int a1){
  synchronized(a1) {
    //一次只能有一个线程进入
  }
}

3.synchronized后面'括号里是'一'对象',此时,'线程获得'的是'对象锁'.例如:
public class MyThread implements Runnable {
  public static void main(String args[]) {
    MyThread mt = new MyThread();
    Thread t1 = new Thread(mt, "t1");
    Thread t2 = new Thread(mt, "t2");
    Thread t3 = new Thread(mt, "t3");
    Thread t4 = new Thread(mt, "t4");
    Thread t5 = new Thread(mt, "t5");
    Thread t6 = new Thread(mt, "t6");

    t1.start();
    t2.start();
    t3.start();
    t4.start();
    t5.start();
    t6.start();
  }

  public void run() {
    synchronized (this) {
      System.out.println(Thread.currentThread().getName());
    }
  }
  
}
对于3,'如果线程进入',则'得到对象锁',那么'别的线程在该类'所有对象'上的任何操作'都'不能进行'.
在'对象'级'使用锁'通常'是一种比较粗糙的方法'。
为什么要'将整个对象'都'上锁'，而'不允许其他线程'短暂地'使用对象'中'其他同步方法'来访问共享资源？
如果'一个对象拥有多个资源'，就'不需要只为了让一个线程使用其中一部分资源'，'就将所有线程都锁在外面'。
'由于每个对象都有锁，可以'如下所示'使用虚拟对象'来'上锁'：
class FineGrainLock {
   MyMemberClass x, y;
   Object xlock = new Object(), ylock = new Object();

   public void foo() {
      synchronized(xlock) {
         //access x here
      }
      //do something here - but don't use shared resources
      synchronized(ylock) {
         //access y here
      }
   }

   public void bar() {
      synchronized(this) {
         //access both x and y here
      }
      //do something here - but don't use shared resources
   }
}

4.synchronized后面括号里是类.例如:
class ArrayWithLockOrder{
  private static long num_locks = 0;
  private long lock_order;
  private int[] arr;

  public ArrayWithLockOrder(int[] a){
    arr = a;
    synchronized(ArrayWithLockOrder.class) {//-----------------------------------------这里
      num_locks++;             // 锁数加 1。
      lock_order = num_locks;  // 为此对象实例设置唯一的 lock_order。
    }
  }

  public long lockOrder(){
    return lock_order;
  }

  public int[] array(){
    return arr;
  }

}


class SomeClass implements Runnable{
  public int sumArrays(ArrayWithLockOrder a1,ArrayWithLockOrder a2){
    int value = 0;
    ArrayWithLockOrder first = a1;       // 保留数组引用的一个
    ArrayWithLockOrder last = a2;        // 本地副本。
    int size = a1.array().length;

    if (size == a2.array().length){
      if (a1.lockOrder() > a2.lockOrder()){// 确定并设置对象的锁定
    	// 顺序。
        first = a2;
        last = a1;
      }

      synchronized(first) { // 按正确的顺序锁定对象。
        synchronized(last) {
          int[] arr1 = a1.array();
          int[] arr2 = a2.array();
          for (int i=0; i<size; i++)
            value += arr1[i] + arr2[i];
        }
      }

    }

    return value;
  }

  public void run() {
    //...
  }

}

对于4,'如果线程进入',则'线程在'该'类中所有操作''不能进行','包括静态变量'和'静态方法',
实际上,对于'含有静态方法'和'静态变量的代码块''的同步',我们通常'用4来加锁'.

以上4种之间的关系：
'锁是和对象相关联的'，'每个对象有一把锁'，'为了执行'synchronized语句，'线程必须'能够'获得'synchronized语句中表达式指定的对象的'锁'，
'一个对象'只有'一把锁'，'被'一个线程'获得之后'它'就不再拥有'这把锁，'线程在执行完'synchronized语句后，将'获得锁'交还给对象。

在'方法前'面'加'上'synchronized'修饰符即'可'以'将一个方法声明''为同步化方法'。'同步化方法在执行'之'前''获得'一个'锁'。
'如果'这'是'一个'类方法'，那么'获得的锁''是'和声明'方法的类'相关'的Class类对象的锁'。'如果'这'是一个实例方法'，那么此'锁是this对象的锁'。



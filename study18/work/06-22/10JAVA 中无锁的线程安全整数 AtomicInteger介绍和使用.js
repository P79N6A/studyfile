'JAVA 中''无锁'的'线程安全整数' 'AtomicInteger'，一个'提供原子操作'的'Integer的类'。
在'Java语言中'，'++i和i++操作'并'不是线程安全的'，在使用的时候，

不可避免的会用到synchronized关键字。而'AtomicInteger''则通过'一种'线程安全'的'加减操作接口'。
AtomicInteger为什么能够达到多而不乱，处理高并发应付自如呢？

'这是由''硬件''提供''原子操作指令''实现'的，这里面用到了一种并发技术：CAS。
'在'非'激烈竞争'的'情况下'，'开销更小'，'速度更快'。
Java.util.concurrent中'实现的原子操作类''包括'：
AtomicBoolean、AtomicInteger、AtomicIntegerArray、AtomicLong、AtomicReference、AtomicReferenceArray。
/**
 * 来看AtomicInteger提供的接口。
 */

 //获取当前的值
 public final int get()
 
 //取当前的值，并设置新的值
  public final int getAndSet(int newValue)
 
 //获取当前的值，并自增
  public final int getAndIncrement() 
 
 //获取当前的值，并自减
 public final int getAndDecrement()
 
 //获取当前的值，并加上预期的值
 public final int getAndAdd(int delta) 


例子代码为：

AtomicOperationDemo.java
import java.util.*;  
import java.util.concurrent.*;  
import java.util.concurrent.atomic.*;  
/* 
 * ava.util.concurrent中实现的原子操作类包括： 
 * AtomicBoolean、AtomicInteger、AtomicIntegerArray、AtomicLong、AtomicReference、 
 * AtomicReferenceArray。 
 */  
public class AtomicOperationDemo {  
       static AtomicInteger count=new AtomicInteger(0);  
       public static class AddThread implements Runnable{  
        @Override  
        public void run() {  
            for(int k=0;k<1000;k++){  
                count.incrementAndGet();  
            }  
         }   
       }  
       public static void AtomicIntShow(){  
         System.out.println("AtomicIntShow() enter");  
         ExecutorService threadpool =   Executors.newFixedThreadPool(10);  
           
         for(int k=0;k<100;k++){  
             threadpool.submit(new AddThread());  
         }  
           
         try {  
            Thread.sleep(2000);  
        } catch (InterruptedException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
           
         /* output 
          * AtomicIntShow() enter 
          * result of acumulated sum=100000 
          * AtomicIntShow() exit 
          */  
           
         System.out.println("result of acumulated sum="+count);  
         threadpool.shutdown();  
         System.out.println("AtomicIntShow() exit");  
         return ;  
          
    }  
}  


Maintest.java
public class Maintest {  
    public static void main(String[] args) {  
        AtomicOperationDemo.AtomicIntShow();  
    }  
}  

 /* output 
  * AtomicIntShow() enter 
  * result of acumulated sum=100000 
  * AtomicIntShow() exit 
  */  


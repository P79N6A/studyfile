从名字可以看出，'CountDownLatch是'一个'倒数计数'的'锁'，
当倒数'到0时'触发事件，也就是'开锁'，'其他人'就'可以进入'了。


在一些'应用场合：'中，需要'等待某个条件''达到要求后''才能（执行）'做后面的事情；
'同时''当线程都完成后'也'会触发事件'，'以便'进行'后面的操作'。

CountDownLatch'最重要的方法'是'countDown()'和'await()'，
'countDown()'前者'主要'是'倒数一次'，
'await()'后者'是等'待'倒数到0'，如果'没有到'达'0'，'就'只有'阻塞等待'了。



下面的'例子'简单的说明了CountDownLatch的使用方法，'模拟'了'100米赛跑'，
'10名选手'已经准备'就绪'，只'等(待开始)'裁判一声令下。当'所有人'都'到达终'点时，比赛'结束'。

import java.util.concurrent.CountDownLatch;   
import java.util.concurrent.ExecutorService;   
import java.util.concurrent.Executors;   
  
public class CountDownLatchDemo {
    private static final int PLAY_AMOUNT = 10;   
    public static void main(String[] args) {   
         /*
          * 选手开始跑
          */  
         CountDownLatch begin = new CountDownLatch(1);   
         /*
          * 当队员到终点，则报告一个到达，所有人到达，比赛结束
          */  
         CountDownLatch end = new CountDownLatch(PLAY_AMOUNT);  
         //10个队员
         Player[] plays = new Player[PLAY_AMOUNT];   
         for(int i = 0;i<PLAY_AMOUNT;i++) {   
             plays[i] = new Player(i+1,begin,end);   
         }   
         //10个线程
         ExecutorService exe = Executors.newFixedThreadPool(PLAY_AMOUNT); 
         //10个进入就绪
        for(Player p : plays) {
             exe.execute(p);   
         }   
         System.out.println("比赛开始");
         begin.countDown();//宣布开始
        try {   
             end.await();//等待结束
         } catch (InterruptedException e) {   
             e.printStackTrace();   
         } finally {   
             System.out.println("比赛结束");   
         }   
           
        //注意：此时main线程已经要结束了，但是exe线程如果不关闭是不会结束的   
         exe.shutdown();   
     }   
  
}   
  
  
class Player implements Runnable {   
  
    private int id;   
       
    private CountDownLatch begin;   
       
    private CountDownLatch end;   
  
    public Player(int id, CountDownLatch begin, CountDownLatch end) {   
        super();   
        this.id = id;   
        this.begin = begin;   
        this.end = end;   
     }   
  
    public void run() {   
        try {   
             begin.await();//必须等到裁判countdown到0的时候才开始   
             Thread.sleep((long)(Math.random()*100));//模拟跑步需要的时间   
             System.out.println("Play "+id+" has arrived. ");   
         } catch (InterruptedException e) {   
             e.printStackTrace();   
         } finally {   
             end.countDown();//向评委报告跑到终点了   
         }   
     }   
}  
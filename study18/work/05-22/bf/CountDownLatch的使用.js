'CountDownLatch是'一个'同步辅助类'，在完成一组正'在其他线程'中'执行的操作之前'，
它'允许一个或多个线程值等待。


考虑一个'计算多线程'的'执行时间'。

package com.gwolf;
import java.util.concurrent.CountDownLatch;
public class TestCountDownLatchPro {
    public static void  main(String[] args) {
        CountDownLatch countDownLatch = new CountDownLatch(5);
        LatchDemo latchDemo = new LatchDemo(countDownLatch);
        long start = System.currentTimeMillis();
        for(int i = 0;i< 10;i++) {
            new Thread(latchDemo).start();
        }
        long end = System.currentTimeMillis();
        System.out.println("耗费时间：" + (end -start));
    }
}

class LatchDemo implements Runnable {
    //闭锁
    private CountDownLatch countDownLatch;
    public LatchDemo(CountDownLatch countDownLatch) {
        this.countDownLatch = countDownLatch;
    }

    @Override
    public void run() {
        for(int i = 0;i < 500000;i++) {
            if(i % 2 == 0) {
                System.out.println(i);
            }
        }
    }
}

现在程序计算出来的时间是'统计不出所有线程执行完''的总时间'的。

使'用CountDownLatch闭锁'，'等其他线程执行完'成，'主线程'才'去计算'线程的'整体执行时间'。

'初始化闭锁'的初始'变量为5'
CountDownLatch countDownLatch = new CountDownLatch(5);
'每个线程''执行就减少1'

重新修改程序，每次线程执行减少1
package com.gwolf;
import java.util.concurrent.CountDownLatch;
public class TestCountDownLatch {
    public static void  main(String[] args) throws InterruptedException {
        CountDownLatch countDownLatch = new CountDownLatch(5);
        LatchDemo latchDemo = new LatchDemo(countDownLatch);
        long start = System.currentTimeMillis();
        for(int i = 0;i< 10;i++) {
            new Thread(latchDemo).start();
        }

        countDownLatch.await();

        long end = System.currentTimeMillis();

        System.out.println("耗费时间：" + (end -start));
    }
}

class LatchDemo implements Runnable {
    //闭锁
    private CountDownLatch countDownLatch;

    public LatchDemo(CountDownLatch countDownLatch) {
        this.countDownLatch = countDownLatch;
    }

    @Override
    public void run() {
        synchronized (this) {
            try {
                for (int i = 0; i < 50; i++) {
                    if (i % 2 == 0) {
                        System.out.println(i);
                    }
                }
            } finally {
                countDownLatch.countDown();
            }
        }
    }

}
运行程序，查看执行结果：

使'用闭锁可以'使'用多线程计算'整个'库存的数量总和'
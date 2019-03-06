2.1 从线程到多线程

首先你应该知道什么是线程：

'线程'：'程序执行'流的'最小单元'。它'是进程内一个'相对独立的、可调度的'执行单元'，是系统独立调度和分派CPU的基本单位。
如同大自然中的万物，线程也有“生老病死”的过程，下图表示了一个线程从创建到消亡的过程，以及过程中的状态。

线程生命周期

结合线程的生命周期，我们再来看看多线程的定义：

'多线程'：从软件或者硬件上实现'多个线程并发执行'的技术。在'单个程序中同时运行多个线程完成不同的工作'。
在Java中，'垃圾回收机制'就是'通过一个线程在后台实现的'，这样做的好处在于：开发者通常不需要为内存管理投入太多的精力。
反映到我们现实生活中，在浏览网页时，'浏览器'能够'同时下载多张图片'；实验楼的服务器能够容纳多个用户同时进行在线实验，
这些都'是多线程带来的好处'。

从专业的角度来看，'多线程'编程是为了'最大限度地利用CPU'资源——当处理'某个线程不需要占用CPU'而'只需要利用IO资源时'，
'允许其他'的那些需要CPU资源的'线程'有机会'利用CPU'。这或许就是多线程编程的最终目的。当然，你也可以进一步了解为什么使用多线程。

对于多线程和线程之间的关系，你可以这样理解：一个使用了'多线程技术的程序'，'包含了两条或两条以上并发运行的线程'（Thread）。

Java中的'Thread类就是专门用来创建线程和操作线程的类'，我们来具体学习一下。

2.2 使用Thread类

2.2.1 创建线程

根据我们前面所学，我们可以自定义一个类，然后继承Thread类来使其成为一个线程类。

那么我们要把线程要做的事情放在哪里呢？在Java中，'run()'方法为线程'指明了它要完成的任务'，你可以通过下面两种方式来
为线程提供run方法：

继承Thread类并重写它的run()方法，然后'用这个子类来创建对象并调用start()方法'。


通过定义一个类，'实现Runnable接口，实现run()方法'。
概括一下，'启动线程的唯一的方法便是start()'，而你需要把'待完成的工作（功能代码）放入到run()方法中'。

我们来创建两个线程试试。请在Eclipse中新建项目ThreadLearning，创建包com.shiyanlou.course并新建一个带有主方法的类CreateThread。

代码片段如下，我们在注释中继续讲解：

package com.shiyanlou.course;

public class CreateThread {

    public static void main(String[] args)
    {
        Thread1 thread1 = new Thread1();
        //声明一个Thread1对象，这个Thread1类继承自Thread类的

        Thread thread2 = new Thread(new Thread2());
        //这里再次用到了匿名内部类

        thread1.start();
        thread2.start();
        //启动线程
    }
}

class Thread1 extends Thread
{
    public void run()
    {
        //在run()方法中放入线程要完成的工作

        //这里我们把两个线程各自的工作设置为打印100次信息
        for (int i = 0; i < 100; ++i)
        {
            System.out.println("Hello! This is " + i);
        }

        //在这个循环结束后，线程便会自动结束
    }
}

class Thread2 implements Runnable {
    //与Thread1不同，如果当一个线程已经继承了另一个类时，就建议你通过实现Runnable接口来构造

    public void run(){
        for (int i = 0; i < 100; ++i)
        {
            System.out.println("Thanks. There is " + i);
        }
    }
}
编译并运行此程序，你在控制台就可以看到下面这样的输出信息。'两个线程近似交替地在输出信息'。
受到系统调度的影响，两个线程输出信息的先后顺序可能不同。

输出信息

2.2.2 查看'线程'运行'状态'

线程的状态共有6种，分别是：'新建New'、'运行'（可运行）Runnable、'阻塞'Blocked、'计时等待'Timed Waiting、'等待'Waiting和'终止'Terminate。

当你'声明一个线程对象'时，线程'处于新建状态'，系统不会为它分配资源，它只是一个空的线程对象。

调用'start()方法时'，线程就'成为了可运行状态'，至于是否是运行状态，则要看系统的调度了。

调用了'sleep()方法'、调用'wait()方法和IO阻塞时'，'线程处于等待'、'计时等待或阻塞状态'。

当'run()方法执行结束后，线程也就终止了'。
我们通过一个例子来加深对于这些状态的理解。请再上个项目的同一个包内新建ThreadState类，用于自定义线程的状态。

主要的代码如下：

package com.shiyanlou.course;

public class ThreadState implements Runnable {

    public synchronized void waitForAMoment() throws InterruptedException {

        wait(500); 
        //使用wait()方法使当前线程等待500毫秒
        //或者等待其他线程调用notify()或notifyAll()方法来唤醒
    }

    public synchronized void waitForever() throws InterruptedException {

        wait(); 
        //不填入时间就意味着使当前线程永久等待，
        //只能等到其他线程调用notify()或notifyAll()方法才能唤醒
    }

    public synchronized void notifyNow() throws InterruptedException {

        notify(); 
        //使用notify()方法来唤醒那些因为调用了wait()方法而进入等待状态的线程
    }

    public void run() {

        //这里用异常处理是为了防止可能的中断异常
        //如果任何线程中断了当前线程，则抛出该异常

        try {
            waitForAMoment(); 
            // 在新线程中运行waitMoment()方法

            waitForever(); 
            // 在新线程中运行waitForever()方法

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
然后再新建一个测试类ThreadTest，用于输出这些状态。

接下来会用到sleep()方法，下面给出了这个方法的使用方法。

sleep()，在指定的毫秒数内让当前正在执行的线程休眠（暂停执行），'此操作受'到系统计时器和调度'程序精度和准确性的影响'。
填入的参数为休眠的时间（单位：毫秒）。
package com.shiyanlou.course;

public class ThreadTest {
    public static void main(String[] args) throws InterruptedException {
        ThreadState state = new ThreadState();
        //声明并实例化一个ThreadState对象

        Thread thread = new Thread(state);
        //利用这个名为state的ThreadState对象来创建Thread对象

        System.out.println("Create new thread: " + thread.getState());
        //使用getState()方法来获得线程的状态，并进行输出

        thread.start(); 
        //使用thread对象的start()方法来启动新的线程

        System.out.println("Start the thread: " + thread.getState());
        //输出线程的状态

        Thread.sleep(100); 
        //通过调用sleep()方法使当前这个线程休眠100毫秒，从而使新的线程运行waitForAMoment()方法

        System.out.println("Waiting for a moment (time): " + thread.getState());
        //输出线程的状态

        Thread.sleep(1000); 
        //使当前这个线程休眠1000毫秒，从而使新的线程运行waitForever()方法

        System.out.println("Waiting for a moment: " + thread.getState());
        //输出线程的状态

        state.notifyNow(); 
        // 调用state的notifyNow()方法

        System.out.println("Wake up the thread: " + thread.getState());
        //输出线程的状态

        Thread.sleep(1000); 
        //使当前线程休眠1000毫秒，使新线程结束

        System.out.println("Terminate the thread: " + thread.getState());
        //输出线程的状态
    }
}
检查一下代码，点击编译并运行，在控制台观察一下线程在运行过程中输出的状态。

此处输入图片的描述

三、实验总结

我们在这一节的课程中，把重心放在了对于'线程的生命周期'及其'状态'的'理解上'，并通过'两种'不同的'方式创建了线程'。
'多线程'技术能够'对'我们的'程序带来'一些'质的提升'，希望你能将其应用到平时的开发过程中。









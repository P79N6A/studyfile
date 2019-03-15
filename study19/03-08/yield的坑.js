在学习Java线程时，里面有个方法'yield'。但是按照老师给的例子在自己电脑上'运行时'，
始终'得不到'跟老师'一样的结果'。研究了半天，才发现问题之所在！
下面用网上的一个例子和网友的回复来证实我的猜想！

以下是转载的例子。（http://blog.csdn.net/dabing69221/article/details/17426953）

Java Thread.yield详解 
前言： 
前几天复习了一下多线程，发现有许多网上讲的都很抽象，所以，自己把网上的一些案例总结了一下！

一. 'Thread.yield()方法'：
'使当前线程从执行状态'（运行状态）'变为可执行态'（就绪状态）。
'cpu'会'从众多的可执行态里选择'，也就是说，
当前也就是'刚刚的那个线程'还是'有可能会被再次执行'到的，
并'不是说''一定会执行其他线程'而该线程在下一次中不会执行到了。

Java线程中有一个Thread.yield( )方法，很多人翻译成线程让步。
顾名思义，就是说当一个线程使用了这个方法之后，它就会把自己CPU执行的时间让掉，
让自己或者其它的线程运行。

打个比方：现在有很多人在'排队上厕所'，好不容易'轮到这个人上厕所了'，
突然'这个人说'：“我要和'大家来个竞赛'，'看谁先抢到厕所！'”，然后所有的人在同一起跑线冲向厕所，
有可能是别人抢到了，也有可能他自己有抢到了。我们还知道线程有个优先级的问题，
那么手里'有优先权的'这些人就'一定能抢到厕所'的位置'吗?' 
不一定的，他们'只是概率上大些'，也有可能没特权的抢到了。

package com.yield;

public class YieldTest extends Thread {
	
	public YieldTest(String name) {  
	    super(name);  
	}  

	@Override  
	public void run() {  
	    for (int i = 1; i <= 50; i++) {  
	        System.out.println("" + this.getName() + "-----" + i);  
	        // 当i为30时，该线程就会把CPU时间让掉，'让其他或者自己的线程执行'（也就是谁先抢到谁执行）  
	        if (i == 30) {  
	            this.yield();  
	        }  
	    }  
	}  

	public static void main(String[] args) {  
	    YieldTest yt1 = new YieldTest("张三");  
	    YieldTest yt2 = new YieldTest("李四");  
	    yt1.start();  
	    yt2.start();  
	}  
} 
运行结果： 
第一种情况：'李四'（线程）当执行'到30时'会'CPU时间让掉'，这时'张三（线程）抢到CPU时间并执行'。

第二种情况：'李四'（线程）当执行'到30时'会'CPU时间让掉'，这时'李四（线程）抢到CPU时间并执行'。

网友A: 
博主我复制您的代码运行后始终不出现有说服力的结果，始终是张三李四分别30/31，没有说服力，
跟您的结果有些出入，不知道问题出在哪儿，不知道您是否可以帮我解答，谢谢。 
网友B的回复： 
这段代码当然不能给出有说服力的结果. 
'yield的本质'是'把当前线程''重新置入''抢CPU时间的”队列”'(队列'只是说所有线程都在一个起跑线上'.'并非真正意义上的队列')。 
如果'李四抢的好'.当然就是'李四继续上'. '张三抢的好就是张三的'. 这个示例里面没有耗时操作. 所以看不出什么区别。


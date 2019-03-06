'ThreadPoolExecutor''是'java.util.concurrent包提供的'基础线程池'，使用非常广泛
让我们来看一下线程池的使用和内部实现原理
下面是ThreadPoolExecutor的一个'构造方法'，最终'所有其他构造方法''都要调用''这个构造方法'，
来看一下'构造方法'中的'参数的作用'

'corePoolSize'：'核心线程池'的'大小'，当提交'一个任务''到线程池时'，'线程池''会创建一个线程'
来'执行任务'，'即使其他空闲的基本线程''能够执行新任务''也会创建线程'，
'等到'需'要执行的任务数''大于'线程池'基本大小'时'就不再创建'。
'调用perstartAllCoreThreads()方法'，'线程池''会提前创建''并启动所有基本线程'

'maximumPoolSize'：'线程池''允许创建'的'最大线程数'。'如果队列满了'，并'且已经创建'的'线程数'
'小于''最大线程数'，则'线程池''会再创建新的线程''执行任务'。'如果是无界队列'这个'参数不起作用'

'keepAliveTime'：当'线程池中线程数''大于corePoolSize时'，'keepAliveTime''为多余的空闲线程'
'等待新任务的最长时间'，'超过这个时间'后'多余的线程'将'被终止'。这里把keepAliveTime设置为'0L'，
'意味着''多余的空闲线程'会被'立即终止'。

'unit'：'时间单元'

'workQueue'：'线程池'的'工作队列'，工作队列最'常用'的'有如下几种'

'ArrayBlockingQueue'：'是一个'基于'数组结构'的'游街阻塞队列'

'LinkedBlockingQueue'：'基于链表结构'的'阻塞队列'

'SynchronousQueue'：'不存储元素'的'阻塞队列'，'插入元素后'必'须等待另一个线程''调用移除操作'

'threadFactory'：'创建线程的工厂'

'handler'：饱和策略。'当队列'和'线程都满了'，必'须采取''一种策略''处理''提交的新任务'。
'默认策略'是'AbortPolicy'，JDK1.5提供了如下4种策略，
除了这四种策略外'还可以自己来实现'RejectedExecutionHandler接口来'实现自定义'的'策略'
AbortPolicy：直接'抛出异常'
CallerRunsPolicy：只'用调用者所在线程'来'运行任务'
DiscardOldestPolicy：'丢弃队列'里'最近的'一个'任务'，并执行当前任务
DiscardPolicy：'不处理，丢弃掉'

public ThreadPoolExecutor(int corePoolSize,  
	      int maximumPoolSize,  
	      long keepAliveTime,  
	      TimeUnit unit,  
	      BlockingQueue<Runnable> workQueue,  
	      ThreadFactory threadFactory,  
	      RejectedExecutionHandler handler) {  
    if (corePoolSize < 0 || maximumPoolSize <= 0 || maximumPoolSize < corePoolSize || keepAliveTime < 0)  
        throw new IllegalArgumentException();  
    if (workQueue == null || threadFactory == null || handler == null)  
        throw new NullPointerException();  
    this.corePoolSize = corePoolSize;  
    this.maximumPoolSize = maximumPoolSize;  
    this.workQueue = workQueue;  
    this.keepAliveTime = unit.toNanos(keepAliveTime);  
    this.threadFactory = threadFactory;  
    this.handler = handler;  
}  
'线程池'的'实现原理'
当向'线程池''提交一个任务之后'，线程池的'处理流程如下'：
1）'线程池''判断''核心线程池里的线程''是否都在执行任务'。
'如果不是'，则'创建'一个'新的工作线程'来'执行任务'（使用threadFactory来创建）。
'如果核心线程池'里的'线程都在执行任务'，则'进入下个流程'

2）'线程池''判断工作队列''是否已经满了'。如果工作队列'没有满'，
则'将新提交的任务''存储在'这个'工作队列里'（对应构造函数中的workQueue），
如果工作队列'满了'，则'进入下个流程'

3）'线程池''判断线程池是否已经满了'（线程'达到了最大数'，且'任务队列都满了'）。
'如果没有'，'创建'一个'新的工作线程'来'执行任务'。'如果'已经'满了'，
'任务'将'被拒绝''并交给饱和策略'来'处理这个任务'

'线程池创建好'了'之后'就可以'向线程池'里'提交任务'了

向线程池提交任务'有两种方法'，分别是'execute()'和'submit()'方法

区别是'execute()'方法'用于提交''没有返回值的任务'，
'submit()'方法'用于提交''需要返回值的任务'。
'线程池'会'返回'一个'Future类型的对象'，'通过'这个future'对象可以判断'任务'是否执行成功'，
并且可以'通过future的get()方法'来'获取返回值'，'get()方法会阻塞当前线程''直到任务完成'，
'还可以使用重载的get()'方法'阻塞一段时间后返回''不管任务是否执行完'

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
public class ThreadPoolExecutorDemo {
	public static void main(String[] args) {
		ThreadPoolExecutor tpe = new ThreadPoolExecutor(1, 1, 1, TimeUnit.SECONDS, new LinkedBlockingDeque<Runnable>());
		tpe.execute(new Runnable() {
			@Override
			public void run() {
				try {
					Thread.sleep(5000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("执行run方法");
			}
		});

		Future<String> future = tpe.submit(new Callable<String>() {
			@Override
			public String call() throws Exception {
				try {
					Thread.sleep(5000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("执行call方法");
				return "success";
			}
		});

		for (int i = 0; i < 5; i++) {
			String str = null;
			try {
				str = future.get(2, TimeUnit.SECONDS);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (TimeoutException e) {
				System.err.println("超时未返回");
			}
			System.out.println("get方法返回值为:" + str);
		}
	}
	
}

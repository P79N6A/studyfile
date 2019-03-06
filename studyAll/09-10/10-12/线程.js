通过java.util.concurrent.ExecutorService接口对象来执行任务，
该接口对象通过工具类java.util.concurrent.'Executors'的静态方法来创建。
 
Executors此包中所定义的 Executor、ExecutorService、ScheduledExecutorService、
ThreadFactory 和 Callable 类的工厂和实用方法。
 
ExecutorService提供了'管理终止的方法'，以及可为'跟踪一个'或'多个异步任务'执行状况而'生成' 
'Future 的方法'。 可以'关闭 ExecutorService'，这将'导致其停止接受新任务'。关闭后，
'执行程序将最后终止'，这时'没有任务在执行'，也'没有任务在等待执行'，并且'无法提交新任务'。
executorService.execute(new TestRunnable());
 
1、创建ExecutorService
通过工具类java.util.concurrent.Executors的静态方法来创建。
Executors此包中所定义的 Executor、ExecutorService、ScheduledExecutorService、
ThreadFactory 和 Callable 类的工厂和实用方法。
 
比如，创建一个ExecutorService的实例，ExecutorService实际上是一个线程池的管理工具：
        ExecutorService executorService = Executors.newCachedThreadPool();
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        ExecutorService executorService = Executors.newSingleThreadExecutor();
 
2、将任务添加到线程去执行
当将一个任务添加到线程池中的时候，线程池会为每个任务创建一个线程，该线程会在之后的某个时刻自动执行。
 
三、关闭执行服务对象
        executorService.shutdown();
1. 【强制】'获取''单例对象'需'要保证线程安全'，其中的'方法'也'要保证线程安全'。
说明：'资源驱动类'、'工具类'、'单例工厂类'都'需要注意'。

2. 【强制】'创建线程'或'线程池'时'请指定'有意义的'线程名称'，方便'出错时回溯'。
正例：
public class TimerTaskThread extends Thread {
	public TimerTaskThread() {
		super.setName("TimerTaskThread");
		...
	}
}

3. 【强制】'线程资源''必须通过线程池''提供'，'不允许在应用中'自行'显式创建线程'。
说明： '使用线程池'的好处是'减少在创建和销毁线程'上所'消耗的时间'以'及系统资源的开销'，
'解决资源不足'的问题。如果'不使用线程池'，有'可能造成'系统'创建大量同类线程'而'导致消耗完内存'
'或'者'“过度切换”的问题'。

4. 【强制】'线程池''不允许'使'用Executors去创建'，而是'通过 ThreadPoolExecutor' 的方式，
'这样'的'处理'方式'让写的同学'更加'明确线程池'的'运行规则'，'规避资源耗尽'的'风险'。
说明： 'Executors返回的线程池'对象的'弊端如下'：
1） 'FixedThreadPool' 和 'SingleThreadPool':
'允许的请求队列长度为' 'Integer.MAX_VALUE'，可能'会堆积大量的请求'，从而导致OOM。
2） 'CachedThreadPool' 和 'ScheduledThreadPool':
'允许的创建线程数量为' 'Integer.MAX_VALUE'，可能'会创建大量的线程'，从而导致OOM。

5. 【强制】'SimpleDateFormat' 是'线程不安全'的类，一般'不要定义为 static' 变量，
'如果定义为 static'，必'须加锁'，'或者使用 DateUtils 工具类'。
正例： '注意线程安全'，'使用 DateUtils'。'亦推荐如下处理'：
private static final ThreadLocal<DateFormat> df = new ThreadLocal<DateFormat>() {
	@Override
	protected DateFormat initialValue() {
		return new SimpleDateFormat("yyyy-MM-dd");
	}
};
说明：'如果是 JDK8'的应用，'可以使用 Instant 代替 Date'，'LocalDateTime 代替 Calendar'，
'DateTimeFormatter' '代替 SimpleDateFormat'，官方给出的解释： simple beautiful strong
immutable thread-safe。

6. 【强制】'高并发时'，'同步调用''应该'去'考量''锁的性能''损耗'。'能用无锁数据结构'，'就不要用锁'； 
'能锁区块'，就'不要锁'整个'方法体'； '能用对象锁'，就'不要用类锁'。
说明： 尽可能使'加锁的代码块'工作量'尽可能的小'，'避免在锁代码块'中'调用 RPC 方法'。

7. 【强制】'对''多个资源'、'数据库表'、'对象'同时'加锁时'，需要'保持一致'的'加锁顺序'，
'否则可能'会'造成死锁'。
说明：'线程一'需'要对表 A、 B、 C' 依次'全部加锁后'才可以'进行更新'操作，那么'线程二'的'加锁顺序'
'也必须是 A、 B、 C'，'否则可能出现死锁'。

8. 【强制】'并发修改'同一记录时，'避免更新丢失'， 需'要加锁'。 '要么在应用层''加锁'，'要么在缓存'
'加锁'，'要么在''数据库层'使'用乐观锁'，使用 version 作为更新依据。
说明： 如果'每次''访问冲突概率''小于 20%'，'推荐'使'用乐观锁'，'否则'使'用悲观锁'。
'乐观锁'的'重试次数''不得''小于 3 次'。

9. 【强制】'多线程''并行处理定时'任务时，'Timer''运行多个 TimeTask'时，只要'其中之一''没'有'捕获'
抛出的'异常'，其它任务'便会自动终止'运行，使'用ScheduledExecutorService'则'没有这个问题'。

10.【推荐】'使用 CountDownLatch' 进行'异步转同步'操作，'每个线程''退出前'必'须调用 countDown'
方法，'线程执行代码''注意 catch 异常'，'确保 countDown' 方法'被执行到'，'避免主线程无法执行'
'至 await 方法'，直到'超时''才返回结果'。
说明： 注意，'子线程抛出异常堆栈'，'不能在主线程 try-catch 到'。

11.【推荐】'避免 Random 实例''被多线程使用'，虽然'共享该实例''是线程安全'的，但'会因竞争'
'同一seed''导致'的'性能下降'。
说明： Random 实例包括 'java.util.Random' 的实例或者 'Math.random()'的方式。
正例： 在 JDK7 之后，可以直接使用 API ThreadLocalRandom， 而在 JDK7 之前， 需要编码保
证每个线程持有一个实例。

12. 【推荐】'在并发场景下'，'通过双重检查锁'（double-checked locking）'实现延迟初始化'
的'优化问题隐患'(可参考 The "Double-Checked Locking is Broken" Declaration)， '推荐'解
决'方案中较为简单一种'（适用于 JDK5 及以上版本） ，将'目标属性''声明为volatile型'。
反例：
class LazyInitDemo {
	private Helper helper = null;
	public Helper getHelper() {
		if (helper == null) synchronized(this) {
			if (helper == null){
				helper = new Helper();
			}
		}
		return helper;
	}
}

13.【参考】'volatile''解决多线程''内存''不可见问题'。'对于一写多读'，是'可以解决变量''同步问题'，
但是'如果多写'，'同样无法解决''线程安全问题'。'如果'是 'count++'操作，使'用如下类实现'：
AtomicInteger count = new AtomicInteger(); 
count.addAndGet(1); 
如果是'JDK8'，'推荐使用''LongAdder对象'，'比AtomicLong性能更好'（减少乐观锁的重试次数） 。

14.【参考】'HashMap'在'容量不够''进行resize时'由于'高并发可能出现死链'，'导致 CPU 飙升'，
在'开发过程中'可以'使用其它数据结构'或'加锁'来'规避此风险'。

15.【参考】'ThreadLocal''无法解决''共享对象'的'更新问题'，'ThreadLocal对象''建议'使'用 static'
'修饰'。'这个变量'是'针对'一个'线程内''所有操作''共享'的，所以'设置为静态变量'，
'所有此类实例''共享''此静态变量' ，也就是说'在类第一次被使用时装载'，'只分配一块存储空间'，所有'此类的对象'
(只是这个线程内定义的)'都可以操控这个变量'。

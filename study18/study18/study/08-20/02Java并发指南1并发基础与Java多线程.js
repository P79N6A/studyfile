'什么是并发'
在过去'单CPU时代'，'单任务'在'一个时间点''只能执行''单一程序'。
之后发展到'多任务阶段'，计算机'能在同一时间点''并行执行''多任务'或多进程。
虽然并不是真正意义上的“同一时间点”，
而是'多个任务'或进程'共享一个CPU'，并'交由操作系统'来'完成''多任务间对CPU'的'运行切换'，
以'使'得'每个任务'都'有机会''获得一定的时间片''运行'。

'随着多任务'对软件开发者'带来的新挑战'，'程序不在能假设''独占''所有'的'CPU时间'、
'所有的内存'和其他计算机资源。一个'好的程序'榜样是在其'不再使用'这些'资源时'
'对其'进行'释放'，以'使'得'其他程序'能'有机会''使用'这些资源。

再后来'发展到多线程'技术，使得'在一个程序内部'能'拥有多个线程''并行执行'。
'一个线程'的'执行'可以'被认为'是一个'CPU在执行该程序'。当'一个程序'运行'在多线程下'，
'就好像'有'多个CPU'在'同时执行该程序'。

'多线程比多任务''更加有挑战'。'多线程'是在'同一个程序内'部'并行执行'，
因此'会对相同的内存空间'进行'并发读写操作'。这可能是'在单线程'程序中从来'不会遇到的问题'。
其中的'一些错误'也未必'会在单CPU机器上出现'，因为'两个线程'从来'不会得到真正的并行执行'。
然而，'更现代的计算机'伴随着'多核CPU的出现'，
也就'意味着''不同的线程'能'被不同的CPU核''得到真正'意义'的并行执行'。

如果'一个线程'在'读一个内存时'，'另一个线程'正'向该内存进行写操作'，
那进行'读操作'的那个'线程将获得什么结果呢'？是写操作之前旧的值？
还是写操作成功之后的新值？或是一半新一半旧的值？
或者，如果是'两个线程同时写同一个内存'，在'操作完成后'将'会是什么结果呢'？
是第一个线程写入的值？还是第二个线程写入的值？还是两个线程写入的一个混合值？
因此如没有合适的预防措施，任何结果都是可能的。
而且这种行为的发生甚至不能预测，所以结果也是不确定性的。

'Java的多线程和并发性'
Java是最先支持多线程的开发的语言之一，Java从一开始就支持了多线程能力，
因此Java开发者能常遇到上面描述的问题场景。这也是我想为Java并发技术而写这篇系列的原因。
作为对自己的笔记，和对其他Java开发的追随者都可获益的。

该系列'主要关注Java多线程'，但'有些'在'多线程中出现的问题'会'和多任务'以及'分布式系统中出现的''存在类似'，
因此'该系列会将多任务'和'分布式系统方面''作为参考'，所以'叫法上称为“并发性”'，'而不是“多线程”'。

'多线程的优点'
尽管面临很多挑战，多线程有一些优点使得它一直被使用。这些优点是：
'资源利用率更好'
'程序设计'在'某些情况下更简单'
'程序响应更快'

'**资源利用率更好'
想象一下，'一个应用程序'需'要从本地文件系统'中'读取和处理文件'的情景。
比方说，'从磁盘读取一个文件'需'要5秒'，'处理一个文件'需'要2秒'。处理两个文件则需要：
1	5秒读取文件A
2	2秒处理文件A
3	5秒读取文件B
4	2秒处理文件B
5	---------------------
6	总共需要14秒
从磁盘中读取文件的时候，'大部分的CPU时间'用于'等待磁盘去读取数据'。
在这段时间里，CPU非常的空闲。它可以做一些别的事情。
通过改变操作的顺序，就能够更好的使用CPU资源。看下面的顺序：
1	5秒读取文件A
2	5秒读取文件B + 2秒处理文件A
3	2秒处理文件B
4	---------------------
5	总共需要12秒
'CPU等待第一个文件被读取完'。然后'开始读取第二个文件'。
当'第二文件在被读取的时候'，'CPU会去处理第一个文件'。
记住，在'等待磁盘读取文件的时候'，'CPU大部分时间是空闲的'。

总的说来，'CPU'能够'在等待IO的时候''做'一些'其他的事情'。这个不一定就是磁盘IO。
它也可以是网络的IO，或者用户输入。
通常情况下，网络和磁盘的IO比CPU和内存的IO慢的多。

'**程序设计更简单'
在'单线程应用程序'中，如果你'想编写程序手动处理'上面所提到的读取和处理的顺序，
你'必须记录每个文件读取和处理的状态'。'相反，你可以启动两个线程'，
'每个线程处理一个文件的读取和操作'。'线程'会'在等待磁盘读取文件'的过程中'被阻塞'。
在'等待的时候'，'其他的线程'能够'使用CPU去处理''已经读取完的文件'。
其'结果就是'，'磁盘'总是'在繁忙地读取不同的文件'到内存中。
这会'带来磁盘和CPU''利用率的提升'。
而且'每个线程'只需要'记录一个文件'，因此'这种方式'也'很容易编程实现'。

'**程序响应更快'
将'一个单线程应用程序''变成多线程应用程序'的另一个常见的目的'是实现一个响应更快的应用程序'。
设想一个服务器应用，它在某一个端口监听进来的请求。
'当一个请求到来时'，它'去处理这个请求'，然'后再返回去监听'。
'服务器'的'流程如下'所述：
	while(server is active){
		listen for request
		process request
	}

'如果一个请求'需'要占用大量的时间'来'处理'，在'这段时间内''新的客户端'就'无法发送请求''给服务端'。
'只有服务器'在'监听的时候'，'请求才能被接收'。
'另一种设计'是，'监听线程''把请求''传递给工作者'线程(worker thread)，'然后''立刻返回去监听'。
而'工作者'线程则'能够处理这个请求''并发送一个回复'给客户端。这种'设计如下所述'：
	while(server is active){
		listen for request
		hand request to worker thread
	}

'这种方式'，'服务端线程''迅速地返回去监听'。
因此，'更多的客户端''能够发送请求给服务端'。这个'服务也变得响应更快'。

'桌面应用'也是'同样如此'。如果你'点击一个按钮''开始运行''一个耗时'的'任务'，
'这个线程''既要执行''任务''又要更新''窗口'和按钮，那么'在任务执行的过程中'，
这个'应用程序'看起来'好像没有反应一样'。
'相反'，'任务可以传递''给工作者线程'（word thread)。
当'工作者线程'在'繁忙地处理任务的时候'，'窗口线程''可以''自由地响应''其他'用户的'请求'。
当'工作者线程完成任务'的时候，它'发送信号给窗口线程'。
'窗口线程'便'可以更新应用程序窗口'，并'显示任务的结果'。
对用户而言，'这种''具有工作者线程设计的程序'显得'响应速度更快'。

'多线程的代价'
从'一个单线程的应用''到一个多线程的应用'并'不仅仅带来好处'，它'也会有一些代价'。
'不要仅仅为了使用多线程''而使用多线程'。
而应该'明确在使用多线程时''能多来的好处''比所付出的代价大'的时候，'才使用多线程'。
如果存在疑问，应该'尝试测量一下应用程序的性能'和'响应能力'，而不只是猜测。
 
'设计更复杂'
虽然'有一些多线程应用程序''比单线程的应用程序'要'简单'，但'其他的''一般都更复杂'。
在'多线程访问共享数据'的时候，'这部分代码'需'要特别的注意'。
'线程之间的交互'往往'非常复杂'。'不正确的线程同步'产生的'错误非常难以被发现'，并且重现以修复。

'上下文切换的开销'
当'CPU从执行一个线程''切换到''执行另外一个线程'的时候，
它需'要先存储当前线程的本地数据'，'程序指针'等，'然后载入另一个线程'的'本地数据'，
'程序指针'等，'最后才开始执行'。这种'切换称为“上下文切换”'(“context switch”)。
'CPU会在一个上下文中''执行一个线程'，'然后切换到另外一个上下文中''执行另外一个线程'。

'上下文切换并不廉价'。'如果没有必要'，'应该减少上下文切换的发生'。

你可以通过维基百科阅读更多的关于上下文切换相关的内容：
http://en.wikipedia.org/wiki/Context_switch

'增加资源消耗'
'线程在运行的时候''需要'从计算机里面'得到一些资源'。
除了'CPU'，'线程''还需要'一些'内存来维持它本地的堆栈'。
它'也需要占用操作系统'中'一些资源'来'管理线程'。
我们'可以尝试编写一个程序'，'让它创建100个线程'，'这些线程'什么事情都不做，'只是在等待'，
然后'看看这个程序'在'运行的时候''占用了多少内存'。

 
'竞态条件'与'临界区'
在'同一程序中运行多个线程''本身不会导致问题'，'问题在于''多个线程''访问'了'相同的资源'。
如，'同一内存区'（变量，数组，或对象）、'系统'（数据库，web services等）'或文件'。
实际上，'这些问题''只有在一或多个线程''向这些资源做了写操作时''才有可能发生'，
'只要资源''没'有'发生变化','多个线程读取相同的资源'就'是安全的'。


多线程同时执行下面的代码可能会出错：
public class Counter {
	protected long count = 0;
	public void add(long value){
		this.count = this.count + value;  
	}
}
想象下'线程A和B''同时执行''同一个Counter对象''的add()方法'，
我们'无法知道操作系统''何时'会'在两个线程之间切换'。
'JVM'并'不是将这段代码''视为单条指令'来'执行'的，而是'按照下面的顺序'：

'从内存获取' 'this.count' 的值'放到寄存器'
'将寄存器'中'的值增加value'
'将寄存器'中'的值写回内存'
'观察线程A'和'B交错执行''会发生什么'：

		'this.count = 0;'
   A:	'读取 this.count 到一个寄存器 (0)'
   B:	'读取 this.count 到一个寄存器 (0)'
   B: 	'将寄存器的值加2'
   B:	'回写寄存器值(2)到内存'. 'this.count 现在等于 2'
   A:	'将寄存器的值加3'
   A:	'回写寄存器值(3)到内存'. 'this.count 现在等于 3'
'两个线程分别加了2和3''到count变量'上，'两个线程'执行'结束后''count变量'的'值应该等于5'。
然而'由于两个线程'是'交叉执行'的，两个线程'从内存中读出的初始值''都是0'。
然后'各自加了2和3'，并'分别写回内存'。'最终的值'并'不是期望的5'，
而'是最后写回内存'的'那个线程的值'，上面例子中'最后写回内存的是线程A'，
但'实际中也可能是线程B'。如果'没有采用合适的同步机制'，
'线程间的交叉执行'情况就'无法预料'。

'竞态条件 & 临界区'
当'两个线程''竞争同一资源'时，'如果对资源的访问顺序敏感'，'就称''存在竞态条件'。
'导致竞态条件发生的代码区''称作临界区'。上例中'add()方法'就'是一个临界区',
它'会产生竞态条件'。在'临界区中''使用适当的同步'就'可以避免竞态条件'。

'线程安全'与'共享资源'
'允许被多个线程同时执行的代码''称作线程安全''的代码'。'线程安全的代码''不包含竞态条件'。
当'多个线程同时更新共享资源时''会引发竞态条件'。
因此，'了解Java线程执行时''共享了什么资源''很重要'。

 
'局部变量'
'局部变量''存储在''线程自己的栈中'。也就是说，'局部变量'永远也'不会被多个线程共享'。
所以，'基础类型的局部变量''是线程安全的'。下面是'基础类型的局部变量'的一个例子：
public void someMethod(){
	long threadSafeInt = 0;
	threadSafeInt++;
}

'局部的对象引用'
'对象的局部引用'和'基础类型的局部变量''不太一样'。尽管'引用本身没有被共享'，
'但引用所指的对象'并'没有存储在线程的栈内'。'所有的对象都存在共享堆中'。
'如果在某个方法中''创建的对象不会逃逸出'
（译者注：'即该对象''不会''被其它方法获得'，'也不会''被非局部变量引用'到）'该方法'，
那么'它就是线程安全的'。'实际上'，哪怕将'这个对象作为参数''传给其它方法'，
'只要别的线程获取不到'这个对象，那'它仍是线程安全的'。
'下面是'一个'线程安全'的'局部引用'样例：
	public void someMethod(){
		LocalObject localObject = new LocalObject();
		localObject.callMethod();
		method2(localObject);
	}

	public void method2(LocalObject localObject){
		localObject.setValue("value");
	}
	
'样例中''LocalObject对象''没有被'方法'返回'，也'没有被传递给someMethod()方法外''的对象'。
'每个执行someMethod()的线程'都'会创建自己的LocalObject对象'，
并'赋值给localObject引用'。因此，'这里的LocalObject是线程安全的'。
'事实上'，'整个someMethod()''都是线程安全的'。
'即使将LocalObject作为参数''传给同一个类'的'其它方法'或'其它类的方法'时，
它'仍然是线程安全'的。
当然，'如果LocalObject''通过某些方法''被传给了别的线程'，那它'就不再是线程安全的了'。

'对象成员[全局对象]'
'对象成员存储在堆上'。如果'两个线程同时更新同一个对象'的'同一个成员'，
那'这个代码'就'不是线程安全的'。下面是一个样例：
public class NotThreadSafe{
	StringBuilder builder = new StringBuilder();
	public add(String text){
		this.builder.append(text);
	}  
}
'如果两个线程''同时调用同一个''NotThreadSafe实例'上'的add()方法'，
就'会有竞态条件'问题。例如：

	NotThreadSafe sharedInstance = new NotThreadSafe();

	new Thread(new MyRunnable(sharedInstance)).start();
	new Thread(new MyRunnable(sharedInstance)).start();

	public class MyRunnable implements Runnable{
		NotThreadSafe instance = null;
   
		public MyRunnable(NotThreadSafe instance){
			this.instance = instance;
		}

		public void run(){
			this.instance.add("some text");
		}
	}
	
注意'两个MyRunnable共享'了'同一个NotThreadSafe对象'。
因此，当'它们调用add()方法'时'会造成竞态条件'。

当然，'如果''这两个线程''在不同的''NotThreadSafe实例'上'调用call()方法'，
'就不会导致竞态条件'。下面是'稍微修改后的例子'：

	new Thread(new MyRunnable(new NotThreadSafe())).start();
	new Thread(new MyRunnable(new NotThreadSafe())).start();
现在'两个线程''都有自己单独的'NotThreadSafe'对象'，
'调用add()方法'时就会'互不干扰'，再也'不会有''竞态条件问题'了。
所以'非线程安全的对象'仍'可以通过某种方式'来'消除竞态条件'。

'线程控制逃逸规则'
'线程控制逃逸规则''可以'帮'助你判断''代码中对某些资源的访问''是否是线程安全的'。

'如果一个资源'的'创建'，'使用'，'销毁'都'在同一个线程内完成'，
且'永远不会脱离该线程的控制'，则'该资源的使用'就'是线程安全的'。
资源可以是对象，数组，文件，数据库连接，套接字等等。
'Java'中你'无需主动销毁对象'，所以'“销毁”''指不再''有引用指向对象'。

'即使对象''本身线程安全'，但'如果该对象'中'包含其他资源'（文件，数据库连接），
'整个应用'也许'就不再''是线程安全的'了。比如'2个线程''都创建'了'各自的数据库连接'，
'每个连接''自身''是线程安全的'，
'但它们'所'连接到的同一个数据库''也许''不是线程安全的'。
比'如'，'2个线程''执行如下代码'：

'检查记录X是否存在'，如果'不存在'，'插入X'
'如果两个线程''同时执行'，而且'碰巧''检查的是同一个记录'，
那么'两个线程'最终'可能都插入了记录'：

'线程1检查记录X''是否存在'。检查结果：不存在
'线程2检查记录X''是否存在'。检查结果：不存在
'线程1插入记录X'
'线程2插入记录X'
'同样的问题''也会发生在''文件'或'其他共享资源上'。
因此，'区分某个线程控制的对象''是资源本身'，
'还是''仅仅到某个资源''的引用''很重要'。

'线程安全及不可变性'
当'多个线程''同时访问''同一个资源'，并且'其中的一个''或者多个线程''对这个资源''进行了写操作'，
才'会产生竞态条件'。'多个线程''同时读''同一个资源''不会产生竞态条件'。

我们'可以通过创建''不可变'的'共享对象'来'保证对象''在线程间''共享时''不会被修改'，
从而'实现线程安全'。如下示例：

	public class ImmutableValue{
		private int value = 0;

		public ImmutableValue(int value){
			this.value = value;
		}

		public int getValue(){
			return this.value;
		}
	}
请注意'ImmutableValue类'的'成员变量value'是'通过构造函数赋值'的，
并且在'类中没有set方法'。这'意味着一旦ImmutableValue实例被创建'，
'value变量'就'不能再被修改'，这就是'不可变性'。
但你'可以通过getValue()'方法'读取这个变量的值'。

（译者注：注意，'“不变”'（Immutable）'和“只读”'（Read Only）'是不同的'。
当'一个变量是“只读”时'，'变量的值''不能直接改变'，但是'可以在其它变量'发生'改变的时候''发生改变'。
比如，'一个人'的'出生年月日''是“不变”属性'，'而一个人的年龄''便是“只读”属性'，
但是'不是“不变”属性'。'随着时间的变化'，'一个人的年龄''会随之发生变化'，
而'一个人的出生年月日'则'不会变化'。这'就是“不变”''和“只读”的区别'。
（摘自《Java与模式》第34章））

'如果'你需'要对ImmutableValue类的实例''进行操作'，
'可以'通过'得到value变量后''创建'一个'新的实例来实现'，
下面是一个对value变量进行加法操作的示例：

public class ImmutableValue{
    private int value = 0;
 
	public ImmutableValue(int value){
       this.value = value;
	}
 
	public int getValue(){
		return this.value;
	}

	public ImmutableValue add(int valueToAdd){
		return new ImmutableValue(this.value + valueToAdd);
	}
}

请'注意add()方法''以加法操作的结果''作为一个新的''ImmutableValue类实例返回'，
而'不是直接''对它自己的value变量'进行'操作'。

'引用不是线程安全的！'
重要的是'要记住'，'即使一个对象''是线程安全'的'不可变对象'，
'指向这个对象''的引用'也'可能不是线程安全的'。看这个例子：

public class Calculator{
	private ImmutableValue currentValue = null;

	public ImmutableValue getValue(){
		return currentValue;
	}

	public void setValue(ImmutableValue newValue){
		this.currentValue = newValue;
	}

	public void add(int newValue){
		this.currentValue = this.currentValue.add(newValue);
	}
}

'Calculator类''持有一个''指向ImmutableValue实例''的引用'。
注意，'通过setValue()方法'和'add()方法'可能'会改变这个引用'。
因此，'即使Calculator类内部''使用了'一个'不可变对象'，'但Calculator类本身'还'是可变的'，
因此'Calculator类''不是线程安全的'。
换句话说：'ImmutableValue类是线程安全的'，'但使用它的类不是'。
当'尝试通过不可变性'去'获得线程安全时'，这点是'需要牢记'的。
'要使Calculator类'实现'线程安全'，'将getValue()'、'setValue()'和'add()方法'都'声明为同步'方法'即可'。
 

'Java多线程基础'
'1 线程与多线程'
'线程是什么？'
'线程'（Thread）'是一个对象'（Object）。用来干什么？
'Java线程'（也称JVM线程）'是''Java进程内''允许多个同时进行''的任务'。
该'进程内''并发的任务'成'为线程'（Thread），'一个进程'里'至少一个线程'。

'Java程序''采用多线程方式'来'支持大量的并发请求处理'，程序'如果在多线程方式''执行下'，
其'复杂度''远高于单线程''串行执行'。
那么'多线程'：'指的是'这个程序（一个'进程'）'运行时''产生了不止一个线程'。

'为啥使用多线程？'
'适合多核处理器'。'一个线程''运行在''一个处理器核心'上，
那么'多线程''可以分配到''多个处理器核心'上，'更好地''利用多核处理器'。

'防止阻塞'。'将数据一致性不强的操'作使'用多线程技术'（或者消息队列）
'加快代码逻辑处理'，'缩短响应时间'。

聊到多线程，多半会聊'并发与并行'，'咋理解并区分''这两个的区别呢？'
'类似单个CPU'，'通过CPU调度算法'等，'处理多个任务的能力'，'叫并发'
'类似多个CPU'，'同时并且处理''相同多个任务的能力'，'叫做并行'

2 '线程的运行与创建'
2.1 '线程的创建'
'Java创建线程对象''有两种方法：'
'继承Thread类''创建'线程对象
'实现Runnable接口'类'创建'线程对象
实现Runnable接口和继承Thread类'区别'
如果'一个类继承Thread'，则'不适合资源共享'。
但是'如果实现了Runable接口'的话，则很'容易'的'实现资源共享'。

'实现Runnable接口''比继承Thread类'所'具有的优势'：
1）：'适合多个''相同的程序'代码的线程'去处理同一个资源'
2）：'可以避免java'中的'单继承的限制'
3）：'增加程序的健壮性'，'代码可以被多个线程共享'，'代码和数据独立'

直接看代码：
1、继承Thread的demo
package com.multithread.learning;
/**
 *多线程学习,继承Thread，资源不能共享
 *@author
 */
class Thread1 extends Thread{
	private int count=5;
	private String name;
    public Thread1(String name) {
       this.name=name;
    }
	public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(name + "运行  count= " + count--);
            try {
                sleep((int) Math.random() * 10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
       
	}
}

public class Main {
	public static void main(String[] args) {
		Thread1 mTh1=new Thread1("A");
		Thread1 mTh2=new Thread1("B");
		mTh1.start();
		mTh2.start();
	}
}
2、实现Runnable的demo
/**
 *多线程学习 实现runnable，资源能共享
 *@author 
 */
package com.multithread.runnable;
class Thread2 implements Runnable{
    private int count=15;
	@Override
	public void run() {
		  for (int i = 0; i < 5; i++) {
			  System.out.println(Thread.currentThread().getName() + "运行  count= " + count--);
	            try {
	            	Thread.sleep((int) Math.random() * 10);
	            } catch (InterruptedException e) {
	                e.printStackTrace();
	            }
		  }
	}
}
public class Main {
	public static void main(String[] args) {
		Thread2 mTh = new Thread2();
	    new Thread(mTh, "C").start();//同一个mTh，但是在Thread中就不可以，如果用同一个实例化对象mt，就会出现异常   
	    new Thread(mTh, "D").start();
	    new Thread(mTh, "E").start();
	}
}
这里'要注意''每个线程''都是用''同一个实例化对象'，'如果不是'同一个，'效果'就'和Thread的一样了'！

'提醒一下'大家：'main方法'其实'也是一个线程'。
在'java'中'所有的线程'都'是同时启动'的，至于什么时候，'哪个先执行'，完全'看谁先得到CPU的资源'。

在'java'中，'每次程序运行''至少启动2个线程'。'一个是main线程'，'一个是垃圾收集线程'。
因为'每当使用java命令''执行一个类'的时候，
实际上'都会启动一个jvm'，'每一个jvm'实际上'就是在操作系统中''启动了一个进程'。

新建 MyThread 对象，代码如下：
/**
 * 继承 Thread 类创建线程对象
 * @author Jeff Lee @ bysocket.com
 * @since 2018年01月27日21:03:02
 */
public class MyThread extends Thread {
 
    @Override // 可以省略
    public void run() {
        System.out.println("MyThread 的线程对象正在执行任务");
    }
 
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            MyThread thread = new MyThread();
            thread.start();
 
            System.out.println("MyThread 的线程对象 " + thread.getId());
        }
    }
}
'MyThread'类'继承了Thread对象'，并'重写'（Override）了'run方法'，
'实现线程'里面'的逻辑'。
'main函数'是'使用 for 语句'，
'循环创建了 10 个线程'，调'用 start 方法启动线程'，最后'打印当前线程对象的 ID'。

'run'方法和'start'方法的'区别是什么呢？'
'run' 方法就是跑的意思，'线程启动后'，会'调用 run 方法'。
'start' 方法就是启动的意思，就是'启动''新线程实例'。
'启动线程后'，才'会调线程'的 'run 方法'。
执行 main 方法后，控制台打印如下：

MyThread 的线程对象正在执行任务
MyThread 的线程对象 10
MyThread 的线程对象正在执行任务
MyThread 的线程对象 11
MyThread 的线程对象正在执行任务
MyThread 的线程对象 12
MyThread 的线程对象正在执行任务
MyThread 的线程对象 13
MyThread 的线程对象正在执行任务
MyThread 的线程对象 14
MyThread 的线程对象正在执行任务
MyThread 的线程对象 15
MyThread 的线程对象正在执行任务
MyThread 的线程对象 16
MyThread 的线程对象正在执行任务
MyThread 的线程对象 17
MyThread 的线程对象正在执行任务
MyThread 的线程对象 18
MyThread 的线程对象正在执行任务
MyThread 的线程对象 19
可见，'线程的 ID' '是线程唯一标识符'，'每个线程 ID '都'是不一样的'。

'start 方法'和 'run 方法'的'关系如图所示'：


同理，'实现 Runnable 接口类''创建线程对象''也很简单'，只'是不同的形式'。
'新建 MyThreadBrother' 代码如下：
/**
 * 实现 Runnable 接口类创建线程对象
 * @author Jeff Lee @ bysocket.com
 * @since 2018年01月27日21:22:57
 */
public class MyThreadBrother implements Runnable {
 
    @Override // 可以省略
    public void run() {
        System.out.println("MyThreadBrother 的线程对象正在执行任务");
    }
 
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            Thread thread = new Thread(new MyThreadBrother());
            thread.start();
 
            System.out.println("MyThreadBrother 的线程对象 " + thread.getId());
        }
    }
}
具体代码：「java-concurrency-core-learning」
https://github.com/JeffLi1993/java-concurrency-core-learning

2.1 '线程的运行'
在'运行上面两个小 demo 后'，'JVM 执行了 main 函数线程'，然后'在主线程'中'执行创建了''新的线程'。
'正常情况下'，'所有线程''执行到'运行'结束为止'。'除非某个线程'中'调用了 System.exit(1) '则'被终止'。

在实际开发中，'一个请求到响应式''是一个线程'。
但在'这个线程'中'可以使用线程池''创建新的线程'，'去执行任务'。

3 '线程的状态'
'新建 MyThreadInfo 类'，'打印线程对象属性'，代码如下：
/**
 * 线程实例对象的属性值
 * @author Jeff Lee @ bysocket.com
 * @since 2018年01月27日21:24:40
 */
public class MyThreadInfo extends Thread {
 
    @Override // 可以省略
    public void run() {
        System.out.println("MyThreadInfo 的线程实例正在执行任务");
//        System.exit(1);
    }
 
    public static void main(String[] args) {
        MyThreadInfo thread = new MyThreadInfo();
        thread.start();
 
        System.out.print("MyThreadInfo 的线程对象 \n"
                + "线程唯一标识符：" + thread.getId() + "\n"
                + "线程名称：" + thread.getName() + "\n"
                + "线程状态：" + thread.getState() + "\n"
                + "线程优先级：" + thread.getPriority());
    }
}
执行代码打印如下：

MyThreadInfo 的线程实例正在执行任务
MyThreadInfo 的线程对象 
线程唯一标识符：10
线程名称：Thread-0
线程状态：NEW
线程优先级：5
'线程是'一个'对象'，它'有唯一标识符 ID'、'名称'、'状态'、'优先级''等属性'。
'线程'只能'修改其优先级'和'名称等属性' ，'无法修改 ID 、状态'。ID 是 JVM 分配的，
名字默认也为 Thread-XX，XX是一组数字。'线程初始状态为 NEW'。

'线程优先级的范围'是' 1 到 10 '，其中' 1 是最低'优先级，'10 是最高'优先级。
不推荐改变线程的优先级，如果'业务需要'，自然'可以修改'线程'优先级到最高'，'或者最低'。

'线程的状态'实现'通过 Thread.State' '常量类实现'，'有 6 种线程状态'：
'new（新建）'、'runnnable（可运行）'、'blocked（阻塞）'、'waiting（等待）'、
'time waiting （定时等待）'和' terminated（终止）'。状态转换图如下：

线程状态流程大致如下：

线程'创建'后，'进入 new 状态'
'调用 start' 或者 'run 方法'，'进入 runnable 状态'
'JVM' 按'照线程优先级'及时间分片等'执行 runnable 状态的线程'。
'开始执行'时，'进入 running 状态'
如果线程'执行 sleep、wait、join，''或者'进入 'IO 阻塞'等。'进入 wait 或者 blocked 状态'
线程'执行完毕后'，线程'被线程队列移除'。最后'为 terminated 状态'。

4 小结
本文介绍了线程与多线程的基础篇，包括了线程启动及线程状态等。
下一篇我们聊下线程的具体操作。包括中断、终止等

'1 线程中断'
1.1 什么是线程中断？

'线程中断''是线程''的标志位属性'。而'不是'真正'终止线程'，'和线程'的'状态无关'。
'线程中断过程''表示''一个运行中的线程'，'通过其他线程调用'了'该线程的 interrupt() 方法'，
'使得该线程''中断标志位属性''改变'。

深入思考下，'线程中断''不是去中断了线程'，恰恰'是用来通知该线程''应该被中断了'。
具体'是一个标志位属性'，到底'该线程生命周期''是去终止'，'还是继续运行'，
'由线程'根据'标志位属性''自行处理'。

1.2 '线程中断操作'

'调用线程'的 'interrupt() 方法'，'根据线程不同的状态'会'有不同的结果'。

下面新建 InterruptedThread 对象，代码如下：
/**
 * '一直运行的线程，中断状态为 true'
 * @author Jeff Lee @ bysocket.com
 * @since 2018年02月23日19:03:02
 */
public class InterruptedThread implements Runnable {
 
    @Override // 可以省略
    public void run() {
        // 一直 run
        while (true) {
        }
    }
 
    public static void main(String[] args) throws Exception {
 
        Thread interruptedThread = new Thread(new InterruptedThread(), "InterruptedThread");
        interruptedThread.start();
 
        TimeUnit.SECONDS.sleep(2);
 
        interruptedThread.interrupt();
        System.out.println("InterruptedThread interrupted is " + interruptedThread.isInterrupted());
 
        TimeUnit.SECONDS.sleep(2);
    }
}
运行main函数，结果如下：

InterruptedThread interrupted is true
代码详解：

'线程一直在运行状态'，'没有停止'或者'阻塞'等
'调用了interrupt()方法'，'中断状态置为true'，但'不会影响线程'的'继续运行'
另一种情况，新建 InterruptedException 对象，代码如下：

/**
 * 抛出 InterruptedException 的线程，中断状态被重置为默认状态 false
 *
 * @author Jeff Lee @ bysocket.com
 * @since 2018年02月23日19:03:02
 */
public class InterruptedException implements Runnable {
 
    @Override // 可以省略
    public void run() {
        // 一直 sleep
        try {
            TimeUnit.SECONDS.sleep(10);
        } catch (java.lang.InterruptedException e) {
            e.printStackTrace();
        }
    }
 
    public static void main(String[] args) throws Exception {
 
        Thread interruptedThread = new Thread(new InterruptedException(), "InterruptedThread");
        interruptedThread.start();
 
        TimeUnit.SECONDS.sleep(2);
 
        // 中断被阻塞状态（sleep、wait、join 等状态）的线程，会抛出异常 InterruptedException
        // 在抛出异常 InterruptedException 前，JVM 会先将中断状态重置为默认状态 false
        interruptedThread.interrupt();
        System.out.println("InterruptedThread interrupted is " + interruptedThread.isInterrupted());
        TimeUnit.SECONDS.sleep(2);
    }
}
运行 main 函数，结果如下：

InterruptedThread interrupted is false
java.lang.InterruptedException: sleep interrupted
    at java.lang.Thread.sleep(Native Method)
代码详解：

'中断被阻塞'状态（sleep、wait、join 等状态）'的线程'，'会抛出异常' InterruptedException
'抛出异常' InterruptedException '前'，'JVM会先将中断状态''重置为'默认状态 'false'
小结下线程中断：

'线程中断'，'不是停止线程'，'只是一个线程的''标志位属性'
'如果线程状态''为被阻塞状态'（sleep、wait、join 等状态），
'线程状态退出被阻塞状态'，'抛出异常' InterruptedException，'并重置中断状态''为'默认状态'false'

'如果线程状态''为运行状态'，'线程状态不变'，'继续运行'，'中断状态置为 true'
代码：https://github.com/JeffLi1993/java-concurrency-core-learning

2 '线程终止'
比如在IDEA中强制关闭程序，立即停止程序，不给程序释放资源等操作，
肯定是不正确的。线程终止也存在类似的问题，所以需要考虑如何终止线程？

上面聊到了线程中断，可以'利用线程中断标志位属性'来'安全终止线程'。
同理'也可以使用 boolean 变量'来'控制是否需要终止线程'。

新建 ，代码如下：
/**
 * 安全终止线程
 *
 * @author Jeff Lee @ bysocket.com
 * @since 2018年02月23日19:03:02
 */
public class ThreadSafeStop {
 
    public static void main(String[] args) throws Exception {
        Runner one = new Runner();
        Thread countThread = new Thread(one, "CountThread");
        countThread.start();
        // 睡眠 1 秒，通知 CountThread 中断，并终止线程
        TimeUnit.SECONDS.sleep(1);
        countThread.interrupt();
 
        Runner two = new Runner();
        countThread = new Thread(two,"CountThread");
        countThread.start();
        // 睡眠 1 秒，然后设置线程停止状态，并终止线程
        TimeUnit.SECONDS.sleep(1);
        two.stopSafely();
    }
 
    private static class Runner implements Runnable {
        private long i;
        // 终止状态
        private volatile boolean on = true;
 
        @Override
        public void run() {
            while (on && !Thread.currentThread().isInterrupted()) {
                // 线程执行具体逻辑
                i++;
            }
            System.out.println("Count i = " + i);
        }
 
        public void stopSafely() {
            on = false;
        }
    }
}
从上面代码可以看出，'通过 while (安全 && !Thread.currentThread().isInterrupted())'
	代码来'实现''线程是否跳出执行逻辑'，'并终止'。但是疑问点就来了，
	'为啥需要 安全 和 isInterrupted()' '两项一起呢'？用其中一个方式不就行了吗？答案在下面

'线程成员变量 on''通过 volatile' 关键字'修饰'，'达到线程之间可见'，从而'实现线程的终止'。
'但当线程状态''为被阻塞'状态（sleep、wait、join 等状态）时，
'对成员变量操作''也阻塞'，'进而''无法执行安全终止线程'
'为了处理上面的问题'，'引入了 isInterrupted()'; '只去解决阻塞状态下''的线程安全终止'。

'两者结合'是真的'没问题了吗？'不是的，'如果是'网络'io阻塞'，
比如一个 websocket 一直再等待响应，'那么直接使用底层的 close'。
3 小结
很多好友介绍，如果'用 Spring 栈开发''到使用线程或者线程池'，
那么'尽量使用框架这块提供的线程操作''及框架提供的终止'等


'Threadlocal介绍'
原文出处http://cmsblogs.com/ 『chenssy』
'ThreadLoacal是什么？'
ThreadLocal是啥？以前面试别人时就喜欢问这个，有些伙伴喜欢把它和线程同步机制混为一谈，
事实上'ThreadLocal''与线程同步无关'。'ThreadLocal'虽然'提供'了一种'解决多线程'环境下'成员变量''的问题'，
'但是它''并不是解决多线程''共享变量''的问题'。那么ThreadLocal到底是什么呢？

API是这样介绍它的：
This class provides thread-local variables. These variables differ from their normal counterparts in that each thread that accesses one (via its {@code get} or {@code set} method) has its own, independently initialized copy of the variable. {@code ThreadLocal} instances are typically private static fields in classes that wish to associate state with a thread (e.g.,a user ID or Transaction ID).

'该类''提供了''线程局部 (thread-local) 变量'。'这些变量''不同于''它们的''普通对应物'，
'因为访问某个变量（通过其get 或 set 方法）的每个线程'都'有自己的局部变量'，
'它独立于变量的初始化副本'。
'ThreadLocal实例''通常是类中的 private static 字段'，
它们'希望将状态与某一个线程'（例如，用户 ID 或事务 ID）'相关联'。

'所以ThreadLocal''与线程同步机制不同'，'线程同步机制是''多个线程共享同一个变量'，
而'ThreadLocal是'为'每一个线程''创建一个单独的变量副本'，
'故而每个线程'都'可以独立地改变''自己所拥有的变量副本'，
而'不会影响其他线程'所'对应的副本'。
可以说'ThreadLocal''为多线程环境下变量问题''提供'了'另外一种解决思路'。

ThreadLocal定义了四个方法：
'get()'：'返回''此线程''局部变量的''当前线程副本'中'的值'。
'initialValue()'：'返回''此线程''局部变量的''当前线程'的'“初始值”'。
'remove()'：'移除''此线程''局部变量''当前线程的值'。
'set(T value)'：'将此线程''局部变量的''当前线程副本'中'的值''设置为指定值'。
除了这四个方法，'ThreadLocal内部'还'有一个''静态内部类ThreadLocalMap'，
'该内部类'才'是实现线程隔离机制的关键'，'get()、set()、remove()'都'是基于''该内部类操作'。
'ThreadLocalMap提供'了一种'用键值对方式''存储每一个线程'的'变量副本的方法'，
'key为当前ThreadLocal对象'，'value则是对应线程的变量副本'。

对于'ThreadLocal'需'要注意'的有'两点'：
1. 'ThreadLocal实例本身'是'不存储值'，它'只是提供了一个''在当前线程中''找到副本'值'得key'。
2. 'ThreadLocal包含在Thread中'，而'不是Thread包含在ThreadLocal中'，
有些小伙伴会弄错他们的关系。

下图是Thread、ThreadLocal、ThreadLocalMap的关系
（http://blog.xiaohansong.com/2016/08/06/ThreadLocal-memory-leak/）

Thread、ThreadLocal、ThreadLocalMap的关系

ThreadLocal使用示例
示例如下：
public class SeqCount {
    private static ThreadLocal<Integer> seqCount = new ThreadLocal<Integer>(){
        // 实现initialValue()
        public Integer initialValue() {
            return 0;
        }
    };
 
    public int nextSeq(){
        seqCount.set(seqCount.get() + 1);
        return seqCount.get();
    }
 
    public static void main(String[] args){
        SeqCount seqCount = new SeqCount();
        SeqThread thread1 = new SeqThread(seqCount);
        SeqThread thread2 = new SeqThread(seqCount);
        SeqThread thread3 = new SeqThread(seqCount);
        SeqThread thread4 = new SeqThread(seqCount);
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
    }
 
    private static class SeqThread extends Thread{
        private SeqCount seqCount;
        SeqThread(SeqCount seqCount){
            this.seqCount = seqCount;
        }
        public void run() {
            for(int i = 0 ; i < 3 ; i++){
                System.out.println(Thread.currentThread().getName() + " seqCount :" + seqCount.nextSeq());
            }
        }
    }
}
运行结果：
从运行结果'可以看出'，'ThreadLocal'确实是'可以达到''线程隔离'机制，'确保变量'的'安全性'。
这里我们想一个问题，在'上面的代码'中'ThreadLocal的initialValue()''方法返回的是0'，
'加入该方法''返回得''是一个对象'呢，'会产生什么后果呢？'例如：
	A a = new A();
	private static ThreadLocal<A> seqCount = new ThreadLocal<A>(){
	    // 实现initialValue()
	    public A initialValue() {
	        return a;
	    }
	};
	class A{
	}
具体过程请参考：对ThreadLocal实现原理的一点思考

'ThreadLocal源码解析'
ThreadLocal虽然'解决'了这个'多线程变量''的'复杂'问题'，但是它的'源码实现'却'是比较简单的'。
ThreadLocalMap是实现ThreadLocal的关键，我们先从它入手。

ThreadLocalMap
'ThreadLocalMap'其'内部利用Entry'来'实现key-value的存储'，如下：

 
       static class Entry extends WeakReference<ThreadLocal<?>> {
            /** The value associated with this ThreadLocal. */
            Object value;
 
            Entry(ThreadLocal<?> k, Object v) {
                super(k);
                value = v;
            }
        }
从上面代码中可以看出Entry的'key'就'是ThreadLocal'，而'value就是值'。
同时，'Entry也继承WeakReference'，所以说'Entry所对应key'（ThreadLocal实例）
'的引用''为一个弱引用'
（关于弱引用这里就不多说了，感兴趣的可以关注这篇博客：Java理论与实践: 用弱引用堵住内存泄漏）

'ThreadLocalMap'的'源码稍微多了点'，我们就'看'两个'最核心的方法'
'getEntry()'、'set(ThreadLocal> key, Object value)'方法。

**'set(ThreadLocal> key, Object value)'**

 
    private void set(ThreadLocal<?> key, Object value) {
 
        ThreadLocal.ThreadLocalMap.Entry[] tab = table;
        int len = tab.length;
 
        // 根据 ThreadLocal 的散列值，查找对应元素在数组中的位置
        int i = key.threadLocalHashCode & (len-1);
 
        // 采用“线性探测法”，寻找合适位置
        for (ThreadLocal.ThreadLocalMap.Entry e = tab[i];e != null;e = tab[i = nextIndex(i, len)]) {
 
            ThreadLocal<?> k = e.get();
 
            // key 存在，直接覆盖
            if (k == key) {
                e.value = value;
                return;
            }
 
            // key == null，但是存在值（因为此处的e != null），说明之前的ThreadLocal对象已经被回收了
            if (k == null) {
                // 用新元素替换陈旧的元素
                replaceStaleEntry(key, value, i);
                return;
            }
        }
 
        // ThreadLocal对应的key实例不存在也没有陈旧元素，new 一个
        tab[i] = new ThreadLocal.ThreadLocalMap.Entry(key, value);
 
        int sz = ++size;
 
        // cleanSomeSlots 清楚陈旧的Entry（key == null）
        // 如果没有清理陈旧的 Entry 并且数组中的元素大于了阈值，则进行 rehash
        if (!cleanSomeSlots(i, sz) && sz >= threshold)
            rehash();
    }
'这个set()'操作'和'我们在集合了解的'put()方式'有点儿'不一样'，虽然他们'都是key-value结构'，
'不同''在'于他们'解决散列冲突'的'方式不同'。'集合Map'的'put()采用的是拉链法'，
而'ThreadLocalMap的set()'则是'采用开放定址法'（具体请参考散列冲突处理系列博客）。
掌握了开放地址法该方法就一目了然了。

'set()操作'除了'存储元素外'，'还有'一个很'重要的作用'，
'就是replaceStaleEntry'()'和cleanSomeSlots()'，这'两个方法''可以清除掉key == null 的实例'，
'防止内存泄漏'。'在set()方法中''还有一个变量很重要'：'threadLocalHashCode'，定义如下：

private final int threadLocalHashCode = nextHashCode();
从名字上面我们可以看出'threadLocalHashCode'应该'是ThreadLocal的散列值'，
定义为final，表示ThreadLocal'一旦创建'其'散列值''就'已经'确定'了，'生成过程'则'是调用nextHashCode()'：

    private static AtomicInteger nextHashCode = new AtomicInteger();
 
    private static final int HASH_INCREMENT = 0x61c88647;
 
    private static int nextHashCode() {
        return nextHashCode.getAndAdd(HASH_INCREMENT);
    }
    
'nextHashCode'表示'分配下一个ThreadLocal实例''的threadLocalHashCode'的'值'，
'HASH_INCREMENT'则'表示分配两个ThradLocal实例的''threadLocalHashCode'的'增量'，
'从nextHashCode'就'可以看出'他们的'定义'。

'getEntry()'
    private Entry getEntry(ThreadLocal<?> key) {
        int i = key.threadLocalHashCode & (table.length - 1);
        Entry e = table[i];
        if (e != null && e.get() == key)
            return e;
        else
            return getEntryAfterMiss(key, i, e);
    }
由于'采用'了'开放定址法'，所以'当前key''的散列值''和元素在数组的索引'并'不是完全对应的'，
首'先取一个探测数'（key的散列值），如果'所对应的key'就'是我们所要找的元素'，'则返回'，
'否则调用getEntryAfterMiss()'，如下：

        private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
            Entry[] tab = table;
            int len = tab.length;
 
            while (e != null) {
                ThreadLocal<?> k = e.get();
                if (k == key)
                    return e;
                if (k == null)
                    expungeStaleEntry(i);
                else
                    i = nextIndex(i, len);
                e = tab[i];
            }
            return null;
        }

'这里有'一个'重要的地方'，当'key == null时'，'调用'了'expungeStaleEntry()方法'，
'该方法用于处理''key == null'，'有利于GC回收'，'能够有效'地'避免内存泄漏'。

get()
'返回当前线程'所'对应的线程变量'
    public T get() {
        // 获取当前线程
        Thread t = Thread.currentThread();
        // 获取当前线程的成员变量 threadLocal
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            // 从当前线程的ThreadLocalMap获取相对应的Entry
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                // 获取目标值        
                T result = (T)e.value;
                return result;
            }
        }
        return setInitialValue();
    }
首先'通过当前线程''获取所对应的成员变量''ThreadLocalMap'，
然后'通过ThreadLocalMap''获取当前ThreadLocal的Entry'，'最后'通过所获取的Entry'获取目标值result'。

'getMap()方法''可以获取''当前线程'所'对应的ThreadLocalMap'，如下：

    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }

'set(T value)'
'设置当前线程'的'线程局部变量'的值。

    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }

'获取当前线程'所'对应的ThreadLocalMap'，如果'不为空'，
则调'用ThreadLocalMap的set()方法'，'key就是当前ThreadLocal'，
如果'不存在'，则'调用createMap()方法''新建一个'，如下：

    void createMap(Thread t, T firstValue) {
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }

'initialValue()'
'返回该线程''局部变量'的'初始值'。
    protected T initialValue() {
        return null;
    }
该方法'定义为protected'级别且'返回为null'，很明显'是要子类''实现它的'，
所以我们'在使用ThreadLocal的时候'一般'都应该覆盖该方法'。
'该方法不能显示调用'，'只有在第一次调用get()'或者'set()'方法'时才会被执行'，并且'仅执行1次'。

'remove()'
'将当前线程局部变量'的'值删除'。
    public void remove() {
        ThreadLocalMap m = getMap(Thread.currentThread());
        if (m != null)
            m.remove(this);
    }

'该方法的目的'是'减少内存的占用'。当然，我们'不需要显示调用'该方法，
因为'一个线程结束后'，它'所对应的局部变量'就'会被垃圾回收'。

'ThreadLocal''为什么会''内存泄漏'
前面提到'每个Thread'都'有一个ThreadLocal.ThreadLocalMap的map'，
'该map的key''为ThreadLocal实例'，它'为一个弱引用'，我们知道'弱引用有利于GC回收'。
'当ThreadLocal的key == null时'，'GC'就'会回收这部分空间'，
'但是value却不一定能够被回收'，因为'他还与Current Thread''存在'一个'强引用关系'，
如下（图片来自http://www.jianshu.com/p/ee8c9dccc953）：


'由于存在'这个'强引用关系'，'会导致value无法回收'。
如果'这个线程对象''不会销毁'那么这个'强引用关系'则会'一直存在'，就'会出现内存泄漏情况'。
所以说只要这个线程对象能够及时被GC回收，就不会出现内存泄漏。
如果碰到线程池，那就更坑了。
那么'要怎么避免'这个问题'呢？'

在前面提过，'在ThreadLocalMap'中'的setEntry()、getEntry()'，
如果'遇到key == null的情况'，'会对value设置为null'。
当然我们'也可以显示调用''ThreadLocal的remove()'方法'进行处理'。

下面再'对ThreadLocal'进行简单'的总结'：

'ThreadLocal' '不是用于解决共享变量'的'问题'的，也'不是为了协调线程同步'而存在，
'而是为了'方便'每个线程处理自己的状态'而引入的一个机制。这点至关重要。
'每个Thread内部'都'有一个ThreadLocal.ThreadLocalMap类型'的'成员变量'，
'该成员变量'用来'存储实际的ThreadLocal变量副本'。
'ThreadLocal'并'不是''为线程保存对象的副本'，它仅仅'只起到一个索引的作用'。
它的'主要'木得'视为每一个线程''隔离一个类的实例'，这个实例的作用'范围仅限于线程内部'。
 
有关于JMM内存模型的详细介绍将在下一章讲述。

 
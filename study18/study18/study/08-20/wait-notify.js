在'多线程'的'情况下'，由于'同一进程'的'多个线程共享同''一片存储空间'，
在带来方便的同时，也带来了访问冲突这个严重的问题。
'Java语言''提供'了'专门机制'以'解决这种冲突'，
有效'避免'了'同一个数据'对象'被多个线程''同时访问'。

'wait'与'notify''是java同步机制'中'重要的组成部分'。
'结合'与'synchronized'关键字'使用'，'可以建立'很多'优秀的同步模型'。

'synchronized(this){ }''等价于' 'public synchronized void method(){.....}'
'同步''分为类级别'和'对象级别'，'分别对应着类锁'和'对象锁'。
'类锁'是'每个类只有一个'，如果'static'的'方法被synchronized关键字修饰'，
则在'这个方法被执行前''必须获得类锁'；'对象锁类同'。
'首先'，'调用一个Object的wait与notify/notifyAll的时候'，'必须保证调用代码'
'对该Object''是同步的'，也就是说'必须在作用''等同于synchronized(obj){......}'
'的内部''才能够去调用''obj的wait与notify/notifyAll三个方法'，否则就会报错：
java.lang.IllegalMonitorStateException:current thread not owner
'在调用wait的时候'，'线程自动释放'其'占有的对象锁'，同时'不会去申请对象锁'。
'当线程被唤醒'的时候，'它才再次获得'了'去获得对象锁的权利'。
所以，'notify与notifyAll''没有太多的区别'，'只是notify仅唤醒一个线程''并允许它去获得锁'，
'notifyAll''是唤醒所有等待这个对象的线程''并允许它们去获得对象锁'，
'只要是''在synchronied块中的代码'，'没有对象锁''是寸步难行的'。
'其实''唤醒一个线程''就是重新允许''这个线程去获得''对象锁''并向下运行'。

'notifyAll'，'虽然是''对每个wait的对象''都调用一次notify'，'但是这个'还'是有顺序的'，
'每个对象'都'保存''这一个等待对象链'，'调用的顺序'就'是这个链的顺序'。
'其实''启动等待对象链中各个线程的''也是一个线程'，在具体应用的时候，需要注意一下。

'wait(),notify(),notifyAll()''不属于Thread类',而是'属于Object基础类',
也就是说'每个对像都有''wait(),notify(),notifyAll()的功能'。
'因为每个对像都有锁','锁是每个对像的基础',当然'操作锁的方法'也'是最基础了'。

wait():
'等待对象的同步锁','需要获得该对象的同步锁''才可以调用''这个方法',
'否则'编译可以通过，但运行时会'收到一个异常：IllegalMonitorStateException'。

'调用任意对象的 wait()方法''导致该线程阻塞'，'该线程不可继续执行'，
'并且该对象'上'的锁被释放'。

notify():
'唤醒''在等待该对象同步锁的线程'(只唤醒一个,如果有多个在等待),
注意的是'在调用此方法的时候'，并'不能确切的唤醒''某一个等待状态的线程'，
而是'由JVM''确定唤醒哪个线程'，而且不是按优先级。

'调用任意对象'的'notify()方法'则'导致''因调用该对象的 wait()方法'
'而阻塞的线程'中'随机选择的一个''解除阻塞'（'但要等到获得锁后''才真正可执行'）。

notifyAll():
'唤醒所有等待的线程',注意'唤醒的是notify之前''wait的线程',
对于'notify之后'的'wait线程''是没有效果的'。
 

通常，'多线程之间''需要协调工作'：'如果条件不满足'，'则等待'；'当条件满足时'，
'等待该条件的线程''将被唤醒'。在Java中，这个机制的实现依赖于wait/notify。
'等待机制''与锁机制''是密切关联的'。

例如：
synchronized(obj) {
	while(!condition) {
		obj.wait();
	}
	obj.doSomething();
}

'当线程A''获得了obj锁后'，'发现条件condition不满足'，'无法继续下一处理，于是线程A就wait()。
在'另一线程B中'，如果'B更改了某些条件'，使得'线程A的condition条件满足'了，
'就可以唤醒线程A：'
　　
synchronized(obj) {
	condition = true;
	obj.notify();
}
　　
'需要注意的概念'是：
# '调用obj的''wait(), notify()方法前'，'必须获得obj锁'，
也就是'必须写在''synchronized(obj){...} 代码段内'。

# '调用obj.wait()后'，'线程A就释放了obj的锁'，'否则''线程B无法获得obj锁'，
也'就无法在''synchronized(obj){...}' '代码段内''唤醒A'。

# '当obj.wait()方法返回后'，'线程A''需要再次获得obj锁'，'才能继续执行'。

#'如果A1,A2,A3''都在obj.wait()'，'则B调用obj.notify()'
'只能唤醒A1,A2,A3'中'的一个'（具体哪一个由JVM决定）。

#'obj.notifyAll()'则'能全部唤醒A1,A2,A3'，但是'要继续执行obj.wait()''的下一条'语句，
'必须获得obj锁'，因此，'A1,A2,A3''只有一个''有机会获得锁''继续执行'，
例如A1，其余的需要等待A1释放obj锁之后才能继续执行。

# '当B调用obj.notify/notifyAll的时候'，'B正持有obj锁'，
'因此，A1,A2,A3虽被唤醒'，但是'仍无法获得obj锁'。
直到B退出synchronized块，释放obj锁后，
A1,A2,A3中的一个才有机会获得锁继续执行。

谈一下'synchronized''和wait()、notify()'等'的关系':
1.'有synchronized的地方''不一定有wait,notify'
2.'有wait,notify的地方''必有synchronized'.
这是'因为wait和notify''不是属于线程类'，而'是每一个对象都具有的方法'，
而且，'这两个方法''都和对象锁''有关'，'有锁的地方'，'必有synchronized'。

另外，注意一点：'如果要把notify和wait方法''放在一起用的话'，
'必须先调用notify''后调用wait'，'因为如果调用完wait'，
'该线程就已经不是currentthread了'。


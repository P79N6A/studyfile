package com.xgd.risk.web.common.db;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * 
 * @author dengzs
 * Create at: 2017年1月11日 上午11:15:06   
 * Description:多数据源切换 
 */
 //'建立'一个'获得'和'设置'上下文'环境的类'，主要'负责改变'上下文'数据源'的名称
 //'这个类'必须'继承AbstractRoutingDataSource'，且'实现方法determineCurrentLookupKey'，该方法返回一个Object，一般是返回字符串：
public class DynamicDataSource extends AbstractRoutingDataSource {

	
	private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>(); 
	 
	
	/**
	 * 
	 * @return  the currentLookupKey 
	 */
    public static String getCurrentLookupKey() {    
        return (String) contextHolder.get();    
    }      
	
    
    /**
     * 
     * @param currentLookupKey
     */
    public static void setCurrentLookupKey(String currentLookupKey) {    
        contextHolder.set(currentLookupKey);    
    } 
    
    
	@Override
	protected Object determineCurrentLookupKey() {
		return getCurrentLookupKey();
	}

 }

1.切换数据源
1) 首先，这个方案完全是在spring的框架下解决的，'数据源'依然配置'在'spring的'配置文件中'，
'sessionFactory'依然去配置它的dataSource属性，它甚至都'不知道dataSource的改变'。
唯一不同的是在真正的dataSource与sessionFactory之间增加了一个MultiDataSource。
其次，'实现简单'，'易于维护'。这个方案虽然我说了这么多东西，其实都是分析，
真正'需要'我们'写的'代码就'只有MultiDataSource'、'SpObserver'两个类。
'MultiDataSource'类真正要写的'只有getDataSource()和getDataSource(sp)'两个方法，而SpObserver类更简单了。
实现越简单，出错的可能就越小，维护性就越高。
最后，这个方案'可以使单数据源与多数据源兼容'。这个方案完全'不影响BUS和DAO的编写'。
如果我们的项目在开始之初是'单数据源'的情况下开发，随着项目的进行，'需要变更为多数据源'，
则'只需要修改spring配置'，并少量修改MVC层以便'在请求中写入需要的数据源名'，变更就完成了。
如果我们的项目希望改回单数据源，则只需要简单修改配置文件。这样，为我们的项目将增加更多的弹性。

2)该方案的缺点
'没'有能够'解决多用户访问单例“sessionFactory”'时'共享“dataSource”变量'，'导致产生争抢“dataSource”'的结果，
本质类似于操作系统中的“生产者消费者”问题。因此当多用户访问时，多数据源可能会导致系统性能下降的后果。
 
 
2.ThreadLocal
按照传统经验，如果某个'对象'是'非线程安全'的，在'多线程环境下'，对'对象的访问'必须采'用synchronized进行线程同步'。
但'模板类'并'未采用线程同步'机制，因为'线程同步会降低并发性'，'影响系统性能'。
此外，通过代码同步解决线程安全的挑战性很大，可能会增强好几倍的实现难度。
那么'模板类'究竟仰仗何种魔法神功，可以'在无须线程同步'的情况下就'化解线程安全'的难题呢？答案'就是ThreadLocal'！ 

'ThreadLocal'在Spring中发挥着重要的作用，'在管理request作用域'的Bean、'事务管理'、'任务调度'、'AOP等模块''都出现了'它们的身影，
起着举足轻重的作用。要想了解Spring事务管理的底层技术，ThreadLocal是必须攻克的山头堡垒。 

ThreadLocal是什么  '是线程局部变量'

早在JDK 1.2的版本中就提供java.lang.ThreadLocal，ThreadLocal为解决多线程程序的并发问题提供了一种新的思路。使用这个工具类可以很简洁地编写出优美的多线程程序。 
'ThreadLocal'，顾名思义，它不是一个线程，而'是线程的一个本地化对象'。当工作于'多线程中的对象使用ThreadLocal维护变量'时，
'ThreadLocal为'每个'使用该变量的线程分配'一个独立的'变量副本'。所以'每一个线程'都'可以独立地改变自己的副本'，而'不会影响其他线程所对应的副本'。
从线程的角度看，'这个变量'就像'是'线程的'本地变量'，这也是类名中“Local”所要表达的意思。 

'线程局部变量'并不是Java的新发明，很多语言（如IBM XL、FORTRAN）在语法层面就提供线程局部变量。在Java中没有提供语言级支持，而以一种变通的方法，
通过ThreadLocal的类提供支持。所以，在Java中编写线程局部变量的代码相对来说要笨拙一些，这也是为什么线程局部变量没有在Java开发者中得到很好普及的原因。 


ThreadLocal的接口方法 

ThreadLocal类接口很简单，只有4个方法，我们先来了解一下。 
void set(Object value)
   设置当前线程的线程局部变量的值；
public Object get()
   该方法返回当前线程所对应的线程局部变量；
public void remove()
   将当前线程局部变量的值删除，目的是为了减少内存的占用，该方法是JDK 5.0新增的方法。需要指出的是，当线程结束后，对应该线程的局部变量将自动被垃圾回收，所以显式调用该方法清除线程的局部变量并不是必须的操作，但它可以加快内存回收的速度；
protected Object initialValue()
   返回该线程局部变量的初始值，该方法是一个protected的方法，显然是为了让子类覆盖而设计的。这个方法是一个延迟调用方法，在线程第1次调用get()或set(Object)时才执行，并且仅执行1次。ThreadLocal中的默认实现直接返回一个null。 

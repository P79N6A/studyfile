对于我们开发的网站，如果网站的访问量非常大的话，那么我们就需要考虑相关的并发访问问题了。而并发问题是绝大部分的程序员头疼的问题，

但话又说回来了，既然逃避不掉，那我们就坦然面对吧~今天就让我们一起来研究一下常见的并发和同步吧。

为了更好的理解并发和同步，我们需要先明白两个重要的概念:'同步'和'异步'

   	1、同步和异步的区别和联系

 　　所谓'同步'，可以理解为'在执行完一个函数或方法'之后，一直'等待系统返回值或消息'，这时'程序是出于阻塞的'，
'只有接收到返回的值'或'消息'后'才往下执行'其它的命令。

	'异步'，'执行完函数'或方法后，'不'必'阻塞性'地'等待返回值'或消息，只需要'向系统委托一个异步过程'，
那么'当系统接收'到'返回值或消息时'，'系统'会'自动触发委托的异步过程'，从而'完成一个完整的流程'。

	'同步'在一定程度上'可以看做是单线程'，这个线程'请求一个方法'后'就待这个方法给他回复'，'否则他不往下执行'(死心眼)。
	'异步'在一定程度上'可以看做是多线程'的(废话，一个线程怎么叫异步)，'请求一个方法后'，就不管了，'继续执行其他的方法'。

	'同步就是'一件事，'一件事情一件事的做。'
	'异步就是'，'做一件事情，不引响做其他事情'。

	例如：吃饭和说话，只能一件事一件事的来，因为只有一张嘴。
    但吃饭和听音乐是异步的，因为，听音乐并不引响我们吃饭。


	对于Java程序员而言，我们会经常听到'同步关键字synchronized'，假如这个'同步的监视对象是类的话'，那么如果'当一个对象'

	'访问类里面的同步方法的话'，那么'其它的对象'如果'想要继续访问类里面的这个同步方法'的话，'就会进入阻塞'，'只有等前一个对象'

	'执行完该同步方法后''当前对象才能够继续执行该方法'。这就是同步。相反，如果方法前没有同步关键字修饰的话，那么不同的对象

	可以'在同一时间访问同一个方法，这就是异步'。


	在补充一下('脏数据'和'不可重复读'的相关概念):

	脏数据
　　'脏读'就是指'当一个事务正在访问数据'，并且'对数据进行了修改'，而'这种修改还没有提交到数据库中'，这时，'另外一个事务也访问这个数据'，然后使用了这
个数据。因为'这个数据是还没有提交的数据'，那么'另外一个事务读到的这个数据是脏数据'(Dirty Data)，'依据脏数据所做的操作可能是不正确的'。
 
	不可重复读
	不可重复读是指'在一个事务内'，'多次读同一数据'。在'这个事务还没有结束时'，'另外一个事务也访问该同一数据'。那么，在'第一个事务中'的'两次读数据之间'，
'由于第二个事务的修改'，那么'第一个事务两次读到的数据'可能'是不一样的'。这样就发生了'在一个事务内''两次读到的数据是不一样'的，因此称为是'不可重复读'

2、如何处理并发和同步

	今天讲的如何处理并发和同同步问题'主要是通过锁机制'。

	我们需要明白，锁机制有两个层面。

	一种是'代码层次上的'，如'java'中的'同步锁'，典型的就是同步'关键字synchronized'，这里我不在做过多的讲解，

	感兴趣的可以参考:http:// www.cnblogs.com/xiohao/p/4151408.html

	另外一种是'数据库层次上'的，比较典型的就是'悲观锁'和'乐观锁'。这里我们重点讲解的就是'悲观锁'（传统的物理锁）和'乐观锁'。

	悲观锁(Pessimistic Locking):       

	悲观锁，正如其名，它指的是对数据被外界（包括本系统当前的其他事务，以及来自 外部系统的事务处理）修改持'保守态度'，因此，
在'整个数据处理过程中'，将'数据处于锁定状态'。

	悲观锁的实现，往往'依靠数据库提供的锁机制'（也只有数据库层提供的锁机制才能 真正保证数据访问的排他性，否则，即使在本系统
中实现了加锁机制，也无法保证外部系统不会修改数据）。 

	一个典型的'倚赖数据库的悲观锁调用'： 
	select * from account where name='Erica' for update
	这条 sql 语句'锁定了' account 表中所有符合检索条件（ name=”Erica” ）的'记录'。
本次'事务提交之前'（事务提交时会释放事务过程中的锁），'外界无法修改这些记录'。 

	'Hibernate 的悲观锁'，也是'基于数据库的锁机制实现'。 
	下面的代码实现了对查询记录的加锁：

	String hqlStr ="from TUser as user where user.name='Erica'";
	Query query = session.createQuery(hqlStr);
	query.setLockMode("user",LockMode.UPGRADE); // 加锁
	List userList = query.list();// 执行查询，获取数据
	'query.setLockMode' '对查询语句中'，'特定别名所对应的记录进行加锁'（我们为 TUser 类指定了一个别名 “user” ），这里也就是对
返回的所有 user 记录进行加锁。

	观察运行期 Hibernate 生成的 SQL 语句： 
	select tuser0_.id as id, tuser0_.name as name, tuser0_.group_id
as group_id, tuser0_.user_type as user_type, tuser0_.sex as sex
from t_user tuser0_ where (tuser0_.name='Erica' ) for update

	这里 Hibernate 通过使用数据库的 'for update' 子句实现了悲观锁机制。 
	Hibernate 的加锁模式有： 
	Ø LockMode.NONE ： '无锁机制'。 
	Ø LockMode.WRITE ： 'Hibernate 在 Insert 和 Update 记录的时候会自动获取'
	Ø LockMode.READ ： 'Hibernate 在读取记录的时候会自动获取'。
	
	以上这三种锁机制一般由 Hibernate 内部使用，如 Hibernate '为了保证 Update'
'过程中'对象'不会被外界修改'，会在 'save' 方法'实现中自动为目标对象加上 WRITE 锁'。 
	Ø LockMode.UPGRADE ：'利用数据库的 for update 子句加锁'。 
	Ø LockMode. UPGRADE_NOWAIT ： Oracle 的特定实现，利用 Oracle 的 for
	update nowait 子句实现加锁。 
	'上面这两种锁机制'是我们'在应用层较为常用'的，'加锁'一般'通过以下方法实现'： 
	Criteria.setLockMode
	Query.setLockMode
	Session.lock
	注意，只有在'查询开始之前'（也就是 Hiberate 生成 SQL 之前）'设定加锁'，'才会'
真正'通过数据库的锁机制'进行'加锁处理'，'否则'，'数据'已经'通过不包含''for update'
子句的 Select SQL '加载'进来，所谓'数据库加锁也就无从谈起'。

	为了更好的理解select... for update的'锁表的过程'，本人将要以mysql为例，进行相应的讲解

1、要'测试锁定的状况'，可以'利用MySQL的Command Mode' ，开二个视窗来做测试。
//
//	表的基本结构如下:
//
//
//	表中内容如下:
//
//
//	开启两个测试窗口，在其中一个窗口执行select * from ta for update
//
//	然后在另外一个窗口执行update操作如下图:
//    等到一个窗口commit后的图片如下:
//    到这里，悲观锁机制你应该了解一些了吧~
	
	需要注意的是'for update要放到mysql的事务中'，即'begin'和'commit中'，'否者不起作用'。

    至于是'锁住整个表还是锁住选中的行'，请'参考':

	http:// www.cnblogs.com/xiohao/p/4385768.html

	至于hibernate中的悲观锁使用起来比较简单，这里就不写demo了~感兴趣的自己查一下就ok了~


	乐观锁(Optimistic Locking):        
相对悲观锁而言，'乐观锁机制采取了'更加'宽松的加锁机制'。'悲观锁'大多数情况下'依靠数据库的锁机制'实现，以保证'操作最大程度的独占性'。但随之
而来的就是'数据库性能的大量开销'，特别是'对长事务而言'，这样的'开销往往无法承受'。 如一个金融系统，当某个操作员读取用户的数据，并在读出的用户数
据的基础上进 行修改时（如更改用户帐户余额），如果采用'悲观锁机制'，也就意味着'整个操作过'程中（从操作员读出数据、开始修改直至提交修改结果的全
过程，甚至还包括操作员中途去煮咖啡的时间），'数据库记录始终处于加锁状态'，可以想见，如果面对几百上千个并发，这样的情况将导致怎样的后果。 乐
观锁机制在一定程度上解决了这个问题。

	乐观锁，大多是基于数据版本   Version ）记录机制实现。何谓数据版本？即为'数据增加一个版本标识'，在'基于数据库表的版本解决方案中'，一般是通
过为'数据库表增加一个 “version” 字段'来 实现。 读取出数据时，将此'版本号一同读出'，之后'更新时'，对此'版本号加一'。此时，将'提交数据的版本数据'
'与数据库表对应记录的当前版本信息'进行'比对'，如果'提交的数据''版本号大于数据库表当前版本号'，则'予以更新'，'否则认为是过期数据'。
对于上面修改用户帐户信息的例子而言，假设数据库中帐户信息表中有一个 version 字段，当前值为 1 ；而当前帐户余额字段（ balance ）为 $100 。
操作员 A 此时将其读出（ version=1 ），并从其帐户余额中扣除 $50（ $100-$50 ）。 2 
在操作员 A 操作的过程中，操作员 B 也读入此用户信息（ version=1 ），并 从其帐户余额中扣除 $20 （ $100-$20 ）。 3 
操作员 A 完成了修改工作，将数据版本号加一（ version=2 ），连同帐户扣 除后余额（ balance=$50 ），提交至数据库更新，
此时由于提交数据版本大于数据库记录当前版本，数据被更新，数据库记录 version 更新为 2 。 
4 操作员 B 完成了操作，也将版本号加一（ version=2 ）试图向数据库提交数 据（ balance=$80 ），但此时比对数据库记录版本时发现，
操作员 B 提交的 数据版本号为 2 ，数据库记录当前版本也为 2 ，'不满足 “ 提交版本必须大于记 录当前版本'才能执行更新 “ 的乐观锁策略，
因此，操作员 B 的提交被驳回。 这样，就避免了操作员 B 用基于version=1 的旧数据修改的结果覆盖操作 员 A 的操作结果的可能。 
从上面的例子可以看出，乐观锁机制避免了长事务中的数据库加锁开销（操作员 A和操作员 B 操作过程中，都没有对数据库数据加锁），
大大提升了大并发量下的系 统整体性能表现。 需要注意的是，'乐观锁机制'往往'基于系统中的数据存储逻辑'，因此也具备一定的局 限性，
如在上例中，由于乐观锁机制是在我们的系统中实现，来自外部系统的用户余额更新操作不受我们系统的控制，因此可能会造成脏数据被更新到数据库中。
在系统设计阶段，我们应该充分考虑到这些情况出现的可能性，并进行相应调整（如将'乐观锁策略在数据库存储过程中实现'，对外只开放基于此存储过程的
数据更新途径，而不是将数据库表直接对外公开）。 Hibernate 在其数据访问引擎中内置了乐观锁实现。如果不用考虑外部系统对数 据库的更新操作，
利用 Hibernate 提供的透明化乐观锁实现，将大大提升我们的 生产力。

//User.hbm.xml
//<?xml version="1.0"?>
//<!DOCTYPE hibernate-mapping PUBLIC
//        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
//        "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">
//<hibernate-mapping package="com.xiaohao.test">
// 
//    <class name="User"  table="user" optimistic-lock="version" >
//              <id name="id">
//            <generator class="native" />
//        </id>
//        <!--version标签必须跟在id标签后面-->
//        <version column="version" name="version"  />
//        <property name="userName"/>
//        <property name="password"/>
//                 
//    </class>
// 
//</hibernate-mapping>

注意'version节点'必须'出现在ID节点之后'。 
这里我们'声明'了一个 'version 属性'，用于'存放用户的版本信息'，保存在 User 表的version中 
'optimistic-lock 属性有如下可选取值'： 
Ø 'none'
'无乐观锁'
Ø 'version'
'通过版本机制实现乐观锁'
Ø 'dirty'
'通过检查发生变动过的属性''实现乐观锁'
Ø all
通过'检查所有属性''实现乐观锁' 
其中通过'version实现的乐观锁机制'是'Hibernate官方推荐的乐观锁实现'，同时也 
是'Hibernate'中，目前'唯一在数据对象''脱离 Session' 发生'修改的情况下''依然有效''的锁机 制'。
因此，一般情况下，我们都选择 version 方式作为 Hibernate 乐观锁实现机制。

2 ． 配置文件hibernate.cfg.xml和UserTest测试类
//hibernate.cfg.xml
//<!DOCTYPE hibernate-configuration PUBLIC
//        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
//        "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">
// 
//<hibernate-configuration>
//<session-factory>
// 
//    <!-- 指定数据库方言 如果使用jbpm的话，数据库方言只能是InnoDB-->
//    <property name="dialect">org.hibernate.dialect.MySQL5InnoDBDialect</property>
//    <!-- 根据需要自动创建数据表 -->
//    <property name="hbm2ddl.auto">update</property>
//    <!-- 显示Hibernate持久化操作所生成的SQL -->
//    <property name="show_sql">true</property>
//    <!-- 将SQL脚本进行格式化后再输出 -->
//    <property name="format_sql">false</property>
//    <property name="current_session_context_class">thread</property>
// 
//    <!-- 导入映射配置 -->
//    <property name="connection.url">jdbc:mysql://// /user</property>
//    <property name="connection.username">root</property>
//    <property name="connection.password">123456</property>
//    <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
//    <mapping resource="com/xiaohao/test/User.hbm.xml" />
//</session-factory>
//</hibernate-configuration>

UserTest.java
复制代码
package com.xiaohao.test;
 
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
 
public class UserTest {
    public static void main(String[] args) {
        Configuration conf=new Configuration().configure();
        SessionFactory sf=conf.buildSessionFactory();
        Session session=sf.getCurrentSession();
        Transaction tx=session.beginTransaction();
//      User user=new User("小浩","英雄");
//      session.save(user);
//      session.createSQLQuery("insert into user(userName,password)
//      value('张英雄16','123')").executeUpdate();
        User user=(User) session.get(User.class, 1);
        user.setUserName("221");
//      session.save(user);
   
        System.out.println("恭喜您，用户的数据插入成功了哦~~");
        tx.commit();
    }
 
}

'每次对TUser进行更新的时候'，我们可以发现，'数据库中的 version 都在递增'。
 

下面我们将要'通过乐观锁'来'实现一下并发'和'同步的测试用例':

这里需要'使用两个测试类'，分别'运行在不同'的'虚拟机上面'，以此来'模拟多个用户''同时操作一张表',同时其中一个测试类需要模拟长事务

UserTest.java
package com.xiaohao.test;
 
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
 
public class UserTest {
    public static void main(String[] args) {
        Configuration conf=new Configuration().configure();
        SessionFactory sf=conf.buildSessionFactory();
        Session session=sf.openSession();
////    Session session2=sf.openSession();
        User user=(User) session.createQuery(" from User user where user=5").uniqueResult();
////    User user2=(User) session.createQuery(" from User user where user=5").uniqueResult();
        System.out.println(user.getVersion());
////    System.out.println(user2.getVersion());
        Transaction tx=session.beginTransaction();
        user.setUserName("101");
        tx.commit();
         
        System.out.println(user.getVersion());
////    System.out.println(user2.getVersion());
//      System.out.println(user.getVersion()==user2.getVersion());
// 		Transaction tx2=session2.beginTransaction();
// 		user2.setUserName("4468");
// 		tx2.commit();
   
    }
 
}
 

UserTest2.java
package com.xiaohao.test;
 
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
 
public class UserTest2 {
    public static void main(String[] args) throws InterruptedException {
        Configuration conf=new Configuration().configure();
        SessionFactory sf=conf.buildSessionFactory();
        Session session=sf.openSession();
//// 	Session session2=sf.openSession();
        User user=(User) session.createQuery(" from User user where user=5").uniqueResult();
        Thread.sleep(10000);
//// 	User user2=(User) session.createQuery(" from User user where user=5").uniqueResult();
        System.out.println(user.getVersion());
//// 	System.out.println(user2.getVersion());
        Transaction tx=session.beginTransaction();
        user.setUserName("100");
        tx.commit();
         
        System.out.println(user.getVersion());
//// 	System.out.println(user2.getVersion());
// 		System.out.println(user.getVersion()==user2.getVersion());
// 		Transaction tx2=session2.beginTransaction();
// 		user2.setUserName("4468");
// 		tx2.commit();
   
    }

}
 

操作流程及简单讲解: '首先启动UserTest2.java测试类'，在'执行到Thread.sleep(10000);这条语句的时候'，
当前线程会进入'睡眠状态'。在'10秒钟之内''启动''UserTest这个类'，在到达10秒的时候，我们将会在UserTest.java中抛出下面的异常:

 

复制代码
Exception in thread "main" org.hibernate.StaleObjectStateException: Row was updated or deleted by another transaction (or unsaved-value mapping was incorrect): [com.xiaohao.test.User#5]
    at org.hibernate.persister.entity.AbstractEntityPersister.check(AbstractEntityPersister.java:1932)
    at org.hibernate.persister.entity.AbstractEntityPersister.update(AbstractEntityPersister.java:2576)
    at org.hibernate.persister.entity.AbstractEntityPersister.updateOrInsert(AbstractEntityPersister.java:2476)
    at org.hibernate.persister.entity.AbstractEntityPersister.update(AbstractEntityPersister.java:2803)
    at org.hibernate.action.EntityUpdateAction.execute(EntityUpdateAction.java:113)
    at org.hibernate.engine.ActionQueue.execute(ActionQueue.java:273)
    at org.hibernate.engine.ActionQueue.executeActions(ActionQueue.java:265)
    at org.hibernate.engine.ActionQueue.executeActions(ActionQueue.java:185)
    at org.hibernate.event.def.AbstractFlushingEventListener.performExecutions(AbstractFlushingEventListener.java:321)
    at org.hibernate.event.def.DefaultFlushEventListener.onFlush(DefaultFlushEventListener.java:51)
    at org.hibernate.impl.SessionImpl.flush(SessionImpl.java:1216)
    at org.hibernate.impl.SessionImpl.managedFlush(SessionImpl.java:383)
    at org.hibernate.transaction.JDBCTransaction.commit(JDBCTransaction.java:133)
    at com.xiaohao.test.UserTest2.main(UserTest2.java:21)
复制代码
 
UserTest2代码将在 tx.commit() 处抛出 StaleObjectStateException 异 常，并指出'版本检查失败'，当前'事务正在试图提交一个过期数据'。
通过捕捉这个异常，我 们就可以在乐观锁校验失败时进行相应处理


3、'常见并发同步案例分析'

    案例一:'订票系统案例'，某航班只有一张机票，假定有1w个人打开你的网站来订票，问你如何解决并发问题(可扩展到任何高并发网站要考虑的并发读写问题)

    问题，1w个人来访问，票没出去前要保证大家都能看到有票，不可能一个人在看到票的时候别人就不能看了。到底谁能抢到，那得看这个人的“运气”（网络快慢等）

其次考虑的问题，并发，1w个人同时点击购买，到底谁能成交？总共只有一张票。

首先我们容易想到和并发相关的几个方案 ：

'锁同步同步''更多指的是应用程序的层面'，'多个线程进来'，'只能一个一个的访问'，java中指的是'syncrinized'关键字。锁也有2个层面，一个是java中谈到的对
象锁，用于'线程同步'；另外一个层面是'数据库的锁'；如果是'分布式的系统'，显然'只能利用数据库端的锁来实现'。
假定我们采用了同步机制或者数据库物理锁机制，如何保证1w个人还能同时看到有票，显然会牺牲性能，在高并发网站中是不可取的。使用hibernate后我们

提出了另外一个概念：乐观锁、悲观锁（即传统的物理锁）；

采用'乐观锁'即'可解决此问题'。'乐观锁'意思'是不锁定表的情况下'，'利用业务的控制'来'解决并发问题'，这样'即保证数据的并发可读性''又保证保存数据的排他性'，
保证性能的同时解决了并发带来的脏数据问题。

hibernate中如何实现乐观锁：

前提：在现有表当中增加一个冗余字段，'version版本号, long类型'

原理：
1）'只有当前版本号》=数据库表版本号'，'才能提交'
2）提交成功后，'版本号version ++'

实现很简单：在ormapping增加一属性optimistic-lock="version"即可，以下是样例片段
//<hibernate-mapping>
//<class name="com.insigma.stock.ABC" optimistic-lock="version" table="T_Stock" schema="STOCK">

案例二、'股票交易系统'、'银行系统'，'大数据量你是如何考虑的'
首先，股票交易系统的行情表，每几秒钟就有一个行情记录产生，一天下来就有（假定行情3秒一个） 股票数量×20×60*6 条记录，一月下来这个表记录数
量多大？ oracle中一张表的记录数超过100w后 查询性能就很差了，如何保证系统性能？
再比如，中国移动有上亿的用户量，表如何设计？把所有用于存在于一个表么？
所以，'大数量的系统'，必须'考虑表拆分'-（'表名字不一样，但是结构完全一样'），通用的几种方式：（视情况而定）

1）按业务分，比如 '手机号的表'，我们可以考虑 '130开头的作为一个表'，'131开头的另外一张表' 以此类推
2）利用'oracle的表拆分机制做分表'
3）如果是交易系统，我们可以考虑按时间轴拆分，当日数据一个表，历史数据弄到其它表。这里历史数据的报表和查询不会影响当日交易。

当然，'表拆分后我们的应用得做相应的适配'。单纯的'or-mapping'也许就得改动了。比如'部分业务得通过存储过程'等

此外，我们'还得考虑缓存'

这里的缓存，指的不仅仅是hibernate，hibernate本身'提供了一级二级缓存'。这里的'缓存独立于应用'，依然是'内存的读取'，假如我们能'减少数据库频繁的访问'，
那对系统肯定大大有利的。比如一个电子商务系统的商品搜索，如果某个关键字的商品经常被搜，那就可以考虑这部分商品列表存放到缓存（内存中去），
这样不用每次访问数据库，性能大大增加。

简单的缓存大家可以理解为自己做一个hashmap，把常访问的数据做一个key，value是第一次从数据库搜索出来的值，下次访问就可以从map里读取，而不
读数据库；专业些的目前有独立的缓存框架比如memcached 等，可独立部署成一个缓存服务器。


4、常见的提高高并发下访问的效率的手段

	首先要了解高并发的的瓶颈在哪里？
	1、可能是服务器网络带宽不够
	2.可能web线程连接数不够
	3.可能数据库连接查询上不去。
	根据不同的情况，解决思路也不同。

像第一种情况可以增加网络带宽，DNS域名解析分发多台服务器。
负载均衡，前置代理服务器nginx、apache等等
数据库查询优化，读写分离，分表等等

	最后复制一些在'高并发下'面需要'常常需要处理的内容':
'尽量使用缓存'，包括用户缓存，信息缓存等，多花点内存来做缓存，可以大量减少与数据库的交互，提高性能。
'用jprofiler等工具找出性能瓶颈'，'减少额外的开销'。
'优化数据库查询语句'，'减少直接使用hibernate等工具的直接生成语句'（仅耗时较长的查询做优化）。
'优化数据库结构'，'多做索引'，'提高查询效率'。
'统计的功能尽量做缓存'，或按'每天一统计'或'定时统计相关报表'，避免需要时进行统计的功能。
能'使用静态页面的地方尽量使用'，减少容器的解析（尽量将动态内容生成静态html来显示）。
解决以上问题后，使用服务器集群来解决单台的瓶颈问题。


'java高并发，如何解决'，'什么方式解决'
之前我将'高并发的解决方法''误认为'是'线程或者是队列可以解决'，因为'高并发的时候''是有很多用户在访问'，'导致出现系统数据不正确、丢失数据现象'，
所以想到的是用队列解决，其实队列解决的方式也可以处理，比如我们在竞拍商品、转发评论微博或者是秒杀商品等，同一时间访问量特别大，
队列在此起到特别的作用，将所有请求放入队列，以毫秒计时单位，有序的进行，从而不会出现数据丢失系统数据不正确的情况。


今天我经过查资料，高并发的解决方法有俩种:

'一种是使用缓存'、另一种是'使用生成静态页面'；还有就是'从最基础的地方优化我们写代码减少不必要的资源浪费'：(
1.'不要频繁的new对象',对于在整个应用中只需要存在一个实例的类使用单例模式.对于String的连接操作,使用StringBuffer或者StringBuilder.对于utility类型的类通过静态方法来访问。
2.'避免使用错误的方式',如'Exception可以控制方法推出',但是Exception要保留stacktrace消耗性能,'除非必要不要使用 instanceof做条件判断',
尽量使用比的条件判断方式.使用JAVA中效率高的类,比如ArrayList比Vector性能好。)
 

首先缓存技术我一直没有使用过，我觉得应该是在用户请求时将数据保存在缓存中，下次请求时会检测缓存中是否有数据存在，防止多次请求服务器，
导致服务器性能降低，严重导致服务器崩溃，这只是我自己的理解，详细的资料还是需要在网上收集；


使用生成静态页面我想大家应该不陌生，我们见过'很多网站'当'在请求的时候''页面的后缀已经变了'，如“http:// developer.51cto.com/art/201207/348766.htm”
'该页面'其实'是一个'服务器请求'地址'，在'转换成htm后'，'访问速度将提升'，因为静态页面不带有服务器组件；在这里我就多多介绍一下：
一、什么是页面静态化：
	简单的说，'我们'如果'访问一个链接' ,'服务器对应的模块'会'处理这个请求'，'转到对应的jsp界面'，最后'生成我们想要看到的数据'。
这其中的'缺点'是显而易见的：因为'每次请求服务器''都会进行处理'，'如果有太多的高并发请求'，那么就'会加重应用服务器的压力'，
'弄不好'就'把服务器搞down掉了'。那么'如何去避免'呢？如果我们'把对 test.do 请求后的结果保存成一个html文件'，然后'每次用户都去访问' ,
这样应用服务器的压力不就减少了？
那么'静态页面从哪里来呢'？总不能让我们每个页面都手动处理吧？这里就牵涉到我们要讲解的内容了，

'静态页面生成方案'… 
我们需要的是'自动的生成静态页面'，当用户访问 ,会自动生成 test.html ,然后显示给用户。

二、下面我们在简单介绍一下要想掌握'页面静态化'方案应该掌握的知识点：
1、 基础- 'URL Rewrite'
	什么是 URL Rewrite 呢 ? URL 重写。用一个简单的例子来说明问题：'输入网址' ,但是实际上'访问的却是 abc.com/test.action',
那我们就可以说 'URL 被重写了'。这项技术应用广泛，有许多开源的工具可以实现这个功能。

2、 基础- 'Servlet web.xml'
	如果你还不知道 web.xml 中'一个请求和一个 servlet 是如何匹配到一起'的，那么请搜索一下 servlet 的文档。这可不是乱说呀，有很多人就认为 /xyz/XX.do 
这样的匹配方式能有效。
	如果你还不知道怎么编写一个 servlet ,那么请搜索一下如何编写 servlet.这可不是说笑呀，在各种集成工具漫天飞舞的今天，
很多人都不会去从零编写一个 servlet了。

三、基本的方案介绍
	其中，对于 URL Rewriter的部分，可以使用收费或者'开源的工具来实现'，如果 'url不是特别的复杂，可以考虑在 servlet 中实现'，那么就是下面这个样子：
 
总 结：其实我们在开发中都很少考虑这种问题，直接都是先将功能实现，当一个程序员在干到1到2年，就会感觉光实现功能不是最主要的，
'安全性能'、'质量'等等才是 一个开发人员最该关心的。今天我所说的是高并发。
我的解决思路是：
1、采用'分布式''应用设计'
2、'分布式''缓存数据库'
3、'代码优化'
 

Java高并发的例子：

具体情况是这样： 通过java和数据库，'自己实现序列自动增长'。
实现代码大致如下：
 id_table表结构, 主要字段：
 

 id_name  varchar2(16);
 id_val  number(16,0);
 id_prefix  varchar2(4);
   
 

 

复制代码
// 操作DB
public synchronized String nextStringValue(String id){
      SqlSession sqlSess = SqlSessionUtil.getSqlSession();
      sqlSess.update("update id_table set id_val = id_val + 1 where id_name="+id);
      Map map = sqlSess.getOne("select id_name, id_prefix, id_val from id_table where id_name="+ id);
      BigDecimal val = (BigDecimal) map.get("id_val");
      // id_val是具体数字，rePack主要是统一返回固定长度的字符串；如：Y0000001, F0000001, T0000001等
      String idValue = rePack(val, map); 
      return idValue;
}
   
//公共方法
public class IdHelpTool{
	public static String getNextStringValue(String idName){
		return getXX().nextStringValue(idName);
	}
}

具体使用者，都是通过类似这种方式：'IdHelpTool.getNextStringValue("PAY_LOG")';来调用。

问题：
      （1） '当出现并发时， 有时会获取重复的ID'；
      （2） 由于服务器做了相关一些设置，有时调用这个方法，好像还会导致超时。

         为了解决问题(1), 考虑过在方法getNextStringValue上，也加上synchronized ， 同步关键字过多，会不会更导致超时？
跪求大侠提供个解决问题的大概思路！！！

 

解决思路一：
1、推荐 https://github.com/adyliu/idcenter
2、可以通过第三方redis来实现。

 

解决思路一：

1、出现重复ID，是因为脏读了，并发的时候'不加 synchronized'  比如'会出现问题'

2、但是'加了 synchronized ' ，'性能急剧下降了'，本身 java 就是多线程的，你把它单线程使用，不是明智的选择，同时，如果'分布式部署'的时候，
加了 'synchronized  也无法控制并发'

3、调用这个方法，出现超时的情况，说明你的'并发已经超过了数据库所能处理的极限'，数据库无限等待导致超时

基于上面的分析，建议采用线程池的方案，支付宝的单号就是用的线程池的方案进行的。
'数据库 update 不是一次加1'，而是'一次加几百甚至上千'，然后'取到的这 1000个序号'，放'在线程池里慢慢分配即可'，能应付任意大的并发，
同时保证数据库没任何压力。



JAVA实现乐观锁，还请高手们解惑。
场景：下单减库存。
以前采用的是'先select for update操作'，然后'再update操作'来实现防止超卖。
现在采用的方法是'用数据库的锁机制'，'更新的时候进行行锁'，这个应该是oracle或者MySQL的基本原则。
如果我现在想以'乐观锁的机制'来'实现下单减库存'，采用版本号的机制。
sql为：update table set storage = storage-1,version = version+1 where version=XX
和我不采用版本号机制，而直接更新，但是会判断库存是否大于0
sql为：update table set set storage = storage-1 where storage>0
这2种方式，差别在哪？
我自己认为：'不管是乐观锁'还是'悲观锁'，都会'限定自己修改的时候''不希望别人进行修改'。
但由于最后'都采用了数据库的update方式'，都进行了悲观锁的方式，所以我感觉这2种方案没有区别，
还请各位高手指教一下。
假如这2种方式没有区别，那么实现乐观锁的方式是不是就不能涉及到数据库级别，只能在应用级别进行修改？



背景：对于数据库的'同一条记录'，假如有'两个人同时对数据进行了修改'，然后'最终同步到数据库的时候'，因为'存在着并发'，
产生的'结果是不可预料的'。最简单的'解决方式就是'通过'给表的记录加一个version'字段，记录在修改的时候需要比较
一下'version是否匹配'，如果匹配就更新，不匹配就直接失败。'更新成功则把version+1'，也就是所谓的乐观锁。
当然这样的逻辑最好能做到对开发人员透明，本插件就是来做这件事情的。

1. 使用方式：在mybatis配置文件中加入如下配置，就完成了。
<plugins>
    <plugin interceptor="com.chrhc.mybatis.locker.interceptor.OptimisticLocker"/>
</plugins>


2. 对插件配置的说明：
上面对插件的配置默认数据库的乐观锁列对应的Java属性为version。这里可以自定义属性命，例如：
<plugins>
    <plugin interceptor="com.chrhc.mybatis.locker.interceptor.OptimisticLocker">
        <property name="versionColumn" value="xxx"/><!--数据库的列名-->
        <property name="versionField" value="xxx"/> <!--java字段名-->
    </plugin>
</plugins>

3. 效果：
之前：update user set name = ?, password = ? where id = ?
之后：update user set name = ?, password = ?, version = version+1 where id = ? and version = ?

4. 对version的值的说明：
1、当PreparedStatement获取到version值之后，插件内部会自动自增1。
2、乐观锁的整个控制过程对用户而言是透明的，这和hibernate的乐观锁很相似，用户不需要关心乐观锁的值。

5.插件原理描述：
'插件通过拦截mybatis执行的update语句'，'在原有sql语句基础之上增加乐观锁标记'，比如，原始sql为：
update user set name = ?, password = ? where id = ?，
'那么用户不需要修改sql语句，在插件的帮助之下，会自动将上面的sql语句改写成为'：
update user set name = ?, password = ?, version = version + 1 where id = ? and version = ?，
形式，用户也不用关心version前后值的问题，所有的动作对用户来说是透明的，由插件自己完成这些功能。

6.默认约定：
1、本插件拦截的update语句的Statement都是'PreparedStatement'，'仅针对这种方式的sql有效'；
2、'mapper.xml'的'<update>''标签'必须'要与接口Mapper'的'方法对应'上，也就是'使用mybatis推荐的方式'，
但是'多个接口'可以'对应一个mapper.xml'的'<update>'标签；
3、本插件'不会对sql的结果做任何操作'，'sql本身应该返回什么就是什么'；
4、插件'默认拦截所有update语句'，如果'用户对某个update不希望有乐观锁控制'，那么'在对应的mapper接口方法上面增加'
'@VersionLocker(false)'或者'@VersionLocker(value = false)',这样插件就不会对这个update做任何操作，等同于没有本插件；
5、本插件目前暂时'不支持批量更新'的'乐观锁'，原因是由于'批量更新在实际开发中应用场景不多'，另外批量更新乐观锁开发难度比较大；
6、Mapper接口的'参数类型''必须和传入的实际类型保持一致'，这是由于在JDK版本在'JDK8以下''没有任何方法'能'获取接口'的'参数列表名称'，
因此，'插件内部'是'使用参数类型'和'参数''作为映射来匹配方法签名'的；









1，水平拆分的介绍

一般来说，'简单的水平切分'主要是'将某个访问极其平凡的表'再'按照某个字段的某种规则'来'分散到多个表之中'，每个表中包含一部分数据。

简单来说，我们可以将'数据的水平切分理解为'是'按照数据行的切分'，就是'将表中的某些行''切分到一个数据库'，而'另外的某些行'又'切分到其他的数据库'中。
当然，'为了'能够'比较容易的判定各行数据'被切分到哪个数据库中了，'切分'总是'都需要按照某种特定的规则'来'进行'的。 
如'根据某个数字类型字段''基于''特定数目取模'，'某个时间类型字段的范围'，或者是'某个字符类型字段的hash 值'。
如果'整个系统中''大部分核心表'都'可以通过某个字段来进行关联'，
那'这个字段'自然'是一个进行水平分区的上上之选了'，当然，'非常特殊无法使用就只能另选其他了'。

2，水平拆分的优缺点

水平拆分的'优点'：
◆'表关联'基本能够'在数据库端''全部完成'； 
◆'不会存在'某些'超大型数据量'和'高负载的表''遇到瓶颈的问题'； 
◆'应用程序端''整体架构''改动'相对'较少'； 
◆'事务处理'相对'简单'； 
◆只要'切分规则'能够'定义好'，基本上'较难遇到扩展性限制'；

水平切分的缺点：
◆'切分规则'相对'更为复杂'，'很难抽象出一个'能够'满足整个数据库的切分规则'； 
◆'后期数据的维护难度有所增加'，'人为'手工'定位数据更困难'； 
◆'应用系统''各模块耦合度较高'，可能会'对后面数据的迁移拆分''造成一定的困难'。

3，拆分的规则

3.1 '根据取模'水平拆分

一般来说，像现在互联网非常火爆的互联网公司，特别是电商和游戏业务，基本上大部分'数据'都'能够通过会员用户信息关联'上，
可能很多'核心表'都非常'适合通过会员ID' 来'进行'数据的'水平切分'。 而像论坛社区讨论系统，就更容易切分了，非常容易按照论坛编号来进行数据的水平切分。 
切分之后基本上不会出现各个库之间的交互。

所以，对于我们的'示例数据库'来说，大部分'的表'都'可以根据用户ID' 来进行'水平'的'切分'。 
'不同用户'相关的'数据进行切分之后'存放'在不同的数据库'中。如将'所有用户ID' '通过5取模''然后'分别'存放于两个不同的数据库'中。
'每个和用户ID' '关联上的表都可以这样切分'。这样， 基本上'每个用户相关的数据'，都'在同一个数据库中'，即使是需要关联，也可以非常简单的关联上。

3.2 '根据区域'来水平切分

比如全国划分为10大片区，江浙沪算一哥，齐鲁算一个，两广算一个，两湖算一个，中原算一个，西南算一个，内蒙一个，东北一个，西北一个，华北一个，东南一个。

在'业务量比较大'的华北、东南、江浙沪、两广片区的'服务器可以分配较多的服务器资源'，比如cpu、io、网络等等可以用比较好的高端配置。

在'业务量正常'的西北、齐鲁、两湖、东北的服务器可以'分配中高端的服务器资源'。 
在'业务量比较少'的，西南、内蒙、中原的服务器可以稍微'一般服务器即可'。

当然这些资源划分不能对外明示，我们在做内部规划的时候考虑好就可以了，免得被人诟病说有所偏颇不重视之类的。

PS：这种划分不是定性的，'根据业务'可以'随时将业务好的片区的资源升级'。



5，'水平拆分后续的问题'

在实施'数据切分方案之前'，有些'可能存在的问题我们还是需要做一些分析的。一般来说， 
我们可能遇到的问题主要会有以下几点： 
◆引入'分布式事务'的问题； 
◆'跨节点Join' 的问题； 
◆'跨节点合并排序分页'问题； 


5.1 引入'分布式事务'的问题

一旦'数据进行切分被分别存放在多个MySQL Server 中'之后，不管我们的切分规则设计的多么的完美（实际上并不存在完美的切分规则），
都'可能造成'之前的'某些事务所涉及到的数据'已经'不在同一个MySQL Server' 中了。 
在这样的场景下，如果我们的应用程序仍然按照老的解决方案，那么势必'需要引入分布式事务来解决'。而在'MySQL 各个版本中'，
只有从'MySQL 5.0' 开始以后的各个版本'才开始对分布式事务提供支持'，而且目前'仅有Innodb 提供分布式事务支持'。不仅如此，
即使我们刚好使用了支持分布式事务的MySQL 版本，同时也是使用的Innodb 存储引擎，'分布式事务'本身'对于系统资源的消耗'就是'很大'的，
'性能'本身也并'不是太高'。而且引入分布式事务本身'在异常处理方面'就会带来'较多比较难控制的因素'。 
怎么办？其实我们可以可以通过一个变通的方法来解决这种问题，首先需要考虑的一件事情就是：'是否数据库是唯一一个能够解决事务的地方'呢？
其实并不是这样的，我们完全可以'结合数据库'以及'应用程序'两者来'共同解决'。各个'数据库解决自己身上的事务'，然后通过'应用程序'来'控制多个数据库'上面'的事务'。 
也就是说，只要我们愿意，完全可以将一个跨多个数据库的'分布式事务'分'拆成多个'仅处于'单个数据库上'面'的小事务'，并'通过应用程序来总控各个小事务'。
当然，'这样作的要求'就是'我们的'俄'应用程序必须要有足够的健壮性'，当然也会给应用程序带来一些技术难度。 


5.2 '跨节点Join' 的问题

上面介绍了可能引入'分布式事务的问题'，现在我们再看看需要'跨节点Join 的问题'。数据切分之后，可能会造成有些老的'Join 语句无法继续使用'，
因为Join 使用的'数据源可能'被'切分到多个MySQL Server' 中了。 
怎么办？这个问题从'MySQL 数据库角度来看'，如果非得'在数据库端来直接解决'的话， 恐怕只能'通过MySQL 一种特殊的存储引擎Federated 来解决'了。
Federated 存储引擎是 MySQL 解决类似于Oracle 的DB Link 之类问题的解决方案。和OracleDB Link 的主要区别在于'Federated '
会'保存一份远端表结构的定义信息在本地'。咋一看，Federated 确实是解决跨节点Join 非常好的解决方案。但是'我们'还'应该清楚一点'，
那就似乎如果'远端的表结构发生了变更'，'本地的表'定义信息是'不会'跟着'发生相应变化'的。如果在'更新远端表结构'的时候'并没有更新本地的Federated' 
表定义信息，就很'可能造成Query 运行出错'，无法得到正确的结果。 
对待这类问题，我还是'推荐通过应用程序来进行处理'，'先在驱动表所在的MySQL Server' 中'取出相应的驱动结果集'，
然后'根据驱动结果集'再'到被驱动表所在的MySQL Server' 中'取出 相应的数据'。可能很多读者朋友会认为这样做对性能会产生一定的影响，
是的，确实是会'对性能有一定的负面影响'，但是除了此法，基本上没有太多其他更好的解决办法了。而且，由于数据库通过较好的扩展之后，
'每台MySQL Server' 的'负载就可以得到较好的控制'，单纯'针对单条Query 来说'，其'响应时间'可能'比不切分之前要提高一些'，
所以性能方面所带来的负面影响也并不是太大。更何况，类似于这种需要跨节点Join 的需求也并不是太多，相对于总体性能而言，
可能也只是很小一部分而已。所以为了整体性能的考虑，偶尔牺牲那么一点 点，其实是值得的，毕竟系统优化本身就是存在很多取舍和平衡的过程。 


5.3 '跨节点合并排序分页'问题

一旦进行了'数据'的'水平切分之后'，可能就并不仅仅只有跨节点Join 无法正常运行，有些'排序分页的Query 语句的数据源'可能也会'被切分到多个节点'，
这样造成的'直接后果就是'这些'排序分页Query 无法继续正常运行'。其实这和跨节点Join 是一个道理，数据源存在于多个节点上，要通过一个Query 来解决，
就和跨节点Join 是一样的操作。同样Federated 也可以部分解决，当然存在的风险也一样。 
还是同样的问题，怎么办？我同样仍然继续建议'通过应用程序来解决'。 
如何解决？解决的思路'大体'上'和跨节点Join' 的解决'类似'，但是'有一点'和跨节点Join '不太一样'，'Join' 很多时候都'有一个驱动与被驱动的关系'，
所以'Join' 本身'涉及到'的'多个表'之间的'数据读取'一般都'会存在一个顺序关系'。但是'排序分页'就'不太一样'了，'排序分页'的'数据源'基本上可以说'是一个表'（或者一个结果集），
本身并'不存在'一个'顺序关系'，所以在'从多个数据源取数据'的过程是'完全可以并行的'。这样，'排序分页数据的取数效率'我们可以'做的比跨库Join 更高'，
所以带来的性能损失相对的要更小，在有些情况下可能比在原来未进行数据切分的数据库中效率更高了。当然，不论是跨节点Join 还是跨节点排序分页，
都'会使我们的应用服务器''消耗更多的资源'，尤其是'内存资源'，因为我们在'读取访问'以及'合并结果集'的这个过程'需要比原来处理更多的数据'。

分析到这里，可能很多朋友会发现，上面所有的这些问题，我给出的建议基本上都是通过应用程序来解决。大家可能心里开始犯嘀咕了，
是不是因为我是DBA，所以就很多事情都扔给应用架构师和开发人员了？ 

其实完全不是这样，首先应用程序由于其特殊性，可以非常容易做到很好的扩展性，但是数据库就不一样，必须借助很多其他的方式才能做到扩展，
而且在这个扩展过程中，'很难避免带来'有些'原来在集中式数据库'中'可以解决'但'被切分开成一个数据库集群之后'就'成为一个难题的情况'。
要想让系统整体得到最大限度的扩展，我们只能让应用程序做更多的事情， 来解决数据库集群无法较好解决的问题。

5.4 小结：

通过'数据切分'技术'将一个大的MySQL Server' '切分成多个小的MySQL Server'，既'解决了写入性能瓶颈'问题，同时也'再一次提升了整个数据库集群的扩展性'。
'不论是通过垂直切分'， 还是'水平切分'，都能够'让系统遇到瓶颈的可能性更小'。尤其是当我们使用垂直和水平相结合的切分方法之后，理论上将不会再遇到扩展瓶颈了。

6，案例演示

6.1 创建数据库3个实例

创建多实例参加： http://www.linuxidc.com/Linux/2015-05/117732.htm

6.2 创建库和表以及用户

创建库表
create database `hwdb` /*!40100 default characterset utf8 */;
create table uc_user(user_id bigint primarykey, uc_name varchar(200), created_time datetime) 
engine=innodb charset utf8;

创建用户
grant insert,update,delete,select on hwdb.* to tim@'192.168.%' identified by 'timgood2013';

执行过程：
mysql> create table uc_user(user_id bigint primary key, uc_name varchar(200), created_time datetime) 
engine=innodbcharset utf8;
Query OK, 0 rows affected (0.53 sec)

mysql>
mysql> grant insert,update,delete,select on hwdb.* to tim@'192.168.%' identified by 'timgood2013';
Query OK, 0 rows affected (0.03 sec)

mysql>

6.3 创建java代码示例
package mysql;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;

public classMySQLTest {

    public static void main(String[] args) {

        MySQLTest mt=newMySQLTest();
        //
        BigInteger bi = newBigInteger("2015053010401005");
        String port=mt.getDBPort(bi.longValue());
        Connection conn=mt.getConn(port);
        mt.insert(conn,bi, "tim--"+bi.longValue());


    }


    // 获取要访问的db端口
    public String getDBPort(long user_id){
        Stringport="3307";
        long v_cast=user_id%3;
        if (v_cast==1 ){
             port="3308";
        }else if(v_cast==2){
             port="3309";
        }else {
            port="3307";
        }
        return port;
    }

    // 获取数据库的连接，如果扩展的话，可以单独做一个接口提供给程序员来调用它
    public Connection getConn(String port ) {
        Connectionconn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
        }catch(ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        Stringurl = "jdbc:mysql://192.168.52.130:"+port+"/hwdb";
        try {
            conn= DriverManager.getConnection(url, "tim", "timgood2013");
        }catch(SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("the current db is :"+url);
        return conn;
    }

    // 获取日期字符串
    public StringgetTimeByCalendar(){
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);//获取年份
        int month=cal.get(Calendar.MONTH);//获取月份
        int day=cal.get(Calendar.DATE);//获取日
        int hour=cal.get(Calendar.HOUR);//小时
        int minute=cal.get(Calendar.MINUTE);//分          
        int second=cal.get(Calendar.SECOND);//秒
        String strdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
        return strdate;
   }


    // 开始录入数据
    public int insert(Connectioncnn,BigInteger user_id,String name){
        Stringsql="insert intohwdb.uc_user(user_id,uc_name,created_time)values(?,?,?)";
        int i=0; 
        long uid =user_id.longValue();

        Connectionconn=cnn;
        try{ 
            PreparedStatement preStmt=conn.prepareStatement(sql); 
            preStmt.setLong(1, uid);
            preStmt.setString(2,name);
            preStmt.setString(3,getTimeByCalendar());

            i=preStmt.executeUpdate(); 
        }
        catch (SQLException e){ 
            e.printStackTrace(); 
        } 
        return i;//返回影响的行数，1为执行成功 

    }


}
 

6.4 测试代码

'User_id按照注册年月日时分秒+9999'，这样的思路是，'一秒满足9999个并发'，也不会，至于如何统一规划这全局的9999个，
可以设置一个'静态的全局变量'，而且这个全局变量会'及时保存到某个DB中'，这样基本保证了不重复，
比如user_id：2015053010401005、2015053010401006、2015053010401007，测试代码如下：

        MySQLTest mt=new MySQLTest();
        //
        BigInteger bi = new BigInteger("2015053010401005");
        String port=mt.getDBPort(bi.longValue());
        Connection conn=mt.getConn(port);
        mt.insert(conn,bi, "tim--"+bi.longValue());
1）'通过%3来获取DB连接'；
       余0 --> db1（3307端口）
       余1 --> db2（3308端口）
       余2 --> db3（3309端口）
2）'查看结果'
运行结束后，可以'去3个实例相应的查看录入的数据'，如下所示： 
Id为2015053010401005应该录入到db1（3307端口）

[root@data02 ~]# mysql--socket=/usr/local/mysql3307/mysql.sock -e "select * from hwdb.uc_user;";
+------------------+-----------------------+---------------------+
| user_id          | uc_name               | created_time        |
+------------------+-----------------------+---------------------+
| 2015053010401005 | tim--2015053010401005 |2015-04-30 09:27:48 |
+------------------+-----------------------+---------------------+
[root@data02 ~]#
Id为2015053010401006应该录入到db2（3308端口）

[root@data02 ~]# mysql--socket=/usr/local/mysql3308/mysql.sock -e "select * from hwdb.uc_user;";
+------------------+-----------------------+---------------------+
| user_id          | uc_name               | created_time        |
+------------------+-----------------------+---------------------+
| 2015053010401006 | tim--2015053010401006 |2015-04-30 09:27:57 |
+------------------+-----------------------+---------------------+
[root@data02 ~]#

Id为2015053010401007应该录入到db3（3309端口）

[root@data02 ~]# mysql--socket=/usr/local/mysql3309/mysql.sock -e "select * from hwdb.uc_user;";
+------------------+-----------------------+---------------------+
| user_id          | uc_name               | created_time        |
+------------------+-----------------------+---------------------+
| 2015053010401007 | tim--2015053010401007| 2015-04-30 09:28:01 |
+------------------+-----------------------+---------------------+
[root@data02 ~]#
6.5总结

基本和预想的一样的，'数据通过模id取余'数的方法，水平'拆分到不同的库里'面，这里只是'简单演示了下'，
实际生产的复杂程度远'比这个要高的多'，所以大家遇到的问题会更多，但是'水平拆分的理念都是类似的'，这条路是光明的，
大家可以放心走下去。

参考文档：MySQL性能调优与架构设计 PDF中文版全册  http://www.linuxidc.com/Linux/2013-07/87684.htm

本文永久更新链接地址：http://www.linuxidc.com/Linux/2015-06/118383.htm 
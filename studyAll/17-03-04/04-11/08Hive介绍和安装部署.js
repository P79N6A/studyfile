'Hive介绍'

Hive是Facebook开发的'构建于Hadoop集群之上的数据仓库应用'，它提供了类'似于SQL语法的HQL语句作为数据访问接口'，
这使得普通分析人员的应用Hadoop的学习曲线变小，Hive有如下特性：

Hive是基于Hadoop的一个'数据仓库工具'，可以将'结构化的数据文件映射为一张数据库表'，
并'使用sql语句转换为MapReduce任务进行运行'。其优点是学习成本低，可以'通过类SQL语句快速实现简单的MapReduce统计'，
不必开发专门的MapReduce应用，十分适合数据仓库的统计分析；

'Hive是建立在 Hadoop 上的数据仓库基础构架'。它'提供了一系列的工具，可以用来进行数据提取转化加载'（ETL），
这'是一种可以存储、查询和分析存储在 Hadoop 中的大规模数据的机制'。Hive 定义了'简单的类' 'SQL' '查询语言'，称为 'HQL'，
它允许'熟悉 SQL 的用户查询数据'。同时，这个语言也'允许熟悉 MapReduce 开发者'的'开发自定义'的 'Mapper' 和 'Reducer'
来'处理'内建的'Mapper 和Reducer' 无法完成的'复杂的分析工作'。

2.1 Hive与关系数据库的区别
使用Hive的命令行接口'很像操作关系数据库'，但是Hive和关系数据库还是'有很大的不同'， Hive与关系数据库的区别具体如下：

'Hive和关系数据库''存储文件的系统不同'，'Hive使用的是Hadoop的HDFS'（Hadoop的分布式文件系统），
'关系数据库则是服务器本地的文件系统'；
'Hive使用的计算模型是Mapreduce'，而关系数据库则是'自身的计算模型'；

'关系数据库都是为实时查询的业务进行设计的'，而'Hive则是为海量数据做数据挖掘设计的'，实时性很差；
实时性的区别导致Hive的'应用场景'和关系数据库'有很大的不同'；
'Hive'很'容易扩展自己的存储能力'和'计算能力'，这个是'继承Hadoop的'，而'关系数据库'在这个方面要'比数据库差很多'。

2.2 Hive架构
由上图可知，'Hadoop的mapreduce是Hive架构的根基'。'Hive架构包括如下组件'：'CLI（command line interface）'、
'JDBC/ODBC'、'Thrift Server'、'WEB GUI'、'metastore和Driver(Complier、Optimizer和Executor)'，
这些组件分为两大类：'服务端组件'和'客户端组件'。

'服务端组件'：
'Driver组件：该组件包括Complier、Optimizer和Executor'，它的作用是'将HiveQL（类SQL）语句进行解析'、编译优化，
生成执行计划，然后'调用底层的mapreduce计算框架'；

'Metastore组件'：元数据服务组件，这个组件存储'Hive的元数据'，Hive的元数据'存储在关系数据库里'，'Hive支持的关系数据库有derby和mysql'。
元数据对于Hive十分重要，因此'Hive支持把metastore''服务独立出来'，'安装到远程的服务器集群'里，
从而'解耦Hive服务'和'metastore服务'，'保证Hive运行的健壮性'；

Thrift服务：'thrift是facebook开发的一个软件框架'，它用来进行'可扩展且跨语言的服务的开发'，Hive集成了该服务，
能让不同的'编程语言调用hive的接口'。

'客户端组件'：
CLI：command line interface，命令行接口。
Thrift客户端：上面的架构图里没有写上Thrift客户端，但是Hive架构的许多客户端接口是建立在thrift客户端之上，包括JDBC和ODBC接口。
WEBGUI：Hive客户端提供了一种通过网页的方式访问hive所提供的服务。这个接口对应Hive的hwi组件（hive web interface），使用前要启动hwi服务。

3 搭建Hive环境
3.1 '安装MySql数据库'（实验环境中已经安装无需再次安装）

注意：由于'实验环境中已经安装了mysql服务'，后续安装步骤仅供参考，可直接跳转到3.1.3节继续学习
3.1.1 下载mysql安装文件

下载地址：http://dev.mysql.com/downloads/mysql/#downloads ， 
使用系统为CentOS选择 'Red Hat Enterprise Linux/Oracle'系列，也可以在'/home/shiyanlou/install-pack'目录中找到这些安装包：

3.1.2 安装mysql
使用命令查看是否已经安装过mysql：

sudo rpm -qa | grep -i mysql
可以看到如下图的所示： 此处输入图片的描述

说明之前安装了mysql，可以参考4.1进行卸载旧的mysql。如果以前没有安装mysql则进入安装文件的目录，安装mysql服务端

cd /home/shiyanlou/install-pack
sudo rpm -ivh MySQL-server-5.6.21-1.el6.x86_64.rpm
此处输入图片的描述

出现异常，通过分析缺少libaio依赖包，使用如下命令进行安装：

sudo yum install libaio
再次安装mysql，并安装mysql客户端、mysql-devel

sudo rpm -ivh MySQL-server-5.6.21-1.el6.x86_64.rpm
sudo rpm -ivh MySQL-client-5.6.21-1.el6.x86_64.rpm
sudo rpm -ivh MySQL-devel-5.6.21-1.el6.x86_64.rpm
3.1.3 启动mysql服务

通过下面查看mysql服务状态：

sudo service mysql status
如果mysql没有启动，通过如下命令进行启动：

sudo service mysql start
3.1.4 设置root密码

在CentOS6.5操作系统使用如下命令给mysql设置root密码时，出现如下错误： /usr/bin/mysqladmin -u root password 'root';

/usr/bin/mysqladmin: connect to server at 'localhost' failed error: 'Access denied for user 'root'@'localhost' (using password: NO)' 可以进入安全模式进行设置root密码

（1） 停止mysql服务

使用如下命令停止mysql服务：

sudo service mysql stop
sudo service mysql status
（2） 跳过验证启动mysql

使用如下命令验证启动mysql，由于&结尾是后台运行进程，运行该命令可以再打开命令窗口或者Ctr+C继续进行下步操作：

sudo mysqld_safe --skip-grant-tables &
sudo service mysql status
（3） 跳过验证启动MySQL

验证mysql服务已经在后台运行后，执行如下语句，其中后面三条命令是在mysql语句：

mysql -u root
mysql>use mysql;
mysql>update user set password = password('root') where user = 'root';
mysql>flush privileges;
mysql>quit
（4） 跳过验证启动MySQL

重启mysql服务并查看状态

sudo service mysql restart
sudo service mysql status
3.1.5 设置Hive用户

进入mysql命令行，创建hive用户并赋予所有权限：

mysql -uroot -proot
mysql>set password=password('root');
mysql>create user 'hive' identified by 'hive';
mysql>grant all on *.* TO 'hive'@'%' identified by 'hive' with grant option;
mysql>grant all on *.* TO 'hive'@'localhost' identified by 'hive' with grant option;
mysql>flush privileges;
（注意：如果是root第一次登录数据库，需要重新设置一下密码，所报异常信息如下：ERROR 1820 (HY000): You must SET PASSWORD before executing this statement）

3.1.6 创建hive数据库

使用hive用户登录，创建hive数据库：

mysql -uhive -phive -h hadoop
mysql>create database hive;
mysql>show databases;
3.2 安装Hive

3.2.1 解压并移动Hive安装包

可以到Apache基金hive官网http://hive.apache.org/downloads.html，选择镜像下载地址：http://mirrors.cnnic.cn/apache/hive/下载一个稳定版本，如下图所示：

也可以在/home/shiyanlou/install-pack目录中找到该安装包，解压该安装包并把该安装包复制到/app目录中

cd /home/shiyanlou/install-pack
tar -xzf hive-0.12.0-bin.tar.gz
mv hive-0.12.0-bin /app/hive-0.12.0
3.2.2 解压并移动MySql驱动包

到mysql官网进入下载页面：http://dev.mysql.com/downloads/connector/j/ ，选择所需要的版本进行下载，这里下载的zip格式的文件

也可以在/home/shiyanlou/install-pack目录中找到该安装包，解压该安装包并把该安装包复制到/app/lib目录中

cd /home/shiyanlou/install-pack
cp mysql-connector-java-5.1.22-bin.jar /app/hive-0.12.0/lib
3.2.3 配置/etc/profile环境变量

使用如下命令打开/etc/profile文件：

sudo vi /etc/profile
设置如下参数：

export HIVE_HOME=/app/hive-0.12.0
export PATH=$PATH:$HIVE_HOME/bin
export CLASSPATH=$CLASSPATH:$HIVE_HOME/bin
使配置文件生效：

source /etc/profile
echo $PATH
3.2.4 设置hive-env.sh配置文件

进入hive-0.12.0/conf目录，复制hive-env.sh.templaete为hive-env.sh：

cd /app/hive-0.12.0/conf
cp hive-env.sh.template hive-env.sh
sudo vi hive-env.sh
分别设置HADOOP_HOME和HIVE_CONF_DIR两个值：

export HADOOP_HOME=/app/hadoop-1.1.2
export HIVE_CONF_DIR=/app/hive-0.12.0/conf
3.2.5 设置hive-site.xml配置文件

复制hive-default.xml.templaete为hive-site.xml

cd /app/hive-0.12.0/conf
cp hive-default.xml.template hive-site.xml
sudo vi hive-site.xml
（1） 加入配置项

默认metastore在本地，添加配置改为非本地

hive.metastore.local
false
（2） 修改配置项

hive默认为derby数据库，需要把相关信息调整为mysql数据库

hive.metastore.uris
thrift://hadoop:9083
Thrift URI for the remote metastore. ...
javax.jdo.option.ConnectionURL
jdbc:mysql://hadoop:3306/hive?=createDatabaseIfNotExist=true
JDBC connect string for a JDBC metastore
javax.jdo.option.ConnectionDriverName
com.mysql.jdbc.Driver
Driver class name for a JDBC metastore
javax.jdo.option.ConnectionUserName
hive
username to use against metastore database
javax.jdo.option.ConnectionPassword
hive
password to use against metastore database
此处输入图片的描述

此处输入图片的描述

（3） 订正错误项

在配置文件2000行左右配置项hive.server2.thrift.sasl.qop原来为auth，按照如下进行修改：

hive.server2.thrift.sasl.qop
auth
<des.....
此处输入图片的描述

并把hive.metastore.schema.verification配置项值修改为false

hive.metastore.schema.verification
false
此处输入图片的描述

3.3 验证部署

3.3.1 启动metastore和hiveserver

在使用hive之前需要启动metastore和hiveserver服务，通过如下命令启用：

hive --service metastore &
hive --service hiveserver &
此处输入图片的描述

启动用通过jps命令可以看到两个进行运行在后台 此处输入图片的描述

3.3.2 在hive中操作

登录hive，在hive创建表并查看该表，命令如下：

hive
hive>create table test(a string, b int);
hive>show tables;
hive>desc test;
此处输入图片的描述

登录mysql，在TBLS表中查看新增test表：

mysql -uhive -phive
mysql>use hive;
mysql>select TBL_ID, CREATE_TIME, DB_ID, OWNER, TBL_NAME,TBL_TYPE from TBLS;
此处输入图片的描述

4 问题解决

4.1 卸载旧的mysql

（1） 查找以前是否安装有mysql

使用命令查看是否已经安装过mysql：

sudo rpm -qa | grep -i mysql
可以看到如下图的所示：

说明之前安装了：

MySQL-client-5.6.21-1.el6.x86_64
MySQL-server-5.6.21-1.el6.x86_64
MySQL-devel-5.6.21-1.el6.x86_64
如果没有结果，可以进行跳到3.1.3步骤的mysql数据库安装

（2） 停止mysql服务、删除之前安装的mysql

停止mysql服务、删除之前安装的mysql删除命令：rpm -ev –nodeps 包名

sudo rpm -ev MySQL-server-5.6.21-1.el6.x86_64
sudo rpm -ev MySQL-devel-5.6.21-1.el6.x86_64
sudo rpm -ev MySQL-client-5.6.21-1.el6.x86_64
此处输入图片的描述

如果存在CentOS自带mysql-libs-5.6.21-1.el6.x86_64使用下面的命令卸载即可

sudo rpm -ev --nodeps mysql-libs-5.6.21-1.el6.x86_64
（3） 查找之前老版本mysql的目录并且删除老版本mysql的文件和库

此处输入图片的描述

sudo find / -name mysql
删除对应的mysql目录

sudo rm -rf /usr/lib64/mysql
sudo rm -rf /var/lib/mysql
此处输入图片的描述

（4） 再次查找机器是否安装mysql

sudo rpm -qa | grep -i mysql
无结果，说明已经卸载彻底、接下来直接安装mysql即可 此处输入图片的描述

4.2 Hive启动，报CommandNeedRetryException异常

启动hive时，出现CommandNeedRetryException异常，具体信息如下： 此处输入图片的描述

Exception in thread "main" java.lang.NoClassDefFoundError:org/apache/hadoop/hive/ql/CommandNeedRetryException
        at java.lang.Class.forName0(Native Method)
        at java.lang.Class.forName(Class.java:270)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:149)
Caused by: java.lang.ClassNotFoundException: org.apache.hadoop.hive.ql.CommandNeedRetryException
        at java.net.URLClassLoader$1.run(URLClassLoader.java:366)
        at java.net.URLClassLoader$1.run(URLClassLoader.java:355)
        at java.security.AccessController.doPrivileged(Native Method)
        at java.net.URLClassLoader.findClass(URLClassLoader.java:354)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:425)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:358)
由于以前使用hadoop时，修改hadoop-env.sh的HADOOP_CLASSPATH配置项，由以前的：

export HADOOP_CLASSPATH=/app/hadoop-1.1.2/myclass
修改为：

export HADOOP_CLASSPATH=$HADOOP_CLASSPATH:/app/hadoop-1.1.2/myclass
此处输入图片的描述

此处输入图片的描述

4.3 在Hive中使用操作语言

启动hive后，使用Hql出现异常，需要启动metastore和hiveserver 此处输入图片的描述

FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.DDLTask. java.lang.RuntimeException: Unable to instantiate org.apache.hadoop.hive.metastore.HiveMetaStoreClient
在使用hive之前需要启动metastore和hiveserver服务，通过如下命令启用：

hive --service metastore &
hive --service hiveserver &
此处输入图片的描述 启动用通过jps命令可以看到两个进程运行在后台 此处输入图片的描述

问题导读
1.'hbase安装'在'什么情况'下会发生，'启动之后''自动宕机'
2.'hbase安装目录'该'如何选择'？
3.'hbase目录'如果出现'权限不一致'，会'发生什么'情况？
4.如果'只有一个节点'有'临时目录'会'出现什么情况'？

Hbase'集群'安装'前注意'

1）'Java'：（hadoop已经安装了），
2）'Hadoop 0.20.x / Hadoop-2.x '已经'正确安装'（hadoop安装参考hadoop2完全分布式最新
高可靠安装文档），并且'可以启动 HDFS' 系统，并且需要'确保hdfs'能够'上传'和'读写文件'。例如：
我们上传hbase的所有xml配置文件

上传文件：
上面说明，hdfs运行正常。
3）ssh '必须安装ssh' ， 'sshd' 也'必须运行'，这样Hadoop的'脚本'才'可以远程'操控'其他的Hadoop'
'和Hbase进程'。ssh之间'必须都打通'，'不用密码'都'可以登录'。ssh打通可以参考：CentOS6.4之图解
SSH无验证双向登陆配置、linux（ubuntu）无密码相互登录高可靠文档
4）'NTP'：集群的'时钟'要'保证基本'的'一致'。稍有不一致是可以容忍的，但是'很大'的'不一致'会 
'造成奇怪'的'行为'。 运行 NTP 或者其他什么东西来同步你的时间.

如果你查询的时候或者是遇到奇怪的故障，可以'检查一下''系统时间'是否正确!
设置集群各个节点时钟：date -s “2012-02-13 14:00:00”
ubuntu可以参考ubuntu ntp时间同步服务器搭建与使用

5）'ulimit' 和 'nproc':
'HBase'是数据库，'会'在同一时间'使用很多'的'文件句柄'。大'多数linux'系统使用的'默认值1024'
是不能满足的，
会导致FAQ:FAQ: Why do I see "java.io.IOException...(Too many open files)" in my logs?
异常。还可能会发生这样的异常
2010-04-06 03:04:37,542 INFO org.apache.hadoop.hdfs.DFSClient:ExceptionincreateBlockOutputStream java.io.EOFException
2010-04-06 03:04:37,542 INFO org.apache.hadoop.hdfs.DFSClient:Abandoning block blk_-6935524980745310745_1391901

所以你'需要修改'你的'最大文件句柄'限制。可以'设置到10k'. 你还需要'修改 hbase 用户的 nproc'，
如果过低会造成 OutOfMemoryError异常。

需要澄清的，这'两个设置'是'针对操作系统'的，不是Hbase本身的。有'一个常见'的'错误'是'Hbase'
运行的'用户'，和'设置最大值'的'用户''不是一个用户'。在'Hbase启动'的时候，'第一行日志'会现在
ulimit信息，所以你最好检查一下。 

6）在Ubuntu上'设置ulimit'
可以先'查看当前用户 ulimit数'
'ulimit -n'

'设置ulimit:'
如果你'使用的是''Ubuntu',你可以'这样设置':
'在'文件 '/etc/security/limits.conf' '添加一行'，如:
'hadoop - nofile 32768'
可以'把 hadoop 替换成'你运行'Hbase和Hadoop的用户'。如果你用两个用户，你就需要配两个。

还有'配nproc hard' 和 'softlimits.' '在'文件 '/etc/security/limits.conf' '添加一行'下面内容:
'hadoop soft/hard nproc 32000'

在 '/etc/pam.d/common-session' '加上'这一行:
'session required  pam_limits.so'

否则在 /etc/security/limits.conf上的配置不会生效.

还有'注销再登录'，这些'配置才能生效'!
-------------------------------------------------------------------------------------------------------------- 
下面为什么'对上面设置'，'做一下说明'：
一、在 '/etc/pam.d/common-session' 加上这一行:
'session required pam_limit.so'

那么这一行的'作用是'什么？
'pam_limits.so'模块可以使'用在'对一般应用程序'使用'的'资源限制方面'。
如果需要'在SSH服务器'上'对来自不同用户的ssh'访问'进行限制'，就可以'调用该'
'模块'来实现相关功能。当需'要限制用户admin''登录到SSH'服务器时'的最大连接数'
（防止同一个用户开启过多的登录进程），就'可以在/etc/pam.d/sshd'文件中
'增加一行对pam_limits.so'模块'的调用'：
'session required pam_limit.so'

二、在文件 '/etc/security/limits.conf' '添加'如下'两行'一行，
hadoop - nofile 32768
hadoop hard nproc 16384

他们的含义分别为：
hadoop  -       nofile 32768
这个的含义是什么？
hadoop'最大'能'打开'的'文件数'不超过'65536'

hadoop           hard    nproc   16384
这个的含义是什么？
hadoop用户'最大'能'开启'的'进程数'不超过'16384'

-------------------------------------------------------------------------------------------------------------- 
'分布式模式''配置'

在进行下面'配置之前'需要'注意的问题'：
第一：首先需要'建立'，下面配置文件中的'目录'：下面配置文件'需要建立'的'的文件'：
1.'hbase''临时目录'，这里对应的是下面配置。
这里在说一下，这个'临时目录'的选择，系统'默认目录'，容'易被系统删除'，
所以我们需'要更改默认目录'。但是我们更改目录需'要注意'的一个问题，就是'用户权限'，
很多人在安装的时候随便选择了一个目录，结果不能访问，所以你的hbase起来之后，过会就挂掉了。

一、新建文件，并注意权限问题
'hbase临时目录'
<property>
<name>hbase.tmp.dir</name>
<value>file:/usr/hbase/tmp</value>
</property>

'zookeeper目录：'
<property>
<name>hbase.zookeeper.property.dataDir</name>
<value>file:/usr/hbase/zookeeper</value>
</property>

上面文件建立后，我们看到下面效果

同时看一下这'两个文件夹'的'权限与hadoop、hbase，'都'属于用户及用户组'aboutyun:aboutyun

二、'每个节点'都'必须创建'文件夹,'否则'也'会出现regionserver''自动挂机'。

上面说了注意的问题，下面'开始配置'(先配置master节点)

1.1首先'下载hbase'
链接: http://pan.baidu.com/s/1sjubg0t 密码: crxs
1.2'上传'压缩包'到Linux'
如果使用win7，则上传到Linux，这里使用的是虚拟机，通过WinSCP上传。winSCP不会使用参考新手指导：
使用 WinSCP（下载） 上文件到 Linux图文教程。
1.3'解压'
tar zxvf hbase.tar.gz

1.4'配置''conf/hbase-env.sh'
进入/usr/hbase/conf，修改hbase-env.sh
  
export JAVA_HOME=/usr/jdk1.7
# Tell HBase whether it should manage it'sown instance of Zookeeper or not.

不管是什么模式，你都需'要编辑 conf/hbase-env.sh'来'告知Hbase java'的安装'路径'.
在这个文件里你'还可以设置Hbase'的'运行环境'，诸如 heapsize和其他 JVM有关的选项, 
还有Log文件地址，等等. 设置 JAVA_HOME指向 java安装的路径.

一个'分布式运行'的'Hbase依赖一个zookeeper'集群。所有的'节点和客户端'都必须'能够访问zookeeper'。
'默认'的情况下'Hbase'会'管理一个zookeep集群'。这个集群会'随着Hbase的启动'而'启动'。当然，
你'也可'以'自己管理'一个'zookeeper集群'，但'需要配置Hbase'。你需'要修改conf/hbase-env.sh'
里面的'HBASE_MANAGES_ZK 来切换'。这个值'默认是true'的，作用是'让Hbase启动'的时候'同时也'
'启动zookeeper.'

'让Hbase使用'一个'现有'的'不被Hbase托管的Zookeep集群'，需'要设置 conf/hbase-env.sh'文件中
的'HBASE_MANAGES_ZK 属性'为' false',这里使用的是系统自带的，所以为true,
# Tell HBase whether it should manage it's own instanceof Zookeeper or not.

export HBASE_MANAGES_ZK=true

1.5'配置''conf/hbase-site.xml'
<configuration>
<property>
<name>hbase.rootdir</name>
<value>hdfs://master:8020/hbase</value>
</property>
<property>
<name>hbase.tmp.dir</name>
<value>file:/usr/hbase/tmp</value>
</property>
<property>i
<name>hbase.master</name>
<value>hdfs://master:60000</value>
</property>
<property>
<name>hbase.zookeeper.property.dataDir</name>
<value>file:/usr/hbase/zookeeper</value>
</property>
<property>
<name>hbase.cluster.distributed</name>
<value>true</value>
</property>
</configuration>

要'想运行完全''分布式'模式，'加一个属性' 'hbase.cluster.distributed' 设置'为 true' 
然后把 'hbase.rootdir' '设置为'HDFS的'NameNode'的'位置'。 例如，你的'namenode运行在node1'，
'端口'是'8020' 你'期望'的'目录'是 '/hbase',使'用如下'的'配置'：'hdfs://master:8020/hbase'.注释：
这个端口的确认：比如在
hadoop1.X中使用的hdfs://master:9000/
'hadoop2.X'中使用的'hdfs://master:8020/'这个'端口'是'由core-site.xml'来'决定'

'hbase.rootdir'：这个目录'是region server'的'共享目录'，用来'持久化Hbase'。'URL'需'要'是'完全正确'的，
'还要包含''文件系统'的'scheme'。
例如，要表示'hdfs'中的'/hbase目录'，namenode运行'在'node1的'49002端口'。
则需要设置为'hdfs://master:49002/hbase'。
'默认'情况下Hbase是'写到/tmp'的。'不改'这个配置，'数据'会'在重启'的'时'候'丢失'。
'默认: file:///tmp/hbase-${user.name}/hbase'

'hbase.cluster.distributed' ：Hbase的运行模式。'false'是'单机'模式，'true'是'分布式'模式。
若为'false','Hbase和Zookeeper'会'运行在同一'个'JVM里'面。
默认: false


在'hbase-site.xml''配置zookeeper'：
当Hbase管理zookeeper的时候，你可以通过'修改zoo.cfg来配置zookeeper'，
一个更加'简单的方法'是'在 conf/hbase-site.xml'里面'修改zookeeper'的'配置'。
Zookeeer的'配置'是'作为property''写在' hbase-site.'xml里面'的。
对于zookeepr的'配置'，你至少'要在 hbase-site.xml'中列出zookeepr的'ensemble servers'，
具体的字段是'hbase.zookeeper.quorum.'该这个字段的默认值是'localhost'，
这个值'对于分布式'应用显然是'不可以'的. (远程连接无法使用)。
'hbase.zookeeper.property.clientPort'：'ZooKeeper的zoo.conf'中的'配置'。 
'客户端连接的端口'。
<property>
<name>hbase.zookeeper.property.clientPort</name>
<value>2181</value>
</property>

'hbase.zookeeper.quorum'：'Zookeeper集群'的'地址列表'，用'逗号分割'。
例如："host1.mydomain.com,host2.mydomain.com,host3.mydomain.com".
'默认是localhost',是给'伪分布式'用的。要'修改才能'在'完全分布式'的情况下'使用'。
如果在'hbase-env.sh设置'了'HBASE_MANAGES_ZK'，
这些'ZooKeeper节点'就'会和Hbase''一起启动'。
<property>
<name>hbase.zookeeper.quorum</name>
<value>master,slave1,slave2</value>
</property>

运行'一个zookeeper也'是'可以'的，但是在'生产'环境'中'，你最好'部署3，5，7个节点'。
部署的'越多'，'可靠性'就'越高'，当然'只能'部署'奇数个'，偶数个是不可以的。
你需要给'每个zookeeper 1G'左右的'内存'，如果可能的话，最好'有独立'的'磁盘'。 
('独立磁盘'可以'确保zookeeper'是'高性能'的。).如果你的'集群负载很重'，
'不要把Zookeeper和RegionServer''运行在同一台机器'上面。
就'像DataNodes 和 TaskTrackers一样'
'hbase.zookeeper.property.dataDir'：'ZooKeeper的zoo.conf中的配置'。 
'快照的存储位置'
<property>
<name>hbase.zookeeper.property.dataDir</name>
<value>/home/hadoop/zookeeper</value>
</property>

把'ZooKeeper'保存'数据'的目录'地址改掉'。'默认'值是 '/tmp' ，这里在'重启'的时候'会被'
操作系统'删掉'，
可以把它'修改到 /home/hadoop/zookeeper' (这个路径hadoop用户拥有操作权限)

对于'独立的Zookeeper'，要'指明Zookeeper'的'host和端口'。可以'在 hbase-site.xml'中'设置', 
也可以'在Hbase的CLASSPATH'下面'加一个zoo.cfg''配置文件'。 
'HBase' 会'优先加载 zoo.cfg' 里面的'配置'，'把hbase-site.xml'里面的'覆盖掉'.

1.6'配置conf/regionservers'
slave1
slave2

'完全分布式'模式的还需'要修改conf/regionservers'. 在这里'列出了你希望运行的全部' 
'HRegionServer'，'一行写一个host' (就'像Hadoop'里面的 'slaves' 一样). 
列在这里的'server'会'随着集群'的'启动而启动'，集群的'停止而停止'.

1.7'替换hadoop'的'jar包'
hbase基本的配置完了。
'查看hbase'的'lib目录'下。
'ls lib |grep hadoop'

hadoop-annotations-2.1.0-beta.jar
hadoop-auth-2.1.0-beta.jar
hadoop-client-2.1.0-beta.jar
hadoop-common-2.1.0-beta.jar
hadoop-hdfs-2.1.0-beta.jar
hadoop-hdfs-2.1.0-beta-tests.jar
hadoop-mapreduce-client-app-2.1.0-beta.jar
hadoop-mapreduce-client-common-2.1.0-beta.jar
hadoop-mapreduce-client-core-2.1.0-beta.jar
hadoop-mapreduce-client-jobclient-2.1.0-beta.jar
hadoop-mapreduce-client-jobclient-2.1.0-beta-tests.jar
hadoop-mapreduce-client-shuffle-2.1.0-beta.jar
hadoop-yarn-api-2.1.0-beta.jar
hadoop-yarn-client-2.1.0-beta.jar
hadoop-yarn-common-2.1.0-beta.jar
hadoop-yarn-server-common-2.1.0-beta.jar
hadoop-yarn-server-nodemanager-2.1.0-beta.jar

看到它是'基于hadoop2.1.0'的，所以我们需'要用'我们的'hadoop2.2.0'下的jar包来'替换2.1'的，
'保证版本'的'一致性'，hadoop下的'jar包都是在''$HADOOP_HOME/share/hadoop下'的.

我们先cd 到 /home/hadoop/hbase-0.96.0-hadoop2/lib下运行命令： rm -rf hadoop*.jar
删掉所有的hadoop相关的jar包，然后运行：
find /home/hadoop/hadoop-2.2.0/share/hadoop -name "hadoop*jar" | xargs -i cp {} /home/hadoop/hbase-0.96.0-hadoop2/lib/ 
拷贝所有hadoop2.2.0下的jar包hbase下进行hadoop版本的统一


注意的问题：
由于'包之间'的'重复'，后面使用还会'产生问题'，如下：
hbase使用遇到Class path contains multiple SLF4J bindings.错误解决方案
所以我们还需要'运行下面命令'：
（对于新手总想直接复制命令就像万事大吉，这里面需'要注意'的问题：
路径，如果'hbase位于usr'下面，是没有问题的。但是如果'更换了路径'，注意'红字部分你需要修改'。）

'/usr/hbase/lib rm slf4j-log4j12-1.6.4.jar'

'1.8分发hbase'
'上面'我们'配置完'毕，接着就是'把这个文件夹'下'发到slave节点'
scp  /usr/hbase slave1:~/

然后在从～/hbase移动到 /usr路径中。

'2.运行和确认安装'
2.1当'Hbase托管ZooKeeper'的时候
当Hbase托管ZooKeeper的时候'Zookeeper集群'的'启动是'Hbase'启动脚本'的一部分

首先确认你的'HDFS'是'运行'着的。你可以'运行HADOOP_HOME'中的 'bin/start-hdfs.sh' 来'启动HDFS'.
你可以'通过put'命令来'测试放一个文件'，然后有'get'命令来'读这个文件'。'通常'情况下'Hbase'
是'不会运行mapreduce'的。所以需要检查这些。

用如下命令'启动Hbase':
bin/start-hbase.sh

这个脚本'在HBASE_HOME'目录'里面'。
你现在已经启动Hbase了。Hbase把log记在 logs 子目录里面. 当Hbase启动出问题的时候，可以看看Log.

'Hbase'也有一个'界面'，上面会列出重要的属性。'默认'是在'Master的60010端口'上H
(HBase RegionServers 会默认绑定 60020端口，在端口60030上有一个展示信息的界面 ).
如果Master运行在 node1，端口是默认的话，你可以用浏览器在 http://node:60010看到主界面. .

一旦'Hbase启动'，可以'看到如何建表'，'插入数据'，'scan你的表'，'还有disable这个表'，最后把它删掉。

可以在Hbase Shell停止Hbase

'$./bin/stop-hbase.sh'

stoppinghbase...............

停止'操作需要一些时间'，你的集群越大，停的时间可能会越长。如果你正在运行一个分布式的操作，
要确认在Hbase彻底停止之前，Hadoop不能停.


2.2独立的zookeeper启动（如果另外安装，可以选此）
除了启动habse，
执行：bin/start-hbase.sh启动habse
你需要自己去运行zookeeper：
${HBASE_HOME}/bin/hbase-daemons.sh {start,stop} zookeeper
你可以用这条命令启动ZooKeeper而不启动Hbase. HBASE_MANAGES_ZK 的值是 false， 
如果你想在Hbase重启的时候不重启ZooKeeper,你可以这样。


3.  测试
可以使用jps查看进程：'在master上'：
5个

在'slave1，slave2'（slave节点）'上'
4个

通过浏览器查看60010端口：

4.  安装中出现的问题
1 ）用./start-hbase.sh启动HBase后，执行hbase shell
# bin/hbase shell
HBase Shell; enter 'help<RETURN>' for list of supported commands.
Version: 0.20.6, rUnknown, Thu Oct 28 19:02:04 CST 2010

接着创建表时候出现如下情况：
hbase(main):001:0> create 'test',''c

NativeException: org.apache.hadoop.hbase.MasterNotRunningException: null
jps下，发现主节点上HMaster没有启动，查理HBase log（logs/hbase-hadoop-master-ubuntu.log）
里有下面异常：
FATAL org.apache.hadoop.hbase.master.HMaster: Unhandled exception. Starting shutdown.
java.io.IOException: Call to node1/10.64.56.76:49002 failed on local exception: java.io.EOFException

解决：
从hadoop_home/下面cp一个hadoop/hadoop-core-0.20.203.0.jar到hbase_home/lib下。

因为Hbase建立在Hadoop之上，所以他用到了hadoop.jar,这个Jar在 lib 里面。
这个jar是hbase自己打了branch-0.20-append 补丁的hadoop.jar. 
Hadoop使用的hadoop.jar和Hbase使用的 必须 一致。所以你需要将 Hbaselib 目录下的hadoop.jar
替换成Hadoop里面的那个，防止版本冲突。比方说CDH的版本没有HDFS-724而branch-0.20-append里面有，
这个HDFS-724补丁修改了RPC协议。如果不替换，就会有版本冲突，继而造成严重的出错，
Hadoop会看起来挂了。

再用./start-hbase.sh启动HBase后，jps下，发现主节点上HMaster还是没有启动，
在HBase log里有下面异常：
FATAL org.apache.hadoop.hbase.master.HMaster: Unhandled exception. Starting shutdown.
java.lang.NoClassDefFoundError: org/apache/commons/configuration/Configuration
解决：
在NoClassDefFoundError,缺少 org/apache/commons/configuration/Configuration 
果断给他加一个commons-configuration包，
从hadoop_home/lib下面cp一个hadoop/lib/commons-configuration-1.6.jar到hbase_home/lib下。
（集群上所有机子的hbase配置都需要一样）

创建表报错：
ERROR: java.io.IOException: Table Namespace Manager not ready yet, try again later
at org.apache.hadoop.hbase.master.HMaster.getNamespaceDescriptor(HMaster.java:3101)
at org.apache.hadoop.hbase.master.HMaster.createTable(HMaster.java:1738)
at org.apache.hadoop.hbase.master.HMaster.createTable(HMaster.java:1777)
at org.apache.hadoop.hbase.protobuf.generated.MasterProtos$MasterService$2.callBlockingMethod(MasterProtos.java:38221)
at org.apache.hadoop.hbase.ipc.RpcServer.call(RpcServer.java:2146)
at org.apache.hadoop.hbase.ipc.RpcServer$Handler.run(RpcServer.java:1851)

解决：
1） 查看集群的所有机器上，

HRegionServer和HQuorumPeer进程是否都启动？
2）查看集群的所有机器的logs是不是有错误消息；

tail -f hbase-hadoop-regionserver-XXX..log 

2  注意事项：
1）、'先启动hadoop'后，'再开启hbase'
2）、'去掉hadoop的安全模式'：'hadoop dfsadmin -safemode leave'
3）、'把/etc/hosts'里的'ubuntu的IP''改为服务器当前的IP'
4) 、确认'hbase的hbase-site.xml'中
	<name>hbase.rootdir</name>
	'<value>hdfs://node：49002/hbase</value>'
	'与hadoop'的'core-site.xml'中
	<name>fs.default.name</name>
	'<value>hdfs://node：49002/hbase</value>'
	红字部分'保持一致'
	<value>hdfs://localhost:8020/hbase</value>
	否则报错：java.lang.RuntimeException: HMaster Aborted
6)、'重新执行./start-hbase.sh之前'，先'kill掉当前的hbase和zookeeper进程'
PS：遇到问题时，先查看logs，很有帮助。


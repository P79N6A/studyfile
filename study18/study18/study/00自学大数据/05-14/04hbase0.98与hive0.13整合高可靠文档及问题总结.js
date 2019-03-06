问题导读：
1.'hive'安装'是否'需'要安装mysql'？
2.'hive是否分'为'客户端'和'服务器端'？
3.'hive'的'元数据库'有'哪两种'？
4.'hive'与'hbase整合'的'关键是什么'？
5.'hive'的安装'是否必须'安'装hadoop'?
6.'hive与hbase整合'需'要做哪些准备'工作？
7.'hive''元数据库启动卡住''代表'的'含义是什么'？


网上有很多资料，看到大部分都是一致的，看到一篇国外的文章，原来都是翻译的，
并没有经过实践。这里记录一下实践的过程。
因为'derby数据库'使用的'局限性'，我们'采用mysql'作'为元数据库'。
derby存在什么缺陷
1.'derby不能''多'个'客户端登录'
2.'derby登录'必'须在相同目录下'，'否则'可能'会''找不到'所'创建的表'。
比如在/hive目录下启动hive程序，那么所创建的表就会存储在/hive下面保存。
如果在/home下面，所创建的表就会在/home下面保存。这样导致初学者摸不着头脑。
如果还不是不太明白可以，可以参考
hive使用derby作为元数据库找达到所创建表的原因
http://www.aboutyun.com/thread-7803-1-1.html
-----------
下面我们开始'安装'：
1.下载hive
链接: http://pan.baidu.com/s/1eQw0o50 密码: mgy6
2. 安装：
'tar zxvf hive-0.12.0.tar.gz' 
重命令名为：hive文件夹
达到如下效果：
  

3. '替换jar'包，与hbase0.96和hadoop2.2版本一致
由于我们下载的'hive是''基于hadoop1.3'和'hbase0.94的'，所以'必须进行替换'，
因为我们的'hbse0.96'是'基于hadoop2.2的'，所以我们必须先'解决hive的hadoop版本问题'，
目前我们从官网下载的hive都是用1.几的版本编译的，因此我们需要自己下载源码
来用hadoop2.X的版本重新编译hive，这个过程也很简单，只需要如下步骤：

（1）'进入/usr/hive/lib'
上面只是'截取'了一'部分'：

（2）'同步hbase'的版本
先cd到'hive0.12.0/lib'下，将'hive-0.12.0/lib'下'hbase-0.94'开头的那'两个jar包删掉'，
然后从/home/hadoop/'hbase-0.96.0-hadoop2/lib'下'hbase开头的包都拷贝过来'

find /usr/hbase/hbas/lib -name "hbase*.jar"|xargs -i cp {} ./

（3）基本的同步完成了
重点'检查'下'zookeeper和protobuf'的'jar包'是否和'hbase保持一致'，如果不一致，
'拷贝protobuf.**.jar'和'zookeeper-3.4.5.jar'到'hive/lib'下。

（4）用'mysql当原数据库'，
找一个'mysql的jdbcjar'包'mysql-connector-java-5.1.10-bin.jar'也'拷贝到hive-0.12.0/lib'下

可以通过下面命令来查找是否存在
find -name mysql-connector*
--------------------------------------------------------------------------
注意  mysql-connector-java-5.1.10-bin.jar
'修改权限为777' （chmod 777 mysql-connector-java-5.1.10-bin.jar）
--------------------------------------------------------------------------
还有，看一下'hbase与hive'的'通信包'是否存在：
aboutyun@master:/usr/hive/lib$ find -name hive-hbase-handler*
./hive-hbase-handler-0.13.0-SNAPSHOT.jar

4. '安装mysql'
• 'Ubuntu 采用apt-get'安装
• sudo apt-get install mysql-server
• '建立数据库hive'
• create database hivemeta
• '创建hive用户,并授权'
• grant all on hive.* to hive@'%'  identified by 'hive';  
• flush privileges;  

对于musql的安装不熟悉，可以参考：
Ubuntu下面卸载以及安装mysql
http://www.aboutyun.com/thread-7788-1-1.html
-------------------------------------------

上面命令解释一下：
• 'sudo apt-get install mysql-server安装数据服务器'，
如果'想'尝试通过其他'客户端远程'连接，则还需'要安装mysql-client'

grant all privileges on *.* to hive@"%" identified by "hive" with grant option;
flush privileges;
这个是"授权"，还是比较重要的，"否则""hive客户端""远程连接"会"失败"
里面的内容不要照抄：需要根据自己的情况来修改。上面的"用户名和密码"都"为hive"。

如果"连接不成功"尝试"使用root用户"
grant all on hive.* to 'root'@'%'identified by '123';
flush privileges;
------------------------------------------

	**********	**********	**********
4. '修改hive-site'文件配置：

下面配置需要注意的是：
（1）使用的是'mysql'的'root'用户，密码为'123'，如果你是'用的hive'，
把'用户名和密码修改为hive'即可：
  
（2）'hdfs新建文件'并'授予权限'
对于上面注意
bin/hadoop fs -mkdir     /hive/warehouse
bin/hadoop fs -mkdir      /hive/scratchdir
bin/hadoop fs -chmod g+w  /hive/warehouse
bin/hadoop fs -chmod g+w   /hive/scratchdir

（3）'hive.aux.jars.path''切忌配置正确'
'不能'有'换行'或则'空格'。特别是换行，看到很多文章都把他们给分开了，
这对很多新手是一个很容易掉进去的陷阱。
<property>
	<name>hive.aux.jars.path</name>
	<value>file:///usr/hive/lib/hive-hbase-handler-0.13.0-SNAPSHOT.jar,file:///usr/hive/lib/protobuf-java-2.5.0.jar,file:///usr/hive/lib/hbase-client-0.96.0-hadoop2.jar,file:///usr/hive/lib/hbase-common-0.96.0-hadoop2.jar,file:///usr/hive/lib/zookeeper-3.4.5.jar,file:///usr/hive/lib/guava-11.0.2.jar</value>
</property>


上面问题解决，把'下面内容''放到hive-site文件'即可
--------------------------------
这里介绍两种配置方式，一种是远程配置，一种是本地配置。'最好选择''远程配置'

'远程配置'
<configuration>
<property>
  <name>hive.metastore.warehouse.dir</name>
  <value>hdfs://master:8020/hive/warehouse</value>
</property>
<property>
  <name>hive.exec.scratchdir</name>
  <value>hdfs://master:8020/hive/scratchdir</value>
</property>
<property>
  <name>hive.querylog.location</name>
  <value>/usr/hive/logs</value>
</property>
<property>  
  <name>javax.jdo.option.ConnectionURL</name>  
  <value>jdbc:mysql://172.16.77.15:3306/hivemeta?createDatabaseIfNotExist=true</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionDriverName</name>  
  <value>com.mysql.jdbc.Driver</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionUserName</name>  
  <value>hive</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionPassword</name>  
  <value>hive</value>  
</property> 
<property>
  <name>hive.aux.jars.path</name>
  <value>file:///usr/hive/lib/hive-hbase-handler-0.13.0-SNAPSHOT.jar,file:///usr/hive/lib/protobuf-java-2.5.0.jar,file:///usr/hive/lib/hbase-client-0.96.0-hadoop2.jar,file:///usr/hive/lib/hbase-common-0.96.0-hadoop2.jar,file:///usr/hive/lib/zookeeper-3.4.5.jar,file:///usr/hive/lib/guava-11.0.2.jar</value>
</property>
<property>
  <name>hive.metastore.uris</name>  
  <value>thrift://172.16.77.15:9083</value>  
</property>  
</configuration>


本地配置：
<configuration>  
<property>  
  <name>hive.metastore.warehouse.dir</name>  
  <value>/user/hive_remote/warehouse</value>  
</property>  
<property>  
  <name>hive.metastore.local</name>  
  <value>true</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionURL</name>  
  <value>jdbc:mysql://localhost/hive_remote?createDatabaseIfNotExist=true</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionDriverName</name>  
  <value>com.mysql.jdbc.Driver</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionUserName</name>  
  <value>root</value>  
</property>  
<property>  
  <name>javax.jdo.option.ConnectionPassword</name>  
  <value>123</value>  
</property>  
</configuration>  
-------------------------------------------------------------------------------------

5. 修改'其它配置'：
1.修改'hadoop的hadoop-env.sh'('否则启动hive'汇'报找不到类'的'错误')

2.修改'$HIVE_HOME/bin'的'hive-config.sh'，增'加'以下'三行'

然后我们首'先启动元数据库'
hive  --service metastore -hiveconf hive.root.logger=DEBUG,console  

记得这里它会卡住不动，不用担心，这里已经启动成功。


然后我们'在启动客户端'
hive

这样'hive就安装成功'了


首先说一些遇到的各种问题
1.遇到的问题

问题1：'元数据库''未启动'
这里首先概括一下，会遇到的问题。首先需要启动元数据库，通过下面命令：
（1）hive --service metastore
（2）hive --service metastore -hiveconf hive.root.logger=DEBUG,console  
注释：
-hiveconf hive.root.logger=DEBUG,console命令的含义是进入debug模式，便于寻找错误
如果不启用元数据库，而是使用下面命令
hive
你会遇到下面错误
Exception in thread "main" java.lang.RuntimeException: java.lang.RuntimeException: Unable to instantiate org.apache.hadoop.hive.metastore.'HiveMetaStoreClient'
        at org.apache.hadoop.hive.ql.session.SessionState.start(SessionState.java:295)
        at org.apache.hadoop.hive.cli.CliDriver.run(CliDriver.java:679)
        at org.apache.hadoop.hive.cli.CliDriver.main(CliDriver.java:623)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:606)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:212)
Caused by: java.lang.RuntimeException: Unable to instantiate org.apache.hadoop.hive.metastore.HiveMetaStoreClient
        at org.apache.hadoop.hive.metastore.MetaStoreUtils.newInstance(MetaStoreUtils.java:1345)
        at org.apache.hadoop.hive.metastore.RetryingMetaStoreClient.<init>(RetryingMetaStoreClient.java:62)
        at org.apache.hadoop.hive.metastore.RetryingMetaStoreClient.getProxy(RetryingMetaStoreClient.java:72)
        at org.apache.hadoop.hive.ql.metadata.Hive.createMetaStoreClient(Hive.java:2420)
        at org.apache.hadoop.hive.ql.metadata.Hive.getMSC(Hive.java:2432)
        at org.apache.hadoop.hive.ql.session.SessionState.start(SessionState.java:289)
        ... 7 more
Caused by: java.lang.reflect.InvocationTargetException
        at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
        at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)
        at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
        at java.lang.reflect.Constructor.newInstance(Constructor.java:526)
        at org.apache.hadoop.hive.metastore.MetaStoreUtils.newInstance(MetaStoreUtils.java:1343)
        ... 12 more
Caused by: MetaException(message:Could not connect to meta store using any of the URIs provided. Most recent failure: org.apache.thrift.transport.TTransportException: 


java.net.ConnectException: Connection refused
        at org.apache.thrift.transport.TSocket.open(TSocket.java:185)
        at org.apache.hadoop.hive.metastore.HiveMetaStoreClient.open(HiveMetaStoreClient.java:288)
        at org.apache.hadoop.hive.metastore.HiveMetaStoreClient.<init>(HiveMetaStoreClient.java:169)
        at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
        at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)
        at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
        at java.lang.reflect.Constructor.newInstance(Constructor.java:526)
        at org.apache.hadoop.hive.metastore.MetaStoreUtils.newInstance(MetaStoreUtils.java:1343)
        at org.apache.hadoop.hive.metastore.RetryingMetaStoreClient.<init>(RetryingMetaStoreClient.java:62)
        at org.apache.hadoop.hive.metastore.RetryingMetaStoreClient.getProxy(RetryingMetaStoreClient.java:72)
        at org.apache.hadoop.hive.ql.metadata.Hive.createMetaStoreClient(Hive.java:2420)
        at org.apache.hadoop.hive.ql.metadata.Hive.getMSC(Hive.java:2432)
        at org.apache.hadoop.hive.ql.session.SessionState.start(SessionState.java:289)
        at org.apache.hadoop.hive.cli.CliDriver.run(CliDriver.java:679)
        at org.apache.hadoop.hive.cli.CliDriver.main(CliDriver.java:623)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:606)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:212)
Caused by: java.net.ConnectException: Connection refused
        at java.net.PlainSocketImpl.socketConnect(Native Method)
        at java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:339)
        at java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:200)
        at java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:182)
        at java.net.SocksSocketImpl.connect(SocksSocketImpl.java:392)
        at java.net.Socket.connect(Socket.java:579)
        at org.apache.thrift.transport.TSocket.open(TSocket.java:180)
        ... 19 more
)
        at org.apache.hadoop.hive.metastore.HiveMetaStoreClient.open(HiveMetaStoreClient.java:334)
        at org.apache.hadoop.hive.metastore.HiveMetaStoreClient.<init>(HiveMetaStoreClient.java:169)
        ... 17 more


问题2：'元数据库''启动状态'是'什么样子'的
hive --service metastore
Starting Hive Metastore Server
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.input.dir.recursive is deprecated. Instead, use mapreduce.input.fileinputformat.input.dir.recursive
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.max.split.size is deprecated. Instead, use mapreduce.input.fileinputformat.split.maxsize
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.min.split.size is deprecated. Instead, use mapreduce.input.fileinputformat.split.minsize
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.min.split.size.per.rack is deprecated. Instead, use mapreduce.input.fileinputformat.split.minsize.per.rack
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.min.split.size.per.node is deprecated. Instead, use mapreduce.input.fileinputformat.split.minsize.per.node
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.reduce.tasks is deprecated. Instead, use mapreduce.job.reduces
14/05/27 20:14:51 INFO Configuration.deprecation: mapred.reduce.tasks.speculative.execution is deprecated. Instead, use mapreduce.reduce.speculative
刚'开始遇到这种情况'，我知道是'因为'可能'没有配置正确'，这个'耗费'了'很长时间'，
一直'没'有'找到正确'的'解决方案'。当再次执行


'hive --service metastore'
命令的时候'报4083端口''被暂用'： 报错如下'红字部分'。表示'9083端口'已经'被暂用'，
也就是说'客户端'已经'和主机''进行了通信'，当我在进行'输入hive命令'的时候，'进入 hive>'

Could not create ServerSocket on address 0.0.0.0/0.0.0.0:9083.
        at org.apache.thrift.transport.TServerSocket.<init>(TServerSocket.java:93)
        at org.apache.thrift.transport.TServerSocket.<init>(TServerSocket.java:75)
        at org.apache.hadoop.hive.metastore.TServerSocketKeepAlive.<init>(TServerSocketKeepAlive.java:34)
        at org.apache.hadoop.hive.metastore.HiveMetaStore.startMetaStore(HiveMetaStore.java:4291)
        at org.apache.hadoop.hive.metastore.HiveMetaStore.main(HiveMetaStore.java:4248)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:606)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:212)
Exception in thread "main" org.apache.thrift.transport.TTransportException: Could not create ServerSocket on address 0.0.0.0/0.0.0.0:9083.
        at org.apache.thrift.transport.TServerSocket.<init>(TServerSocket.java:93)
        at org.apache.thrift.transport.TServerSocket.<init>(TServerSocket.java:75)
        at org.apache.hadoop.hive.metastore.TServerSocketKeepAlive.<init>(TServerSocketKeepAlive.java:34)
        at org.apache.hadoop.hive.metastore.HiveMetaStore.startMetaStore(HiveMetaStore.java:4291)
        at org.apache.hadoop.hive.metastore.HiveMetaStore.main(HiveMetaStore.java:4248)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:606)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:212)
'对于端口'的'暂用'，'可'以采'用'下面'命令''杀掉进程'
'netstat -ap|grep 4083'

上面主要的'作用'是'查出暂用端口'的'进程id'，然后使'用下面命令''杀掉进程'即可
'kill -9 进程号'


问题3：'hive.aux.jars.path''配置'中'含有'看'换行'或则'空格'，报错如下
错误表现1：/usr/hive/lib/hbase-client-0.96.0-
hadoop2.jar
整个路径错位，导致系统不能识别，这个错位，其实就是换行。
FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.mr.MapRedTask
java.io.FileNotFoundException: File does not exist: hdfs://hydra0001/opt/module/hive-0.10.0-cdh4.3.0/lib/hive-builtins-0.10.0-cdh4.3.0.jar
2014-05-24 19:32:06,563 ERROR exec.Task (SessionState.java:printError(440)) - Job Submission failed with exception 'java.io.FileNotFoundException(File file:/usr/hive/lib/hbase-client-0.96.0-
hadoop2.jar does not exist)'
java.io.FileNotFoundException: File file:/usr/hive/lib/hbase-client-0.96.0-
hadoop2.jar does not exist
        at org.apache.hadoop.fs.RawLocalFileSystem.getFileStatus(RawLocalFileSystem.java:520)
        at org.apache.hadoop.fs.FilterFileSystem.getFileStatus(FilterFileSystem.java:398)
        at org.apache.hadoop.fs.FileUtil.copy(FileUtil.java:337)
        at org.apache.hadoop.fs.FileUtil.copy(FileUtil.java:289)
        at org.apache.hadoop.mapreduce.JobSubmitter.copyRemoteFiles(JobSubmitter.java:139)
        at org.apache.hadoop.mapreduce.JobSubmitter.copyAndConfigureFiles(JobSubmitter.java:212)
        at org.apache.hadoop.mapreduce.JobSubmitter.copyAndConfigureFiles(JobSubmitter.java:300)
        at org.apache.hadoop.mapreduce.JobSubmitter.submitJobInternal(JobSubmitter.java:387)
        at org.apache.hadoop.mapreduce.Job$10.run(Job.java:1268)
        at org.apache.hadoop.mapreduce.Job$10.run(Job.java:1265)
        at java.security.AccessController.doPrivileged(Native Method)
        at javax.security.auth.Subject.doAs(Subject.java:415)
        at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1491)
        at org.apache.hadoop.mapreduce.Job.submit(Job.java:1265)
        at org.apache.hadoop.mapred.JobClient$1.run(JobClient.java:562)
        at org.apache.hadoop.mapred.JobClient$1.run(JobClient.java:557)
        at java.security.AccessController.doPrivileged(Native Method)
        at javax.security.auth.Subject.doAs(Subject.java:415)
        at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1491)
        at org.apache.hadoop.mapred.JobClient.submitJobInternal(JobClient.java:557)
        at org.apache.hadoop.mapred.JobClient.submitJob(JobClient.java:548)
        at org.apache.hadoop.hive.ql.exec.mr.ExecDriver.execute(ExecDriver.java:424)
        at org.apache.hadoop.hive.ql.exec.mr.MapRedTask.execute(MapRedTask.java:136)
        at org.apache.hadoop.hive.ql.exec.Task.executeTask(Task.java:152)
        at org.apache.hadoop.hive.ql.exec.TaskRunner.runSequential(TaskRunner.java:65)
        at org.apache.hadoop.hive.ql.Driver.launchTask(Driver.java:1481)
        at org.apache.hadoop.hive.ql.Driver.execute(Driver.java:1258)
        at org.apache.hadoop.hive.ql.Driver.runInternal(Driver.java:1092)
        at org.apache.hadoop.hive.ql.Driver.run(Driver.java:932)
        at org.apache.hadoop.hive.ql.Driver.run(Driver.java:922)
        at org.apache.hadoop.hive.cli.CliDriver.processLocalCmd(CliDriver.java:268)
        at org.apache.hadoop.hive.cli.CliDriver.processCmd(CliDriver.java:220)
        at org.apache.hadoop.hive.cli.CliDriver.processLine(CliDriver.java:422)
        at org.apache.hadoop.hive.cli.CliDriver.executeDriver(CliDriver.java:790)
        at org.apache.hadoop.hive.cli.CliDriver.run(CliDriver.java:684)
        at org.apache.hadoop.hive.cli.CliDriver.main(CliDriver.java:623)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:606)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:212)


2014-05-24 19:32:06,571 ERROR ql.Driver (SessionState.java:printError(440)) - FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.mr.MapRedTask

错误表现2：
<property>
  <name>hive.aux.jars.path</name>
  <value>
file:///usr/hive/lib/hive-hbase-handler-0.13.0-SNAPSHOT.jar,
file:///usr/hive/lib/protobuf-java-2.5.0.jar,
file:///usr/hive/lib/hbase-client-0.96.0-hadoop2.jar,
file:///usr/hive/lib/hbase-common-0.96.0-hadoop2.jar,
file:///usr/hive/lib/zookeeper-3.4.5.jar,
file:///usr/hive/lib/guava-11.0.2.jar</value>
</property>
<property>
上面看那上去很整洁，但是如果直接复制到配置文件中，就会产生下面错误。
Caused by: java.net.URISyntaxException: Illegal character in scheme name at index 0: 
file:///usr/hive/lib/protobuf-java-2.5.0.jar
        at java.net.URI$Parser.fail(URI.java:2829)
        at java.net.URI$Parser.checkChars(URI.java:3002)
        at java.net.URI$Parser.checkChar(URI.java:3012)
        at java.net.URI$Parser.parse(URI.java:3028)
        at java.net.URI.<init>(URI.java:753)
        at org.apache.hadoop.fs.Path.initialize(Path.java:203)
        ... 37 more
Job Submission failed with exception 'java.lang.IllegalArgumentException(java.net.URISyntaxException: Illegal character in scheme name at index 0: 
file:///usr/hive/lib/protobuf-java-2.5.0.jar)'
FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.mr.MapRedTask


'验证hive与hbase的整合：'
"一、"'启动hbase与hive'
'启动hbase'
'hbase shell'

'启动hive'
(1)'启动元数据库' hive --service metastore
CREATE TABLE hbase_table_1(key int, value string) STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler' WITH SERDEPROPERTIES ("hbase.columns.mapping" = ":key,cf1:val") TBLPROPERTIES ("hbase.table.name" = "xyz");
'上面'的含义'是在hive'中'建表hbase_table_1'，
'通过'org.apache.hadoop.hive.hbase.HBaseStorageHandler'这个类'映射'，
'在hbase''建立'与之'对应的xyz表'。
（1）'执行'这个语句之'前'：
首先'查看hbase'与'hive：'
'hbase为空：'
'hive为空'
（2）执行
CREATE TABLE hbase_table_1(key int, value string) STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler' WITH SERDEPROPERTIES ("hbase.columns.mapping" = ":key,cf1:val") TBLPROPERTIES ("hbase.table.name" = "xyz");
（3）对比发生变化
'hbase'显示'新建表xyz'
'hive'显示'新建表hbase_table_1'


"三、"'验证整合'，'在hbase插入表'
（1）'通过hbase''添加数据'
在hbase中'插入一条记录'：
put 'xyz','10001','cf1:val','www.aboutyun.com'

分别"查看hbase与hive"表发生的"变化"：
 ①"hbase变化"
 ②"hive变化"

（2）"通过hive添加数据"
'对'于网上流行的'通过pokes表'，'插入'这里'没有'执行'成功'，通过网上查询，
'可能是'hive0.12的一个'bug'.详细可以查看：
INSERT OVERWRITE TABLE hbase_table_1 SELECT * FROM pokes;
Total MapReduce jobs = 1
Launching Job 1 out of 1
Number of reduce tasks is set to 0 since there's no reduce operator
java.lang.IllegalArgumentException: Property value must not be null
at com.google.common.base.Preconditions.checkArgument(Preconditions.java:88)
at org.apache.hadoop.conf.Configuration.set(Configuration.java:810)
at org.apache.hadoop.conf.Configuration.set(Configuration.java:792)
at org.apache.hadoop.hive.ql.exec.Utilities.copyTableJobPropertiesToConf(Utilities.java:1996)
at org.apache.hadoop.hive.ql.exec.FileSinkOperator.checkOutputSpecs(FileSinkOperator.java:864)
at org.apache.hadoop.hive.ql.io.HiveOutputFormatImpl.checkOutputSpecs(HiveOutputFormatImpl.java:67)
at org.apache.hadoop.mapreduce.JobSubmitter.checkSpecs(JobSubmitter.java:458)
at org.apache.hadoop.mapreduce.JobSubmitter.submitJobInternal(JobSubmitter.java:342)
at org.apache.hadoop.mapreduce.Job$10.run(Job.java:1268)
at org.apache.hadoop.mapreduce.Job$10.run(Job.java:1265)
at java.security.AccessController.doPrivileged(Native Method)
at javax.security.auth.Subject.doAs(Subject.java:415)
at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1491)
at org.apache.hadoop.mapreduce.Job.submit(Job.java:1265)
at org.apache.hadoop.mapred.JobClient$1.run(JobClient.java:562)
at org.apache.hadoop.mapred.JobClient$1.run(JobClient.java:557)
at java.security.AccessController.doPrivileged(Native Method)
at javax.security.auth.Subject.doAs(Subject.java:415)
at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1491)
at org.apache.hadoop.mapred.JobClient.submitJobInternal(JobClient.java:557)
at org.apache.hadoop.mapred.JobClient.submitJob(JobClient.java:548)
at org.apache.hadoop.hive.ql.exec.mr.ExecDriver.execute(ExecDriver.java:424)
at org.apache.hadoop.hive.ql.exec.mr.MapRedTask.execute(MapRedTask.java:136)
at org.apache.hadoop.hive.ql.exec.Task.executeTask(Task.java:152)
at org.apache.hadoop.hive.ql.exec.TaskRunner.runSequential(TaskRunner.java:65)
at org.apache.hadoop.hive.ql.Driver.launchTask(Driver.java:1481)
at org.apache.hadoop.hive.ql.Driver.execute(Driver.java:1258)
at org.apache.hadoop.hive.ql.Driver.runInternal(Driver.java:1092)
at org.apache.hadoop.hive.ql.Driver.run(Driver.java:932)
at org.apache.hadoop.hive.ql.Driver.run(Driver.java:922)
at org.apache.hadoop.hive.cli.CliDriver.processLocalCmd(CliDriver.java:268)
at org.apache.hadoop.hive.cli.CliDriver.processCmd(CliDriver.java:220)
at org.apache.hadoop.hive.cli.CliDriver.processLine(CliDriver.java:422)
at org.apache.hadoop.hive.cli.CliDriver.executeDriver(CliDriver.java:790)
at org.apache.hadoop.hive.cli.CliDriver.run(CliDriver.java:684)
at org.apache.hadoop.hive.cli.CliDriver.main(CliDriver.java:623)
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke(Method.java:606)
at org.apache.hadoop.util.RunJar.main(RunJar.java:212)
Job Submission failed with exception 'java.lang.IllegalArgumentException(Property value must not be null)'
FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.mr.MapRedTask
网上找了很多资料，这个可能是一个bug，在hive0.13.0已经修复。
详细见：
https://issues.apache.org/jira/browse/HIVE-5515
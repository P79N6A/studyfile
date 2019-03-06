版本号：CentOS7  Zookeeper3.4.10   JDK1.8
	说明：在'每个机器'上'安装zookeeper'，然后在稍微'修改'一下'配置'，就'构成了集群'，
单机安装zookeeper并且设置为开机启动请参考该博文
	http://blog.csdn.net/pucao_cug/article/details/71240246

1对Zookeeper'集群'进行'配置'
	在hserver1、hserver2、hserver3这3太机器上都安装了zookeeper后
(开机启动不是必须的)，按照下面的步骤操作即可。

1.1'创建'对应的'目录和文件'
1.1.1创建'目录'
	在hserver1、hserver2、hserver3这3台机器上'执行命令创建两个目录'：
'mkdir	/opt/zookeeper/data'
'mkdir	/opt/zookeeper/dataLog'

	创建完成

1.1.2 '创建myid文件'
	在'hserver1、hserver2、hserver3'这'3台机'器的'/opt/zookeeper/data目录'
内都'创建一个名为myid'的'文件'

	将'hserver1机'器上的/opt/zookeeper/data/'myid文件'的'内容'编辑'为1'

	将'hserver2机'器上的/opt/zookeeper/data/'myid文件'的'内容'编辑'为2'

	将'hserver3机'器上的/opt/zookeeper/data/'myid文件'的'内容'编辑'为3'

	说明：上面'新'建的'目录''可'以'不'和我'一样'，'myid'中的数字'编号'也'可以不一样'，
'只要'和下面1.2中的'zoo.cfg'的'配置对应''即可'，但是建成一样也无妨。

1.2'修改'配置文件'zoo.cfg'
	把集群内的'zookeeper'的'zoo.cfg'配置'文件'都'修改成一样'的内容，主要是'在末尾'增
加'配置'：

	dataDir=/opt/zookeeper/data  
	dataLogDir=/opt/zookeeper/dataLog  
	server.1=hserver1:2888:3888  
	server.2=hserver2:2888:3888  
	server.3=hserver3:2888:3888  

	我自己的'zoo.cfg'文件'内容'是：

# The number ofmilliseconds of each tick  
tickTime=2000  
# The number ofticks that the initial  
#synchronization phase can take  
initLimit=10  
# The number ofticks that can pass between  
# sending arequest and getting an acknowledgement  
syncLimit=5  
# the directorywhere the snapshot is stored.  
# do not use /tmpfor storage, /tmp here is just  
# example sakes.  
dataDir=/tmp/zookeeper  
# the port atwhich the clients will connect  
clientPort=2181  
# the maximumnumber of client connections.  
# increase thisif you need to handle more clients  
#maxClientCnxns=60  
#  
# Be sure toread the maintenance section of the  
# administratorguide before turning on autopurge.  
#  
#http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance  
#  
# The number ofsnapshots to retain in dataDir  
#autopurge.snapRetainCount=3  
# Purge taskinterval in hours  
# Set to"0" to disable auto purge feature  
#autopurge.purgeInterval=1  
   
dataDir=/opt/zookeeper/data  
dataLogDir=/opt/zookeeper/dataLog  
server.1=hserver1:2888:3888  
server.2=hserver2:2888:3888  
server.3=hserver3:2888:3888  

	说明：'dataDir'和'dataLogDir'需要'自己创建'，'目录'可以'自己制定'，'对应即可'。
'server.1'中的这个'1需要和hserver1'这个机器上'的dataDir'目录中的'myid文件'中的'数值对应'。
'server.2'中的这个'2需要和hserver2'这个机器上'的dataDir'目录中的'myid文件'中的'数值对应'。
'server.3'中的这个'3需要和hserver3'这个机器上'的dataDir'目录中的'myid文件'中的'数值对应'。
当然，数值你可以随便用，只要对应即可。2888和3888的端口号也可以随
便用，因为在不同机器上，用成一样也无所谓。

2  '启动'和'测试集群'
2.1  '启动zookeeper集群'
	如果想要开机启动，请参考该博文http://blog.csdn.net/pucao_cug/article/details/71240246
	第三章的内容( 集群中每台机器都设置为开机启动，那么也就相当于是开机启动了)。   

下面的步骤是'手动启动zookeeper'的步骤。
	'分别'在3台机器上'执行下面'的'命令'，启动机器上安装的
'zookeeper，hserver1、hserver2、hserver3'的启动'顺序无关紧要'，
也没必要说一台启动完成后在去启动另外一台，随意就行，没有关系的。
	执行启动的命令是：
    '/opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh start'
    
2.2 '测试'
	'查看zookeeper集群'中的'zookeeper节点'的'状态'，会发现其中'一个是leader'，
'其余是follower'。分别在'3台机器'上执行命令'查看zookkeeper状态'。按下面步骤操作：

在'hserver1上执行命令'：
	'/opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh  status'
文本是：
[root@hserver1 ~]#/opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh status  
ZooKeeper JMX enabled by default  
Using config:/opt/zookeeper/zookeeper-3.4.10/bin/../conf/zoo.cfg  
Mode: follower  
[root@hserver1 ~]#  

在'hserver2上执行命令'：
      /opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh status
文本是：
[root@hserver2 ~]#/opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh status  
ZooKeeper JMX enabled by default  
Using config:/opt/zookeeper/zookeeper-3.4.10/bin/../conf/zoo.cfg  
Mode: leader  
[root@hserver2 ~]#  

在'hserver3上执行命令'：
   /opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh     status
文本是：
  [root@hserver3~]# /opt/zookeeper/zookeeper-3.4.10/bin/zkServer.sh status  
ZooKeeper JMX enabled by default  
Using config:/opt/zookeeper/zookeeper-3.4.10/bin/../conf/zoo.cfg  
Mode: follower  
[root@hserver3 ~]#  
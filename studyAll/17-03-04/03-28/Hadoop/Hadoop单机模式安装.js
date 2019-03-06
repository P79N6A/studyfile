Hadoop单机模式安装
一、实验介绍

1.1 实验内容
hadoop'三种安装模式'介绍
hadoop'单机模式'安装
测试安装

1.2 实验知识点
下载解压/环境变量配置
Linux/shell
测试WordCount程序

1.3 实验环境
hadoop2.6.0
Xfce终端

1.4 适合人群
本课程难度为一般，属于初级级别课程，适合具有linux基础的用户。

二、Hadoop启动模式
Hadoop集群有三种启动模式：
'单机模式'：'默认'情况下运行'为一个单独机器上的独立Java进程，主要用于调试环境
'伪分布模式'：'在单个机器上''模拟'成'分布式多节点环境'，'每一个'Hadoop'守护进程'都'作为'一个'独立的Java进程'运行
'完全分布式模式'：真实的'生产环境'，搭建'在完全分布式'的'集群环境'

三、用户及用户组
需要先添加用来运行Hadoop进程的用户组hadoop及用户hadoop。

3.1 添加用户及用户组
创建用户hadoop

$ sudo adduser hadoop
并按照提示输入hadoop用户的密码，例如密码设定为 hadoop。注意输入密码的时候是不显示的。

3.2 添加sudo权限
将hadoop用户添加进sudo用户组
$ sudo usermod -G sudo hadoop

四、'安装及配置'依赖的'软件包'
4.1 '安装openssh-server、java、rsync'等

'$ sudo apt-get update'
'$ sudo apt-get install openssh-server rsync'
'$ sudo service ssh restart'
'$ sudo apt-get install openjdk-7-jdk'
'$ java -version'

4.2 '配置ssh免密码登录'
切换到'hadoop用户'，需要输入添加hadoop用户时配置的密码。后续步骤都将在hadoop用户的环境中执行。
'$ su -l hadoop'

'配置ssh环境免密码登录'。
'在/hone/hadoop目录下执行'
'$ ssh-keygen -t rsa   #一路回车'
'$ cat .ssh/id_rsa.pub >> .ssh/authorized_keys'
'$ chmod 600 .ssh/authorized_keys'

验证登录本机是否还需要密码，第一次需要密码以后不需要密码就可以登录。
$ ssh localhost

五、下载并安装Hadoop
在hadoop用户登录的环境中进行下列操作：

5.1 '下载Hadoop 2.6.0'
'$  su hadoop'
'$  hadoop'
'$  sudo wget http://labfile.oss.aliyuncs.com/hadoop-2.6.0.tar.gz'
	
5.2 '解压并安装'
'$ sudo tar zxvf hadoop-2.6.0.tar.gz'
'$ sudo mv hadoop-2.6.0 /usr/local/hadoop'
'$ sudo chmod 777 /usr/local/hadoop'

5.3 '配置Hadoop'
'$ vim /home/hadoop/.bashrc'
'在/home/hadoop/.bashrc文件末尾添加下列内容：'
#HADOOP START
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
export HADOOP_INSTALL=/usr/local/hadoop
export PATH=$PATH:$HADOOP_INSTALL/bin
export PATH=$PATH:$HADOOP_INSTALL/sbin
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"
#HADOOP END
保存退出后，激活新加的环境变量
$ source ~/.bashrc

至此，Hadoop单机模式安装完成，可以通过下述步骤的测试来验证安装是否成功。

六、测试验证

创建输入的数据，暂时采用/etc/protocols文件作为测试

$ cd /usr/local/hadoop
$ sudo mkdir input
$ sudo cp /etc/protocols ./input
执行Hadoop WordCount应用（词频统计）

$ bin/hadoop jar share/hadoop/mapreduce/sources/hadoop-mapreduce-examples-2.6.0-sources.jar org.apache.hadoop.examples.WordCount input output
查看生成的单词统计数据

//	$ cat output/* 
注意：如果要继续下一节“伪分布式部署”实验，请勿停止本实验环境，直接点击文档上方的“下一个实验”按钮进入，因为伪分布式部署模式需要在单机模式基础上进行配置。

七、小结

本实验中介绍了Hadoop单机模式的安装方法，并运行wordcount进行基本测试。

八、课后作业

请使用hadoop的wordcount对日志文件/var/log/dpkg.log进行词频统计。

实验中有任何问题欢迎到实验楼问答提问。

九、参考文档

本实验参考下列文档内容制作：

http://hadoop.apache.org/docs/r2.6.0/hadoop-project-dist/hadoop-common/SingleCluster.html
http://www.cnblogs.com/kinglau/p/3794433.html
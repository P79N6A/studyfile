$ sudo adduser hadoop $ sudo usermod -G sudo hadoop $ sudo apt-get update $ sudo apt-get install openssh-server rsync $ sudo service ssh restart $ sudo apt-get install openjdk-7-jdk $ java -version 添加所有的用户权限以及安装软件

切换到hadoop用户，需要输入添加hadoop用户时配置的密码。后续步骤都将在hadoop用户的环境中执行。

$ su -l hadoop 配置ssh环境免密码登录。

$ ssh-keygen -t rsa -P "" 在/home/hadoop/.ssh目录下生成了id_rsa（私钥）和id_rsa.pub（公钥）两个文件,将公钥追加到authorized_keys中，该文件保存所有允许以当前用户身份登录到ssh客户端用户的公钥内容。

$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys 验证登录本机是否还需要密码，配置正确的话是可以不需密码登录的。

$ ssh localhost

下载Hadoop 2.6.0
$ wget http://labfile.oss.aliyuncs.com/hadoop-2.6.0.tar.gz

解压并安装
$ tar zxvf hadoop-2.6.0.tar.gz $ sudo mv hadoop-2.6.0 /usr/local/hadoop $ sudo chmod 774 /usr/local/hadoop

配置Hadoop
$ vim /home/hadoop/.bashrc 布置环境变量

在/home/hadoop/.bashrc文件末尾添加下列内容：

HADOOP START

export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64 export HADOOP_INSTALL=/usr/local/hadoop export PATH=$PATH:$HADOOP_INSTALL/bin export PATH=$PATH:$HADOOP_INSTALL/sbin export HADOOP_MAPRED_HOME=$HADOOP_INSTALL export HADOOP_COMMON_HOME=$HADOOP_INSTALL export HADOOP_HDFS_HOME=$HADOOP_INSTALL export YARN_HOME=$HADOOP_INSTALL export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"

HADOOP END

保存退出后，激活新加的环境变量

$ source ~/.bashrc

-----------------------------------------------------------------------------以上是单机Hadoop环境配置------------------------------------

1).修改core-site.xml:

$ sudo gvim /usr/local/hadoop/etc/hadoop/core-site.xml <?xml version="1.0"?> <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

fs.default.name hdfs://localhost:9000 hadoop.tmp.dir /home/hadoop/tmp
2).修改hdfs-site.xml:

$ sudo gvim /usr/local/hadoop/etc/hadoop/hdfs-site.xml <?xml version="1.0"?> <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

dfs.replication 1 3).修改mapred-site.xml: $ sudo cp /usr/local/hadoop/etc/hadoop/mapred-site.xml.template /usr/local/hadoop/etc/hadoop/mapred-site.xml $ sudo gvim /usr/local/hadoop/etc/hadoop/mapred-site.xml mapreduce.framework.name yarn
4).修改yarn-site.xml:

yarn.nodemanager.aux-services mapreduce_shuffle yarn.nodemanager.aux-services.mapreduce.shuffle.class org.apache.hadoop.mapred.ShuffleHandler
5). 修改 hadoop-env.sh:

$ sudo vim /usr/local/hadoop/etc/hadoop/hadoop-env.sh

1.先切换到hadoop账户，按照提示输入账户密码

$ su hadoop 2.格式化HDFS文件系统

$ hadoop namenode -format

1.启动hdfs守护进程，分别启动NameNode和DataNode

$ hadoop-daemon.sh start namenode $ hadoop-daemon.sh start datanode 或者一次启动

$ start-dfs.sh

$ yarn-daemon.sh start resourcemanager $ yarn-daemon.sh start nodemanager 或者一次启动：

$ start-yarn.sh

$ hadoop dfs -mkdir /user $ hadoop dfs -mkdir /user/hadoop $ hadoop dfs -mkdir /user/hadoop/input 1.创建输入的数据，采用/etc/protocols文件作为测试

先将文件拷贝到 hdfs 上：

$ hadoop dfs -put /etc/protocols /user/hadoop/input

2.执行Hadoop WordCount应用（词频统计）

如果存在上一次测试生成的output，由于hadoop的安全机制，直接运行可能会报错，所以请手动删除上一次生成的output文件夹

$ bin/hadoop jar share/hadoop/mapreduce/sources/hadoop-mapreduce-examples-2.6.0-sources.jar org.apache.hadoop.examples.WordCount input output

3.查看生成的单词统计数据

$ hadoop dfs -cat /user/hadoop/output/*

七、关闭服务

输入命令

$ hadoop-daemon.sh stop namenode $ hadoop-daemon.sh stop datanode $ yarn-daemon.sh stop resourcemanager $ yarn-daemon.sh stop nodemanager 或者

$ stop-dfs.sh $ stop-yarn.sh

hdfs系统中的文件和本机文件如何联系。并不清楚。为何能相互读取呢？
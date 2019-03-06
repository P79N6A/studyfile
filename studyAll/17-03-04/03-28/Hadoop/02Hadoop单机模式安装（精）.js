Hadoop启动模式：

'单机模式'：默认情况下运行为'一个单独机器上'的'独立Java进程'，主要'用于调试环境'
'伪分布模式'：默认情况下运行为'一个单独机器上'的'独立Java进程'，主要用于'调试环境'
'完全分布式模式'：真实的生产环境，搭建在完全分布式的集群环境

单机模式下安装及测试
'添加hadoop用户'，并为其'添加sudo权限'
sudo adduser hadoop
sudo usermod -G sudo hadoop
'安装及配置依赖的软件包'
sudo apt-get update
sudo apt-get install openssh-server rsync
sudo service ssh restart
sudo apt-get install openjdk-7-jdk
java -version
'切换至hadoop用户, 配置ssh免密码登录'
su -l hadoop
ssh-keygen -t rsa
cat .ssh/id_rsa.pub >> .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
ssh localhost(验证)
'下载，安装hadoop'
sudo wget http://labfile.oss.aliyuncs.com/hadoop-2.6.0.tar.gz
sudo tar zxvf hadoop-2.6.0.tar.gz
sudo mv hadoop-2.6.0 /usr/local/hadoop
sudo chmod 777 /usr/local/hadoop
'配置hadoop'
vim /home/hadoop/.bashrc
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
'保存退出，激活新的环境'
source ~/.bashrc
'验证wc例子'
cd /usr/local/hadoop
sudo mkdir input
sudo cp /etc/protocols ./input
bin/hadoop jar share/hadoop/mapreduce/sources/hadoop-mapreduce-examples-2.6.0-sources.jar org.apache.hadoop.examples.WordCount input output
cat output/*
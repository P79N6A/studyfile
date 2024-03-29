2 Pig介绍
Pig是yahoo捐献给apache的一个项目，'使用SQL-like语言'，是'在MapReduce上构建的一种高级查询语言'，'把一些运算编译进MapReduce模型的Map和Reduce中'。
Pig 有'两种运行模式'： 'Local 模式'和 'MapReduce 模式'

'本地模式'：'Pig运行于本地模式'，只涉及到'单独的一台计算机'
'MapReduce模式'：'Pig运行于MapReduce模式'，需要'能访问一个Hadoop集群'，并且'需要装上HDFS'

Pig的调用方式：
'Grunt shell'方式：通过'交互的方式'，'输入命令执行任务'；
'Pig script'方式：通过'script脚本'的方式来'运行任务'；
'嵌入式方式'：'嵌入java源代码'中，'通过java调用来运行任务'。

3 搭建Pig环境
3.1 下载并解压安装包
在Apache下载最新的Pig软件包，点击下载会推荐最快的镜像站点，以下为下载地址：

http://mirrors.aliyun.com/apache/pig/

也可以在/home/shiyanlou/install-pack目录中找到该安装包，解压该安装包并把该安装包复制到/app目录中

cd /home/shiyanlou/install-pack
tar -xzf pig-0.13.0.tar.gz
mv pig-0.13.0 /app


3.2 设置环境变量
使用如下命令'编辑/etc/profile文件'：

sudo vi /etc/profile
此处输入图片的描述

设置pig的class路径和在path加入pig的路径，其中PIG_CLASSPATH参数是设置pig在MapReduce工作模式：

'export PIG_HOME=/app/pig-0.13.0'
'export PIG_CLASSPATH=/app/hadoop-1.1.2/conf'
'export PATH=$PATH:$PIG_HOME/bin'

'编译配置文件/etc/profile，并确认生效'

'source /etc/profile'
'echo $PATH'

3.3 验证安装完成
'重新登录终端'，确保'hadoop集群启动'，'键入pig命令'，应该能看到pig连接到hadoop集群的信息并且进入了grunt shell命令行模式：


4 测试例子

4.1 测试例子内容

在/home/shiyanlou/install-pack/class7中有website_log.zip测试数据文件，该文件是某网站访问日志，
请大家使用pig计算出每个ip的点击次数，例如 123.24.56.57 13 24.53.23.123 7 34.56.78.120 20 .... 等等

4.2 程序代码
//加载HDFS中访问日志，使用空格进行分割，只加载ip列
records = LOAD 'hdfs://hadoop:9000/class7/input/website_log.txt' USING PigStorage(' ') AS (ip:chararray);

//按照ip进行分组，统计每个ip点击数
records_b = GROUP records BY ip;
records_c = FOREACH records_b GENERATE group,COUNT(records) AS click;

//按照点击数排序，保留点击数前10个的ip数据
records_d = ORDER records_c by click DESC;
top10 = LIMIT records_d 10;

//把生成的数据保存到HDFS的class7目录中
STORE top10 INTO 'hdfs://hadoop:9000/class7/out';

4.3 准备数据
可以在/home/shiyanlou/install-pack/class7中找到本节使用的测试数据website_log.zip文件，
使用unzip文件解压缩，然后调用hadoop上传本地文件命令把该文件传到HDFS中的/class7目录，如下图所示：

cd /home/shiyanlou/install-pack/class7
unzip website_log.zip
ll
hadoop fs -mkdir /class7/input
hadoop fs -copyFromLocal website_log.txt /class7/input
hadoop fs -cat /class7/input/website_log.txt | less


4.4 实现过程
4.4.1 输入代码
进入pig shell 命令行模式： 此处输入图片的描述


4.4.2 运行过程

在执行过程中在JobTracker页面观察运行情况，链接地址为：http://**.***.**.***:50030/jobtracker.jsp 此处输入图片的描述


可以观察到本次任务分为4个作业，每个作业一次在上一次作业的结果上进行计算


此处输入图片的描述 4.4.3 运行结果

通过以下命令查看最后的结果：

hadoop fs -ls /class7/out
hadoop fs -cat /class7/out/part-r-00000
此处输入图片的描述
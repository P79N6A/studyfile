2 HBase介绍
HBase – Hadoop Database，是一个'高可靠性、高性能、面向列、可伸缩'的'分布式存储系统'，
'利用HBase技术'可'在廉价PC Server上搭建起大规模结构化存储集群'。 HBase是Google Bigtable的开源实现，
'类似Google Bigtable利用GFS作为其文件存储系统'，'HBase利用Hadoop HDFS作为其文件存储系统'；
'Google运行MapReduce来处理Bigtable中的海量数据'，'HBase同样利用Hadoop MapReduce来处理HBase中的海量数据'；
'Google Bigtable利用 Chubby作为协同服务，HBase利用Zookeeper作为对应'。

上图'描述了Hadoop EcoSystem中的各层系统'，其中'HBase位于结构化存储层'，'Hadoop HDFS为HBase提供了高可靠性的底层存储支持'，
'Hadoop MapReduce'为HBase'提供了高性能的计算能力'，'Zookeeper为HBase''提供了稳定服务和failover机制'。
此外，'Pig和Hive还为HBase提供了高层语言支持'，使得'在HBase上进行数据统计处理变的非常简单'。 
'Sqoop则为HBase提供了方便的RDBMS数据导入功能'，使得'传统数据库数据''向HBase中迁移变的非常方便'。

2.1 HBase访问接口
'Native Java API'，最'常规和高效的访问方式'，'适合Hadoop MapReduce Job'并行'批处理HBase表数据'
'HBase Shell，HBase的命令行工具，最简单的接口，适合HBase管理使用'
'Thrift Gateway，利用Thrift序列化技术，支持C++，PHP，Python等多种语言'，'适合其他异构系统在线访问HBase表数据'
'REST Gateway，支持REST 风格的Http API访问HBase, 解除了语言限制'
'Pig，可以使用Pig Latin流式编程语言来操作HBase中的数据'，'和Hive类似，本质最终也是编译成MapReduce Job来处理HBase表数据'，
适合做数据统计
Hive，'当前Hive的Release版本'尚'没有加入对HBase的支持'，但在'下一个版本Hive 0.7.0中将会支持HBase'，可以使用'类似SQL语言'来访问HBase

2.2 HBase数据模型
2.2.1 Table & Column Family
'Row Key: 行键，Table的主键，Table中的记录按照Row Key排序'
'Timestamp: 时间戳，每次数据操作对应的时间戳，可以看作是数据的version number'
'Column Family：列簇，Table在水平方向有一个或者多个Column'
'Family组成'，'一个Column Family'中可以'由任意多个Column组成'，即'Column Family支持动态扩展'，无需预先定义Column的数量以及类型，
'所有Column均以二进制格式存储'，用户需要'自行进行类型转换'。

2.2.2 Table & Region
当'Table随着记录数不断增加而变大'后，'会逐渐分裂成多份splits'，'成为regions'，一个region由
[startkey,endkey)表示，'不同的region'会'被Master分配'给'相应的RegionServer进行管理'：


-ROOT- && .META. Table HBase中有两张特殊的Table，-ROOT-和.META.

'.META.'：'记录'了'用户表'的'Region信息'，'.META.'可以'有多个regoin'
'-ROOT-'：'记录'了'.META.表的Region信息'，'-ROOT-只有一个region'
'Zookeeper'中'记录'了'-ROOT-'表'的location'
'Client访问用户数据之'前需要首'先访问zookeeper'，然'后访问-ROOT-表'，接着'访问.META.表'，最后才能'找到用户数据的位置去访问'，
中间需'要多次网络操作'，不过'client端会做cache缓存'。

2.2.3 MapReduce on HBase
'在HBase系统'上'运行批处理运算'，最方便和实用的'模型依然是MapReduce'，

'HBase Table和Region的关系'，比较'类似HDFS File和Block的关系'，'HBase提供了配套的TableInputFormat和TableOutputFormat API'，
可以方便的将'HBase Table作为Hadoop MapReduce'的'Source和Sink'，对于'MapReduce Job应用开发人员来说'，基本'不需要关注HBase系统自身的细节'。

2.3 HBase系统架构
2.3.1 Client
'HBase Client'使'用HBase的RPC机制'与'HMaster和HRegionServer进行通信'，对于'管理类操作，Client与HMaster进行RPC'；
对于'数据读写类操作'，'Client与HRegionServer进行RPC'

2.3.2 Zookeeper
'Zookeeper Quorum'中'除了存储了-ROOT-表的地址'和'HMaster的地址'，'HRegionServer也会把自己以Ephemeral'方式注册到 'Zookeeper中'，
'使得HMaster可以随时感知到各个HRegionServer的健康状态'。此外，'Zookeeper也避免了HMaster的' '单点问题'，见下文描述

2.3.3 HMaster
'HMaster没有单点问题'，HBase中'可以启动多个HMaster'，'通过Zookeeper的Master Election机制''保证总有一个Master运行'，
'HMaster在功能上主要负责Table和Region的管理工作'：

管理用户对Table的增、删、改、查操作
管理HRegionServer的负载均衡，调整Region分布
在Region Split后，负责新Region的分配
在HRegionServer停机后，负责失效HRegionServer 上的Regions迁移
2.3.4 HRegionServer

用户I/O请求，向HDFS文件系统中读写数据，是HBase中最核心的模块。 此处输入图片的描述

HRegionServer内部管理了一系列HRegion对象，每个HRegion对应了Table中的一个 Region，HRegion中由多个HStore组成。每个HStore对应了Table中的一个Column Family的存储，可以看出每个Column Family其实就是一个集中的存储单元，因此最好将具备共同IO特性的column放在一个Column Family中，这样最高效。

HStore存储是HBase存储的核心了，其中由两部分组成，一部分是MemStore，一部分是StoreFiles。 MemStore是Sorted Memory Buffer，用户写入的数据首先会放入MemStore，当MemStore满了以后会Flush成一个StoreFile（底层实现是HFile）， 当StoreFile文件数量增长到一定阈值，会触发Compact合并操作，将多个StoreFiles合并成一个StoreFile，合并过程中会进 行版本合并和数据删除，因此可以看出HBase其实只有增加数据，所有的更新和删除操作都是在后续的compact过程中进行的，这使得用户的写操作只要 进入内存中就可以立即返回，保证了HBase I/O的高性能。当StoreFiles Compact后，会逐步形成越来越大的StoreFile，当单个StoreFile大小超过一定阈值后，会触发Split操作，同时把当前 Region Split成2个Region，父Region会下线，新Split出的2个孩子Region会被HMaster分配到相应的HRegionServer 上，使得原先1个Region的压力得以分流到2个Region上。下图描述了Compaction和Split的过程： 此处输入图片的描述

在理解了上述HStore的基本原理后，还必须了解一下HLog的功能，因为上述的HStore在系统正常工作的前提下是没有问 题的，但是在分布式系统环境中，无法避免系统出错或者宕机，因此一旦HRegionServer意外退出，MemStore中的内存数据将会丢失，这就需 要引入HLog了。每个HRegionServer中都有一个HLog对象，HLog是一个实现Write Ahead Log的类，在每次用户操作写入MemStore的同时，也会写一份数据到HLog文件中（HLog文件格式见后续），HLog文件定期会滚动出新的，并 删除旧的文件（已持久化到StoreFile中的数据）。当HRegionServer意外终止后，HMaster会通过Zookeeper感知 到，HMaster首先会处理遗留的 HLog文件，将其中不同Region的Log数据进行拆分，分别放到相应region的目录下，然后再将失效的region重新分配，领取 到这些region的HRegionServer在Load Region的过程中，会发现有历史HLog需要处理，因此会Replay HLog中的数据到MemStore中，然后flush到StoreFiles，完成数据恢复。

2.4 HBase存储格式
HBase中的所有数据文件都存储在Hadoop HDFS文件系统上，主要包括上述提出的两种文件类型：

HFile， HBase中KeyValue数据的存储格式，HFile是Hadoop的二进制格式文件，实际上StoreFile就是对HFile做了轻量级包装，即StoreFile底层就是HFile
HLog File，HBase中WAL（Write Ahead Log） 的存储格式，物理上是Hadoop的Sequence File
2.4.1 HFile

下图是HFile的存储格式： 此处输入图片的描述 首先HFile文件是不定长的，长度固定的只有其中的两块：Trailer和FileInfo。正如图中所示的，Trailer 中有指针指向其他数据块的起始点。File Info中记录了文件的一些Meta信息，例如：AVG_KEY_LEN, AVG_VALUE_LEN, LAST_KEY, COMPARATOR, MAX_SEQ_ID_KEY等。Data Index和Meta Index块记录了每个Data块和Meta块的起始点。

Data Block是HBase I/O的基本单元，为了提高效率，HRegionServer中有基于LRU的Block Cache机制。每个Data块的大小可以在创建一个Table的时候通过参数指定，大号的Block有利于顺序Scan，小号Block利于随机查询。 每个Data块除了开头的Magic以外就是一个个KeyValue对拼接而成, Magic内容就是一些随机数字，目的是防止数据损坏。后面会详细介绍每个KeyValue对的内部构造。

HFile里面的每个KeyValue对就是一个简单的byte数组。但是这个byte数组里面包含了很多项，并且有固定的结构。我们来看看里面的具体结构： 此处输入图片的描述

开始是两个固定长度的数值，分别表示Key的长度和Value的长度。紧接着是Key，开始是固定长度的数值，表示RowKey 的长度，紧接着是RowKey，然后是固定长度的数值，表示Family的长度，然后是Family，接着是Qualifier，然后是两个固定长度的数 值，表示Time Stamp和Key Type（Put/Delete）。Value部分没有这么复杂的结构，就是纯粹的二进制数据了。

2.4.2 HLogFile

此处输入图片的描述

上图中示意了HLog文件的结构，其实HLog文件就是一个普通的Hadoop Sequence File，Sequence File 的Key是HLogKey对象，HLogKey中记录了写入数据的归属信息，除了table和region名字外，同时还包括 sequence number和timestamp，timestamp是“写入时间”，sequence number的起始值为0，或者是最近一次存入文件系统中sequence number。

HLog Sequece File的Value是HBase的KeyValue对象，即对应HFile中的KeyValue，可参见上文描述。

3 安装部署HBase

3.1 安装过程

3.1.1 下载HBase安装包

此处输入图片的描述 从Apache网站上（hbase.apache.org）下载HBase稳定发布包: http://mirrors.cnnic.cn/apache/hbase/hbase-0.96.2/

也可以在/home/shiyanlou/install-pack目录中找到该安装包，解压该安装包并把该安装包复制到/app目录中

cd /home/shiyanlou/install-pack
tar -zxf hbase-0.96.2-hadoop1-bin.tar.gz
mv hbase-0.96.2-hadoop1 /app/hbase-0.96.2
此处输入图片的描述

3.1.2 设置环境变量

1.使用sudo vi /etc/profile命令修改系统环境变量

export HBASE_HOME=/app/hbase-0.96.2
export PATH=$PATH:$HBASE_HOME/bin
此处输入图片的描述

2.使环境变量生效并验证环境变量生效

source /etc/profile
hbase version
此处输入图片的描述

3.1.3 编辑hbase-env.sh

1.打开hbase-env.sh文件

cd /app/hbase-0.96.2/conf
sudo vi hbase-env.sh
2.修改该文件配置

export JAVA_HOME=/app/lib/jdk1.7.0_55
export HBASE_CLASSPATH=/app/hadoop-1.1.2/conf
export HBASE_MANAGES_ZK=true
此处输入图片的描述

此处输入图片的描述

3.1.4 编辑hbase-site.xml

1.打开hbase-site.xml配置文件

cd /app/hbase-0.96.2/conf
sudo vi hbase-site.xml
配置hbase-site.xml文件
hbase.rootdir
hdfs://hadoop:9000/hbase
hbase.cluster.distributed
true
hbase.zookeeper.quorum
40aadbd50c14（注意：这里的配置应为实验环境的主机名）
实验环境的主机名可在环境中查看，如下图所示： 此处输入图片的描述

此处输入图片的描述

3.2 启动并验证

3.2.1 启动HBase

通过如下命令启动Hbase

cd /app/hbase-0.96.2/bin
./start-hbase.sh
此处输入图片的描述

3.2.2 验证启动

在hadoop节点使用jps查看节点状态
此处输入图片的描述

进入hbase的shell命令行，创建表member并进行查看
hbase shell
hbase>create 'member', 'm_id', 'address', 'info'
此处输入图片的描述

4 测试例子

4.1 测试说明

这里我们用一个学生成绩表作为例子，对HBase的基本操作和基本概念进行讲解: 下面是学生的成绩表:

name grad course:math course:art
Tom 1 87 97
Jerry 2 100 80
这里grad对于表来说是一个列,course对于表来说是一个列族,这个列族由两个列组成:math和art,当然我们可以根据我们的需要在course中建立更多的列族,如computer,physics等相应的列添加入course列族.

4.2 Shell操作

4.2.1 建立一个表格 scores 具有两个列族grad 和courese

hbase(main):002:0> create 'scores', 'grade', 'course'
此处输入图片的描述

4.2.2 查看当先HBase中具有哪些表

hbase(main):003:0> list
此处输入图片的描述

4.2.3 查看表的构造

hbase(main):004:0> describe 'scores'
此处输入图片的描述

4.2.4 插入数据

新建Tom行健并插入数据

hbase(main):005:0> put 'scores', 'Tom', 'grade:', '1'
hbase(main):006:0> put 'scores', 'Tom', 'course:math', '87'
hbase(main):007:0> put 'scores', 'Tom', 'course:art', '97'
新建Jerry行健并插入数据

hbase(main):008:0> put 'scores', 'Jerry', 'grade:', '2'
hbase(main):009:0> put 'scores', 'Jerry', 'course:math', '100'
hbase(main):010:0> put 'scores', 'Jerry', 'course:art', '80'
此处输入图片的描述

4.2.5 查看scores表中Tom的相关数据

hbase(main):011:0> get 'scores', 'Tom'
此处输入图片的描述

4.2.6 查看scores表中所有数据

hbase(main):012:0> scan 'scores'
此处输入图片的描述
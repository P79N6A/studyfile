Hadoop课程介绍
一、实验介绍

1.1 实验内容

hadoop是什么
hadoop历史
hadoop相关项目及应用场景
1.2 实验知识点

了解hadoop的概念
hadoop的使用场景
1.3 实验环境

hadoop2.6.0
Xfce终端
1.4 适合人群

本课程难度为一般，属于初级级别课程，适合具有linux基础的用户。

二、hadoop

2.1 Hadoop是什么？

'Apache Hadoop是'一款支持数据密集型'分布式应用'并以Apache 2.0许可协议发布'的'开源'软件框架'。
它'支持'在商品硬件构建的'大型集群'上'运行'的'应用程序'。
'Hadoop'是'根据'Google公司发表的'MapReduce和Google档案系统'的'论文'自行'实作而成'。

'Hadoop框架'透明地为应用'提供可靠性和数据移动'。它实现了名为MapReduce的编程范式：'应用程序'被'分割成'许多'小部分'，
而'每个部分'都'能在'集群中的'任意节点上执行''或重新执行'。此外，Hadoop还'提供了分布式文件系统'，用以'存储'所有'计算节点的数据'，
这'为整个集群带来'了非常'高'的'带宽'。'MapReduce'和'分布式文件系统的设计'，'使'得整个'框架能'够'自动处理节点故障'。
它'使应用程序''与'成千'上万的独立'计算的'电脑'和'PB级的数据'。现在普遍认为'整个Apache Hadoop'“平台”'包括Hadoop内核'、
'MapReduce、Hadoop分布式文件系统'（HDFS）以及一些'相关项目'，有'Apache Hive'和'Apache HBase'等等。

'Hadoop'的框架'最核心的设计'就是：'HDFS和MapReduce.HDFS''为海量的数据提供'了'存储'，则'MapReduce为海量的数据提供'了'计算'。

2.2 Hadoop历史

Hadoop由 Apache Software Foundation 公司于 2005 年秋天作为Lucene的子项目Nutch的一部分正式引入。
它受到最先由 Google Lab 开发的 Map/Reduce 和 Google File System(GFS) 的启发。

2006 年 3 月份，Map/Reduce 和 Nutch Distributed File System (NDFS) 分别被纳入称为 Hadoop 的项目中。

'Hadoop 是'最受欢迎的在 Internet 上'对搜索关键字''进行'内容'分类的工具'，但'它也可以解决'许多'要求极大伸缩性'的'问题'。
例如，如果'您要 grep 一个 10TB 的巨型文件'，会出现什么情况？在'传统'的'系统上'，这将'需要很长的时间'。
但是 'Hadoop' 在设计时就考虑到这些问题，'采用并行执行机制'，因此能'大大提高效率'。

目前有很多公司开始提供基于Hadoop的商业软件、支持、服务以及培训。Cloudera是一家美国的企业软件公司，
该公司在2008年开始提供基于Hadoop的软件和服务。GoGrid是一家云计算基础设施公司，在2012年，
该公司与Cloudera合作加速了企业采纳基于Hadoop应用的步伐。Dataguise公司是一家数据安全公司，
同样在2012年该公司推出了一款针对Hadoop的数据保护和风险评估。

2.3 Hadoop相关项目

'Hadoop Common'：在0.20及以前的版本中，'包含HDFS、MapReduce''和'其他项目'公共内容'，
从'0.21'开始'HDFS和MapReduce被''分离为''独立'的'子项目'，'其余内容为''Hadoop Common'
'HDFS：Hadoop'分布式文件系统（Distributed File System）－'HDFS'（Hadoop Distributed File System）
'MapReduce'：'并行计算框架'，0.20前使用org.apache.hadoop.mapred旧接口，0.20版本开始引入org.apache.hadoop.mapreduce的新API
'Apache HBase'：分布式'NoSQL列数据库'，类似谷歌公司BigTable。
'Apache Hive'：构建于hadoop之上的'数据仓库'，通过一种'类SQL语言HiveQL为用户提供数据的归纳'、'查询'和'分析'等功能。Hive最初由Facebook贡献。
'Apache Mahout'：机器'学习算法软件包'。
'Apache Sqoop'：'结构化数据'（如'关系数据库'）与Apache Hadoop之间的数据转换工具。
'Apache ZooKeeper'：'分布式锁设施'，提供类似Google Chubby的功能，由Facebook贡献。
'Apache Avro'：新的'数据序列化格式与传输工具'，将逐步取代Hadoop原有的IPC机制。
2.4 Hadoop优点

高可靠性。Hadoop'按位存储'和'处理数据'的能力值得人们信赖。
高扩展性。Hadoop是'在可用的计算机集簇'间'分配数据'并'完成计算任务'的，这些'集簇可'以方便地'扩展到'数以千计的'节点中'。
高效性。Hadoop能够'在节点之间动态地移动数据'，并'保证各个节点的动态平衡'，因此处理速度非常快。
高容错性。Hadoop能够'自动保存数据的多个副本'，并且能够'自动将失败的任务重新分配'。
低成本。与一体机、商用数据仓库以及QlikView、Yonghong Z-Suite等数据集市相比，hadoop是开源的，项目的软件成本因此会大大降低。
Hadoop带有用Java语言编写的框架，因此运行在 Linux 生产平台上是非常理想的。Hadoop 上的应用程序也可以使用其他语言编写，比如 C++。

2.5 Hadoop应用场景

美国着名科技博客GigaOM的专栏作家Derrick Harris在一篇文章中总结了10个Hadoop的应用场景：

'在线旅游'：全球80%的在线旅游网站都是在使用Cloudera公司提供的Hadoop发行版，其中SearchBI网站曾经报道过的Expedia也在其中。
'移动数据'：Cloudera运营总监称，美国有70%的智能手机数据服务背后都是由Hadoop来支撑的，也就是说，包括数据的存储以及无线运营商的数据处理等，都是在利用Hadoop技术。
'电子商务'：这一场景应该是非常确定的，eBay就是最大的实践者之一。国内的电商在Hadoop技术上也是储备颇为雄厚的。
'能源开采'：美国Chevron公司是全美第二大石油公司，他们的IT部门主管介绍了Chevron使用Hadoop的经验，他们利用Hadoop进行数据的收集和处理，其中这些数据是海洋的地震数据，以便于他们找到油矿的位置。
'节能'：另外一家能源服务商Opower也在使用Hadoop,为消费者提供节约电费的服务，其中对用户电费单进行了预测分析。
'基础架构管理'：这是一个非常基础的应用场景，用户可以'用Hadoop从服务器'、'交换机'以及'其他的设备中收集并分析数据'。
'图像处理'：创业公司Skybox Imaging 使用Hadoop来存储并处理图片数据，从卫星中拍摄的高清图像中探测地理变化。
'诈骗检测'：这个场景用户接触的比较少，一般金融服务或者政府机构会用到。利用Hadoop来存储所有的客户交易数据，包括一些非结构化的数据，能够帮助机构发现客户的异常活动，预防欺诈行为。
'IT安全'：除企业IT基础机构的管理之外，Hadoop还可以用来'处理机器生成数据'以便'甄别来自恶意软件'或者'网络中的攻击'。
'医疗保健'：医疗行业也会用到Hadoop,像IBM的Watson就会使用Hadoop集群作为其服务的基础，包括'语义分析'等'高级分析技术'等。医疗机构'可以利用语义分析''为患者提供医护人员'，并'协助医生更好地为患者进行诊断'。
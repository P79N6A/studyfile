2 HDFS原理

HDFS（Hadoop Distributed File System）是一个'分布式文件系统'，是谷歌的GFS山寨版本。它具有高容错性并提供了高吞吐量的数据访问，
非常适合大规模数据集上的应用，它提供了一个高度容错性和高吞吐量的海量数据存储解决方案。

'高吞吐量访问'：HDFS的每个Block分布在不同的Rack上，在用户访问时，HDFS会计算使用最近和访问量最小的服务器给用户提供。
由于Block在不同的Rack上都有备份，所以不再是单数据访问，所以速度和效率是非常快的。另外HDFS可以并行从服务器集群中读写，
增加了文件读写的访问带宽。

'高容错性'：系统故障是不可避免的，如何做到故障之后的数据恢复和容错处理是至关重要的。HDFS通过多方面保证数据的可靠性，
多份复制并且分布到物理位置的不同服务器上，数据校验功能、后台的连续自检数据一致性功能都为高容错提供了可能。

'线性扩展'：因为HDFS的Block信息存放到NameNode上，文件的Block分布到DataNode上，当扩充的时候仅仅添加DataNode数量，
系统可以在不停止服务的情况下做扩充，不需要人工干预。

2.1 HDFS架构
NameNode：在'Hadoop1.X'中只有'一个Master节点'，'管理HDFS的名称空间'和'数据块映射信息'、配置副本策略和'处理客户端请求'；
Secondary NameNode：'辅助NameNode，分担NameNode工作'，定期'合并fsimage和fsedits'并'推送给NameNode'，紧急情况下可辅助恢复NameNode；
DataNode：'Slave节点'，'实际存储数据、执行数据块'的'读写并汇报存储信息给NameNode'；


2.2 HDFS读操作
'客户端'通过'调用FileSystem对象'的'open()'方法来'打开'希望读取的'文件'，对于'HDFS来说'，这个'对象是分布文件系统'的'一个实例'；

'DistributedFileSystem'通过'使用RPC来调用NameNode'以'确定文件起始块'的'位置'，'同一Block按照重复数会返回多个位置'，
这些'位置按照Hadoop集群拓扑结构排序'，距离客户端近的排在前面；

前两步会返回一个'FSDataInputStream对象'，该对象会'被封装成DFSInputStream对象'，'DFSInputStream'可以方便的'管理datanode和namenode数据流'，
'客户端'对这个输入流'调用read()方法'；

'存储'着'文件起始块'的'DataNode地址'的'DFSInputStream'随即'连接距离最近的DataNode'，通过'对数据流反复调用read()方法'，
可以'将数据从DataNode传输到客户端'；

到达'块的末端时'，'DFSInputStream'会'关闭'与该DataNode的'连接'，然后'寻找下一个'块的'最佳DataNode'，这些操作对客户端来说是透明的，
客户端的角度看来只是读一个持续不断的流；

一旦'客户端完成读取'，就'对FSDataInputStream调用close()方法关闭文件读取'。


2.3 HDFS写操作
'客户端'通过调'用DistributedFileSystem'的'create()方法创建新文件'；

'DistributedFileSystem'通过'RPC调用NameNode'去'创建'一个'没有Blocks关联的新文件'，创建前'NameNode会做各种校验'，
比如文件是否存在、客户端有无权限去创建等。如果校验'通过'，'NameNode会为创建新文件记录一条记录'，否则就会抛出IO异常；

前两步结束后会返回'FSDataOutputStream的对象'，和'读文件的时候相似'，'FSDataOutputStream'被'封装成DFSOutputStream'，
'DFSOutputStream可以协调NameNode和Datanode'。'客户端开始写数据到DFSOutputStream'，
'DFSOutputStream'会'把数据'切成一个个小的数据包，并'写入'内部队列称为'“数据队列”(Data Queue)'；

'DataStreamer'会去'处理'接受'Data Queue'，它'先问询NameNode'这个新的'Block'最'适合存储'的'在哪几个DataNode里'，
比如重复数是3，那么就找到3个最适合的DataNode，把他们'排成一个pipeline.DataStreamer''把Packet按队列输出到管道'的'第一个Datanode中'，
第一个'DataNode'又'把Packet输出到第二个DataNode中'，'以此类推'；

'DFSOutputStream'还有一个对列叫'Ack Quene'，也是有'Packet组成'，等待'DataNode的收到响应'，当'Pipeline'中的'所有DataNode都'表示'已经收到'的时候，
这时'Akc Quene'才'会把对应的Packet包移除掉'；

'客户端完成写数据'后'调用close()'方法关闭写入流；

'DataStreamer把剩余的包都刷到Pipeline'里然后'等待Ack信息，收到最后一个Ack后'，'通知NameNode把文件标示为已完成'。


2.4 HDFS中常用到的命令

1. hadoop fs
hadoop fs -ls /
hadoop fs -lsr
hadoop fs -mkdir /user/hadoop
hadoop fs -put a.txt /user/hadoop/
hadoop fs -get /user/hadoop/a.txt /
hadoop fs -cp src dst
hadoop fs -mv src dst
hadoop fs -cat /user/hadoop/a.txt
hadoop fs -rm /user/hadoop/a.txt
hadoop fs -rmr /user/hadoop/a.txt
hadoop fs -text /user/hadoop/a.txt
hadoop fs -copyFromLocal localsrc dst 与hadoop fs -put功能类似。
hadoop fs -moveFromLocal localsrc dst 将本地文件上传到hdfs，同时删除本地文件。

2. hadoop fsadmin
hadoop dfsadmin -report
hadoop dfsadmin -safemode enter | leave | get | wait
hadoop dfsadmin -setBalancerBandwidth 1000

3. hadoop fsck

4. start-balancer.sh




sudo vim /etc/hosts
# 将hadoop添加到第一行末尾，修改后类似：
# 172.17.2.98 f738b9456777 hadoop
ping hadoop



3.3.3 配置本地环境

对/app/hadoop-1.1.2/conf目录中的hadoop-env.sh进行配置，如下如所示：

cd /app/hadoop-1.1.2/conf
sudo vi hadoop-env.sh
加入对HADOOP_CLASPATH变量值，值为/app/hadoop-1.1.2/myclass，设置完毕后编译该配置文件，使配置生效

export HADOOP_CLASSPATH=/app/hadoop-1.1.2/myclass
图片描述信息

3.3.4 编写代码
进入/app/hadoop-1.1.2/myclass目录，在该目录中建立FileSystemCat.java代码文件，命令如下：

cd /app/hadoop-1.1.2/myclass/
vi FileSystemCat.java

3.3.5 编译代码

在/app/hadoop-1.1.2/myclass目录中，使用如下命令编译代码：

javac -classpath ../hadoop-core-1.1.2.jar FileSystemCat.java
图片描述信息

3.3.6 使用编译代码读取HDFS文件

使用如下命令读取HDFS中/class4/quangle.txt内容：

hadoop FileSystemCat /class4/quangle.txt
图片描述信息

4 测试例子2

4.1 测试例子2内容

在本地文件系统生成一个大约100字节的文本文件，写一段程序读入这个文件并将其第101-120字节的内容写入HDFS成为一个新文件。

4.2 运行代码

注意：在编译前请先删除中文注释！
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Progressable;

public class LocalFile2Hdfs {
    public static void main(String[] args) throws Exception {

        // 获取读取源文件和目标文件位置参数
        String local = args[0];
        String uri = args[1];

        FileInputStream in = null;
        OutputStream out = null;
        Configuration conf = new Configuration();
        try {
            // 获取读入文件数据
            in = new FileInputStream(new File(local));

            // 获取目标文件信息
            FileSystem fs = FileSystem.get(URI.create(uri), conf);
            out = fs.create(new Path(uri), new Progressable() {
                @Override
                public void progress() {
                    System.out.println("*");
                }
            });

            // 跳过前100个字符
            in.skip(100);
            byte[] buffer = new byte[20];

            // 从101的位置读取20个字符到buffer中
            int bytesRead = in.read(buffer);
            if (bytesRead >= 0) {
                out.write(buffer, 0, bytesRead);
            }
        } finally {
            IOUtils.closeStream(in);
            IOUtils.closeStream(out);
        }        
    }
}


4.3 实现过程

4.3.1 编写代码

进入/app/hadoop-1.1.2/myclass目录，在该目录中建立LocalFile2Hdfs.java代码文件，命令如下：

cd /app/hadoop-1.1.2/myclass/
vi LocalFile2Hdfs.java
输入代码内容：

图片描述信息

4.3.2 编译代码

在/app/hadoop-1.1.2/myclass目录中，使用如下命令编译代码：

javac -classpath ../hadoop-core-1.1.2.jar LocalFile2Hdfs.java
图片描述信息

4.3.3 建立测试文件

进入/app/hadoop-1.1.2/input目录，在该目录中建立local2hdfs.txt文件

cd /app/hadoop-1.1.2/input/
vi local2hdfs.txt
内容为：

Washington (CNN) -- Twitter is suing the U.S. government in an effort to loosen restrictions on what the social media giant can say publicly about the national security-related requests it receives for user data.
The company filed a lawsuit against the Justice Department on Monday in a federal court in northern California, arguing that its First Amendment rights are being violated by restrictions that forbid the disclosure of how many national security letters and Foreign Intelligence Surveillance Act court orders it receives -- even if that number is zero.
Twitter vice president Ben Lee wrote in a blog post that it's suing in an effort to publish the full version of a "transparency report" prepared this year that includes those details.
The San Francisco-based firm was unsatisfied with the Justice Department's move in January to allow technological firms to disclose the number of national security-related requests they receive in broad ranges.


图片描述信息

4.3.4 使用编译代码上传文件内容到HDFS

使用如下命令读取local2hdfs第101-120字节的内容写入HDFS成为一个新文件：

cd /app/hadoop-1.1.2/input
hadoop LocalFile2Hdfs local2hdfs.txt /class4/local2hdfs_part.txt
图片描述信息

4.3.5 验证是否成功

使用如下命令读取local2hdfs_part.txt内容：

hadoop fs -cat /class4/local2hdfs_part.txt
图片描述信息

5 测试例子3

5.1 测试例子3内容

测试例子2的反向操作，在HDFS中生成一个大约100字节的文本文件，写一段程序读入这个文件，并将其第101-120字节的内容写入本地文件系统成为一个新文件。

5.2 程序代码

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

public class Hdfs2LocalFile {
    public static void main(String[] args) throws Exception {

        String uri = args[0];
        String local = args[1];

        FSDataInputStream in = null;
        OutputStream out = null;
        Configuration conf = new Configuration();
        try {
            FileSystem fs = FileSystem.get(URI.create(uri), conf);
            in = fs.open(new Path(uri));
            out = new FileOutputStream(local);

            byte[] buffer = new byte[20];
            in.skip(100);
            int bytesRead = in.read(buffer);
            if (bytesRead >= 0) {
                out.write(buffer, 0, bytesRead);
            }
        } finally {
            IOUtils.closeStream(in);
            IOUtils.closeStream(out);
        }    
    }
}


5.3 实现过程

5.3.1 编写代码

进入/app/hadoop-1.1.2/myclass目录，在该目录中建立Hdfs2LocalFile.java代码文件，命令如下：

cd /app/hadoop-1.1.2/myclass/
vi Hdfs2LocalFile.java
输入代码内容：

图片描述信息

5.3.2 编译代码

在/app/hadoop-1.1.2/myclass目录中，使用如下命令编译代码：

javac -classpath ../hadoop-core-1.1.2.jar Hdfs2LocalFile.java
图片描述信息

5.3.3 建立测试文件

进入/app/hadoop-1.1.2/input目录，在该目录中建立hdfs2local.txt文件

cd /app/hadoop-1.1.2/input/
vi hdfs2local.txt
内容为：

The San Francisco-based firm was unsatisfied with the Justice Department's move in January to allow technological firms to disclose the number of national security-related requests they receive in broad ranges.
"It's our belief that we are entitled under the First Amendment to respond to our users' concerns and to the statements of U.S. government officials by providing information about the scope of U.S. government surveillance -- including what types of legal process have not been received," Lee wrote. "We should be free to do this in a meaningful way, rather than in broad, inexact ranges."


图片描述信息

在/app/hadoop-1.1.2/input目录下把该文件上传到hdfs的/class4/文件夹中

hadoop fs -copyFromLocal hdfs2local.txt /class4/hdfs2local.txt
hadoop fs -ls /class4/
图片描述信息

5.3.4 使用编译代码把文件内容从HDFS输出到文件系统中

使用如下命令读取hdfs2local.txt第101-120字节的内容写入本地文件系统成为一个新文件：

hadoop Hdfs2LocalFile /class4/hdfs2local.txt hdfs2local_part.txt
图片描述信息

5.3.5 验证是否成功

使用如下命令读取hdfs2local_part.txt内容：

cat hdfs2local_part.txt
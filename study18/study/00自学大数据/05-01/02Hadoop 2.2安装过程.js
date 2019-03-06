一、需要注意的问题
hadoop2.2的配置还是比较简单的，但是可能会遇到各种各样的问题。最常讲的就是看不到进程。
'看不到进程'大致有'两个原因'：
1.你的'配置文件有问题'。
对于配置文件，'主机名'，'空格'之类的这些都'不要带上'。仔细检查
2.'Linux'的'权限''不正确'。
最常出问题的是core-site.xml，与hdfs-site.xml。

core-site.xml
<property>
        <name>hadoop.tmp.dir</name>
        <value>file:/home/aboutyun/tmp</value>
        <description>Abase forother temporary directories.</description>
</property>

说一下上面参数的含义，这里是hadoop的临时文件目录，'file'的含义是'使用''本地目录'。
也就是使用的是Linux的目录，一定'确保'下面目录
'/home/aboutyun/tmp'
的'权限所属'为'你创建的用户'。并且这里面我也要会变通，aboutyun，为我创建的用户名，
如果你创建了zhangsan或则lisi，那么这个目录就会变为
'/home/zhangsan/tmp'
这里不熟悉，是因为对Linux的不熟悉的原因。这里在来张图：
注意：1和2对比。如果你所创建的tmp属于root，那么你会看不到进程。


hdfs-site.xml
同样也是:要注意下面，你是需要改成自己的用户名的

<property>
       <name>dfs.namenode.name.dir</name>
       <value>file:/home/aboutyun/dfs/name</value>
</property>
<property>
       <name>dfs.datanode.data.dir</name>
       <value>file:/home/aboutyun/dfs/data</value>
</property>
上面讲完，我们开始配置


hadoop集群中'每个机器'上面的'配置基本相同'，所以我们'先在master'上面进行'配置部署'，
然'后再''复制''到''其他节点'。所以这里的安装过程相当于'在每台机'器上面'都要执行'。
【注意】：master和slaves安装的hadoop路径要完全一样，'用户和组'也'要完全一致'


1、 '解压'文件
将第一部分中下载的
tar zxvf hadoop-2.2.0_x64.tar.gz
复制代码
mv hadoop-2.2.0  hadoop
复制代码

解压到'/usr'路径下
并且重命名，'效果'如下


2、hadoop配置过程

配置之前，需'要在master'本地'文件系统''创建'以下'文件夹'：
~/dfs/name
~/dfs/data
~/tmp
这里文件权限：'创建完毕'，你会看到'红线部分'，注意所属用户及用户组。
如果不再新建的用户组下面，可以使用下面命令来修改：让你真正了解chmod和chown命令的用法


这里要涉及到的'配置文件'有'7个'：
'~/hadoop-2.2.0/etc/hadoop/hadoop-env.sh'
~/hadoop-2.2.0/etc/hadoop/yarn-env.sh
~/hadoop-2.2.0/etc/hadoop/slaves
~/hadoop-2.2.0/etc/hadoop/core-site.xml
~/hadoop-2.2.0/etc/hadoop/hdfs-site.xml
~/hadoop-2.2.0/etc/hadoop/mapred-site.xml
~/hadoop-2.2.0/etc/hadoop/yarn-site.xml
'以上文件'默认'不存在'的，可以'复制相应的template文件''获得'。下面举例：


配置文件1：'hadoop-env.sh'
'修改JAVA_HOME值'（export JAVA_HOME=/usr/jdk1.7）

配置文件2：'yarn-env.sh'
'修改JAVA_HOME值'（export JAVA_HOME=/usr/jdk1.7）

配置文件3：'slaves' （这个文件里面保存所有slave节点）
'写入以下内容'：
slave1
slave2

3、'复制到''其他节点'
上面配置完毕，我们基本上'完成'了'90%'了剩下就是复制。我们可以'把整个hadoop复制过去'：
使用如下命令：
'sudo scp -r /usr/hadoop aboutyun@slave1:~/'

这里记得先复制到'home/aboutyun'下面，然后在'转移到/usr'下面。
后面我们会经常遇到问题，经常'修改配置文件'，所以'修改完一个'配置文件后，
'其他节点''都'需'要修改'，这里'附上脚本''操作方便'：
一、节点之间传递数据：
'第一步'：vi scp.sh
'第二步'：把'下面内容''放到里面'（记得修改下面红字部分，改成自己的）
#!/bin/bash
#slave1
scp /usr/hadoop/etc/hadoop/core-site.xml aboutyun@slave1:~/
scp /usr/hadoop/etc/hadoop/hdfs-site.xml aboutyun@slave1:~/                      
#slave2
scp /usr/hadoop/etc/hadoop/core-site.xml aboutyun@slave2:~/
scp /usr/hadoop/etc/hadoop/hdfs-site.xml aboutyun@slave2:~/
'第三步'：'保存scp.sh'
'第四步'：'bash scp.sh'
执行二、移动文件夹：可以自己写了。

4.'配置环境变量'
第一步：
'vi /etc/environment'
复制代码
第二步：'添加如下内容'：记得如果你的路径改变了，你也许需要做相应的改变。

4、启动验证

4.1 启动hadoop
'格式化namenode：'
'hdfs namenode –format'

或则使用下面命令：
hadoop namenode format

'启动hdfs:'
start-dfs.sh

此时在master上面运行的进程有：
namenode
secondarynamenode

slave节点上面运行的进程有：datanode

'启动yarn:'
start-yarn.sh

我们看到如下效果：
master有如下进程：
  
slave1有如下进程

此时hadoop集群已全部配置完成！！！
【注意】：而且所有的配置文件<name>和<value>节点处不要有空格，否则会报错！
然后我们输入：（这里有的同学没有配置hosts，所以输出master访问不到，如果访问不到输入ip地址即可）
http://master:8088/
复制代码

如何修改hosts:
win7 进入下面路径：
C:\Windows\System32\drivers\etc
复制代码
找打hosts


然后打开，进行如下配置即可看到



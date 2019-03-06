因为毕业设计的事情所以需要配置集群搭建Hadoop，所以需要在Ubuntu 16.04 LTS配置jdk，
这也算是个错误总结吧，其实Java环境变量的设置很简单的，下面先说配置步骤，
然后说一下，我所遇到的问题。

'1下载jdk'
这个就不说了，自己去官网下（一定要下载正确的版本，后面带'i586'的'是32位'的，'64位'的'是 x64 的'），
我是通过主机下载好，用ftp上传给虚拟机的。

'2 解压'

在下载的目录中解压也可以，解压命令：tar  -zxvf  filename

'3'将'解压后'的'文件夹重命'名然后'移动到所需目录'

这里说一下我的安装目录是 usr/lib/jvm ，文件原来目录是srv/ftp 。你们根据自己情况建立文件夹

root#：mkdir  usr/lib/jvm

root#：mv  srv/ftp/jdk1.8  /usr/lib/jvm

'4配置环境变量'

'vim  ~/.bashrc'

在文档'最下面添加'

export JAVA_HOME=/usr/lib/jvm/jdk1.8  (JDK包所在的目录)

export JRE_HOME=${JAVA_HOME}/jre

export CLASSPATH=.:JAVA_HOME/lib:JAVAHOME/lib: {JRE_HOME}/lib

export PATH=JAVA_HOME/bin: JAVA_HOME/bin: PATH

'退出保存'然后'让环境变量起作用'

'source ~/.bashrc'

'5检查安装'

'java -version' 如果出现版本号就说明正确。

下面说一下我遇到的问题，本来挺简单的，可是犯了点错误，搞了一下午，原因就是刚开的的红字部分，
下载错版本了，虚拟机是64位的，装的32位的jdk，输入java -version后老师出现，
bash提示没有相关目录或文件，以为是权限问题，到最后看到压缩包最后带了 i586 。
立马知道怎么回事了，折腾一下午，真是无语了，算是教训吧。

配置jdk环境变量导致 vim ls命令不能用的问题

我也不知道怎么 回事，环境变量配对了，然后莫名其妙vim  ls等命令失灵了，估计是不小心按错了哪个地方，下面就是解决方法

首先在终端echo下'环境变量的路径'看看是不是'错了'，命令：

'echo $PATH'

如果出现的路径'不是/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin'，就说明系统的'环境变量错了'，被更改了。

正式开始

1 在终端输入一下命令

linuxidc@root：export

 PATH=/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin

输入这个命令后那些命令暂时就能用了。

2修改配置文件

有的人修改的是bashrc文件，有的人修改的是profile文件，这个根据自己需要选择，修改的哪个就修改哪个，我修改的bashrc文件所以就选择bashrc了

linuxidc@root：vim ~/.bashrc

然后将export

 PATH=/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin 加入文件的最后，保存退出。

3立即生效

source ~/.bashrc

4 重启

linuxidc@root：reboot



'Ubuntu 14.04安装JDK1.8.0_25'与'配置环境变量过程'

1、源码包准备：

首先到官网下载jdk，
//http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html，
我'下载jdk-8u25-linux-x64.tar.gz'，下载到主目录

Ubuntu 14.04安装JDK1.8.0_25与配置环境变量 

2、'解压源码包'
通过终端在/usr/local目录下新建java文件夹，命令行：
sudo mkdir /usr/local/java

然后将下载到压缩包'拷贝到java文件夹中'，命令行：
进入jdk源码包所在目录

'cp jdk-8u25-linux-x64.tar.gz /usr/local/java'

然后'进入java目录'，命令行：

'cd /usr/local/java'

'解压压缩包'，命令行：

sudo tar xvf jdk-8u25-linux-x64.tar.gz

然后可以'把压缩包删除'，命令行：

'sudo rm jdk-8u25-linux-x64.tar.gz'

3、'设置jdk环境变量'

这里采用'全局设置方法'，它是是'所有用户的共用'的'环境变量'

'$sudo gedit ~/.bashrc'
'此处异常'error: XDG_RUNTIME_DIR not set in the environment

如下图所示：

Ubuntu 14.04安装JDK1.8.0_25与配置环境变量 


打开之后在'末尾添加'

'export JAVA_HOME=/usr/local/java/jdk1.8.0_25'
'export JRE_HOME=${JAVA_HOME}/jre'
'export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib'
'export PATH=${JAVA_HOME}/bin:$PATH'

请记住，在上述添加过程中，'等号两侧''不要加'入'空格'，不然会出现“不是有效的标识符”，
因为'source /etc/profile' 时'不能识别'多余到'空格'，会理解为是路径一部分。
然后保存。

4、检验是否安装成功
在终端输入如下命令
'java -version'
看看是否安装成功
成功则显示如下
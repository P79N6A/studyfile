1、下载Linux版的JDK
      下载Linux版的JDK，例如我下载的是Linux版的JKD1.8，
文件是jdk-8u121-linux-x64.tar.gz

地址是：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

如图：

2、将JDK文件'上载到Linux'服务器上
       为了免去不同用户登录都需要安装的自己的jdk的麻烦，
这里使用root账号登录，统一安装到opt目录下。

使用远程工具(例如，我需要上载或者下载文件时使用的是SecureFX)连接Linux服务器，
使用root账号登录，在opt目录下新建一个名为java的目录，将jdk-8u121-linux-x64.tar.gz
拷贝到该目录下
如图：

3、'执行解压'命令
      使用远程连接工具连接到Linux服务器(可以使用普通账号登录，然后使用
sudo  -s命令获得管理员权限，
也可以直接使用root账号登录，只是需要注意，若想运行直接用root登录，
需要进行其他配置，此设置请参考该文章：

http://blog.csdn.net/pucao_cug/article/details/64492550
如图：

获得管理员权限后执行命令
cd  '/opt/java' 回车
如图：

进入到上载过jdk文件的目录后，接着执行解压命令  
   'tar    -zxvf    jdk-8u121-linux-x64.tar.gz'  回车

   稍等片刻，解压完成

   可以看到多了名为jdk1.8.0_121的文件夹

4、修改配置文件
	'修改/etc/profile'这个文件，修改的方法很多，可以用远程工具下载该文件到本地系统，
修改后，在上载上去，也可以直接使用vim命令对该文件进行修改（这里不打算详细展开讲vim命令），
不管用什么方法只要在'/etc/profile'文件中'增加'如下配置即可，增加的内容是：

export JAVA_HOME=/opt/java/jdk1.8.0_121
export  CLASSPATH=$:CLASSPATH:$JAVA_HOME/lib/
export  PATH=$PATH:$JAVA_HOME/bin
如图：

	修改了/etc/profile文件后，需要'把'这个'文件'里'保存'的命令'执行一次'(方法是使用source命令)

执行命令'source    /etc/profile'回车
如图：

5、测试是否安装成功
          执行命令  'java    -version'回车
  如图： 


可以看到，输出的内容是  1.8.0_12说明jdk已经安装成功了。
      注意：将配置内容(其实是命令脚本)写到/etc/profile中目的就是让任意用户登录后，
都会自动执行该脚本，这样这些登录的用户就可以直接使用jdk了。
如果因为某个原因该脚本没有自动执行，自己手动执行以下就可以了
（也就是执行命令source /etc/profile）






1.安装jdk

'建立文件夹'
进入/usr/文件夹下，建立一个文件，我这里是java文件夹，将jdk-6u45-linux-i586.bin复制到'/usr/java'文件夹下

'安装jdk'
在/usr/java文件夹下执行'./jdk-6u45-linux-i586.bin'，执行结果如图

'配置环境变量'
在linux下配置环境变量和windows的原理是相同，都是使jdk的路径成为全局变量，用文本编辑器gedit（如果没安装可以用vi）打开'/etc/profile'，在文件最后添加
export 'JAVA_HOME'=/usr/java/jdk1.6.0_45
export 'PATH'=$JAVA_HOME/bin:$PATH
export 'CLASSPATH'=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
'jdk1.6.0_45改为你安装的jdk的文件夹名称'
'保存后注销''

验证 java -version


2.安装oracle

'检查硬件是否满足要求'
1）确保系统有'足够的 RAM 和交换空间大小'，运行以下命令：
	'#grep MemTotal /proc/meminfo'
	'#grep SwapTotal /proc/meminfo'
 
注：所需'最小 RAM 为 512MB'，而所需'最小交换空间为 1GB'。对于 'RAM 小于或等于 2GB 的系统'，'交换空间应为 RAM 数量的两倍'；对于 'RAM 大于 2GB 的系统，交换空间应为 RAM 数量的一到两倍'。
2）'确保有足够的磁盘空间'。Oracle 10g软件大约需要 2.5GB 的可用磁盘空间，数据库则另需至少1.2G的磁盘空间
3）'/tmp 目录至少需要 400MB 的可用空间'。
 
要检查系统上的可用磁盘空间，运行以下命令：
	'#df -h'


'检查系统是否已安装所需的开发包'
使用'rpm -qa'命令，'确保以下包已成功安装'。对于包的版本,只有'版本高于下面的都可以',如果'低于此版本,则要升级处理',如下:
binutils-2.15.92.0.2-13.EL4
compat-db-4.1.25-9
compat-libstdc++-296-2.96-132.7.2
control-center-2.8.0-12
gcc-3.4.3-22.1.EL4
gcc-c++-3.4.3-22.1.EL44
glibc-2.3.4-2.9
glibc-common-2.3.4-2.9
gnome-libs-1.4.1.2.90-44.1
libstdc++-3.4.3-22.1
libstdc++-devel-3.4.3-22.1
make-3.80-5
pdksh-5.2.14-30
sysstat-5.0.5-1
xscreensaver-4.18-5.rhel4.2
setarch-1.6-1
libaio-0.3.103-3


'创建oracle组和oracle用户'
'创建用于安装和维护 Oracle 10g'软件的 'Linux 组和用户帐户'。
用户帐户将称为 oracle，而组将称为 oinstall（用于软件安装） 和 dba（用于数据库管理）。
#'groupadd oinstall'
#'groupadd dba'
#'useradd -m -g oinstall -G dba oracle –p oracle' (p表示添加帐号密码)
'创建oracle目录并改变目录权限'
现在，'创建存储 Oracle 10g 软件和数据库文件的目录'。'本指南在创建目录结构时所用的命名惯例符合最佳灵活结构 (OFA) 规范'。
以 root 用户身份执行以下命令：
#mkdir  -p  /u01/app/oracle             '# oracle根目录，-p 表示递归建立目录'
#mkdir -p  /u02/oradata                 '# oracle数据文件存放目录'
#chown -R oracle:oinstall  /u01            
#chown -R oracle:oinstall  /u02
#chmod -R 775  /u01
#chmod -R 775  /u02

'配置linux内核参数'
#vi/etc/sysctl.conf，添加如下内容：
kernel.shmall = 2097152             
kernel.shmmax = 2147483648   #此处默认设置为2G，数值一般设为物理内存的40~50%
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
fs.file-max = 65536
net.ipv4.ip_local_port_range = 1024 65000
net.core.rmem_default = 262144
net.core.rmem_max = 262144
net.core.wmem_default = 262144
net.core.wmem_max = 262144
 
完成后，运行以下命令激活更改：
#sysctl–p
.....


'Linux 下如何安装Eclipse'
上官网选择Linux安装包，选择“Save File”，点击“OK”

解压安装包

切换到安装包目录，开始安装

选择“Eclipse Platform”，点击“Next”

1下载镜像
2新建虚拟机并安装CentOS7
3远程连接测试
4 CentOS中ssh服务相关的命令

"1下载镜像"
	最新的CentOS有3种版本，常规版、全量版、最小版。

	一般来说下DVD版就可以了，如果下载了Minimal 版的话，里面包含的东西太少。
DVD版的里面就已经包含了很多东西，可以根据需要选择是要安装桌面呢，还是Server，还
可以勾选其他的按长项，已经基本够用了。Everything版的是在DVD版的基础上又包含了
更多的可选项。我这里"下载"的是"最全"的"Everything版"。

	这里用的镜像是"CentOS-7-x86_64-Everything-1611.iso"

下载地址是：
"http://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-Everything-1611.iso"

	其实没必须要下载这么大的完整版的镜像，下载那个不是完整但是也包含了
很多东西的DVD版的镜像即可(大小是4G)。
地址是：http://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1611.iso

	当然了，如果你只想要一个最小安装，其他东西你想自己装自己配置， 
那么也可以下载这个最小版(只有680M，但是不建议装这个版本)，
地址是：http://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1611.iso

"2新建虚拟机并安装CentOS7"
	新建虚拟机，选择光盘镜像就不在这里截图了。主要截图的是两个步骤，
一个是"软件"选择"相关的设置"，一个是"网络相关"的"设置"。


Software   selection 相关的设置

	默认是选中Minimal Install，这个安装之后很多东西要自己手动安装和配置，麻烦，
建议不选这个，如果你喜欢桌面，你还可以"选择 GNOME Desktop"我这里不要桌面，我选的是Server

Network & host name 相关的设置

	其他几项不是很重要，这里不截图了，"重要"的这"两项设置完"成后，点击
"Begin  Installation"开始安装。

	开始安装的界面出来后，可以"点击ROOT PASSWORD" 来"设置root"账户的"密码"，
点击"USER CREATION"来"新建"root用户之外的"新用户"。

    设置ROOT用户的密码：
    在上图中如果设置的是弱密码，需要点击两次Done按钮来进行确认。

	新增一个用户：
	
	安装完成后，重启，使用账户密码登录，然后用ifconfig命令查看IP配置。

3远程连接测试
	CentOS和Ubuntu不同，CentOS安装完成后直接运行使用root登录了，而Ubuntu则需要配置。

	远程连接工具有很多，诸如SecureCRT、Xshell、putty等。这里使用SecureCRT进行远程连接。
使用root账户


说明：如果在安装时候选择的是Minimal  Install或者是"没有选择Network & host name"进行相关"配置"，
"ssh服务"是"没有安装"的，也就没法使用远程工具进行连接。此时你需要用root账户登录，
或者使用普通账户登录后用sudo命令获得管理员权限，安装ssh服务。

4 CentOS中"ssh服务"相关的"命令"

	查"找ssh相关程序"的命令：
	rpm  -qa  |  grep  ssh回车

	查"看ssh"服务"状态"的命令：
	service  sshd  status

	查看"是否启动了ssh"服务：
	netstat  -antp  | grep sshd

	"安装ssh"服务的命令:
	yum  install  openssh-server回车

	"启动ssh"服务命令：
	service  sshd  start

	"重启ssh"服务命令：
	service  sshd  restart

	"停止ssh"服务命令：
	service  sshd  stop

	将"ssh"服务设置为"开机启动"：
	chkconfig  sshd  on

	将"ssh"服务设置为"开机不启动"：
	chkconfig  sshd  off
	
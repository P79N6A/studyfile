1、'安装' 
'sudo apt-get install subversion' 

2 '找个目录'当'做SVN'的'根目录'
我选择的是'/data/svn'，以下命令也都是跟着这个目录走的，请按照自己的选择自行修改使用mkdri来创建目录

3 '创建'一个'库'
'svnadmin create /data/svn/lin'

4 接下来'修改/data/svn/lin/conf/下'的'三个文件'，依次是：'svnserve.conf'、'passwd'、'authz'。
他们三个作用分别是：'主配置'文件、'密码配置'文件、'权限配置'文件

5 编辑文件'vi /data/svn/lin/conf/svnserve.conf'
找到以下几项，按照如下的设置修改，'去掉'前面的'注释'，每一行的开头'不能有空格'

6 编辑文件'vi /data/svn/lin/conf/passwd'
格式很简单，'用户名、密码'，每行一个，默认是明文保存

7 编辑文件'vi /data/svn/lin/conf/authz'

8 '启动服务'
'svnserve -d -r /data/svn'
参数'-d'表示以'守护进程模式启动'，'-r'表示'代码仓库的根目录'，如果启动成功了，
'通过ps aux | grep svnserve'可以'看到进程'，至此一个最简单的SVN服务就搭建好了。


9 接下来'测试验证'，在客户机上找个目录执行一下命令：
(1)

(2)这里的IP地址为ubuntu的地址，可以用ifconfig

(3)

然后输入用户名和密码：

结果如下，仓库中我已放了些东西，其它操作就不说了

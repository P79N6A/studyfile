添加用户：
1。一种是'root直接添加  adduser'
2。一种是'sudo用户添加 sudo adduser'

root 添加之后，给用户sudo权限的方法：
一，
（1）编辑sudoers文件，用如下方法
sudo edit /etc/sudoers
（2）复制添加用户到root那一行  需要sudo密码则为ALL，不需要则NOPASSWD:ALL。
二，
'sudo usermod -G sudo lilei'

用户组：
1.groups shiyanlou
2.cat/etc/group | sort
/etc/group 的内容包括'用户组（Group）'、'用户组口令'、'GID及该用户组所包含的（User'），每个用户组一条记录。
格式如下：group_name:password:GID:user_list

其中sudo
'sudo通过维护一个特权到用户'名映射的数据库'将特权分配给不同的用户'
这些特权可由数据库中所列的一些不同的命令来识别。为了获得某一特权项，
有'资格'的'用户'只需简单地在命令行'输入sudo与命令名'之后，按照提示再次输入口令 '执行特权命令'
（用户自己的口令，不是root用户口令）。例如，sudo允许普通用户格式化磁盘，
但是却没有赋予其他的root用户特权

删除用户
'sudo userdel lilei' --remove-home
'========================='
1.
who -a 打印能打印的全部
who -d 打印死去的进程
who -m 打印当前用户信息
who -u 打印当前用户以及登录信息
who -q 打印当前登录用户数和用户名

2.创建用户
sudo addUser :name  
'sudo adduser lilei' 
'sudo adduser lilei 创建用户lilei，同时创建lilei的home目录'

3.用户组
'用户组是一组用户的集合,一组有本组共同的权限'，'组内成员还拥有各自的权限'。
查看用户组：
1.'groups lilei'
2.查看/etc/group
'cat /etc/group | sort'
过滤 cat/etc/group | grep -E "shiyanlou|sudo"
输出说明：
group_name:password:GID:user_list

4.将其它用户加入 sudo 用户组
'sudo usermod -G sudo lilei'

5.删除用户
'sudo deluser lilei --remove-home'


//Linux 文件权限
1.查看对文件的权限
'ls -l'
'll'

'drwx---rwx 2 shiyanlou shiyanlou 4096 11月  6 15:30 Desktop'
drwx---rwx：指三类人（拥有者，用户组，其他用户）对文件的权限   'r：读；  w：写；  x：执行'
2：指连接数
shiyanlou：指文件所有者
shiyanlou：文件用户组
4096：文件大小
11月  6 15:30：修改时间
Desktop 文件名
'文件权限：一个目录要同时具有“读权限”和“执行权限”才可以打开，'
'而一个目录要有“写权限”才允许在其中创建其它文件，这是因为目录文件实际保存着该目录里面的文件的列表等信息；'

修改文件所有者:
'sudo chown shiyanlou iphone'
'll iphone'显示iphone的权限信息

修改文件权限  'r=4，w=2，x=1'
chown 710 iphone '7是拥有者权限和，1是用户组权限和，0是其它用户权限和'
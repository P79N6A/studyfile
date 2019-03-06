添加用户：
1。一种是'root直接添加 adduser'
2。一种是'sudo用户添加 sudo adduser'

'root 添加之后，给用户sudo权限的方法'：
一，
（1）编辑sudoers文件，用如下方法
sudoedit /etc/sudoers 
（2）赋值添加用户到root那一行  需要sudo密码则为ALL，不需要则NOPASSWD:ALL。
二，
'sudo usermod -G sudo lilei'

用户组：
1.'groups shiyanlou'
2.'cat/etc/group | sort'
/etc/group 的内容包括用户组（Group）、用户组口令、GID及该用户组所包含的（User），每个用户组一条记录。
格式如下：group_name:password:GID:user_list

其中sudo
'sudo通过维护一个特权到用户名映射的数据库将特权分配给不同的用户'
这些特权可由数据库中所列的一些不同的命令来识别。为了获得某一特权项，
有'资格'的'用户'只需简单地在命令行'exir'之后，按照提示再次输入口令
（用户自己的口令，不是root用户口令）。例如，sudo允许普通用户格式化磁盘，
但是却没有赋予其他的root用户特权

删除用户
sudo 'userdel lilei' --remove-home


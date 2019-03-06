安装软件
1.有安装包直接按照pc端的安装方式安装

2.压缩包的
1》解压
2》编译解压的文件
3》install


who am i 查看当伪终端的用户名 还有启动时间
whoami 产看当前用户名
//图形界面是真终端，其他6个shell是伪终端


who 其他常用参数
-a	打印能打印的全部
-d	打印死掉的进程
-m	同am i,mom likes
-q	打印当前登录用户数及用户名
-u	打印当前登录用户登录信息
-r	打印运等级


用户及文件权限管理
//说明：同时进入主机的两个人他们的文件是在一个盘中的，通过权限，限制不能修改和查看他人的东西
root权限是最高权限，只有root权限能够创建账户

sudo
//使用前提条件：一是你要知道当前登录用户的密码，二是当前用户必须在 sudo 用户组。

su <user> 切换用户（不包括环境变量）
su - <user> 切换用户（包括环境变量）

用户所在用户组
'用户组是一组用户的集合,一组有本组共同的权限'，'组内成员还拥有各自的权限'。

sudo 'adduser lilei' 创建用户lilei，同时创建lilei的home目录

groups <group> 查看  用户名:用户所属的用户组
lilei不属于sudo用户组，却有sudo用户的权限？
在 /etc/sudoers.d目录下创建了lilei这个文件，从而给 lilei 用户赋予了 sudo 权限：


cat <file> 读取指定文件内容打印到终端输出
cat <file> |sort排序后再输出

cat cd group | grep -E xx  用xx过滤搜索
etc/group的内容包括了用户组，密码，GID和包含的用户

usermod 使用户添加到用户组==只有有root权限的用户才能够使用该命令

sudo 'usermod -G sudo lilei'//将lilei加入到sudo用户组从而使他拥有sudo组权限

删除用户
sudo userdel lilei -r-home

产看文件权限明天再看cd 


1：Linux 命令
'ps –ef'   '查看所有'的'进程'
'grep'    '搜索'
'ls  -al'  '按'照'长格式显示'当前目录的'所有内容'
'kill -9 进程号'  强制'终止进程'号所对应的进程
'chmod'  用于'改'变文件或目录的访问'权限'
'chgrp'   '改'变文件或是目录的'所属组'
'chown'  将指定文件的拥有者'改'为指定的'用户或组'
'sudo'   允许系统'管理员'让普通用户'执行'一些或者全部的root命令的一个工具
'rm'    '删除文件或是目录'
'rm –fr'  选项'f表示强制'删除，忽略不存在的文件，'不'给出'提示'；选项'r'表示'递归删除'目录及内容
 
'history'：用于'显示已执行'的'命令'序号及命令本身
'history | grep word'：在'已执行'的'命令中''查询''包含word的命令'
'history  –c'：'清除所有'的'命令历史'
 
2：Ubuntu上'更新'及'安装软件'apt-get apt-cache
'apt-get'是一条linux命令，适'用于deb包管理式'的'操作系统'，主要'用于自动从互联网'
的软件仓库中'搜索'、'安装'、'升级'、'卸载'软件或操作系统。
是debian，ubuntu发行版的包管理工具，与红帽中的yum工具非常类似。
 
'apt-get install packagename'
'安装'一个'新软件包'
'apt-cache search string'
在'软件包列表'中'搜索字符串'
'apt-get remove packagename'
'卸载'一个'已安装的软件包'（保留配置文档）
'apt-get autoremove packagename'
'卸载'一个'已安装的软件包'（删除配置文档）
'apt-get update'
在'修改/etc/apt/sources.list''或/etc/apt/preferences之後''运行'该命令。
此外您'需要定期运行'这一命令以'确保'您的'软件包列表'是'最新'的，即'刷新软件仓库'。
'apt-get upgrade'（dist-upgrade）
可以使用这条命令'更新软件包'，apt-get upgrade不仅'可'以'从相同版本号'的发布版中'更新'软件包，
'也可'以'从新版本号'的发布版中'更新'软件包
apt-get upgrade'后面不加包名'就是'更新全部'软件包

3：Linux 环境下的rails框架搭建
http://www.cnblogs.com/keen-allan/archive/2012/04/22/2464541.html
rvm为Ruby的管理工具，在其下可以装载多个版本的Ruby
gem是管理Ruby的插件的工具
 
 bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer )：将上面连接的内容写入文件stable中，并用bash执行。
 
4. ./ .  .. ~ /
'./'：'执行'当前目录下的'可执行文件'，要求当前用户对该文件具有可执行的权限，大'多数'的'./''默认'的是'bash';
'bash'：对于'当前用户''没'有'可执行权限'的或非可执行的'文件'，'bash均可执行'
'.' ：'当前目录'
'..'：当前目录的'上一层目录'
'~'：'当前'的'用户目录'
'/'：'根目录'，根目录中的'home目录'下'存储注册用户'的'信息'，
'usr目录'下'存储'Linux'安装的程序'，相当于window下c盘上的program files文件夹
rails name：建立一个名为name的rails工程
 
5: irb
Linux的终端上，通过irb命令可直接跳转到Ruby的运行环境
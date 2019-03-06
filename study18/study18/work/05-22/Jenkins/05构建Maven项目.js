'构建一个Maven项目'
1、'新建'一个'job'

2、'输入名称'和'项目类型'

3、'设置编译'的'版本号'等信息

4、'设置svn库''地址'：
'输入项目'托管的'svn'的'地址'，如果有出现要输入账号和密码的地方，输入即可。
如果有出现如下说明用户或密码不对:
点击进去重新设置用户和密码

5、'配置jdk和maven'
'第一次打开'出现如下，点击进去。要求'提示设置JDK和Maven'
点击'系统管理'-》'系统设置'，找到'JDK和Maven'的设置位置
选择本电脑的：

9、'到这里'已经'可以构造'这个'项目'了。
'点击构建'
构建输出的信息：
构建成功输出如下 ：

10、'验证'
这时'它已'经'自动把'这个'项目打包了'一个'war包','默认打包到'了
'C:\Users\linbingwen\.jenkins\workspace\JavaWeb\JavaWeb\target'


'自动远程部署到tomcat'
接下来要完成'自动构建成war包'后，'将'些'war包上传'到'远程'linux的'tomcat的webapps目录'，
'更新项目的war包'，并'重启tomcat'.

'1、安装插件'
//'系统管理'-》'管理插件'，在可选插件里找到下面这个，然后点击'直接安装命令'，
//安装'成功后''要重启jenkins'
//t笔者在安装插件时报错如下：
//这应该是天朝的墙所导致的，所以笔者就使用了手动安装的方式。
//解决方法：
'手动安装'
到'https://wiki.jenkins-ci.org/display/JENKINS/Publish+Over+SSH+Plugin'，下载hpi到本地电脑到

在'系统管理--管理插件--高级--浏览-上传插件即可'

然后它'自动上传并安装'：

红色的是笔者在线安装不成功的，蓝色的是笔者'安装成功'的了，之后'重启jenkis'即可。

2、'配置ssh'内容:
在系统管理-》系统设置里
找到'Publish over SSH'
然后输入：

3、'配置Post Steps'
这里还是接着上面的JavaWeb项目，这个配置得安装了上面的插件后才会显示！

其中，
'Transfer SetSource files'：表示'要上传'的'本地的war包'及'路径'，可'到工作空间'去'看'

'Remove prefix':表示'要上传时'要'去除的文件夹'，即'只上传war包'

'remote driectory':即表示'执行时'的'路径'，相当于'把war包上传到这里'了

'exec commad':要'执行的命令'

要执行的脚本的内容：
[plain] view plain copy
#!/bin/sh  
#defined   
TOMCAT_HOME="/usr/java/tomcat/apache-tomcat-7.0.67/"  
ID=`ps -ef | grep java | grep tomcat|awk '{print $2}'`  
echo $ID   
echo "kill tomcat"  
kill -9 $ID  
echo "remover war file"  
cd "$TOMCAT_HOME"/webapps  
rm -rf JavaWeb-0.0.1-SNAPSHOT  
rm -rf JavaWeb-0.0.1-SNAPSHOT.war  
echo "copy war to webapp"  
cd /home/lin  
cp JavaWeb-0.0.1-SNAPSHOT.war "$TOMCAT_HOME"/webapps  
cd "$TOMCAT_HOME"/bin  
echo "start tomcat"  
./startup.sh  
步骤：
先'停掉tomcat'
'删除webapp'下'对应的war包'
'复制war到webapps'
'重启tomcat'


'4、构建部署'
点击项目的构建按钮，最终出现如下：

在linux上打开浏览器，输入http://localhost:8080/JavaWeb-0.0.1-SNAPSHOT/

注意：这里配置的ssh用户：lin要有root的权限，要不可以会报错没有权限执行kill 或rm 命令

本文使用的Linux：Ubuntu14.04

其中JDK、Tomcat、SVN服务器请看这里Ubuntu安装配置JDK、Tomcat、SVN服务器
1、'下载'
http://tomcat.apache.org/

2、'安装'
此处我把下载包放到/opt/java/tomcat中去。

执行
'cp apache-tomcat-7.0.67.tar.gz /opt/java/tomcat/'

然后'解压'
'tar -zxvf apache-tomcat-7.0.67.tar.gz' 

3、'配置环境'

'进入'到上面的'tomcat'的'bin文件夹'下：

打开
'vi setclasspath.sh'
添加如下内容：
'export JAVA_HOME=/usr/java/jdk/jdk1.8.0_65'  
'export JRE_HOME=/usr/java/jdk/jdk1.8.0_65/jre' 

保存即可。
然后退回到bin目录下：

执行：
'./startup.sh' 
打开浏览器输入：
http://localhost:8080/，出现如下，说明安装成功
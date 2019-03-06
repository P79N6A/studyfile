'Jenkins'是一个'开源'软件'项目'，旨在'提供'一个开放易用的'软件平台'，
使软件的持续集成变成可能。
Jenkins是基于Java开发的一种持续集成工具，
用于监控持续重复的工作，功能包括：
1、'持续'的软件'版本发布/测试'项目。
2、'监控'外部'调用执行'的工作。

本文使用的Linux：Ubuntu
其中JDK、Tomcat、SVN服务器请看这里Ubuntu安装配置JDK、Tomcat、SVN服务器

一、'安装Jenkins'
本文直接'使用war包安装'
下载地址：https://jenkins-ci.org/content/thank-you-downloading-windows-installer/

war包有两种安装方法
'方法一'

'下载jenkins.war', '拷贝到D:\Java\Tool\jenkins'（）下，
然后'运行java -jar jenkins.war'. (注意需要'先安装JDK'，
然后设置JAVA_HOME环境变量且将%JAVA_HOME%\bin加入到PATH环境变量中)
运行如下：
访问http://localhost:8080 , jenkins的主界面如下：

方法二

'把Jenkins' 1.409.1版'解压'，把'得到'的'war包'直接'扔到tomcat'下，'启动tomcat'，Jenkins就安装完毕，
访问http://localhost:8080 

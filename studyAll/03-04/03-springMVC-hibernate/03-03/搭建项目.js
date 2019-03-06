导入项目，把对应的jdk换做本地安装和配置的
因为要用到maven,所以需要在jdk中加入默认
-Dmaven.multiModuleProjectDirectory=$M2_HOME
M2_HOME是本地安装的maven的环境变量 -Dmaven.multiModuleProjectDirectory

maven 相关
安装maven 配置环境变量 M2_HOME
首先'安装中央仓库',可以直接拿老项目的库来用 maven相关，
然后配置settings.xml，使其访问私服来下载
然后需要在eclipse（maven插件的eclipse）中添加相关设置
	1选中本地的maven  
	2选中本地settings.xml文件

在将项目maven clean install package 
注意此时如果报找不到M2_HOME表示环境变量没有配置
如果install报错，根据报错情况，可能是jdk选错了

tomcat相关  也可以选择jetty
安装较新版本的tomcat，启动报错可能是tomcat版本低 
解压安装tomcat时候可能需要先行安装
安装方法
cmd命令中切换到 tomcat安装位置bin下，同时输入 service.bat install回车即可

然后在eclipse中配置新的服务，然后把项目加入到服务中去，
注意在配置的时候要选择运行本地tomcat不要用eclipse自带的

当出现找不到依赖jar包的时候，需要
web deployment assembly中加入maven依赖，这里是把依赖加到tomcat中的意思
项目 —> 属性 -> Deployment Assembly -> Add -> Java Build Path Entries -> 选择Maven Dependencies -> Finish -> OK
jetty的话就不需要这么做
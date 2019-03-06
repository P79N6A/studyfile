下载安装 配置环境变量

'配置pom.xml文件'如下，放在项目根目录
<?xml version="1.0" encoding="utf-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>org.maven</groupId>/*包名*/
	<artifactId>maven-ch01</artifactId>/*项目名称*/ 
	<version>0.0.1-SNAPSHOT</version>/*版本*/
	/*三个坐标确定一个依赖*/
</project>


'如何加入依赖'按照上述，三个坐标确定一个依赖
<dependencyies>
	<dependency>
		<groupId></groupId>
		<artifactId></artifactId>
		<version></version>
	</dependency>
</dependencies>

'maven优点'
按照maven的要求建立文件夹，把代码文件放在相应的地方，就能够自动根据pom文件对项目进行编译，测试，发布

新人来下载代码不用配置tomcat，svn等等，直接用maven自动分配好了，新人的代码就能跑了

mvn test 会自动测试，在target文件夹下生成三份测试报告 mvn test

mvn clean 会清空编译和测试生成的文件 mvn clean

mvn package 会先编译，测试，运行完成后把项目打成jar包 mvn package

mvn install 安装 mvn install

'项目之间如何关联'
用maven package打包代码；
再把打好的包作为依赖加入到要用他的项目的pom.xml文件中
这样一个项目能够分成很多个模块，在最终的项目中引进模块就ok了

'maven仓库'
当我们在pom中加入依赖时。maven会从仓库中加载jar包，仓库没有的会去网上下载
maven自动下载的jar包默认放在C:\Users\liuqi_\.m2\repository文件夹下
查maven依赖坐标的网站 mvnrepository.com

'如何指定jar包位置'

'如何配置本地库在网络中的下载地址'

'建立maven项目'
'一般'
'**mvn archetype:generate 自动创建maven项目' 
会下载jar包到本地工厂，有个选择版本，先回车，再敲版本对应数字，回车即可
接着键入三个坐标1.groupId；2.artifactId；3.version 
接着键入包名；之后选择Y就OK了
archetype的一般使用方法:
	mvn archetype:generate -DgroupId=org.maven.ch05 -DartifactId=maven-ch05 -Dversion=0.0.1-SNAPSHOT

'eclipse创建'
	1.选择坐标时，好多常用的。一般选择quickstart 和 webapp  

配置文件需要放在resources文件夹下面

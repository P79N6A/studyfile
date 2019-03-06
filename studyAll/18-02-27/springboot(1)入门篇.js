'Spring Boot'是由Pivotal团队提供的全新框架，其设计目的'是用来简化新Spring应用'
'的'初始'搭建'以'及开发过程'。该'框架使用了特定的方式'来进行'配置'，从而使开发人员
'不再需要定义'样板化的'配置'。用我的话来理解，就是'spring boot'其实不是什么新的框架，
它'默认配置'了'很多框架的使用方式'，就像maven整合了所有的jar包，spring boot整合了
所有的框架（不知道这样比喻是否合适）。

maven构建项目

1、访问http://start.spring.io/
2、选择构建工具Maven Project、Spring Boot版本1.3.6以及一些工程基本信息，
点击“Switch to the full version.”java版本选择1.7，可参考下图所示：

3、点击Generate Project下载项目压缩包
4、解压后，使用eclipse，Import -> Existing Maven Projects -> Next ->
选择解压后的文件夹-> Finsh，OK done!

如上图所示，Spring Boot的基础结构共三个文件:

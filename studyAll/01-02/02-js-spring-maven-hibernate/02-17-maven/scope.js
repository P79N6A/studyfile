'scope坐标'
{
	test 只有在测试时依赖该包,编译和打包时候不依赖 
	runtime 编译不用 测试 运行使用  
	compile test 打包 编译 都使用依赖 
}

'eclusions排除依赖'

'聚合管理pom文件' 不用因为模块多而多次编译，统一编译 
<modules>
	<module>../user-core</module>
</modules>

'继承 pom中公用的提取出来，不用重复编写'
三个坐标加上一个相对路径<relativePath></relativePath> 
'dependenciesManagers'管理jar包版本

搭建私服避免重复访问官网仓库 用工具Nexus
'下载Nexus，将bin加入到环境变量中'
'修改Nexus中的wrapper文件，'
'找到wrapper.java.command=java 改java为java jdk中java的路径'

接着在cmd中安装Nexus   输入nexus install 再启动
在浏览器输入localhost：8080/nexus/index.html 进入登录页面 name='admin' pwd="admin123"；
在groupId中添加所有的项目

/*Jquery插件dataTable*/
'设置项目在Nexus中私服下载'repositories repository 
<id>nexus</id> 
<name>Nexus Repository</name> 
<url>http://localhost:8081/nexus/content/groups/public/</url>
<releases>可以下载releases包
<snapshots>默认可下载snapshots下的包
	
'在settings中设置私服下载'
profile <id>nexusRepo</id>  
再加上述的repositories
最后用<activeProfiles>激活配置

如果设置了私服下载，在私服关闭后回去中央工厂下载

'镜像<mirrors>'让用户只能去私服，私服没有就不准下载 
mirror下面
id="nexusMirror" mirrorOf="*" name=默认 url=私服地址 

一般用servlet发布项目，先在web.xml中配置servlet.servlet-mapping  　　
把打包的war文件添加到tomcat的webapp文件夹中，启动tomcat即可

'jsp el'无作用时在jsp文件中加入isElegnor="false" 

怎样让maven文件打包后自动进入tomcat中呢？
Copy-maven-Plugin
把这个jar包加到pom中
调用maven插件
<pluginManagement>
	<plgins>
		<plugin>
			三个坐标
			<executions>
			...
			</executions>
		</plugin>
	</plgins>
</pluginManagement>

jetty插件  jetty:run

maven-eclipse-plugin

jetty-maven-plugin
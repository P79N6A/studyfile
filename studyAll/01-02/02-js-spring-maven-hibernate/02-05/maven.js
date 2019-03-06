 <?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<!--'指定''本地仓库''存储路径'。默认值为~/.m2/repository 即 ${user.home}/.m2/repository。 -->
	<localRepository>d:/.m2/repository</localRepository>
	<!-- '指定插件''groupId列表'，用于'搜索时插件的groupId''没有明确规定'。 -->
	<pluginGroups>
		<!-- '指定'使用'插件查找'进一步的'组标识符' -->
		<pluginGroup>com.micmiu.plugins</pluginGroup>
	</pluginGroups>

	<!-- '指定'这台'机器连接到网络'的'代理服务器的列表'。除非'另有规定'（系统属性或命令行开关）， 列表中配置的'第一代理'将'被激活使用'。 -->
	<proxies>
		<!-- '配置'代理服务器的'相关参数' -->
		<proxy>
			<!-- '代理标识ID'，默认值：default -->
			<id>micmiuProxy</id>
			<!-- '指定是否激活'，默认值：true -->
			<active>true</active>
			<!-- '指定代理协议'，默认值：http -->
			<protocol>http</protocol>
			<!-- '指定代理认证的用户名' -->
			<username>micmiu</username>
			<!-- '指定代理认证用户的密码' -->
			<password>mypwd</password>
			<!-- '指定代理服务器'的'主机名' -->
			<host>micmiu.com</host>
			<!-- '指定代理服务'的'端口' 默认值：8080 -->
			<port>80</port>
			<!-- '指定不被代理'的'主机名列表'。多个用|分隔。 -->
			<nonProxyHosts>ctosun.com|ctosun.micmiu.com</nonProxyHosts>
		</proxy>
	</proxies>

	<!-- 这是一个'认证配置的列表',系统内部'根据配置的serverID使用'。认证配置'用于maven链接到远程服务' -->
	<servers>
		<!-- '指定的身份'认证信息'用于连接到'一个'特定的服务器时'，确定系统内的唯一的名称（简称下面的'id'属性）。 -->
		<server>
			<!-- 这是server的id（注意不是用户登陆的id）。'该id''与pom中distributionManagement中repository元素的id必须要匹配'。 -->
			<id>micmiu-releases</id>
			<!-- 服务器认证的用户名 -->
			<username>michael</username>
			<!-- 服务器认证的用户对应的密码 -->
			<password>mypwd</password>
		</server>

		<!-- 另一个示例 私钥/密码 -->
		<server>
			<id>micmiu-snapshots</id>
			<!-- '认证时'使用的'私钥文件'。 -->
			<privateKey>/home/micmiu/.ssh/id_dsa</privateKey>
			<!-- 认证时使用的私钥密码，没有密码就设为空 -->
			<passphrase>mypwd</passphrase>
			<!-- '目录被创建时'的'权限设置'。其值对应了unix文件系统的权限，如664，或者775 -->
			<directoryPermissions>775</directoryPermissions>
			<!-- '仓库文件创建时'的'权限设置'。其值对应了unix文件系统的权限，如664，或者775。 -->
			<filePermissions>664</filePermissions>
		</server>
	</servers>

	<!-- 指定镜像列表，'用于''从远程仓库''下载资源' -->
	<mirrors>
		<!-- '指定'仓库的'镜像站点'，'代替'一个'给定的库'。
		该'镜像藏'库'有一个ID相匹配的mirrorOf元素'。 
		'ID'是'用于''继承'和直接'查找'目的，必须是唯一的。 -->
		<mirror>
			<!--该镜像的唯一标识符。id用来区分不同的mirror元素。 -->
			<id>mirrorId</id>
			<!--被镜像的服务器的id，比如：central，不能和id匹配。 -->
			<mirrorOf>central</mirrorOf>
			<name>micmiu for dev.</name>
			<url>http:// dev.micmiu.com/repo/maven2</url>
		</mirror>
	</mirrors>

	<!-- 这是一个可以在各种不同的方式激活的配置文件列表，并可以修改构建过程。在settings.xml中提供的信息， 旨在提供本地机器允许建立在本地环境中工作的具体路径和库位置。有多种方式可以激活配置属性：一种在settings.xml中<activeProfiles>指定； 
		另一种实质上依赖于系统属性，无论是匹配特定的属性值或只是测试到它的存在.配置文件也可以根据JDK版本的前缀进行激活，1.4 可以激活1.4.2_07 
		注：对于在settings.xml中定义的配置，你仅限于指定资源仓库、插件仓库和用于插件在POM中变量的自由形式属性的定义 -->
	<profiles>
		<!-- 指定生成过程的介绍，使用一个或多个上述机制被激活。对于继承而言，激活通过<activatedProfiles/>或命令行配置文件， 
			配置文件必须有一个唯一的ID。此配置文件的例子使用的JDK版本触发激活。 -->
		<profile>
			<!--该配置的唯一标识符。 -->
			<id>jdk-1.4</id>

			<!--自动触发配置文件的逻辑定义。Activation的逻辑配置决定了是否开启该profile。activation元素并不是激活profile的唯一方式。 
				settings.xml文件中的activeProfile元素可指定需要激活的profile的id。 profile也可以通过在命令行，使用-P标记和逗号分隔的列表来显式的激活 -->
			<activation>
				<!--指定是否激活的标识 默认值为false -->
				<activeByDefault>false</activeByDefault>

				<!--当匹配的jdk被检测到，profile被激活。例如，1.4激活JDK1.4，1.4.0_2，而!1.4激活所有不是以1.4开头的JDK版本。 -->
				<jdk>1.4</jdk>

				<!-- 当检测到匹配的操作系统属性时，指定该配置文件将被激活， -->
				<os>
					<!--激活profile的操作系统的名字 -->
					<name>windows 7</name>
					<!--激活profile的操作系统所属家族(如 'windows') -->
					<family>windows</family>
					<!--激活profile的操作系统体系结构 -->
					<arch>x86</arch>
					<!--激活profile的操作系统版本 -->
					<version>6.1</version>
				</os>

				<!-- 检测系统对应的属性和值(该值可在POM中通过${属性名称}引用)，配置就会被激活。 如果值字段是空的，那么存在属性名称字段就会激活 -->
				<property>
					<!-- 属性的名称 -->
					<name>mavenVersion</name>
					<!-- 属性的值 -->
					<value>3.0.4</value>
				</property>
				<!-- 通过检测该文件的是否存在来激活配置。missing检查文件是否存在，如果不存在则激活profile；exists则会检查文件是否存在，如果存在则激活。 -->
				<file>
					<!--如果指定的文件存在，则激活profile。 -->
					<exists>/usr/local/micmiu/workspace/myfile</exists>
					<!--如果指定的文件不存在，则激活profile。 -->
					<missing>/usr/local/micmiu/workspace/myfile</missing>
				</file>
			</activation>

			<!-- 对应profile的扩展属性列表。Maven属性和Ant中的属性一样，可以用来存放一些值。这些值可以在POM中的任何地方使用标记${X}来使用， 
				这里X是指属性的名称。属性有五种不同的形式，并且都能在settings.xml文件中访问。 1. env.X: 表示系统环境变量。例如,"env.PATH" 
				等同于 $path环境变量（在Windows上是%PATH%）。 2. project.x：表示 POM中对应的属性值。 3. settings.x: 
				表示 settings.xml中对应属性值。 4. Java系统属性: 所有可通过java.lang.System.getProperties()访问的属性都能在POM中使用该形式访问。 
				5. x: 在<properties/>元素中，或者外部文件中设置，以${someVar}的形式使用。 -->
			<properties>
				<user.blog>www.micmiu.com</user.blog>
			</properties>

		</profile>

		<!-- 这是另一个配置文件，根据系统属性来激活 -->
		<profile>
			<!--该配置的唯一标识符。 -->
			<id>env-dev</id>
			<activation>
				<property>
					<!-- 被用来激活配置文件的属性的名称 -->
					<name>target-env</name>
					<!-- 被用来激活配置文件的属性的值 -->
					<value>dev</value>
				</property>
			</activation>
			<!-- 指定配置文件的扩展配置 内容采取property.value的形式 -->
			<properties>
				<tomcatPath>/path/to/tomcat/instance</tomcatPath>
			</properties>
		</profile>

		<profile>
			<id>repo-dev</id>
			<!-- 配置远程仓库列表 -->
			<repositories>
				<!-- 远程仓库的配置信息 -->
				<repository>
					<!-- 远程仓库唯一标识 -->
					<id>nexus</id>
					<!-- 远程仓库名称 -->
					<name>nexus for develop</name>
					<!-- 远程仓库URL -->
					<url>http:// 192.168.1.8:8080/nexus/content/groups/public/</url>
					<layout>default</layout>
					<releases>
						<!--是否使用这个资源库下载这种类型的构件 默认值：true -->
						<enabled>true</enabled>
						<!--指定下载更新的频率。这里的选项是：always（一直），daily（每日，默认值），interval：X（这里X是指分钟），或者never（从不）。 -->
						<updatePolicy>daily</updatePolicy>
						<!--当Maven验证构件校验文件失败时该怎么做fail（失败）或者warn（告警）。 -->
						<checksumPolicy>warn</checksumPolicy>
					</releases>
					<snapshots>
						<!--是否使用这个资源库下载这种类型的构件 默认值：true -->
						<enabled>true</enabled>
						<!--指定下载更新的频率。这里的选项是：always（一直），daily（每日，默认值），interval：X（这里X是指分钟），或者never（从不）。 -->
						<updatePolicy>daily</updatePolicy>
						<!--当Maven验证构件校验文件失败时该怎么做fail（失败）或者warn（告警）。 -->
						<checksumPolicy>warn</checksumPolicy>
					</snapshots>
				</repository>
			</repositories>
			<pluginRepositories>
				<pluginRepository>
					<id>nexus</id>
					<name>local nexus</name>
					<url>http:// 192.168.1.8:8080/nexus/content/groups/public</url>
					<layout>default</layout>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</pluginRepository>
			</pluginRepositories>
		</profile>

	</profiles>

	<!-- 指定被激活的配置文件 -->
	<activeProfiles>
		<activeProfile>repo-dev</activeProfile>
	</activeProfiles>
</settings>

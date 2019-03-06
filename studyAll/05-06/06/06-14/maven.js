log4j依赖commons-logging

当scope="test"的时候，就不会加载到依赖中去

当a项目依赖 x.1包，项目b依赖x.2。c依赖a和b，请问c将怎样选择自己的x包？

当级别不同选择'级别高'的,当依赖同级别，选择'先依赖'的

当依赖冲突时，用'exclusion排除依赖'

用继承管理版本，用聚合控制统一打包编译

nuxus 配置  3rd是管理第三方的jar包
snapshot 本地版本是snapshot的jar 打包到这来
release 本地版本是release就打包到这来
cenrel 是中央库下载的jar放到这来
group 把多个工厂加到此处

在settings.xml中配置代理，起到不用设置pom就能直接访问工程的效果  代理需要激活，不要与镜像中地址重复
在settings.xml中配置镜像，限制只镜像中的工厂只能在mirror指定的地址下载	*表示所有的工厂都在这里

在父类中配置发布条件如下，在settings.xml的server中配置发布用户
<distributionManagement>
<repository>
	<id>user-release</id>
	<name>user release resp</name>
	<url>http://localhost:8081/nexus/content/repositories/cms-release/</url>
</repository>
<snapshotRepository>
	<id>user-snapshots</id>
	<name>user snapshots resp</name>
	<url>http://localhost:8081/nexus/content/repositories/cms-snapshots/</url>
</snapshotRepository>
</distributionManagement>

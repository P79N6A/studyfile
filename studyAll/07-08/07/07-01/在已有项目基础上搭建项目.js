 --sms项目准备工作：先将本地默认字符集设置为GBK再做如下操作
1.首先'新建一个java项目msmDev'
2.'对该项目build path 通过Link Source 将相关的工程加在msmDev项目下面'
3.'将web项目加载进来并用Exclusion排除掉WEB-INF/classes/文件夹下的编译文件'
 --msm项目需要排除一个奇怪的java文件app/pm/prjothereva/eva/HcContractHeaderDAO.java
//在直接导入外部项目到eclipse中时，由于你加入的项目编译位置和在eclipse中自己新建项目的编
//译位置是不同的常常会把java文件输出到编译文件夹下，因此需排除这个放编译文件的文件夹
 
4.'选择对应的jdk'
5.'加载本项目需要的jar包'
 --msm项目的关联jar包在MSM_CJ101_Frame\webApplication\WEB-INF\lib下面

6.因为我们手动导入的项目，所以不算web项目，是不能直接用eclipse下service中tomcat启动的
需要'配置tomcat插件'
一，配置tomcat home。设置配置文件输出目录:tomcatHOME\conf\Catalina\localhost
二，配置jvm参数，让tomcat启动变快-Xms1024m -Xmx1024m;-XX:PermSize=256m -XX:MaxPermSize=256m
三，右键项目勾选作为web项目，上下文名称填写上msmDev，同时选择tomcat容器的web项目，这样tomcat会自动生成一个配置文件。

--msm项目
四，修改数据源applicationContext.xml  L187 java:comp/env/jdbc/eccTaskDatasource  
ecc.conf文件JNDINAME_DATASOURCE=java:comp/env/jdbc/eccTaskDatasource

--msm项目
<bean id="sqlMapClient" class="org.springframework.orm.ibatis.SqlMapClientFactoryBean">
	<property name="configLocation">
	  <value>/WEB-INF/SqlMapConfig.xml</value>
	</property>
	<property name="dataSource">
	  <ref local="dataSource" />
	</property>
</bean>

<bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
	<property name="jndiName">
	  <value>java:comp/env/jdbc/eccTaskDatasource</value>
	</property>
</bean>

7.拿到数据连接串 ping通ip连接数据库


首先明确一点，folder，source folder，package都是文件夹，既然是文件夹，那么任何的文件都可以往这三种文件夹下面的放。
1.他们的区别
'folder就是普通的文件夹'，它和我们'window下面使用的文件夹没有任何区别'
'source folder文件夹'是一种'特别的文件夹'，如果你用面向对象的思想去看待这个source folder，
那么他是folder的一个子集，作为子集，肯定是有folder的所有功能，
而且还有自己特别的功能，他的特别之处，就是在'source folder下面的Java文件都会被编译'，
'编译后'的文件会被'放在'我们'设置的某个文件夹下'面（一般我们设置成'WEB-INF/classes'），
source folder下面的'非java文件'会被'copy一份放在'我们的'设置的文件夹下'面，下图为设置方式：
'package'文件夹也是一种特别的文件夹，他的特别之处在于：他'必须存在于source folder'下面，
上下级通过.来区分，他的路径最后组成了每一个类的包路径名

2.他们的作用
folder就是最普通的文件夹，你任何想放在eclipse 下面的文件都可以放在folder下面
'source folder' 设计出来就是'用来放待编译的java文件'的，因为java文件要先被编译，那么就出现了一个问题，
'哪个'文件夹下面的'能被编译'？'哪个'文件夹下面的'不能被编译'？
所以就设计出来一个特别的文件夹叫'source folder'，放在'他下面的java文件就能被编译'，
而且，可以通过一定的配置将编译文件放在你配置的文件夹下面
'package'，设计出来就'是给java文件用来分包的'，说白了，就是为了好管理java文件，
如果source folder看做是一座大楼，那么我们是通过package将这座大楼分成了不同的楼层，
不同的房间，不同的楼层不同的房间我们用来做不同的事情，房间里面放了很多java类，有一点注意的是，
最后'package组成了一个路径名，这个路径名不是物理路径'，但java，
里面很多时候，就是用这个package组成的路径名，如：web.xml,spring.xml等很多的配置

3.package,source folder,folder 之间相互转换
package 转成 folder 显示：选中package, build path-> Exclude 
folder 转成 package 显示：选中folder, build path-> Include 
package 转成 source folder 显示：选中package, build path-> Use as Source folder 
source folder 转成 package 显示：选中folder, build path-> Remove from BuildPath 
package 与 source folder 的转换同上

//禁用
function disableLink(link) {
   //link.disabled = true;     
   link.setAttribute("disabled",true);   
   link.removeAttribute('href');     
}
//解除禁用
function enableLink(link,href) {
   link.setAttribute("disabled",false);     
   link.setAttribute("href",href);
};



tomcat部署静态页面
1.'把文件直接放到webapps下面'

2.'多个项目可以设置虚拟目录的方法'
1) 找到Tomcat下的conf文件夹下的'server.xml'
2) '找到Host结束标签，我们在这里配置虚拟路径:如下'

<Context path="" docBase="" reloadable="" debug="" crossContext=""/>
	'虚拟路径解析'
	'Context指上下文'，相信当你看到这步的时候，你一定没少接触过这个词。不赘述
	'path指虚拟目录'，与浏览器访问的路径相关，如果直接是path="/"，'访问就是http://localhost:8080/XX.jsp,'
	'如果为空串，也是一样'，如果加了项目名，访问路径也要加，如path="/home",访问就是http://localhost:8080/home/XX.jsp
	'docBase指实际存在路径'，'一般在硬盘里'。如果我们的文件home直接放在了E盘下，那docBase=“E:\home”
	'reloadable指有文件更新时，是否重新加载，一般设置为true'，设置为true后，不需重新启动，就能验证我们的改动，
	不过修改了java文件后，可以重新编译需要一小会，在IDE下的控制台里可以看见输出，一般没有输出滚动出来的时候，就可以了。
	这三个一般经常设置。
	debug指等级，一般设置为debug=“0”，提供最少的信息。设不设置无大影响。
	crossContext指是否可以互相使用上下文环境。这个我也是查了很久，一般不使用。
	网上搜到一个两个应用共享session的，有兴趣的同学可以看下。
	
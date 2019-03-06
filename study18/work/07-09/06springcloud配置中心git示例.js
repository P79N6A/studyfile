随着线上项目变的日益庞大，'每个项目'都'散落'着'各种配置文件'，
如果'采用分布式'的'开发模式'，需要的'配置文件''随着服务增加'而'不断增多'。
某一个'基础服务''信息变更'，都'会引起'一系列的'更新和重启'，
运维苦不堪言也容易出错。'配置中心'便是'解决此类问题'的灵丹妙药。

市面上开源的配置中心有很多，BAT每家都出过，360的QConf、淘宝的diamond、
百度的disconf都是解决这类问题。国外也有很多开源的配置中心
Apache Commons Configuration、owner、cfg4j等等。
这些开源的软件以及解决方案都很优秀，但是我最钟爱的却是Spring Cloud Config，
因为它功能全面强大，可以无缝的和spring体系相结合，够方便够简单颜值高我喜欢。

'Spring Cloud Config'
在我们了解spring cloud config之前，
我可以想想一个'配置中心'提供的'核心功能'应该'有什么'

'提供服务端'和'客户端支持'
'集中管理'各'环境'的'配置文件'
'配置文件修改'之后，'可以快速'的'生效'
'可以'进行'版本管理'
'支持大'的'并发查询'
'支持''各种语言'
Spring Cloud Config可以完美的支持以上所有的需求。

'Spring Cloud Config'项目'是'一个'解决分布式系统'的配置'管理方案'。
它'包含'了'Client和Server''两个部分'，'server''提供配置文件'的'存储'、
'以接口'的形式'将配置文件'的内容'提供出去'，'client通过'接口'获取数据'、
'并依据'此数据'初始化''自己的应用'。'Spring cloud'使'用git''或svn存放''配置文件'，
'默认'情况下'使用git'，我们先以git为例做一套示例。

首先'在github'上面'创建'了一个'文件夹config-repo'用来'存放配置文件'，
为了模拟生产环境，我们创建以下'三个配置文件'：

// 开发环境
'neo-config-dev.properties'
// 测试环境
'neo-config-test.properties'
// 生产环境
'neo-config-pro.properties'
每个配置文件中都写一个'属性neo.hello',属性'值分别是' hello im 'dev'-'test'-'pro' 。
下面我们开始配置server端

'server' 端
1、添加'依赖'
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-config-server</artifactId>
	</dependency>
</dependencies>
只需要'加入spring-cloud-config-server包'引用既可。

2、'配置文件'
server:
  port: 8001
spring:
  application:
    name: spring-cloud-config-server
  cloud:
    config:
      server:
        git:
          uri: https://github.com/ityouknow/spring-cloud-starter/ 	# 配置git仓库的地址
          search-paths: config-repo                             	# git仓库地址下的相对地址，可以配置多个，用,分割。
          username:                                             	# git仓库的账号
          password:                                             	# git仓库的密码
Spring Cloud Config也'提供本地存储配置'的方式。
我们只需要'设置属性''spring.profiles.active=native'，
'Config Server'会'默认从应用'的src/main/resource目录下'检索配置文件'。
'也'可以'通过''spring.cloud.config.server.native.searchLocations=file:E:/properties/'属性来'指定配置文件'的'位置'。
虽然Spring Cloud Config提供了这样的功能，但是为了支持更好的管理内容和版本控制的功能，还是推荐使用git的方式。

3、启动类
'启动类''添加@EnableConfigServer'，'激活'对'配置中心'的'支持'

@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigServerApplication.class, args);
	}
}
到此server端相关配置已经完成

4、测试
首先我们'先要测试server端'是否可以'读取到github'上面的'配置信息'，
直接访问：'http://localhost:8001/neo-config/dev'

返回信息如下：

{
    "name": "neo-config", 
    "profiles": [
        "dev"
    ], 
    "label": null, 
    "version": null, 
    "state": null, 
    "propertySources": [
        {
            "name": "https://github.com/ityouknow/spring-cloud-starter/config-repo/neo-config-dev.properties", 
            "source": {
                "neo.hello": "hello im dev"
            }
        }
    ]
}
上述的返回的'信息''包含'了配置'文件'的'位置'、'版本'、配置'文件的名称'以及配置'文件'中的'具体内容'，
说明'server'端已经'成功获取'了git仓库的'配置信息'。

如果'直接查看'配置'文件'中的配置信息'可访问'：http://localhost:8001/neo-config-dev.properties，返回：neo.hello: hello im dev

'修改配置文件'neo-config-dev.properties中'配置信息'为：'neo.hello=hello im dev update',
再次在浏览器'访问http://localhost:8001/neo-config-dev.properties'，
返回：neo.hello: hello im dev update。说明'server端'会'自动读取最新提交'的'内容'

'仓库中'的'配置文件'会'被转换成''web接口'，访问可以'参照''以下的规则'：

'/{application}/{profile}[/{label}]'
'/{application}-{profile}.yml'
'/{label}/{application}-{profile}.yml'
'/{application}-{profile}.properties'
'/{label}/{application}-{profile}.properties'
'以''neo-config-dev.properties''为例'子，它的'application是neo-config'，'profile是dev'。
'client'会'根据填写的参数'来选择'读取对应的配置'。

client 端
主要'展示如何''在业务项目'中去'获取server端'的'配置信息'

1、添加'依赖'
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-config</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>
引入spring-boot-starter-web包方便web测试

2、配置文件
需要'配置两个配置文件'，'application.properties'和'bootstrap.properties'

'application.properties''如下'：
'spring.application.name'=spring-cloud-config-client
'server.port'=8002

'bootstrap.properties''如下'：
spring.cloud.config.name=neo-config
spring.cloud.config.profile=dev
spring.cloud.config.uri=http://localhost:8001/
spring.cloud.config.label=master
spring.application.name：'对应{application}部分'
spring.cloud.config.profile：'对应{profile}部分'
spring.cloud.config.label：'对应git的分支'。如果'配置中心'使用的'是本地存储'，则该'参数无用'
spring.cloud.config.uri：'配置中心'的'具体地址'
spring.cloud.config.discovery.service-id：'指定配置中心'的'service-id'，'便于扩展'为'高可用''配置集群'。
特别注意：上面'这些'与'spring-cloud相关'的'属性''必须配置在''bootstrap.properties中'，
'config部分'内容'才能'被'正确加载'。'因为config'的相关'配置'会'先于application.properties'，
而'bootstrap.properties'的'加载'也是'先于''application.properties'。

3、启动类
'启动类''添加@EnableConfigServer'，激活对配置中心的支持

@SpringBootApplication
public class ConfigClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigClientApplication.class, args);
	}
}
'启动类'只需'要@SpringBootApplication注解''就可以'

4、web测试
使用@Value注解来获取server端参数的值

@RestController
class HelloController {
    @Value("${neo.hello}")
    private String hello;

    @RequestMapping("/hello")
    public String from() {
        return this.hello;
    }
}
'启动项目'后'访问'：'http://localhost:8002/hello'，返回：hello im dev update说明
已经'正确'的'从server端''获取'到了'参数'。到此'一个完整'的'服务端提供配置服务'，
'客户端''获取配置参数'的'例子'就'完成了'。

我们在进行一些小实验，'手动修改''neo-config-dev.properties'中配置
信息为：'neo.hello=hello im dev update1''提交到github',再次'在浏览器'
访问'http://localhost:8002/hello'，返回：'neo.hello: hello im dev update'，
说明获取的'信息还是旧'的'参数'，这是'为什么呢'？因为'springboot项目'只有'在启动'
的时候'才会获取配置文件'的值，'修改github'信息后，'client端'并'没有在次'去'获取'，
所以'导致'这个'问题'。如何去解决这个问题呢？留到下一章我们在介绍。

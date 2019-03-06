'Hystrix-dashboard''是'一款'针对Hystrix'进行'实时监控'的'工具'，通过Hystrix Dashboard我们'可以'在
'直观'地'看到''各Hystrix Command'的'请求响应时间', 请求'成功率等数据'。
但是'只使用Hystrix Dashboard'的话, 你'只能看到'单个'应用内'的'服务信息', 这明显不够. 
我们'需要'一个'工具'能'让我们汇总'系统内'多个服务'的'数据'并'显示到Hystrix Dashboard'上, 
这个'工具'就'是Turbine'.

Hystrix Dashboard
我们在'熔断示例项目''spring-cloud-consumer-hystrix'的基础上'更改'，
'重新命名'为：spring-cloud-consumer-hystrix-dashboard。

1、添加'依赖'
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-hystrix</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-hystrix-dashboard</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
这三个包必须添加

2、启动类
启动类添加启用'Hystrix Dashboard'和'熔断器'

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableHystrixDashboard
@EnableCircuitBreaker
public class ConsumerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConsumerApplication.class, args);
	}
}

3、测试
启动工程后'访问 http://localhost:9001/hystrix，'将会看到如下界面：

图中会有一些提示：

Cluster via Turbine (default cluster): http://turbine-hostname:port/turbine.stream 
Cluster via Turbine (custom cluster): http://turbine-hostname:port/turbine.stream?cluster=[clusterName]
Single Hystrix App: http://hystrix-app:port/hystrix.stream

大概意思就是如果查看'默认集群'使'用第一个url',查看'指定集群'使'用第二个url','单个应用'的监控使'用最后一个'，
我们暂时'只演示''单个应用'的所以在'输入框'中'输入'： 'http://localhost:9001/hystrix.stream' ，
输入之后'点击 monitor'，进入页面。

如果没有请求会先显示Loading ...，访问'http://localhost:9001/hystrix.stream '也会不断的显示ping。

'请求服务''http://localhost:9001/hello/neo'，就'可以看到''监控'的效果了，
首'先访问http://localhost:9001/hystrix.stream'，显示如下：
ping:
data:{"type":...}
data:{"type":...}
说明已经'返回了监控'的'各项结果'

到'监控页面'就会'显示如下图'：

其实'就是http://localhost:9001/hystrix.stream'返回结果的'图形化'显示，
Hystrix Dashboard Wiki上详细说明了图上'每个指标'的'含义'，如下图：

到此'单个应用'的'熔断监控'已经'完成'。

'Turbine'
在'复杂'的'分布式系统'中，'相同服务'的'节点'经常'需要部署''上百'甚至'上千个'，很多时候，
'运维人员''希望'能够'把相同服务'的'节点状态'以一个'整体集群'的形式'展现出来'，
这样'可以更好'的'把握整个系统'的'状态'。 为此，'Netflix''提供'了一个'开源项目'
（'Turbine'）来'提供'把'多个hystrix.stream'的内容'聚合为一个数据源'供Dashboard'展示'。

1、'添加依赖'
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-turbine</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-netflix-turbine</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-actuator</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-hystrix-dashboard</artifactId>
	</dependency>
</dependencies>
2、配置文件
spring.application.name=hystrix-dashboard-turbine
server.port=8001
turbine.appConfig=node01,node02
turbine.aggregator.clusterConfig= default
turbine.clusterNameExpression= new String("default")
eureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka/
	
'turbine.appConfig' ：'配置'Eureka中的'serviceId列表'，表明'监控哪些服务'
'turbine.aggregator.clusterConfig' ：'指定聚合''哪些集群'，'多个使用”,”分割'，默认为default。
'可使用''http://.../turbine.stream?cluster={clusterConfig之一}''访问'

'turbine.clusterNameExpression' ： 
1.'clusterNameExpression''指定''集群名称'，'默认'表达式'appName'；
此时：'turbine.aggregator.clusterConfig'需'要配置''想要监控''的应用名称'；
2.当'clusterNameExpression: default'时，'turbine.aggregator.clusterConfig''可以不写'，因为默认就是default；
3.当'clusterNameExpression: metadata[‘cluster’]'时，
假设'想要监控的应用配置'了'eureka.instance.metadata-map.cluster: ABC'，'则需要配置'，
'同时turbine.aggregator.clusterConfig: ABC'

3、'启动类'
启动类'添加@EnableTurbine'，'激活对Turbine'的'支持'

@SpringBootApplication
@EnableHystrixDashboard
@EnableTurbine
public class DashboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(DashboardApplication.class, args);
	}

}
到此'Turbine'（hystrix-dashboard-turbine）'配置完成'

4、测试
在'示例项目'spring-cloud-consumer-hystrix'基础上''修改为''两个服务'的
'调用者''spring-cloud-consumer-node1'和'spring-cloud-consumer-node2'

spring-cloud-consumer-node1项目改动如下： application.properties文件内容

spring.application.name=node01
server.port=9001
feign.hystrix.enabled=true
eureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka/
	
	
spring-cloud-consumer-node2项目改动如下： application.properties文件内容

spring.application.name=node02
server.port=9002
feign.hystrix.enabled=true
eureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka/

	
HelloRemote类修改：

@FeignClient(name= "spring-cloud-producer2", fallback = HelloRemoteHystrix.class)
public interface HelloRemote {

    @RequestMapping(value = "/hello")
    public String hello2(@RequestParam(value = "name") String name);

}

对应的'HelloRemoteHystrix'和'ConsumerController类''跟随修改'，具体查看代码

修改完毕后，'依次启动''spring-cloud-eureka'、'spring-cloud-consumer-node1'、
'spring-cloud-consumer-node2'、'hystrix-dashboard-turbine'（Turbine）

'打开eureka后台'可以看到注册了'三个服务'：

访问 'http://localhost:8001/turbine.stream'

返回：

: ping
data: {"reportingHostsLast10Seconds":1,"name":"meta","type":"meta","timestamp":1494921985839}
并且'会不断刷新'以'获取实时'的'监控数据'，说明'和单个'的'监控类似'，'返回监控项目'的'信息'。进行'图形化监控'查看，
输入：'http://localhost:8001/hystrix'，'返回'酷酷的'小熊界面'，
输入：'http://localhost:8001/turbine.stream'，然后'点击 Monitor Stream' ,可以看到出现了'俩个监控列表'


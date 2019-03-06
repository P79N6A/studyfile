前面的文章我们介绍了，'Eureka'用于'服务的注册于发现'，
'Feign'支持'服务的调用'以及'均衡负载'，
'Hystrix'处理服务的'熔断'防止故障扩散，
Spring Cloud 'Config'服务'集群配置中心'，似乎一个微服务框架已经完成了。

我们还是少考虑了一个问题，'外部的应用'如何来'访问内部''各种各样'的'微服务'呢？
在'微服务架构'中，'后端服务'往往'不直接''开放给调用端'，而是'通过'一个'API网关'
'根据请求的url'，'路由''到相应的服务'。当'添加API网关'后，在'第三方调用端'和
'服务提供方'之间就'创建了一面墙'，这面墙'直接与调用方通信''进行权限控制'，
后将请求均衡分发给后台服务端。

为什么需要API Gateway
1、'简化''客户端调用''复杂度'
在'微服务架构'模式下'后端服务'的'实例数'一般'是动态的'，
对于'客户端'而言'很难发现动态改变'的'服务实例'的访问地址信息。
因此'在基于微服务'的'项目中''为'了'简化前端'的'调用逻辑'，
通常'会引入'API Gateway作为'轻量级网关'，
'同时'API Gateway中'也会实现相关'的'认证逻辑'从而'简化内部服务'之间相互'调用的复杂度'。

2、'数据裁剪'以及'聚合'
通常而言'不同'的'客户端''对'于'显示'时对于'数据的需求'是'不一致'的，
比如'手机端'或者'Web端'又或者在'低延迟的网络环境'或者'高延迟'的'网络环境'。
因此'为'了'优化客户端'的使用'体验'，'API Gateway可'以'对通用性'的'响应数据'
进行'裁剪'以'适应不同''客户端'的使用'需求'。
同时'还可'以'将多个API调用''逻辑'进行'聚合'，从而'减少客户端'的'请求数'，'优化客户端'用户'体验'

3、多渠道支持
当然我们'还可'以'针对不同'的'渠道''和客户端''提供不同'的'API Gateway',
对于'该模式'的使用'由另'外'一个'大家'熟知的方式'叫'Backend for front-end', 
'在Backend for front-end模式当中'，
我们'可以针对不同'的'客户端'分别'创建其BFF'，
进一步了解BFF可以参考这篇文章：Pattern: Backends For Frontends

4、'遗留系统'的'微服务化改造'
对于'系统而言'进行'微服务改造'通常'是由于''原有'的'系统''存在'或多或少的'问题'，
比如'技术债务'，'代码质量'，'可维护性'，'可扩展性'等等。
'API Gateway'的模式'同样适用'于这一类'遗留系统'的'改造'，
'通过微服务化'的'改造''逐步实现'对'原有系统'中的'问题的修复'，
从而'提升'对于'原有业务''响应力'的提升。
通过'引入抽象层'，逐步'使用新'的'实现替换旧的实现'。

在Spring Cloud体系中，'Spring Cloud Zuul'就是'提供负载均衡'、'反向代理'、'权限认证的'一个'API gateway'。

Spring Cloud 'Zuul'
Spring Cloud 'Zuul路由'是'微服务架构'的'不可或缺'的'一部分'，'提供动态路由'，'监控'，'弹性'，
'安全''等'的'边缘服务'。'Zuul''是Netflix出品'的一个'基于JVM路由'和'服务端'的'负载均衡器'。

下面我们通过代码来了解Zuul是如何工作的

'简单使用'
'1、添加依赖'
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-zuul</artifactId>
</dependency>
'引入spring-cloud-starter-zuul包'

'2、配置文件'
spring.application.name=gateway-service-zuul
server.port=8888

'#这里的配置表示，访问/it/** 直接重定向到http://www.ityouknow.com/**'
zuul.routes.baidu.path=/it/**
zuul.routes.baidu.url=http://www.ityouknow.com/
	
'3、启动类'
@SpringBootApplication
@EnableZuulProxy
public class GatewayServiceZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceZuulApplication.class, args);
	}
}
启动类添加@EnableZuulProxy，支持网关路由。

史上'最简单'的'zuul案例'就'配置完了'

'4、测试'
'启动gateway-service-zuul-simple项目'，在浏览器中'访问：http://localhost:8888/it/spring-cloud'，
看到'页面返回'了：'http://www.ityouknow.com/spring-cloud' 页面的信息，如下：

我们以前面文章的示例代码spring-cloud-producer为例来测试请求的重定向，在'配置文件'中'添加'：

zuul.routes.hello.path=/hello/**
zuul.routes.hello.url=http://localhost:9000/
'启动spring-cloud-producer'，重新'启动gateway-service-zuul-simple'，
'访问'：'http://localhost:8888/hello/hello?name=%E5%B0%8F%E6%98%8E'，返回：hello 小明，this is first messge

说明'访问gateway-service-zuul-simple'的'请求自动转发''到'了'spring-cloud-producer'，并且将结果返回。

'服务化'
'通过url映射'的方式来'实现zull'的'转发''有局限性'，比如'每增加一个服务'就需'要配置一条内容'，
另外'后端的服务'如果'是动态来提供'，就'不能采用''这种方案'来'配置'了。实际上在'实现''微服务'架构'时'，
'服务名'与'服务实例'地址的关系'在eureka server'中'已经存在'了，
所以只需'要将Zuul注册到eureka server'上去'发现其他服务'，'就可'以'实现对serviceId的映射'。

我们'结合示例'来'说明'，在'上面示例项目''gateway-service-zuul-simple'的基础上'来改造'。

'1、添加依赖'
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
</dependency>
'增加spring-cloud-starter-eureka包'，'添加对eureka的支持'。

'2、配置文件'
'配置修改为：'
spring.application.name=gateway-service-zuul
server.port=8888

zuul.routes.api-a.path=/producer/**
zuul.routes.api-a.serviceId=spring-cloud-producer

eureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka/
	
'3、测试'
'依次启动' 'spring-cloud-eureka'、 'spring-cloud-producer'、'gateway-service-zuul-eureka'，
'访问'：'http://localhost:8888/producer/hello?name=%E5%B0%8F%E6%98%8E'，返回：hello 小明，this is first messge

说明'访问gateway-service-zuul-eureka'的'请求自动转发到'了'spring-cloud-producer'，并且'将结果返回'。
为了更好的'模拟服务集群'，我们'复制spring-cloud-producer'项目改为'spring-cloud-producer-2'，
'修改spring-cloud-producer-2'项目'端口为9001'，'controller代码修改如下'：

@RestController
public class HelloController {
	
    @RequestMapping("/hello")
    public String index(@RequestParam String name) {
        return "hello "+name+"，this is two messge";
    }
}
'修改完成后启动''spring-cloud-producer-2'，'重启gateway-service-zuul-eureka'。
测试'多次访问http://localhost:8888/producer/hello?name=%E5%B0%8F%E6%98%8E'，依次返回：

hello 小明，this is first messge
hello 小明，this is two messge
hello 小明，this is first messge
hello 小明，this is two messge
...
说明通过'zuul成功调用了producer服务'并且'做了均衡负载'。

网关的默认路由规则
但是如果后端服务多达十几个的时候，每一个都这样配置也挺麻烦的，
spring cloud zuul已经帮我们做了默认配置。默认情况下，
Zuul会代理所有注册到Eureka Server的微服务，
并且Zuul的路由规则如下：http://ZUUL_HOST:ZUUL_PORT/微服务在Eureka上的serviceId/**会被转发到serviceId对应的微服务。

我们注销掉gateway-service-zuul-eureka项目中关于路由的配置：

#zuul.routes.api-a.path=/producer/**
#zuul.routes.api-a.serviceId=spring-cloud-producer
重新启动后，访问http://localhost:8888/spring-cloud-producer/hello?name=%E5%B0%8F%E6%98%8E，测试返回结果和上述示例相同，说明spirng cloud zuul默认已经提供了转发功能。

到此zuul的基本使用我们就介绍完了。关于zuul更高级使用，我们下篇再来介绍。

参考：

API网关那些儿

示例代码-github

示例代码-码云

作者：纯洁的微笑
出处：http://www.ityouknow.com/
版权归作者所有，转载请注明出处
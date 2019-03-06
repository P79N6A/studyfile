说起'springcloud熔断'让我想起了去年股市中的熔断，多次痛的领悟，
随意实施的熔断对整个系统的影响是灾难性的，好了接下来我们还是说正事。

'熔断器'
雪崩效应
在'微服务'架构中通常会'有多个服务层''调用'，'基础服务'的'故障'可能'会导致级联故障'，
进而'造成整个系统''不可用'的情况，'这种现象'被称'为服务雪崩效应'。
服务'雪崩效应''是'一种因“服务'提供者'”的'不可用''导致'“服务'消费者'”的'不可用',
'并将不可用'逐渐'放大的过程'。

如果下：'A作为'服务'提供者'，'B为A'的服务'消费者'，'C和D'是'B的服务消费者'。
'A不可用''引起'了'B的不可用'，并将'不可用'像滚雪球一样'放大到C和D时'，'雪崩效应就形成了'。

熔断器（CircuitBreaker）
'熔断器'的'原理很简单'，如同电力过载保护器。它'可以''实现''快速失败'，
'如果它'在'一段时间内''侦测到''许多类似的错误'，'会强迫'其'以后的多个调用''快速失败'，
'不再访问'远程'服务器'，从而'防止应用程序''不断地尝试执行'可能'会失败的操作'，
'使得应用程序'继续'执行'而'不用等待修正错误'，'或者浪费CPU时间'去'等到长时间'的'超时产生'。
'熔断器'也'可以使''应用程序'能够'诊断错误''是否''已经修正'，
如果'已经修正'，应用程序'会再次尝试调用'操作。

'熔断器模式'就'像是'那些容易导致'错误的操作''的'一种'代理'。
这种代理'能够记录''最近'调用发生'错误的次数'，然后决定使用'允许操作继续'，
'或'者'立即返回错误'。

熔断器就'是保护服务高可用'的'最后一道防线'。

'Hystrix特性'
1.断路器机制
'断路器'很'好理解', 当Hystrix Command请求'后端服务失败数'量'超过一定比例'(默认50%), 
'断路器'会'切换到开路状态'(Open). 这时'所有请求'会'直接失败'而'不会发送到后端'服务. 
'断路器'保持'在开路状态''一段时间后'(默认5秒), '自动切换'到'半开路状态'(HALF-OPEN). 
这时'会判断''下一次请求'的'返回情况', 如果请求'成功', 断路器'切回闭路'状态(CLOSED), 
'否则'重新'切换到开路'状态(OPEN). 
Hystrix的断路器'就像'我们'家庭电路'中的'保险丝', 
一旦'后端服务''不可用', 断路器会'直接切断'请求链, '避免'发送'大量无效请求'影响系统吞吐量, 
并且'断路器'有'自我检测''并恢复''的能力'.

2.Fallback
'Fallback'相当于'是降级操作'. 对于'查询操作', 我们'可以实现'一个'fallback方法',
当'请求后端服务'出现'异常的时候', 可以使'用fallback方法''返回'的值. 
'fallback方法'的'返回值'一般'是设置的默认值''或'者'来自缓存'.

3.资源隔离
在'Hystrix中', 主要'通过线程池'来'实现''资源隔离'. 
通常在'使用'的'时'候我们会'根据'调用的'远程服务''划分'出多个'线程池'. 
例如'调用产品服务'的'Command放入A线程池', 调用'账户服务的Command''放入B线程池'. 
这样做的主要优点是'运行环境''被隔离开'了. 
这样'就算'调用'服务'的'代码''存在bug'或者由于其他原因导致自己所在线程池被耗尽时, 
'不'会'对系统'的'其他服务''造成影响'. 但是带来的'代价'就'是维护多个线程池'会'对'
'系统带来''额外'的'性能开销'. 
'如果'是'对性能''有严格要求'而且'确信自己''调用服务'的'客户端代码''不会出问题'的话, 
可以'使用Hystrix的信号模式'(Semaphores)来'隔离资源'.

Feign Hystrix
因为'熔断''只'是'作用在''服务调用'这一'端'，因此我们'根据上一篇'的'示例代码''只需'要
'改动spring-cloud-consumer项目''相关代码''就可以'。因为，'Feign'中'已经依赖'了'Hystrix'
所以'在maven配置'上'不用做任何改动'。

1、'配置文件'
application.properties'添加这一条'：

'feign.hystrix.enabled=true'

2、'创建回调类'
创建'HelloRemoteHystrix类''继承'与'HelloRemote''实现回调'的'方法'

@Component
public class HelloRemoteHystrix implements HelloRemote{

    @Override
    public String hello(@RequestParam(value = "name") String name) {
        return "hello" +name+", this messge send failed ";
    }
}

3、'添加fallback属性'
'在HelloRemote类''添加'指定'fallback类'，在'服务熔断'的时候'返回fallback类'中'的内容'。

@FeignClient(name= "spring-cloud-producer",fallback = HelloRemoteHystrix.class)
public interface HelloRemote {

    @RequestMapping(value = "/hello")
    public String hello(@RequestParam(value = "name") String name);

}
改动点就这点，很简单吧。

4、测试
那我们就来测试一下看看效果吧。

依次启动spring-cloud-eureka、spring-cloud-producer、spring-cloud-consumer三个项目。

浏览器中输入：'http://localhost:9001/hello/neo'

返回：hello neo，this is first messge

说明加入熔断相关信息后，'不影响正常'的'访问'。接下来我们'手动停止''spring-cloud-producer'项目'再次'测试：

浏览器中输入：http://localhost:9001/hello/neo

返回：hello neo, this messge send failed

根据返回结果'说明熔断成功'。


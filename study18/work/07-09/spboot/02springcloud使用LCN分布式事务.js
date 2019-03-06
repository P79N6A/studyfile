本人使用LCN4.1.0版本（数据库是mysql，注册中心eureka）
'LCN分布式事务官网'：'http://www.txlcn.org/'
'springcloud的demo'：'https://github.com/codingapi/springcloud-lcn-demo'
'tx-manager''事务控制器''服务端'：'https://github.com/codingapi/tx-lcn'

1、'maven依赖'
<!-- LCN分布式事务相关依赖 -->
<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>transaction-springcloud</artifactId>
    <version>${lcn.last.version}</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>*</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>tx-plugins-db</artifactId>
    <version>${lcn.last.version}</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>*</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<properties>
	<!-- LCN分布式事务版本 -->
	<lcn.last.version>4.1.0</lcn.last.version>
</properties>
2、'tx-manager'

'作者提供'的'tx-manager''是LCN分布式事务'的事务'中间件'，需'要springcloud'微服务框架需要'与tx-manager进行通信'，
'通过tx-manager''协调微服务'之间的'事务调用'。

'tx-manager'需'要配置redis'和'注册中心'（'源码默认'配置'eureka'，'参考作者官网'也'可以配置zookeeper'）

配置在'源码'的'application.property文件'
#######################################txmanager-start#################################################
#服务端口
server.port=8899
 
#tx-manager不得修改
spring.application.name=tx-manager

'spring.mvc.static-path-pattern=/**'
spring.resources.static-locations=classpath:/static/
#######################################txmanager-end#################################################
 
 
#zookeeper地址
#spring.cloud.zookeeper.connect-string=127.0.0.1:2181
#spring.cloud.zookeeper.discovery.preferIpAddress = true
 
#eureka 地址
eureka.client.service-url.defaultZone=http://127.0.0.1:8761/eureka/
eureka.instance.prefer-ip-address=true
 
#######################################redis-start#################################################
#redis 配置文件，根据情况选择集群或者单机模式
 
##redis 集群环境配置
##redis cluster
#spring.redis.cluster.nodes=127.0.0.1:7001,127.0.0.1:7002,127.0.0.1:7003
#spring.redis.cluster.commandTimeout=5000
 
##redis 单点环境配置
#redis
#redis主机地址
spring.redis.host=127.0.0.1
#redis主机端口
spring.redis.port=6379
#redis链接密码
spring.redis.password=
spring.redis.pool.maxActive=10
spring.redis.pool.maxWait=-1
spring.redis.pool.maxIdle=5
spring.redis.pool.minIdle=0
spring.redis.timeout=0
#####################################redis-end###################################################
 
 
 
 
#######################################LCN-start#################################################
#业务模块与TxManager之间通讯的最大等待时间（单位：秒）
#通讯时间是指：发起方与响应方之间完成一次的通讯时间。
#该字段代表的是Tx-Client模块与TxManager模块之间的最大通讯时间，超过该时间未响应本次请求失败。
tm.transaction.netty.delaytime = 5
 
#业务模块与TxManager之间通讯的心跳时间（单位：秒）
tm.transaction.netty.hearttime = 15
 
#存储到redis下的数据最大保存时间（单位：秒）
#该字段仅代表的事务模块数据的最大保存时间，补偿数据会永久保存。
tm.redis.savemaxtime=30
 
#socket server Socket对外服务端口
#TxManager的LCN协议的端口
tm.socket.port=9999
 
#最大socket连接数
#TxManager最大允许的建立连接数量
tm.socket.maxconnection=100
 
#事务自动补偿 (true:开启，false:关闭)
# 说明：
# 开启自动补偿以后，必须要配置 tm.compensate.notifyUrl 地址，仅当tm.compensate.notifyUrl 在请求补偿确认时返回success或者SUCCESS时，才会执行自动补偿，否则不会自动补偿。
# 关闭自动补偿，当出现数据时也会 tm.compensate.notifyUrl 地址。
# 当tm.compensate.notifyUrl 无效时，不影响TxManager运行，仅会影响自动补偿。
tm.compensate.auto=false
 
#事务补偿记录回调地址(rest api 地址，post json格式)
#请求补偿是在开启自动补偿时才会请求的地址。请求分为两种：1.补偿决策，2.补偿结果通知，可通过通过action参数区分compensate为补偿请求、notify为补偿通知。
#*注意当请求补偿决策时，需要补偿服务返回"SUCCESS"字符串以后才可以执行自动补偿。
#请求补偿结果通知则只需要接受通知即可。
#请求补偿的样例数据格式:
#{"groupId":"TtQxTwJP","action":"compensate","json":"{\"address\":\"133.133.5.100:8081\",\"className\":\"com.example.demo.service.impl.DemoServiceImpl\",\"currentTime\":1511356150413,\"data\":\"C5IBLWNvbS5leGFtcGxlLmRlbW8uc2VydmljZS5pbXBsLkRlbW9TZXJ2aWNlSW1wbAwSBHNhdmUbehBqYXZhLmxhbmcuT2JqZWN0GAAQARwjeg9qYXZhLmxhbmcuQ2xhc3MYABABJCo/cHVibGljIGludCBjb20uZXhhbXBsZS5kZW1vLnNlcnZpY2UuaW1wbC5EZW1vU2VydmljZUltcGwuc2F2ZSgp\",\"groupId\":\"TtQxTwJP\",\"methodStr\":\"public int com.example.demo.service.impl.DemoServiceImpl.save()\",\"model\":\"demo1\",\"state\":0,\"time\":36,\"txGroup\":{\"groupId\":\"TtQxTwJP\",\"hasOver\":1,\"isCompensate\":0,\"list\":[{\"address\":\"133.133.5.100:8899\",\"isCompensate\":0,\"isGroup\":0,\"kid\":\"wnlEJoSl\",\"methodStr\":\"public int com.example.demo.service.impl.DemoServiceImpl.save()\",\"model\":\"demo2\",\"modelIpAddress\":\"133.133.5.100:8082\",\"channelAddress\":\"/133.133.5.100:64153\",\"notify\":1,\"uniqueKey\":\"bc13881a5d2ab2ace89ae5d34d608447\"}],\"nowTime\":0,\"startTime\":1511356150379,\"state\":1},\"uniqueKey\":\"be6eea31e382f1f0878d07cef319e4d7\"}"}
#请求补偿的返回数据样例数据格式:
#SUCCESS
#请求补偿结果通知的样例数据格式:
#{"resState":true,"groupId":"TtQxTwJP","action":"notify"}
tm.compensate.notifyUrl=http://ip:port/path
 
#补偿失败，再次尝试间隔（秒），最大尝试次数3次，当超过3次即为补偿失败,失败的数据依旧还会存在TxManager下。
tm.compensate.tryTime=30
 
#各事务模块自动补偿的时间上限(毫秒)
#指的是模块执行自动超时的最大时间，该最大时间若过段会导致事务机制异常，该时间必须要模块之间通讯的最大超过时间。
#例如，若模块A与模块B，请求超时的最大时间是5秒，则建议改时间至少大于5秒。
tm.compensate.maxWaitTime=5000
#######################################LCN-end#################################################
 
 
 
 
logging.level.com.codingapi=debug

3、'微服务'中'引入LCN事务'

（1）'配置tx-manager'的'url地址'，'每个微服务''都需要配置'
方式一：使'用默认方式'是'添加tx.properties'文件，'内容如下'
'#txmanager地址'
'url=http://127.0.0.1:8899/tx/manager/'

方式二： '自定义url'的配置.
'编写配置文件'到'application.properties文件下'

'key：tm.manager.url'

如'tm.manager.url=http://127.0.0.1:8899/tx/manager/'。

'重写''读取配置文件'的'类TxManagerTxUrlService'。

import com.codingapi.tx.config.service.TxManagerTxUrlService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class TxManagerTxUrlServiceImpl implements TxManagerTxUrlService{
 
    @Value("${tm.manager.url}")
    private String url;
 
    @Override
    public String getTxUrl() {
        System.out.println("load tm.manager.url ");
        return url;
    }
}
'配置文件'
'#txmanager地址'
tm.manager.url=http://127.0.0.1:8899/tx/manager/
（2）'如何将tx-manager'的'访问地址''设置为''服务发现''的方式'.
'重写'写'TxManagerHttpRequestService''自定义方法'方式.
'demo'里面是'调用方微服务'才'添加这个'

import com.codingapi.tx.netty.service.TxManagerHttpRequestService;
import com.lorne.core.framework.utils.http.HttpUtils;
import org.springframework.stereotype.Service;
 
@Service
public class TxManagerHttpRequestServiceImpl implements TxManagerHttpRequestService{
 
    @Override
    public String httpGet(String url) {
        System.out.println("httpGet-start");
        String res = HttpUtils.get(url);
        System.out.println("httpGet-end");
        return res;
    }
 
    @Override
    public String httpPost(String url, String params) {
        System.out.println("httpPost-start");
        String res = HttpUtils.post(url,params);
        System.out.println("httpPost-end");
        return res;
    }
}

（3）'调用方''添加注解'@TxTransaction(isStart = true)
注：同时也要'添加普通的spring事务注解'

    @Override
    @TxTransaction(isStart = true)
    @Transactional
    public int save() throws Exception {
 
    	//本地微服务
        int rs1 = testMapper.save("mybatis-hello-1");
        //被调用方微服务
        int rs2 = demo2Client.save();
 
//        int rs22 = demo2Client.save();
 
        int v = 100/0;
        
        return rs1+rs2;
    }
（4）'被调用方微服务'里面需'要分布式事务''调用的类'要'继承接口ITxTransaction'

import com.codingapi.tx.annotation.ITxTransaction;
import com.example.demo.dao.TestMapper;
import com.example.demo.entity.Test;
import com.example.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
 
@Service
public class DemoServiceImpl implements DemoService ,ITxTransaction{
 
    @Autowired
    private TestMapper testMapper;
 
 
 
    @Override
    public List<Test> list() {
        return testMapper.findAll();
    }
 
    //被调用的方法，添加普通的spring事务注解
    @Override
    @Transactional
    public int save() {
 
        int rs = testMapper.save("mybatis-hello-2");
 
        return rs;
    }
}
（5）'只要'整个分布式调用过程中'抛RuntimeException异常'，则'分布式事务'能'正常触发回滚'，亲测可行


LCN分布式事务框架v4.0
"LCN并不生产事务，LCN只是本地事务的协调者"

框架介绍
'LCN''分布式事务框架'的核心功能是'对本地事务'的'协调控制'，'框架'本身并'不创建事务'，
'只是对本地事务'做'协调控制'。因此该框架'与'其他'第三方的框架''兼容性强'，
'支持所有'的'关系型数据库事务'，'支持多数据源'，'支持'与'第三方数据库'框架'一块使用'
（例如 sharding-jdbc），在使'用框架的时候'只需'要添加''分布式事务'的'注解即可'，
对'业务'的'侵入性低'。LCN框架'主要是''为微服务框架''提供分布式''事务的支持'，
在'微服务框架'上'做'了'进一步'的'事务机制优化'，
'在一些负载场景'上'LCN事务机制'要'比本地事务机制'的'性能更好'，
'4.0以后''框架开方'了'插件机制'可以'让更多'的'第三方框架''支持进来'。

官方网址
https://www.txlcn.org

框架特点
'支持'各种'基于spring的db框架'
兼容SpringCloud、Dubbo、motan
'使用简单'，'低依赖'，代码完全开源
'基于切面'的'强一致性事务'框架
'高可用'，'模块'可以'依赖RPC模块'做'集群化'，'TxManager''也可以'做'集群化'
'支持本地事务'和'分布式事务共存'
'支持事务补偿机制'，'增加''事务补偿决策''提醒'
添加'插件拓展机制'

目录说明
transaction-dubbo LCN 'dubbo rpc框架扩展支持'

transaction-springcloud LCN 'springcloud rpc框架扩展支持'

transaction-motan LCN 'motan rpc框架扩展支持'

tx-client 是LCN'核心tx模块端控制框架'

tx-manager 是LCN '分布式事务协调器'

tx-plugins-db 是LCN 对'关系型数据库的插件支持'

使用说明
分布式事务'发起方'：

    @Override
    @TxTransaction(isStart=true)
    @Transactional
    public boolean hello() {
        //本地调用
        testDao.save();
        //远程调用方
        boolean res =  test2Service.test();
        //模拟异常
        int v = 100/0;
        return true;
    }
    
    
分布式事务'被调用方'(test2Service的业务实现类)

    @Override
    @Transactional
    @TxTransaction
    public boolean test() {
        //本地调用
        testDao.save();
        return true;
    }

如上'代码执行完'成以后'两个模块''都将回滚事务'。

说明：在'使用LCN'分布式事务'时'，'只需要''将事务的开始方法''添加@TxTransaction(isStart=true)'
注解即可,在'参与方添加@TxTransaction''或者实现ITxTransaction接口'即可。详细见demo教程

关于@TxTransaction 使用说明
'@TxTransaction注解''是分布式事务'的'标示'。

若存在业务方法：'a->b' 'b->c' 'b->d'，那么'开启分布式事务注解'的话，需'要在各个模块方法'上'添加@TxTransaction'即可。

    @TxTransaction(isStart=true)
    @Transactional
    public void a(){
        b();
    }
    
    @TxTransaction
    public void b(){
        c();
        d();
    }
    
    @TxTransaction
    public void c(){}
    
    @TxTransaction
    public void d(){}
    
'maven' '中心库地址'
<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>tx-client</artifactId>
    <version>${lcn.last.version}</version>
</dependency>

<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>tx-plugins-db</artifactId>
    <version>${lcn.last.version}</version>
</dependency>

<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>transaction-dubbo</artifactId>
    <version>${lcn.last.version}</version>
</dependency>      

<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>transaction-motan</artifactId>
    <version>${lcn.last.version}</version>
</dependency>  

<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>transaction-springcloud</artifactId>
    <version>${lcn.last.version}</version>
</dependency>    
        
依赖gradle等形式，见中心库

http://mvnrepository.com/search?q=codingapi

demo演示教程
每个demo下有区分为 jdbc/hibernate/mybatis不同框架的版本demo

springcloud版本

dubbo版本

motan版本

技术交流群：554855843
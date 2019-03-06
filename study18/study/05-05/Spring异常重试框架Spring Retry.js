Spring Retry'支持'集成'到Spring'或者'Spring Boot'项目'中'，而它'支持AOP'的'切面注入'写法，
所以在引入时必须'引入aspectjweaver.jar包'。

快速集成的代码样例：
@Configuration
'@EnableRetry'
public class Application {

    @Bean
    public Service service() {
        return new Service();
    }

}

@Service
class Service {
    '@Retryable'(RemoteAccessException.class)
    public service() {
        // ... do something
    }
}

下面是'基于Spring Boot'项目的'集成步骤'：
<!-- Spring Retry -->
<dependency>
    <groupId>org.springframework.retry</groupId>
    <artifactId>spring-retry</artifactId>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
</dependency>

Service：
@Service
public class RemoteService {
    
    private final static Logger logger = LoggerFactory.getLogger(RemoteService.class);
    
    '@Retryable'(value = { RemoteAccessException.class }, maxAttempts = 3, backoff = '@Backoff'(delay = 5000l, multiplier = 1))
    public void call() throws Exception {
        logger.info(LocalTime.now()+" do something...");
        throw new RemoteAccessException("RPC调用异常");
    }

    '@Recover'
    public void recover(RemoteAccessException e) {
        logger.info(e.getMessage());
    }
}

'@Retryable'注解
被'注解的方法'发生'异常时'会'重试'
value：'指定'发生的'异常'进行重试 
include：和'value一样'，默认空，当'exclude'也'为空时'，'所有异常'都'重试' 
exclude：'指定'异常'不重试'，默认空，当include也为空时，所有异常都重试 
maxAttemps：'重试次数'，默认3 
backoff：'重试补偿'机制，默认没有


'@Backoff'注解
'delay':指定'延迟后重试' 
'multiplier':指定'延迟的倍数'，比如delay=5000l,multiplier=2时，第一次重试为5秒后，第二次为10秒，第三次为20秒


'@Recover'
当'重试'到达'指定次数'时，被'注解'的'方法'将'被回调'，可以在该方法中进行日志处理。需要注意的是'发生的异常'和'入参类型一致'时'才会回调'。

Controller：

@RestController
public class TestController {
    
    @Autowired
    private RemoteService remoteService;
    
    @RequestMapping("/show")
    public String show(){
        try {
            remoteService.call();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            //e.printStackTrace();
        }
        return "Hello World";        
    }
}

App：
@SpringBootApplication
@EnableRetry
public class App {
    public static void main( String[] args ){
        SpringApplication.run(App.class, args);
    }
}

说明：

1、'使用了@Retryable'的方法'不能'在'本类'被'调用'，不然重试机制不会生效。
也就是'要标记为@Service'，然后'在其它类使用@Autowired注入''或者''@Bean去实例''才能生效'。

2、'要触发@Recover'方法，那么'在@Retryable方法'上'不能有返回值'，只能是void才能生效。

3、使'用了@Retryable'的方法里面'不能使用try...catch'包裹，'要'在发放上'抛出异常'，'不然不会触发'。

4、在'重试期间'这个'方法是同步的'，如果'使用'类似Spring Cloud这种框架的'熔断机制'时，
'可'以'结合重试机制'来'重试后返回结果'。

5、'Spring Retry不只'能'注入方式'去'实现'，还'可以通过API'的方式'实现'，
类似熔断处理的机制就基于API方式实现会比较宽松。


Spring Boot提倡'约定优于配置'，'如何将类'的'生命周期交给spring'


1、'第一'种'自己写的类'，'Controller，Service'。 用@controller @service即可

2、'第二'种，'集成'其它'框架'，比'如'集成'shiro'权限框架，集成'mybatis分页'插件PageHelper，
'第三方'框架的'核心类'都要'交于Spring'大管家'管理'

'@Configuration'可'理解为'用'spring'的时候xml里面的'<beans>标签'

'@Bean'可'理解为'用spring的时候xml里面的'<bean>标签'

Spring Boot不是spring的加强版，所以'@Configuration和@Bean'同样可以用在普通的spring项目中，
而'不是Spring Boot特有'的，只是在spring用的时候，注意加上扫包配置

<context:component-scan base-package="com.xxx.xxx" />，
'普通'的'spring项目'好多'注解'都'需要扫包'，'才有用'，有时候自己注解用的挺6，但不起效果，就要注意这点。

'Spring Boot'则'不需要'，主'要'你'保证'你的'启动Spring Boot main入口'，'在这些类'的'上层包就行'


就像这样，'DemoApplication'是'启动类'，关于启动类的'位置'放置，在另一篇博客有专门的去分析。

'@Configuration'和'@Bean'的Demo类

@Configuration    
public class ExampleConfiguration {
	
    @Value("com.mysql.jdbc.Driver")    
    private String driverClassName;    
    
    @Value("jdbc://xxxx.xx.xxx/xx")    
    private String driverUrl;    
    
    @Value("${root}")    
    private String driverUsername;    
    
    @Value("123456")    
    private String driverPassword;    
    
    @Bean(name = "dataSource")    
    public DataSource dataSource() {    
        BasicDataSource dataSource = new BasicDataSource();    
        dataSource.setDriverClassName(driverClassName);    
        dataSource.setUrl(driverUrl);    
        dataSource.setUsername(driverUsername);    
        dataSource.setPassword(driverPassword);    
        return dataSource;    
    }    
    
    @Bean    
    public PlatformTransactionManager transactionManager() {    
        return new DataSourceTransactionManager(dataSource());    
    }    
    
}  


'这样'，在项目中
@Autowired
private DataSource dataSource;

的时候，这个'dataSource'就'是'我们在'ExampleConfiguration'中配'的DataSource'








开发环境的调试
'热启动'在正常'开发项目中'已经'很常见'了吧，虽然'平时开发web项目'过程中，
'改动项目'启重启'总是报错'；
'但springBoot'对'调试支持很好'，'修改之后'可以'实时生效'，需要'添加以下的配置''：

<dependencies>
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-devtools</artifactId>
	    <optional>true</optional>
	</dependency>
</dependencies>

<build>
	<plugins>
	    <plugin>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-maven-plugin</artifactId>
	        <configuration>
	            <fork>true</fork>
	        </configuration>
	    </plugin>
	</plugins>
</build>

'该模块'在完整的打包环境下'运行的时候'会'被禁用'。如果你'使用java -jar启动'应用
或者'用一个特定的classloader启动'，它会'认为这是一个“生产环境”'。

上篇文章介绍了Spring boot初级教程：spring boot(一)：入门篇，方便大家快速入门、
了解实践Spring boot特性；本篇文章接着上篇内容继续为大家介绍
'spring boot的其它特性'
（'有些未必是'spring boot'体系桟的功能'，但是是'spring特别推荐的'一些'开源技术本文'也会介绍），
对了这里只'是一个大概的介绍'，特别详细的使用我们会在其它的文章中来展开说明。

spring boot web'开发非常'的'简单'，其中包括'常用的json输出'、'filters'、'property'、'log等'

json 接口开发
在'以前的spring 开发'的时候需要我们'提供json接口'的时候需要做那些配置呢
'添加 jackjson 等相关jar包'
'配置spring controller扫描'
'对接的方法添加@ResponseBody'
就这样我们会经常'由于配置错误，导致406错误等等'，
'spring boot'如何做呢，'只需要类添加 @RestController'  '即可'，
默认'类中的方法'都会'以json的格式返回'

如果我们'需要使用页面开发''只要使用 @Controller' ，下面会'结合模板来说明'


'自定义Filter'
我们常常在项目中会'使用filters用于录调用日志'、'排除有XSS威胁的字符'、'执行权限验证'等等。
Spring Boot自动'添加了OrderedCharacterEncodingFilter'和'HiddenHttpMethodFilter'，
并且我们可以'自定义Filter'。

1.实现Filter接口，实现Filter方法
2.添加@Configuration 注解，将自定义Filter加入过滤链
@Configuration
public class WebConfiguration {
    @Bean
    public RemoteIpFilter remoteIpFilter() {
        return new RemoteIpFilter();
    }
    
    @Bean
    public FilterRegistrationBean testFilterRegistration() {

        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new MyFilter());
        registration.addUrlPatterns("/*");
        registration.addInitParameter("paramName", "paramValue");
        registration.setName("MyFilter");
        registration.setOrder(1);
        return registration;
    }
    
    public class MyFilter implements Filter {
		@Override
		public void destroy() {
			// TODO Auto-generated method stub
		}

		@Override
		public void doFilter(ServletRequest srequest, ServletResponse sresponse, FilterChain filterChain)
				throws IOException, ServletException {
			// TODO Auto-generated method stub
			HttpServletRequest request = (HttpServletRequest) srequest;
			System.out.println("this is MyFilter,url :"+request.getRequestURI());
			filterChain.doFilter(srequest, sresponse);
		}

		@Override
		public void init(FilterConfig arg0) throws ServletException {
			// TODO Auto-generated method stub
		}
    }
}

'自定义Property'
在web开发的过程中，我经常需要'自定义一些配置文件'，'如何使用呢'

'log配置'
配置'输出的地址'和'输出级别'
logging.path=/user/local/log
logging.level.com.favorites=DEBUG
logging.level.org.springframework.web=INFO
logging.level.org.hibernate=ERROR
'path'为本机的'log地址'，'logging.level'  后面可以'根据'包'路径配置'不同资源的'log级别'


数据库操作
在这里我重点讲述'mysql'、'spring data jpa'的使用，
其中mysql 就不用说了大家很熟悉，jpa是'利用Hibernate生成各种自动化的sql'，
如果只是'简单的增删改查'，基本上'不用手写了'，spring内部已经帮大家封装实现了。

下面简单介绍一下如何在spring boot中使用
hibernate.hbm2ddl.auto
create： '每次加载hibernate时'都'会删除上一次的生成的表'，然后'根据你的model类'再'重新来生成'
新表，哪怕'两次没有任何改变''也要这样执行'，这就是'导致数据库表数据丢失'的一个重要原因。
create-drop ：'每次加载hibernate时'根据model类'生成表'，但是'sessionFactory一关闭','表就自动删除'。
update：最'常用的属性'，'第一次加载hibernate时'根据model类会'自动建立起表的结构'
（'前提是先建立好数据库'），'以后加载hibernate时'根据 'model类自动更新表结构'，
即使'表结构改变'了但'表中的行仍然存在''不会删除以前的行'。要注意的是'当部署到服务器后'，
'表结构是不会被马上建立起来的'，是'要等 应用第一次运行起来后''才会'。
validate ：'每次加载hibernate时'，'验证创建数据库表结构'，只会'和数据库中的表进行比较'，
'不会创建新表，但是会插入新值'。

dialect 主要是'指定生成表名的存储引擎'为'InneoDB'
show-sql 是否'打印出自动生产的SQL'，方便'调试的时候查看'

3、添加实体类和Dao
@Entity
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private Long id;
	@Column(nullable = false, unique = true)
	private String userName;
	@Column(nullable = false)
	private String passWord;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = true, unique = true)
	private String nickName;
	@Column(nullable = false)
	private String regTime;

	//省略getter settet方法、构造方法
}

'dao'只要'继承JpaRepository类就可以'，几乎可以不用写方法，
还有一个'特别有尿性的功能非常赞'，就是'可以根据方法名'来'自动的生产SQL'，
比如'findByUserName' 会自动生产一个以 'userName' 为参数的查询方法，
比如 'findAlll' '自动会查询表里面的所有数据'，比如'自动分页'等等。。

Entity中'不映射成列'的'字段'得'加@Transient 注解'，'不加'注解也'会映射成列'

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
    User findByUserNameOrEmail(String username, String email);
}
测试
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
public class UserRepositoryTests {

	@Autowired
	private UserRepository userRepository;

	@Test
	public void test() throws Exception {
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG);        
		String formattedDate = dateFormat.format(date);
		
		userRepository.save(new User("aa1", "aa@126.com", "aa", "aa123456",formattedDate));
		userRepository.save(new User("bb2", "bb@126.com", "bb", "bb123456",formattedDate));
		userRepository.save(new User("cc3", "cc@126.com", "cc", "cc123456",formattedDate));

		Assert.assertEquals(9, userRepository.findAll().size());
		Assert.assertEquals("bb", userRepository.findByUserNameOrEmail("bb", "cc@126.com").getNickName());
		userRepository.delete(userRepository.findByUserName("aa1"));
	}

}

'spring data jpa' 还有'很多功能'，比如'封装好的分页'，可以'自己定义SQL'，'主从分离'
等等，这里就不详细讲了


thymeleaf模板
Spring boot 推荐'使用来代替jsp','thymeleaf模板'到底'是什么来头'呢，
让spring大哥来推荐，下面我们来聊聊

'Thymeleaf 介绍'
Thymeleaf是一款用于'渲染XML/XHTML/HTML5内容的模板引擎'。'类似JSP，Velocity，FreeMaker等'，
'它'也'可以轻易的与Spring MVC'等Web框架'进行集成''作为Web应用的模板引擎'。与其它模板引擎相比，
'Thymeleaf'最大的'特点是能'够'直接在浏览器中打开'并'正确显示模板页面'，而'不需要启动整个Web应用'。

好了，你们说了我们已经习惯使用了什么 velocity,FreMaker，beetle之类的模版，那么到底好在哪里呢？
比一比吧 'Thymeleaf'是与众不同的，因为它'使用了自然的模板技术'。这意味着Thymeleaf的'模板语法'
并'不会破坏文档的结构'，模板'依旧是有效的XML文档'。模板还'可以用作工作原型'，Thymeleaf会'在运行期'
'替换掉静态值'。Velocity与FreeMarker则是连续的文本处理器。 下面的代码示例分别使用
Velocity、FreeMarker与Thymeleaf打印出一条消息：

Velocity: <p>$message</p>
FreeMarker: <p>${message}</p>
Thymeleaf: <p th:text="${message}">Hello World!</p>

** 注意，由于'Thymeleaf使用了''XML DOM解析器'，因此它'并不适合于''处理大规模的XML文件'。**

URL
'URL在Web应用模板'中'占据着十分重要'的'地位'，需要特别'注意的是''Thymeleaf对于URL的处理'
是'通过语法@{…}来处理'的。Thymeleaf支持绝对路径URL：
<a th:href="@{http://www.thymeleaf.org}">Thymeleaf</a>


Gradle 构建工具  '看不懂'
spring 项目建议使用Gradle进行构建项目，相比maven来讲 Gradle更简洁，而且gradle更时候大型复杂项目的构建。gradle吸收了maven和ant的特点而来，不过目前maven仍然是Java界的主流，大家可以先了解了解。

一个使用gradle配置的项目
buildscript {
    repositories {
        maven { url "http://repo.spring.io/libs-snapshot" }
        mavenLocal()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:1.3.6.RELEASE")
    }
}

apply plugin: 'java'  //添加 Java 插件, 表明这是一个 Java 项目
apply plugin: 'spring-boot' //添加 Spring-boot支持
apply plugin: 'war'  //添加 War 插件, 可以导出 War 包
apply plugin: 'eclipse' //添加 Eclipse 插件, 添加 Eclipse IDE 支持, Intellij Idea 为 "idea"

war {
    baseName = 'favorites'
    version =  '0.1.0'
}

sourceCompatibility = 1.7  //最低兼容版本 JDK1.7
targetCompatibility = 1.7  //目标兼容版本 JDK1.7

repositories {     //  Maven 仓库
    mavenLocal()        //使用本地仓库
    mavenCentral()      //使用中央仓库
    maven { url "http://repo.spring.io/libs-snapshot" } //使用远程仓库
}
 
dependencies {   // 各种 依赖的jar包
    compile("org.springframework.boot:spring-boot-starter-web:1.3.6.RELEASE")
    compile("org.springframework.boot:spring-boot-starter-thymeleaf:1.3.6.RELEASE")
    compile("org.springframework.boot:spring-boot-starter-data-jpa:1.3.6.RELEASE")
    compile group: 'mysql', name: 'mysql-connector-java', version: '5.1.6'
    compile group: 'org.apache.commons', name: 'commons-lang3', version: '3.4'
    compile("org.springframework.boot:spring-boot-devtools:1.3.6.RELEASE")
    compile("org.springframework.boot:spring-boot-starter-test:1.3.6.RELEASE")
    compile 'org.webjars.bower:bootstrap:3.3.6'
	compile 'org.webjars.bower:jquery:2.2.4'
    compile("org.webjars:vue:1.0.24")
	compile 'org.webjars.bower:vue-resource:0.7.0'

}

bootRun {
    addResources = true
}

WebJars
WebJars是一个很神奇的东西，可以'让大家以jar包的形式'来'使用前端的各种框架'、'组件'。

什么是WebJars
什么是WebJars？WebJars是'将客户端（浏览器）资源'（JavaScript，Css等）'打成jar包文件'，
以'对资源进行统一依赖管理'。'WebJars的jar包部署在Maven中央仓库上'。

为什么使用
我们在开发Java web项目的时候'会使用像Maven，Gradle等构建工具'以'实现对jar包版本依赖管理'，
以及'项目的自动化管理'，但是对于'JavaScript，Css等前端资源包'，我们只能'采用拷贝到webapp'下
'的方式'，这样做就'无法对这些资源进行依赖管理'。那么'WebJars'就'提供'给我们这些'前端资源的jar包'
形势，我们就可以'进行依赖管理'。










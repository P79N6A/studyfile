　spring boot 整理之路继续前行，这次我说一下'怎么在'spring boot'项目启动后'立即'执行某一个特定的方法'，
已经'要执行特定方法'不止一个的时候的顺序问题【顺序问题我只说注解咋实现@Order】

分析：
	这次我拿项目中某一个功能为案例，进行演示：
如何'在项目启动时''启动ftp服务器'（java内嵌ftp服务器）：
如何在spring boot项目启动时让ftp服务器也随之启动呢？

方案：
	针对上面的问题，我在spring boot中找到了解决方案。
那就是'spring boot'给我们'提供了两个接口''ApplicationRunner'和'CommandLineRunner'。
这两个接口是Springboot给我们提供了两种“开机启动”的方式
　　　　ApplicationRunner　　：
　　　　源码如下：

　　　　　　public interface ApplicationRunner {
    　　　　　　void run(ApplicationArguments var1) throws Exception;
　　　　　　}

　　　　CommandLineRunner  ：
　　　　源码如下：　　
　　　　　　public interface CommandLineRunner {
    　　　　　　void run(String... var1) throws Exception;
　　　　　　}

　　　　对比：
　　　　相同点：这两种方法提供的目的是'为了满足'，在'项目启动的时候'立刻'执行某些方法'。
我们'可以通过实现''ApplicationRunner'和'CommandLineRunner'，'来实现'，
他们'都是在SpringApplication''执行之后''开始执行的'。
　　　　不同点：'CommandLineRunner接口'可以'用来接收字符串数组'的命令行参数，
'ApplicationRunner'是使'用ApplicationArguments'用来'接收参数'的     【根据业务场景灵活运用】

 代码：
复制代码
　注意：在这我用了注解，如果'选择接口实现方式'只'需要实现Order接口'即可，
里面有个getOrder方法    返回个int值，值越小，越优先执行
复制代码
/**
 * @Author:huhy
 * @DATE:Created on 2018/1/3 12:47
 * @Modified By:
 * @Class 项目启动后运行此方法:CommandLineRunner实现
 */
@Component
@Order(value=2)
public class FtpInitRunner implements CommandLineRunner {
    @Override
    /**
     *@Author: huhy
     *@Package_name:com.huhy.web.common.runner
     *@Date:13:20 2018/1/3
     *@Description:项目启动后运行此方法 CommandLineRunner
     */
    public  void run(String... var1) throws Exception{
        System.out.println("2222222222222222222222");
    }


复制代码
复制代码
/**
 * @Author:huhy
 * @DATE:Created on 2018/1/3 13:20
 * @Modified By:
 * @Class Description:ApplicationRunner 实现
 */
@Component
@Order(value = 1)   //执行顺序控制
public class FtpInitRunner2 implements ApplicationRunner{
    @Override
    /**
     *@Author: huhy
     *@Package_name:com.huhy.web.common.runner
     *@Date:13:29 2018/1/3
     *@Description:   ApplicationRunner方式实现
     */
    public void run(ApplicationArguments applicationArguments) throws Exception {
        //项目路径 path =  E:\IDE\workspace\ideaWorkspace\spring boot\spring-boot
        String path = System.getProperty("user.dir");
        CommandLine.main(new String[]{path+"\\src\\main\\resources\\ftpserver\\ftpd-typical.xml"});
        System.out.println("----------------------"+path);
        System.out.println("111111111111111111111111");


    }
复制代码
　　启动图如下：
  
  
  
  
  
  
  
  
  
  
springboot '启动后''执行特定的方法'
  
在平时的开发中可能遇到这样的问题，在'springboot 容器启动之后''执行特定的方法或者类'。

数据库连接之类的。SpringBoot给我们提供了两个接口来帮助我们实现这种需求。
这两个接口分别为CommandLineRunner和ApplicationRunner

这两个接口中有一个run方法，我们只需要实现这个方法即可。这两个接口的不同之处在于：
'ApplicationRunner中run方法的参数'为ApplicationArguments，
而'CommandLineRunner接口'中run方法的'参数为String数组'。下面我写两个简单的例子，来看一下这两个接口的实现。

ApplicationRunner:

@Component      //被 spring 容器管理

@Order(2)     //如果多个自定义的 ApplicationRunner  ，用来标明执行的顺序

public class MyApplicationRunner implements ApplicationRunner{

    @Override    public void run(ApplicationArguments applicationArguments) throws Exception{
        System.out.println("-------------->" + "项目启动，now=" + new Date());
        System.out.println("获取到的参数： "+applicationArguments.getOptionNames());
        System.out.println("获取到的参数： "+applicationArguments.getNonOptionArgs());
        System.out.println("获取到的参数： "+applicationArguments.getSourceArgs());
        //myTimer();    }

    public static void myTimer(){
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override            public void run() {
                System.out.println("------定时任务--------");
            }
        }, 0, 2000);
    }
}

TestCommandLineRunner ：

@Component

@Order(1)
public class TestCommandLineRunner implements CommandLineRunner {

    @Autowired    //自己写的特定的类，用来调用自己的写的方法    private testClass test;

    @Override    public void run (String... args) throws Exception{
        System.out.println("<<<<<<<<<<<<<<<<<< 测试 CommandLineRunner 接口");
        test.printLn();
    }

}
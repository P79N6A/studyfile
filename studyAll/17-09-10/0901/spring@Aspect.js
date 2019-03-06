'基于@Aspect的AOP配置'
@Aspect '注解在类名上'
1、Spring除了'支持Schema方式配置AOP'，还'支持注解方式'：'使用@Aspect来配置'
2、Spring'默认不支持'@Aspect风格的切面声明，通过如下'配置开启@Aspect支持'：
<aop:aspectj-autoproxy/>
3、通过'以上配置'，'Spring'就能发现'用@Aspect注解'的切面内并'把它应用到目标对象上'。
4、'定义一个切面'：
@Aspect  
public class AspectStyle {
    @Before("execution(* com.sxit..*.*(..))")  
    public void before(){
        System.out.println("方法执行前执行.....");  
    }
} 
5、'后置返回通知'：
@AfterReturning("execution(* com.sxit..*.*(..))")  
public void afterReturning(){
        System.out.println("方法执行完执行.....");  
} 
6、'后置异常通知'：
@AfterThrowing("execution(* com.sxit..*.*(..))")  
public void throwss(){  
        System.out.println("方法异常时执行.....");  
}  
7、'后置最终通知'：
@After("execution(* com.sxit..*.*(..))")  
public void after(){  
        System.out.println("方法最后执行.....");  
}
8、'环绕通知'：
@Around("execution(* com.sxit..*.*(..))")  
public Object around(ProceedingJoinPoint pjp){  
        System.out.println("方法环绕start.....");  
        try {  
            pjp.proceed();  
        } catch (Throwable e) {  
            e.printStackTrace();  
        }  
        System.out.println("方法环绕end.....");  
}  
9、按上面的'每一个通知''都要写一个定义'，其实这部分'可以抽出来'，
'定义'个'一个公共的切入点'。
@Aspect  
public class AspectStyle {  
      
    @Pointcut("execution(* com.sxit..*.*(..))")  
    public void init(){  
          
    }  
  
    @Before(value="init()")  
    public void before(){  
        System.out.println("方法执行前执行.....");  
    }  
      
    @AfterReturning(value="init()")  
    public void afterReturning(){  
        System.out.println("方法执行完执行.....");  
    }  
      
    @AfterThrowing(value="init()")  
    public void throwss(){  
        System.out.println("方法异常时执行.....");  
    }  
      
    @After(value="init()")  
    public void after(){  
        System.out.println("方法最后执行.....");  
    }  
      
    @Around(value="init()")  
    public Object around(ProceedingJoinPoint pjp){  
        System.out.println("方法环绕start.....");  
        Object o = null;  
        try {  
            o = pjp.proceed();  
        } catch (Throwable e) {  
            e.printStackTrace();  
        }  
        System.out.println("方法环绕end.....");  
        return o;  
    }  
}


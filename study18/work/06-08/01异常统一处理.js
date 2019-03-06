SpringBoot开发详解（六）-- '异常统一管理'以及'AOP'的'使用'
AOP在SpringBoot中的使用
使用切面管理异常的原因：

今天的内容干货满满哦～并且是我自己在平时工作中的一些问题与解决途径，对实际开发的作用很大，好，闲言少叙，让我们开始吧～～

我们先看一张错误信息在APP中的展示图： 
这里写图片描述

是不是体验很差，整个后台错误信息都在APP上打印了。 
作为后台开发人员，我们总是在不停的写各种接口提供给前端调用，然而不可避免的，当后台出现BUG时，
前端总是丑陋的讲'错误'信息'直接暴露给用户'，这样的用户'体验'想必是'相当差'的（不过后台开发一看就知道问题出现在哪里）。
同时，在解决BUG时，我们总是要问前端拿到参数去调适，排除各种问题（网络，Json体错误，接口名写错……BaLa……BaLa……BaLa）。
在不考虑前端容错的情况下。我们自己后台有没有优雅的解决这个问题的方法呢，今天这篇我们就来使用AOP统一对异常进行记录以及返回。

'SpringBoot''引入AOP'
在SpringBoot中引入AOP是一件很方便的事，和其他引入依赖一样，我们只需要在POM中引入starter就可以了：

<!--spring切面aop依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>

'返回体报文'定义
接下来我们先想一下，一般我们返回体是什么样子的呢？或者你觉得一个返回的报文应该具有哪些特征。

'成功标示'：可以用'boolean型'作为标示位。

'错误代码'：一般用'整型'作为标示位，罗列的越详细，前端的容错也就能做的更细致。

'错误信息'：使用'String'作为错误信息的描述，留给前端是否展示给用户或者进入其他错误流程的使用。

'结果集'：在无错误信息的情况下所得到的正确数据信息。一般是个Map，前端根据Key取值。

以上是对一个返回体报文一个粗略的定义了，如果再细致点，可以使用签名进行验签功能活着对明文数据进行对称加密等等。
这些我们今天先不讨论，我们先完成一个能够使用的接口信息定义。

我们再对以上提到这些信息做一个完善，去除冗余的字段，对差不多的类型进行合并于封装。这样的想法下，我们创建一个'返回体报文'的'实体类'。
public class Result<T> {

   //    error_code 状态值：0 极为成功，其他数值代表失败
   private Integer status;

   //    error_msg 错误信息，若status为0时，为success
   private String msg;

   //    content 返回体报文的出参，使用泛型兼容不同的类型
   private T data;

   public Integer getStatus() {
       return status;
   }

   public void setStatus(Integer code) {
       this.status = code;
   }

   public String getMsg() {
       return msg;
   }

   public void setMsg(String msg) {
       this.msg = msg;
   }

   public T getData(Object object) {
       return data;
   }

   public void setData(T data) {
       this.data = data;
   }

   public T getData() {
       return data;
   }

   @Override
   public String toString() {
       return "Result{" +
               "status=" + status +
               ", msg='" + msg + '\'' +
               ", data=" + data +
               '}';
   }
}

现在我们已经有一个返回体报文的定义了，那接下来我们可以来'创建'一个'枚举类'，
来记录一些我们已知的错误信息，可以在代码中直接使用。

public enum ExceptionEnum {
    UNKNOW_ERROR(-1,"未知错误"),
    USER_NOT_FIND(-101,"用户不存在");

    private Integer code;

    private String msg;

    ExceptionEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}

我们在这里把对于不再预期内的'错误统一'设置'为-1'，未知错误。以避免返回给前端大段大段的错误信息。

接下来我们只需要'创建'一个'工具类'在代码中使用：

public class ResultUtil {

    /**
     * 返回成功，传入返回体具体出參
     * @param object
     * @return
     */
    public static Result success(Object object){
        Result result = new Result();
        result.setStatus(0);
        result.setMsg("success");
        result.setData(object);
        return result;
    }

    /**
     * 提供给部分不需要出參的接口
     * @return
     */
    public static Result success(){
        return success(null);
    }

    /**
     * 自定义错误信息
     * @param code
     * @param msg
     * @return
     */
    public static Result error(Integer code,String msg){
        Result result = new Result();
        result.setStatus(code);
        result.setMsg(msg);
        result.setData(null);
        return result;
    }

    /**
     * 返回异常信息，在已知的范围内
     * @param exceptionEnum
     * @return
     */
    public static Result error(ExceptionEnum exceptionEnum){
        Result result = new Result();
        result.setStatus(exceptionEnum.getCode());
        result.setMsg(exceptionEnum.getMsg());
        result.setData(null);
        return result;
    }
}

以上'我们'已经可以'捕获'代码中那些在'编码阶段'我们'已知'的'错误'了，
但是却'无法捕获'程序出的'未知异常'信息。我们的代码应该写得漂亮一点，
虽然很多时候我们会说时间太紧了，等之后我再来好好优化。
可事实是，我们再也不会回来看这些代码了。项目总是一个接着一个，
时间总是不够用的。如果真的需要你完善重构原来的代码，
那你一定会非常痛苦，死得相当难看。所以，在第一次构建时，就将你的代码写完善了。

一般'系统抛出'的错误是'不含'错误'代码'的，除去部分的404，400，500错误之外，
我们如果'想把错误'代码'定义'的'更细致'，
就需'要'自己'继承RuntimeException'这个类后'重新定义'一个构造方法来定义我们自己的错误信息：

public class DescribeException extends RuntimeException{

    private Integer code;

    /**
     * 继承exception，加入错误状态值
     * @param exceptionEnum
     */
    public DescribeException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMsg());
        this.code = exceptionEnum.getCode();
    }

    /**
     * 自定义错误信息
     * @param message
     * @param code
     */
    public DescribeException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}


同时，我们'使用'一个'Handle'来'把Try，Catch'中捕获的错误'进行判定'，
是一个我们已知的错误信息，还是一个未知的错误信息，如果'是未知'的错误信息，
那我们就'用log记录它'，便于之后的查找和解决：

    @ControllerAdvice
    public class ExceptionHandle {

      private final static Logger LOGGER = LoggerFactory.getLogger(ExceptionHandle.class);

      /**
       * 判断错误是否是已定义的已知错误，不是则由未知错误代替，同时记录在log中
       * @param e
       * @return
       */
      @ExceptionHandler(value = Exception.class)
      @ResponseBody
      public Result exceptionGet(Exception e){
          if(e instanceof DescribeException){
              DescribeException MyException = (DescribeException) e;
              return ResultUtil.error(MyException.getCode(),MyException.getMessage());
          }

          LOGGER.error("【系统异常】{}",e);
          return ResultUtil.error(ExceptionEnum.UNKNOW_ERROR);
      }
    }


这里我们'使用'了 '@ControllerAdvice' ，使Spring能加载该类，同时我们'将所有'捕获的'异常统一返回结果''Result这个实体'。

此时，我们已经完成了对结果以及异常的统一返回管理，并且在出现异常时，
我们可以不返回错误信息给前端，而是用未知错误进行代替，只有查看log我们才会知道真实的错误信息。

可能有小伙伴要问了，说了这么久，并没有使用到AOP啊。不要着急，我们继续完成我们剩余的工作。

我们使用接口若出现了异常，很难知道是谁调用接口，是前端还是后端出现的问题导致异常的出现，
那这时，AOP久发挥作用了，我们之前已经引入了AOP的依赖，现在我们'编写'一个'切面类'，切点如何配置不需要我多说了吧：
@Aspect
@Component
public class HttpAspect {

    private final static Logger LOGGER = LoggerFactory.getLogger(HttpAspect.class);

    @Autowired
    private ExceptionHandle exceptionHandle;

    @Pointcut("execution(public * com.zzp.controller.*.*(..))")
    public void log(){

    }

    @Before("log()")
    public void doBefore(JoinPoint joinPoint){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        //url
        LOGGER.info("url={}",request.getRequestURL());
        //method
        LOGGER.info("method={}",request.getMethod());
        //ip
        LOGGER.info("id={}",request.getRemoteAddr());
        //class_method
        LOGGER.info("class_method={}",joinPoint.getSignature().getDeclaringTypeName() + "," + joinPoint.getSignature().getName());
        //args[]
        LOGGER.info("args={}",joinPoint.getArgs());
    }

    @Around("log()")
    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Result result = null;
        try {

        } catch (Exception e) {
            return exceptionHandle.exceptionGet(e);
        }
        if(result == null){
            return proceedingJoinPoint.proceed();
        }else {
            return result;
        }
    }

    @AfterReturning(pointcut = "log()",returning = "object")//打印输出结果
    public void doAfterReturing(Object object){
        LOGGER.info("response={}",object.toString());
    }
}

我们使'用@Aspect来声明'这是一个'切面'，使'用@Pointcut'来'定义切面'所需要切入的'位置'，
这里我们是'对每一个'HTTP'请求'都需要'切入'，
在'进入方法之前'我们使'用@Before''记录'了调用的'接口URL'，'调用的方法'，
'调用'方的'IP'地址以及'输入'的'参数'等。在整个接口代码运作期间，
我们使'用@Around'来'捕获异常'信息，并'用'之前'定义好的Result'进行'异常'的'返回'，
'最后'我们'使用@AfterReturning'来'记录'我们的'出參'。 
以上全部，我们就完成了异常的统一管理以及切面获取接口信息，接下来我们心新写一个ResultController来测试一下：

@RestController
@RequestMapping("/result")
public class ResultController {

    @Autowired
    private ExceptionHandle exceptionHandle;

    /**
     * 返回体测试
     * @param name
     * @param pwd
     * @return
     */
    @RequestMapping(value = "/getResult",method = RequestMethod.POST)
    public Result getResult(@RequestParam("name") String name, @RequestParam("pwd") String pwd){
        Result result = ResultUtil.success();
        try {
            if (name.equals("zzp")){
                result =  ResultUtil.success(new UserInfo());
            }else if (name.equals("pzz")){
                result =  ResultUtil.error(ExceptionEnum.USER_NOT_FIND);
            }else{
                int i = 1/0;
            }
        }catch (Exception e){
            result =  exceptionHandle.exceptionGet(e);
        }
        return result;
    }
}

在上面我们设计了一个controller，如果传入的name是zzp的话，我们就返回一个用户实体类，如果传入的是pzz的话，我们返回一个没有该用户的错误，其他的，我们让他抛出一个by zero的异常。 
我们用POSTMAN进行下测试：


我们可以看到，前端收到的返回体报文已经按我们要求同意了格式，并且在控制台中我们打印出了调用该接口的一些接口信息，我们继续测试另外两个会出现错误情况的请求：


我们可以看到，如是我们之前在代码中定义完成的错误信息，我们可以直接返回错误码以及错误信息，如果是程序出现了我们在编码阶段不曾预想到的错误，则统一返回未知错误，并在log中记录真实错误信息。

以上就是我们统一管理结果集以及使用切面来记录接口调用的一些真实情况，在平时的使用中，大家要清楚切点的优先级以及在不同的切点位置该使用哪些注解来帮助我们完成开发，并且在切面中，如果遇到同步问题该如何解决等等。希望这篇文章能让你更好的思考如何设计好接口，我们在实际开发中又是怎样一步步完善我们的功能与代码的。也希望大家能好好梳理这些内容，如果有疑惑的地方，还请留言，我如果看到，一定会解答的。这里预告下：下周，我们将使用ORM框架来做数据库的交互～～～

以上所有的代码我已经上传到GitHub
round1-springboot
如果心急的小伙伴也可以去clone我已经完成的项目，这个项目中把一些常用功能都写了，并且都写注释啦！！！
MySpringBoot
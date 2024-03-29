Java注解使用是相当频繁，特别是在搭建一些框架时，用到类的反射获取方法和属性，
用的尤其多。


java中元注解有四个： '@Retention' '@Target' '@Document' '@Inherited'；
　　 '@Retention：注解的保留位置'　　　　　　　　　
　　　　　　@Retention(RetentionPolicy.SOURCE)   //注解仅存在于源码中，在class字节码文件中不包含
　　　　　　@Retention(RetentionPolicy.CLASS)     // 默认的保留策略，注解会在class字节码文件中存在，但运行时无法获得，
　　　　　　@Retention(RetentionPolicy.'RUNTIME')  // 注解会在'class字节码文件中存在'，在'运行时可以通过反射获取到'
　　
　  @Target:注解的作用目标
　　　　　　　　
　　　　　　　　@Target(ElementType.'TYPE')   //'接口、类、枚举、注解'
　　　　　　　　@Target(ElementType.FIELD) //字段、枚举的常量
　　　　　　　　@Target(ElementType.'METHOD') //'方法'
　　　　　　　　@Target(ElementType.PARAMETER) //方法参数
　　　　　　　　@Target(ElementType.CONSTRUCTOR)  //构造函数
　　　　　　　　@Target(ElementType.LOCAL_VARIABLE)//局部变量
　　　　　　　　@Target(ElementType.ANNOTATION_TYPE)//注解
　　　　　　　　@Target(ElementType.PACKAGE) ///包   
 
   @Document：说明该注解将被包含在javadoc中
 
　  @Inherited：说明'子类可以继承父类中的该注解'
   
   
   
  isAssignableFrom  是用来判断一个类Class1和另一个类Class2是否相同或是另一个类的子类或接口
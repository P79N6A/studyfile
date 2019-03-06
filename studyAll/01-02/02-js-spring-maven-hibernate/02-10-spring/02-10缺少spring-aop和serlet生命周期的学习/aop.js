'能够提取出公共代码切入在可以使用的地方'
该公共代码切入之后；所有地方都能调用;还能动态选择调用哪些接口，对象

spring提供了5种通知,
'前置通知'，在目标方法前调用 
'继承MethodBeforAdvice接口'重写before方法，在'这个类里面的方法都能够在目标方法前访问'
{
	method：被调用的方法 
	args：方法的参数 
	target：被代理的对象 
}
'后置通知'，在目标方法后调用
'AfterReturningAdvice' 
{
	returnValue 返回值 
	method 被调用的方法
	args 
	target 目标对象	
}

'环绕通知'，在正式访问函数代码的时候调用（拦截）,在函数体开头
'MethodInterceptor'
{
	MethodInvocation 
}
在Object obj=arg0.proceed();前，执行代码  

'异常通知'
'ThrowsAdvice'是个标签接口，一般自定义一个方法
public void afterThrowing(Method m,Object[]os,Object target,Exception e){
	System.out.println("出事了");
}

'引入通知',希望切入点有选择性	
通过配置来完成 methodBeforAdvice
此处可以使用正则过滤 say*表示say打头的

'代理对象'通过代理接口完成代理对象ProxyFactroyBean
代理对象拥有的方法会织入到公共部分，
在调用织入了代理对象的方法时，能够访问代理对象的方法
'注入动态代理只需要配置一下就可以了'

'步奏'
'1.被代理对象,'（一个正常的Java类）
和bean对象的配置一样
'2.配置通知'（继承了通知接口的类，写在这里的方法会在所有的'过滤接口实现类'中被访问）
配置继承MethodBeforeAdvice接口的bean；功能代码在此完成
'3.代理对象'：在'代理对象'中'指定具体的接口'和'对象'
（这个'代理对象只需要配置'，其类是封装好的'ProxyFactoryBean'
分三步完成注意这里的name是固定的
1,'配置代理接口集'，只有这里的接口被代理 name="proxyInterfaces" 
2,'织入通知' name="interceptorNames" 
3,'指定被代理的对象' ref="id" name="target"
代理对象的类型就是他的动态代理对象 
目标对象实现了接口，spring用jdk动态代理技术
目标对象没有实现接口，spring用clib技术

class A implements inter1,inter2{}
inter1 ins=new A();
(inter2)ins
这说明'实现多'个'接口的类'的对象可以'在这些类之间'相互'转换'



1.配置'代理类'
2.配置'切入方法'
3.配置代理，在里面'选择切入方法' /*name="interceptorNames"*/，'指定代理类的接口'/*name="proxyInterfaces"*/，并'指定代理类'/*name="target" */;

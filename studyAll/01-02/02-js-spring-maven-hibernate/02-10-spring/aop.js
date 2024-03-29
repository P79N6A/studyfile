'aop(aspect orierred programming)面向切面编程' 
对所有对象的编程，在不增加代码的基础上，增加新功能

'01切面'要实现的交叉功能，是模块化的一个切面或者领域

'02链接点'程序插入切面的地点：方法调用，异常抛出，修改字段。。

'03通知'切面的实际实现，它通知系统行为：日志通知包含日志功能代码，在这里实现

'04切入点'定义了通知应该应用在哪些链接点，通知可以应用到AOP框架支持的任何链接点

'05引入'为类添加新的方法和属性

'06目标对象'被通知的对象，既可以是你编写的类，也能是第三方类

'07代理'将通知应用到目标对象后创建的对象，应用系统的其他部分不用为了支持代理对象而改变

'08织入'将切面应用到目标对象，从而创造新代理对象的过程。织入发生在目标对象生命周期的多个点上

'编译期'切面在目标对象编译时织入，这需要一个特殊的编译器
'类装载期'切面在目标对象被载入时织入，这需要一个特殊的类载入器
'运行期'切面在应用系统运行时织入
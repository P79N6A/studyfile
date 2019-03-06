'java static'

'静态变量'
在'成员变量、方法'前面加上 static 关键字，就'成为静态变量'
'非私有静态变量''可以在类外部访问'，'衍生静态代码块'

'静态代码块'
'static' 修饰的变量在'类被载入'时创建，
'一个类'中的'不包含在任何方法体内的代码'，
'和静态变量''一样','类一旦创建'，'就直接执行'，该形式常'用于单例模式'


'单例模式'就是'类不提供构造方法'创建对象，或者'构造方法私有化'，
'提供一个类方法创建对象'
private static ApplicationContext ac=null;
/**
 * 单例模式私有化构造函数，通过一个静态方法返回单例
 */
private GetAc() {
}
static{
	ac=new ClassPathXmlApplicationContext();
}
public static ApplicationContext getAcon(){
	return ac;
}

'Java this'
运用场景
1.'在一个构造方法'中，'通过this'关键字'调用所在类'的'另一个构造方法'
2.'在一个实例方法'内，'区分参数'和'局部变量 this.name=name';
3.'在实例方法内'，通过 'this' 作为'调用当前实例的对象'

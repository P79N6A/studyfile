5-1 不可变对象-1
满足条件
	1，对象'创建以后''状态不能修改'
	2，对象'所以域''都是final类型'
	3，对象'是正确创建的'（在对像'创建期间'，'this引用没有溢出'）

final关键字：类，方法，变量
	类:'不能被继承'【方法都是final方法】【一个类的private方法就是final方法】
	方法:'锁定方法''不被继承类修改'【private方法被隐式创建成final方法】
	变量:'基本数据类型变量'【初始化之后'不能改变'】
	     '引用数据类型变量'【初始化后，'不能指向其他对象'】
	     
	//unmodifiableXXX
	java包：Collections.unmodifiableXXX:Collection，List，Set，Map...
	把'引用对象传入'，该'引用对象不可修改'【修改会异常】
	//ImmutableXXX
	谷歌包：Guava：ImmutableXXX:Collection，List，Set，Map...
	把'引用对象传入'，该'引用对象不可修改'【修改后依然原来的值】
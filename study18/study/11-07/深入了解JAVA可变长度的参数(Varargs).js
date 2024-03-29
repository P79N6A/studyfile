到J2SE 1.4为止，一直无法在Java程序里定义实参个数可变的方法
——'因为Java要求实参'（Arguments）和'形参'（Parameters）的'数量和类型'都必须'逐一匹配'，
而'形参的数目'是在'定义方法时'就'已经固定下来了'。

尽管可以通过重载机制，为同一个方法提供带有不同数量的形参的版本，
但是这仍然'不能达到''让实参数量''任意变化的目的'。

然而，'有些方法的语义'要求'它们''必须能接受''个数可变的实参'——例如著名的main方法，
就'需要能接受''所有的命令行参数''为实参'，
'而命令行参数的数目'，事先'根本无法确定下来'。


对于这个问题，'传统上一般是'采用“利'用一个数组'来'包裹要传递的实参'”的做法'来应付'。
1. '用数组包裹实参'
“'用数组包裹实参'”的做法可以'分成三步'：
'首先'，为这个方法'定义一个数组型的参数'；
'然后'在调用时，'生成一个包含了所有''要传递的实参的数组'；
'最后'，'把这个数组''作为一个实参传递过去'。

'这种做法''可以有效'的达到“'让方法'可以'接受个数可变的参数'”的目的，
只是调用时的形式不够简单。

J2SE '1.5'中'提供了Varargs机制'，'允许直接定义'能'和多个实参''相匹配的形参'。
从而，可以'用一种更简单的方式'，来'传递个数可变的实参'。

'Varargs的含义'
大体说来，“'Varargs'”是“'variable number of arguments'”的意思。
有时候也被简单的称为“variable arguments”，不过因为这一种叫法没有说明是什么东西可变，
所以意义稍微有点模糊。
 
2. '定义实参个数可变的方法'
'只要在'一个'形参的“类型”'与'“参数名”'之间'加上三个连续的“.”'（即“...”，英文里的句中省略号），
'就可以让它''和不确定个实参'相'匹配'。
而一个'带有这样的形参的方法'，就'是一个实参个数可变的方法'。

清单1：一个实参个数可变的方法
private static int sumUp(int... values) {
}

注意，'只有最后一个形参'才'能被定义成'“'能和不确定个实参''相匹配'”的。
因此，'一个方法'里'只能有一个''这样的形参'。
另外，'如果这个方法'还'有其它的形参'，'要把它们放到前面的位置上'。

'编译器'会在背地里'把'这'最后一个形参''转化为一个数组形参'，
并'在编译出的class文件'里'作上一个记号'，
'表明这'是个'实参个数可变'的方法。

清单2：'实参个数可变'的方法的'秘密形态'
private static int sumUp(int[] values) {
}

由于'存在着这样的转化'，所以'不能再为这个类''定义一个和转化后的方法签名''一致的方法'。

清单3：'会导致编译''错误的组合'
private static int sumUp(int... values) {
}
private static int sumUp(int[] values) {
}

3. '调用''实参个数可变''的方法'
只要'把要传递的实参''逐一写到相应的位置'上，
就可以'调用一个实参个数可变的方法'。'不需要其它的步骤'。

清单4：可以传递若干个实参
sumUp(1, 3, 5, 7);

在'背地里'，'编译器'会'把这种调用过程''转化为''用“数组包裹实参”的形式'：

清单5：'偷偷出现的数组创建'
sumUp(new int[]{1, 2, 3, 4});

另外，这里说的'“不确定个”'也'包括零个'，所以这样的调用也是合乎情理的：

清单6：'也可以传递零个实参'
sumUp();

这种调用方法被编译器秘密转化之后的效果，则等同于这样：

清单7：零实参对应空数组
sumUp(new int[]{});

注意'这时传递过去的''是一个空数组'，而'不是null'。
这样就可以'采取统一的形式'来'处理'，而'不必检测'到底'属于哪种情况'。

4. 处理'个数可变的实参'
处理'个数可变的实参'的办法，'和处理数组实参'的'办法基本相同'。
'所有的实参'，都'被保存到一个'和'形参同名的数组里'。
'根据实际的需要'，'把这个数组里的元素读出'之后，要蒸要煮，就可以随意了。


清单8：'处理收到的实参们'
private static int sumUp(int... values) {
 int sum = 0;
 for (int i = 0; i < values.length; i++) {
  sum += values[i];
 }
 return sum;
}
 

5. '转发个数可变的实参'
有时候，'在接受'了'一组个数可变的实参之后'，
还'要把它们传递给''另一个实参个数可变''的方法'。
因为'编码时''无法知道接受来的''这一组实参的数目'，
所以“'把它们''逐一写到''该出现的位置'上去”的'做法并不可行'。
不过，这并不意味着这是个不可完成的任务，
因为还'有'另外'一种办法'，可以'用来调用实参个数可变的方法'。

在J2SE 1.5的编译器的眼中，'实参个数可变的方法''是'最后'带了一个数组形参的''方法的特例'。
因此，'事先把整组''要传递的实参''放到一个数组里'，
'然后把''这个数组''作为最后一个实参'，'传递给''一个实参个数可变的方法'，
不会造成任何错误。借助这一特性，就可以顺利的完成转发了。

清单9：'转发收到的实参们'
public class PrintfSample {
  public static void main(String[] args) {
    printOut("Pi:%f E:%f\n", Math.PI, Math.E);
  }
  private static void printOut(String format, Object... args) {
    System.out.printf(format, args);
 }
}

6. '是数组？不是数组？'
尽管'在背地里'，'编译器会把能匹配''不确定个实参的形参'，
'转化为数组形参'；而且'也可以用数组''包了实参'，'再传递给''实参个数可变''的方法'；
但是，'这并不表示''“能匹配不确定个实参的形参”''和“数组形参”''完全没有差异'。

'一个明显的差异'是，'如果按照''调用实参个数可变'的'方法的形式'，
来'调用一个''最后一个形参''是数组形参的方法'，
只'会导致'一个“cannot be applied to”的'编译错误'。

清单10：一个'“cannot be applied to”'的'编译错误'
private static void testOverloading(int[] i) {
System.out.println("A");
}
public static void main(String[] args) {
testOverloading(1, 2, 3);//编译出错
}

'由于这一原因'，'不能''在调用只支持''用数组包裹实参''的方法''的时候'
（例如在不是专门为J2SE 1.5设计第三方类库中遗留的那些），
'直接采用'这种'简明的调用方式'。

'如果''不能修改原来的类'，'为''要调用的方法''增加参数个数可变''的版本'，
而'又想采用这种简明的调用方式'，
那么'可以借助'“'引入外加函数'（Introduce Foreign Method）”
和“'引入本地扩展'（Intoduce Local Extension）”'的重构手法'来'近似的达到目的'。


7. 当'个数可变的实参''遇到泛型'
J2SE 1.5中'新增了“泛型”的机制'，可以'在一定条件下''把一个类型参数化'。
例如，可以'在编写一个类的时候'，
'把一个方法'的'形参的类型''用一个标识符'（如T）来'代表'，
至于'这个标识符'到底'表示什么类型'，则在'生成这个类的实例''的时候''再行指定'。
这一机制'可以用来''提供更充分的代码重用''和更严格的编译时类型检查'。

不过'泛型机制'却'不能和个数可变的形参''配合使用'。
'如果把一个能和不确定个实参''相匹配的形参''的类型'，
'用一个标识符来代表'，那么'编译器会给出一个'“generic array creation”的'错误'。

清单11：'当Varargs遇上泛型'
private static void testVarargs(T... args) {//编译出错
}

'造成这个现象'的'原因在'于J2SE 1.5中的'泛型机制的'一个'内在约束'
——'不能拿用标识符'来'代表的类型'来'创建'这一类型的'实例'。
在出现'支持''没有了这个约束的Java版本''之前'，
对于这个问题，'基本没有太好的解决办法'。

不过，'传统'的“'用数组包裹'”的做法，并'不受这个约束的限制'。

清单12：可以编译的变通做法
private static void testVarargs(T[] args) {
 for (int i = 0; i < args.length; i++) {
  System.out.println(args[i]);
 }
}
 

8. '重载'中'的选择问题'
'Java'支持“重载”的机制，'允许'在'同一个类'拥'有许多只有形参列表''不同的方法'。
然后，'由编译器''根据调用时的实参'来'选择到底'要'执行哪一个方法'。

'传统'上'的选择'，基本是'依照“特殊者优先”'的原则来'进行'。一个'方法的特殊程度'，
'取决于'为了'让它顺利运行'而'需要满足的条件''的数目'，需要'条件越多的越特殊'。

在引入Varargs机制之后，这一原则仍然适用，只是要考虑的问题丰富了一些——传统上，
一个重载方法的各个版本之中，
只有形参数量与实参数量正好一致的那些有被进一步考虑的资格。
但是Varargs机制引入之后，完全可以出现两个版本都能匹配，
在其它方面也别无二致，只是一个实参个数固定，而一个实参个数可变的情况。

遇到这种情况时，所用的判定规则是“实参个数固定的版本优先于实参个数可变的版本”。

清单13：'实参个数固定的版本优先'
 

如果在编译器看来，同时有多个方法具有相同的优先权，
它就会陷入无法就到底调用哪个方法作出一个选择的状态。
在这样的时候，它就会产生一个“reference to 被调用的方法名 is ambiguous”的编译错误，
并耐心的等候作了一些修改，足以免除它的迷惑的新源代码的到来。

在引入了Varargs机制之后，这种可能导致迷惑的情况，又增加了一些。
例如现在可能会有两个版本都能匹配，
在其它方面也如出一辙，而且都是实参个数可变的冲突发生。
 

public class OverloadingSampleA {
 public static void main(String[] args) {
  testOverloading(1);//打印出A
  testOverloading(1, 2);//打印出B
  testOverloading(1, 2, 3);//打印出C
 }
 private static void testOverloading(int i) {
  System.out.println("A");
 }
 private static void testOverloading(int i, int j) {
  System.out.println("B");
 }
 private static void testOverloading(int i, int... more) {
  System.out.println("C");
 }
}
如果在编译器看来，同时有多个方法具有相同的优先权，
它就会陷入无法就到底调用哪个方法作出一个选择的状态。在这样的时候，
它就会产生一个“reference to 被调用的方法名 is ambiguous”的编译错误，
并耐心的等候作了一些修改，足以免除它的迷惑的新源代码的到来。

在引入了Varargs机制之后，这种可能导致迷惑的情况，又增加了一些。
例如现在可能会有两个版本都能匹配，在其它方面也如出一辙，
而且都是实参个数可变的冲突发生。
 

清单14：左右都不是，为难了编译器
public class OverloadingSampleB {
 public static void main(String[] args) {
  testOverloading(1, 2, 3);//编译出错
 }
 private static void testOverloading(Object... args) {
 }
 private static void testOverloading(Object o, Object... args) {
 }
}

另外，因为J2SE 1.5中有“Autoboxing/Auto-Unboxing”机制的存在，
所以还可能发生两个版本都能匹配，而且都是实参个数可变，
其它方面也一模一样，只是一个能接受的实参是基本类型，
而另一个能接受的实参是包裹类的冲突发生。
 

清单15：Autoboxing/Auto-Unboxing带来的新问题
public class OverloadingSampleC {
	public static void main(String[] args) {
		/* 编译出错 */
		testOverloading(1, 2);
		/* 还是编译出错 */
		testOverloading(new Integer(1), new Integer(2));
	}
	private static void testOverloading(int... args) {
	}
	private static void testOverloading(Integer... args) {
	}
}
 

9. 归纳总结
和“用数组包裹”的做法相比，真正的实参个数可变的方法，
在调用时传递参数的操作更为简单，含义也更为清楚。
不过，这一机制也有它自身的局限，并不是一个完美无缺的解决方案。


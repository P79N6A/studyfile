'双重检查锁定'（double-checked locking）'与单例模式'

'单例模式'有如下'实现方式'：
public class Singleton {  
    private static Singleton instance;  
  
    private Singleton() {  
    }  
  
    public static Singleton getInstance() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }
}  
'这种方式'称'为延迟初始化'，但是'在多线程''的情况下''会失效'，
'于是使用同步锁'，'给getInstance()' 方法'加锁'：
public static synchronized Singleton getInstance() {  
    if (instance == null) {  
        instance = new Singleton();  
    }  
    return instance;  
}  
'同步''是需要开销的'，我们'只需要在初始化''的时候同步'，
而'正常的代码''执行路径''不需要同步'，'于是有了''双重检查加锁'（DCL）：
public static Singleton getInstance() {  
    if (instance == null) {  
        synchronized (Singleton.class) {  
            if (instance == null) {  
                instance = new Singleton();  
            }  
        }  
    }  
    return instance;  
}  
'这'样一'种设计''可以保证''只产生一个实例'，并且'只会在初始化''的时候加同步锁'，
看似精妙绝伦，'但'却'会引发''另一个问题'，'这个问题''由指令重排序''引起'。
'指令重排序''是''为了优化指令'，'提高程序''运行效率'。
'指令重排序''包括''编译器重排序'和'运行时重排序'。
'JVM规范规定'，'指令重排序''可以''在不影响''单线程程序执行结果''前提下''进行'。
'例如 instance = new Singleton()' '可分解为''如下伪代码：'
memory = allocate();   //1：'分配对象的内存空间'
ctorInstance(memory);  //2：'初始化对象'
instance = memory;     //3：'设置instance''指向''刚分配的内存地址'

但是'经过重排序'后'如下'：
memory = allocate();   //1：'分配对象的内存空间'  
instance = memory;     //3：'设置instance''指向''刚分配的内存地址'  
                       //注意，此时对象还没有被初始化！  
ctorInstance(memory);  //2：'初始化对象' 

将'第2步和第3步''调换顺序'，'在单线程情况下''不会影响''程序执行'的'结果'，'但'是'在多线程情况下'
'就''不一样了'。
'线程A''执行了instance = memory'（'这对另一个线程B'来说'是可见的'），
'此时线程B''执行外层' 'if (instance == null)'，'发现''instance不为空'，'随即返回'，
但是'得到的''却是''未被完全初始化的实例'，在'使用的时候'必定'会有风险'，
'这'正'是''双重检查锁定'的'问题所在'！
'鉴于(双重检查锁定)'DCL'的缺陷'，'便有了''修订版'：
public static Singleton getInstance() {  
    if (instance == null) {  
        synchronized (Singleton.class) {  
            Singleton temp = instance;  
            if (temp == null) {
                synchronized (Singleton.class) {  
                    temp = new Singleton();  
                }
                instance = temp;  
            }
        }
    }  
    return instance;  
}  
'修订版'试图'引进局部变量''和第二个synchronized''来解决''指令重排序'的'问题'。
但是，'Java语言规范'虽然'规定了同步'代码块'内'的'代码'必'须在'对象'锁释放'之'前''执行完毕'，
却没有规定'同步'代码块之'外''的代码'不'能''在对象锁释放之前执行'，
也'就是说 instance = temp' 可'能'会'在编译期或者运行期''移到里层的synchronized内'，
于是'又会引发''跟DCL一样的问题'。
在JDK1.5之后，'可以'使'用''volatile'变量'禁止''指令重排序'，让DCL生效：

public class Singleton {  
    private static volatile Singleton instance;  
  
    private Singleton() {  
    }
  
    public static Singleton getInstance() {
        if (instance == null) {  
            synchronized (Singleton.class) {  
                if (instance == null) {  
                    instance = new Singleton();  
                }  
            }
        }
        return instance;  
    }  
}  
'volatile'的'另一个语义''是''保证变量修改'的'可见性'。
意思就是说'当一个线程''修改了变量'，
'另外的线程''能读到'这个'修改的值'；
'单例模式''还有''如下实现'方式：

public class Singleton {  
    private static class InstanceHolder {  
        public static Singleton instance = new Singleton();  
    }  
  
    private Singleton() {
    }  
  
    public static Singleton getInstance() {  
        return InstanceHolder.instance;  
    }  
}
'这种'方式'称为''延迟初始化'占位（Holder）类'模式'。
'该模式''引进'了一个'静态内部类'（占位类），'在内部类中''提前''初始化实例'，
既'保证了Singleton'实例的'延迟初始化'，'又保证'了'同步'。
'这是'一种'提前初始化'（恶汉式）'和''延迟初始化'（懒汉式）的'综合模式'。

至此，'正确的单例模式''有三种实现方式'：
'1.提前初始化'。
public class Singleton {
    private static Singleton instance = new Singleton();  
  
    private Singleton() {  
    }  
  
    public static Singleton getInstance() {  
        return instance;  
    }
}  
2.'双重检查锁定' + '(加)volatile'。
3.'延迟初始化占位'类模式。

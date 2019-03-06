1.当一个'对象到GC Roots不可达'时，在'下一个垃圾回收周期'中'尝试回收该对象'，
如果该'对象重写了finalize()方法'，并在这个'方法中成功自救'(将'自身赋予某个引用')，
那么这个'对象不会被回收'。但如果这个对象'没有重写finalize()'方法'或'者'已经执行过'
这个方法，'也自救失败'，该对象将'会被回收'。


2.一个'对象是否'被'回收'并'不'是仅仅'靠当前对象'是否'被引用'这么简单粗暴的方法去判断。
JVM中'判断是否回收'一个对象使用的是'可达性分析算法'，'GC ROOT''不可'到'达的节点'都将会'被'
'标记上'，一个'对象'如果'被标记了两次'就'会被回收掉'。至于这个'可达性分析算法'你可以自行
百度一下，'原理'是很简单的。
那么用什么方法来监听一个对象是否被回收呢？当然用fianlize了;

请看代码：

public class Test {
    private static Test TEST= null;
    public static void main(String args[]) {
        TEST = new Test();
        TEST = null;
        System.gc();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(TEST);
    }
    @Override
    public void finalize() throws Throwable {
        System.out.println("要死了要死了要死了!");
    } 
}

那是不是'执行了finalize后'，'对象就'一定会'被回收呢？'
其实也'不一定''finalize调用时'对象仅'有一次拯救'自己的'机会'，如下：

public class Test {
    private static Test TEST= null;
    public static void main(String args[]) {
        TEST = new Test();
        
        TEST = null;
        System.gc();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(TEST);
        
        TEST = null;
        System.gc();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(TEST);
    }
    
    @Override
    public void finalize() throws Throwable {
        System.out.println("要死了要死了要死了!");
        TEST = this;
    } 
}

执行结果如下：

可以看到在'第一次'垃圾'回收'时，在'finalize方法'给'当前回收对象''赋值'给了'新的引用'，
避免了被回收，不过'finalize'方法'一个对象''只能调用一次'，在'第二次回收'时将'不会被调用了'。

从上述两个例子中我们可以得出：'finalize'可以'监听一个对象被回收'，
但是'不能保证'调用了'finalize的对象'一定会'被回收'，
同时'一个对象'在'第二次标记回收'时是'不会触发finalize'的！
如果'想绝对监听'一个对象'是否被回收'，
只有'在JVM里面添加参数-XX:+PrintGCDetails分析GC日志'咯


先说一下可达性分析算法的思想：从一个被称为'GC Roots'的'对象'开始'向下搜索'，
如果'一个对象到GC Roots''没有任何引用'链相连时，则说明'此对象不可用'。

在java中可以作为'GC Roots的对象'有以下几种：
虚拟机栈中引用的对象、方法区类静态属性引用的对象、方法区常量池引用的对象、本地方法栈JNI引用的对象


虽然这些算法可以判定一个对象是否能被回收，但是当满足上述条件时，一个对象 不一定会被回收。
当一个对象不可达GC Roots时，这个对象并不会马上被回收，而是处于一个死缓的阶段，
若要被真正的回收需要经历两次标记。如果对象在可达性分析中没有与GC Roots的引用链，
那么此时就会被第一次标记并且进行一次筛选，筛选的条件是是否有必要执行finalize()方法。
当对象没有覆盖finalize()方法或者已经被虚拟机调用过，那么就认为是没必要的。


如果该'对象'有必'要执行finalize()方法'，那么这个'对象将会放'在一个称为'F-Queue'的'队列中'，
'虚拟机会''触发一个finalize()线程'去'执行'，此线程是低优先级的，并且虚拟机不会承诺一直
等待它运行完，这还是因为如果finalize()执行缓慢或者发生了死锁，那么就会造成F-Queue
队列一直等待，造成了内存回收系统的崩溃。GC对处于F-Queue中的对象进行第二次被标记，
这时，该对象将被移除“即将回收”集合，等待回收。
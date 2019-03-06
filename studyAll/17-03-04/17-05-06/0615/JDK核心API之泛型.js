
为什么需要泛型

因为集合有很多的缺点，

最明显的是从集合中取出的对象还是Object类型的，需要进行强制转换，（当然在集合里面也是Object类型进行存储的）。
由于类型没有检查，可以向集合中添加任意对象，不便于我们对几何的管理，有时候甚至会造成严重的错误。
'泛型'就是'帮助我们提供了类型'，让我们'提前规定好集合对象的类型'。

定义泛型的规则
'泛型的类型参数'只能'是类类型'（包括'自定义类'），'不能是简单的类型'
同一种'泛型对应多个版本'（因为'参数类型''是不确定的'），'不同版本的类型''实例是互不相容的'
泛型的'类型参数可以多个'
泛型的'类型参数可以使用extends语句'，例如,'习惯上称为有界类型'
泛型的'参数类型'还可以是'通配符类型'，'例如Class<?>classType=Class.forName("java.lang.String")'
定义带参数类型的类

package com.shiyanlou.test;

class GenerictyTest<T> {
	private T ob;
	
	public GenerictyTest(T ob) {
	    super();
	    this.ob = ob;
	}
	
	public T getOb() {
	    return ob;
	}
	
	public void setOb(T ob) {
	    this.ob = ob;
	}
	public void showType(){
	    System.out.println("T的實際類型是："+ob.getClass().getName());
	}
}
public class GernerictyTestSecond {
    public static void main(String []args){
        GenerictyTest<Integer> intob=new GenerictyTest<Integer>(88);
        intob.showType();
        //int i=intob.getOb();//返回的Integer类型对象，看来是能直接赋值
        System.out.println("value= "+intob.getOb());
        GenerictyTest<String > intstring=new GenerictyTest<String>("I love you ");
        intstring.showType();
        System.out.println(intstring.getOb());
    }

}



'使用泛型方法'

'先定义一个基类'

package com.shiyanlou.test1;

public class Animal {
    public Animal() {
        // TODO Auto-generated constructor stub
        System.out.println("我是动物");
    }
}

'再定义一个子类'

package com.shiyanlou.test1;

public class Dog extends Animal {
    public Dog() {
        // TODO Auto-generated constructor stub
        System.out.println("我是狗");
    }
}

看看如何操作

package com.shiyanlou.test1;

public class Test {
    /**
     * 泛型方法
     * @param t 基类类型
     * @param s 子类类型
     * @return
     */
    public <T,S extends T> T testDemo(T t,S s){
        System.out.println("我是 T 类型，我的类型是"+s.getClass().getName());
        System.out.println("我是 S 类型，我的类型是"+t.getClass().getName());

        return t;//返回基类类型
    }
    public static void main(String []args){
        Test test=new Test();
        Dog dog=new Dog();
        Animal an0=new Animal();
        Animal an1=test.testDemo(an0, dog);
        System.out.println("我是整数 a,我的类型是"+an1.getClass().getName());
    }
}


上面的例子中我们对'类型参数赋予了具体的类型'，当然有时候我们是'无法确定类型参数的类型'的，这个时候我们就可以'使用通配符'，

若仅仅是为了'实现多态'，'优先使用通配符解决'

package com.shiyanlou.test1;

    import java.util.List;

    public class Test2 {
        public void testDemo(List<?> s){
            for(Object obj:s){
                System.out.println("我的类型是"+obj.getClass().getName());
            }
        }
        public static void main(String []args){
            Test2 te=new Test2();
            Dog a0=new Dog();
            Animal a1=new Animal();
            List<Animal> s=null;
            s.add(a0);//很奇怪在这里报错了
            s.add(a1);
            te.testDemo(s);
        }
    }
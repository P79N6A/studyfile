转型过程中'需要注意的问题'
'向上转型'时，'子类单独定义'的'方法会丢失'。比如上面'Dog类'中定义的'run方法'，
当'animal引用'指向'Dog类实例'时是'访问不到run方法'的，'animal.run()会报错'。
'子类引用''不能指向''父类对象'。Cat c = (Cat)new Animal()'这样是不行的'。

向上转型的好处
减少重复代码，使代码变得简洁。
提高系统扩展性。
举个例子：比如我现在有很多种类的动物，要喂它们吃东西。如果不用向上转型，那我需要这样写：
public void eat(Cat c){
    c.eat();
}

public void eat(Dog d){
    d.eat();
}

eat(new Cat());
eat(new Cat());
eat(new Dog());
一种动物写一个方法，如果我有一万种动物，我就要写一万个方法，写完大概猴年马月都过了好几个了吧。
好吧，你很厉害，你耐着性子写完了，以为可以放松一会了，突然又来了一种新的动物，
你是不是又要单独为它写一个eat方法？开心了么？

那'如果'我'使用向上转型'呢？我只需要这样写：
public void eat(Animal a){
    a.eat();
}
eat(new Cat());
eat(new Cat());
eat(new Dog());
恩，搞定了。'代码'是不是'简洁了许多'？而且这个时候，如果'我又有一种'新的'动物加进来'，
我只'需要实现它自己的类'，让他'继承Animal就可以了'，而不需要为它单独写一个eat方法。
是不是提高了扩展性？


向下转型
与向上转型相对应的就是向下转型了。'向下转型是'把'父类对象''转为子类对象'。
(请注意！这里是有坑的。)

案例驱动
先看一个例子：

//还是上面的animal和cat dog
Animal a = new Cat();
Cat c = ((Cat) a);
c.eat();
//输出  我吃鱼
Dog d = ((Dog) a);
d.eat();
// 报错 ： java.lang.ClassCastException：com.chengfan.animal.Cat cannot be cast to com.chengfan.animal.Dog
Animal a1 = new Animal();
Cat c1 = ((Cat) a1);
c1.eat();
// 报错 ： java.lang.ClassCastException：com.chengfan.animal.Animal cannot be cast to com.chengfan.animal.Cat
'为什么''第一段代码不报错'呢？相比你也知道了，因为'a本身就是Cat对'象，所以它理所当然的'可以向下转型为Cat'，
也理所当然的'不能转为Dog'，你见过一条狗突然就变成一只猫这种操蛋现象？

而'a1为Animal对象'，它也'不能被向下转型为任何子类对象'。比如你去考古，发现了一个新生物，知道它是一种动物，
但是你不能直接说，啊，它是猫，或者说它是狗。

'向下转型注意事项'
'向下转型'的'前提'是'父类对象指向'的是'子类对象'（也就是说，'在向下转型之前'，'它得先向上转型'）
'向下转型'只能'转型为本类对象'（猫是不能变成狗的）。

大概你会说，我特么有病啊，我先向上转型再向下转型？？
我们回到上面的问题：喂动物吃饭，吃了饭做点什么呢？不同的动物肯定做不同的事，怎么做呢？
public void eat(Animal a){
    if(a instanceof Dog){  
        Dog d = (Dog)a;
        d.eat();
        d.run();//狗有一个跑的方法      
    } 
    if(a instanceof Cat){  
        Cat c = (Cat)a;
        c.eat();
        System.out.println("我也想跑，但是不会"); //猫会抱怨    
    } 
    a.eat();//其他动物只会吃
}
eat(new Cat());
eat(new Cat());
eat(new Dog());

现在，你懂了么？这就是向下转型的简单应用，可能举得例子不恰当，但是也可以说明一些问题。


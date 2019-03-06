
1、singleton作用域
　　当一个bean的作用域设置为singleton, 那么Spring IOC容器中只会存在一个共享的bean实例，
并且所有对bean的请求，只要id与该bean定义相匹配，则只会返回bean的同一实例。换言之，
当把一个bean定义设置为singleton作用域时，Spring IOC容器只会创建该bean定义的唯一实例。
这个单一实例会被存储到单例缓存（singleton cache）中，并且所有针对该bean的后续请求和引用都将返回被缓存的对象实例。
     这里要注意的是singleton作用域和GOF设计模式中的单例是完全不同的，
     单例设计模式表示一个ClassLoader中只有一个class存在，而这里的singleton
     则表示一个容器对应一个bean，也就是说当一个bean被标识为singleton时候，
     spring的IOC容器中只会存在一个该bean。
 
2、prototype
　　prototype作用域部署的bean，每一次请求（将其注入到另一个bean中，或者以程序
的方式调用容器的getBean()方法）都会产生一个新的bean实例，相当与一个new的操作，
对于prototype作用域的bean，有一点非常重要，那就是Spring不能对一个prototype bean
的整个生命周期负责，容器在初始化、配置、装饰或者是装配完一个prototype实例后，
将它交给客户端，随后就对该prototype实例不闻不问了。
      不管何种作用域，容器都会调用所有对象的初始化生命周期回调方法，而对prototype而言，
      任何配置好的析构生命周期回调方法都将不会被调用。清除prototype作用域的对象并
      释放任何prototype bean所持有的昂贵资源，都是客户端代码的职责。
      （让Spring容器释放被singleton作用域bean占用资源的一种可行方式是，
      通过使用bean的后置处理器，该处理器持有要被清除的bean的引用。）
    scope="prototype"没写的问题,项目中对一个表的增删该操作是用一个action，
    这个actionadd,update,delete,save这些方法， 添加和修改是共用一个页面，
    当页面得到id时代表进行的修改操作，反之是添加操作。因为在配置spring的bean
    是忘了写scope="prototype" 所以每次添加时都显示最后一次访问过的记录,
    scope="prototype" 会在该类型的对象被请求 时创建一个新的action对象。
    如果没有配置scope=prototype则添加的时候不会新建一个action，
    他任然会保留上次访问的过记录的信息 webwork的Action不是线程安全的，
    要求在多线程环境下必须是一个线程对应一个独立的实例，不能使用singleton。
    所以，我们在Spring配置Webwork Action Bean时，需要加上属性scope=”prototype”或singleton=”false”。
     singleton模式指的是对某个对象的完全共享，包括代码空间和数据空间，
     说白了，如果一个类是singleton的，假如这个类有成员变量，
     那么这个成员变量的值是各个线程共享的（有点类似于static的样子了），
     当线程A往给变量赋了一个值以后，线程B就能读出这个值。
      因此，对于前台Action，肯定不能使用singleton的模式，必须是一个线程请求
      对应一个独立的实例。推而广之，只要是带数据成员变量的类，为了防止多个
      线程混用数据，就不能使用singleton。对于我们用到的Service、Dao，
      之所以用了singleton，就是因为他们没有用到数据成员变量，如果谁的
      Service需要数据成员变量，请设置singleton=false。 有状态的bean都
      使用Prototype作用域，而对无状态的bean则应该使用singleton作用域。
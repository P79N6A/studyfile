Servlet生命周期 init() destory()

'bean的生命周期'  
'1.实例化'加载xml文件，用java反射机制，开始实例化   

'2.调用set方法，设置属性'，把对象设置成HashMap；采用java映射机制

'3.实现beanNameAwar'接口，重写该接口的getBeanName，'获取bean的Id'

'4.实现beanFactoryAwar'接口，重写setBeanFactory，'获取BeanFactory'

'5.实现applicationContext'接口，重写setApplicationContext，'获取ApplicationContext'

'6.BeanPostProcessor'后置处理器，它类似于web filter;他'把所有的对象'都'过一遍'
重写它的'postProcessBeforeInitialization'和'postProcessAfterInitialization'方法，
会在所有地方调用

'InitializingBean',重写afterPropertiesSet方法或<bean init-method="">或
@PostConstruct，来'做初始化前处理' 

他与'BeanFactoryPostProcessor'的区别，
'BeanPostProcessor'不能用set改变bean的内容，但'BeanFactoryPostProcessor' 可以

'7.bean装载完成，可以使用了'

'8.关闭容器'

'9.调用销毁方法disProblebean'或者自定义销毁方法<bean deatory-method="">或@PreDestory，来做销毁前处理
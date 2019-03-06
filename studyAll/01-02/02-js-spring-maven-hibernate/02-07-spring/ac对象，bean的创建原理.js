'ClassPathXmlApplicationContext'
作用是'访问bean配置文件' '新建ApplicationContext 容器对象（ac对象）'

'beanfactory'('beanFactory'接口与'ApplicationContext'
接口创建的对象作用很类似，'但是一般选用ac对象') 
'当执行上述代码'，就'加载spring'，就会'产生bean'

'ac对象结构'类似hashMap(id：'',对象:{})

getBean(String name)'根据id''返回一个''唯一的bean接口',其中'id是存在堆中的地址'

'是怎样得到bean对象的呢'
<bean id='u' class=''>'自身有Id，class等属性'
'内部有property等元素'，property也有自己对应得属性，name,ref
<property></property>
</bean>
上述通过'java反射机制'封装了如下代码
User u=Class.forName("com.service.User");
u.setName("han");
ac=new HashMap();
ac.put(u);
'get和load的区别'

'懒加载属性'让数据在需要的时候才进行加载，这时我们就用到了懒加载 lazy="true"

load先到缓存找，找不到先返回代理，使用时候再去数据库找
get，在缓存找不到时，直接去数据库，
知道有数据用load，反之get

'SesionFactory'缓存了数据，提供获取session的接口
openSession '线程'中'需要不同的session'
getCurrentSession(在核心xml中配置后才能使用) 一个线程使用同一个session

1.'openSession'从字面上可以看得出来，是'打开'一个'新的session'对象，
而且'每次'使用'都'是'打开'一个'新的session'，
假如连续使用多次，则获得的'session不是同一个对象'，并且'使用完'需要'调用close'方法'关闭session'。

2. 'getCurrentSession' ，从字面上可以看得出来，是获取'当前上下文一个session'对象，当'第一次使用'此方法时，
会自动'产生一个session对象'，并且连续'使用多次'时，'得到的session'都'是同一个'对象，
这就是与openSession的区别之一，简单而言，getCurrentSession 
就是：如果有已经使用的，用旧的，如果没有，建新的。
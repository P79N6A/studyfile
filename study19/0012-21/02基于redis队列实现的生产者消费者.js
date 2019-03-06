一.简介
'基于redis队列的生产者消费者'实现主要是'利用redis的blpop''或者brpop命令'，
以下是官方文档对这两个命令的描述：

'BLPOP' 是'列表'的'阻塞式'(blocking)'弹出原语'。

'它是 LPOP 命令'的'阻塞版本'，当'给定列表内''没有任何元素''可供弹出的时候'，
'连接将被' 'BLPOP 命令阻塞'，'直到等待超时''或发现可弹出元素为止'。

'当给定多个 key 参数时'，'按参数 key 的先后顺序''依次检查各个列表'，
'弹出第一个''非空列表的头元素'。

'BRPOP的描述差不多'，这里就不重复了。

那么有了这两个命令，实现生产者消费者模式就有思路了，
我们'从外界'数据源'不停的传入数据到'redis指定的'list里面'，
此时'不管有没有消费者'，我们的'数据'是'会存储在list里'的。

然后'消费者的程序'只需'要调用blpop命令'，如果'指定的list里面有数据'，
就'能从里面取得list最左边的数据'；如果'指定的list里面没有数据'，
那么就'会阻塞在那'，直'到list里面来了新数据''或者已经达到阻塞时间'为止。

二.'普通生产者消费者代码'：
'生产者'我们就'用自己生成的数据模仿'。

public class RedisProducer {
    public static void main(String[] args) throws InterruptedException {
        Jedis jedis=JavaRedisUtils.getJedis();
        jedis.select(4);
        int count=0;
        while(count<100){
            Thread.sleep(300);
            jedis.lpush("mylist",String.valueOf(count));
            count++;
        }
        jedis.close();
    }
}
然后'消费者得集成Thread类'，'重写run方法'，
我们'可以在run方法'里面'写'一些对取出来的数据需要进行的'业务操作'，
我这里就是'简单的打印出来判断是否取出数据'。
public class Consumer extends Thread{
    String name;
 
    public Consumer(String name) {
        this.name = name;
    }
 
    @Override
    public void run(){
            Jedis jedis = JavaRedisUtils.getJedis();
        while(true) {
 
            jedis.select(4);
            //阻塞式brpop，List中无数据时阻塞
            //参数0表示一直阻塞下去，直到List出现数据
            List<String> list = jedis.blpop(0, "mylist");
            for(String s : list) {
                System.out.println(name+"   "+s);
            }
            jedis.close();
 
        }
    }
}
下面是程序的consumer执行类：

public class RedisConsumer {
    public static void main(String[] args) {
        Consumer mq1=new Consumer("mq1");
        Consumer mq2=new Consumer("mq2");
        mq1.start();
        mq2.start();
 
    }
}
下面是程序运行部分结果：

我们可以从结果中看到，我们的'消费者'是真的'取到了数据'并且在原始'没有数据的时候'，
我们的'消费者是阻塞了的'，直到新数据来临才继续取数据。

'为了更加方便'的'观看'到'生产者和消费者'的程序'执行情况'，
我们将'从"mylist"中'的消费数据'利用redis的brpoplpush命令'
'将数据从mylist''消费到各个消费者''自己名字的列表中'。

下面是brpoplpush的解释：

BRPOPLPUSH 是 'RPOPLPUSH' 的'阻塞版本'，'当给定'列表 'source 不为空'时， 
'BRPOPLPUSH' 的'表现和 RPOPLPUSH 一样'。

当'列表 source 为空'时， 'BRPOPLPUSH 命令''将阻塞连接'，直'到等待超时'，
或有'另一个客户端''对 source 执行 LPUSH 或 RPUSH 命令为止'。

超时参数 timeout 接受一个以秒为单位的数字作为值。
超时参数设为 0 表示'阻塞时间'可以'无限期延长'(block indefinitely) 。

返回值：
假如'在指定时间内''没有任何元素被弹出'，则'返回一个 nil 和等待时长'。
反之，'返回一个''含有两个元素的列表'，'第一个元素''是被弹出元素的值'，
'第二个元素''是等待时长'。
public class Consumer extends Thread{
    String name;
 
    public Consumer(String name) {
        this.name = name;
    }
 
    @Override
    public void run(){
        Jedis jedis = JavaRedisUtils.getJedis();
        jedis.select(4);
        while(true) { 
        	'调用brpoplpush方法' '从mylist取出来'然后'放到对应name的list去'
            String a=jedis.brpoplpush("mylist",name,0);
        }
    }
}
'运行程序之后'，'redis库'中'出现了mq1以及mq2的list'，
'并且他们分别消费了''mylist中的所有数据'：

以及它们分别消费的数目：

'三.在消费过程中''新增加消费者'
上面我们已经做过实验了，'它能够''做到生产者和消费者''能做到的事情'：
'当list没有数据的时候'，'消费者会阻塞'，'当list新来数据的时候'，它'会接着进行消费'。
那么'当新来一个新的消费者'的时候，它'会有什么变化呢'？

新加入消费者的代码如下：
public class addconsumer {
    public static void main(String[] args) {
        Consumer mq3=new Consumer("mq3");
        mq3.start();
    }
}
下面'我们先运行生产者'，'紧接着运行消费者mq1和mq2'，'等它们消费一段时间'，
'并且生产者数据''还在传输的时候'，我们'开启消费者mq3'。
让我们来'看看结果会是怎么样'。

redis数据库中'产生了三个列表'。

它们分别的数据量为：

说明，'当新加入消费者的时候'，它'会和其它两个消费者内部竞争'，
然后'一起消费没有消费过的数据'。

以上是redis队列实现的消费者和生产者demo，希望可以给大家提供到帮助。
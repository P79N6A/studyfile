一、背景
1. '前端重复提交'选中的数据，应该'后台'只产生'对'应'这个数据'的'一个反应结果'。
2. 我们发起一笔'付款请求'，应该'只扣'用户'账户一次钱'，
   当遇到'网络重发'或'系统bug重发'，也应该'只扣一次钱'；
3. 发送消息，也应该只发一次，同样的短信发给用户，用户会哭的；
4. 创建业务订单，一次业务请求只能创建一个，创建多个就会出大问题。

二、什么事幂等

一个操作，不论执行多少次，产生的效果和返回的结果都是一样的

三、实现幂等有哪些思路

1. 查询操作

查询一次和查询多次，在数据不变的情况下，查询结果是一样的。select是天然的幂等操作

2. 删除操作

删除操作也是幂等的，删除一次和多次删除都是把数据删除。(注意可能返回结果不一样，删除的数据不存在，返回0，删除的数据多条，返回结果多个)

3.唯一索引，防止新增脏数据

比如：支付宝的资金账户，支付宝也有用户账户，每个用户只能有一个资金账户，怎么防止给用户创建资金账户多个，那么给资金账户表中的用户ID加唯一索引，所以一个用户新增成功一个资金账户记录

要点：

唯一索引或唯一组合索引来防止新增数据存在脏数据

（当表存在唯一索引，并发时新增报错时，再查询一次就可以了，数据应该已经存在了，返回结果即可）

4. token机制，防止页面重复提交

业务要求：

页面的数据只能被点击提交一次

发生原因：

由于重复点击或者网络重发，或者nginx重发等情况会导致数据被重复提交

解决办法：

集群环境：采用token加redis（redis单线程的，处理需要排队）

单JVM环境：采用token加redis或token加jvm内存

处理流程：

1. 数据提交前要向服务的申请token，token放到redis或jvm内存，token有效时间

2. 提交后后台校验token，同时删除token，生成新的token返回

token特点：

要申请，一次有效性，可以限流

注意：redis要用删除操作来判断token，删除成功代表token校验通过，如果用select+delete来校验token，存在并发问题，不建议使用

5. 悲观锁

获取数据的时候加锁获取

select * from table_xxx where id='xxx' for update;

注意：id字段一定是主键或者唯一索引，不然是锁表，会死人的

悲观锁使用时一般伴随事务一起使用，数据锁定时间可能会很长，根据实际情况选用

6. 乐观锁

乐观锁只是在更新数据那一刻锁表，其他时间不锁表，所以相对于悲观锁，效率更高。

乐观锁的实现方式多种多样可以通过version或者其他状态条件：

1）. 通过版本号实现

update table_xxx set name=#name#,version=version+1 where version=#version#

2）. 通过条件限制

update table_xxx set avai_amount=avai_amount-#subAmount# where avai_amount-#subAmount# >= 0

要求：quality-#subQuality# >= ，这个情景适合不用版本号，只更新是做数据安全校验，适合库存模型，扣份额和回滚份额，性能更高

注意：乐观锁的更新操作，最好用主键或者唯一索引来更新,这样是行锁，否则更新时会锁表，上面两个sql改成下面的两个更好

update table_xxx set name=#name#,version=version+1 where id=#id# and version=#version#

update table_xxx set avai_amount=avai_amount-#subAmount# where id=#id# and avai_amount-#subAmount# >= 0

7. 分布式锁

还是拿插入数据的例子，如果是分布是系统，构建全局唯一索引比较困难，例如唯一性的字段没法确定，这时候可以引入分布式锁，通过第三方的系统(redis或zookeeper)，在业务系统插入数据或者更新数据，获取分布式锁，然后做操作，之后释放锁，这样其实是把多线程并发的锁的思路，引入多多个系统，也就是分布式系统中得解决思路。

要点：某个长流程处理过程要求不能并发执行，可以在流程执行之前根据某个标志(用户ID+后缀等)获取分布式锁，其他流程执行时获取锁就会失败，也就是同一时间该流程只能有一个能执行成功，执行完成后，释放分布式锁(分布式锁要第三方系统提供)

8. select + insert

并发不高的后台系统，或者一些任务JOB，为了支持幂等，支持重复执行，简单的处理方法是，先查询下一些关键数据，判断是否已经执行过，在进行业务处理，就可以了

注意：核心高并发流程不要用这种方法

9. 状态机幂等

在设计单据相关的业务，或者是任务相关的业务，肯定会涉及到状态机(状态变更图)，就是业务单据上面有个状态，状态在不同的情况下会发生变更，一般情况下存在有限状态机，这时候，如果状态机已经处于下一个状态，这时候来了一个上一个状态的变更，理论上是不能够变更的，这样的话，保证了有限状态机的幂等。

注意：订单等单据类业务，存在很长的状态流转，一定要深刻理解状态机，对业务系统设计能力提高有很大帮助

10. 对外提供接口的api如何保证幂等

如银联提供的付款接口：需要接入商户提交付款请求时附带：source来源，seq序列号

source+seq在数据库里面做唯一索引，防止多次付款，(并发时，只能处理一个请求
)
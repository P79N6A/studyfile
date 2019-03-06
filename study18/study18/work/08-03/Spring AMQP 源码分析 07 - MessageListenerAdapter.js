'了解Spring AMQP'如何'用POJO处理消息'

前置知识
《Spring AMQP 源码分析 04 - MessageListener》

相关资源
Offical doc：<http://docs.spring.io/spring-amqp/docs/1.7.3.RELEASE/reference/html/_reference.html#message-listener-adapter>
Sample code：<https://github.com/gordonklg/study>，rabbitmq module
源码版本：Spring AMQP 1.7.3.RELEASE

gordon.study.rabbitmq.springamqp.AsyncConsumerWithAdapter.java


MessageListenerAdapter 利用反射机制使普通的 POJO 就能处理消息。
 
MessageListenerAdapter 本身实现了 ChannelAwareMessageListener 接口，整个逻辑的核心就在 onMessage 方法中。
 
第269行获取实际处理消息的对象 delegate，本例中即为 CommonPrintBean 实例。
 
接下来判断 delegate 是否为 MessageListener 或 ChannelAwareMessageListener 接口，如果是，则调用 onMessage 方法处理。也就是说，MessageListenerAdapter 的委托实例可以是 MessageListener 或 ChannelAwareMessageListener。
对于本例这种 POJO 委托类，第288行先抽取消息。extractMessage 方法会尝试获取 MessageConverter，MessageListenerAdapter 默认的消息转化器是 SimpleMessageConverter。如果存在 MessageConverter，则调用其 fromMessage 方法将消息转化为对象。否则直接返回 Message 本身。注意，Spring AMQP 默认的 SimpleMessageConverter 很容易坑人，请在脑海中留下印象：消息在被对应的方法消费前，会被 MessageConverter 做一次转换！

 
第289行，根据原始的 message 信息，通过 getListenerMethodName 方法确定该消息应该被哪个方法消费。核心属性是 MessageListenerAdapter 的 Map<String, String> queueOrTagToMethodName，其 key 为队列名或 consumer tag，值为方法名。也就是说，我们可以为不同的队列设置不同的方法，也可以为不同的 Consumer 设置不同的方法。如果没有匹配的方法，则使用默认方法 handleMessage。

 
第297行，根据 convertedMessage 创建参数列表。MessageListenerAdapter 创建的参数列表永远是长度为1的数组，也就是说，POJO 中合理的消息处理方法必然都是只有一个参数的。

 
第298行，利用反射机制调用对应方法消费消息。显然，convertedMessage 的类型决定了反射会调用哪个同名方法。
 
## 示例代码分析
示例代码中 CommonPrintBean 提供了三个不同的 printMessage 方法。考虑到默认使用 SimpleMessageConverter，convertedMessage 类型为 String，所以会调用 String 参数版本的 printMessage 方法。
 
如果打开第22行注释，将 MessageConverter 设置为 null，则会调用 Message 参数版本的 printMessage 方法。
 
一般来说，不会用到 Object 参数版本的 printMessage 方法，但是提供这个方法可以确保在 MessageListenerAdapter 的委托 POJO 中一定能够找到消息处理方法（打个错误日志也好）。
 
## 异常分析
业务异常与直接使用 MessageListener 接口完全一致。代码第45行抛出的 AmqpRejectAndDontRequeueException 异常会引导框架拒绝消息并使之不重新入队。
 
如果期望的消息消费方法不存在，会抛出被 ListenerExecutionFailedException 包装的 NoSuchMethodException，由于 NoSuchMethodException 是 DefaultExceptionStrategy 的 fatal 异常，因此异常会被 AmqpRejectAndDontRequeueException 再次包装。AsyncMessageProcessingConsumer 的 run 方法循环消费消息逻辑中，遇到 AsyncMessageProcessingConsumer 直接静默处理。所以，如果没有对应的方法，框架最终会把所有的消息都转到死信队列中去。
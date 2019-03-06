	程程单车
	netty的启动和配置类 DockServerBootstrap
	
	'spboot'中使'用@PostConstruct注解'的内容'会在bean装载'的'时'候'调用'
	
	首先new ServerBootstrap（）并为它设置boss和worker
// '创建了两个EventLoopGroup对象'，作为group设置到ServerBootstrap中，
// 'EventLoop'这个'相当于'一个'处理线程'，'是'Netty'接收请求'和'处理IO请求''的线程'。
// 'EventLoopGroup是EventLoop对象池'
	然后设置channel[socket工厂]，参数
// bootstrap.channel(NioServerSocketChannel.class);
// bootstrap.option(ChannelOption.SO_BACKLOG, 1024);
	然后设置ChildHandler[管道工厂]
// ChannelPipeline p = ch.pipeline();
// p.addLast("decoder", new DockRequestDecoder());
// p.addLast("encoder", new ByteArrayEncoder());
// p.addLast(new IdleStateHandler(0, 0, netty_disTime));
// p.addLast(nettyServerHandler);
	ChannelPipeline
	Netty处理请求的'责任链'，'是'个'ChannelHandler实例对象'的'列表'。
	ChannelHandler
	用来'处理网络''请求''内容'
	有ChannelInboundHandler和ChannelOutboundHandler两种。
	ChannelPipeline'从头到尾''调用ChannelInboundHandler''处理'网络请求内容
	'从尾到头''调用ChannelOutboundHandler''处理'网络请求'内容'。
	'用多个decoder'和'encoder'进行组合，而'适应不同的网络协议'
    // '最后'调'用bind()'方法'启动服务'。
    
	我们自定义的请求过滤链
	DockRequestDecoder  //过滤攻击性请求，把信息封装成req传到下个过滤连
	处理请求的链
	DockServerHandler
	
	'ChannelHandlerContext'的'writeAndFlush方法'会'将数据''写到ChannelPipeline中'
当前ChannelHandler的'下一个ChannelHandler开始处理'。
	ChannelHandlerContext#writeAndFlush实现源码：
	
	'Channel的writeAndFlush方法'会'将数据''写到ChannelPipeline'中'最后一个'
	'ChannelHandler''然后数据从尾'部开始'向头'部方向'流动'会'经过所有的ChannelHandler', 
	'ChannelPipeline'中的'所有ChannelHandler''都可'以'处理数据'。
	
	
	
1.建立连接规则
继承ChannelHandlerAdapter 重写他的方法
	1.chanelRead 接收信息时触发，用于处理业务。最终，释放所有传递到处理器的引用计数对象
	2.exceptionCaught 发生异常时触发，用于处理异常
	
2.应用规则
	'NioEventLoopGroup' '是'用来'处理I/O操作'的'多线程事件循环器'，
	Netty提供了许多'不同的EventLoopGroup'的实现用来'处理''不同''传输协议'。 
	在这个例子中我们'实现了''一个服务端的应用'，因此会'有2个NioEventLoopGroup'会'被使用'。 
	第一个经常被叫做'‘boss’'，用来'接收'进来的'连接'。
	第二个经常被叫做'‘worker’'，用来处理已经被接收的连接， 
	一旦'‘boss’'接'收到连接'，就会把连接信息'注册到‘worker’上'。
	'如何知道''多少个线程'已经'被使用'，'如何映射到''已经创建的Channels上'都需'要依赖于EventLoopGroup的实现'，
	并且'可以通过构造函数'来'配置他们的关系'。
	
	'ServerBootstrap' 是一个'启动NIO服务'的'辅助启动类' 
	你'可以在这个服务'中直接'使用Channel'
	
	ServerSocketChannel以NIO的selector为基础进行实现的，用来接收新的连接
    这里'告诉Channel''如何获取''新的连接'.
	
	你可以'设置'这里指定的'通道实现'的'配置参数'。我们正在'写一个TCP/IP'的'服务端'，
    因此我们被'允许设置socket的参数'选项比如'tcpNoDelay和keepAlive'。
    请参考ChannelOption和详细的ChannelConfig实现的接口文档以此可以对ChannelOptions的有一个大概的认识。
	
	
	这里的'事件处理类'经常会'被用来处理'一个'最近'的已经'接收的Channel'。 
	'ChannelInitializer''是'一个'特殊的处理类'，
    他的目的是'帮助使用者''配置'一个'新的Channel'。
    也许你'想'通过'增加一些处理类'比如'NettyServerHandler'来'配置一个新的Channel'
    '或者其对应的ChannelPipeline'来'实现你的网络程序'。 
	'当你的程序'变的'复杂时'，可能'你会增加更多的处理类''到pipline上'，
    然后'提取'这些匿名'类到最顶层的类上'。
	
	'绑定端口'并'启动'去'接收'进来的'连接'
	
	'继承''ByteToMessageDecoder' 写'解码器'
	
	使'用ByteArrayEncoder' '做编码器'
	
	使'用IdleStateHandler' 定义'心跳策略'
	
	
	
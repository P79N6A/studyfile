'https://blog.csdn.net/wayne_primes/article/details/79034126'
MQ全称为Message Queue, 消息队列（MQ）是一种应用程序对应用程序的通信方法。
应用程序通过读写出入队列的消息（针对应用程序的数据）来通信，
而无需专用连接来链接它们。
消息传递指的是程序之间通过在消息中发送数据进行通信，
而不是通过直接调用彼此来通信，直接调用通常是用于诸如远程过程调用的技术。
排队指的是应用程序通过 队列来通信。
队列的使用除去了接收和发送应用程序同时执行的要求。
其中较为成熟的MQ产品有IBM WEBSPHERE MQ等等。

'安装rabbitMQ前''需要先安装erlang语言开发包'
'下载erlang20版本'
wget http://packages.erlang-solutions.com/site/esl/esl-erlang/FLAVOUR_1_general/esl-erlang_20.0-1~ubuntu~trusty_amd64.deb

'安装erlang20版本'
dpkg -i esl-erlang_20.0-1~ubuntu~trusty_amd64.deb

'安装不了'就按'照报错执行'
apt-get install -f

'下载rabbitmq3.6.11版本'
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/rabbitmq_v3_6_11/rabbitmq-server_3.6.11-1_all.deb

'安装rabbitmq3.6.11'
'安装不了'就按'照报错执行'
apt-get install -f
dpkg -i rabbitmq-server_3.6.11-1_all.deb
（如果安装不了可能为默认5672短端口占用等）
'netstat –anp|grep 5672'

'查看rabbitmq状态'已经'erlang版本是否正确'
rabbitmqctl status

'修改端口''复制改默认配置文件至''/etc/rabbitmq/rabbitmq.config''取消注释'，
'确认标点符号准确'，'若该目录下''/etc/rabbitmq''没有rabbitmq.config配置文件'
'或者这个目录下没有''/usr/share/doc/rabbitmq-server/rabbitmq.config.example'

'首先在/etc/rabbitmq'下'创建一个rabbitmq.config 的文件'
'复制下面的参数'并'保存重启MQ',也可以修改默认参数改管理端口，
修改日志级别等等等，这里就不详细说了，有疑问的道友可以在评论，
看到之后会第一时间回复。

vi /etc/rabbitmq/rabbitmq.config 
然后'将下面的参数全部复制到'该'rabbitmq.config配置文件中',
当然不写也是可以的，那么安装好之后就是默认的参数

'启用web'
rabbitmq-plugins enable rabbitmq_management

添加用户并授予管理员权限（重启生效）
rabbitmqctl add_user user password
rabbitmqctl set_user_tags user administrator

'Web访问地址 ip:15672'看后台是否可以正常使用

消息系统的分布式可扩展的实现在于消息广播, 集群性的实现在于邮箱队列. 
RabbitMQ是先广播后队列的.

Exchange: 就是邮局的概念等同于 中国邮政和顺丰快递、 
routingkey: 就是邮件地址的概念. 
queue: 就是邮箱接收软件，但是可以接收多个地址的邮件，通过bind实现。 
producer： 消息生产者，就是投递消息的程序。 
consumer：消息消费者，就是接受消息的程序。 
channel：消息通道，在客户端的每个连接里，可建立多个channel，每个channel代表一个会话任务。

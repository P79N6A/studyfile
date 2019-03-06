通信模式：发送者(pub)发送消息，订阅者(sub)接收消息

SUBSCRIBE c1 c2 c3 一次订阅多个
PUBLISH c2 hello-c2 发布消息
SUBSCRIBE new* 订阅多个，通配符*，
PUBLISH new1 dddd 发布消息

订阅者(sub)订阅消息 c1 c2 c3
127.0.0.1:6379> SUBSCRIBE c1 c2 c3
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "c1"
3) (integer) 1
1) "subscribe"
2) "c2"
3) (integer) 2
1) "subscribe"
2) "c3"
3) (integer) 3

发送者(pub)在 c2 频道发布了消息 hello-c2
127.0.0.1:6379> PUBLISH c2 hello-c2
(integer) 1

订阅者(sub)收到了订阅的消息
1) "message"
2) "c2"
3) "hello-c2"



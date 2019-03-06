'什么是长连接'和'短链接'

所谓'短连接指''建立SOCKET连接后''发送后''接收完数据后''马上断开连接'，
一般'银行都使用短连接'
解释2
'长连接'就是'指在基于tcp的通讯中'，'一直保持连接'，
'不管当前''是否发送或者接收数据'。
而'短连接就是'只有在'有数据传输的时候''才进行连接'，
'客户－服务器通信/传输数据完毕'就'关闭连接'。
解释3
'长连接和短连接'这个'概念'好像'只有移动的CMPP协议'中'提到了'，
其他的地方没有看到过。
'通信方式'
'各网元之间'共有'两种连接方式'：'长连接和短连接'。
所谓'长连接'，
'指在一个TCP连接上'可以'连续发送多个数据包'，'在TCP连接保持期间'，
如果'没有数据包发送'，需'要双方发检测包''以维持此连接'。
'短连接是'指'通信双方有数据交互时'，'就建立一个TCP连接'，'数据发送完成后'，
则'断开此TCP连接'，即每次TCP连接只完成一对
'CMPP消息的发送'。
现阶段，要求'ISMG之间'必须'采用长连接的通信方式'，
建议'SP'与'ISMG之间''采用长连接的通信方式'。
解释4
'短连接'：比'如http'的，'只是连接、请求、关闭'，过程时间较短,
'服务器若是一段时间内没有收到请求'即'可关闭连接'。


'HTTP是长连接还是短连接'

'既有长连接''也有短链接'
'HTTP1.1'规定了'默认保持长连接'（HTTP persistent connection ，也有翻译为持久连接），
'数据传输'完成了'保持TCP连接不断开'（不发RST包、不四次握手），
'等待在同域名下''继续用这个通道传输数据'；相反的就是短连接。

具体解释如下：
'在HTTP/1.0中'，'默认'使用的是'短连接'。也就是说，'浏览器和服务器'每'进行一次HTTP操作'，
'就建立一次连接'，但'任务结束就中断连接'。
如果'客户端浏览器''访问的某个HTML''或其他类型的 Web页'中包'含有其他的Web资源'，
'如JavaScript文件'、'图像文件、CSS文件'等；当'浏览器每遇到这样一个Web资源'，
就'会建立一个HTTP会话'。
但'从 HTTP/1.1起'，'默认使用长连接'，用以'保持连接特性'。
使'用长连接的HTTP协议'，会'在响应头有加入这行代码'：
'Connection:keep-alive'
在使'用长连接的情况下'，当'一个网页打开完成后'，
'客户端和服务器之间用于传输HTTP数据的 TCP连接''不会关闭'，
如果'客户端再次访问这个服务器上的网页'，会'继续使用这一条已经建立的连接'。
Keep-Alive'不会永久保持连接'，它'有一个保持时间'，
'可以在不同的服务器软件'（如Apache）中'设定这个时间'。
实现'长连接要客户端和服务端都支持长连接'。
'HTTP协议的长连接和短连接'，'实质上是TCP协议的长连接和短连接'


'TCP长连接与短连接有什么区别'
'短连接'一般'只会在client/server间''传递一次读写操作'。
'长连接在完成一次读写之后'，它们之间的'连接并不会主动关闭'，
'后续的读写操作会继续使用这个连接'。

'短连接的优点是'：'管理起来比较简单'，'存在的连接'都'是有用的连接'，
'不需要额外的控制手段'。

'长连接''有TCP保活功能'，'主要为探测''长连接的存活状况'，
不过'这里存在一个问题'，'存活功能的探测周期''太长'，
'还有'就'是'它只是'探测TCP连接的存活'，'属于比较斯文的做法'，
遇到'恶意的连接时'，'保活功能就不够使了'。
'长连接和短连接'主要'区别在于client和server'采取'的关闭策略'。


'socket是长连接还是短连接'
'长连接'，指'在一个TCP连接上'可以'连续发送多个数据包'，
在'TCP连接保持期间'，如果'没有数据包发送'，'需要双方''发检测包'以'维持此连接'，
'一般需要自己做在线维持'。
'短连接'，是'指通信双方''有数据交互时'，就'建立一个TCP连接'，
'数据发送完成'后，则'断开此TCP连接'，一般'银行都使用短连接'。
比'如http的'，只'是连接、请求、关闭'，过程时间较短,
'服务器'若是'一段时间内没有收到请求'即'可关闭连接'。
其实'长连接是''相对于通常的短连接而说的'，
也'就是长时间保持客户端'与'服务端的连接状态'。
所以说'socket有长连接','也有短连接','还有无连接,比如UDP'

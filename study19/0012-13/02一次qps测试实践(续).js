想着'探讨nginx负载均衡的作用'

'服务器' 'A 4核','B 8核'
'nginx 部署在A'，'tomcat1 tomcat2部署在B'（因为没第三台机器了，只能先这样看看效果）

nginx worker_connections 51200   
'后台worker process进程'的'最大并发链接数 worker_connections 1024'; 
# '并发总数是' 'worker_processes' '和worker_connections的乘积'
nginx worker_process auto  （＝4）
'nginx 配置长连接'   keepalive 1000
（'每个worker process''进程初始长连接数'，'设置越大，内存占用越多'）

'tomcat配置'
<Connector port="8088" protocol="HTTP/1.1" 
	maxThreads="5" 
	minSpareThreads="2" 
	acceptCount="2" 
	connectionTimeout="1000" 
	maxConnections="1000" 
	keepAliveTimeout="300000" 
	maxKeepAliveRequests="1000" 
redirectPort="8443" />

关键参数说明：
'maxThreads' －'线程池中''最大的活跃线程数'，'默认值200'，不要太高，线程切换有开销
'minSpareThreads' －'保持存活的最小线程数'，'默认值25'
'acceptCount' －'当tomcat启动的线程数''达到最大时'，'接受排队的请求个数'。
默认值为100，超出的会拒绝请求

'maxKeepAliveRequests'： '最大长连接个数'
（'1表示禁用'，'-1表示不限制个数'，'默认100个'。'一般设置在100~200之间'）
'nginx动态的转给tomcat'，'nginx是不能keepalive的'（错），
而'tomcat默认开启keepalive'，'会等待keepalive的timeout'，
'默认不设置''就是使用connectionTimeout'。
'所以必须设置''tomcat的超时时间'，'并关闭''tomcat的keepalive'。
'否则会产生大量''tomcat的socket timewait'。
'maxKeepAliveRequests="1"''表示每个连接''只响应一次就关闭'，
这'就不会等待timeout了'，'可避免tomcat产生大量''TIME_WAIT连接'，
从一定程度上'避免tomcat假死'。

'第一次测试，20并发2分钟'，nginx－》B，	 tps 1500，总事务数  20w，
'第二次测试，20并发2分钟'，nginx－》2*B，tps 1500
猜测？
1）'nginx与tomcat连接太多'，'导致''nginx端口占满后阻塞'
2）'nginx工作线程满了'
3）'压力还不够'

'互联网''常见架构接口压测性能分析''及调优手段建议'
'##### https://www.cnblogs.com/dimmacro/p/4849729.html #####'
	
2.2	'压测现象'：'数据库无压力'，'应用增加多台后tps不变'
　　2.2.1 问题分析:
	'1N1T和1N10T的tps一样'，'都为5000'，'增大并发时错误数增多'，
'应用cpu耗费70%'，'db无压力'，'nginx单台通过ss –s''发现端口占满'，
'即nginx到tomcat之间''转发的连接端口''time-wait状态6万多'。'Nginx存在瓶颈'。

　　2.2.2 改进措施:
	'调优nginx参数'，'将短连接改为长连接'

　　2.2.3 改进效果:
	'1N3T的tps能到17376'，'tomat的cpu压力84%'，'db的qps18000'，'cpu69%'，
'应用的资源''基本使用到量'。

看了这个帖子后，就一直往长连接去靠，查阅了很多资料

'记一次压力测试和''对nginx/tomcat配置的调整'
'##### https://www.cnblogs.com/AloneSword/p/4119928.html #####'

批注：'nginx改keepalive' ，'无果'——'tomcat keepalive放大'

原因个人分析：'tomcat默认打开keepalive功能'，
'而其maxKeepAliveRequests参数默认值为100'，'tomcat只接受100个长连接'，
'假设nginx发了1000个长连接'，'还有900个长连接''tomcat直接当短链接处理'，
'发出关闭信号'，'进入time_wait状态'，'nginx只得再开连接'

'在我们压测的过程中'，'通过netstat命令''可以看到有很多nginx向tomcat发起的连接'。
'这些连接都是短连接'，'每次用完即关闭'。
'于是想到nginx''向后端源服务器''能否建立长连接的问题'。
查看了一下文档，'nginx从1.1.4版本开始'，
'支持proxy_pass的时候''向后端源服务器''建立长连接'。

'通过tcpdump抓包发现'， '首先发出 Fin 包的是tomcat'。
'也就是说，tomcat主动关闭的连接'。

'原来在tomcat的配置文件中'，'有关于keepalive的几个参数'。
'包括每一个连接''完成多少个http请求之后''就关闭等'。

'对tomcat的connector''进行了一些调整'
（'包括maxKeepAliveRequests''和keepAliveTimeout两个参数'，'都设置成-1'）之后，
'再看连接'，'已经不会频繁断开并重建了'。'QPS也提升到了900+'.（待验证）

'Nginx upstream性能优化'
'##### https://www.cnblogs.com/shengs/p/4701905.html #####'

'keepalive'
批注：'keepalive参数''表示每个工作进程所能保持的''最大长连接'，
'且不会限制连接总数'，'新长连接会创建'

'激活对上游服务器的连接''进行缓存'。
'connections参数''设置每个worker进程''与后端服务器''保持连接的最大数量'。
'这些保持的连接''会被放入缓存'。
'如果连接数''大于这个值时'，'最久未使用的连接''会被关闭'。
'需要注意的是'，'keepalive指令''不会限制Nginx进程''与上游服务器的连接总数'。
'新的连接''总会按需被创建'。'connections参数''应该稍微设低一点'，
'以便上游服务器'也'能处理额外新进来的连接'。

1) '对于HTTP代理'，'proxy_http_version指令''应该设置为“1.1”'，
'同时“Connection”头的值''也应被清空'。

2) '另外一种选择是'，
'HTTP/1.0协议'的'持久连接也可以通过发送''“Connection:Keep-Alive”头''来实现'。
不过不建议这样用。

3) '对于FastCGI的服务器'，
需'要设置 fastcgi_keep_conn 指令''来让连接keepalive工作'。
'当使用的负载均衡方法''不是默认的轮转法时'，'必须在keepalive指令之前配置'。

'nginx配置长连接---keepalive相关'
'##### http://blog.csdn.net/senlin1202/article/details/54617635 #####'
# 批注：'连接到上游服务器的''最大并发''空闲keepalive长连接数'
（'默认是未设置'，'建议与Tomcat Connector中的''maxKeepAliveRequests值一样'）
# '当这个数被超过时'，'使用''"最近最少使用算法(LUR)"''来淘汰并关闭连接'。
keepalive 768;

'关于 Nginx upstream keepalive 的说明'
'##### https://www.cnblogs.com/kabi/p/7123354.html #####'

'批注'（重要）：'如果并发请求超过keepalive值'，'nginx启用新连接'，
'且默认发送长连接'，'后端tomcat收到keepalive信号'，'不主动关闭'，
'由nginx来发送关闭信号'，
'由此产生nginx''得time－wait状态连接'，'且占用端口'

1. '默认情况下 Nginx 访问后端''都是用的短连接'(HTTP1.0)，
'一个请求来了'，'Nginx 新开一个端口''和后端建立连接'，'请求结束''连接回收'。
'如果像上面的配置一样''设置了长连接'，'Nginx会接受客户端的请求'，
'处理完成之后''Nginx会'「'继续保持和后端的长连接'」，
'如果并发请求''超过了keepalive''指定的最大连接数'，
'Nginx''会启动新的连接''来转发请求'，'新连接''在请求完毕后关闭'，
'而且新建立的连接是长连接'，'这可能会造成额外的问题'，最后再说。

2. 'keepalive指定的数值''是Nginx每个worker连接后端的''最大长连接数'，
'而不是整个Nginx的'。'而且这里的后端指的是'「'所有的后端'」，
'而不是每一个后端'(已验证)。

'先说一个现象'，'我发现当 keepalive 设置小的时候'，
'比如1'，'那么并发请求上去之后''Nginx 会出现大量的 TIME_WAIT'，
'而如果把 keepalive 关掉'
('proxy_http_version 1.1' 和 'proxy_set_header Connection' “” '指令也去掉')，
'那么 TIME_WAIT 就会出现在后端服务器了'，'后端用的是 tornado'，
'相信 jetty 和 tomcat 也是一样'。（这个现象我亲自验证）
# tcpdump -i em2 -A host 10.0.11.12 -n

看到：
00:22:53.252039 IP 10.0.31.84.53915 > 10.0.11.12.ddi-tcp-1: Flags [P.], seq 81:161, ack 275, win 123, length 80
@.@.].
..T
…..”…p%8|..P..{>…GET / HTTP/1.1
Host: http_backend
User-Agent: ApacheBench/2.3
Accept: */*                         				###*/

但是如果把 pxe1.hy01 的长连接设置都去掉的话，抓包如下：

00:23:58.111974 IP 10.0.31.84.54051 > 10.0.11.12.ddi-tcp-1: Flags [P.], seq 1:100, ack 1, win 115, length 99
E…..@.@.Z=
..T
….#”…O…SUP..s>…GET / HTTP/1.0
Host: http_backend
Connection: close
User-Agent: ApacheBench/2.3
Accept: */*                         				###*/

'那么上面出现的现象就好解释了'，'是这样'：
'Nginx 和后端的长连接''不够用时'' Nginx 会新建连接''来处理新的请求'，
'而我们的配置''已经配置死了 HTTP1.1'，'建立连接后'，
'后端认为是「长连接」'而'不会主动关闭连接'(一般有个空闲超时)，
'关闭连接由 Nginx 来做了'，'所以 Nginx 会出现大量的 TIME_WAIT'。
'而默认情况下'，'Nginx 用 HTTP1.0 请求后端'，'后端处理完成''后就主动关闭连接'，
'所以 TIME_WAIT 在后端'。
那么'现在有新的问题了'，'如果开启了长连接'，'而长连接又大量不够用'，
此时'Nginx 存在的 TIME_WAIT ''可能会大量占用端口'，
'导致端口用尽'，'如果用尽，后果很严重'。

'Nginx与upstream（后端）长连接的问题？'
'##### https://www.zhihu.com/question/30682780?sort=created #####'
批注：'nginx长连接消耗内存'，'但是少了'，就'会产生很多time-wait连接占用端口'

'这个keepalive 16''就是每个worker'（进程？）'和upstream保持的长连接数'。
这个数量确实有的聊，'如何根据实际情况定量呢'
'多了浪费资源'，'少了'，'等于把time_wait转嫁给了ng'，显然这风险要更大
推荐先做一下估算，'根据QPS和响应时间''计算出需要的长连接量'。
'比如10000 QPS和100毫秒响应时间'可以'推算出的长连接数大概是1000.'
'将keepalive''设置为这个长连接数的10%到50%'。
当然'不考虑资源消耗的话'，'直接设置为keepalive=1000也OK'

'[备忘]nginx开启长连接，减少TIME_WAIT数量'
'##### http://www.mytju.com/classcode/news_readnews.asp?newsid=935 #####'
批注：'本文就在说nginx''和tomcat在长连接得数量上''要一致'

'keepalive 200';'表示nginx与后端tomcat''最多维持200个长连接'。
注意，'tomcat的connector''有个参数maxKeepAliveRequests'，'是'说'最大保持长连接的数量'，
默认是100。总之，nginx和tomcat要配合。

proxy_http_version 1.1; 'nginx与后端使用HTTP1.1协议'，'默认是1.0的'
proxy_set_header Connection ""; '覆盖head头吧'
-------------------------------------------------

'不按以上设置的话'，'nginx默认和后端使用短连接'，
'数据传输完后'，'后端发起关闭'，所以'导致后端服务器''有很多TIME_WAIT的连接'，
'保持5000'（多少是跟一个linux设置有关），下不来。

'打开长连接后'，'TIME_WAIT的值只有几百'。

——————————————————————————————————————
'也说说TIME_WAIT状态'
'##### https://www.cnblogs.com/yjf512/p/5327886.html #####'
批注：'主要思想－TIMEWAIT''是主动断开方才会出现'，一般情况下，
'nginx默认''不开长连接'，'tomcat开''且允许100个长连接'，但无聊'tomcat的情况是'怎么样的，
'nginx发出的请求''告诉tomcat''你执行完了就关闭请求'，'所以tomcat端出现很多timewait'

回到上面的问题，'go写了一个HTTP服务'，'压测发现TIME_WAIT过多'。

'首先判断''是不是压测程序''放在服务的同一台机器'...'当然不会犯这么低级的错误'...
那么这个'感觉就有点奇怪了'，'HTTP服务'并'没有依赖外部mysql''或者redis等服务'，
'就是一个简单的Hello world'，'而TIME_WAIT'的'是主动断开方才会出现的'，
'所以主动断开方是服务端'？
'答案是是的'。
'在HTTP1.1协议中'，'有个Connection 头'，Connection'有两个值'，
'close和keep-alive'，'这个头'就'相当于客户端告诉服务端'，
'服务端你执行完成请求之后'，'是关闭连接''还是保持连接'，
'保持连接'就'意味着在保持连接期间'，'只能由客户端''主动断开连接'。
'还有一个keep-alive的头'，'设置的值'就'代表了服务端''保持连接保持多久'。

'HTTP默认的Connection值为close'，
那么'就意味着''关闭请求的一方'几乎'都会是由服务端这边发起的'。
那么'这个服务端''产生TIME_WAIT过多的情况''就很正常了'。

'虽然HTTP默认Connection值为close'，
'但是现在的浏览器''发送请求的时候'一般'都会设置Connection为keep-alive'了。
所以，也有人说，'现在没有必要通过调整参数来使TIME_WAIT降低了'。

——————————————————————————————————————

'提高tomcat的并发能力'
'##### https://www.cnblogs.com/linjiqin/p/4430269.html #####'

批注：'主要思想'－'对多tomcat整合''提高吞吐量提出主张和肯定'

4、'采用Tomcat集群''可以最大程度'的'发挥服务器的性能'，
'可以在配置较高的服务器上''部署多个Tomcat'，'也可以在多台服务器上''分别部署Tomcat'，
'Apache和Tomcat整合的方式''还是JK方式'。
'经过验证'，'系统对大用户量使用的响应方面'，
Apache+3Tomccat集群> Apache+2Tomcat集群 > Apache集成Tomcat > 单个Tomcat。
并且'采用Apache+多Tomcat集群的部署方式时'，'如果一个Tomcat出现宕机'，
'系统可以继续使用'，'所以在硬件系统性能''足够优越的情况下'，
需'要尽量发挥软件的性能'，'可以采用增加Tomcat集群的方式'。

5. '打开KeepAlive支持' 
'KeepAlive on', 'KeepAliveTimeout 15' 'MaxKeepAliveRequests 1000' 
'根据实际经验'，'通过Apache和Tomcat集群的方式''提高系统性能的效果十分明显'，
'这种方式''可以最大化的利用硬件资源'，'通过多个Tomcat的处理'来'分担单Tomcat时的压力'。
——————————————————————————————————————————

'Linux下查看Nginx等的并发连接数和连接状态'
'##### http://www.linuxidc.com/Linux/2012-07/65411.htm #####'

批注：'查看timewait的两个命令'

netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'

ss -ant | awk 'NR>1 {++s[$1]} END {for(k in s) print k,s[k]}'

————————————————————————————————————————

'记一次压测引起的nginx负载均衡性能调优'

'##### http://xiaorui.cc/2016/06/26/%E8%AE%B0%E4%B8%80%E6%AC%A1%E5%8E%8B%E6%B5%8B%E5%BC%95%E8%B5%B7%E7%9A%84nginx%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98/ #####'
批注：'nginx设置keepalive'－'发现仍然很多短链接'－'nginx版本不行，换版本'

'nginx发送短链接'－'tomcat关闭timewait'
'nginx发送超出最大连接数的长连接'－'nginx关闭timewait'
'这一点很重要'，'也是最基本的要求'，'如果nginx worker连接数过少'的化，
'你的请求连接''就算没有被阻塞到backlog队列'外，
'nginx worker''也会因为过载保护''不会处理新的请求'。
'nginx的最大连接数''是worker num *worker_connections', 
'默认worker_connections是1024', '直接干到10w就可以了'。

——'这是对客户端的'，'增加nginx对外并发能力'
'简单描述下''nginx upstream keepalive''是个怎么一回事?'   

'默认情况下' 'Nginx 访问后端''都是用的短连接'(HTTP1.0)，'一个请求来了'，
'Nginx新开一个端口''和后端建立连接'，请求结束连接回收。

'如过配置了http 1.1长连接'，'那么Nginx''会以长连接保持后端的连接'，
'如果并发请求''超过了keepalive''指定的最大连接数'，
'Nginx''会启动新的连接' '来转发请求'，
'新连接''在请求完毕后关闭'，而且'新建立的连接''是长连接'。

'如果你的连接池'的数'控制在128'，'但因为你要应对''更多的并发请求'，
'所以临时又加了很多的连接'，'但这临时的连接''是短连接和长连接''要看你的nginx版本'，
我这'1.8是长连接'，那'他如何被收回'，'两地保证'，
'一点是他会主动去释放'，'另一点是keepalive timeout的时间'。

————————————————————————————————————————
'tcpdump抓取HTTP包'
'##### http://blog.csdn.net/kofandlizi/article/details/8106841 #####'
批注：'tcp 3次握手 4次握手'

'TCP三次握手'(创建 OPEN)
'客户端发起一个''服务创建TCP链接的请求'，'这里是SYN'(J)  '客户端SYN_SEND'
'服务端''接受到客户端的创建请求后'，
'返回两个信息'： SYN(K) + ACK(J+1)     '服务端'SYN_'RECEIVED'
'客户端'在'接受到服务端的ACK信息校验成功后'(J与J+1)，
'返回一个信息'：ACK(K+1)    '客户端''ESTABLISHED'
'服务端'这时'接受到客户端的ACK信息校验成功后'(K与K+1)，
'不再返回信息'，后面'进入数据通讯阶段'

'数据通讯'
客户端/服务端 read/write数据包
TCP四次握手(关闭 finish)
客户端发起关闭请求，发送一个信息：FIN(M)   客户端FIN_WAIT1
服务端接受到信息后，首先返回ACK(M+1),表明自己已经收到消息。   
服务端CLOSE_WAIT   客户端FIN_WAIT2
服务端在准备好关闭之前，最后发送给客户端一个 FIN(N)消息，
询问客户端是否准备好关闭了 服务端LASK_ACK
客户端接受到服务端发送的消息后，返回一个确认信息: ACK(N+1)         
客户端TIME_WAIT
最后，服务端和客户端在双方都得到确认时，各自关闭或者回收对应的TCP链接。  
keepAlive策略可以有效的避免进行三次握手和四次关闭的动作

1. http数据包抓取 (直接在终端输出package data)
tcpdump tcp port 80 -n -X -s 0 指定80端口进行输出

2. 抓取http包数据指定文件进行输出package
tcpdump tcp port 80 -n -s 0 -w /tmp/tcp.cap

————————————————————————————————————————————

'nginx+tomcat的keepalive验证、bio/nio连接比较'
'##### http://blog.csdn.net/shi1122/article/details/50411885 #####'
批注：'如何用wireshark''查看连接是否是长短连接'
'抓包以后''用wireshark'看'看目标请求的head'，发现'有connection:close'，
'说明连接并非长连接'。
'抓nginx的包'，'可以看到有keepalive'： 
学习了一圈后，'将nginx与tomcat的keepalive选项''调整测试'：
首'先分析nginx''未设置keepalive情况'，'nginx发出短链接'，
'后端tomcat''收到connection:close信号''关闭连接'，'无论tomcat如何设置'，
'存在5000＋个timewait'，'抓包后发现' '显式存在 Connection:close标签'，
且'前后三个请求端口不一样'，'证明是短链接'

分析第2种情况，nginx  keepalive 1000，tomcat 100，
nginx发出1000个长连接请求，tomcat只接受100个，
其它900个给你直接当短链接处理，故后端tomcat存在很多timewait，
连接不够请求用，前端nginx只得再多开线程，
且以默认长连接的形式发送，tomcat不做主返回nginx关闭，
故前端也存在一些timewait，且当nginx keepalive设置为128时，
前端存在大量timewait；

抓包后发现无Connection，且3次请求端口不一致，说明是存在短链接状态的

分析第3中情况，nginx  keepalive 1000，tomcat 1000，
两边基本对等，两边的timewait少了很多，
tomcat当短链接处理的timewait少了，nginx则长连接够用，
也更少的申请多开线程，故timewait也少了，
抓包后发现无Connection，但3次请求端口一致，说明使用的同一个连接

好了，再做测试，1n1t  1n2t   20并发下qps仍然一样，
晕了，那么排除长连接的可能

考虑第2个原因，nginx工作线程满了，顶不住，
这个基本开到机器的峰值了，所以无法更进一步了

考虑第3个原因，压力还不够，看上去也够了，
tomcat maxthread 5，实际压力有20并发，
应当不存在一台tomcat直接解决问题导致qps一直一样的情况，是哪里错了？

发现tomcat有个参数：maxConnections，
（BIO模式下默认最大连接数是它的最大线程数
(缺省是200，同maxthreads)，NIO模式下默认是10000）

有些地方说这个参数在bio模式下与maxthreads一致，
所以就没管，一直是1000

'##### http://blog.csdn.net/yy3097/article/details/50978410 #####'
'比较容易弄混的''是maxThreads和maxConnections这两个参数'：
'maxThreads'是'指Tomcat线程池最多能起的线程数'，
而 'maxConnections'则'是Tomcat一瞬间''最多能够处理的并发连接数'。
比如maxThreads=1000，maxConnections=800，
假设'某一瞬间的并发时1000'，那么'最终Tomcat的线程数将会是800'，
即'同时处理800个请求'，'剩余200进入队列“排队”'，
如果'acceptCount=100'，那么'有100个请求会被拒掉'。

注意：'根据前面所说'，'只是并发那一瞬间''Tomcat会起800个线程处理请求'，
但是'稳定后'，'某一瞬间可能只有很少的线程''处于RUNNABLE状态'，
'大部分线程是TIMED_WAITING'，'如果你的应用处理时间够快'的话。
所以'真正决定Tomcat最大可能达到的线程数''是maxConnections这个参数和并发数'，
'当并发数''超过这个参数''则请求会排队'，这时'响应的快慢就看你的程序性能了'。

还是不懂，不管了，网络上也没有说的比较清楚的，可能要深入源码，
个人感觉是，这个tomcat配置可以同时接受1000个请求，
由于请求简单很快就搞定了，于是5个线程也够用，所以我认为：
'acceptCount'－'当tomcat起动的线程数''达到最大时'，'接受排队的请求个数'。
'默认值为100'，'超出的会拒绝请求'
当tomcat起动的且在用的线程数（或最大连接数）达到最大时，
接受排队的请求个数。默认值为100，超出的会拒绝请求

'##### http://blog.csdn.net/kaka20099527/article/details/53285348 #####'
这个帖子里也有引用：
Note that once the limit has been reached, 
the operating system may still accept connections based on the acceptCount setting.
'其中maxConnections''描述红色部分说明''当连接数达到最大值后'，
'系统会继续接收连接''但不会超过acceptCount的值'。
理解：
'我们可以把tomcat''比做一个电影院'，'流程是取号、买票、观影'，
'acceptCount''比作前厅'(容纳取到号的人)、
'maxConnections''比作大厅'（容纳买到票的人）、
'maxThreads''比作影厅'（可以理解一个影厅只容纳一个人，因为一个线程同时只处理一个请求），
以下场景是针对已达到maxConnections最大值来讨论的
1）取号：如果'前厅人数'已'达到acceptCount'，'则拿号失败'，
'会得到Connection refused connect的回复信息'。
'反之'则'会进入前厅，等待买票'。
2）买票：'当大厅人数小于maxConnections时'，
'前厅的人'就'可以进入大厅'
3）观影：'当影厅的人离开时'，'大厅的部分人''能进入影厅'，
'一般来讲大厅的容量''要远大于影厅的数量'。

'tomcat''会处理acceptCount+maxConnections的请求'，'说明只要取到号'，
'有足够的耐心'，'就肯定能够看到电影'

'所以试着将这个参数''缩小到与maxthreads一样是5'，'做一次单机测试'：
（1）'max_connection小了之后'，'事务数大幅度降低'
（2）'1n2t总算>>1n1t了'
anyway，'这是一次尝试'，'tps与带宽 硬件'' lvs nginx tomcat jvm 业务代码 cache db'
'都有关系'，很复杂且'非线性'，'没有经验丰富的运维''和架构师''比较难研究'，仅做一次尝试吧

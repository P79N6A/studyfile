'Wireshark的使用'（'抓包'、'过滤器'）听语音
1
'Wireshark''是'世界上最流行的'网络分析工具'。这个强大的工具可以'捕捉网络'中的'数据'，
并'为用户''提供关于网络和上层协议的各种信息'。与很多其他网络工具一样，
'Wireshark'也'使用pcap network library'来'进行封包'捕捉。
'可破'解'局域网'内'QQ、邮箱、msn'、账号等'的密码'！！    
'wireshark'的'原名'是'Ethereal'，新名字是2006年起用的。
当时Ethereal的主要开发者决定离开他原来供职的公司，并继续开发这个软件。
但由于Ethereal这个名称的使用权已经被原来那个公司注册，Wireshark这个新名字也就应运而生了。 
在成功运行Wireshark之后，我们就可以进入下一步，更进一步了解这个强大的工具。
'下面是'一张地址为'192.168.1.2'的'计算机'正在'访问“openmaniak.com”'网站时的'截图'。

1. 'MENUS（菜单）'
2. 'SHORTCUTS（快捷方式）'
3. 'DISPLAY FILTER（显示过滤器）'
4. 'PACKET LIST PANE（封包列表）'
5. 'PACKET DETAILS PANE（封包详细信息）'
6. 'DISSECTOR PANE（16进制数据）'
7. 'MISCELLANOUS（杂项）'

'1. 捕捉过滤器'
捕捉过滤器的'语法与'其它使用'Lipcap'（Linux）或者'Winpcap'（Windows）库开发的软件'一样'，
比'如'著名的'TCPdump'。捕捉'过滤器'必须'在开始捕捉前''设置完毕'，这一点'跟显示过滤器'是'不同'的。
设置'捕捉'过滤器的'步骤'是：- '选择 capture -> options'。- '填写"capture filter"栏'或者'点击"capture filter"按钮'
'为您的过滤器''起'一个'名字并保存'，以便在今后的捕捉中继续使用这个过滤器。- '点击开始（Start）进行捕捉'。

语法：
ProtocolDirectionHost(s)ValueLogical OperationsOther expression

例子：tcpdst10.1.1.180andtcp dst 10.2.2.2 3128
'Protocol（协议）':可能的值: ether, fddi, ip, arp, rarp, decnet, lat, sca, moprc, mopdl, tcp and udp.
如果'没有特别指明'是什么协议，则'默认使用''所有'支持的'协议'。Direction（方向）:
可能的值: src, dst, src and dst, src or dst如果没有特别指明来源或目的地，
则默认使用 "src or dst" 作为关键字。例如，"host 10.2.2.2"与"src or dst host 10.2.2.2"是一样的。
Host(s):可能的值： net, port, host, portrange.如果没有指定此值，则默认使用"host"关键字。
例如，"src 10.1.1.1"与"src host 10.1.1.1"相同。 Logical Operations（逻辑运算）:
可能的值：not, and, or.否("not")具有最高的优先级。或("or")和与("and")具有相同的优先级，
运算时从左至右进行。例如，"not tcp port 3128 and tcp port 23"与"(not tcp port 3128) and tcp port 23"相同。
"not tcp port 3128 and tcp port 23"与"not (tcp port 3128 and tcp port 23)"不同。

例子：
tcp dst port 3128
'显示'目的TCP'端口'为'3128的封包'。

ip src host 10.1.1.1
'显示来源IP'地址为'10.1.1.1的封包'。

host 10.1.2.3
显示目的或来源IP地址为10.1.2.3的封包。

src portrange 2000-2500
显示来源为UDP或TCP，并且端口号在2000至2500范围内的封包。

not imcp
显示除了icmp以外的所有封包。（icmp通常被ping工具使用）

src host 10.7.2.12 and not dst net 10.200.0.0/16
显示来源IP地址为10.7.2.12，但目的地不是10.200.0.0/16的封包。

(src host 10.4.1.12 or src net 10.6.0.0/16) and tcp dst portrange 200-10000 and dst net 10.0.0.0/8
显示来源IP为10.4.1.12或者来源网络为10.6.0.0/16，目的地TCP端口号在200至10000之间，并且目的位于网络10.0.0.0/8内的所有封包。

注意事项：当使用关键字作为值时，需使用反斜杠“\”。"ether proto \ip" (与关键字"ip"相同).
这样写将会以IP协议作为目标。"ip proto \icmp" (与关键字"icmp"相同).这样写将会以ping工具常用的icmp作为目标。
可以在"ip"或"ether"后面使用"multicast"及"broadcast"关键字。当您想排除广播请求时，
"no broadcast"就会非常有用。查看 TCPdump的主页以获得更详细的捕捉过滤器语法说明。
在Wiki Wireshark website上可以找到更多捕捉过滤器的例子。

2. 显示过滤器：通常经过捕捉过滤器过滤后的数据还是很复杂。
此时您可以使用显示过滤器进行更加细致的查找。它的功能比捕捉过滤器更为强大，
而且在您想修改过滤器条件时，并不需要重新捕捉一次。

语法：Protocol.String 1.String 2ComparisonoperatorValueLogicalOperationsOtherexpression

例子：ftppassiveip==10.2.3.4xoricmp.type
Protocol（协议）:您可以使用大量位于OSI模型第2至7层的协议。
点击"Expression..."按钮后，您可以看到它们。比如：IP，TCP，DNS，SSH

您同样可以在如下所示位置找到所支持的协议：
Wireshark的网站提供了对各种 协议以及它们子类的说明。 
String1, String2 (可选项):协议的子类。点击相关父类旁的"+"号，然后选择其子类。

Comparison operators （比较运算符）:

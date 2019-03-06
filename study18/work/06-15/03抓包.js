'Wireshark'(以前是ethereal)是'Windows下'非常'简'易用的'抓包工具'。但在Linux下很难找到一个好用的图形化抓包工具。
还好有'Tcpdump'。我们可以用'Tcpdump + Wireshark' 的完美'组合'实现：在 'Linux 里抓包'，然后在'Windows' 里'分析包'。

tcpdump tcp -i eth1 -t -s 0 -c 100 and dst port ! 22 and src net 192.168.1.0/24 -w ./target.cap
(1)'tcp: ip icmp arp rarp' 和 'tcp、udp、icmp'这些选项等都要'放到第一个参数'的位置，用来'过滤数据'报的'类型'
(2)'-i eth1' : '只抓'经'过接口eth1''的包'
(3)-t : '不显示时间戳'
(4)-s 0 : 抓取数据包时默认抓取长度为68字节。加上'-S 0' 后可以'抓到完整'的'数据包'
(5)-c 100 : '只抓取100个数据包'
(6)dst port ! 22 : '不抓取目标端口'是'22的数据包'
(7)src net 192.168.1.0/24 : '数据包'的'源网络地址'为'119.123.71.234/24'
(8)-w ./target.cap : '保存成cap文件'，方便用ethereal(即wireshark)分析

tcpdump tcp -i eth1 -t -s 0 -c 100 and src port 22 and src net 119.123.71.234 -w ./1ehuandian.cap

//按照服务器抓
tcpdump tcp -i eth1 -t -s 0 -c 15 and dst port 9998 and dst net 119.23.133.72 -w ./ehuandian05.cap
//按照客户端抓
tcpdump tcp -i eth1 -t -s 0 -c 5 and dst port 9998 and src net 119.123.71.234 -w ./ehuandianloc1.cap
//双向抓数据
tcpdump tcp -i eth1 -t -s 0 -c 5000 'and port 9998 and ((dst or src net 113.110.202.214) or (dst or src net 119.23.133.72))' -w ./ehuandianloc1.cap
//双向抓数据
tcpdump tcp -i eth1 -t -s 0 -c 10 'and port 9998 and (dst or src net 119.23.133.72)' -w ./shuangxiang.cap
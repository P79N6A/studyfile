客户端测试主机端口连通性 /*telnet如果不能使用说明没有安装telnet，百度一下如何安装*/
telnet 192.168.112.128 6379  /*能ping通，但是telnet不通。可以关闭linux防火墙试试看*/

关闭linux防火墙命令
1) 重启后生效 
开启： chkconfig iptables on 
关闭： chkconfig iptables off 
2) 即时生效，重启后失效 
开启： service iptables start 
关闭： service iptables stop 
需要说明的是对于Linux下的其它服务都可以用以上命令执行搜索开启和关闭操作。 
在开启了防火墙时，做如下设置，开启相关端口， 
修改/etc/sysconfig/iptables 文件，添加以下内容： 
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT 
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT


查看linux下服务端口
netstat -ntlp   //查看当前所有tcp端口·
netstat -ntulp |grep 80   //查看所有80端口使用情况·
netstat -an | grep 3306   //查看所有3306端口使用情况· 




Jedis js=new Jedis("127.0.0.1",6379);
system.out.println(js.ping());


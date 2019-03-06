问题导读：
1.'ntp'的'作用是什么'？
2.'ntp'的英文'全拼是什么'?
3.'如何重启'ntp？
4.'客户端''如何''与''服务端'达到'时间同步'？

ubuntu server ntp'时间同步服务器''安装'及'使用'
一、服务端
1 'sudo apt-get install ntp'
2 安装后'默认启动'服务，如果没有启动，启动之。 
'sudo /etc/init.d/ntp start'
3 'sudo vi /etc/ntp.conf' 修改为如下

restrict default nomodify notrap noquery
restrict 127.0.0.1
restrict 192.168.202.0 mask 255.255.255.0 nomodify
server 0.pool.ntp.org
server 1.pool.ntp.org
server 2.pool.ntp.org
server  127.127.1.0     # local clock
fudge   127.127.1.0 stratum 10

driftfile /var/lib/ntp/drift
broadcastdelay  0.008
keys            /etc/ntp/keys

4 '重启ntp'服务
'sudo /etc/init.d/ntp restart'

二、客户端
1 '使用ntpdate命令'，如果'不存在'这个'命令'，则先'安装apt-get install ntp'
'sudo /usr/sbin/ntpdate 192.168.202.129' //即使用ip为10.91.0.10的ntp服务器同步时间

2 '设置''定时同步'。
'sudo vi /etc/crontab'
'30 11 * * * /usr/sbin/ntpdate 192.168.202.129'

系统便会在每天早上'1点30'分自动'将系统时间同步'到'ntp服务器'的时间。
当然这里crontab的时间是指客户端的时间，同步后等同于ntp服务器的时间。



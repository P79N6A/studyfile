下面我们来配置redis单主机多实例：

cp /etc/redis.conf /etc/redis6380.conf

cp /etc/redis.conf /etc/redis6381.conf

一、配置6380端口，6381端口
# vim /etc/redis6380(6381).conf
daemonize yes /*开始守护进程*/
pidfile redis_6380(6381).pid  /*默认进程路径*/
port 6380(6381) /*端口*/

vim /etc/redis6380.conf
slaveof 127.0.0.1 6379

vim /etc/redis6381.conf
slaveof 127.0.0.1 6379
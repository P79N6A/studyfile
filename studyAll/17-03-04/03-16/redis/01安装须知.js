1.解压安装包 
tar -zxvf redis-3.0.4.tar.gz

2.在安装redis之前，需要先装gcc
yum install gcc-c++

3.安装
make

4.确认成功
make install

注意Linux 安装后的软件都在 /usr/local/bin 文件夹下
5.复制redis.config到myredis文件夹下 并修改 redis.config 文件，38行 no --> yes

6.启动第5步备份的redis
redis-server /myredis/redis.conf
redis-cli -p 6379

7.查看redis是否启动
ps -ef|grep redis

set k1 hello

get k1

8.关闭redis 
SHUTDOWN
exit


杂碎知识:
redis 默认有16个库
select 0 切换数据库
DBSIZE 查看有多少key
keys * 查看有哪些键
FLUSHDB 清空当前库key
FLUSHALL 清空所有key

杀死进程
$ kill -s 9 1827 /*-s 9 9表示强制，尽快终止进程*/
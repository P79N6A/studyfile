'1.wget -c http://labfile.oss.aliyuncs.com/files0422/redis-2.8.9.tar.gz'
'下载redis'

'2.tar xvfz redis-2.8.9.tar.gz'
'解压redis'

'3.安装gcc环境'

'4.安装redis'
'cd redis-2.8.9'
'make'
'make install'

'5.cp redis.config /myrides/'

'6.修改redis.config'

'7.启动redis'
'redis-server /myrides/'
'ps -ef|grep reedis'
'redis-cli'

//一.安装篇
//1.解压安装包 tar xvfz redis-2.8.9.tar.gz
//2.安装gcc运行环境
//3.make
//4.make install
//
//二。启动篇
//1.修改redis.conf文件 no->yes
//2.将启动文件复制到用户的运用程序目录下（/usr/local/bin/就是用户自己软件的位置）
//cp redis-server /usr/local/bin/
//cp redis-cli /usr/local/bin/
//3.启动Redis-server和Redis-client
//redis-server
//Redis-client
//4.查看启动状态
//ps -ef | grep redis
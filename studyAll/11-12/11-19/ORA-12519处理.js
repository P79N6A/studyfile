/*
select value from v$parameter where name ='processes';查看最大连接数
select count(*) from v$process;查看当前连接数
alter system set processes = 1500 scope = spfile;修改processes参数
*/
从上面的错误信息可以看出，是由于'用户请求时没有可用的连接'了。
这时才想起程序大概有500个线程同时向数据库插入数据，而建库时默认为300，
显然不够用，把连接数设置为800，错误就不存在了。
 
处理过程：
以DBA身份登录数据库，
'select count(*) from v$session';'查看当前'所有'连接数'，
'show prameter processes';'查看最大连接数'
'alter system set processes=800 scope=spfile';'修改processes参数为800'，
'重起'数据库
开放端口
1.开放端口命令： /sbin/iptables -I INPUT -p tcp --dport 8501 -j ACCEPT
2.保存：/etc/rc.d/init.d/iptables save
3.重启服务：/etc/init.d/iptables restart
4.查看端口是否开放：/sbin/iptables -L -n

查询端口占用进程
lsof -i:端口号

'查询''使用''端口号'
netstat -lntp|grep PID

'查询''使用''端口号'
netstat -antup|grep PID

'查询''应用占用PID'
ps -aux | grep java | grep /home/ibu_venue/ve-api-bin/conf

'杀进程'
其中-s 9 '制定了传递给进程的信号是９'，即'强制'、尽快'终止进程'。各个终止信号及其作用见附录
1827是PID。
kill -s 9 1827

启动服务
ps -ef | grep filesystem-1.0.0.jar | grep -v grep | awk '{print $2}'
kill -s 9 19246
nohup java -jar ./ve-file-system/filesystem-1.0.0.jar &

返回查询结果的PID
lsof -i:8501 | grep 8501 | grep -v grep | awk '{print $2}'
ps -ef | grep java | grep -v grep | awk '{print $2}'

解压
tar –xvf file.tar //解压 tar包
tar -xzvf file.tar.gz //解压tar.gz	添加到指定文件加 tar -xzvf file.tar.gz -C ./file
tar -xjvf file.tar.bz2   //解压 tar.bz2
tar –xZvf file.tar.Z   //解压tar.Z
unrar e file.rar //解压rar
unzip file.zip //解压zip

ps -aux | grep java | grep /home/project/ligusports/project/ve-job-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-web-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-api-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-judge-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-order-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-sso-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-venue-bin/conf
ps -aux | grep java | grep /home/project/ligusports/project/ve-society-bin/conf

ps -aux | grep java | grep /home/ibu_venue/ve-api-bin/conf
ps -aux | grep java | grep /home/ibu_venue/ve-judge-bin/conf
ps -aux | grep java | grep /home/ibu_venue/ve-order-bin/conf
ps -aux | grep java | grep /home/ibu_venue/ve-sso-bin/conf
ps -aux | grep java | grep /home/ibu_venue/ve-venue-bin/conf
ps -aux | grep java | grep /home/ibu_venue/ve-society-bin/conf

启动redis
/etc/init.d/ligusports_redis_6382 start
启动zk
./zkServer.sh start

web手动修改图片服务器IP（web内的APP记得不能删除）
rm  -rf ./ve-web-bin/*
rm  -rf ./ve-job-bin/*
rm  -rf ./ve-venue-bin/*
rm  -rf ./ve-sso-bin/*
rm  -rf ./ve-order-bin/*
rm  -rf ./ve-judge-bin/*
rm  -rf ./ve-society-bin/*
rm  -rf ./ve-api-bin/*


删除日志
rm  -rf ./ve-web-bin/logs/*
rm  -rf ./ve-job-bin/logs/*
rm  -rf ./ve-venue-bin/logs/*
rm  -rf ./ve-sso-bin/logs/*
rm  -rf ./ve-order-bin/logs/*
rm  -rf ./ve-judge-bin/logs/*
rm  -rf ./ve-society-bin/logs/*
rm  -rf ./ve-api-bin/logs/*
rm  -rf ./ve-web-business-bin/logs/*

tar -xzvf ve-web-1.0.0-bin.tar.gz -C ve-web-bin
tar -xzvf ve-job-1.0.0-bin.tar.gz -C ve-job-bin
tar -xzvf ve-venue-1.0.0-bin.tar.gz -C ve-venue-bin
tar -xzvf ve-sso-1.0.0-bin.tar.gz -C ve-sso-bin
tar -xzvf ve-order-1.0.0-bin.tar.gz -C ve-order-bin
tar -xzvf ve-judge-1.0.0-bin.tar.gz -C ve-judge-bin
tar -xzvf ve-society-1.0.0-bin.tar.gz -C ve-society-bin
tar -xzvf ve-api-1.0.0-bin.tar.gz -C ve-api-bin

web手动修改图片服务器IP（web内的APP记得不能删除），
/bin/cp -f ./jdbc.properties ./ve-venue-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-sso-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-order-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-judge-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-society-bin/conf/
每个服务中的config.properties中的zookeeper改为2181
ve-common-util的appFileConfig要改app存的位置
ve-common-util的sms要改是否需要发送短信
ve-common-util的im文件的位置
ve-common-util的file要改90的文件系统位置

chmod -R 755 ./ve-web-bin/*
chmod -R 755 ./ve-job-bin/*
chmod -R 755 ./ve-venue-bin/*
chmod -R 755 ./ve-sso-bin/*
chmod -R 755 ./ve-order-bin/*
chmod -R 755 ./ve-judge-bin/*
chmod -R 755 ./ve-society-bin/*
chmod -R 755 ./ve-api-bin/*
chmod -R 755 ./ve-web-official-bin/*
chmod -R 755 ./ve-web-business-bin/*

sh ./ve-web-business-bin/bin/restart.sh
sh ./ve-web-bin/bin/restart.sh
sh ./ve-job-bin/bin/restart.sh
sh ./ve-venue-bin/bin/restart.sh
sh ./ve-sso-bin/bin/restart.sh
sh ./ve-order-bin/bin/restart.sh
sh ./ve-judge-bin/bin/restart.sh
sh ./ve-society-bin/bin/restart.sh
sh ./ve-api-bin/bin/restart.sh


rm  -rf ./ve-job-bin/*
tar -xzvf ve-job-1.0.0-bin.tar.gz -C ve-job-bin
sh ./ve-job-bin/bin/restart.sh

kill -s 9 26952
kill -s 9 26835
nohup java -jar ./ve-file-system/filesystem-1.0.0.jar &


linux开放端口：
1.开放端口命令： /sbin/iptables -I INPUT -p tcp --dport 2183 -j ACCEPT
2.保存：/etc/rc.d/init.d/iptables save
3.重启服务：/etc/init.d/iptables restart
4.查看端口是否开放：/sbin/iptables -L -n
或者
1、修改/etc/sysconfig/iptables文件加入内容
-A INPUT -p tcp -m tcp --dport 要开放的端口号 -j ACCEPT
2、重启service iptables restart

ps -aux | grep java | grep /home/ligu_sports/ve-web-bin/conf
ps -aux | grep java | grep /home/ligu_sports/ve-api-bin/conf
ps -aux | grep java | grep /home/ligu_sports/ve-judge-bin/conf
ps -aux | grep java | grep /home/ligu_sports/ve-order-bin/conf
ps -aux | grep java | grep /home/ligu_sports/ve-sso-bin/conf
ps -aux | grep java | grep /home/ligu_sports/ve-venue-bin/conf
ps -aux | grep java | grep /home/ligu_sports/ve-society-bin/conf

sh ./ve-venue-bin/bin/stop.sh
sh ./ve-sso-bin/bin/stop.sh
sh ./ve-order-bin/bin/stop.sh
sh ./ve-judge-bin/bin/stop.sh
sh ./ve-society-bin/bin/stop.sh
sh ./ve-web-bin/bin/stop.sh
sh ./ve-api-bin/bin/stop.sh
sh ./ve-job-bin/bin/stop.sh

sh ./ve-venue-bin/bin/start.sh
sh ./ve-sso-bin/bin/start.sh
sh ./ve-order-bin/bin/start.sh
sh ./ve-judge-bin/bin/start.sh
sh ./ve-society-bin/bin/start.sh
sh ./ve-web-bin/bin/start.sh
sh ./ve-api-bin/bin/start.sh
sh ./ve-job-bin/bin/start.sh



/bin/cp -f ./ve-web-bin/WebRoot/upload/*.* ./ve-file-system/file/AppDir/

查看空余
free -m
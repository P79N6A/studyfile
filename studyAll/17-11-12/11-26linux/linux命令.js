���Ŷ˿�
1.���Ŷ˿���� /sbin/iptables -I INPUT -p tcp --dport 8501 -j ACCEPT
2.���棺/etc/rc.d/init.d/iptables save
3.��������/etc/init.d/iptables restart
4.�鿴�˿��Ƿ񿪷ţ�/sbin/iptables -L -n

��ѯ�˿�ռ�ý���
lsof -i:�˿ں�

'��ѯ''ʹ��''�˿ں�'
netstat -lntp|grep PID

'��ѯ''ʹ��''�˿ں�'
netstat -antup|grep PID

'��ѯ''Ӧ��ռ��PID'
ps -aux | grep java | grep /home/ibu_venue/ve-api-bin/conf

'ɱ����'
����-s 9 '�ƶ��˴��ݸ����̵��ź��ǣ�'����'ǿ��'������'��ֹ����'��������ֹ�źż������ü���¼
1827��PID��
kill -s 9 1827

��������
ps -ef | grep filesystem-1.0.0.jar | grep -v grep | awk '{print $2}'
kill -s 9 19246
nohup java -jar ./ve-file-system/filesystem-1.0.0.jar &

���ز�ѯ�����PID
lsof -i:8501 | grep 8501 | grep -v grep | awk '{print $2}'
ps -ef | grep java | grep -v grep | awk '{print $2}'

��ѹ
tar �Cxvf file.tar //��ѹ tar��
tar -xzvf file.tar.gz //��ѹtar.gz	��ӵ�ָ���ļ��� tar -xzvf file.tar.gz -C ./file
tar -xjvf file.tar.bz2   //��ѹ tar.bz2
tar �CxZvf file.tar.Z   //��ѹtar.Z
unrar e file.rar //��ѹrar
unzip file.zip //��ѹzip

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

����redis
/etc/init.d/ligusports_redis_6382 start
����zk
./zkServer.sh start

web�ֶ��޸�ͼƬ������IP��web�ڵ�APP�ǵò���ɾ����
rm  -rf ./ve-web-bin/*
rm  -rf ./ve-job-bin/*
rm  -rf ./ve-venue-bin/*
rm  -rf ./ve-sso-bin/*
rm  -rf ./ve-order-bin/*
rm  -rf ./ve-judge-bin/*
rm  -rf ./ve-society-bin/*
rm  -rf ./ve-api-bin/*


ɾ����־
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

web�ֶ��޸�ͼƬ������IP��web�ڵ�APP�ǵò���ɾ������
/bin/cp -f ./jdbc.properties ./ve-venue-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-sso-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-order-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-judge-bin/conf/
/bin/cp -f ./jdbc.properties ./ve-society-bin/conf/
ÿ�������е�config.properties�е�zookeeper��Ϊ2181
ve-common-util��appFileConfigҪ��app���λ��
ve-common-util��smsҪ���Ƿ���Ҫ���Ͷ���
ve-common-util��im�ļ���λ��
ve-common-util��fileҪ��90���ļ�ϵͳλ��

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


linux���Ŷ˿ڣ�
1.���Ŷ˿���� /sbin/iptables -I INPUT -p tcp --dport 2183 -j ACCEPT
2.���棺/etc/rc.d/init.d/iptables save
3.��������/etc/init.d/iptables restart
4.�鿴�˿��Ƿ񿪷ţ�/sbin/iptables -L -n
����
1���޸�/etc/sysconfig/iptables�ļ���������
-A INPUT -p tcp -m tcp --dport Ҫ���ŵĶ˿ں� -j ACCEPT
2������service iptables restart

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

�鿴����
free -m
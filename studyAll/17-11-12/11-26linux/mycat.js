--ͨ��.sock�ļ�����mysql
mysql -uroot -p1234 -P9066 -h127.0.0.1 -S /tmp/3307_mysql.sock

--�˳�mysql�����
quit;

����mycat
./mycat start

����mycat-web
����˳�����Ϊ��zookper->mycat->mycat_web,������ܻ��������
./zkServer.sh stop
./zkServer.sh start
netstat -ant | grep 2183

����mycat
����web
./start.sh &
netstat -ant | grep 8083



--'����mysql'
1������3307�������ݿ⣩
'/home/data/mysql-venue/3307/start.sh'

2������3308�������ݿ⣩
'/home/data/mysql-venue/3308/start.sh'

3�����������ݿ�
'mysql -h127.0.0.1 -uroot -P3307 -p1234'

4�����Ӵ����ݿ�
'mysql -h127.0.0.1 -uroot -P3308 -p1234'

5�����������ݿ�鿴master״̬
'show master status;'

��¼File������
'��¼Position��ֵ'

6����������ݿ⣬�鿴ͬ��״̬
'show slave status\G;'

��ʱ'Slave_IO_Running'��'Slave_SQL_Running'Ӧ'ΪNo'

��'�����ݿ�'��'ִ��'��������
change master to 
master_host='localhost',
master_port=3307,
master_user='master',
master_password='1234',
master_log_file='mysql-bin.000006', 
master_log_pos=358;
    ����'master_log_file'��Ϊ'master��file'��'master_log_pos'��Ϊ'master�е�Position'
��'�������Ӹ���'��'ִ��start slave';
'�鿴����״̬''show slave status\G';
���'Slave_IO_Running'��'Slave_SQL_Running'��Yes��ʾ'����ͬ�����óɹ�'

--'����zookeeper(mycatҪ�õ�)'
/home/data/mycat/zookeeper/bin/zkServer.sh start

--'����mycat server'
/home/data/mycat/mycat/bin/mycat start

--'����mycat-web'
/home/data/mycat/web/start.sh &

--����api����ϵͳ
/home/project/ligusports/project/tomcat/bin/startup.sh
1.首先需要'instantclient'
2.在'plsql首选项中配置instant的路径，和dll文件位置'
3.环境变量
 'TNS_ADMIN: 监听文件tnsnames.ora位置'
 'NLS_LANG:SIMPLIFIED CHINESE_CHINAZHS16GBK' 指定字符集
4.重启plsql输入用户名密码

注意：tnsnames.ora文件中
ECC_DEV =  //ECC_DEV是数据库的名字
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 10.5.6.80)(PORT = 1521))//数据库IP和端口
    )
    (CONNECT_DATA =
      (SERVICE_NAME = eccsys2)
    )
  )
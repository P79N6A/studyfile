'重新添加索引'，'对'于'1000W级的数据'，按'常规'的'方式'来操作，
'时间'上'是'一个'很大的问题'。而且对于'1000W级'的数据，
本人'建议对此表'进行'分表优化'。如果'非要添加索引'操作，方法倒是有的。

1.'创建一个新的表结构'：create table a_new like a;
2.'对 a_new 表'进行'索引创建'。
3.'在MYSQL存储文件目录''找到a.frm'，'a_new.frm'文件，'执行以下操作'：
'mv a.frm a_old.frm';
'mv a_new.frm a.frm';
'mv a_old.frm a_new.frm';

'4.删除表a_new: drop table a_new';
'5.flush table a';

注意：
1.'此操作为骇客方式操作'，'直接跳过MYSQL的服务层'，直接'到存储层进行操作'。
所以'勿必做好'相关'表备份工作'。
2.此操作'前提是锁表'或者'停止服务'（10分钟应该足够）。


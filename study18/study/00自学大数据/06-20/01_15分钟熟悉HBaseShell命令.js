下面我们看看HBase Shell的一些基本操作命令，我列出了几个常用的HBase Shell命令，如下：


'创建表'
create '表名称', '列名称1','列名称2','列名称N'
create 'h_user', 'id','name','sex'

'添加记录'      
put '表名称', '行名称', '列名称:', '值'
put 'h_user', 't_1', 'id', '1'
put 'h_user', 't_1', 'name', 'zs'

'查看记录'
get '表名称', '行名称'
get 'h_user', 't_1'

'查看表中的记录总数'
count  '表名称'
count  'h_user'

'删除记录'
delete  '表名' ,'行名称' , '列名称'
delete  'h_user' ,'t_1' , 'id'
delete  'h_user' ,'t_1' , 'name'

'删除一张表'
先要屏蔽该表，才能对该表进行删除，
第一步 	disable '表名称'   
	  disable 'h_user'
第二步  drop '表名称'     
	  drop 'h_user'

'查看所有记录'
scan "表名称"
scan 'h_user'

'查看'某个表'某个列'中'所有数据'
scan "表名称", {COLUMNS => ['列名称:']}
scan 'h_user', {COLUMNS => ['id'], LIMIT => 10, STARTROW => '1'}

'更新记录' 
就是'重写一遍'进行'覆盖'
put 'h_user', 't_1', 'id', '11'
put 'h_user', 't_1', 'name', 'zs1'

一、一般操作
1.'查询服务器状态'status
hbase(main):011:0> status
1 active master, 0 backup masters, 1 servers, 0 dead, 4.0000 average load


2.'查询版本'version
hbase(main):012:0> version
1.2.1, r8d8a7107dc4ccbf36a92f64675dc60392f85c015, Wed Mar 30 11:19:21 CDT 2016


二、DDL操作
1.'创建一个表'
hbase(main):013:0> create 'table','column_famaly','column_famaly1','column_famaly2'
0 row(s) in 94.9160 seconds
=> Hbase::Table - table


2.'列出所有表'list
hbase(main):014:0> list
TABLE                                                                           
stu                                                                             
table                                                                           
test                                                                            
3 row(s) in 0.0570 seconds
=> ["stu", "table", "test"]


3.'获得表'的'描述'  describe 'table'
hbase(main):015:0> describe 'table'
Table table is ENABLED                                                          
table                                                                           
COLUMN FAMILIES DESCRIPTION                                                     
{NAME => 'column_famaly', DATA_BLOCK_ENCODING => 'NONE', BLOOMFILTER => 'ROW', R
EPLICATION_SCOPE => '0', VERSIONS => '1', COMPRESSION => 'NONE', MIN_VERSIONS =>
 '0', TTL => 'FOREVER', KEEP_DELETED_CELLS => 'FALSE', BLOCKSIZE => '65536', IN_
MEMORY => 'false', BLOCKCACHE => 'true'}                                        
{NAME => 'column_famaly1', DATA_BLOCK_ENCODING => 'NONE', BLOOMFILTER => 'ROW', 
REPLICATION_SCOPE => '0', VERSIONS => '1', COMPRESSION => 'NONE', MIN_VERSIONS =
> '0', TTL => 'FOREVER', KEEP_DELETED_CELLS => 'FALSE', BLOCKSIZE => '65536', IN
_MEMORY => 'false', BLOCKCACHE => 'true'}                                       
{NAME => 'column_famaly2', DATA_BLOCK_ENCODING => 'NONE', BLOOMFILTER => 'ROW', 
REPLICATION_SCOPE => '0', VERSIONS => '1', COMPRESSION => 'NONE', MIN_VERSIONS =
> '0', TTL => 'FOREVER', KEEP_DELETED_CELLS => 'FALSE', BLOCKSIZE => '65536', IN
_MEMORY => 'false', BLOCKCACHE => 'true'}                                       
3 row(s) in 0.0430 seconds


4.'删除一个列族' 'alter,disable,enable' 
alter 'table',{NAME=>'column_famaly',METHOD=>'delete'}

hbase(main):016:0> alter 'table',{NAME=>'column_famaly',METHOD=>'delete'}
Updating all regions with the new schema...
1/1 regions updated.
Done.
0 row(s) in 3.0220 seconds


hbase(main):018:0> describe 'table'
Table table is ENABLED                                                          
table                                                                           
COLUMN FAMILIES DESCRIPTION                                                     
{NAME => 'column_famaly1', DATA_BLOCK_ENCODING => 'NONE', BLOOMFILTER => 'ROW', 
REPLICATION_SCOPE => '0', VERSIONS => '1', COMPRESSION => 'NONE', MIN_VERSIONS =
> '0', TTL => 'FOREVER', KEEP_DELETED_CELLS => 'FALSE', BLOCKSIZE => '65536', IN
_MEMORY => 'false', BLOCKCACHE => 'true'}                                       
{NAME => 'column_famaly2', DATA_BLOCK_ENCODING => 'NONE', BLOOMFILTER => 'ROW', 
REPLICATION_SCOPE => '0', VERSIONS => '1', COMPRESSION => 'NONE', MIN_VERSIONS =
> '0', TTL => 'FOREVER', KEEP_DELETED_CELLS => 'FALSE', BLOCKSIZE => '65536', IN
_MEMORY => 'false', BLOCKCACHE => 'true'}                                       
2 row(s) in 0.0520 seconds


5.drop一个表


hbase(main):019:0> drop 'stu'


ERROR: Table stu is enabled. Disable it first.


Here is some help for this command:
Drop the named table. Table must first be disabled:
  hbase> drop 't1'
  hbase> drop 'ns1:t1'


报错了，因为要把表格设置为disable 


6.把表设置为disable 
hbase(main):020:0> disable 'stu'
0 row(s) in 2.3150 seconds


再删除一个表
hbase(main):021:0> drop 'stu'
0 row(s) in 1.2820 seconds


列出所有表
hbase(main):022:0> list
TABLE                                                                           
table                                                                           
test                                                                            
2 row(s) in 0.0240 seconds


=> ["table", "test"]


7.查询表是否存在
hbase(main):023:0> exists 'stu'
Table stu does not exist                                                        
0 row(s) in 0.0380 seconds


hbase(main):024:0> exists 'table'
Table table does exist                                                          
0 row(s) in 0.0280 seconds


8.判断表是否enable
hbase(main):025:0> is_enabled 'table'
true                                                                            
0 row(s) in 0.0150 seconds


9.判断表是否disable
hbase(main):026:0> is_disabled 'table'
false                                                                           
0 row(s) in 0.0140 seconds


把表设为disable 
hbase(main):027:0> disable 'table'
0 row(s) in 33.2980 seconds


hbase(main):028:0> is_disabled 'table'
true                                                                            
0 row(s) in 0.0140 seconds

三、DML操作


1.插入几条记录
hbase(main):029:0> put 'table','id','column_famaly1:name','tanggao'


ERROR: Failed 1 action: NotServingRegionException: 1 time, 


Here is some help for this command:
Put a cell 'value' at specified table/row/column and optionally
timestamp coordinates.  To put a cell value into table 'ns1:t1' or 't1'
at row 'r1' under column 'c1' marked with the time 'ts1', do:


  hbase> put 'ns1:t1', 'r1', 'c1', 'value'
  hbase> put 't1', 'r1', 'c1', 'value'
  hbase> put 't1', 'r1', 'c1', 'value', ts1
  hbase> put 't1', 'r1', 'c1', 'value', {ATTRIBUTES=>{'mykey'=>'myvalue'}}
  hbase> put 't1', 'r1', 'c1', 'value', ts1, {ATTRIBUTES=>{'mykey'=>'myvalue'}}
  hbase> put 't1', 'r1', 'c1', 'value', ts1, {VISIBILITY=>'PRIVATE|SECRET'}


The same commands also can be run on a table reference. Suppose you had a reference
t to table 't1', the corresponding command would be:


  hbase> t.put 'r1', 'c1', 'value', ts1, {ATTRIBUTES=>{'mykey'=>'myvalue'}}


报错了,因为要把表设为enable 
hbase(main):030:0> enable 'table'
0 row(s) in 1.3620 seconds


插入几条记录
hbase(main):031:0> put 'table','id','column_famaly1:name','tanggao'
0 row(s) in 0.0460 seconds


hbase(main):032:0> put 'table','id','column_famaly1:age','20'
0 row(s) in 0.0150 seconds


hbase(main):033:0> put 'table','id','column_famaly1:sex','boy'
0 row(s) in 0.0190 seconds


2.获取一条数据
获取一个id的所有数据
hbase(main):034:0> get 'table','id'
COLUMN                CELL                                                      
 column_famaly1:age   timestamp=1463055735107, value=20                         
 column_famaly1:name  timestamp=1463055709542, value=tanggao                    
 column_famaly1:sex   timestamp=1463055753395, value=boy                        
3 row(s) in 0.3200 seconds


获取一个id，一个列族的所有数据
hbase(main):035:0> get 'table','id','column_famaly1'
COLUMN                CELL                                                      
 column_famaly1:age   timestamp=1463055735107, value=20                         
 column_famaly1:name  timestamp=1463055709542, value=tanggao                    
 column_famaly1:sex   timestamp=1463055753395, value=boy                        
3 row(s) in 0.0270 seconds


获取一个id，一个列族中一个列的所有数据
hbase(main):036:0> get 'table','id','column_famaly1:name'
COLUMN                CELL                                                      
 column_famaly1:name  timestamp=1463055709542, value=tanggao                    
1 row(s) in 0.0140 seconds


3.更新一条记录
把id的age修改为22
hbase(main):037:0> put 'table','id','column_famaly1:age','22'
0 row(s) in 0.0160 seconds


hbase(main):038:0> get 'table','id','column_famaly1:age'
COLUMN                CELL                                                      
 column_famaly1:age   timestamp=1463055893492, value=22                         
1 row(s) in 0.0190 seconds


4.通过timestamp来获取两个版本的数据
hbase(main):039:0> get 'table','id',{COLUMN=>'column_famaly1:age',TIMESTAMP=>1463055735107}
COLUMN                CELL                                                      
 column_famaly1:age   timestamp=1463055735107, value=20                         
1 row(s) in 0.0340 seconds


hbase(main):040:0> get 'table','id',{COLUMN=>'column_famaly1:age',TIMESTAMP=>1463055893492}
COLUMN                CELL                                                      
 column_famaly1:age   timestamp=1463055893492, value=22                         
1 row(s) in 0.0140 seconds


5.全表扫描
hbase(main):041:0> scan 'table'
ROW                   COLUMN+CELL                                               
 id                   column=column_famaly1:age, timestamp=1463055893492, value=
                      22                                                        
 id                   column=column_famaly1:name, timestamp=1463055709542, value
                      =tanggao                                                  
 id                   column=column_famaly1:sex, timestamp=1463055753395, value=
                      boy                                                       
1 row(s) in 0.1520 seconds


6.删除行健为id的值的‘column_famaly1:age’字段
hbase(main):042:0> delete 'table','id','column_famaly1:age'
0 row(s) in 0.0200 seconds


hbase(main):043:0> get 'table','id'
COLUMN                CELL                                                      
 column_famaly1:name  timestamp=1463055709542, value=tanggao                    
 column_famaly1:sex   timestamp=1463055753395, value=boy                        
2 row(s) in 0.2430 seconds


7.删除整行
hbase(main):044:0> deleteall 'table','id'
0 row(s) in 0.0550 seconds


8.查询表中有多少行
hbase(main):045:0> count 'table'
0 row(s) in 0.0450 seconds


=> 0


再插入几条记录

hbase(main):046:0> put 'table','id','column_famaly1:age','20'
0 row(s) in 0.0160 seconds


hbase(main):047:0> put 'table','id','column_famaly1:name','tanggao'
0 row(s) in 0.0120 seconds


hbase(main):048:0> put 'table','id','column_famaly2:name','tanggao2'
0 row(s) in 0.0120 seconds


hbase(main):001:0> put 'table','id','column_famaly2:age','22'
0 row(s) in 0.4690 seconds


9.给‘id’这个行健增加'column_famaly1:addr'字段，并使用counter实现递增
hbase(main):002:0> incr 'table','id','column_famaly1:addr'
COUNTER VALUE = 1
0 row(s) in 0.0340 seconds


hbase(main):003:0> incr 'table','id','column_famaly1:addr'
COUNTER VALUE = 2
0 row(s) in 9.6250 seconds


hbase(main):004:0> get 'table','id','column_famaly1:addr'
COLUMN                CELL                                                      
 column_famaly1:addr  timestamp=1463056705124, value=\x00\x00\x00\x00\x00\x00\x0
                      0\x02                                                     
1 row(s) in 0.3930 seconds


hbase(main):005:0> incr 'table','id','column_famaly1:addr'
COUNTER VALUE = 3
0 row(s) in 7.3880 seconds


10.获取当前count的值
hbase(main):006:0> get_counter 'table','id','column_famaly1:addr'
COUNTER VALUE = 3


11.将整张表清空
hbase(main):007:0> truncate 'table'
Truncating 'table' table (it may take a while):
 - Disabling table...
 - Truncating table...
0 row(s) in 4.1510 seconds

hbase(main):008:0> 
版权声明：本文为博主原创文章，转载请指明 http://blog.csdn.net/tanggao1314/	https://blog.csdn.net/tanggao1314/article/details/51387560
个人分类： 大数据与云计算
所属专栏： 大数据生态系统技术
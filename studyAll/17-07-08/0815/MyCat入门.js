Mycat中的'路由结果'是'通过分片字段'和'分片方法来确定'的。例如下图中的一个Mycat分库方案：

'根据' tt_waybill '表的 id' 字段来'进行分片'
'分片方法'为 'id 值取 3' 的模，根据模值'确定在DB1，DB2，DB3中的某个分片里'
非分片字段查询

如果查询条件中有 id 字段的情况还好，查询将会落到某个具体的分片。例如：

MySQL>select * from tt_waybill where id = 12330;
此时Mycat会计算路由结果

12330 % 3 = 0 –> DB1
并将该请求路由到DB1上去执行。 


如果查询条件中没有 分片字段 条件，例如：

mysql>select * from tt_waybill where waybill_no =88661;
此时Mycat无法计算路由，便发送到所有节点上执行：

DB1 –> select * from tt_waybill where waybill_no =88661; 
DB2 –> select * from tt_waybill where waybill_no =88661; 
DB3 –> select * from tt_waybill where waybill_no =88661;
如果该分片字段选择度高，也是业务常用的查询维度，一般只有一个或极少数个DB节点命中（返回结果集）。示例中只有3个DB节点，而实际应用中的DB节点数远超过这个，假如有50个，那么前端的一个查询，落到MySQL数据库上则变成50个查询，会极大消耗Mycat和MySQL数据库资源。

如果设计使用Mycat时有非分片字段查询，请考虑放弃！
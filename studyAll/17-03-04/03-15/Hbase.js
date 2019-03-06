1.基于Solr的HBase多条件查询原理很简单，'将HBase表中'涉及条件
'过滤的字段和rowkey在Solr'中'建立索引'，'通过Solr的'多条件
'查询'快速'获得'符合过滤条件的'rowkey值'，拿到这些rowkey
'之后在HBASE中通过'指定'rowkey'进行'查询'。
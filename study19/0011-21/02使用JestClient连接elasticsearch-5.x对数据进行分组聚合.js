原本数据存放在mysql中，项目需求是从mysql中查出来计算推送给前端；
但是随着数据量增大，我们的查询语句也复杂，性能会明显下降。
所以就考虑干脆存放到elasticsearch中，查询计算都方便；
于是去和公司专门负责es平台服务的人对接，
负责人说elasticsearch5.x在连接集群方面对tcp支持不如http性能好，
我没研究过两种方式的性能，所以不好下结论，但是人家推荐我使用http的方式，
那我就打消使用TransportClient客户端的念头。
因为不想使用httpclient自己封装挺麻烦，
于是在网上搜'elasticsearch''有哪些基于http的客户端'，这一搜发现有好多

    '第一种：JestClient' ，项目地址https://github.com/searchbox-io/Jest/tree/master/jest

    '第二种：RestClient'，es5.0以后出现的一种官方的基于rest的Java客户端，
参考博客http://blog.csdn.net/u010454030/article/details/77014654

    '第三种：Flummi'，开源项目，它尽可能的模仿TransportClient的api，
使开发者可以很轻松的迁移已经存在的代码，另外他会提示所有的异常信息，
让你定位错误更方便。项目地址https://github.com/otto-de/flummi，
来欣赏一下它的使用方式，是不是和TransportClient很像呢，
但是Flummi可是基于http协议的

//Flummi flummi = new Flummi("http://elasticsearch.base.url:9200");
//SearchResponse searchResponse = flummi
//        .prepareSearch("products")
//        .setQuery(QueryBuilders.termQuery("color", "yellow").build())
//        .execute();
//System.out.println("Found "+ searchResponse.getHits().getTotalHits()+ " products");
//searchResponse.getHits()
//        .stream().map(hit -> hit.getSource().get("name").getAsString())
//    .forEach(name -> System.out.println("Name: " + name));

'最后'我'使用的是JestClient'，'最新版JestClient''使用方式如下'
JestClientFactory factory = new JestClientFactory();

String connectionUrl = "http://127.0.0.1:9200";

factory.setHttpClientConfig(new HttpClientConfig
        .Builder(connectionUrl) //参数可以是集群，请先定义一个list集合，将节点url分别添加到list
        .defaultCredentials("elastic","changeme") //如果使用了x-pack，就要添加用户名和密码
        .multiThreaded(true) //多线程模式
        .connTimeout(60000) //连接超时
        .readTimeout(60000) //由于是基于http，所以超时时间必不可少，不然经常会遇到socket异常：read time out
        .build()); //更多参数请查看api
JestClient client=factory.getObject();

'这样就获得了''一个JestClient实例'，'接下来是业务部分'，
'对于elasticsearch来说''是查询限定条件'，'以前用mysql查询时'
'sql语句为：'
select name AS 'name',count(1) AS 'total_num',job AS 'job',round(avg(age),0) AS'avg_age',time AS 'time'
from employee WHERE gender = #{gender,jdbcType=INTEGER}  
AND  to_days(time) = to_days(date_sub(curdate(),interval 1 day))
GROUP BY name, job;

'要使用elasticsearch的api''实现上面的sql效果'，'首先''对于where条件很好处理'，
'平时怎么查就怎么查'，'一些基本的queryBuilder限定条件'，'我们先实现where条件'

SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

QueryBuilder queryBuilder = QueryBuilders.boolQuery()
        .must(QueryBuilders.rangeQuery(time) //对time字段进行范围限定           
            .gte("1510848000000").lt(System.currentTimeMillis())) 
//也可用from("1510568631869").to("1511166160231");
        .must(QueryBuilders.termQuery("gender", 1));

searchSourceBuilder.query(queryBuilder);
  
'对于group by和avg平均函数''就要使用elasticsearch的聚合了'

AggregationBuilder aggregationBuilder = 
AggregationBuilders.terms("nameAgg").field("name.keyword").size(Integer.MAX_VALUE) //1
     .subAggregation(AggregationBuilders.terms("jobAgg").field("job.keyword").size(Integer.MAX_VALUE) //2
          .subAggregation(AggregationBuilders.avg("ageAgg").field("age")) //3
               .subAggregation(AggregationBuilders.count("totalNum").field("name.keyword"))); //4

searchSourceBuilder.aggregation(aggregationBuilder);

'以上聚合''后面的注释解释'：
	(1) '首先按照name分组'，'terms括号里面是聚合名字'，'随便起'，'field为聚合的字段名'；
'之所以加了.keyword'，'是因为不加聚合的时候'，'会报fielddata属性没有设置为true'；

{"error":{"root_cause":[{"type":"illegal_argument_exception","reason":"Fielddata is disabled on text 
fields by default. Set fielddata=true on [name] in order to load fielddata in memory by uninverting the 
inverted index. Note that this can however use significant memory. Alternatively use a keyword field 
instead."}],"type":"search_phase_execution_exception","reason":"all shards failed","phase":"query",
"grouped":true,"failed_shards":[{"shard":0,"index":"school","node":"H7VIRoOwS8mws78T-0Ce-Q","reason":{
"type":"illegal_argument_exception","reason":"Fielddata is disabled on text fields by default. Set 
fielddata=true on [name] in order to load fielddata in memory by uninverting the inverted index.Note that
 this can however use significant memory. Alternatively use a keyword field instead."}}]},"status":400}

	'因为映射模板''将string类型的字段''存进elasticsearch时'，
'一个字符串字段有两个类型'，
'一个text类型'，'分词类型'；
'一个keyword类型'，'不分词类型'；
'所以加上.keyword''就可以正常聚合了'，
'对于es2.x版本''有可能不分词的类型为.raw'；'注意甄别'。
'后面size参数默认为10'，'貌似是最多聚合10个'，
'我肯定想要聚合全部数据'，'就填最大值'

    (2) '紧接着在name分组的基础上''按job分组'，
'属于nameAgg聚合的子聚合'，'后面的都属于前面的子聚合'

    (3) '分组完'，'紧接着统计各组平均年龄'，'由于年龄属于long类型'，
'不用加.keyword'，'从这里以后''都要注意括号的位置'，
'.subAggregation''跟在谁的后面''一定要搞清楚'，'搞混淆结果会不一样'

    (4) '实际上这一步不需要'，
'因为elasticsearch''在分组聚合完''自动会计算当前分组下有多少doc_count'

'如果普通聚合不能满足需要'，'还有管道聚合'，'将前面聚合的结果'
'输出路径作为当前聚合的输入'，'一定要注意''路径为聚合的相对路径'，'不是绝对路径'
ex：
SumBucketPipelineAggregationBuilder pipelineAggregationBuilder = 
     PipelineAggregatorBuilders.sumBucket("countTotalNum","jobAgg>totalNum");
//第二个参数为聚合路径

//如果有需要管道聚合，可以在上面的分组上继续.subAggregation(pipelineAggregationBuilder);
接下来开始将查询和聚合条件放入search中

String query = searchSourceBuilder.toString();

Search search = new Search.Builder(query).addIndex("school").addType("student").build(); 

SearchResult result = client.execute(search); 
      

执行查询时，还有一种异步执行方式;
我之所以没有使用异步方式是因为在聚合的时候会报一种错误:
{"error":"JsonGenerationException[Can not write a field name, expecting a value]"};
这种错误虽然不影响聚合，但是如果执行异步查询的话，经常丢失结果，也不会走failed方法；
而采用非异步方式就不会丢失结果；
因为有时我在completed方法和failed方法中打了断点debug执行，都没进入。
也可能是测试有误，不过你们用的时候多多注意就行，
这个方法在并发执行的时候效果不错。

client.executeAsync(search, new JestResultHandler<SearchResult>() {
    @Override
    public void completed(SearchResult searchResult) {
        
    }

    @Override
    public void failed(Exception e) {

    }
});

接下来就是取结果，最主要是聚合怎么取

//首先取最外层的聚合，拿到桶
List<TermsAggregation.Entry> nameAgg =
        result.getAggregations().getTermsAggregation("nameAgg").getBuckets();
//循环每一个桶，拿到里面的聚合，再拿桶
for (TermsAggregation.Entry entry : nameAgg) {
    List<TermsAggregation.Entry> jobAgg = entry.getTermsAggregation("jobAgg").getBuckets();
    //循环每一个桶，拿到里面的聚合，再拿桶
    for (TermsAggregation.Entry jobEntry : jobAgg) {
        //取到每个分组里的平均年龄
        long avgAge = jobEntry.getAvgAggregation("ageAgg").getAvg(); 

        //其实这里已经能获取doc_count了，所以聚合计算总数那一步可以省略
        long count = jobEntry.getCount();
        ........
        //其他操作
        ........
    }
    ..........
    //其他操作
    ..........
}

1、kibana简介

'Kibana''是'一个'开源'的'分析'与'可视化平台'，设计出来'用于'和'Elasticsearch'一起'使用'的。
你可以'用kibana搜索'、'查看'、'交互''存放在Elasticsearch索引'里'的数据'，
使'用各种不同的图表'、'表格'、'地图等''kibana''能'够很'轻易地展示''高级数据分析'与'可视化'。

'Kibana''让我们理解大量数据''变得很容易'。它简单、'基于浏览器'的接口'使你能快速创建'
和'分享实时展现''Elasticsearch查询变化的动态仪表盘'。'安装Kibana非常快'，
'你可以在几分钟'之'内安装'和开始'探索'你的Elasticsearch'索引数据'，
不需要写任何代码，没有其他基础软件依赖。

本文只'介绍Kibana''如何安装使用'，'更多'关于Kibana信息'请看官网'： 
https://www.elastic.co/guide/en/kibana/index.html

2、kibana安装
2.1 '下载'
下载地址：https://www.elastic.co/downloads/kibana
备注：如果使'用ElasticSearch-2.3.x'，'可以下载kinaba-4.5.x'。linux下命令下载：
curl -L -O https://download.elastic.co/kibana/kibana/kibana-4.5.1-linux-x64.tar.gz

2.2 '解压'
解压：tar zxvf kibana-4.5.1-linux-x64.tar.gz

2.3 '配置'
到'config/kibana.yml'目录下，般'修改标注'的这'三个参数即可'。

server.port: 5601

# The host to bind the server to.
server.host: ""

# If you are running kibana behind a proxy, and want to mount it at a path,
# specify that path here. The basePath can't end in a slash.
# server.basePath: ""

# The Elasticsearch instance to use for all your queries.
elasticsearch.url: "http://"  #这里是elasticsearch的访问地址

2.4 启动

到bin目录下，启动即可。

./kibana  //不能关闭终端

nohup  ./kibana > /nohub.out &  //可关闭终端，在nohup.out中查看log

2.5 访问

在浏览器中访问：http://xxxx:5601/
	

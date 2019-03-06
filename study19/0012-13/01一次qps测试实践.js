 			tps			响应	 
单机		208.77		57.50	 
2vms		157.82		76.26	 
4vms		52.72		崩溃	 
'2 tomcat''比单机性能还差'，'4 tomcat''最后奔溃了'
'nginx ＋ n*tomcat ＋ 1*mysql''组合'——

'2vms情况下'，'mysql''CPU 200多'，已'达硬件瓶颈''两个应用加起来400'，

'nginx才4%，潜力远未发挥'

'推测瓶颈在mysql'，但是没钱买阿里的高性能数据库玩，就这样吧

这篇'文章与缓存无关'，'但是引出了为什么要使用缓存'（'因为mysql顶不住'），
故放在《缓存》类别

1.23
http://blog.csdn.net/zq17865815296/article/details/78619110
	
想着'探讨nginx负载均衡的作用'

'服务器''A 4核','B 8核'

'nginx 和tomcat1部署在A'，'tomcat2部署在B'

'第一次测试，100并发2分钟'，
nginx－》B，tps  1800，CPU大约在95%，
总事务数  25w，nginx worker_connections 51200

'第二次测试，100并发2分钟'，
nginx－》A&B，tps 1800，A的CPU大约在95%，B的CPU大约在45%
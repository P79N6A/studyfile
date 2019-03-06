1.'新建Maven项目','勾选' 'creat a simple'...

2.填写4个坐标finsh

3.右击项目，选择properites  

4.在Configuration中选择custom
在下方的Project Facet的Dynamic Web Module中选择2.5版本	
在java中选择1.6
注意：这些选择可能根据tomcat版本变化而变化，就tomcat6来说选择以上选项是可以的
	'此步骤''非常重要'，只有'操作了此步骤'，右侧'导航栏''才会有''Deployment Assembly' 链接

5.将maven库映射到WEB-INF/lib下

6.在'eclipse'的'server'视图中'添加你的项目'，右键选择的'tomcat服务器'，
选择'add and remove'，'添加刚才新建的web工程'，效果如下图
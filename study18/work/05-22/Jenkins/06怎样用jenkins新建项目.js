下载好'jenkins'的'安装包',直接'安装就行'了,jenkins的'默认端口'是'8080'，
如果需要'修改端口'号,'在'jenkins的安装目录下面，找到'jenkins.xml'，
'找到httpPort'，'把端口''改了'就行

jenkins安装完成,'登录','点击'左侧菜单栏的'系统管理'，再'点击'中间的'全局工具配置'，
'把''jdk','git'，'maven''配置好'，'如下图'所示

要'建'一个'maven风格'的'job'，必'须安装maven插件',点击'系统管理'-'管理插件','搜索'
'Maven Integration plugin'，点击'安装就行'了

进入正题,'一键部署项目','点'击主界面'左侧菜单'栏的'新建Item'，'输入jon名称',
'选中构建'一个'maven'项目，'点'击'确定'，进入'下一步','源码管理',
'输入''Repository URL','Credentials','点击add'，'添加'你的'git账号'和'密码',输入你的'分支'

'构建触发器',这里'选择手动触发'，你可以根据下面的选项自己选择合适的，
在'build'下'写maven命令','在Post Steps'，'add post build step''选择'你'需要的'，
在'command'或者'命令'里面'写你的启动脚本',点击'保存即可'

最后，注意一点,'jenkins中''通过execute shell''启动的进程''会被杀死'的问题,
要想'解决'这个'问题',如下
'在jenkins'中'配置''自动更新部署项目'时，如果'采用execute shell启动/关闭tomcat'，
会发现'可以'进行'关闭tomcat'，但是'无法启动tomcat'，虽然'构建会显示执行成功'，
但是查看进程，'tomcat是''没有启动的'。这是'因为Jenkins'默认会'在Build结束后''Kill掉所有的衍生进程'。
需'要进行'以下'配置'，才能避免此类情况发生:

  1.'重设环境变量'build_id

  在'execute shell''输入框'中'加入''BUILD_ID=DONTKILLME',即可'防止jenkins''杀死'启动的'tomcat'进程

  2.在'启动jenkins' 的时候'禁止jenkins''杀死'衍生'进程'

    '修改/etc/sysconfig/jenkins''配置'，在'JENKINS_JAVA_OPTIONS'中
  '加入-Dhudson.util.ProcessTree.disable=true'。
  即'在'jenkins安装目录，找到'jenkins.xml文件',打开,找到'arguments',
  '加入-Dhudson.util.ProcessTree.disable=true'就行了)需要重启jenkins生效

    此方法配置一次后，所有的job都无需设置BUILD_ID，
  就能够防止jenkins杀死启动的tomcat进程

点击立即构建就行了,如果图标是蓝色，表示构建成功,如果在build history,
点击失败的勾践，出现下拉框，点击console output，就可以看到日志
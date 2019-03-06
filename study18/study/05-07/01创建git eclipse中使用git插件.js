我们基本写Java软件的都是入门级的eclipse，不类似于idea，eclipse跟多扩展功
能需要自己安装插件，今天我们就来学习一下github的插件在eclipse中如何安装及使用。

第一步：打开eclipse，点击help->install new Software，之后 点击add，出现小窗口
再将这个网址复制进去http://download.eclipse.org/egit/updates/。会出现三个，全选
点击next按钮进行检查,如果插件比较大,这步会比较慢,请耐心等待
安装完成后,重启eclipse。重启完成后,'新建项目''Helloworld'，在scr目录下'新建hello.class'。

我们'将'这个'hello.class'上'传到github仓库'中。

第二步：'点击'你的'Helloworld'项目'右键'->Team->'share program...'

然后将'弹框'中的这个'框框勾选'

之后'再将项目勾选'，选择'Create Repository'，之后点击'完成'就'将你'的'项目''保存到本地'了。
这时候你会发现'你的项目''出现'这样的（会有'小问号'）。

第三步：然后右击你的项目，'team->commit'

然后将你的所'要上传的Helloworld.txt''选中'，然后将你的提交message写上，之后'commit'，
这个时候'你的项目'就'提交到''本地仓库了'。然后我们在进行
'将'我们'本地仓库'的项目'提交到''github'上。这个时候你'先到你的''github'上'新建一个'
'github项目'，并'将网址复制'下来，上一节中提到如何新建一个github项目。

第四步：'将本地仓库'中的'项目提交到''远程仓库'中。

项目右键->'team->remote->push'。

输入'Url'：'在githob上'面，'创建项目''获取到的'，复制进去。
'填上'自己'登陆githob'的'账号密码->next'。

然后你到你的github上查看就可以发现你的项目啦！
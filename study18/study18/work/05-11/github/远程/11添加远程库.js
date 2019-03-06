现在的情景是，'你'已经'在本地创建'了一个'Git仓库'后，又想'在GitHub''创建'一个'Git仓库'，
并且'让'这'两个仓库'进行'远程同步'，这样，'GitHub上'的仓库既'可以作为备份'，
又可以'让其他人'通过该仓库'来协作'，真是一举多得。

首先，'登陆GitHub'，然后，在右上角找到“'Create a new repo'”按钮，
创建一个新的仓库：


在'Repository name填入'learngit，'其他保持默认设置'，点击“'Create repository'”按钮，
就成功地创建了一个新的Git仓库：


目前，在GitHub上的这个'learngit'仓库还'是空的'，GitHub告诉我们，
'可以'从这个仓库'克隆出新'的'仓库'，也'可以'把一个'已有的本地仓库'与之'关联'，
然后，把'本地仓库'的内容'推送到GitHub仓库'。

现在，我们根据GitHub的提示，在本地的learngit仓库下运行命令：

$ git remote add origin git@github.com:michaelliao/learngit.git
//git remote add origin git@github.com:szryuuki/learngit.git
请千万注意，把上面的'michaelliao'替'换成'你'自己的''GitHub账户名'，否则，
你在本地关联的就是我的远程库，关联没有问题，但是你以后推送是推不上去的，
因为你的SSH Key公钥不在我的账户列表中。

添加后，'远程库'的'名字'就'是origin'，这'是Git默认的叫法'，也可以改成别的，
但是origin这个名字一看就知道是远程库。

'下一步'，就可以'把本地库'的所有'内容推送到远程库'上：
$ git push -u origin master
Counting objects: 19, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (19/19), done.
Writing objects: 100% (19/19), 13.73 KiB, done.
Total 23 (delta 6), reused 0 (delta 0)
To git@github.com:michaelliao/learngit.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.

把'本地库'的内容'推送到远程'，'用git push'命令，
实际上是'把当前分支master推送到远程'。

由于'远程库是空的'，我们'第一次推送master分支'时，'加上了-u参数'，
'Git'不但会'把本地'的'master分支'内容'推送'的'远程新的master'分支，
'还会把本地'的'master分支'和'远程的master分支''关联起来'，
在以后的推送或者拉取时就可以简化命令。

推送'成功后'，可以立刻'在GitHub页面'中'看到远程库'的内容已经'和本地一模一样'：

从现在起，'只要本地'作了'提交'，就'可以通过命令'：

$ 'git push origin master'
'把本地master分支'的'最新修改'推'送至GitHub'，现在，你就'拥有了''真正的分布式版本库！'


SSH警告
当你'第一次使用Git的clone'或者'push'命令连接GitHub时，会'得到一个警告'：
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，
需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，'输入yes回车即可'。

Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：

Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
这个警告只会出现一次，后面的操作就不会有任何警告了。

如果你实在担心有人冒充GitHub服务器，输入yes前可以对照GitHub的RSA Key
的指纹信息是否与SSH连接给出的一致。

小结
要'关联'一个'远程库'，使用命令'git remote add origin git@server-name:path/repo-name.git'；

关联后，使'用命令git push -u origin master'第一次'推送master分支的所有内容'；

此后，每次本地提交后，只要有必要，就可以使用命令'git push origin master''推送最新修改'；

分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，
也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！
当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！


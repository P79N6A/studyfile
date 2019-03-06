上次我们讲了先有本地库，后有远程库的时候，如何关联远程库。

现在，假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆。

首先，登陆'GitHub'，创建一个'新的仓库'，名字叫'gitskills'：

github-init-repo

我们'勾选Initialize this repository with a README'，
这样GitHub会自动为我们'创建一个README.md文件'。
创建完毕后，可以看到'README.md文件'：

github-init-repo-2

现在，'远程库已经准备好了'，下一步是用命令'git clone克隆一个本地库'：

'$ git clone git@github.com:sinaryuuki/gitskills.git'
Cloning into 'gitskills'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (3/3), done.

$ cd gitskills
$ ls
README.md

注意把'Git库的地址''换成'你'自己'的，然后'进入gitskills目录'看看，已经'有README.md文件'了。
如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。

你也许还注意到，'GitHub给出的地址''不止一个'，还可以用
https://github.com/michaelliao/gitskills.git这样的地址。
实际上，'Git支持多种协议'，默认的'git://使用ssh'，但也可以使用https等其他协议。

使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，
但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。

小结
要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。

Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

感觉本站内容不错，读后有收获？
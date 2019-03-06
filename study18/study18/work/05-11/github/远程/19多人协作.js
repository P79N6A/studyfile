当你从远程仓库克隆时，实际上'Git'自动'把'本地的'master分支'和'远程'的
'master分支''对应'起来了，并且，'远程仓库'的'默认名称是origin'。

要查看远程库的信息，用git remote：

$ git remote
origin
或者，用'git remote -v''显示'更'详细的远程库信息'：

$ git remote -v
origin  git@github.com:michaelliao/learngit.git (fetch)
origin  git@github.com:michaelliao/learngit.git (push)
上面显示了'可'以'抓取'和'推送的'origin的'地址'。如果'没有推送'权限，就'看不到push'的'地址'。

推送分支
'推送分支'，就是'把'该'分支'上的'所有本地''提交'推送'到远程库'。推送时，要'指定'本地'分支'，
这样，Git就'会把该分支''推送到'远程库对应的'远程分支'上：

$ git push origin master  '把master分支，推送到远程'
如果要推送其他分支，比如dev，就改成：

$ git push origin dev	'把dev分支，推送到远程'
但是，并'不'是'一定'要'把本地分支往远程推送'，那么，'哪些'分支需'要推送'，'哪些不需要'呢？

'master分支'是'主分支'，因此'要时刻与远程同步'；

'dev分支'是'开发分支'，团队'所有成员'都'需要在上面工作'，所以'也需要与远程同步'；

'bug分支'只用于'在本地修复bug'，就'没必要推到远程'了，除非老板要看看你每周到底修复了几个bug；

'feature分支'是否推到远程，'取决于'你'是否和你的小伙伴''合作'在上面'开发'。

总之，就是在Git中，'分支'完全可以'在本地'自己藏着玩，'是否推送'，'视你的心情而定'！

抓取分支
'多人协作时'，'大家都会往master'和'dev'分支上'推送各自的修改'。

现在，模拟一个你的小伙伴，可以在另一台电脑（注意要把SSH Key添加到GitHub）
或者同一台电脑的另一个目录下克隆：

$ git clone git@github.com:michaelliao/learngit.git
Cloning into 'learngit'...
remote: Counting objects: 46, done.
remote: Compressing objects: 100% (26/26), done.
remote: Total 46 (delta 16), reused 45 (delta 15)
Receiving objects: 100% (46/46), 15.69 KiB | 6 KiB/s, done.
Resolving deltas: 100% (16/16), done.
当你的'小伙伴'从'远程'库'clone时'，默认情况下，你的小伙伴'只能看到'本地的'master分支'。
不信可以用git branch命令看看：

$ git branch
* master
现在，你的'小伙伴'要'在dev分支'上'开发'，就必'须创建''远程origin的dev分支到本地'，
于是他用这个命令创建本地dev分支：

$ git checkout -b dev origin/dev //创建本地dev
现在，他就可以'在dev上'继续'修改'，然后，时不时地'把dev分支push到远程'：

$ git commit -m "add /usr/bin/env"
[dev 291bea8] add /usr/bin/env
 1 file changed, 1 insertion(+)
$ git push origin dev
Counting objects: 5, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 349 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@github.com:michaelliao/learngit.git
   fc38031..291bea8  dev -> dev
'你的小伙伴'已经'向origin/dev'分支'推送'了他的'提交'，
而碰巧'你'也对'同样'的文件'作了修改'，并试图推送：

$ git add hello.py 
$ git commit -m "add coding: utf-8"
[dev bd6ae48] add coding: utf-8
 1 file changed, 1 insertion(+)
$ git push origin dev
To git@github.com:michaelliao/learngit.git
 ! [rejected]        dev -> dev (non-fast-forward)
error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
'推送失败'，因为你的小伙伴的'最新提交'和你'试图推送'的提交'有冲突'，解决办法也很简单，
Git已经提示我们，'先用git pull''把最新的提交''从origin/dev抓下来'，
然后，'在本地合并'，'解决冲突'，'再推送'：

$ git pull
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0)
Unpacking objects: 100% (3/3), done.
From github.com:michaelliao/learngit
   fc38031..291bea8  dev        -> origin/dev
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream dev origin/<branch>
'git pull也失败了'，原因是'没有指定本地dev分支'与'远程origin/dev分支'的'链接'，根据提示，
'设置dev和origin/dev的链接：'

$ git branch --set-upstream dev origin/dev
Branch dev set up to track remote branch dev from origin.
再pull：

$ git pull
Auto-merging hello.py
CONFLICT (content): Merge conflict in hello.py
Automatic merge failed; fix conflicts and then commit the result.
'这回git pull成功'，但是'合并有冲突'，需要'手动解决'，解决的方法和分支管理中的解决冲突完全一样。
'解决后，提交，再push'：

$ git commit -m "merge & fix hello.py"
[dev adca45d] merge & fix hello.py
$ git push origin dev
Counting objects: 10, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 747 bytes, done.
Total 6 (delta 0), reused 0 (delta 0)
To git@github.com:michaelliao/learngit.git
   291bea8..adca45d  dev -> dev
   
   
因此，多人协作的工作模式通常是这样：

首先，可以试图用git push origin branch-name推送自己的修改；

如果推送失败，则因为远程分支比你的本地更新，需要'先用git pull'试图'合并'；

如果合并'有冲突'，则'解决冲突'，并'在本地提交'；

没有冲突或者'解决掉冲突后'，再用'git push origin branch-name推送就能成功！'

如果git pull提示'“no tracking information”，'
则说明'本地分支'和'远程分支'的'链接关系没有创建'，
'用命令git branch --set-upstream branch-name origin/branch-name。'

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

小结
'查看远程库'信息，使用'git remote -v'；

本地'新'建的'分支'如果'不推送到远程'，对'其他人'就是'不可见'的；

从'本地推送分支'，使用'git push origin branch-name'，如果推送失败，
先用git pull抓取远程的新提交；

在'本地创建''和远程分支对应的分支'，使用'git checkout -b branch-name origin/branch-name'，
'本地和远程分支的名称'最好'一致'；

建立'本地分支'和'远程分支的关联'，使'用git branch --set-upstream branch-name origin/branch-name'；

从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。


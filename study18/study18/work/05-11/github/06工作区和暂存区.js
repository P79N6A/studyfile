Git和其他版本控制系统如SVN的一个不同之处就是有暂存区的概念。

工作区（Working Directory）
就是你在'电脑里'能'看到的目录'，比如我的'learngit文件夹'就'是'一个'工作区'：

working-dir

'版本库'（Repository）
工作区有一个'隐藏目录.git'，这个不算工作区，而'是Git的版本库'。

Git的'版本库'里'存了很多'东西，其中最重要的就是称为'stage'（或者叫index）的'暂存区'，
还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。
'C:\Users\whliu\Desktop\learngit'

分支和HEAD的概念我们以后再讲。
前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

第一步是'用git add'把'文件添加进去'，实际上就是把'文件修改'添'加到暂存区'；

第二步是'用git commit''提交更改'，实际上就是'把暂存区'的所有内容'提交到当前分支'。

因为我们'创建Git版本库'时，Git自动为我们'创建了''唯一'一个'master分支'，
所以，现在，'git commit'就'是往master分支'上'提交更改'。

你可以简单理解为，需要'提交'的文件修改通通'放到暂存区'，'然后'，一次性'提交暂存区的所有修改'。

俗话说，实践出真知。现在，我们再练习一遍，先对'readme.txt做个修改'，比如加上一行内容：

Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
然后，在工作区'新增一个LICENSE'文本文件（内容随便写）。

先用git status'查看一下状态'：

$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   readme.txt
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       LICENSE
no changes added to commit (use "git add" and/or "git commit -a")
Git非常清楚地告诉我们，'readme.txt被修改'了，
而'LICENSE'还从来'没有被添加过'，所以它的'状态是Untracked'。

现在，使用'两次命令git add'，'把readme.txt'和'LICENSE'都'添加后'，用git status再查看一下：

$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#       modified:   readme.txt
#
现在，暂存区的状态就变成这样了：

所以，'git add'命令实际上就是把'要提交'的所有'修改放到暂存区'（Stage），
然后，'执行git commit'就可以'一次性把暂存区'的'所有修改'提'交到分支'。

$ git commit -m "understand how stage works"
[master 27c9860] understand how stage works
 2 files changed, 675 insertions(+)
 create mode 100644 LICENSE
一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的：

$ git status
# On branch master
nothing to commit (working directory clean)
现在版本库变成了这样，暂存区就没有任何内容了：


小结
'暂存区'是Git非常'重要的概念'，弄明白了暂存区，就弄明白了Git的很多操作到底干了什么。

没弄明白暂存区是怎么回事的童鞋，请向上滚动页面，再看一次。


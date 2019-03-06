自然，你是不会犯错的。不过现在是凌晨两点，你正在赶一份工作报告，
你在readme.txt中添加了一行：

$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
My stupid boss still prefers SVN.
在你准备提交前，一杯咖啡起了作用，你猛然发现了“stupid boss”可能会让你丢掉这个月的奖金！

既然错误发现得很及时，就可以很容易地纠正它。你可以'删掉最后一行'，
手动把文件'恢复到''上'一个'版本'的状态。如果用'git status'查看一下：

$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   readme.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
你可以发现，Git会告诉你，
'git checkout -- file''可以丢弃工作区'的'修改'：
$ git checkout -- readme.txt
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，

这里有两种情况：
'一'种'是'readme.txt自'修改后'还'没有'被'放到暂存区'，现在，
'撤销修改'就'回到'和'版本库一模一样'的状态；

'一'种'是'readme.txt已经添'加到暂存区'后，'又作了修改'，现在，
'撤销修改'就'回到'添加到'暂存区'后的'状态'。

总之，就是'让'这个'文件回'到最近一次'git commit''或git add'时'的状态'。

现在，看看'readme.txt'的文件内容：

$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
文件内容果然复原了。

'git checkout -- file'命令中的'--很重要'，'没有--'，
就'变成'了“'切换到另一个分支'”的命令，
我们在后面的分支管理中会再次'遇到git checkout命令'。

现在假定是凌晨3点，你不但写了一些胡话，还git add到暂存区了：
$ cat readme.txt
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
My stupid boss still prefers SVN.

$ git add readme.txt
庆幸的是，在commit之前，你发现了这个问题。用git status查看一下，修改只是添加到了暂存区，还没有提交：

$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   readme.txt
#


Git同样告诉我们，用命令'git reset HEAD file'可以'把暂存'区的'修改撤销'掉（unstage），
重新'放回工作区'：
$ git reset HEAD readme.txt
Unstaged changes after reset:
M       readme.txt
'git reset'命令既'可'以'回退版本'，也'可'以'把'暂存区的'修改回退到工作区'。
当我们用HEAD时，表示最新的版本。

再用'git status'查看一下，现在'暂存区是干净'的，工作区有修改：

$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   readme.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
还记得如何丢弃工作区的修改吗？

$ 'git checkout -- readme.txt'

$ git status
# On branch master
nothing to commit (working directory clean)
整个世界终于清静了！

 现在，假设你不但'改错了东西'，还从'暂存区'提'交到了版本库'，怎么办呢？还记得版本回退一节吗？
 可以'回退到上一个版本'。
 不过，这是'有条件'的，就'是'你还'没有把'自己的'本地版本'库'推送到远程'。
 还记得Git是分布式版本控制系统吗？我们后面会讲到远程版本库，
 一旦你把“stupid boss”提交推送到远程版本库，你就真的惨了……

小结
又到了小结时间。

场景1：当你'改乱了''工作区'某个文件的'内容'，想直接'丢弃'工作区的'修改'时，'用'命令
git checkout -- file。

场景2：当你不但'改乱了''工作区'某个文件的'内容'，还添'加到'了'暂存区'时，想'丢弃修改'，分'两步'，
第一步用命令
git reset HEAD file，
就回到了场景1，
git checkout -- file

场景3：已经'提交了''不合适'的修改'到版本库'时，想要'撤销'本次'提交'，参考'版本回退'一节，
不过前提是没有推送到远程库。


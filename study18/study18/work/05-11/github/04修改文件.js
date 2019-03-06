我们已经成功地添加并提交了一个readme.txt文件，现在，是时候继续工作了，
于是，我们继续'修改readme.txt'文件，'改成如下'内容：

Git is a distributed version control system.
Git is free software.
现在，运行git status命令看看结果：

$ 'git status'
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#    modified:   readme.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
'git status'命令'可以(看到)'让我们时刻掌握仓库'当前'的'状态'，上面的命令告诉我们，
readme.txt被修改过了，但还没有准备提交的修改。

虽然Git告诉我们readme.txt被修改了，但如果能看看具体修改了什么内容，自然是很好的。
比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的readme.txt，
所以，需要用'git diff(看到改动内容)'这个命令看看：

$ git diff readme.txt 
diff --git a/readme.txt b/readme.txt
index 46d49bf..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.
+Git is a distributed version control system.
 Git is free software.
 
git diff顾名思义就是查看difference，显示的格式正是Unix通用的diff格式，
可以从上面的命令'输出看到'，我们在'第一行添加'了一个'“distributed”单词'。

知道了对readme.txt作了什么修改后，再把它提交到仓库就放心多了，
'提交修改'和提交新文件'是一样'的'两步'，第'一'步是'git add'：

$ git add readme.txt
同样没有任何输出。在执行第二步git commit之前，
我们再运行git status看看当前仓库的状态：

$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   readme.txt
#
git status告诉我们，将'要'被'提交的修改包括readme.txt'，下一步，就可以放心地提交了：

$ git commit -m "add distributed"
[master ea34578] add distributed
 1 file changed, 1 insertion(+), 1 deletion(-)
提交后，我们再用git status命令看看仓库的当前状态：

$ git status
# On branch master
nothing to commit (working directory clean)
Git告诉我们当前"没有"需"要提交的修改"，而且，工作目录是干净（working directory clean）的。

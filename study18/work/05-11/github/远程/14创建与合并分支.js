在版本回退里，你已经知道，'每次提交'，'Git'都'把它们串成'一条'时间线'，
'这条时间线'就'是一个分支'。截止到目前，只有'一条时间线'，在Git里，
这个分支'叫主分支'，即'master分支'。'HEAD'严格来说'不是指向提交'，
而'是指向master'，'master'才'是指向提交'的，所以，'HEAD指向'的就'是当前分支'。

一'开始'的时候，'master分支'是'一条线'，'Git用master''指向''最新的提交'，
再用'HEAD指向master'，就能'确定当前分支'，以及'当前分支的提交点'：


'每次提交'，'master分支'都'会向前移动'一步，这样，随着你'不断提交'，
master'分支的线'也'越来越长'：

当我们'创建新'的'分支'，例'如dev'时，'Git新建'了一个'指针叫dev'，'指向master相同的提交'，
'再把HEAD指向dev'，就'表示当前分支在dev上'：

git-br-create

你看，Git创建一个分支很快，因为除了增加一个dev指针，改改HEAD的指向，
工作区的文件都没有任何变化！

不过，'从现在'开始，对工作区的'修改和提交'就是'针对dev分支'了，比如新提交一次后，
'dev指针往前移动'一步，而'master指针不变'：

git-br-dev-fd

假如我们'在dev上的工作完成'了，就可以'把dev合并到master'上。Git怎么合并呢？
最简单的方法，就是'直接把master指向dev的当前提交'，就'完成了合并'：

git-br-ff-merge

所以Git合并分支也很快！就改改指针，工作区内容也不变！

'合并完'分支后，甚至'可以删除dev'分支。删除dev分支就是把dev指针给删掉，删掉后，
我们就'剩下'了'一条master分支'：

git-br-rm

真是太神奇了，你看得出来有些提交是通过分支完成的吗？

 下面开始实战。

首先，我们创建dev分支，然后切换到dev分支：

$ git checkout -b dev
Switched to a new branch 'dev'

'git checkout'命令加上'-b参数'表示'创建并切换'，相当于以下两条命令：

$ git branch dev
$ git checkout dev
Switched to branch 'dev'
然后，用git branch命令'查看当前分支'：

$ git branch
* dev
  master
git branch命令会列出所有分支，'当前分支'前面会'标一个*号'。

然后，我们就'可以在dev分支'上'正常提交'，比如对readme.txt做个修改，加上一行：

Creating a new branch is quick.
然后提交：

$ git add readme.txt 
$ git commit -m "branch test"
[dev fec145a] branch test
 1 file changed, 1 insertion(+)
现在，dev分支的工作完成，我们就可以切换回master分支：

$ git checkout master
Switched to branch 'master'
'切换回master'分支后，再'查看一个readme.txt文件'，刚才添加的内容不见了！
因为那个提交是在dev分支上，而'master分支'此刻的'提交点并没有变'：

git-br-on-master

现在，我们'把dev分支'的工作成果'合并到master'分支上：

$ git merge dev
Updating d17efd8..fec145a
Fast-forward
 readme.txt |    1 +
 1 file changed, 1 insertion(+)
'git merge'命令'用于合并指定分支到当前分支'。合并后，再'查看readme.txt的内容'，
就可以看到，和dev分支的最新提交是完全一样的。

注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，
也就是直接把master指向dev的当前提交，所以合并速度非常快。

当然，也不是每次合并都能Fast-forward，我们后面会讲其他方式的合并。

合并完成后，就可以放心地删除dev分支了：

$ git branch -d dev
Deleted branch dev (was fec145a).
删除后，查看branch，就只剩下master分支了：

$ git branch
* master
因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，
合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全。

小结
Git鼓励大量使用分支：

'查看分支：git branch'

'创建分支：git branch <name>'

'删除分支：git branch -d <name>'

'切换分支：git checkout <name>'

创建+切换分支：git checkout -b <name>

'合并'某分支'到当前分支'：git merge <name>

